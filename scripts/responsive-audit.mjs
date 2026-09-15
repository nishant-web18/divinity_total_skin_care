#!/usr/bin/env node
/**
 * responsive-audit.mjs — measures a page at 5 viewports and reports every
 * responsive defect with an exact selector, so an agent can fix them one by one.
 *
 * Usage:
 *   node scripts/responsive-audit.mjs http://localhost:3000
 *   node scripts/responsive-audit.mjs http://localhost:3000/treatments --json
 *
 * Setup (once):
 *   npm i -D playwright && npx playwright install chromium
 *
 * Exit code 1 if any BLOCKER is found, so it can gate a commit.
 */

import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const URL_ARG = process.argv[2] || 'http://localhost:3000';
const JSON_OUT = process.argv.includes('--json');
const SHOTS = !process.argv.includes('--no-shots');
const OUT_DIR = '.audit';

const VIEWPORTS = [
  { name: 'mobile-sm', width: 320, height: 720, mobile: true },
  { name: 'mobile', width: 390, height: 844, mobile: true },
  { name: 'tablet', width: 768, height: 1024, mobile: true },
  { name: 'laptop', width: 1024, height: 800, mobile: false },
  { name: 'desktop', width: 1440, height: 900, mobile: false },
];

const UA_MOBILE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';

/* ---------------------------------------------------------------- in-page */
function collect(vp) {
  const out = [];
  const seen = new Map();
  const add = (sev, rule, sel, msg, extra) => {
    // collapse repeats of the same rule on the same selector shape into one
    // finding with a count — 40 identical nav links is one fix, not 40.
    const k = sev + '|' + rule + '|' + sel;
    const hit = seen.get(k);
    if (hit) { hit.count = (hit.count || 1) + 1; return; }
    const f = { severity: sev, rule, selector: sel, message: msg, count: 1, ...(extra || {}) };
    seen.set(k, f);
    out.push(f);
  };

  const cs = (el) => getComputedStyle(el);
  const box = (el) => el.getBoundingClientRect();
  const shown = (el) => {
    const s = cs(el);
    if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity < 0.05) return false;
    const r = box(el);
    return r.width > 0 && r.height > 0;
  };
  const path = (el) => {
    if (!el || el.nodeType !== 1) return '?';
    if (el.id) return `#${el.id}`;
    const parts = [];
    let n = el;
    for (let i = 0; n && n.nodeType === 1 && i < 4; i++) {
      let p = n.tagName.toLowerCase();
      const cls = String(n.className || '')
        .split(/\s+/)
        .filter((c) => c && !/^(css-|sc-)/.test(c) && c.length < 28)
        .slice(0, 3);
      if (cls.length) p += '.' + cls.join('.');
      if (n.id) { parts.unshift(`#${n.id}`); break; }
      parts.unshift(p);
      n = n.parentElement;
    }
    return parts.join(' > ');
  };
  const txt = (el) => (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 48);

  const VW = document.documentElement.clientWidth;
  const all = Array.from(document.querySelectorAll('body *'));
  const visible = all.filter(shown);
  const inScroller = (el) => {
    for (let n = el.parentElement, i = 0; n && i < 8; n = n.parentElement, i++) {
      const ox = cs(n).overflowX;
      if (ox === 'auto' || ox === 'scroll') return true;
    }
    return false;
  };

  /* 1. viewport meta ------------------------------------------------------ */
  const meta = document.querySelector('meta[name="viewport"]');
  if (!meta) add('BLOCKER', 'viewport-meta', 'head', 'No <meta name="viewport"> — the page will render at desktop width on phones.');
  else {
    const c = meta.getAttribute('content') || '';
    if (/user-scalable\s*=\s*no/.test(c) || /maximum-scale\s*=\s*1/.test(c))
      add('BLOCKER', 'viewport-meta', 'head', `Viewport meta blocks pinch-zoom (${c}). Fails WCAG 1.4.4. Use "width=device-width, initial-scale=1".`);
    if (!/width\s*=\s*device-width/.test(c))
      add('BLOCKER', 'viewport-meta', 'head', `Viewport meta missing width=device-width (${c}).`);
  }

  /* 2. horizontal overflow ------------------------------------------------ */
  const docW = document.documentElement.scrollWidth;
  const rootClip = [document.documentElement, document.body]
    .filter((n) => ['hidden', 'clip'].includes(cs(n).overflowX))
    .map((n) => n.tagName.toLowerCase());
  if (rootClip.length)
    add('MAJOR', 'root-overflow-masked', rootClip.join(', '),
      `overflow-x is clipped on <${rootClip.join('>, <')}>. That hides sideways-scroll bugs instead of fixing them — the content is still too wide, just unreachable, and scrollWidth stops reporting it. Remove it and fix the offending element.`);

  if (docW > VW + 1)
    add('BLOCKER', 'page-overflow', 'html', `Page scrolls sideways: content is ${docW}px wide in a ${VW}px viewport (+${docW - VW}px).`);

  // Always hunt for over-wide elements — never gate this on scrollWidth, which a
  // root-level overflow clip silently clamps.
  const blamed = [];
  visible
    .map((el) => ({ el, r: box(el) }))
    .filter(({ el, r }) => {
      if (r.width === 0) return false;
      if (r.right <= VW + 1 && r.left >= -1) return false;
      // inside a scroller or a deliberately clipped container — different rule.
      // html/body are excluded: a root clip must not excuse every element below it.
      for (let n = el.parentElement, i = 0; n && n !== document.body && i < 8; n = n.parentElement, i++) {
        const ox = cs(n).overflowX;
        if (ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') return false;
      }
      return true;
    })
    .forEach(({ el, r }) => {
      // report only the outermost offender in each subtree: a wide <table>
      // is one bug, not one bug per <td>
      if (blamed.some((b) => b.contains(el))) return;
      blamed.push(el);
      add('BLOCKER', 'overflow-source', path(el), `Element sticks out to x=${Math.round(r.right)} (viewport ${VW}px). width=${Math.round(r.width)}px "${txt(el)}"`);
    });

  /* 3. tap targets -------------------------------------------------------- */
  if (vp.mobile) {
    const clickable = visible.filter((el) => {
      const t = el.tagName;
      if (!(t === 'A' || t === 'BUTTON' || t === 'SUMMARY' || el.getAttribute('role') === 'button' || (t === 'INPUT' && /submit|button|checkbox|radio/.test(el.type)))) return false;
      // skip inline links inside running prose — WCAG exempts these
      const p = el.closest('p, li');
      if (p && el.tagName === 'A' && cs(el).display.includes('inline')) return false;
      return true;
    });
    clickable.forEach((el) => {
      const r = box(el);
      const h = Math.round(r.height), w = Math.round(r.width);
      if (h < 24 || w < 24) add('BLOCKER', 'tap-target', path(el), `Tap target ${w}×${h}px — below the WCAG 2.5.8 minimum of 24×24. "${txt(el)}"`);
      else if (h < 44 || w < 44) add('MAJOR', 'tap-target', path(el), `Tap target ${w}×${h}px — below Apple's 44×44pt guidance. "${txt(el)}"`);
    });
    // crowding
    const rects = clickable.map((el) => ({ el, r: box(el) }));
    for (let i = 0; i < rects.length; i++) {
      for (let j = i + 1; j < rects.length; j++) {
        const a = rects[i].r, b = rects[j].r;
        const dx = Math.max(0, Math.max(a.left - b.right, b.left - a.right));
        const dy = Math.max(0, Math.max(a.top - b.bottom, b.top - a.bottom));
        if (dx === 0 && dy === 0) continue;
        const gap = Math.max(dx, dy);
        if (gap > 0 && gap < 8 && Math.min(a.height, b.height) < 44)
          add('MINOR', 'tap-crowding', path(rects[i].el), `Only ${Math.round(gap)}px from the next tap target — aim for 8px+ between small controls.`);
      }
    }
  }

  /* 4. typography --------------------------------------------------------- */
  const textEls = visible.filter((el) => {
    const direct = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim().length > 2);
    return direct;
  });
  textEls.forEach((el) => {
    const s = cs(el);
    const fs = parseFloat(s.fontSize);
    if (fs < 12) add('MAJOR', 'font-too-small', path(el), `${fs}px text is unreadable on a phone. Floor is 12px for legal/captions, 16px for body. "${txt(el)}"`);
    else if (vp.mobile && fs < 14 && txt(el).length > 40) add('MINOR', 'font-too-small', path(el), `${fs}px body-ish text — use 16px so it reads without zooming. "${txt(el)}"`);
    const lh = s.lineHeight === 'normal' ? fs * 1.2 : parseFloat(s.lineHeight);
    if (txt(el).length > 80 && lh / fs < 1.35) add('MINOR', 'line-height', path(el), `line-height ${(lh / fs).toFixed(2)} on a long paragraph — 1.5 is the WCAG 1.4.12 target for body copy.`);
  });
  Array.from(document.querySelectorAll('p, li')).filter(shown).forEach((el) => {
    const t = (el.textContent || '').trim();
    if (t.length < 120) return;
    const fs = parseFloat(cs(el).fontSize);
    const ch = box(el).width / (fs * 0.5);
    if (ch > 85) add('MINOR', 'line-length', path(el), `~${Math.round(ch)} characters per line — cap body copy at ~75ch (max-w-prose / max-w-[65ch]).`);
  });

  /* 5. iOS input zoom ----------------------------------------------------- */
  Array.from(document.querySelectorAll('input, select, textarea')).filter(shown).forEach((el) => {
    const fs = parseFloat(cs(el).fontSize);
    if (fs < 16) add('MAJOR', 'ios-input-zoom', path(el), `Input font-size is ${fs}px. iOS Safari force-zooms the whole page on focus below 16px. Set text-base (16px) on inputs.`);
    if (vp.mobile) {
      const h = Math.round(box(el).height);
      if (h < 44 && el.type !== 'checkbox' && el.type !== 'radio') add('MAJOR', 'input-height', path(el), `Input is ${h}px tall — 44px+ is the comfortable thumb target.`);
      const type = (el.getAttribute('type') || '').toLowerCase();
      const name = ((el.name || '') + ' ' + (el.id || '') + ' ' + (el.placeholder || '')).toLowerCase();
      if (/phone|mobile|tel|contact|number/.test(name) && type !== 'tel')
        add('MINOR', 'input-keyboard', path(el), `Looks like a phone field but type="${type || 'text'}" — use type="tel" autocomplete="tel" to open the dial pad.`);
      if (/email|e-mail/.test(name) && type !== 'email')
        add('MINOR', 'input-keyboard', path(el), `Looks like an email field but type="${type || 'text'}" — use type="email" autocomplete="email".`);
      if (el.tagName === 'INPUT' && !el.hasAttribute('autocomplete') && /name|phone|tel|email|address|city|zip|pin/.test(name))
        add('MINOR', 'input-autocomplete', path(el), `No autocomplete attribute — autofill will not work, which costs conversions on mobile forms.`);
    }
  });

  /* 6. layout that never collapses ---------------------------------------- */
  if (vp.width <= 480) {
    visible.filter((el) => cs(el).display === 'grid' && el.children.length > 1).forEach((el) => {
      const cols = cs(el).gridTemplateColumns.split(' ').filter(Boolean);
      if (cols.length < 2) return;
      const widths = cols.map((c) => parseFloat(c)).filter((n) => !isNaN(n));
      const min = Math.min(...widths);
      if (widths.length >= 2 && min < 150)
        add('MAJOR', 'grid-not-collapsed', path(el), `${cols.length} grid columns at ${vp.width}px, narrowest ${Math.round(min)}px. Stack to 1 column on mobile (grid-cols-1 md:grid-cols-${cols.length}).`);
    });
    visible.filter((el) => { const s = cs(el); return s.display === 'flex' && s.flexDirection === 'row' && s.flexWrap === 'nowrap' && el.children.length > 2; }).forEach((el) => {
      const kids = Array.from(el.children).map((c) => box(c).width);
      const min = Math.min(...kids);
      const ox = cs(el).overflowX;
      if (min < 120 && ox !== 'auto' && ox !== 'scroll')
        add('MAJOR', 'flex-squeezed', path(el), `${el.children.length} flex children squeezed to ${Math.round(min)}px each with no wrap and no scroll. Use flex-col, flex-wrap, or make it a snap slider.`);
    });
    Array.from(document.querySelectorAll('table')).filter(shown).forEach((el) => {
      const w = box(el).width;
      const wrap = el.parentElement;
      const scrollable = wrap && ['auto', 'scroll'].includes(cs(wrap).overflowX);
      if (el.scrollWidth > VW - 16 && !scrollable)
        add('MAJOR', 'table-overflow', path(el), `Table is ${Math.round(el.scrollWidth)}px wide with no scroll wrapper. Wrap it: <div role="group" tabindex="0" aria-labelledby="..." class="overflow-x-auto">.`);
      else if (scrollable && !(wrap.hasAttribute('tabindex')))
        add('MINOR', 'table-a11y', path(wrap), `Scrollable table wrapper has no tabindex="0" — keyboard users cannot scroll it.`);
    });
  }

  /* 7. edge gutters ------------------------------------------------------- */
  if (vp.mobile) {
    const bigText = visible.filter((el) => {
      const r = box(el);
      return r.width > VW * 0.5 && r.height > 20 && r.height < 400 && txt(el).length > 15 &&
        Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim());
    });
    bigText.forEach((el) => {
      if (inScroller(el)) return; // slider items legitimately sit off-screen
      const r = box(el);
      if (r.left < -1 || r.right > VW + 1) return;
      const g = Math.min(r.left, VW - r.right);
      if (g < 12) add('MINOR', 'edge-gutter', path(el), `Text sits ${Math.round(g)}px from the screen edge. Give the page a 16–24px side gutter (px-4 / px-5).`);
    });
  }

  /* 8. viewport-height traps ---------------------------------------------- */
  visible.forEach((el) => {
    if (/100vh/.test(el.getAttribute('style') || ''))
      add('MINOR', 'vh-unit', path(el), `Inline 100vh — mobile browser chrome makes this overflow. Use 100dvh (Tailwind: h-dvh / min-h-dvh).`);
  });
  try {
    for (const sheet of Array.from(document.styleSheets)) {
      let rules; try { rules = sheet.cssRules; } catch { continue; }
      if (!rules) continue;
      const walk = (rs) => Array.from(rs).forEach((r) => {
        if (r.style && /\b\d*100vh\b|:\s*100vh/.test(r.style.cssText || '')) {
          const prop = /min-height/.test(r.style.cssText) ? 'min-height' : 'height';
          add('MINOR', 'vh-unit', r.selectorText || '(css rule)', `CSS rule sets ${prop}:100vh — on mobile the address bar makes this taller than the screen. Switch to 100dvh (Tailwind h-dvh / min-h-dvh).`);
        }
        if (r.cssRules) walk(r.cssRules);
      });
      walk(rules);
    }
  } catch { /* cross-origin sheet */ }

  /* 9. images ------------------------------------------------------------- */
  const imgs = Array.from(document.querySelectorAll('img')).filter(shown);
  imgs.forEach((el) => {
    const r = box(el);
    const nw = el.naturalWidth || 0;
    if (!el.hasAttribute('width') && !el.hasAttribute('height') && !cs(el).aspectRatio.includes('/') && cs(el).position !== 'absolute')
      add('MINOR', 'img-cls', path(el), `No width/height or aspect-ratio — causes layout shift (CLS). next/image sets these for you.`);
    if (nw && r.width && nw > r.width * 2.5)
      add('MAJOR', 'img-oversized', path(el), `Serving a ${nw}px-wide image into a ${Math.round(r.width)}px box — ${Math.round(nw / r.width)}× too big. Add a sizes attribute so mobile downloads a small file.`);
    if (!el.hasAttribute('srcset') && !el.closest('picture') && r.width > VW * 0.6 && nw > 800)
      add('MINOR', 'img-no-srcset', path(el), `Large image with no srcset/sizes — phones download the desktop file.`);
    if (!el.hasAttribute('alt')) add('MINOR', 'img-alt', path(el), `Missing alt attribute.`);
  });
  const belowFold = imgs.filter((el) => box(el).top > vp.height && el.getAttribute('loading') !== 'lazy').length;
  if (belowFold > 2) add('MINOR', 'img-lazy', 'img', `${belowFold} below-the-fold images are not loading="lazy".`);

  /* 10. sticky chrome eating the screen ----------------------------------- */
  if (vp.mobile) {
    const fixed = visible.filter((el) => { const p = cs(el).position; return p === 'fixed' || p === 'sticky'; });
    let used = 0;
    fixed.forEach((el) => {
      const r = box(el);
      if (r.width > VW * 0.8 && r.height > 24) used += r.height;
    });
    if (used > vp.height * 0.2)
      add('MAJOR', 'sticky-overload', 'fixed elements', `Fixed/sticky bars eat ${Math.round(used)}px = ${Math.round((used / vp.height) * 100)}% of a ${vp.height}px screen. Keep the total under 20% — shrink the header on scroll and keep the bottom bar to ~64px.`);
  }

  /* 11. what disappears on mobile ----------------------------------------- */
  const hidden = all.filter((el) => cs(el).display === 'none' && (el.textContent || '').trim().length > 25)
    .filter((el) => { let p = el.parentElement; while (p) { if (cs(p).display === 'none') return false; p = p.parentElement; } return true; })
    .slice(0, 40)
    .map((el) => ({ selector: path(el), chars: (el.textContent || '').trim().length, preview: txt(el) }));

  /* 12. scroll/slider inventory ------------------------------------------- */
  const sliders = visible.filter((el) => ['auto', 'scroll'].includes(cs(el).overflowX) && el.scrollWidth > el.clientWidth + 16)
    .map((el) => {
      const s = cs(el);
      const first = el.children[0];
      const fw = first ? Math.round(box(first).width) : 0;
      return {
        selector: path(el),
        items: el.children.length,
        itemWidth: fw,
        peek: el.clientWidth - fw,
        snap: s.scrollSnapType,
        hasSnap: s.scrollSnapType !== 'none' && s.scrollSnapType !== '',
      };
    });
  sliders.forEach((s) => {
    if (!s.hasSnap) add('MINOR', 'slider-no-snap', s.selector, `Horizontal scroller with no scroll-snap — swipes land mid-card. Add snap-x snap-mandatory + snap-start on children.`);
    if (vp.mobile && s.peek < 8 && s.items > 1) add('MINOR', 'slider-no-peek', s.selector, `Cards fill the full width with no peek. Leave 24–40px of the next card visible so users know it scrolls (NN/g: partial visibility is the strongest swipe cue).`);
    if (s.items > 8) add('MINOR', 'slider-too-long', s.selector, `${s.items} items in one slider. NN/g: the last item should be 3–4 swipes away; cap at ~6 and link to a full page.`);
  });

  /* 13. clipped content --------------------------------------------------- */
  visible.filter((el) => cs(el).overflowX === 'hidden' && el.scrollWidth > el.clientWidth + 8 && el.clientWidth > 100)
    .slice(0, 10)
    .forEach((el) => add('MAJOR', 'content-clipped', path(el), `overflow-hidden is cutting off ${Math.round(el.scrollWidth - el.clientWidth)}px of content with no way to reach it.`));

  return {
    findings: out,
    hiddenOnThisViewport: hidden,
    sliders,
    stats: {
      viewportWidth: VW,
      docScrollWidth: docW,
      visibleTextChars: (document.body.innerText || '').length,
      visibleLinks: Array.from(document.querySelectorAll('a')).filter(shown).length,
      visibleImages: imgs.length,
      domNodes: all.length,
      firstScreenChars: (() => {
        let n = 0;
        visible.forEach((el) => { const r = box(el); if (r.top < vp.height && r.top >= 0) { Array.from(el.childNodes).forEach((c) => { if (c.nodeType === 3) n += c.textContent.trim().length; }); } });
        return n;
      })(),
    },
  };
}

/* ------------------------------------------------------------------- main */
const run = async () => {
  const browser = await chromium.launch();
  const report = { url: URL_ARG, generatedAt: new Date().toISOString(), viewports: {} };
  if (SHOTS) mkdirSync(OUT_DIR, { recursive: true });

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: vp.mobile ? UA_MOBILE : undefined,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
      deviceScaleFactor: vp.mobile ? 2 : 1,
    });
    const page = await ctx.newPage();
    try {
      await page.goto(URL_ARG, { waitUntil: 'networkidle', timeout: 45000 });
    } catch {
      await page.goto(URL_ARG, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {});
    }
    await page.waitForTimeout(1200);
    await page.evaluate(async () => {
      // trigger lazy content, then return to top
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(600);

    report.viewports[vp.name] = { ...vp, ...(await page.evaluate(collect, vp)) };
    if (SHOTS) await page.screenshot({ path: `${OUT_DIR}/${vp.name}.png`, fullPage: true }).catch(() => {});
    await ctx.close();
  }
  await browser.close();

  /* --- content-parity diff: what desktop shows that mobile does not ------ */
  const d = report.viewports.desktop, m = report.viewports.mobile;
  if (d && m) {
    const mSel = new Set(m.hiddenOnThisViewport.map((h) => h.selector));
    const dSel = new Set(d.hiddenOnThisViewport.map((h) => h.selector));
    report.contentParity = {
      hiddenOnMobileOnly: m.hiddenOnThisViewport.filter((h) => !dSel.has(h.selector)),
      hiddenOnDesktopOnly: d.hiddenOnThisViewport.filter((h) => !mSel.has(h.selector)),
      textCharsDesktop: d.stats.visibleTextChars,
      textCharsMobile: m.stats.visibleTextChars,
      textDropPct: Math.round((1 - m.stats.visibleTextChars / Math.max(1, d.stats.visibleTextChars)) * 100),
    };
  }

  const flat = Object.entries(report.viewports).flatMap(([v, r]) => r.findings.map((f) => ({ viewport: v, ...f })));
  report.summary = {
    blockers: flat.filter((f) => f.severity === 'BLOCKER').length,
    major: flat.filter((f) => f.severity === 'MAJOR').length,
    minor: flat.filter((f) => f.severity === 'MINOR').length,
  };

  if (SHOTS) writeFileSync(`${OUT_DIR}/report.json`, JSON.stringify(report, null, 2));
  if (JSON_OUT) { console.log(JSON.stringify(report, null, 2)); }
  else {
    const S = report.summary;
    console.log(`\n  RESPONSIVE AUDIT — ${URL_ARG}`);
    console.log(`  ${S.blockers} blocker · ${S.major} major · ${S.minor} minor\n`);
    for (const [v, r] of Object.entries(report.viewports)) {
      const fs = r.findings;
      console.log(`  ── ${v} (${r.width}×${r.height}) ${'─'.repeat(Math.max(0, 40 - v.length))}`);
      if (!fs.length) { console.log('     clean\n'); continue; }
      ['BLOCKER', 'MAJOR', 'MINOR'].forEach((sev) => {
        const group = fs.filter((f) => f.severity === sev);
        group.slice(0, 12).forEach((f) => {
          console.log(`     [${sev}] ${f.rule}${f.count > 1 ? `  ×${f.count}` : ''}`);
          console.log(`        ${f.selector}`);
          console.log(`        ${f.message}`);
        });
        if (group.length > 12) console.log(`     … ${group.length - 12} more ${sev} findings (see ${OUT_DIR}/report.json)`);
      });
      console.log('');
    }
    if (report.contentParity) {
      const cp = report.contentParity;
      console.log(`  ── content parity ───────────────────────────────`);
      console.log(`     desktop shows ${cp.textCharsDesktop} chars, mobile ${cp.textCharsMobile} (${cp.textDropPct}% dropped)`);
      cp.hiddenOnMobileOnly.slice(0, 12).forEach((h) => console.log(`     hidden on mobile only: ${h.selector} — "${h.preview}"`));
      console.log('');
    }
    if (SHOTS) console.log(`  screenshots + report.json → ./${OUT_DIR}/\n`);
  }
  process.exit(report.summary.blockers > 0 ? 1 : 0);
};

run().catch((e) => { console.error('audit failed:', e.message); process.exit(2); });

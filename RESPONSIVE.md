# RESPONSIVE.md — mobile + desktop rulebook

**Project:** Divinity Total Skin Care (Mansarovar, Jaipur)
**Stack:** React 18 + design-system tokens, bundled by esbuild to static HTML
**Status:** binding. When this file and a design mockup disagree, this file wins.

> **Stack note.** This rulebook was written against Next.js + Tailwind v4. This repo is
> plain React with inline-style components over CSS custom-property tokens (`tokens/`),
> compiled to `ui_kits/website/dist/app.js`. Every **number and rule below is binding**;
> only the Tailwind class names and `next/image` snippets are illustrative. Read
> `grid-cols-1 md:grid-cols-3` as "one column on phones, three from 768px" and implement
> it with the tokens this repo actually has. The audit script measures the rendered DOM,
> so it is the authority on compliance regardless of how the CSS is written.

An agent reading this file should be able to audit and fix any page without asking
follow-up questions. Every number here comes from a published spec or measured
research, not taste — sources are at the bottom.

---

## 0. How to use this file

1. Run the audit: `node scripts/responsive-audit.mjs http://localhost:3000`
2. Fix **BLOCKER** first, then **MAJOR**, then **MINOR**.
3. Re-run until blockers are zero. The script exits `1` while any blocker remains.
4. Never fix a finding by hiding the element unless §6 says hiding is allowed.

---

## 1. The numbers (non-negotiable)

| Thing | Value | Where it comes from |
|---|---|---|
| Smallest supported width | **320px** | iPhone SE / small Android portrait |
| Primary test width | **390px** | iPhone 14/15 class |
| Tap target — absolute floor | **24 × 24 CSS px** | WCAG 2.2 SC 2.5.8 (AA) |
| Tap target — house standard | **44 × 44 px** | Apple HIG; WCAG 2.5.5 (AAA) |
| Primary CTA target | **48 px tall** | Material Design 3 |
| Gap between small targets | **≥ 8 px** | crowding causes mis-taps |
| Body text | **16 px** minimum | readability + iOS |
| Form input font-size | **16 px exactly, never less** | below 16px iOS Safari force-zooms the page on focus |
| Caption / legal floor | **12 px** | anything smaller is unreadable |
| Body line-height | **1.5** | WCAG 1.4.12 |
| Line length | **50–75 characters**, hard cap 80 | Baymard; WCAG 1.4.8 |
| Side gutter, mobile | **16–24 px** (`px-4` / `px-5`) | thumb reach + edge safety |
| Content max-width | **1280 px** (`max-w-7xl`) | keeps measure sane on 1440+ |
| Full-height sections | **`dvh`, never `vh`** | mobile address bar changes viewport height |
| Fixed/sticky chrome total | **≤ 20% of screen height** | ~168px on a 844px phone |
| LCP / INP / CLS | **< 2.5s / < 200ms / < 0.1** at p75 | Core Web Vitals |

---

## 2. Breakpoints

Tailwind is **mobile-first**. An unprefixed class applies everywhere; `md:` applies
at 768px **and up**. Never use `sm:` to mean "on phones" — that is 640px and wider.

| Prefix | Min width | Use it for |
|---|---|---|
| *(none)* | 0 | the phone layout — this is the default, write it first |
| `sm:` | 640px | large phones landscape, small tablets |
| `md:` | 768px | tablet portrait — **the main layout switch** |
| `lg:` | 1024px | laptop — desktop nav appears here |
| `xl:` | 1280px | wide desktop |
| `2xl:` | 1536px | rarely needed |

Only two of these should carry real layout change on this site: **`md:`** (1-col → 2-col,
mobile CTA bar disappears) and **`lg:`** (2-col → 3-col, hamburger → full nav).
If a component needs a breakpoint at every step, the component is wrong.

**Prefer container queries for cards.** A treatment card does not care how wide the
screen is, it cares how wide its own slot is:

```jsx
<div className="@container">
  <article className="flex flex-col @sm:flex-row @sm:items-center gap-4">
```

That card then works in a 1-col stack, a 3-col grid and a slider without new rules.

---

## 3. The layout shell

Every section uses the same wrapper. No exceptions, no one-off padding.

```jsx
// components/container.tsx
export function Container({ className = '', children }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
```

Section rhythm — one scale, applied everywhere:

```jsx
<section className="py-14 sm:py-20 lg:py-28">
```

Vertical space between elements inside a section: use `space-y-*` or `gap-*` on the
parent. **Never** put `mb-*` on individual children — that is how spacing drifts.

**Global guard** in `globals.css`:

```css
img, video, svg, canvas { max-width: 100%; height: auto; }
* { min-width: 0; }   /* stops flex/grid children refusing to shrink */
```

`* { min-width: 0 }` fixes the single most common Tailwind bug: a flex or grid child
with long text, a wide table, or a `<pre>` inside it refuses to shrink below its content
width and pushes the whole page sideways. Flex and grid items default to
`min-width: auto`, which means "never smaller than my content".

**Do not add `html, body { overflow-x: hidden }` or `clip`.** It is the most commonly
recommended fix on the internet and it is wrong. It does not fix the overflow — it hides
the scrollbar while the content stays broken and unreachable, and it blinds the audit
script: `scrollWidth` gets clamped to the viewport, so a genuinely broken 520px element
on a 390px screen reports clean. Measured on the test fixture, adding that one line
dropped 8 real blockers to 0 while the page stayed just as broken. Find the element
that is too wide and fix that element.

---

## 4. Type scale

Fluid, so there is no jump at a breakpoint. Define once in `globals.css`:

```css
@theme {
  --text-display: clamp(2rem, 1.2rem + 4vw, 3.75rem);   /* h1  32 → 60 */
  --text-h2:      clamp(1.5rem, 1.1rem + 2vw, 2.25rem); /* h2  24 → 36 */
  --text-h3:      clamp(1.25rem, 1.1rem + .8vw, 1.5rem);/* h3  20 → 24 */
  --text-body:    1rem;                                  /* 16 everywhere */
  --text-lead:    clamp(1rem, .95rem + .4vw, 1.125rem);  /* 16 → 18 */
}
```

In Tailwind v4 the `--text-*` namespace auto-generates utilities, so those five keys
give you `text-display`, `text-h2`, `text-h3`, `text-body` and `text-lead` directly —
no arbitrary-value syntax needed.

Rules:

- `h1` — one per page. `text-display font-semibold tracking-tight text-balance`
- Body copy always gets a measure cap: `max-w-[65ch]` (or `max-w-prose`).
- `text-balance` on headings, `text-pretty` on paragraphs — stops orphan words on mobile.
- Never `text-xs` (12px) on anything a patient needs to read. It is for legal lines only.
- Never `text-sm` on an input. See §10.

---

## 5. Touch and interaction

```jsx
// every interactive element
className="min-h-11 min-w-11 inline-flex items-center justify-center"  // 44px
// primary CTA
className="min-h-12 px-6 text-base font-medium"                        // 48px
```

- Icon-only buttons need `min-h-11 min-w-11` plus `aria-label`. A 20px icon in a 44px
  box is correct; a 20px button is a bug.
- Adjacent small controls need `gap-2` (8px) minimum.
- **Hover is not available on touch.** Any content revealed on `:hover` must also be
  reachable by tap. Guard hover-only effects: `@media (hover: hover) { … }`, or in
  Tailwind, `hover:` styles are fine for polish but must never be the only way to see
  something.
- Give tap feedback: `active:scale-[.98] transition-transform`. Touch has no hover
  state, so without this the button feels dead.

---

## 6. Dense content: the four moves

This is the core decision. When something does not fit on a 390px screen, there are
exactly four legal moves. **Deleting content is the last one and it is almost never right.**

| Move | Tailwind | When | Cost |
|---|---|---|---|
| **1. Stack** | `grid-cols-1 md:grid-cols-3` | anything in columns | page gets longer |
| **2. Collapse** | `<details>` / accordion | long text, FAQs, long lists | one extra tap |
| **3. Slide** | snap slider (§7) | 4+ peer items users browse, not compare | sequential access |
| **4. Drop** | `hidden md:block` | **decoration only** | content is gone |

### The rule for "hide unrequired data"

> **If it contains words, collapse it. If it is decoration, drop it.**

Google indexes content inside accordions and tabs and ranks it the same as visible
text — *provided it is in the HTML at page load*, not fetched on click. So an accordion
costs you nothing in SEO. But `display: none` content that never renders on mobile, or
content only injected after a click, is content mobile users and mobile-first indexing
may never get. That is why Drop is restricted to things with no information in them:
background illustrations, decorative dividers, the second hero image, desktop-only
spacer graphics.

### Applied to this site

| Content | Mobile | Desktop |
|---|---|---|
| Call + Book CTA | sticky bottom bar, always visible | inline in header |
| Nav (7 items) | logo + Call + hamburger sheet | full horizontal nav |
| Treatment cards (8–12) | 1-col stack, "View all" after 6 | 3-col grid |
| Doctor bios (Dr. Manjul, Dr. Baliyan) | stacked cards; qualifications in an accordion | 2-col with full bio |
| Patient reviews (735 on Practo) | snap slider, 5 cards max, then link out | 3-col grid |
| Before/after gallery | snap slider with peek | masonry grid |
| Treatment pricing table | one card per treatment | real table |
| Clinic timings / address | always visible, `tel:` and Maps links live | sidebar |
| Long clinical copy | first 3 lines + "Read more" accordion | full paragraph |
| Footer link columns | `<details>` groups | 4 columns |
| Hero background illustration | `hidden md:block` | visible |

Note the pattern: **nothing with information in it is dropped.** The reviews still
exist, they are in a slider. The bios still exist, they are in an accordion. Only the
decorative illustration is actually removed.

### Collapse, correctly

```jsx
<details className="group border-b border-neutral-200 py-4">
  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-medium">
    Is laser hair reduction safe for Indian skin?
    <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" />
  </summary>
  <div className="pt-3 text-neutral-600 max-w-[65ch]">
    {/* real text, server-rendered, present in the HTML on load */}
  </div>
</details>
```

`<details>` needs no JavaScript, is keyboard accessible, and its content is in the
initial HTML — so it is SEO-safe. Prefer it over a `useState` accordion.

---

## 7. Sliders, done right

A slider is not a fallback for "too much stuff". Use it only when items are **peers the
user browses**, never when they need to **compare** (comparison needs a stacked or
aligned layout).

Research constraints (NN/g mobile carousel studies):

- The **last item must be reachable in 3–4 swipes.** Cap at **6 items**, then a
  "View all →" link. A 20-item slider is a dead end.
- **Partial visibility of the next card is the strongest swipe signal.** Dots are weak
  signifiers — too small to notice. Always leave **24–40px of the next card visible**.
- Best content first. Most users never reach item 4.
- Swipe must work. Arrows are a supplement on desktop, not the primary control.

```jsx
{/* full-bleed on mobile so cards peek past the gutter, contained on desktop */}
<ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5
               pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
               sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0
               lg:grid-cols-3">
  {reviews.slice(0, 6).map((r) => (
    <li key={r.id}
        className="w-[82%] shrink-0 snap-start sm:w-auto">   {/* 82% ⇒ ~18% peek */}
      <ReviewCard {...r} />
    </li>
  ))}
</ul>
```

Why `w-[82%]`: on a 390px screen that is 320px of card and ~50px of the next one
showing — the peek. At `sm:` the whole thing becomes a plain grid and the slider
behaviour disappears entirely.

Accessibility, non-optional:

- The scroller gets `tabindex="0"` and `role="group"` with an `aria-label`, or keyboard
  users cannot scroll it at all.
- `scroll-behavior: smooth` only inside `@media (prefers-reduced-motion: no-preference)`.
- No autoplay. Ever. It steals the reader's position.

---

## 8. Tables and pricing

A real `<table>` below `md:` is almost always wrong on a phone. Two correct answers:

**Preferred — cards on mobile, table on desktop.** Same data, rendered twice:

```jsx
{/* mobile */}
<ul className="space-y-3 md:hidden">
  {treatments.map((t) => (
    <li key={t.slug} className="rounded-xl border p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-medium">{t.name}</h3>
        <span className="shrink-0 font-semibold">₹{t.priceFrom}</span>
      </div>
      <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-neutral-600">
        <dt>Sessions</dt><dd className="text-right">{t.sessions}</dd>
        <dt>Downtime</dt><dd className="text-right">{t.downtime}</dd>
      </dl>
    </li>
  ))}
</ul>

{/* desktop */}
<div className="hidden md:block">
  <table className="w-full">…</table>
</div>
```

**Acceptable — one scrollable table**, when the columns genuinely must stay aligned:

```jsx
<div role="group" tabindex={0} aria-labelledby="pricing-caption"
     className="overflow-x-auto">
  <table className="w-full min-w-[640px]">
    <caption id="pricing-caption" className="sr-only">Treatment pricing</caption>
    …
  </table>
</div>
```

The `tabindex={0}` and `role="group"` are required — without them a keyboard user
cannot reach or scroll the region. This is the one place `overflow-x` is allowed.

---

## 9. Images

Use `next/image` everywhere. It sets `width`/`height` (so no layout shift) and emits
`srcset` automatically. What it does **not** guess is `sizes` — you must write it, or
phones download the 1440px desktop file.

```jsx
<Image
  src={treatment.image}
  alt="Laser hair reduction at Divinity Total Skin Care"
  width={800} height={600}
  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
  className="aspect-[4/3] w-full rounded-xl object-cover"
/>
```

- Hero image: `priority` (it is the LCP element). Everything else: default lazy.
- Always set `aspect-[…]` so the box reserves space before the image lands — this is
  most of your CLS budget.
- Portrait crops read better on phones, landscape on desktop. Swap with `<picture>` +
  `media`, or just use `object-cover` with a different `aspect-` per breakpoint:
  `aspect-square md:aspect-[16/9]`.
- Clinic photos of real staff and the real interior outperform stock. Compress to WebP,
  target under 150KB each.
- Decorative images get `alt=""`, not a missing `alt`.

---

## 10. The booking form

This is where the money is. On a clinic site most conversions are a phone call, and the
rest are this form.

```jsx
<input
  type="tel"                 // opens the dial pad
  name="phone"
  autoComplete="tel"         // enables autofill
  inputMode="numeric"
  enterKeyHint="next"
  className="min-h-12 w-full rounded-lg border px-4 text-base"  // text-base = 16px
/>
```

| Field | `type` | `autoComplete` | Extra |
|---|---|---|---|
| Name | `text` | `name` | `enterKeyHint="next"` |
| Phone | `tel` | `tel` | `inputMode="numeric"` |
| Email | `email` | `email` | lowercase, no autocapitalize |
| Preferred date | `date` | — | native picker beats any JS one |
| Concern | `<select>` | — | short list, not free text |

- **`text-base` (16px) on every input.** `text-sm` triggers iOS Safari's auto-zoom on
  focus, which yanks the layout sideways and does not zoom back out. This is the single
  most common mobile bug in v0/bolt output.
- Labels above inputs, never placeholder-as-label — the placeholder vanishes on focus.
- Full-width inputs on mobile, `min-h-12`.
- Ask for the fewest fields that let the clinic call back: name + phone. Everything else
  is optional.
- Errors inline under the field, in text — not colour alone.

---

## 11. Sticky chrome and the mobile CTA bar

A local clinic gets called, not emailed. The phone number is the primary conversion on
mobile and it should never be more than one tap away.

```jsx
{/* fixed bottom bar — mobile only, hidden from lg: where the header CTA is visible */}
<div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 backdrop-blur
                pb-[env(safe-area-inset-bottom)] lg:hidden">
  <div className="grid grid-cols-2 gap-2 p-3">
    <a href="tel:+911234567890"
       className="flex min-h-12 items-center justify-center gap-2 rounded-lg
                  border font-medium">
      <Phone className="size-5" /> Call
    </a>
    <a href="#book"
       className="flex min-h-12 items-center justify-center rounded-lg
                  bg-teal-700 font-medium text-white">
      Book appointment
    </a>
  </div>
</div>
```

- `pb-[env(safe-area-inset-bottom)]` keeps it clear of the iPhone home indicator.
- Add `pb-24 lg:pb-0` to the page footer so the bar never covers the last content.
- Header + bottom bar together must stay **under 20% of screen height** (~168px on a
  844px phone). Shrink the header on scroll if needed.
- `tel:` links must use the full international format: `tel:+919876543210`.

---

## 12. Performance budget

Mobile visitors in Jaipur are on 4G, not office wifi. Targets at p75:

| Metric | Good | Main lever |
|---|---|---|
| LCP | < 2.5s | hero image `priority`, correct `sizes`, no render-blocking font |
| INP | < 200ms | ship less JS — server components by default |
| CLS | < 0.1 | width/height or aspect-ratio on every image; reserve space for the sticky bar |

- Default to **server components**. `'use client'` only on the accordion, the mobile
  menu, and the form.
- `next/font` with `display: swap` and a real fallback stack.
- No carousel library. The CSS scroll-snap slider in §7 is ~0 KB.

---

## 13. Anti-patterns — what AI-generated pages ship that breaks on phones

These are the recurring ones. Check for each by name.

1. `min-w-[600px]` or a fixed `w-[720px]` on a card or table → sideways scroll.
2. `h-screen` / `min-h-screen` on the hero → use `min-h-dvh` (the address bar).
3. `text-sm` on form inputs → iOS zooms the page on focus.
4. `grid-cols-3` with no `grid-cols-1` default → three 100px columns on a phone.
5. `flex` with no `flex-wrap` and no `min-w-0` → children refuse to shrink.
6. `whitespace-nowrap` on a heading or a table cell → overflow.
7. `hidden md:block` on real content → mobile users lose it.
8. `overflow-hidden` used to "fix" overflow → content is clipped and unreachable.
9. Icon buttons at `size-6` (24px) → under the 44px target.
10. `absolute` positioned decorations with negative offsets → push the page wide at 320px.
11. `100vw` widths → includes the scrollbar on desktop, causes a 15px overflow. Use `w-full`.
12. Desktop-sized section padding (`py-32`) on mobile → the phone becomes endless scrolling.
13. A hamburger menu that renders a `<div>` overlay without `aria-expanded` / focus trap.
14. Hover-only reveals (`group-hover:opacity-100`) with no tap equivalent.

---

## 14. Self-audit checklist

Before calling a page done, at **320px and 390px**:

- [ ] No sideways scroll. `document.documentElement.scrollWidth === clientWidth`.
- [ ] Every button, link and input is at least 44px tall.
- [ ] Every input is exactly 16px font-size.
- [ ] Body text is 16px, line-height 1.5, capped at 65ch.
- [ ] Nothing sits closer than 16px to the screen edge.
- [ ] Every grid is 1 column.
- [ ] Every slider snaps, shows a peek, and has ≤ 6 items.
- [ ] No `display:none` on anything containing sentences.
- [ ] Phone number is one tap away at every scroll position.
- [ ] Header + bottom bar together under 20% of the screen.
- [ ] Images have `sizes` and a reserved aspect ratio.
- [ ] `min-h-dvh`, not `min-h-screen`.

At **768 / 1024 / 1440px**:

- [ ] Content is centred with `max-w-7xl`, not stretched edge to edge.
- [ ] Paragraphs still capped at 65ch — no 200-character lines.
- [ ] Grids fill their row (no orphan card alone on the last row where it can be avoided).
- [ ] The mobile CTA bar is gone; the header CTA is present.
- [ ] Sliders have become grids.
- [ ] Hover states exist and are not the only way to reach anything.

Then run: `node scripts/responsive-audit.mjs http://localhost:3000` and get to zero blockers.

---

## 14b. Mobile patterns in this repo

Two components implement §6's moves. Both branch on `useIsMobile()`
(`components/hooks/useMediaQuery.js`, a `matchMedia` subscription at 767px) because
this kit styles inline and has no `md:` prefix available. Desktop renders the same
markup it did before either existed.

### `MobileActionStack` — the conversion bar, off the content

A full-width bottom bar costs ~110px of every phone screen and truncates its own
labels. `ui_kits/website/MobileActionStack.jsx` puts Directions / Call / WhatsApp in
the bottom-right corner instead: 48px circles, 56px for WhatsApp as the primary and
the one closest to the thumb.

- Hidden until an `IntersectionObserver` on `[data-hero-cta]` reports the hero CTAs
  have left the viewport — on first load the hero already carries that button, and a
  floating copy of it is noise.
- `bottom: calc(16px + env(safe-area-inset-bottom, 0px))` clears the home indicator.
- The hidden state must not park the element past the right edge. A 24px outward
  translate reads as real horizontal overflow to the audit and to the browser; slide
  from **inside** the gutter and set `visibility: hidden`.
- Nothing else may sit at the bottom-right of a section on mobile. A full-width button
  there scrolls underneath the stack — keep such buttons auto-width and left-aligned.

### `MobileCarousel` — card grids that swipe

`components/layout/MobileCarousel.jsx` renders a scroll-snap strip below 768px and
hands `gridStyle` straight back above it. Apply it where **3+ same-type cards** would
otherwise stack. Not for the two doctor profiles, not for the FAQ (that is `<details>`,
§6), not for anything that must be read in order.

- Slides are `84%` wide so ~16% of the next card shows. The peek is the affordance;
  dots alone are too small to notice.
- The strip bleeds to the screen edge (`margin-inline: calc(-1 * var(--page-gutter))`)
  and pads back in, so the first card lines up with the section heading.
- Dots are tracked by an `IntersectionObserver` at threshold 0.6 against the strip as
  root — never scroll-position maths. Each dot is a **44×44 button** around a 6px mark;
  a 24px-wide hit area fails the house target and squeezes the row.
- Strip carries `role="region"`, `aria-roledescription="carousel"` and `tabIndex={0}`;
  slides carry `role="group"` and `aria-label="N of M"`. No autoplay, ever.

### Compact preview in the hero, full card lower down

A product visual tall enough to be worth showing is usually tall enough to get sliced
in half at the fold. The phone mockup did exactly that: the mobile hero ended on a
half-drawn card, which reads as broken rather than as "scroll for more".

The fix is not to delete it on mobile but to **split it by job**:

- `ui_kits/website/ChatPreviewCompact.jsx` renders its *first message only* — avatar,
  bubble with a tail toward the avatar, and a muted `clinic · replies on WhatsApp`
  line — at ~86px, placed directly above the primary CTA through `Hero`'s `beforeCta`
  slot. Sitting on top of the button, it makes the button read as the reply to it.
- The full mockup moves to the closest booking section to the footer (here "Find the
  clinic"), where it has room to be seen whole and does a second job: showing what
  booking actually looks like.
- Both read `BOOKING_THREAD` from `clinic.js`. Never copy the message text into a
  second component — the preview is the same conversation, not a retelling of it.

Check the swap at **exactly 767px and 768px**: one full card at each width and never
two, plus the compact preview only below the breakpoint.

The hero then needs an ending. Group the quiet trailing lines (bilingual tagline,
landmark) under a `1px rgba(255,255,255,0.15)` divider so the band closes deliberately
instead of trailing off, and drop the secondary CTA to an underlined text link at a
44px target — a second full-width pill competes with the primary.

### Mobile type and spacing

Retuned at the **token** level in `ui_kits/website/index.html` under
`@media (max-width: 767px)`, not per component, so every section follows and nothing
above 768px moves: `--text-heading-lg` drops to `clamp(30px, 8vw, 36px)`,
`--text-heading` to `clamp(26px, 7vw, 32px)`, `--section-padding-y` to 52px.

A grid of two tracks narrower than 150px still counts as uncollapsed (§13 anti-pattern
4). The stats block uses `autoFit(140)` so it is 2-up from ~360px and single-column
below, rather than forcing two 136px columns onto a 320px screen.

---

## 15. Sources

- [WCAG 2.2 SC 2.5.8 Target Size (Minimum) — 24×24 CSS px, Level AA](https://silktide.com/accessibility-guide/the-wcag-standard/2-5/input-modalities/2-5-8-target-size-minimum/) and [SC 2.5.5 Enhanced — 44×44](https://accessibility.build/wcag/2-5-5)
- [Apple Human Interface Guidelines — 44×44pt minimum tap target, 8pt grid](https://www.brilworks.com/blog/apple-human-interface-guidelines/)
- [Material Design 3 — window size classes: compact < 600dp, medium 600–840dp, expanded 840dp+; 48dp touch targets](https://m3.material.io/foundations/layout/breakpoints)
- [Tailwind CSS — default breakpoints and mobile-first responsive design](https://tailwindcss.com/docs/responsive-design)
- [web.dev — the large, small and dynamic viewport units (dvh/svh/lvh)](https://web.dev/blog/viewport-units)
- [CSS-Tricks — 16px or larger text prevents iOS form zoom](https://css-tricks.com/16px-or-larger-text-prevents-ios-form-zoom/)
- [CSS-Tricks — better form inputs for better mobile user experiences (type, inputmode, autocomplete)](https://css-tricks.com/better-form-inputs-for-better-mobile-user-experiences/)
- [Nielsen Norman Group — Carousels on mobile devices (3–4 swipes to the last item, peek beats dots)](https://www.nngroup.com/articles/mobile-carousels/)
- [Baymard Institute — optimal line length 50–75 characters](https://baymard.com/blog/line-length-readability)
- [Smashing Magazine — accessible responsive table patterns (role="group" + tabindex="0")](https://www.smashingmagazine.com/2022/12/accessible-front-end-patterns-responsive-tables-part1/)
- [Fresh Egg — how Google treats content in accordions and tabs under mobile-first indexing](https://www.freshegg.co.uk/blog/how-does-google-treat-hidden-content/)
- [Core Web Vitals thresholds — LCP < 2.5s, INP < 200ms, CLS < 0.1 at p75](https://www.corewebvitals.io/core-web-vitals)

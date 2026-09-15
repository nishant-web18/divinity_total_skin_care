# Chat for Impact — Design System

A healthcare-messaging visual system: **a deep forest-green brand surface, pastel "rooms" for section rhythm, one coral action colour, and DM Sans at every size from 12px to 116px.**

It is built from a single source: the style reference at `uploads/DESIGN.md` (captured from refero.design, style `18975f37-2e5d-47ca-9367-8b201d20390d`). No codebase, Figma file, logo, photography or icon set was supplied — everything here is derived from that document, and every place where an asset is missing is flagged rather than faked.

**Sources given**
- `uploads/DESIGN.md` — tokens, component descriptions, do/don't rules, layout and imagery notes.
- Reference URL: `https://styles.refero.design/style/18975f37-2e5d-47ca-9367-8b201d20390d`

The system is deliberately generic: it is a *style* system for a chat-based health service, not a recreation of any company's brand. Product copy, names and numbers in the UI kit are sample content.

---

## Index

| Path | What it is |
|------|------------|
| `styles.css` | The single entry point — `@import`s everything below. Link this one file. |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `shape.css`, `surfaces.css`, `base.css` |
| `guidelines/` | 20 foundation specimen cards (Colors, Type, Spacing, Brand) |
| `components/` | 11 React primitives, grouped by concern — see below |
| `ui_kits/website/` | Divinity Total Skin Care clinic site (Home / Treatments / Doctors / Fees & FAQ / Contact) |
| `assets/ds-dev-loader.js` | Dev-time JSX loader so every card and kit renders straight from source |
| `SKILL.md` | Agent-Skill wrapper for use in Claude Code |

**Components** — `buttons/Button`, `tags/Tag`, `forms/Input`, `navigation/TopNav`, `lists/ChecklistItem`, `cards/PastelCard`, `cards/ProductCard`, `product/PhoneMockup`, `product/ChatBubble`, `feedback/NotificationCard`, `sections/Hero`, `sections/SectionBand`, `sections/LogoStrip`, `media/PhotoFrame`.

Every component ships `<Name>.jsx`, `<Name>.d.ts` (props + adherence notes) and `<Name>.prompt.md` (what & when, with a usage example).

### Intentional additions

The reference describes 12 component families; these three are additions, each with a reason:

- **`forms/Input`** — the reference names no form component but does define a form-field shadow token; the system needs one field for demo-request and login surfaces. It is the only place `--shadow-subtle` is used.
- **`sections/SectionBand`** — the reference describes the band-by-band layout rhythm (dark → white → lavender → pastel) but ships no container; this is that rhythm as one primitive.
- **`media/PhotoFrame`** — photography is central to the reference but none was supplied, so this frame renders a labelled placeholder until real images are dropped in. It also carries the diagonal colour wash the toolkit band calls for.

---

## Content fundamentals

**Voice: plain, warm, operational.** Short declaratives about what happens for a patient or a nurse, not adjectives about the platform. "Reminders arrive in the thread patients already read." Never "revolutionary", "seamless", "cutting-edge".

- **Person:** second person for the reader ("your entire patient journey toolkit"), first-person plural sparingly and only for commitments ("we reply within a day"). The patient is always named as a person, never "the user".
- **Sentence case everywhere.** Headlines take no full stop; body copy does. The only uppercase is the 12px eyebrow/caption label, at 0.06em tracking.
- **Headlines are 3–7 words with one word recoloured** — `Turn **chat** into care`, `Every journey, **one** thread`. That colour swap is the headline mechanic of the system; use it once per section, never twice in one viewport.
- **Numbers are concrete and rounded to be sayable:** "Cut no-shows by 40%", "18.4M conversations carried", "6 min median handover". No decimals in display type.
- **Buttons are verbs in title-less sentence case:** *Book a Call*, *Take a tour*, *Apply now*, *Request a time*. The primary CTA repeats verbatim across the page — it is always "Book a Call", never a synonym.
- **No emoji.** Not in UI, not in copy. The icon set carries that job.
- **Honest empty states and caveats** ("Sample content for design purposes only", "One email, no sequence") — the tone is a public-health service, so it under-promises.

## Visual foundations

**Colour.** One dark brand surface (Canopy Green `#0a3922`), one canvas (Lavender Mist `#eee2ff`), six pastel washes that rotate across feature cards (mint → sage → sky → cream → lilac → peach), and exactly one vivid warm: Coral Pulse `#ff643b`, reserved for filled CTAs. Indigo Bloom `#460095` owns the lavender/toolkit world and its headings; Leaf Bright `#1dbf73` is the highlight-word and accent-edge green. Max two background colours per section, one vivid accent per viewport.

**Type.** DM Sans only, `font-feature-settings: "ss03"` always on. Display 69–116px at weight 500 with −0.028em tracking; 32–48px headings at −0.019em; body 16–18px at 400 in Graphite or Ink Black; UI 14px at 500; 12px uppercase captions. One family across a 10× size range is the signature — a second typeface breaks the system.

**Spacing & layout.** 4px base unit, comfortable density. 1280px centred max-width, 80px desktop gutters (24px under 900px), 64–80px vertical band padding, 24px grid gap, 24–32px card padding. Pages are composed as full-bleed bands — "rooms" — that alternate dark, white, lavender and pastel; never two dark bands in a row.

**Backgrounds.** Flat colour only. No gradients as decoration, no textures, no patterns, no 3D, no illustration. The only gradients in the system are the low-opacity diagonal washes over photography (`PhotoFrame overlay="leaf" | "green" | "indigo"`).

**Cards.** Flat fills, no border, no shadow: pastel cards at radius 24px, white product cards at 16px (optional 1px `#e0e0e0` hairline), tags at 9999px, buttons at 40px, icon tiles at 8px. Nothing sharper than 8px.

**Elevation.** Depth is surface colour, not shadow: canvas → white card → pastel card → dark band. `--shadow-subtle` (`rgba(0,0,0,.05) 0 1px 1px`) exists for form fields only. No stacks, no coloured glows.

**Transparency & blur.** Almost none. `rgba(255,255,255,.1–.14)` tints inside dark green cards (countdown blocks, on-dark tags), `rgba(10,57,34,.55)` as the modal scrim. No frosted glass.

**Motion.** Quiet and functional: 120–320ms, `cubic-bezier(.2,0,.2,1)`, colour and opacity only. No bounce, no parallax, no scroll-jacking, no entrance animations on content.

**States.** Hover = a colour step (coral darkens to `#f04f24`, ghosts pick up a 4% tint, nav picks up Cloud Gray); nothing scales or lifts. Press = the same darker fill, no shrink. Focus = 2px Leaf Bright outline at 2px offset. Active nav link = 2px underline at 6px offset. Disabled = 45% opacity.

**Imagery.** Warm documentary photography of health workers and community settings in large rounded crops, frequently overlapped by a phone mockup with no card chrome between them. Never staged stock, never illustration, never abstract render. **None was supplied — every `PhotoFrame` currently shows a dashed placeholder.**

**Product UI.** Chat threads are the product visual: dark green header, white body, incoming bubbles white with a hairline, outgoing `#dcf8c6`, sender names in Leaf Bright. The mockup is a generic messaging frame by design — do not add a third-party messenger's logo, wordmark or UI chrome to it.

## Iconography

The reference specifies a monochrome outlined/flat-filled set at 20–24px in Canopy Green or Ink Black, used for feature-list bullets and small card decorations — but **ships no icon files**. Substitution: **Lucide** (`https://unpkg.com/lucide@0.460.0`), whose 24px/2px-stroke outlined geometry is the closest CDN match; `guidelines/brand-icons.html` is the specimen. **Flagged for replacement** if a real set exists.

Rules: outlined, monochrome, never multi-colour; 20–24px; Canopy Green on light, white on dark, Indigo Bloom inside lavender bands; icon tiles are 24px at radius 8px filled with a pastel or the brand purple. No emoji as iconography, no unicode dingbats, no hand-drawn SVG substitutes — the list bullets in the kit are plain colour dots, not fake icons.

## Logo

**No logo was supplied.** Wherever a mark belongs, the brand name is set in plain DM Sans 700 at −0.019em (`guidelines/brand-wordmark.html`, `TopNav`, `Footer`). No mark has been drawn or approximated — supply real files and swap them in.

## Deliberate deviations from the reference

1. **Logo-strip colour.** The reference renders partner logos at `#3d3d3d` on the dark green hero, which fails contrast badly. `LogoStrip` uses Mint Wash on dark bands and Graphite on light ones; real monochrome logo files are inverted to white instead.
2. **Tracking units.** The reference's token table lists `-0.019px`/`-0.028px`; its prose says `em`. The `em` reading is correct and is what `tokens/typography.css` ships.
3. **Card/kit rendering.** Cards and kits load component source through `assets/ds-dev-loader.js` instead of the generated bundle, so they render identically from the filesystem and inside the app. The loader keeps every path document-relative on purpose — the preview sandbox serves from an opaque origin where absolutised fetches never resolve.
4. **Hero column behaviour.** The reference's hero is a fixed two-column split; `Hero` uses `repeat(auto-fit, minmax(340px, 1fr))` so it stacks instead of crushing the product visual below ~900px.

## Usage

```html
<link rel="stylesheet" href="styles.css">
```

```jsx
import { Hero } from "./components/sections/Hero.jsx";
import { Button } from "./components/buttons/Button.jsx";

<Hero
  headline={<>Turn <span style={{ color: "var(--color-leaf-bright)" }}>chat</span> into care</>}
  body="Reach every patient on the messaging app they already use."
  primaryLabel="Book a Call"
  secondaryLabel="Take a tour"
/>
```

Never hard-code hex values in consumer code — every colour, size, radius and gap above exists as a `--*` token in `tokens/`.

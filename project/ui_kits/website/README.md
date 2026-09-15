# UI kit — Divinity Total Skin Care

The clinic website from `uploads/divinity-total-skin-care-brief.md`, built on this design system. Open `index.html`.

## Build

`index.html` loads a prebuilt bundle (`dist/app.js`) instead of the dev-time Babel/unpkg loader used by the rest of the design system's preview cards. React, ReactDOM and every component/screen are compiled and bundled ahead of time, so the live page has no CDN dependency and no in-browser JSX transpile step.

To rebuild after editing any `.jsx` file in this kit (or a shared component it imports), run from the repo root:

```
npm install   # first time only
npm run build:website
```

This runs `scripts/build-website.mjs` (esbuild) against `main.jsx`, the bundle's entry point, and writes `dist/app.js` + `dist/app.js.map`. Use `npm run watch:website` while iterating. `dist/` is committed so the page works as soon as it's served — remember to rebuild and commit it whenever a source file changes.

**Divinity Total Skin Care** — 21/280, Kaveri Path, Madhyam Marg, near KL Saini Cricket Stadium, Mansarovar, Jaipur 302020. Dermatology, skin, hair and laser; two DNB dermatologists; in practice since 2013.

## Screens

| File | Screen | Content |
|------|--------|---------|
| `HomeScreen.jsx` | Home | Hero with WhatsApp booking thread, trust bar (4.5/5 across 735 Practo stories · 13 yrs · 2 DNB dermatologists · in-house pharmacy), six signature treatments, medical-dermatology band, both doctors, patient quotes, address + hours |
| `TreatmentsScreen.jsx` | Treatments | The six money treatments, the full cleaned treatment list in six groups, the clinic's own six services (IndiaMART wording), medical disclaimer |
| `DoctorsScreen.jsx` | Doctors | Dr. Prateek Manjul and Dr. Vinisha Baliyan — specialisations, confirmed qualifications, memberships, focus areas, Practo recommend rates |
| `FeesFaqScreen.jsx` | Fees & FAQ | Consultation and procedure pricing slots, ten patient questions |
| `ContactScreen.jsx` | Contact & book | Address, phone, day-by-day hours table, four-field appointment form, directions from the stadium, nearby localities |
| `BookingDialog.jsx` | Booking | Four fields max, WhatsApp as the primary route |
| `Chrome.jsx` | Chrome | `StickyBar` (Call · WhatsApp · Directions) and `Pending` |
| `clinic.js` | Content | Every fact on the site, in one file |
| `Footer.jsx`, `App.jsx` | Shell | Footer with NAP + disclaimer, nav and dialog state |

## The `Pending` marker

The brief forbids publishing anything it tagged 🔴 or **[CONFIRM]** on a live medical site. Rather than inventing values, the layout reserves the slot and names what is missing — peach chip, dashed coral border:

Phone number · OPD hours (six sources, six answers) · consultation fee (₹300 vs ₹500) · procedure price ranges · both doctors' years of practice and registration numbers · Dr. Manjul's MD institute and role at the clinic · payment methods · parking · whether robotic FUE is in-house · before/after photos.

Fill these from `clinic.js` — `phoneDisplay`, `whatsappUrl`, `FAQS[].pending`, `DOCTORS[].pending` — and the chips disappear as real content replaces them.

## Also built in from the brief

- **Sticky Call · WhatsApp · Directions bar** (§9) with a pre-filled WhatsApp message.
- **Title tag, meta description and `MedicalClinic` JSON-LD** in `index.html` §10. `openingHoursSpecification` and `aggregateRating` are deliberately omitted — hours are unconfirmed and a rating must come from a live source, never hardcoded.
- **Bilingual lines** (§9) in the hero, sticky bar, booking dialog and contact page. DM Sans has no Devanagari, so the kit loads Noto Sans Devanagari and exposes it as `--font-hi`.
- **Junk directory services excluded** (§3C): no buttock implant, dental fillings, coronary angiogram, acupuncture or scalp reduction.
- **Reviews without names** (§6) until consent is in hand or a live Google widget replaces the block.

## Still needed from the client

Answers to the brief's §12 list — items 1–7 especially — plus clinic photography (every `PhotoFrame` is a placeholder) and a decision on the domain.

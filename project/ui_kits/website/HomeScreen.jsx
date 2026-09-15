import React from "react";
import { autoFit } from "../../components/layout/grid.js";
import { Hero } from "../../components/sections/Hero.jsx";
import { SectionBand } from "../../components/sections/SectionBand.jsx";
import { PastelCard } from "../../components/cards/PastelCard.jsx";
import { ProductCard } from "../../components/cards/ProductCard.jsx";
import { PhoneMockup } from "../../components/product/PhoneMockup.jsx";
import { PhotoFrame } from "../../components/media/PhotoFrame.jsx";
import { Tag } from "../../components/tags/Tag.jsx";
import { Button } from "../../components/buttons/Button.jsx";
import { Pending } from "./Chrome.jsx";
import { CLINIC, TRUST, SIGNATURE_TREATMENTS, DOCTORS, REVIEWS, TREATMENT_GROUPS } from "./clinic.js";

const bookingThread = [
  { direction: "in", sender: "Divinity Total Skin Care", text: "Namaste. Which concern would you like to come in for?", time: "18:42" },
  { direction: "out", text: "Acne scars — is Saturday possible?", time: "18:43" },
];

export function HomeScreen(props) {
  const medical = TREATMENT_GROUPS[0].items;

  /* The phone has a content-driven height, so the photo behind it is given a matching
     min-height rather than a pure aspect ratio — otherwise the crop gets shorter than
     the phone as the column narrows and the layering inverts. */
  const heroVisual = (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-16)", alignItems: "stretch" }}>
      <PhoneMockup contact="Divinity Total Skin Care" status="replies on WhatsApp" messages={bookingThread} width={228} composer={false} style={{ flex: "0 0 228px" }} />
      <PhotoFrame ratio="3 / 4" placeholder="Clinic interior, Mansarovar — photo shoot pending" style={{ flex: "1 1 200px", minWidth: 0 }} />
    </div>
  );

  return (
    <React.Fragment>
      <Hero
        eyebrow={CLINIC.locality + " · since " + CLINIC.established}
        headline={<React.Fragment>Skin, hair and laser care by two <span style={{ color: "var(--color-leaf-bright)" }}>DNB</span> dermatologists</React.Fragment>}
        headlineSize="clamp(38px, 4.4vw, 69px)"
        body="Thirteen years at the same Mansarovar address, 735 patient stories on Practo, and an in-house pharmacy so one visit is one visit. Message the clinic on WhatsApp and we will hold a slot."
        primaryLabel="Book on WhatsApp"
        onPrimary={props.onBook}
        secondaryLabel="See treatments"
        onSecondary={() => props.onNavigate("Treatments")}
        visual={heroVisual}
        footer={
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
            <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-mint-wash)", fontFamily: "var(--font-hi, var(--font-dm-sans))" }}>{CLINIC.hindi.tagline}</span>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--color-ash)" }}>{CLINIC.landmark}</span>
          </div>
        }
      />

      <SectionBand tone="white" paddingY="var(--spacing-56)">
        <div style={{ display: "grid", gridTemplateColumns: autoFit(200), gap: "var(--grid-gap)" }}>
          {TRUST.map((t) => (
            <div key={t.value} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: "var(--text-heading)", lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-tight)", fontWeight: "var(--font-weight-bold)", color: "var(--color-canopy-green)" }}>{t.value}</span>
              <span style={{ fontSize: "var(--text-body-sm)", lineHeight: "var(--leading-body-sm)", color: "var(--color-graphite)" }}>{t.label}</span>
            </div>
          ))}
        </div>
      </SectionBand>

      <SectionBand tone="canvas">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-48)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-24)", alignItems: "flex-end", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "var(--text-heading-lg)", lineHeight: "var(--leading-heading-lg)", letterSpacing: "var(--tracking-tight)", fontWeight: "var(--font-weight-medium)", color: "var(--color-indigo-bloom)", maxWidth: 620 }}>
              What people come in for
            </h2>
            <Button variant="ghost" size="md" onClick={() => props.onNavigate("Treatments")}>All treatments</Button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: autoFit(300), gap: "var(--grid-gap)" }}>
            {SIGNATURE_TREATMENTS.map((t, i) => (
              <PastelCard key={t.title} index={i} tag={<Tag tone={["mint", "sage", "sky", "cream", "lilac", "peach"][i]}>{t.tag}</Tag>} title={t.title} titleSize="var(--text-heading-sm)" body={t.body} />
            ))}
          </div>
          <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-aubergine)", margin: 0, maxWidth: "70ch" }}>
            Medical information only. Suitability and the number of sessions are decided after an in-clinic examination, and results vary from person to person.
          </p>
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <div style={{ display: "grid", gridTemplateColumns: autoFit(300), gap: "var(--spacing-64)", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-20)", minWidth: 0 }}>
            <Tag tone="mint">Medical dermatology</Tag>
            <h2 style={{ fontSize: "var(--text-heading)", lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-tight)", fontWeight: "var(--font-weight-medium)", color: "var(--color-canopy-green)" }}>
              Not only cosmetic work
            </h2>
            <p style={{ fontSize: "var(--text-body-lg)", lineHeight: "var(--leading-body-lg)", color: "var(--color-graphite)", margin: 0, maxWidth: "48ch" }}>
              Both doctors hold a DNB in Dermatology and Venereology. Long-running conditions are treated here as medicine, with a pharmacy on the premises for the same-day prescription.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-8)" }}>
              {medical.map((m) => (
                <Tag key={m} tone="sage">{m}</Tag>
              ))}
            </div>
          </div>
          <PhotoFrame ratio="4 / 5" overlay="leaf" placeholder="Consultation room — photo shoot pending" style={{ maxWidth: 420, width: "100%", justifySelf: "center", minHeight: 320 }} />
        </div>
      </SectionBand>

      <SectionBand tone="canvas">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-32)" }}>
          <h2 style={{ fontSize: "var(--text-heading-lg)", lineHeight: "var(--leading-heading-lg)", letterSpacing: "var(--tracking-tight)", fontWeight: "var(--font-weight-medium)", color: "var(--color-indigo-bloom)" }}>
            The two doctors you will see
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: autoFit(320), gap: "var(--grid-gap)" }}>
            {DOCTORS.map((d, i) => (
              <PastelCard key={d.name} tone={i === 0 ? "sage" : "lilac"} title={d.name} titleSize="var(--text-heading-sm)" body={d.role}>
                <ProductCard hairline>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <span style={{ fontSize: "var(--text-body-sm)", fontWeight: 600, color: "var(--color-canopy-green)" }}>
                      {d.rating.value} <span style={{ fontWeight: 400, color: "var(--color-graphite)" }}>{d.rating.label}</span>
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {d.specialisations.slice(0, 3).map((s) => (
                        <Tag key={s} tone="mint">{s}</Tag>
                      ))}
                    </div>
                  </div>
                </ProductCard>
                <Button variant="ghost" size="sm" onClick={() => props.onNavigate("Doctors")} style={{ alignSelf: "flex-start" }}>Credentials</Button>
              </PastelCard>
            ))}
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="cream">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-32)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-16)", alignItems: "baseline", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "var(--text-heading)", lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-tight)", fontWeight: "var(--font-weight-medium)", color: "var(--color-canopy-green)" }}>
              In patients' words
            </h2>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--color-slate)" }}>Practo patient stories · names withheld until consent is in hand</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: autoFit(260), gap: "var(--grid-gap)" }}>
            {REVIEWS.map((r) => (
              <blockquote key={r.text} style={{ margin: 0, background: "var(--color-paper-white)", borderRadius: "var(--radius-cards-sm)", padding: "var(--card-padding)", display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
                <p style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)", color: "var(--color-ink-black)", margin: 0 }}>{r.text}</p>
                <footer style={{ fontSize: "var(--text-caption)", color: "var(--color-slate)" }}>{r.context}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="dark">
        <div style={{ display: "grid", gridTemplateColumns: autoFit(300), gap: "var(--spacing-48)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)" }}>
            <h2 style={{ fontSize: "var(--text-heading)", lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-tight)", fontWeight: "var(--font-weight-medium)", color: "var(--color-paper-white)" }}>
              Find the clinic
            </h2>
            <address style={{ fontStyle: "normal", fontSize: "var(--text-body-lg)", lineHeight: 1.5, color: "var(--color-mint-wash)" }}>
              {CLINIC.addressLines.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </address>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-12)", alignItems: "center" }}>
              <Button variant="primary" size="lg" onClick={props.onBook}>Book on WhatsApp</Button>
              <Button variant="ghostOnDark" size="lg" href={CLINIC.mapsUrl}>Open in Maps</Button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
            <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-ash)" }}>OPD hours</span>
            <Pending>Day-by-day OPD hours — six directories list six different sets, so none is published here</Pending>
            <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-ash)", marginTop: "var(--spacing-8)" }}>Phone</span>
            <Pending>One WhatsApp-enabled clinic number, replacing five conflicting directory listings</Pending>
          </div>
        </div>
      </SectionBand>
    </React.Fragment>
  );
}

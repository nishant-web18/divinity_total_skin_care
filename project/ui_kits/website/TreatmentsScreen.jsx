import React from "react";
import { Hero } from "../../components/sections/Hero.jsx";
import { SectionBand } from "../../components/sections/SectionBand.jsx";
import { PastelCard } from "../../components/cards/PastelCard.jsx";
import { ProductCard } from "../../components/cards/ProductCard.jsx";
import { PhotoFrame } from "../../components/media/PhotoFrame.jsx";
import { Tag } from "../../components/tags/Tag.jsx";
import { Button } from "../../components/buttons/Button.jsx";
import { Pending } from "./Chrome.jsx";
import { SIGNATURE_TREATMENTS, TREATMENT_GROUPS, CLINIC_WORDS } from "./clinic.js";

export function TreatmentsScreen(props) {
  return (
    <React.Fragment>
      <Hero
        tone="canvas"
        eyebrow="Treatments"
        headline={<React.Fragment>Skin, hair and laser — <span style={{ color: "var(--color-leaf-bright)" }}>all</span> under one roof</React.Fragment>}
        headlineSize="clamp(36px, 4.2vw, 64px)"
        body="Medical dermatology, aesthetic work and laser procedures, run by dermatologists rather than technicians. Six treatments carry most of the clinic's day."
        primaryLabel="Book on WhatsApp"
        onPrimary={props.onBook}
        secondaryLabel="Meet the doctors"
        onSecondary={() => props.onNavigate("Doctors")}
        visual={
          <ProductCard title="Most asked for" meta="Mansarovar clinic" hairline style={{ maxWidth: 440, width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {SIGNATURE_TREATMENTS.map((t) => (
                <div key={t.title} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--color-cloud-gray)", borderRadius: 8, padding: "10px 12px", fontSize: 13, fontWeight: 500, color: "var(--color-canopy-green)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--color-leaf-bright)", flex: "0 0 8px" }} />
                  {t.title}
                </div>
              ))}
            </div>
          </ProductCard>
        }
      />

      <SectionBand tone="white">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-48)" }}>
          <h2 style={{ fontSize: "var(--text-heading-lg)", lineHeight: "var(--leading-heading-lg)", letterSpacing: "var(--tracking-tight)", fontWeight: "var(--font-weight-medium)", color: "var(--color-canopy-green)", maxWidth: 680 }}>
            The six that get their own page
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--grid-gap)" }}>
            {SIGNATURE_TREATMENTS.map((t, i) => (
              <PastelCard key={t.title} index={i} tag={<Tag tone={["mint", "sage", "sky", "cream", "lilac", "peach"][i]}>{t.tag}</Tag>} title={t.title} titleSize="var(--text-heading-sm)" body={t.body}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-8)", alignItems: "center" }}>
                  <Button variant="primary" size="sm" onClick={props.onBook}>Ask about this</Button>
                  <Pending inline>Indicative price range</Pending>
                </div>
              </PastelCard>
            ))}
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="canvas">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-32)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)", maxWidth: 680 }}>
            <h2 style={{ fontSize: "var(--text-heading)", lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-tight)", fontWeight: "var(--font-weight-medium)", color: "var(--color-indigo-bloom)" }}>
              Everything the clinic treats
            </h2>
            <p style={{ fontSize: "var(--text-body)", color: "var(--color-aubergine)", margin: 0 }}>
              Grouped as a patient would ask for it, not as a directory auto-fills it.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--grid-gap)" }}>
            {TREATMENT_GROUPS.map((g) => (
              <PastelCard key={g.heading} tone={g.tone} title={g.heading} titleSize="var(--text-subheading)">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-8)" }}>
                  {g.items.map((it) => (
                    <Tag key={it} tone="lavender">{it}</Tag>
                  ))}
                </div>
              </PastelCard>
            ))}
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="mint">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--spacing-64)", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-20)", minWidth: 0 }}>
            <Tag outline="teal">In the clinic's own words</Tag>
            <h2 style={{ fontSize: "var(--text-heading)", lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-tight)", fontWeight: "var(--font-weight-medium)", color: "var(--color-canopy-green)" }}>
              Six services, as the clinic lists them
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
              {CLINIC_WORDS.map((s) => (
                <div key={s.title} style={{ background: "var(--color-paper-white)", borderRadius: "var(--radius-cards-sm)", padding: "14px 16px" }}>
                  <div style={{ fontSize: "var(--text-body)", fontWeight: 600, color: "var(--color-canopy-green)" }}>{s.title}</div>
                  <div style={{ fontSize: "var(--text-body-sm)", lineHeight: "var(--leading-body-sm)", color: "var(--color-graphite)", marginTop: 4 }}>{s.body}</div>
                </div>
              ))}
            </div>
            <Pending>Whether robotic FUE is performed in-house or referred out</Pending>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)", minWidth: 0 }}>
            <PhotoFrame ratio="4 / 5" placeholder="Procedure room / laser equipment — photo shoot pending" />
            <div style={{ background: "var(--color-paper-white)", borderRadius: "var(--radius-cards-sm)", padding: "var(--card-padding)", display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
              <span style={{ fontSize: "var(--text-body-sm)", fontWeight: 600, color: "var(--color-canopy-green)" }}>Before &amp; after results</span>
              <Pending>Consented patient photographs — published only with written permission</Pending>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="white" paddingY="var(--spacing-56)">
        <p style={{ fontSize: "var(--text-body-sm)", lineHeight: "var(--leading-body-sm)", color: "var(--color-graphite)", margin: 0, maxWidth: "80ch" }}>
          <strong style={{ color: "var(--color-canopy-green)" }}>Medical disclaimer.</strong> Nothing on this page is a diagnosis or a promise of outcome. Treatment suitability, session counts and aftercare are decided by the treating dermatologist after an in-clinic examination. Results vary from person to person.
        </p>
      </SectionBand>
    </React.Fragment>
  );
}

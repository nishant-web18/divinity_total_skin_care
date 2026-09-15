import React from "react";
import { SectionBand } from "../../components/sections/SectionBand.jsx";
import { PastelCard } from "../../components/cards/PastelCard.jsx";
import { PhotoFrame } from "../../components/media/PhotoFrame.jsx";
import { Tag } from "../../components/tags/Tag.jsx";
import { Button } from "../../components/buttons/Button.jsx";
import { Pending } from "./Chrome.jsx";
import { DOCTORS, CLINIC } from "./clinic.js";

function Block(props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
      <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-slate)" }}>{props.label}</span>
      {props.children}
    </div>
  );
}

export function DoctorsScreen(props) {
  return (
    <React.Fragment>
      <SectionBand tone="canvas">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)", maxWidth: 780 }}>
          <Tag outline="indigo">Our doctors</Tag>
          <h1 style={{ fontSize: "clamp(36px, 4.2vw, 64px)", lineHeight: 1.05, letterSpacing: "var(--tracking-tighter)", fontWeight: "var(--font-weight-medium)", color: "var(--color-indigo-bloom)", margin: 0 }}>
            Two specialists, <span style={{ fontWeight: "var(--font-weight-bold)" }}>one</span> clinic since {CLINIC.established}
          </h1>
          <p style={{ fontSize: "var(--text-body-lg)", lineHeight: "var(--leading-body-lg)", color: "var(--color-aubergine)", margin: 0, maxWidth: 620 }}>
            Both doctors hold a DNB in Dermatology and Venereology. Qualifications below are published only where the clinic's own records and the medical councils agree; the rest is being verified in writing before it goes live.
          </p>
        </div>
      </SectionBand>

      {DOCTORS.map((d, i) => (
        <SectionBand key={d.name} tone={i === 0 ? "white" : "mint"}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--spacing-64)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)", minWidth: 0 }}>
              <PhotoFrame ratio="4 / 5" placeholder={"Portrait of " + d.name + " — photo shoot pending"} style={{ maxWidth: 380 }} />
              <div style={{ background: i === 0 ? "var(--color-sage-wash)" : "var(--color-paper-white)", borderRadius: "var(--radius-cards-sm)", padding: "var(--card-padding)", maxWidth: 380 }}>
                <div style={{ fontSize: "var(--text-heading-sm)", fontWeight: 700, letterSpacing: 0, color: "var(--color-canopy-green)" }}>{d.rating.value}</div>
                <div style={{ fontSize: "var(--text-body-sm)", lineHeight: "var(--leading-body-sm)", color: "var(--color-graphite)" }}>{d.rating.label}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-24)", minWidth: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
                <h2 style={{ fontSize: "var(--text-heading)", lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-tight)", fontWeight: "var(--font-weight-medium)", color: "var(--color-canopy-green)" }}>{d.name}</h2>
                <span style={{ fontSize: "var(--text-body-lg)", color: "var(--color-graphite)" }}>{d.role}</span>
              </div>

              <Block label="Specialisations">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-8)" }}>
                  {d.specialisations.map((s) => (
                    <Tag key={s} tone={i === 0 ? "mint" : "sky"}>{s}</Tag>
                  ))}
                </div>
              </Block>

              <Block label="Qualifications">
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {d.qualifications.map((q) => (
                    <div key={q} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: "var(--text-body)", lineHeight: "var(--leading-body)", color: "var(--color-ink-black)" }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--color-leaf-bright)", marginTop: 7, flex: "0 0 8px" }} />
                      {q}
                    </div>
                  ))}
                </div>
              </Block>

              <Block label="Memberships">
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {d.memberships.map((m) => (
                    <span key={m} style={{ fontSize: "var(--text-body)", color: "var(--color-graphite)" }}>{m}</span>
                  ))}
                </div>
              </Block>

              <Block label="Areas of focus">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-8)" }}>
                  {d.focus.map((f) => (
                    <Tag key={f} outline={i === 0 ? "leaf" : "indigo"}>{f}</Tag>
                  ))}
                </div>
              </Block>

              <Block label="Being verified before publication">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-8)" }}>
                  {d.pending.map((p) => (
                    <Pending key={p} inline>{p}</Pending>
                  ))}
                </div>
              </Block>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-12)" }}>
                <Button variant="primary" size="lg" onClick={props.onBook}>Book with {d.name.split(" ")[1]}</Button>
                <Button variant="ghost" size="lg" onClick={() => props.onNavigate("Treatments")}>Treatments</Button>
              </div>
            </div>
          </div>
        </SectionBand>
      ))}

      <SectionBand tone="canvas" paddingY="var(--spacing-56)">
        <PastelCard tone="peach" title="A note on credentials" titleSize="var(--text-subheading)" body="This is a medical practice, so a qualification, a registration number or a count of years in practice is published only once the clinic has supplied it in writing. Where directories disagreed, the claim was left out rather than averaged." />
      </SectionBand>
    </React.Fragment>
  );
}

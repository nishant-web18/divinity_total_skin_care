import React from "react";
import { autoFit } from "../../components/layout/grid.js";
import { SectionBand } from "../../components/sections/SectionBand.jsx";
import { PastelCard } from "../../components/cards/PastelCard.jsx";
import { Tag } from "../../components/tags/Tag.jsx";
import { Button } from "../../components/buttons/Button.jsx";
import { Pending } from "./Chrome.jsx";
import { FAQS } from "./clinic.js";

export function FeesFaqScreen(props) {
  const [open, setOpen] = React.useState(0);
  return (
    <React.Fragment>
      <SectionBand tone="canvas">
        <div style={{ display: "grid", gridTemplateColumns: autoFit(300), gap: "var(--spacing-64)", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)" }}>
            <Tag outline="indigo">Fees &amp; FAQ</Tag>
            <h1 style={{ fontSize: "clamp(36px, 4.2vw, 64px)", lineHeight: 1.05, letterSpacing: "var(--tracking-tighter)", fontWeight: "var(--font-weight-medium)", color: "var(--color-indigo-bloom)", margin: 0 }}>
              What it costs, <span style={{ fontWeight: "var(--font-weight-bold)" }}>before</span> you call
            </h1>
            <p style={{ fontSize: "var(--text-body-lg)", lineHeight: "var(--leading-body-lg)", color: "var(--color-aubergine)", margin: 0, maxWidth: 520 }}>
              A published fee and a starting price for the common procedures cuts the phone calls that were never going to book, and earns the trust of the ones that will.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--grid-gap)" }}>
            <PastelCard tone="sage" title="Consultation" titleSize="var(--text-heading-sm)">
              <Pending>Consultation fee — directories show two different figures, so neither is published</Pending>
              <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-graphite)" }}>First visit and follow-up will be listed separately once confirmed.</span>
            </PastelCard>
            <PastelCard tone="sky" title="Procedures" titleSize="var(--text-heading-sm)">
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
                {["Laser hair removal", "Chemical peels", "Robotic FUE hair transplant"].map((p) => (
                  <div key={p} style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-8)", alignItems: "center", justifyContent: "space-between", background: "var(--color-paper-white)", borderRadius: "var(--radius-icons)", padding: "10px 12px" }}>
                    <span style={{ fontSize: "var(--text-body-sm)", fontWeight: 500, color: "var(--color-canopy-green)" }}>{p}</span>
                    <Pending inline>Starting from ₹—</Pending>
                  </div>
                ))}
              </div>
            </PastelCard>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <div style={{ display: "grid", gridTemplateColumns: autoFit(300), gap: "var(--spacing-64)", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-24)" }}>
            <h2 style={{ fontSize: "var(--text-heading)", lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-tight)", fontWeight: "var(--font-weight-medium)", color: "var(--color-canopy-green)" }}>
              Questions patients actually ask
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {FAQS.map((f, i) => (
                <div key={f.q} style={{ borderTop: "1px solid var(--color-frost-gray)", padding: "16px 0" }}>
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? -1 : i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, background: "transparent", border: "none", padding: 0, cursor: "pointer", textAlign: "left", fontSize: "var(--text-body-lg)", fontWeight: 500, color: "var(--color-canopy-green)" }}
                  >
                    {f.q}
                    <span style={{ color: "var(--color-slate)", fontSize: 20, lineHeight: 1 }}>{open === i ? "\u2013" : "+"}</span>
                  </button>
                  {open === i ? (
                    <div style={{ marginTop: 10 }}>
                      {f.pending ? <Pending>{f.pending} — confirming with the clinic</Pending> : (
                        <p style={{ margin: 0, fontSize: "var(--text-body)", lineHeight: "var(--leading-body)", color: "var(--color-graphite)", maxWidth: "58ch" }}>{f.a}</p>
                      )}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "var(--color-cloud-gray)", borderRadius: "var(--radius-cards)", padding: "var(--card-padding-lg)", display: "flex", flexDirection: "column", gap: "var(--spacing-16)" }}>
            <h3 style={{ fontSize: "var(--text-heading-sm)", fontWeight: 700, color: "var(--color-canopy-green)", letterSpacing: 0 }}>Still unsure which treatment applies?</h3>
            <p style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)", color: "var(--color-graphite)", margin: 0 }}>
              Send a message describing the concern. The clinic will tell you whether it needs a consultation, a procedure, or nothing at all.
            </p>
            <Button variant="primary" size="lg" full onClick={props.onBook}>Ask on WhatsApp</Button>
            <Button variant="ghost" size="lg" full onClick={() => props.onNavigate("Contact")}>Clinic address &amp; hours</Button>
          </div>
        </div>
      </SectionBand>
    </React.Fragment>
  );
}

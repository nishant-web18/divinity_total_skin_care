import React from "react";
import { CLINIC, TREATMENT_GROUPS, NAV_LINKS } from "./clinic.js";

export function Footer(props) {
  const columns = [
    ["Treatments", TREATMENT_GROUPS.slice(0, 4).map((g) => g.heading), "Treatments"],
    ["Clinic", ["Our doctors", "Fees & FAQ", "Contact & book", "In-house pharmacy"], "Doctors"],
  ];
  return (
    <footer style={{ background: "var(--color-cloud-gray)", padding: "var(--spacing-64) var(--page-gutter) var(--spacing-40)", fontFamily: "var(--font-dm-sans)", fontFeatureSettings: "var(--font-features)" }}>
      <div style={{ maxWidth: "var(--page-max-width)", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "var(--spacing-64)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)", minWidth: 240, flex: "1 1 260px" }}>
          <span style={{ fontSize: "var(--text-subheading)", fontWeight: 700, letterSpacing: "var(--tracking-tight)", color: "var(--color-canopy-green)" }}>{CLINIC.name}</span>
          <address style={{ fontStyle: "normal", fontSize: "var(--text-body-sm)", lineHeight: 1.5, color: "var(--color-graphite)" }}>
            {CLINIC.addressLines.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </address>
          <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-graphite)", fontVariantNumeric: "tabular-nums" }}>{CLINIC.phoneDisplay}</span>
          <a href={CLINIC.mapsUrl} target="_blank" rel="noreferrer" style={{ fontSize: "var(--text-body-sm)", fontWeight: 600 }}>Directions</a>
        </div>

        {columns.map((c) => (
          <div key={c[0]} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)", minWidth: 160 }}>
            <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-slate)" }}>{c[0]}</span>
            {c[1].map((l) => (
              <a
                key={l}
                href="#"
                onClick={(e) => { e.preventDefault(); if (props.onNavigate) props.onNavigate(c[2]); }}
                style={{ fontSize: "var(--text-body-sm)", color: "var(--color-canopy-green)", textDecoration: "none" }}
              >
                {l}
              </a>
            ))}
          </div>
        ))}

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)", minWidth: 200, flex: "0 1 240px" }}>
          <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-slate)" }}>Serving</span>
          <span style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.5, color: "var(--color-graphite)" }}>
            Mansarovar · Madhyam Marg · Shipra Path · Nirman Nagar · Gopalpura Bypass · Vaishali Nagar
          </span>
        </div>
      </div>

      <div style={{ maxWidth: "var(--page-max-width)", margin: "var(--spacing-48) auto 0", paddingTop: "var(--spacing-20)", borderTop: "1px solid var(--color-frost-gray)", display: "flex", flexWrap: "wrap", gap: "var(--spacing-16)", justifyContent: "space-between", fontSize: "var(--text-caption)", lineHeight: 1.5, color: "var(--color-slate)" }}>
        <span style={{ maxWidth: "62ch" }}>
          Information on this site is for general guidance and is not a diagnosis. Results vary from person to person. {CLINIC.name}, {CLINIC.locality} — in practice since {CLINIC.established}.
        </span>
        <span style={{ display: "flex", gap: "var(--spacing-20)" }}>
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" onClick={(e) => { e.preventDefault(); if (props.onNavigate) props.onNavigate(l); }} style={{ color: "var(--color-slate)", textDecoration: "none" }}>{l}</a>
          ))}
        </span>
      </div>
    </footer>
  );
}

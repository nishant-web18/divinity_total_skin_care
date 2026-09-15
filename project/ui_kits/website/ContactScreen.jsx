import React from "react";
import { autoFit } from "../../components/layout/grid.js";
import { SectionBand } from "../../components/sections/SectionBand.jsx";
import { ProductCard } from "../../components/cards/ProductCard.jsx";
import { Tag } from "../../components/tags/Tag.jsx";
import { Button } from "../../components/buttons/Button.jsx";
import { Input } from "../../components/forms/Input.jsx";
import { Pending } from "./Chrome.jsx";
import { CLINIC, LOCALITIES } from "./clinic.js";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function ContactScreen(props) {
  const [sent, setSent] = React.useState(false);
  return (
    <React.Fragment>
      <SectionBand tone="dark">
        <div style={{ display: "grid", gridTemplateColumns: autoFit(300), gap: "var(--spacing-64)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-24)", minWidth: 0 }}>
            <Tag tone="onDark">Contact &amp; book</Tag>
            <h1 style={{ fontSize: "clamp(36px, 4.2vw, 64px)", lineHeight: 1.05, letterSpacing: "var(--tracking-tighter)", fontWeight: "var(--font-weight-medium)", color: "var(--color-paper-white)", margin: 0 }}>
              Two minutes from <span style={{ color: "var(--color-leaf-bright)" }}>KL Saini</span> Stadium
            </h1>
            <address style={{ fontStyle: "normal", fontSize: "var(--text-body-lg)", lineHeight: 1.5, color: "var(--color-mint-wash)" }}>
              {CLINIC.addressLines.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </address>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-12)" }}>
              <Button variant="primary" size="lg" onClick={props.onBook}>Book on WhatsApp</Button>
              <Button variant="ghostOnDark" size="lg" href={CLINIC.mapsUrl}>Open in Google Maps</Button>
            </div>
            <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-mint-wash)", fontFamily: "var(--font-hi, var(--font-dm-sans))" }}>{CLINIC.hindi.contact}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)", minWidth: 0 }}>
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-cards-sm)", padding: "var(--card-padding)", display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
              <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-ash)" }}>Phone</span>
              <span style={{ fontSize: "var(--text-heading-sm)", fontWeight: 500, color: "var(--color-paper-white)", fontVariantNumeric: "tabular-nums" }}>{CLINIC.phoneDisplay}</span>
              <Pending>One WhatsApp-enabled number for the site, schema and Google Business Profile</Pending>
            </div>
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-cards-sm)", padding: "var(--card-padding)", display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
              <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-ash)" }}>OPD hours</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {DAYS.map((d) => (
                  <div key={d} style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: "var(--text-body-sm)", color: "var(--color-paper-white)" }}>
                    <span>{d}</span>
                    <span style={{ color: "var(--color-ash)" }}>— : —</span>
                  </div>
                ))}
              </div>
              <Pending>Exact hours per day, and whether Sunday is open</Pending>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <div style={{ display: "grid", gridTemplateColumns: autoFit(300), gap: "var(--spacing-64)", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-20)" }}>
            <h2 style={{ fontSize: "var(--text-heading)", lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-tight)", fontWeight: "var(--font-weight-medium)", color: "var(--color-canopy-green)" }}>
              Request an appointment
            </h2>
            {sent ? (
              <div style={{ background: "var(--color-sage-wash)", borderRadius: "var(--radius-cards)", padding: "var(--card-padding-lg)", display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
                <Tag tone="mint">Request received</Tag>
                <p style={{ margin: 0, fontSize: "var(--text-body)", lineHeight: "var(--leading-body)", color: "var(--color-graphite)" }}>
                  The clinic confirms slots on WhatsApp. Send the same message there if you would like an answer sooner.
                </p>
                <Button variant="ghost" size="lg" onClick={() => setSent(false)}>Send another</Button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-16)", maxWidth: 480 }}>
                <Input label="Name" placeholder="Your full name" autoComplete="name" enterKeyHint="next" full />
                <Input label="Phone (WhatsApp)" placeholder="+91" type="tel" autoComplete="tel" inputMode="numeric" enterKeyHint="next" full />
                <Input label="Treatment you are asking about" placeholder="Acne scars, laser hair removal, hair fall…" enterKeyHint="next" full />
                <Input label="Preferred slot" placeholder="Saturday morning" enterKeyHint="done" hint="Four fields, nothing else — the rest is asked in the consultation." full />
                <Button variant="primary" size="lg" onClick={() => setSent(true)}>Request appointment</Button>
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--grid-gap)" }}>
            <ProductCard title="Getting here" meta={CLINIC.locality} hairline>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
                <div style={{ background: "var(--color-sky-wash)", borderRadius: "var(--radius-icons)", padding: "var(--card-padding)", display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: "var(--text-body-sm)", fontWeight: 600, color: "var(--color-deep-teal)" }}>Map embed</span>
                  <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-graphite)", fontVariantNumeric: "tabular-nums" }}>
                    {CLINIC.lat}, {CLINIC.lng} · Google place pin
                  </span>
                  <a href={CLINIC.mapsUrl} target="_blank" rel="noreferrer" style={{ fontSize: "var(--text-body-sm)", fontWeight: 600, display: "inline-flex", alignItems: "center", minHeight: "var(--tap-target)", alignSelf: "flex-start" }}>Open the live location</a>
                </div>
                <p style={{ margin: 0, fontSize: "var(--text-body-sm)", lineHeight: "var(--leading-body-sm)", color: "var(--color-graphite)" }}>
                  From KL Saini Cricket Stadium, take Madhyam Marg and turn into Kaveri Path. The clinic is on the left, at 21/280.
                </p>
                <Pending inline>Parking &amp; access details</Pending>
              </div>
            </ProductCard>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
              <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-slate)" }}>Patients travel from</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-8)" }}>
                {LOCALITIES.map((l) => (
                  <Tag key={l} tone="sage">{l}</Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionBand>
    </React.Fragment>
  );
}

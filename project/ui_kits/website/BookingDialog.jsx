import React from "react";
import { Button } from "../../components/buttons/Button.jsx";
import { Input } from "../../components/forms/Input.jsx";
import { Tag } from "../../components/tags/Tag.jsx";
import { Pending } from "./Chrome.jsx";
import { CLINIC } from "./clinic.js";

/* Brief §9: four fields, nothing more, with WhatsApp as the primary route. */
export function BookingDialog(props) {
  const [sent, setSent] = React.useState(false);
  if (!props.open) return null;
  return (
    <div
      onClick={props.onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "rgba(10,57,34,0.55)",
        display: "grid",
        placeItems: "center",
        padding: "var(--spacing-24)",
        fontFamily: "var(--font-dm-sans)",
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Book an appointment"
        style={{
          background: "var(--color-paper-white)",
          borderRadius: "var(--radius-cards)",
          padding: "var(--card-padding-lg)",
          width: "min(520px, 100%)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-16)",
          position: "relative",
        }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={props.onClose}
          style={{ position: "absolute", top: 16, right: 18, background: "transparent", border: "none", color: "var(--color-ash)", fontSize: 18, cursor: "pointer", padding: 0 }}
        >
          &times;
        </button>

        {sent ? (
          <React.Fragment>
            <Tag tone="mint">Request received</Tag>
            <h2 style={{ fontSize: "var(--text-heading)", lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-tight)", fontWeight: 500, color: "var(--color-canopy-green)" }}>
              The clinic will confirm your slot
            </h2>
            <p style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)", color: "var(--color-graphite)", margin: 0 }}>
              Appointments are confirmed on WhatsApp. If you would rather not wait, send the same message directly.
            </p>
            <Button variant="primary" size="lg" href={CLINIC.whatsappUrl}>Open WhatsApp</Button>
            <Button variant="ghost" size="lg" onClick={props.onClose}>Close</Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Tag tone="lavender">{CLINIC.locality}</Tag>
            <h2 style={{ fontSize: "var(--text-heading)", lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-tight)", fontWeight: 500, color: "var(--color-canopy-green)" }}>
              Book an appointment
            </h2>
            <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-graphite)", margin: 0, fontFamily: "var(--font-hi, var(--font-dm-sans))" }}>{CLINIC.hindi.whatsapp}</p>
            <Input label="Name" placeholder="Your full name" full />
            <Input label="Phone (WhatsApp)" placeholder="+91" type="tel" full />
            <Input label="Treatment you are asking about" placeholder="Acne scars, laser hair removal, hair fall…" full />
            <Input label="Preferred slot" placeholder="Saturday morning" full />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-12)", marginTop: "var(--spacing-8)" }}>
              <Button variant="primary" size="lg" onClick={() => setSent(true)}>Request appointment</Button>
              <Button variant="ghost" size="lg" href={CLINIC.whatsappUrl}>WhatsApp instead</Button>
            </div>
            <Pending inline>Live WhatsApp number</Pending>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

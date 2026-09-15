import React from "react";

/* Marks a fact the build brief flags as unconfirmed. A medical site cannot publish a
   guessed fee, timing, registration number or phone line, so the layout shows the slot
   and names what is missing instead of inventing a value. */
export function Pending(props) {
  const inline = !!props.inline;
  return (
    <span
      style={Object.assign(
        {
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--spacing-8)",
          background: "var(--color-peach-wash)",
          color: "var(--color-deep-teal)",
          border: "1px dashed var(--color-coral-pulse)",
          borderRadius: inline ? "var(--radius-tags)" : "var(--radius-icons)",
          padding: inline ? "3px 10px" : "8px 12px",
          fontFamily: "var(--font-dm-sans)",
          fontFeatureSettings: "var(--font-features)",
          /* These chips carry real sentences naming what is still unconfirmed, so
             they read as content, not as a caption — 14px, not the 12px floor. */
          fontSize: "var(--text-body-sm)",
          fontWeight: "var(--font-weight-semibold)",
          lineHeight: 1.35,
        },
        props.style
      )}
    >
      {props.children || "Confirming with the clinic"}
    </span>
  );
}

/* Brief §9: sticky Call · WhatsApp · Directions bar. 80%+ of this clinic's traffic is
   mobile, so the three conversion actions are always one tap away. */
export function StickyBar(props) {
  const items = [
    { label: "Call the clinic", sub: props.phone, href: "tel:", tone: "ghost" },
    { label: "WhatsApp", sub: props.hindi, href: props.whatsappUrl, tone: "primary" },
    { label: "Directions", sub: "KL Saini Stadium", href: props.mapsUrl, tone: "ghost" },
  ];
  return (
    <div
      data-sticky-bar=""
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        background: "var(--color-canopy-green)",
        borderTop: "1px solid rgba(255,255,255,0.14)",
        /* Clears the iPhone home indicator. */
        padding: "8px var(--page-gutter) calc(8px + env(safe-area-inset-bottom, 0px))",
        fontFamily: "var(--font-dm-sans)",
        fontFeatureSettings: "var(--font-features)",
      }}
    >
      <div style={{ maxWidth: "var(--page-max-width)", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "var(--spacing-8)" }}>
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            onClick={it.href === "tel:" ? (e) => e.preventDefault() : undefined}
            target={it.href.indexOf("http") === 0 ? "_blank" : undefined}
            rel={it.href.indexOf("http") === 0 ? "noreferrer" : undefined}
            style={{
              /* Basis small enough that three actions fit a 320px screen in one row
                 instead of forcing the page sideways. */
              flex: "1 1 88px",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              minHeight: "var(--tap-target)",
              padding: "6px 8px",
              overflow: "hidden",
              borderRadius: "var(--radius-buttons)",
              textDecoration: "none",
              background: it.tone === "primary" ? "var(--action-primary-bg)" : "transparent",
              border: it.tone === "primary" ? "1px solid transparent" : "1px solid var(--color-paper-white)",
              color: "var(--color-paper-white)",
            }}
          >
            {/* Wraps rather than truncates: "Call the clinic" cut to "Call th…" on a
                320px screen is the one label on the page that must stay readable. */}
            <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-semibold)", lineHeight: 1.2, textAlign: "center" }}>{it.label}</span>
            <span
              style={{
                fontSize: "var(--text-caption)",
                lineHeight: 1.2,
                color: it.tone === "primary" ? "rgba(255,255,255,0.85)" : "var(--color-mint-wash)",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {it.sub}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

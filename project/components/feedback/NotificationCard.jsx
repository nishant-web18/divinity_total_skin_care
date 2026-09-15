import React from "react";
import { Button } from "../buttons/Button.jsx";

export function NotificationCard(props) {
  const blocks = props.countdown || [];
  return (
    <aside
      style={Object.assign(
        {
          background: "var(--color-canopy-green)",
          color: "var(--color-paper-white)",
          borderRadius: "var(--radius-cards-sm)",
          padding: "16px 20px",
          fontFamily: "var(--font-dm-sans)",
          fontFeatureSettings: "var(--font-features)",
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-20)",
          position: props.fixed ? "fixed" : "relative",
          right: props.fixed ? "var(--spacing-24)" : undefined,
          bottom: props.fixed ? "var(--spacing-24)" : undefined,
          zIndex: props.fixed ? 40 : undefined,
          maxWidth: 560,
        },
        props.style
      )}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: "var(--text-body)", fontWeight: "var(--font-weight-semibold)" }}>{props.title}</span>
        {props.subtitle ? (
          <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-mint-wash)" }}>{props.subtitle}</span>
        ) : null}
      </div>
      {blocks.length ? (
        <div style={{ display: "flex", gap: "var(--spacing-8)" }}>
          {blocks.map((b, i) => (
            <span
              key={i}
              style={{
                minWidth: 38,
                height: 32,
                display: "grid",
                placeItems: "center",
                borderRadius: "var(--radius-lg)",
                background: "rgba(255,255,255,0.1)",
                fontSize: "var(--text-caption)",
                fontWeight: "var(--font-weight-semibold)",
                fontVariantNumeric: "tabular-nums",
                color: "var(--color-paper-white)",
              }}
            >
              {b}
            </span>
          ))}
        </div>
      ) : null}
      {props.ctaLabel ? (
        <Button variant="cream" size="sm" onClick={props.onCta} style={{ marginLeft: "auto" }}>
          {props.ctaLabel}
        </Button>
      ) : null}
      {props.onClose ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={props.onClose}
          style={{
            position: "absolute",
            top: 8,
            right: 10,
            width: 16,
            height: 16,
            lineHeight: "16px",
            padding: 0,
            background: "transparent",
            border: "none",
            color: "var(--color-ash)",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          ×
        </button>
      ) : null}
    </aside>
  );
}

import React from "react";
import { autoFit } from "../layout/grid.js";
import { Button } from "../buttons/Button.jsx";

export function Hero(props) {
  return (
    <section
      style={Object.assign(
        {
          background: props.tone === "canvas" ? "var(--color-lavender-mist)" : "var(--color-canopy-green)",
          width: "100%",
          padding: props.compact ? "var(--spacing-32) var(--page-gutter) var(--spacing-32)" : "var(--section-padding-y) var(--page-gutter)",
          fontFamily: "var(--font-dm-sans)",
          fontFeatureSettings: "var(--font-features)",
        },
        props.style
      )}
    >
      <div
        style={{
          maxWidth: "var(--page-max-width)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: props.visual ? autoFit(340) : "minmax(0, 1fr)",
          gap: props.compact ? "var(--spacing-32)" : "var(--spacing-64)",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: props.compact ? "var(--spacing-16)" : "var(--spacing-24)", minWidth: 0 }}>
          {props.eyebrow ? (
            <span style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)", letterSpacing: "0.06em", textTransform: "uppercase", color: props.tone === "canvas" ? "var(--color-indigo-bloom)" : "var(--color-leaf-bright)" }}>
              {props.eyebrow}
            </span>
          ) : null}
          <h1
            style={{
              fontSize: props.headlineSize || "clamp(44px, 5.2vw, 80px)",
              lineHeight: 1.05,
              letterSpacing: "var(--tracking-tighter)",
              fontWeight: "var(--font-weight-medium)",
              color: props.tone === "canvas" ? "var(--color-indigo-bloom)" : "var(--color-paper-white)",
              margin: 0,
              textWrap: "balance",
            }}
          >
            {props.headline}
          </h1>
          {props.body ? (
            <p style={{ fontSize: "var(--text-body-lg)", lineHeight: "var(--leading-body-lg)", color: props.tone === "canvas" ? "var(--color-aubergine)" : "var(--color-mint-wash)", maxWidth: 480, margin: 0 }}>
              {props.body}
            </p>
          ) : null}
          {/* Marked so the floating action stack can watch it: while these CTAs are on
              screen the stack stays hidden rather than duplicating them. */}
          <div data-hero-cta="" style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-12)", marginTop: "var(--spacing-8)" }}>
            {props.primaryLabel ? (
              <Button variant="primary" size="lg" full={props.compact} onClick={props.onPrimary}>
                {props.primaryLabel}
              </Button>
            ) : null}
            {props.secondaryLabel ? (
              <Button variant={props.tone === "canvas" ? "ghost" : "ghostOnDark"} size="lg" onClick={props.onSecondary}>
                {props.secondaryLabel}
              </Button>
            ) : null}
          </div>
          {props.footer ? <div style={{ marginTop: props.compact ? "var(--spacing-8)" : "var(--spacing-32)" }}>{props.footer}</div> : null}
        </div>
        {props.visual ? <div style={{ minWidth: 0 }}>{props.visual}</div> : null}
      </div>
    </section>
  );
}

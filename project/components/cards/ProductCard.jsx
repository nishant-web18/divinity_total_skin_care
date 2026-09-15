import React from "react";

export function ProductCard(props) {
  return (
    <div
      style={Object.assign(
        {
          background: "var(--color-paper-white)",
          borderRadius: "var(--radius-cards-sm)",
          padding: props.flush ? 0 : "var(--card-padding)",
          border: props.hairline ? "1px solid var(--color-frost-gray)" : "none",
          boxShadow: "none",
          overflow: "hidden",
          fontFamily: "var(--font-dm-sans)",
          fontFeatureSettings: "var(--font-features)",
        },
        props.style
      )}
    >
      {props.title ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--spacing-12)" }}>
          <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-canopy-green)" }}>{props.title}</span>
          {props.meta ? <span style={{ fontSize: "var(--text-caption)", color: "var(--color-slate)" }}>{props.meta}</span> : null}
        </div>
      ) : null}
      {props.children}
    </div>
  );
}

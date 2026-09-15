import React from "react";

export function LogoStrip(props) {
  const items = props.items || [];
  const onDark = props.onDark !== false;
  return (
    <div
      style={Object.assign(
        { display: "flex", flexDirection: "column", alignItems: props.align || "center", gap: "var(--spacing-16)", fontFamily: "var(--font-dm-sans)", fontFeatureSettings: "var(--font-features)" },
        props.style
      )}
    >
      {props.label ? (
        <span style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-medium)", letterSpacing: "0.06em", textTransform: "uppercase", color: onDark ? "var(--color-ash)" : "var(--color-slate)" }}>
          {props.label}
        </span>
      ) : null}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: props.align === "flex-start" ? "flex-start" : "center", gap: "var(--spacing-48)" }}>
        {items.map((item, i) =>
          typeof item === "string" ? (
            <span key={i} style={{ fontSize: "var(--text-subheading)", fontWeight: "var(--font-weight-semibold)", letterSpacing: "var(--tracking-tight)", color: onDark ? "var(--color-mint-wash)" : "var(--color-graphite)", opacity: onDark ? 0.95 : 0.75 }}>
              {item}
            </span>
          ) : (
            <img key={i} src={item.src} alt={item.alt || ""} style={{ height: props.logoHeight || 24, width: "auto", filter: onDark ? "brightness(0) invert(1)" : "grayscale(1)", opacity: onDark ? 0.9 : 0.7 }} />
          )
        )}
      </div>
    </div>
  );
}

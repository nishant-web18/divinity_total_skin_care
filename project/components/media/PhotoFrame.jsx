import React from "react";

const overlays = {
  none: null,
  leaf: "linear-gradient(135deg, rgba(29,191,115,0.4), rgba(29,191,115,0.1))",
  green: "linear-gradient(135deg, rgba(10,57,34,0.45), rgba(10,57,34,0.15))",
  indigo: "linear-gradient(135deg, rgba(70,0,149,0.35), rgba(70,0,149,0.1))",
};

export function PhotoFrame(props) {
  const radius = props.radius || "var(--radius-cards)";
  const overlay = overlays[props.overlay || "none"];
  return (
    <figure
      style={Object.assign(
        {
          position: "relative",
          margin: 0,
          borderRadius: radius,
          overflow: "hidden",
          background: "var(--color-sage-wash)",
          aspectRatio: props.src ? undefined : props.ratio || "4 / 5",
          minHeight: props.minHeight,
          boxShadow: "none",
        },
        props.style
      )}
    >
      {props.src ? (
        <img src={props.src} alt={props.alt || ""} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            padding: "var(--spacing-24)",
            textAlign: "center",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "var(--text-body-sm)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--color-canopy-green)",
            border: "1px dashed var(--color-leaf-bright)",
            borderRadius: radius,
          }}
        >
          {props.placeholder || "Documentary portrait — supply real photography"}
        </div>
      )}
      {overlay ? <span style={{ position: "absolute", inset: 0, background: overlay, pointerEvents: "none" }} /> : null}
      {props.caption ? (
        <figcaption style={{ position: "absolute", left: 16, bottom: 14, fontFamily: "var(--font-dm-sans)", fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-paper-white)" }}>
          {props.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

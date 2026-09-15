import React from "react";

export const PASTEL_ROTATION = ["mint", "sage", "sky", "cream", "lilac", "peach"];

const tones = {
  mint: { background: "var(--color-mint-wash)", heading: "var(--color-canopy-green)" },
  sage: { background: "var(--color-sage-wash)", heading: "var(--color-canopy-green)" },
  sky: { background: "var(--color-sky-wash)", heading: "var(--color-deep-teal)" },
  cream: { background: "var(--color-cream)", heading: "var(--color-canopy-green)" },
  lilac: { background: "var(--color-lilac-wash)", heading: "var(--color-indigo-bloom)" },
  peach: { background: "var(--color-peach-wash)", heading: "var(--color-deep-teal)" },
  lavender: { background: "var(--color-lavender-mist)", heading: "var(--color-indigo-bloom)" },
};

export function PastelCard(props) {
  const tone = tones[props.tone] || (props.index != null ? tones[PASTEL_ROTATION[props.index % 6]] : tones.mint);
  return (
    <section
      style={Object.assign(
        {
          background: tone.background,
          borderRadius: "var(--radius-cards)",
          padding: "var(--card-padding-lg)",
          border: "none",
          boxShadow: "none",
          fontFamily: "var(--font-dm-sans)",
          fontFeatureSettings: "var(--font-features)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-16)",
        },
        props.style
      )}
    >
      {props.tag ? <div>{props.tag}</div> : null}
      {props.title ? (
        <h3
          style={{
            fontSize: props.titleSize || "var(--text-heading)",
            lineHeight: "var(--leading-heading)",
            letterSpacing: "var(--tracking-tight)",
            fontWeight: "var(--font-weight-bold)",
            color: tone.heading,
            margin: 0,
          }}
        >
          {props.title}
        </h3>
      ) : null}
      {props.body ? (
        <p style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)", color: "var(--color-graphite)", margin: 0, maxWidth: "46ch" }}>
          {props.body}
        </p>
      ) : null}
      {props.children}
    </section>
  );
}

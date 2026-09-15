import React from "react";

const tones = {
  mint: { background: "var(--color-mint-wash)", color: "var(--color-canopy-green)" },
  sage: { background: "var(--color-sage-wash)", color: "var(--color-canopy-green)" },
  sky: { background: "var(--color-sky-wash)", color: "var(--color-deep-teal)" },
  cream: { background: "var(--color-cream)", color: "var(--color-canopy-green)" },
  lilac: { background: "var(--color-lilac-wash)", color: "var(--color-indigo-bloom)" },
  peach: { background: "var(--color-peach-wash)", color: "var(--color-deep-teal)" },
  lavender: { background: "var(--color-lavender-mist)", color: "var(--color-indigo-bloom)" },
  orchid: { background: "var(--color-orchid-tint)", color: "var(--color-aubergine)" },
  onDark: { background: "rgba(255,255,255,0.14)", color: "var(--color-paper-white)" },
};

const outlines = {
  leaf: "var(--color-leaf-bright)",
  teal: "var(--color-deep-teal)",
  indigo: "var(--color-indigo-bloom)",
};

export function Tag(props) {
  const tone = tones[props.tone] || tones.mint;
  const outline = props.outline ? outlines[props.outline] || outlines.leaf : null;
  return (
    <span
      style={Object.assign(
        {
          display: "inline-flex",
          alignItems: "center",
          alignSelf: "flex-start",
          gap: "var(--spacing-4)",
          fontFamily: "var(--font-dm-sans)",
          fontFeatureSettings: "var(--font-features)",
          fontSize: "var(--text-caption)",
          fontWeight: "var(--font-weight-semibold)",
          lineHeight: "var(--leading-caption)",
          padding: "4px 12px",
          borderRadius: "var(--radius-tags)",
          whiteSpace: "nowrap",
          border: outline ? "1px solid " + outline : "1px solid transparent",
        },
        tone,
        outline ? { background: "transparent", color: outline } : null,
        props.style
      )}
    >
      {props.icon}
      {props.children}
    </span>
  );
}

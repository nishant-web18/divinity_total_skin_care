import React from "react";

const tones = {
  dark: { background: "var(--color-canopy-green)", color: "var(--color-paper-white)" },
  white: { background: "var(--color-paper-white)", color: "var(--color-ink-black)" },
  canvas: { background: "var(--color-lavender-mist)", color: "var(--color-aubergine)" },
  purple: { background: "var(--color-indigo-bloom)", color: "var(--color-paper-white)" },
  mint: { background: "var(--color-mint-wash)", color: "var(--color-canopy-green)" },
  cream: { background: "var(--color-cream)", color: "var(--color-canopy-green)" },
  peach: { background: "var(--color-peach-wash)", color: "var(--color-deep-teal)" },
};

export function SectionBand(props) {
  const tone = tones[props.tone] || tones.white;
  return (
    <section
      style={Object.assign(
        {
          background: tone.background,
          color: tone.color,
          width: "100%",
          padding: (props.paddingY || "var(--section-padding-y)") + " var(--page-gutter)",
          fontFamily: "var(--font-dm-sans)",
          fontFeatureSettings: "var(--font-features)",
        },
        props.style
      )}
    >
      <div style={{ maxWidth: "var(--page-max-width)", margin: "0 auto", width: "100%" }}>{props.children}</div>
    </section>
  );
}

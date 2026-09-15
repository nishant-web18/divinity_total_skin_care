import React from "react";

const base = {
  fontFamily: "var(--font-dm-sans)",
  fontFeatureSettings: "var(--font-features)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--spacing-8)",
  borderRadius: "var(--radius-buttons)",
  border: "1px solid transparent",
  boxShadow: "none",
  textDecoration: "none",
  cursor: "pointer",
  transition: "var(--transition-base)",
  /* Touch has no hover state, so without a press cue the control feels dead. */
  WebkitTapHighlightColor: "transparent",
};

const variants = {
  primary: {
    background: "var(--action-primary-bg)",
    color: "var(--action-primary-fg)",
    fontWeight: "var(--font-weight-semibold)",
    hover: { background: "var(--action-primary-bg-hover)" },
  },
  ghost: {
    background: "transparent",
    color: "var(--action-ghost-fg-on-light)",
    borderColor: "var(--color-ink-black)",
    fontWeight: "var(--font-weight-medium)",
    hover: { background: "rgba(0,0,0,0.04)" },
  },
  ghostOnDark: {
    background: "transparent",
    color: "var(--action-ghost-fg-on-dark)",
    borderColor: "var(--color-paper-white)",
    fontWeight: "var(--font-weight-medium)",
    hover: { background: "rgba(255,255,255,0.12)" },
  },
  nav: {
    background: "var(--action-nav-bg)",
    color: "var(--action-nav-fg)",
    borderColor: "var(--color-ink-black)",
    fontWeight: "var(--font-weight-medium)",
    hover: { background: "var(--color-cloud-gray)" },
  },
  cream: {
    background: "var(--color-cream)",
    color: "var(--color-canopy-green)",
    fontWeight: "var(--font-weight-semibold)",
    hover: { background: "var(--color-paper-white)" },
  },
};

/* Minimum heights, not fixed ones: the label still sets the height when it wraps.
   44px is the house tap target, 48px for the primary CTA — RESPONSIVE.md §1/§5. */
const sizes = {
  sm: { fontSize: "var(--text-body-sm)", padding: "8px 16px", minHeight: "var(--tap-target)", minWidth: "var(--tap-target)" },
  md: { fontSize: "var(--text-body-sm)", padding: "8px 20px", minHeight: "var(--tap-target)", minWidth: "var(--tap-target)" },
  lg: { fontSize: "var(--text-body)", padding: "12px 24px", minHeight: "var(--tap-target-cta)", minWidth: "var(--tap-target)" },
};

export function Button(props) {
  const variant = props.variant || "primary";
  const size = props.size || "lg";
  const [hover, setHover] = React.useState(false);
  const v = variants[variant] || variants.primary;
  const style = Object.assign({}, base, sizes[size] || sizes.lg, v, hover && !props.disabled ? v.hover : null, {
    width: props.full ? "100%" : undefined,
    opacity: props.disabled ? 0.45 : 1,
    cursor: props.disabled ? "not-allowed" : "pointer",
  }, props.style);
  delete style.hover;
  const Tag = props.href ? "a" : "button";
  return (
    <Tag
      href={props.href}
      type={props.href ? undefined : "button"}
      disabled={props.href ? undefined : props.disabled}
      aria-label={props.ariaLabel}
      onClick={props.onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={style}
    >
      {props.iconLeft}
      {props.children}
      {props.iconRight}
    </Tag>
  );
}

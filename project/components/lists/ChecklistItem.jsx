import React from "react";

export function ChecklistItem(props) {
  const active = !!props.active;
  const [hover, setHover] = React.useState(false);
  return (
    <div
      role={props.onClick ? "button" : undefined}
      tabIndex={props.onClick ? 0 : undefined}
      onClick={props.onClick}
      onKeyDown={(e) => {
        if (props.onClick && (e.key === "Enter" || e.key === " ")) props.onClick(e);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={Object.assign(
        {
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-8)",
          padding: "12px 16px",
          borderRadius: "var(--radius-cards-sm)",
          background: active ? props.activeSurface || "var(--color-lavender-mist)" : hover ? "rgba(70,0,149,0.05)" : "transparent",
          cursor: props.onClick ? "pointer" : "default",
          transition: "var(--transition-base)",
          fontFamily: "var(--font-dm-sans)",
          fontFeatureSettings: "var(--font-features)",
        },
        props.style
      )}
    >
      <span
        style={{
          width: 24,
          height: 24,
          flex: "0 0 24px",
          display: "grid",
          placeItems: "center",
          borderRadius: "var(--radius-icons)",
          background: active ? "var(--color-indigo-bloom)" : "var(--color-sage-wash)",
          color: active ? "var(--color-paper-white)" : "var(--color-canopy-green)",
        }}
      >
        {props.icon}
      </span>
      <span
        style={{
          fontSize: "var(--text-subheading)",
          lineHeight: "var(--leading-subheading)",
          fontWeight: "var(--font-weight-medium)",
          color: active ? "var(--color-indigo-bloom)" : "var(--color-canopy-green)",
        }}
      >
        {props.children}
      </span>
    </div>
  );
}

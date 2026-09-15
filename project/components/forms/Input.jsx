import React from "react";

export function Input(props) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={Object.assign({ display: "flex", flexDirection: "column", gap: "var(--spacing-8)", width: props.full ? "100%" : undefined }, props.style)}>
      {props.label ? (
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-graphite)" }}>
          {props.label}
        </span>
      ) : null}
      <input
        type={props.type || "text"}
        value={props.value}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onChange={props.onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontFeatureSettings: "var(--font-features)",
          fontSize: "var(--text-body)",
          lineHeight: "var(--leading-body)",
          color: "var(--text-primary)",
          background: "var(--color-paper-white)",
          padding: "12px 16px",
          borderRadius: "var(--radius-icons)",
          border: "1px solid " + (focus ? "var(--color-leaf-bright)" : "var(--color-frost-gray)"),
          boxShadow: "var(--shadow-subtle)",
          outline: "none",
          width: "100%",
        }}
      />
      {props.hint ? (
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "var(--text-caption)", color: "var(--color-slate)" }}>{props.hint}</span>
      ) : null}
    </label>
  );
}

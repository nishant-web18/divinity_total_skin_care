import React from "react";

export function ChatBubble(props) {
  const out = props.direction === "out";
  return (
    <div style={{ display: "flex", justifyContent: out ? "flex-end" : "flex-start" }}>
      <div
        style={Object.assign(
          {
            maxWidth: "82%",
            background: out ? "var(--color-chat-outgoing)" : "var(--color-paper-white)",
            border: out ? "none" : "1px solid var(--color-frost-gray)",
            borderRadius: "var(--radius-xl)",
            padding: "8px 12px",
            fontFamily: "var(--font-dm-sans)",
            fontFeatureSettings: "var(--font-features)",
            fontSize: "var(--text-body-sm)",
            lineHeight: "var(--leading-body-sm)",
            color: "var(--color-ink-black)",
            boxShadow: "none",
          },
          props.style
        )}
      >
        {props.sender ? (
          <div style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-leaf-bright)", marginBottom: 2 }}>
            {props.sender}
          </div>
        ) : null}
        <div>{props.children}</div>
        {props.time ? (
          <div style={{ fontSize: 10, color: "var(--color-slate)", textAlign: "right", marginTop: 2 }}>{props.time}</div>
        ) : null}
      </div>
    </div>
  );
}

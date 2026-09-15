import React from "react";
import { ChatBubble } from "./ChatBubble.jsx";

export function PhoneMockup(props) {
  const messages = props.messages || [];
  const width = props.width || 280;
  return (
    <div
      style={Object.assign(
        {
          width: width,
          background: "var(--color-paper-white)",
          borderRadius: "var(--radius-3xl)",
          overflow: "hidden",
          border: "1px solid var(--color-frost-gray)",
          boxShadow: "none",
          fontFamily: "var(--font-dm-sans)",
          fontFeatureSettings: "var(--font-features)",
        },
        props.style
      )}
    >
      <div style={{ background: "var(--color-canopy-green)", padding: "14px 16px", display: "flex", alignItems: "center", gap: "var(--spacing-12)" }}>
        <span style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--color-leaf-bright)", display: "grid", placeItems: "center", color: "var(--color-canopy-green)", fontSize: 13, fontWeight: 700 }}>
          {(props.contact || "C").slice(0, 1)}
        </span>
        <span style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-paper-white)" }}>
            {props.contact || "Clinic"}
          </span>
          <span style={{ fontSize: "var(--text-caption)", color: "var(--color-mint-wash)" }}>{props.status || "online"}</span>
        </span>
      </div>
      <div style={{ background: "var(--color-paper-white)", padding: "var(--spacing-16)", display: "flex", flexDirection: "column", gap: "var(--spacing-8)", minHeight: props.minHeight || 0 }}>
        {messages.map((m, i) => (
          <ChatBubble key={i} direction={m.direction} sender={m.sender} time={m.time}>
            {m.text}
          </ChatBubble>
        ))}
        {props.children}
      </div>
      {props.composer === false ? null : (
        <div style={{ borderTop: "1px solid var(--color-frost-gray)", padding: "10px 16px", display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
          <span style={{ flex: 1, fontSize: "var(--text-body-sm)", color: "var(--color-ash)" }}>{props.placeholder || "Message"}</span>
          <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--color-leaf-bright)" }} />
        </div>
      )}
    </div>
  );
}

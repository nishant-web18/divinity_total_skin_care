import React from "react";
import { usePrefersReducedMotion } from "../../components/hooks/useMediaQuery.js";
import { BOOKING_THREAD, CLINIC } from "./clinic.js";

/* The hero's product visual, reduced to one line of it.

   The full phone mockup is ~280px tall, which on a phone meant the hero ended with a
   card sliced in half at the fold. This keeps the same promise — the clinic answers on
   WhatsApp, in your language — as a single incoming message sitting directly on top of
   the Book button, so the button reads as the reply to it. Same thread data as the full
   card, so the two cannot drift apart. */

export function ChatPreviewCompact(props) {
  const reduceMotion = usePrefersReducedMotion();
  const [shown, setShown] = React.useState(false);
  const first = BOOKING_THREAD[0];

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const visible = reduceMotion || shown;

  return (
    <div
      style={Object.assign(
        {
          display: "flex",
          alignItems: "flex-start",
          gap: "var(--spacing-8)",
          maxWidth: "88%",
          opacity: visible ? 1 : 0,
          transform: reduceMotion || visible ? "none" : "translateY(4px)",
          transition: reduceMotion ? "none" : "opacity 200ms cubic-bezier(.2,0,.2,1), transform 200ms cubic-bezier(.2,0,.2,1)",
        },
        props.style
      )}
    >
      <span
        aria-hidden="true"
        style={{
          flex: "0 0 auto",
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "var(--color-leaf-bright)",
          color: "var(--color-canopy-green)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "var(--text-body-sm)",
          fontWeight: "var(--font-weight-bold)",
        }}
      >
        D
      </span>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            position: "relative",
            background: "var(--color-paper-white)",
            color: "var(--color-ink-black)",
            borderRadius: "var(--radius-icons)",
            borderTopLeftRadius: 2,
            padding: "7px 11px",
            fontSize: 14,
            lineHeight: 1.3,
            boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
          }}
        >
          {first.text}
        </div>
        <span
          style={{
            display: "block",
            marginTop: 4,
            /* 14px, not the 12px caption token: at 45 characters this reads as a line
               of text rather than a label, and 12px body-ish copy fails §1's floor. */
            fontSize: "var(--text-body-sm)",
            lineHeight: 1.3,
            color: "var(--color-mint-wash)",
            opacity: 0.85,
          }}
        >
          {CLINIC.name} · replies on WhatsApp
        </span>
      </div>
    </div>
  );
}

import React from "react";
import { useIsMobile, usePrefersReducedMotion } from "../../components/hooks/useMediaQuery.js";

/* Replaces the full-width bottom bar on phones. The bar cost ~110px of every screen,
   truncated its own labels, and on first load simply repeated the hero's CTA. This
   keeps the same three actions one tap away in a quarter of the space, and stays out
   of the way until the hero CTAs have scrolled off. */

const CIRCLE = 48;
const PRIMARY = 56;

function IconPhone() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function IconDirections() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.91-9.91A9.85 9.85 0 0 0 19.05 4.9 9.85 9.85 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24a8.2 8.2 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Z" />
    </svg>
  );
}

export function MobileActionStack(props) {
  const isMobile = useIsMobile();
  const reduceMotion = usePrefersReducedMotion();
  const [past, setPast] = React.useState(false);

  React.useEffect(() => {
    if (!isMobile) return;
    const cta = document.querySelector("[data-hero-cta]");
    if (!cta || typeof IntersectionObserver === "undefined") {
      setPast(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting), { threshold: 0 });
    io.observe(cta);
    return () => io.disconnect();
  }, [isMobile, props.page]);

  if (!isMobile || props.hidden) return null;

  const shown = past;
  const base = {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    background: "var(--color-canopy-green)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "var(--color-paper-white)",
    boxShadow: "0 4px 14px rgba(10,57,34,0.28)",
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 12,
        opacity: shown ? 1 : 0,
        transform: reduceMotion ? "none" : shown ? "translateX(0)" : "translateX(24px)",
        pointerEvents: shown ? "auto" : "none",
        transition: reduceMotion ? "opacity 120ms linear" : "opacity 180ms cubic-bezier(.2,0,.2,1), transform 180ms cubic-bezier(.2,0,.2,1)",
      }}
    >
      <a href={props.mapsUrl} target="_blank" rel="noreferrer" aria-label="Get directions to the clinic" style={base}>
        <IconDirections />
      </a>
      {/* The number is still a placeholder, so the call link is inert rather than
          dialling something wrong. It becomes a real tel: link via clinic.js. */}
      <a
        href={props.telUrl || "tel:"}
        onClick={props.telUrl ? undefined : (e) => e.preventDefault()}
        aria-label="Call the clinic"
        style={base}
      >
        <IconPhone />
      </a>
      <a
        href={props.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Book an appointment on WhatsApp"
        style={Object.assign({}, base, {
          width: PRIMARY,
          height: PRIMARY,
          background: "var(--action-primary-bg)",
          border: "1px solid transparent",
          boxShadow: "0 6px 18px rgba(255,100,59,0.35)",
        })}
      >
        <IconWhatsApp />
      </a>
    </div>
  );
}

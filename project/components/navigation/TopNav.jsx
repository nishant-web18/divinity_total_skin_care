import React from "react";
import { Button } from "../buttons/Button.jsx";

export function TopNav(props) {
  const links = props.links || ["Product", "Community", "Resources", "Pricing"];
  const active = props.active;

  /* The full row (wordmark + inline nav + locale + secondary + CTA) needs ~1000px of
     viewport before it stops wrapping into a second row. Below that the inline nav
     collapses into a toggle panel instead of breaking the header's height. */
  const shellRef = React.useRef(null);
  const [compact, setCompact] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const el = shellRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const measure = () => setCompact(el.getBoundingClientRect().width < 1000);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    if (!compact) setOpen(false);
  }, [compact]);

  const linkStyle = (l) => ({
    fontSize: "var(--text-body-sm)",
    fontWeight: "var(--font-weight-medium)",
    color: "var(--color-canopy-green)",
    textDecoration: active === l ? "underline" : "none",
    textUnderlineOffset: "6px",
    textDecorationThickness: active === l ? "2px" : undefined,
    opacity: active === l ? 1 : 0.78,
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    minHeight: "var(--tap-target)",
  });

  return (
    <header
      ref={shellRef}
      style={Object.assign(
        {
          background: "var(--color-paper-white)",
          width: "100%",
          fontFamily: "var(--font-dm-sans)",
          fontFeatureSettings: "var(--font-features)",
          boxShadow: "none",
        },
        props.style
      )}
    >
      <div
        style={{
          maxWidth: "var(--page-max-width)",
          margin: "0 auto",
          padding: compact ? "6px var(--page-gutter)" : "24px var(--page-gutter)",
          display: "flex",
          alignItems: "center",
          /* nowrap on purpose: the wordmark must shrink and wrap its own text
             rather than push the menu toggle onto a second row, which would make
             the sticky header twice as tall on a 320px screen. */
          flexWrap: "nowrap",
          gap: compact ? "var(--spacing-12)" : "var(--spacing-32)",
        }}
      >
        <a
          href={props.brandHref || "#"}
          onClick={props.onBrandClick}
          aria-label={props.brandLabel}
          style={{
            fontSize: "var(--text-subheading)",
            fontWeight: "var(--font-weight-bold)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--color-canopy-green)",
            textDecoration: "none",
            whiteSpace: compact ? "normal" : "nowrap",
            marginRight: compact ? "auto" : undefined,
            lineHeight: 1.15,
            display: "flex",
            alignItems: "center",
            minHeight: "var(--tap-target)",
            minWidth: 0,
          }}
        >
          {props.brand || "chat for impact"}
        </a>
        {compact ? null : (
          <nav style={{ display: "flex", gap: "var(--spacing-24)", marginRight: "auto", minWidth: 0 }}>
            {links.map((l) => (
              <a
                key={l}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (props.onNavigate) props.onNavigate(l);
                }}
                style={linkStyle(l)}
              >
                {l}
              </a>
            ))}
          </nav>
        )}
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end", minWidth: 0, gap: compact ? "var(--spacing-8)" : "var(--spacing-20)" }}>
          {compact || props.locale === null ? null : (
            <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-graphite)", whiteSpace: "nowrap" }}>
              {props.locale || "EN"}
            </span>
          )}
          {compact || props.secondary === null ? null : (
            <a
              href={(props.secondary && props.secondary.href) || "#"}
              style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-canopy-green)", textDecoration: "none", whiteSpace: "nowrap" }}
            >
              {(props.secondary && props.secondary.label) || "Log in"}
            </a>
          )}
          {/* Compact keeps only the menu toggle: the fixed conversion bar already
              carries booking at every scroll position, and a second CTA in the
              header pushed the sticky chrome past its 20%-of-screen budget. The
              action itself moves into the panel below, never disappears. */}
          {compact ? null : (
            <Button variant="nav" size="md" onClick={props.onCta}>
              {props.ctaLabel || "Book a Call"}
            </Button>
          )}
          {compact ? (
            <button
              type="button"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              style={{
                width: 44,
                height: 44,
                flex: "0 0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                background: "transparent",
                border: "1px solid var(--color-canopy-green)",
                borderRadius: "var(--radius-buttons)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <span style={{ display: "block", width: 18, height: 2, background: "var(--color-canopy-green)", borderRadius: 2 }}></span>
              <span style={{ display: "block", width: 18, height: 2, background: "var(--color-canopy-green)", borderRadius: 2 }}></span>
              <span style={{ display: "block", width: 18, height: 2, background: "var(--color-canopy-green)", borderRadius: 2 }}></span>
            </button>
          ) : null}
        </div>
      </div>
      {compact && open ? (
        <nav
          style={{
            borderTop: "1px solid var(--color-frost-gray)",
            padding: "var(--spacing-8) var(--page-gutter) var(--spacing-20)",
            maxWidth: "var(--page-max-width)",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {links.map((l) => (
            <a
              key={l}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                if (props.onNavigate) props.onNavigate(l);
              }}
              style={Object.assign({ padding: "12px 0", minHeight: 44, display: "flex", alignItems: "center" }, linkStyle(l))}
            >
              {l}
            </a>
          ))}
          {props.locale === null ? null : (
            <span style={{ padding: "12px 0", fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-graphite)" }}>
              {props.locale || "EN"}
            </span>
          )}
          <Button
            variant="nav"
            size="md"
            style={{ marginTop: "var(--spacing-8)" }}
            onClick={() => { setOpen(false); if (props.onCta) props.onCta(); }}
          >
            {props.ctaLabel || "Book a Call"}
          </Button>
        </nav>
      ) : null}
    </header>
  );
}

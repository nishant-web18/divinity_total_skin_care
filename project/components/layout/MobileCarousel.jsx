import React from "react";
import { useIsMobile, usePrefersReducedMotion } from "../hooks/useMediaQuery.js";

/* A horizontal scroll-snap strip on phones, the caller's own grid from 768px up.

   Three or more equal cards stacked vertically is several screens of scrolling on a
   phone; side-by-side with the next card peeking turns it into one. The peek is the
   affordance that matters — NN/g found partial visibility beats dots as a swipe cue —
   so slides are 84% wide, leaving ~16% of the next one showing.

   Desktop renders exactly the markup it did before, so approved layouts do not move. */

export function MobileCarousel(props) {
  const isMobile = useIsMobile();
  const reduceMotion = usePrefersReducedMotion();
  const [active, setActive] = React.useState(0);
  const stripRef = React.useRef(null);
  const items = React.Children.toArray(props.children);

  React.useEffect(() => {
    if (!isMobile || !stripRef.current || typeof IntersectionObserver === "undefined") return;
    const strip = stripRef.current;
    const slides = Array.from(strip.children);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = slides.indexOf(e.target);
            if (i !== -1) setActive(i);
          }
        });
      },
      { root: strip, threshold: 0.6 }
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isMobile, items.length]);

  const goTo = (i) => {
    const strip = stripRef.current;
    if (!strip || !strip.children[i]) return;
    strip.children[i].scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  if (!isMobile) {
    return <div style={props.gridStyle}>{items}</div>;
  }

  return (
    <div>
      <div
        ref={stripRef}
        className="ds-strip"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={props.label}
        style={{
          display: "flex",
          gap: "var(--spacing-16)",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          alignItems: "stretch",
          /* Bleed to the screen edge, then pad back in, so the first card lines up with
             the section heading while later cards can run past the gutter. */
          marginInline: "calc(-1 * var(--page-gutter))",
          paddingInline: "var(--page-gutter)",
          scrollPaddingInline: "var(--page-gutter)",
          paddingBottom: "var(--spacing-8)",
        }}
      >
        {items.map((child, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            style={{
              scrollSnapAlign: "start",
              flex: "0 0 auto",
              width: "84%",
              maxWidth: 340,
              display: "flex",
            }}
          >
            <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>{child}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-12)", marginTop: "var(--spacing-16)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1} of ${items.length}`}
              aria-current={i === active ? "true" : undefined}
              style={{
                /* The dot is the visible mark; the button around it carries the 44px
                   target the finger actually needs. */
                width: 24,
                height: 44,
                padding: 0,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  display: "block",
                  height: 6,
                  width: i === active ? 20 : 6,
                  borderRadius: 9999,
                  background: i === active ? props.accent || "var(--color-canopy-green)" : "var(--color-ash)",
                  transition: reduceMotion ? "none" : "width 160ms cubic-bezier(.2,0,.2,1)",
                }}
              />
            </button>
          ))}
        </div>
        {props.counter ? (
          <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-slate)", fontVariantNumeric: "tabular-nums", marginLeft: "auto" }}>
            {active + 1} / {items.length}
          </span>
        ) : null}
      </div>
    </div>
  );
}

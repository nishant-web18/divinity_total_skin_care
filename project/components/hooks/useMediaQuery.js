import React from "react";

/* Tailwind's `md:` prefix has no equivalent here — this kit styles inline — so mobile
   layout that genuinely differs in STRUCTURE (a carousel instead of a grid, a floating
   stack instead of a bar) branches on a matchMedia subscription instead. Pure styling
   differences stay in CSS; only structural ones come through here. */
export function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/* The single breakpoint this site switches layout on — RESPONSIVE.md §2 names `md:`
   (768px) as the main layout switch, so mobile is everything below it. */
export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)");
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/* Auto-fitting column track that is allowed to shrink below its own minimum.

   `minmax(300px, 1fr)` never goes under 300px, so on a 320px phone with gutters the
   track is wider than the column it sits in and the whole page scrolls sideways.
   `min(300px, 100%)` caps the minimum at the available width, so the grid collapses
   to one column instead of overflowing. RESPONSIVE.md §13 anti-pattern 4. */
export function autoFit(min) {
  return `repeat(auto-fit, minmax(min(${min}px, 100%), 1fr))`;
}

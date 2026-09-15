import * as React from "react";

/**
 * Full-bleed band with the 1280px centred container inside. Stacking bands by `tone` is
 * how pages are composed — dark → white → canvas → pastel, like rooms in sequence.
 * Intentional addition: the reference describes this layout rhythm but ships no
 * container component.
 */
export interface SectionBandProps {
  tone?: "dark" | "white" | "canvas" | "purple" | "mint" | "cream" | "peach";
  /** Vertical padding override, default var(--section-padding-y) = 80px */
  paddingY?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function SectionBand(props: SectionBandProps): JSX.Element;

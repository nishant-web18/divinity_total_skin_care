import * as React from "react";

/**
 * Flat tinted feature card — the workhorse of the middle bands. Give it `index` inside
 * a grid and it walks the six-wash rotation (mint, sage, sky, cream, lilac, peach), or
 * pin a `tone`. Never render these white or grey, and never add a shadow or border.
 *
 * @startingPoint section="Cards" subtitle="Pastel feature card with product graphic" viewport="700x300"
 */
export interface PastelCardProps {
  tone?: "mint" | "sage" | "sky" | "cream" | "lilac" | "peach" | "lavender";
  /** Position in a feature grid — drives the pastel rotation when `tone` is omitted */
  index?: number;
  title?: React.ReactNode;
  /** Override the 32px title size, e.g. "var(--text-heading-lg)" for a hero card */
  titleSize?: string;
  body?: React.ReactNode;
  tag?: React.ReactNode;
  /** Graphic slot — a ProductCard, PhoneMockup or chart sits here, below the text */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare const PASTEL_ROTATION: string[];
export declare function PastelCard(props: PastelCardProps): JSX.Element;

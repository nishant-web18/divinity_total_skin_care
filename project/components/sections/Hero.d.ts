import * as React from "react";

/**
 * Above-the-fold band: 69-80px headline left with one word colour-swapped, coral CTA +
 * ghost twin, and a layered phone-mockup-over-portrait composition right. Dark green by
 * default; `tone="canvas"` gives the lavender variant for inner pages.
 *
 * @startingPoint section="Sections" subtitle="Full-bleed hero, text left, product right" viewport="1280x620"
 */
export interface HeroProps {
  tone?: "dark" | "canvas";
  eyebrow?: React.ReactNode;
  /** Wrap one word in a span coloured Leaf Bright (dark) or Indigo Bloom (canvas) */
  headline?: React.ReactNode;
  headlineSize?: string;
  body?: React.ReactNode;
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  /** Right-hand composition — PhoneMockup overlapping a PhotoFrame */
  visual?: React.ReactNode;
  /** Slot under the CTAs, normally a LogoStrip */
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function Hero(props: HeroProps): JSX.Element;

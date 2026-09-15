import * as React from "react";

/**
 * Sticky white top bar: wordmark left, centred links, locale + secondary link +
 * outlined CTA right. Full-bleed white against whatever band sits below it; no shadow,
 * no border. Pass `locale={null}` / `secondary={null}` to drop either right-hand item.
 *
 * @startingPoint section="Navigation" subtitle="White sticky bar with outlined CTA" viewport="700x120"
 */
export interface TopNavProps {
  brand?: string;
  brandHref?: string;
  onBrandClick?: (e: React.MouseEvent) => void;
  links?: string[];
  active?: string;
  onNavigate?: (link: string) => void;
  ctaLabel?: string;
  onCta?: () => void;
  /** Language label, default "EN"; null removes it */
  locale?: string | null;
  /** Secondary text link, default { label: "Log in" }; null removes it */
  secondary?: { label: string; href?: string } | null;
  style?: React.CSSProperties;
}

export declare function TopNav(props: TopNavProps): JSX.Element;

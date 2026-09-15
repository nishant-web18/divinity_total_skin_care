import * as React from "react";

/**
 * Pill button. `primary` is the single coral CTA; always pair it with a `ghost`
 * (light sections) or `ghostOnDark` (green hero) twin. `nav` is the small outlined
 * header action, `cream` the warm CTA used inside dark notification cards.
 *
 * @startingPoint section="Actions" subtitle="Coral CTA, ghost twin, nav outline" viewport="700x200"
 */
export interface ButtonProps {
  variant?: "primary" | "ghost" | "ghostOnDark" | "nav" | "cream";
  /** lg = 16px/12-24 hero CTA, md = 14px/8-20 nav, sm = 14px/8-16 inline */
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  /** Renders an <a> instead of a <button> */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  full?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  ariaLabel?: string;
  style?: React.CSSProperties;
}

export declare function Button(props: ButtonProps): JSX.Element;

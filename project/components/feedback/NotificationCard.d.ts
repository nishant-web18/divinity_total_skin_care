import * as React from "react";

/**
 * Dark green announcement card, normally pinned bottom-right over every section
 * (`fixed`). Carries a deadline, optional tabular countdown blocks, a cream CTA and a
 * dismiss X. One per page, and never more than one message inside it.
 */
export interface NotificationCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Pre-formatted blocks, e.g. ["24d", "5h", "1m", "45s"] */
  countdown?: string[];
  ctaLabel?: string;
  onCta?: () => void;
  onClose?: () => void;
  fixed?: boolean;
  style?: React.CSSProperties;
}

export declare function NotificationCard(props: NotificationCardProps): JSX.Element;

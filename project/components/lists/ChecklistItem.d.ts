import * as React from "react";

/**
 * One row of the toolkit feature list: 24px filled icon tile + 20px label, 8px apart.
 * The selected row gets a lavender (or white, on lavender bands) block behind it.
 */
export interface ChecklistItemProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
  /** Override the active block fill — use white when the section itself is lavender */
  activeSurface?: string;
  onClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  style?: React.CSSProperties;
}

export declare function ChecklistItem(props: ChecklistItemProps): JSX.Element;

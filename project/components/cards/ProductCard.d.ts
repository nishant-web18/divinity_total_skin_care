import * as React from "react";

/**
 * White surface that holds actual product UI (chat mockups, inline screenshots, charts)
 * so the pastel card system never competes with real content. `flush` drops the padding
 * for edge-to-edge screenshots; `hairline` adds the 1px Frost Gray edge.
 */
export interface ProductCardProps {
  title?: React.ReactNode;
  meta?: React.ReactNode;
  flush?: boolean;
  hairline?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function ProductCard(props: ProductCardProps): JSX.Element;

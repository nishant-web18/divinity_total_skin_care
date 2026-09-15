import * as React from "react";

export interface LogoStripItem {
  src: string;
  alt?: string;
}

/**
 * Partner band under the hero. Pass real monochrome logo files as {src, alt} once you
 * have them; plain strings render the partner name as type, which is what ships here
 * because the reference includes no partner logo assets.
 */
export interface LogoStripProps {
  label?: string;
  items?: (string | LogoStripItem)[];
  /** true (default) tunes colour for the dark green band */
  onDark?: boolean;
  logoHeight?: number;
  align?: "center" | "flex-start";
  style?: React.CSSProperties;
}

export declare function LogoStrip(props: LogoStripProps): JSX.Element;

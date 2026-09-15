import * as React from "react";

/**
 * Rounded photography crop with the optional brand colour wash. No photography shipped
 * with the reference, so with no `src` it renders a labelled placeholder instead of a
 * fake image — drop real documentary portraits in and the frame is unchanged.
 * Intentional addition (see readme).
 */
export interface PhotoFrameProps {
  src?: string;
  alt?: string;
  /** Colour wash over the image — the toolkit band uses "leaf" at ~40% */
  overlay?: "none" | "leaf" | "green" | "indigo";
  /** CSS aspect-ratio, used when no src is present. Default "4 / 5" */
  ratio?: string;
  radius?: string;
  minHeight?: number | string;
  placeholder?: string;
  caption?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function PhotoFrame(props: PhotoFrameProps): JSX.Element;

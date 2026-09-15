import * as React from "react";

/**
 * Pill chip for categories and inline labels. Pick the `tone` that matches the
 * surface it sits on; `outline` swaps to a 1px accent border on transparent for
 * tags that need to read as UI edges rather than fills.
 */
export interface TagProps {
  tone?: "mint" | "sage" | "sky" | "cream" | "lilac" | "peach" | "lavender" | "orchid" | "onDark";
  outline?: "leaf" | "teal" | "indigo";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function Tag(props: TagProps): JSX.Element;

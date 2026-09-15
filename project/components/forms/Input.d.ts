import * as React from "react";

/**
 * Text field. The reference exposes no form UI beyond the subtle field shadow, so
 * this is an intentional addition (see readme "Intentional additions"): it is the
 * one place --shadow-subtle is allowed.
 */
export interface InputProps {
  label?: string;
  placeholder?: string;
  hint?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  full?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

export declare function Input(props: InputProps): JSX.Element;

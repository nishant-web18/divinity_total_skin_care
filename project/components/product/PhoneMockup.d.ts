import * as React from "react";

export interface PhoneMessage {
  direction?: "in" | "out";
  text?: React.ReactNode;
  sender?: string;
  time?: string;
}

/**
 * Chat-app phone mockup: dark green header, white chat body, optional composer. It is a
 * generic messaging frame — do not add a third-party messenger logo or wordmark to it.
 * Used as the hero product visualisation and inside pastel feature cards.
 *
 * @startingPoint section="Product" subtitle="Chat phone mockup with message thread" viewport="700x400"
 */
export interface PhoneMockupProps {
  contact?: string;
  status?: string;
  messages?: PhoneMessage[];
  width?: number;
  minHeight?: number;
  /** false hides the bottom composer row */
  composer?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function PhoneMockup(props: PhoneMockupProps): JSX.Element;

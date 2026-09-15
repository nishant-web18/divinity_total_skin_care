import * as React from "react";

/**
 * One message in a chat mockup. Incoming is white with a Frost Gray hairline; outgoing
 * is the canonical mint #dcf8c6. Sender names print in Leaf Bright.
 */
export interface ChatBubbleProps {
  direction?: "in" | "out";
  sender?: string;
  time?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function ChatBubble(props: ChatBubbleProps): JSX.Element;

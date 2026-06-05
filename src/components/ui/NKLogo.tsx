import React from "react";

interface Props {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

// Geometric N mark — black circle, white N constructed from two vertical bars + diagonal
export default function NKLogo({ size = 34, style, className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      width={size}
      height={size}
      style={{ flexShrink: 0, display: "block", ...style }}
      aria-label="N logo"
    >
      <circle cx="16" cy="16" r="16" fill="#000" />
      {/* Left vertical bar */}
      <rect x="6" y="6" width="5" height="20" fill="white" />
      {/* Diagonal bar — top-right of left bar to bottom-left of right bar */}
      <polygon points="11,6 15,6 21,26 17,26" fill="white" />
      {/* Right vertical bar */}
      <rect x="21" y="6" width="5" height="20" fill="white" />
    </svg>
  );
}

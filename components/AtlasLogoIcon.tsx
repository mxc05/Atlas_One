import React from "react";

export function AtlasLogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
      <path d="M 50 12 L 88 88 H 70 L 52 48 C 58 60 62 70 54 77 C 44 84 33 76 34 60 C 35 44 45 30 50 12 Z" />
      <path d="M 12 88 L 26 62 L 38 88 H 12 Z" />
    </svg>
  );
}

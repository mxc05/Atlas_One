"use client";

import React from "react";
import Link from "next/link";

export function AtlasLogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
      <path d="M 50 12 L 86 88 H 70 L 52 48 C 58 60 62 70 54 77 C 44 84 33 76 34 60 C 35 44 45 30 50 12 Z" />
      <path d="M 24 88 L 34 68 L 44 88 H 24 Z" />
    </svg>
  );
}

export type AnimatedButtonProps = {
  text?: string;
  variant?: "black" | "blue";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
};

export function AnimatedButton({
  text = "Book a Demo",
  variant,
  onClick,
  href,
  className = "",
  disabled = false,
  type = "button",
  ariaLabel,
}: AnimatedButtonProps) {
  // Determine variant: default to "black" if text has "atlas" or variant is "black"
  const activeVariant =
    variant || (text.toLowerCase().includes("atlas") ? "black" : "blue");

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick(e);
    } else if (
      typeof window !== "undefined" &&
      text.toLowerCase().includes("demo") &&
      !href
    ) {
      window.dispatchEvent(new CustomEvent("open-demo-modal"));
    }
  };

  const isAtlasButton = activeVariant === "black";

  const content = (
    <>
      <span className="btn-shine-layer" aria-hidden="true" />
      <span className="btn-text-label">{text}</span>
      <span className="btn-icon-circle" aria-hidden="true">
        {isAtlasButton ? (
          <AtlasLogoIcon className="atlas-logo-svg" />
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        )}
      </span>
    </>
  );

  const combinedClass = `btn-animated-cta btn-animated-cta-${activeVariant} ${
    disabled ? "disabled" : ""
  } ${className}`.trim();

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={combinedClass}
        onClick={handleClick}
        aria-label={ariaLabel || text}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClass}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
    >
      {content}
    </button>
  );
}

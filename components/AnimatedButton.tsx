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
  variant?: "black" | "blue" | "outline";
  iconDirection?: "up-right" | "right" | "left" | "check" | "atlas";
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
  iconDirection = "up-right",
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

  const renderIcon = () => {
    if (iconDirection === "atlas") {
      return <AtlasLogoIcon className="atlas-logo-svg" />;
    }
    if (iconDirection === "left") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      );
    }
    if (iconDirection === "right") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      );
    }
    if (iconDirection === "check") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    }
    // Default up-right 45-degree arrow
    return (
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
    );
  };

  const content = (
    <>
      <span className="btn-shine-layer" aria-hidden="true" />
      <span className="btn-text-label">{text}</span>
      <span className="btn-icon-circle" aria-hidden="true">
        {renderIcon()}
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

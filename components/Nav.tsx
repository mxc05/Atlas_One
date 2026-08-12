"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedButton } from "./AnimatedButton";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isPricing = pathname === "/pricing";

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`} id="siteNav">
      <div className="wrap nav-inner">
        <Link href="/" className="brand">
          <span className="mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
              <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <span className="brand-text">
            <span className="brand-name">
              Atlas <em>One</em>
            </span>
            <span className="brand-by">by Controve</span>
          </span>
        </Link>
        <nav className="nav-links">
          <Link href="/#highlights">Product</Link>
          <Link href="/#systems">Systems</Link>
          <Link href="/pricing" className={isPricing ? "active" : ""}>
            Pricing
          </Link>
          <Link href="/#personas">Who it's for</Link>
        </nav>
        <div className="nav-right">
          <Link className="nav-signin" href="/#cta">
            Log in
          </Link>
          <AnimatedButton
            text="Get Atlas One"
            variant="black"
            href={isPricing ? "/pricing#plans" : "/#cta"}
          />
        </div>
      </div>
    </header>
  );
}

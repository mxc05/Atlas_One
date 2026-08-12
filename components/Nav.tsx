"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedButton } from "./AnimatedButton";
import { AtlasLogoIcon } from "./AtlasLogoIcon";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname === "/") {
        const heroSection = document.querySelector("section.hero");
        if (heroSection) {
          const rect = heroSection.getBoundingClientRect();
          // Show navbar CTA strictly after the user crosses the entire Hero section
          setShowCta(rect.bottom <= 80);
        } else {
          setShowCta(window.scrollY > 800);
        }
      } else {
        setShowCta(window.scrollY > 100);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isPricing = pathname === "/pricing";

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`} id="siteNav">
      <div className="wrap nav-inner">
        <Link href="/" className="brand">
          <span className="mark">
            <AtlasLogoIcon className="brand-logo-mark" />
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
        </nav>
        <div className="nav-right">
          <div className={`nav-cta-wrap ${showCta ? "visible" : ""}`}>
            <AnimatedButton
              text="Get Atlas One"
              variant="black"
              href="/pricing"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

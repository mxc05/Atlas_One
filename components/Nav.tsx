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
          // Show navbar CTA strictly after crossing the entire Hero section
          setShowCta(rect.bottom <= 80);
        } else {
          setShowCta(window.scrollY > 800);
        }
      } else if (pathname === "/pricing") {
        const faqSection = document.querySelector("section.faq-section, #faq");
        if (faqSection) {
          const rect = faqSection.getBoundingClientRect();
          // Show navbar CTA strictly when user has scrolled to the FAQ section
          setShowCta(rect.top <= window.innerHeight * 0.75);
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
  const navCtaText = isPricing ? "Book a Demo" : "Get Atlas One";
  const navCtaVariant = isPricing ? "blue" : "black";
  const navCtaHref = isPricing ? undefined : "/pricing";

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
          <button
            type="button"
            className="nav-btn-link"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("open-contact-modal"));
            }}
          >
            Contact Us
          </button>
        </nav>
        <div className="nav-right">
          <div className={`nav-cta-wrap ${showCta ? "visible" : ""}`}>
            <AnimatedButton
              text={navCtaText}
              variant={navCtaVariant}
              href={navCtaHref}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

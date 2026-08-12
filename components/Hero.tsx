"use client";

import { HeroCanvas } from "./HeroCanvas";
import { HeroMockup } from "./HeroMockup";
import { useReveal } from "@/hooks/useReveal";
import { AnimatedButton } from "./AnimatedButton";

export function Hero() {
  const mockupRef = useReveal();

  return (
    <section className="hero">
      <HeroCanvas />
      <div className="wrap hero-inner">
        <div className="eyebrow-pill">
          <span className="dotping" /> Built for Indian freelancers &amp; solo agencies
        </div>
        <h1 className="page-title">
          Your business, <span className="accent">finally connected</span>.
        </h1>
        <p className="lede">
          Atlas One is a Notion-based app which brings your clients, invoices, payments, expenses, GST position and your business financials into one workspace — so recording one real event updates everything downstream, automatically.
        </p>
        <div className="hero-ctas">
          <AnimatedButton text="Get Atlas One" variant="black" href="#cta" />
          <AnimatedButton text="Book a Demo" variant="blue" />
        </div>
        <div className="hero-note">
          15 connected systems · One Workspace · One-time Payment · Lifetime Access
        </div>
      </div>
      <div className="reveal" ref={mockupRef}>
        <HeroMockup />
      </div>
    </section>
  );
}

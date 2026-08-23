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
          Atlas One is a Notion-based app which brings your clients, projects, invoices, payments, expenses, GST position and your business financials into one workspace — so recording one real event updates everything downstream, automatically.
        </p>
        <div className="hero-ctas">
          <AnimatedButton text="Get Atlas One" variant="black" href="/pricing" />
          <AnimatedButton text="Book a Demo" variant="blue" />
        </div>
        <div className="hero-note">
          <span className="hero-note-item">15 connected systems</span>
          <span className="hero-note-sep">·</span>
          <span className="hero-note-item">One Workspace</span>
          <span className="hero-note-sep">·</span>
          <span className="hero-note-item">One-time Payment</span>
          <span className="hero-note-sep">·</span>
          <span className="hero-note-item">Lifetime Access</span>
        </div>
      </div>
      <div className="reveal" ref={mockupRef}>
        <HeroMockup />
      </div>
    </section>
  );
}

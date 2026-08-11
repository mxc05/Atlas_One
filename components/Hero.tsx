"use client";

import Link from "next/link";
import { HeroCanvas } from "./HeroCanvas";
import { HeroMockup } from "./HeroMockup";
import { useReveal } from "@/hooks/useReveal";

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
          <Link href="#cta" className="btn btn-black btn-lg">
            Get Atlas One
          </Link>
          <Link href="#highlights" className="btn btn-blue btn-lg">
            Book a Demo
          </Link>
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

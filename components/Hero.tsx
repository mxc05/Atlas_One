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
          Atlas One brings your clients, invoices, payments, expenses and GST position into one workspace — so one real
          event updates everything downstream, automatically.
        </p>
        <div className="hero-ctas">
          <Link href="#cta" className="btn btn-black btn-lg">
            Get Atlas free
          </Link>
          <Link href="#highlights" className="btn btn-outline btn-lg">
            See how it works
          </Link>
        </div>
        <div className="hero-note">No card required · 15 connected systems · Built for GST-era freelancing</div>
      </div>
      <div className="reveal" ref={mockupRef}>
        <HeroMockup />
      </div>
    </section>
  );
}

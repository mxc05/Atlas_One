import { Hero } from "@/components/Hero";
import { SpotlightSection } from "@/components/SpotlightSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { StatusLegend } from "@/components/StatusLegend";
import { SystemsArcCarousel } from "@/components/SystemsArcCarousel";
import { Personas } from "@/components/Personas";
import { CTA } from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="highlights">
        {/* Spotlight 1: GST Threshold */}
        <SpotlightSection
          badgeBg="var(--amber-bg)"
          badgeStroke="var(--amber-ic)"
          badgeSvg={
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber-ic)" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v5l3 2" />
            </svg>
          }
          eyebrow="GST threshold"
          title="Know before you owe"
          body="Most freelancers find out they've crossed the GST threshold after it's already a problem. We watch your billing all year, quietly, and tell you the moment you're getting close — so registration is a decision you make on your own time, not a scramble under a deadline."
          visual="gauge"
        />

        {/* Spotlight 2: Actual vs Presumptive (Reverse layout) */}
        <SpotlightSection
          reverse
          badgeBg="var(--blue-bg)"
          badgeStroke="var(--blue-ic)"
          badgeSvg={
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--blue-ic)" strokeWidth="1.8">
              <path d="M6 3v18M18 3v18M3 8l3-3 3 3M15 16l3 3 3-3" />
            </svg>
          }
          eyebrow="Actual vs Presumptive"
          title="Two tax paths, one clear answer"
          body="Actual or Presumptive scheme taxation isn't something you should be guessing before a filing deadline. We calculate both — your real profit and your deemed profit — side by side, so choosing the one that works in your favour is simple, not stressful."
          visual="compare"
        />

        {/* Spotlight 3: Receivables mapped to Invoices */}
        <SpotlightSection
          badgeBg="var(--green-bg)"
          badgeStroke="var(--green-ic)"
          badgeSvg={
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--green-ic)" strokeWidth="1.8">
              <circle cx="12" cy="12" r="8" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          }
          eyebrow="Receivables mapped to Invoices"
          title="Only count money you actually have"
          body="An invoice isn't income until it's paid. We track what's landed in your account, not just what you've billed — so you're never paying tax on money a client hasn't sent yet. See both the cash side and the accrual side, clearly."
          visual="cash"
        />
      </section>

      <FeatureGrid />
      <StatusLegend />
      <SystemsArcCarousel />
      <Personas />
    </>
  );
}

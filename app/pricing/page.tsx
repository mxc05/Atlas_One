"use client";

import { PricingHero } from "@/components/PricingHero";
import { PricingPlans } from "@/components/PricingPlans";
import { PricingFAQ } from "@/components/PricingFAQ";
import { CTA } from "@/components/CTA";

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingPlans />
      <PricingFAQ />
      <CTA />
    </>
  );
}

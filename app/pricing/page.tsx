"use client";

import { useState } from "react";
import { PricingHero } from "@/components/PricingHero";
import { PricingPlans } from "@/components/PricingPlans";
import { PricingCompare } from "@/components/PricingCompare";
import { PricingFAQ } from "@/components/PricingFAQ";
import { CTA } from "@/components/CTA";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <PricingHero annual={annual} onToggleAnnual={() => setAnnual(!annual)} />
      <PricingPlans annual={annual} />
      <PricingCompare />
      <PricingFAQ />
      <CTA />
    </>
  );
}

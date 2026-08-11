"use client";

import Link from "next/link";
import { pricingPlans } from "@/lib/content";
import { useReveal } from "@/hooks/useReveal";

export function PricingPlans() {
  const sectionRef = useReveal();

  return (
    <section className="plans reveal" id="plans" ref={sectionRef}>
      <div className="wrap">
        <div className="plan-grid">
          {pricingPlans.map((plan, idx) => (
            <div className={`plan-card ${plan.featured ? "featured" : ""}`} key={idx}>
              {plan.badge && <div className="plan-badge">{plan.badge}</div>}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">
                <span className="amt price-amt">{plan.priceMonthly}</span>
                <span className="per"> one-time</span>
              </div>
              <div className="plan-sub price-sub">{plan.subMonthly}</div>
              <p className="plan-desc">{plan.desc}</p>
              <Link
                href={plan.btnLink}
                className={`btn ${plan.featured ? "btn-black" : "btn-outline"} btn-full`}
              >
                {plan.btnText}
              </Link>
              <ul className="plan-features">
                {plan.features.map((feat, fidx) => (
                  <li className={feat.included ? "" : "dim"} key={fidx}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {feat.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

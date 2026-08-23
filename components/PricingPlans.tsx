"use client";

import Link from "next/link";
import { pricingPlans } from "@/lib/content";
import { useReveal } from "@/hooks/useReveal";
import { AnimatedButton } from "./AnimatedButton";

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
              </div>
              <div className="plan-sub price-sub">{plan.subMonthly}</div>
              <p className="plan-desc">{plan.desc}</p>
              <AnimatedButton
                text={plan.btnText}
                variant="black"
                href={plan.btnLink}
                className="btn-full"
              />
              <ul className="plan-features" style={{ marginTop: "24px" }}>
                {plan.features.map((feat, fidx) => (
                  <li className={feat.included ? "" : "dim"} key={fidx}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {feat.text}
                  </li>
                ))}
              </ul>
              <p
                style={{
                  marginTop: "20px",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--border-soft)",
                  fontSize: "12.5px",
                  color: "var(--muted)",
                  lineHeight: 1.5,
                }}
              >
                Lifetime access to Atlas One itself — built on Notion&apos;s free tier as of today.{" "}
                <Link
                  href="/terms"
                  style={{ color: "var(--ink)", textDecoration: "underline", fontWeight: 500 }}
                >
                  See Terms for details.
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

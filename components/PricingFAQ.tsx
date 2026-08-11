"use client";

import { useReveal } from "@/hooks/useReveal";
import { faqItems } from "@/lib/content";

export function PricingFAQ() {
  const sectionRef = useReveal();

  return (
    <section className="reveal" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head center" style={{ marginTop: "80px" }}>
          <div className="eyebrow" style={{ justifyContent: "center", display: "flex" }}>
            Questions
          </div>
          <h2>Before you switch plans.</h2>
        </div>
        <div className="faq">
          {faqItems.map((item, idx) => (
            <details className="faq-item" key={idx} open={idx === 0}>
              <summary>
                {item.q}
                <span className="plus" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

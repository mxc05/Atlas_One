"use client";

import { useReveal } from "@/hooks/useReveal";
import { faqItems } from "@/lib/content";

export function PricingFAQ() {
  const sectionRef = useReveal();

  return (
    <section className="faq-section reveal" id="faq" ref={sectionRef}>
      <div className="wrap faq-inner">
        <div className="faq-left">
          <h2 className="faq-title">Frequently asked questions</h2>
        </div>
        <div className="faq-right">
          <div className="faq-list">
            {faqItems.map((item, idx) => (
              <details className="faq-item" key={idx} open={idx === 0}>
                <summary>
                  <span className="q-text">{item.q}</span>
                  <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <p className="a-text" dangerouslySetInnerHTML={{ __html: item.a }} />
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

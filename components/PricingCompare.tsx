"use client";

import { useReveal } from "@/hooks/useReveal";
import { comparisonTable } from "@/lib/content";

export function PricingCompare() {
  const sectionRef = useReveal();

  const renderVal = (val: string | boolean) => {
    if (typeof val === "boolean") {
      return val ? (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <span className="dash">—</span>
      );
    }
    return val === "—" ? <span className="dash">—</span> : val;
  };

  return (
    <section className="compare-sec reveal" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head center">
          <div className="eyebrow" style={{ justifyContent: "center", display: "flex" }}>
            Compare in detail
          </div>
          <h2>What's in each plan.</h2>
        </div>
        <div className="ctable-wrap">
          <table className="ctable">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="center">Free</th>
                <th className="center">Pro</th>
                <th className="center">Studio</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row, idx) => (
                <tr key={idx}>
                  <td className="feat">{row.feature}</td>
                  <td className="center">{renderVal(row.free)}</td>
                  <td className="center">{renderVal(row.pro)}</td>
                  <td className="center">{renderVal(row.studio)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

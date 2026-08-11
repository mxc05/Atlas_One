"use client";

import { useReveal } from "@/hooks/useReveal";

export type SpotlightProps = {
  reverse?: boolean;
  badgeBg: string;
  badgeStroke: string;
  badgeSvg: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  visual: "gauge" | "compare" | "cash";
};

export function SpotlightSection({
  reverse,
  badgeBg,
  badgeStroke,
  badgeSvg,
  eyebrow,
  title,
  body,
  visual,
}: SpotlightProps) {
  const sectionRef = useReveal();

  return (
    <div className={`spotlight ${reverse ? "rev" : ""} reveal`} ref={sectionRef}>
      <div className="wrap spotlight-inner">
        <div>
          <div className="icon-badge" style={{ background: badgeBg }}>
            {badgeSvg}
          </div>
          <div className="eyebrow">{eyebrow}</div>
          <h3>{title}</h3>
          <p>{body}</p>
        </div>

        <div className="spotlight-visual">
          {visual === "gauge" && (
            <div className="gauge-card">
              <div className="glabel">GST registration threshold</div>
              <div className="gnum">
                ₹14.4L <span style={{ fontSize: "15px", color: "var(--muted-2)", fontWeight: 500 }}>of ₹20L</span>
              </div>
              <div className="gauge-track">
                <div className="gauge-fill" />
              </div>
              <div className="gauge-foot">
                <span>72% of threshold</span>
                <span>FY 2026–27</span>
              </div>
              <div className="gauge-warn">
                ⚠️ At this pace you'll cross the threshold by <b>November</b>. Plan registration on your own schedule.
              </div>
            </div>
          )}

          {visual === "compare" && (
            <div className="compare-row">
              <div className="compare-col">
                <div className="clabel">Deemed profit</div>
                <div className="cnum">₹8.2L</div>
                <div className="cnote">Presumptive scheme · 50% of receipts</div>
              </div>
              <div className="compare-col win">
                <div className="clabel">Actual profit</div>
                <div className="cnum">₹9.6L</div>
                <div className="cnote">From your books, expenses deducted</div>
                <div className="compare-badge">Better for you</div>
              </div>
            </div>
          )}

          {visual === "cash" && (
            <>
              <div className="cash-toggle">● Cash basis — ON</div>
              <div className="cash-row">
                <span className="cl">Third Wave Studio</span>
                <span className="amt-received">₹86,400 received</span>
              </div>
              <div className="cash-row">
                <span className="cl">Northline Analytics</span>
                <span className="amt-billed">₹1,42,000 billed</span>
              </div>
              <div className="cash-row">
                <span className="cl">Ferrow &amp; Co.</span>
                <span className="amt-billed">₹54,000 billed</span>
              </div>
              <div className="cash-row">
                <span className="cl">Pallet Devices</span>
                <span className="amt-received">₹2,10,000 received</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

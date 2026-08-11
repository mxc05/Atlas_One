"use client";

import { useReveal } from "@/hooks/useReveal";

export function StatusLegend() {
  const legendRef = useReveal();

  return (
    <section className="legend reveal" ref={legendRef}>
      <div className="wrap">
        <div className="status-row">
          <div className="status-item">
            <span className="dot red" /> Overdue
          </div>
          <div className="status-item">
            <span className="dot amber" /> Due soon
          </div>
          <div className="status-item">
            <span className="dot green" /> On track
          </div>
          <div className="status-item">
            <span className="dot check" /> Complete
          </div>
          <div className="status-item">
            <span className="dot grey" /> Not applicable
          </div>
          <div className="status-item">
            <span className="dot pause">
              <i />
              <i />
            </span>{" "}
            Paused
          </div>
        </div>
        <p className="legend-cap">
          One small visual vocabulary, used everywhere — invoices, projects, tax obligations. Learn it once, read your
          whole business at a glance.
        </p>
      </div>
    </section>
  );
}

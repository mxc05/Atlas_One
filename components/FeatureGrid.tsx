"use client";

import { useReveal } from "@/hooks/useReveal";
import { FlowDiagram } from "./FlowDiagram";

export function FeatureGrid() {
  const sectionRef = useReveal();

  return (
    <section className="gridsec reveal" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head center">
          <div className="eyebrow" style={{ justifyContent: "center", display: "flex" }}>
            And there's more, built in
          </div>
          <h2>Everything else a freelancer has been tracking by hand.</h2>
        </div>
        <div className="fgrid">
          <div className="fcard">
            <div className="icon-badge" style={{ background: "var(--purple-bg)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--purple-ic)" strokeWidth="1.8">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M7 9h10M7 13h6M7 17h4" />
              </svg>
            </div>
            <h4>Your GST position, always current</h4>
            <p>
              Output tax, input credit, what's payable, what's claimed — one clear number, always up to date. No piecing
              it together from three tabs the night before a filing.
            </p>
          </div>

          <div className="fcard">
            <div className="icon-badge" style={{ background: "var(--orange-bg)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--orange-ic)" strokeWidth="1.8">
                <path d="M7 3h7l4 4v14H7z" />
                <path d="M14 3v4h4M9 12h6M9 16h6" />
              </svg>
            </div>
            <h4>Everything your CA will ask for, already stacked</h4>
            <p>
              Contracts, invoices, receipts — stored against the right client the moment they matter, not hunted down
              three days before tax season.
            </p>
          </div>

          <div className="fcard">
            <div className="icon-badge" style={{ background: "var(--pink-bg)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--pink-ic)" strokeWidth="1.8">
                <path d="M12 3v5M12 3a5 5 0 015 5c0 3-5 4-5 8M12 3a5 5 0 00-5 5c0 3 5 4 5 8" />
                <circle cx="12" cy="19" r="1.4" fill="var(--pink-ic)" stroke="none" />
              </svg>
            </div>
            <h4>Alerts that keep you notified</h4>
            <p>
              Unpaid invoices, upcoming deadlines, work waiting on a client — surfaced before they become a problem,
              not after.
            </p>
          </div>

          <div className="fcard flowcard">
            <div className="flow-copy">
              <div className="icon-badge" style={{ background: "var(--blue-bg)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--blue-ic)" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="2.2" />
                  <circle cx="4" cy="6" r="1.5" />
                  <circle cx="20" cy="6" r="1.5" />
                  <circle cx="4" cy="18" r="1.5" />
                  <circle cx="20" cy="18" r="1.5" />
                </svg>
              </div>
              <h4>Enter it once, it flows everywhere</h4>
              <p>
                Mark a payment received, and it quietly ripples through your client's record, your monthly profit, your
                GST ledger, and your yearly summary — no re-typing, no mismatches.
              </p>
            </div>
            <div className="flow-canvas-wrap">
              <FlowDiagram />
            </div>
          </div>

          <div className="fcard fullcard">
            <div className="icon-badge" style={{ background: "var(--green-bg)", flex: "none" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--green-ic)" strokeWidth="1.8">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <div>
              <h4>Your whole business, finally in one place</h4>
              <p>
                Clients, invoices, projects, payments, expenses — built to work together instead of living in separate
                tabs that never quite agree with each other. One system that remembers what you told it, so you don't have
                to.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

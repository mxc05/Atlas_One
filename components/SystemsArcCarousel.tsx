"use client";

import { useArcCarousel } from "@/hooks/useArcCarousel";
import { systemRegions } from "@/lib/content";
import { useReveal } from "@/hooks/useReveal";
import { HeroCanvas } from "./HeroCanvas";

export function SystemsArcCarousel() {
  const sectionRef = useReveal();
  const { stageRef, viewportRef, cardsState, handleCardClick, handleMouseEnter, handleMouseLeave, moveOne } =
    useArcCarousel(systemRegions);

  return (
    <section className="systems reveal" id="systems" ref={sectionRef} style={{ position: "relative", overflow: "hidden" }}>
      <HeroCanvas />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-head center">
          <div className="eyebrow" style={{ justifyContent: "center", display: "flex" }}>
            The systems in place
          </div>
          <h2>Fifteen connected systems. Five workspaces.</h2>
        </div>

        <div className="arc-viewport" ref={viewportRef}>
          <div className="arc-stage" ref={stageRef}>
            {cardsState.map((card) => {
              const r = card.data;
              const slot = card.logical;
              return (
                <article
                  key={card.logical}
                  className={`arc-card ${r.theme} ${card.isHovered ? "hovered" : ""}`}
                  aria-label={r.title}
                  style={card.style}
                  onMouseEnter={() => handleMouseEnter(card.logical)}
                  onMouseLeave={() => handleMouseLeave(card.logical)}
                  onClick={() => handleCardClick(card.logical, slot)}
                >
                  <div className="arc-card-motion" style={card.motionStyle}>
                    <div className="arc-surface">
                      <header>
                        <span className="mono-label">{r.kicker}</span>
                        <span className="mono-num">{r.num}</span>
                      </header>

                      <div className="arc-card-content">
                        <h4>{r.title}</h4>

                        {r.type === "numeral" && (
                          <div className="card-numeral-body">
                            <p>{r.details}</p>
                            <span className="numeral-watermark">01</span>
                          </div>
                        )}

                        {r.type === "steps" && (
                          <div className="card-steps-body">
                            <p className="card-desc">{r.details}</p>
                            <ul className="mini-steps">
                              {r.steps?.map((step, idx) => (
                                <li key={idx}>
                                  <span className="sdot" /> {step}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {r.type === "stats" && (
                          <div className="card-stats-body">
                            <div className="stat-value">{r.statVal}</div>
                            <div className="stat-label">{r.statLabel}</div>
                            <p className="card-desc" style={{ marginTop: "10px" }}>
                              {r.details}
                            </p>
                          </div>
                        )}

                        {r.type === "compare" && (
                          <div className="card-compare-body">
                            <div className="compare-mini-cols">
                              <div className="cmini win">
                                <span className="clbl">Deemed (44ADA)</span>
                                <span className="camt">{r.deemed}</span>
                              </div>
                              <div className="cmini">
                                <span className="clbl">Actual Books</span>
                                <span className="camt">{r.actual}</span>
                              </div>
                            </div>
                            <p className="card-desc" style={{ marginTop: "12px" }}>
                              {r.details}
                            </p>
                          </div>
                        )}

                        {r.type === "statement" && (
                          <div className="card-statement-body">
                            <blockquote className="quote-text">{r.statement}</blockquote>
                            <p className="card-desc">{r.details}</p>
                          </div>
                        )}

                        {r.type === "brief" && (
                          <div className="card-brief-body">
                            <div className="mini-gauge">
                              <div className="mgauge-bar">
                                <div className="mgauge-fill" style={{ width: "72%" }} />
                              </div>
                              <span className="mgauge-status">{r.status}</span>
                            </div>
                            <p className="card-desc">{r.details}</p>
                          </div>
                        )}

                        {r.type === "orbital" && (
                          <div className="card-orbital-body">
                            <div className="orbital-svg-wrap">
                              <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="40" cy="40" r="28" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                                <circle cx="120" cy="40" r="28" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                                <path d="M40 40 Q80 15 120 40 Q80 65 40 40" stroke="currentColor" strokeWidth="1.8" />
                                <circle cx="40" cy="40" r="4" fill="currentColor" />
                                <circle cx="120" cy="40" r="4" fill="currentColor" />
                                <circle cx="80" cy="40" r="5" fill="#3d8a52" />
                              </svg>
                            </div>
                            <p className="card-desc">{r.details}</p>
                          </div>
                        )}
                      </div>

                      <div className="arc-badge">{r.num}</div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="arc-controls-bar">
          <button
            type="button"
            className="arc-arrow-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              moveOne(1);
            }}
            aria-label="Previous system card (Scroll Up)"
            title="Previous system card"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>

          <span className="arc-bottom-hint-text">DRAG — SCROLL</span>

          <button
            type="button"
            className="arc-arrow-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              moveOne(-1);
            }}
            aria-label="Next system card (Scroll Down)"
            title="Next system card"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        <div className="relation-note">
          <p>
            <b>Nothing stands alone.</b> Every piece is connected, traceable, and contributes to a complete picture of your business.
          </p>
        </div>
      </div>
    </section>
  );
}

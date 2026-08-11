"use client";

import { useArcCarousel } from "@/hooks/useArcCarousel";
import { systemRegions } from "@/lib/content";
import { useReveal } from "@/hooks/useReveal";

export function SystemsArcCarousel() {
  const sectionRef = useReveal();
  const { stageRef, viewportRef, cardsState, handleCardClick, handleMouseEnter, handleMouseLeave } =
    useArcCarousel(systemRegions);

  return (
    <section className="systems reveal" id="systems" ref={sectionRef}>
      <div className="wrap">
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
                  className={`arc-card ${r.theme}`}
                  aria-label={r.title}
                  style={card.style}
                  onMouseEnter={() => handleMouseEnter(card.logical)}
                  onMouseLeave={() => handleMouseLeave(card.logical)}
                  onClick={() => handleCardClick(card.logical, slot)}
                >
                  <div className="arc-card-motion" style={card.motionStyle}>
                    <div className="arc-surface">
                      <header>
                        <span>{r.kicker}</span>
                        <span>SYS / {r.num}</span>
                      </header>
                      <h4>{r.title}</h4>
                      <ul>
                        {r.items.map((it, idx) => (
                          <li key={idx}>{it}</li>
                        ))}
                      </ul>
                      <div className="arc-badge">{r.num}</div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="arc-hint">
          <span>Drag</span>
          <i />
          <span>Scroll</span>
        </div>

        <div className="relation-note" style={{ marginTop: "56px" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5l3 2" />
          </svg>
          <p>
            <b>Almost nothing here stands alone.</b> An invoice depends on its client for GST defaults. A receipt depends on
            its invoice's TDS. GST Ledger and PL Statement both depend on invoices and expenses tagged to the right month
            — and the Financial Year Summary depends on all twelve months agreeing.
          </p>
        </div>
      </div>
    </section>
  );
}

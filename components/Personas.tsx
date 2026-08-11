"use client";

import { useReveal } from "@/hooks/useReveal";
import { personas } from "@/lib/content";

export function Personas() {
  const sectionRef = useReveal();

  return (
    <section className="personas reveal" id="personas" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Who it's built for</div>
          <h2>Three people, one system.</h2>
        </div>
        <div className="persona-grid">
          {personas.map((p, idx) => (
            <div className="pcard" key={idx}>
              <div className="avatar" style={{ background: p.bg }}>
                {p.initials}
              </div>
              <div className="who">{p.who}</div>
              <h4>{p.title}</h4>
              <p>{p.body}</p>
              {p.quote && <blockquote>{p.quote}</blockquote>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

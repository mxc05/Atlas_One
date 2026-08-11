"use client";

import { useState } from "react";

export function CTA() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="cta" id="cta">
      <div className="cta-blob b1" />
      <div className="cta-blob b2" />
      <div className="wrap cta-inner">
        <h2>Stop reconciling your business by hand.</h2>
        <p>We're building the dedicated Atlas One interface now. Join the waitlist to get early access when it opens.</p>

        {submitted ? (
          <p
            style={{
              color: "#3d8a52",
              fontFamily: "'SFMono-Regular', 'JetBrains Mono', monospace",
              fontSize: "13px",
            }}
          >
            You are on the list — we will be in touch.
          </p>
        ) : (
          <form
            className="cta-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input type="email" placeholder="you@studio.com" required />
            <button className="btn btn-black" type="submit">
              Join waitlist
            </button>
          </form>
        )}

        <div className="cta-note">NO SPAM · ONE EMAIL WHEN WE OPEN ACCESS</div>
      </div>
    </section>
  );
}

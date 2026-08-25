"use client";

import Link from "next/link";
import { AtlasLogoIcon } from "./AtlasLogoIcon";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Link href="/" className="brand" style={{ marginBottom: 0 }}>
                <span className="mark">
                  <AtlasLogoIcon className="brand-logo-mark" />
                </span>
                <span className="brand-text">
                  <span className="brand-name">
                    Atlas <em>One</em>
                  </span>
                  <span className="brand-by">by Controve</span>
                </span>
              </Link>
              <div
                style={{
                  width: "1px",
                  height: "32px",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
              />
              <p style={{ margin: 0 }}>
                Business organised.<br />
                Tax numbers simplified.
              </p>
            </div>
            <div style={{ marginTop: "18px" }}>
              <p style={{ margin: 0 }}>
                15 connected systems · One Workspace<br />
                One-time Payment · Lifetime Access
              </p>
            </div>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                marginTop: "14px",
                fontSize: "12.5px",
                margin: "14px 0 0 0",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.7 }}
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a
                  href="mailto:hello@controve.in"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  hello@controve.in
                </a>
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.7 }}
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                India
              </span>
            </p>
          </div>
          <div className="foot-cols-wrap">
            <div className="foot-col">
              <h5>Quick Links</h5>
              <div className="foot-col-links">
                <Link href="/#highlights">Product</Link>
                <Link href="/#systems">Systems</Link>
                <Link href="/pricing">Pricing</Link>
                <Link href="/pricing#faq">FAQs</Link>
                <Link href="/#personas">Who it's for</Link>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent("open-contact-modal"));
                  }}
                >
                  Contact Us
                </a>
              </div>
            </div>
            <div className="foot-col">
              <h5>Legal</h5>
              <div className="foot-col-links">
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/refund">Refund Policy</Link>
                <Link href="/terms">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <div className="foot-fine">
            © 2026 Atlas One curated with love{" "}
            <span style={{ color: "#f43f5e", display: "inline-block", margin: "0 2px" }}>♥</span> by Controve.
            <span style={{ margin: "0 12px", opacity: 0.4 }}>|</span>
            Atlas One does not file taxes or calculate final liability — it prepares the numbers you and your CA need.
          </div>
        </div>
      </div>
    </footer>
  );
}

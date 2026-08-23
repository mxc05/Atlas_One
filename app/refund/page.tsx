import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Refund Policy — Atlas One by Controve",
  description: "Refund Policy for Atlas One by Controve.",
};

export default function RefundPage() {
  return (
    <div className="legal-page" style={{ display: "flex", alignItems: "center" }}>
      <div className="legal-container" style={{ textAlign: "center", padding: "40px 24px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "var(--blue-bg)",
            color: "var(--blue-ic)",
            marginBottom: "20px",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "var(--ink)", marginBottom: "12px" }}>
          Refund Policy
        </h1>
        <p style={{ fontSize: "16px", color: "var(--muted)", maxWidth: "460px", margin: "0 auto 28px", lineHeight: 1.6 }}>
          Will be updated shortly.
        </p>
        <Link
          href="/"
          className="btn btn-outline"
          style={{ display: "inline-flex", padding: "10px 20px" }}
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

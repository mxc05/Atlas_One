"use client";

import { useState } from "react";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPaymentId?: string;
}

export function SupportModal({ isOpen, onClose, defaultPaymentId = "" }: SupportModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentId, setPaymentId] = useState(defaultPaymentId);
  const [category, setCategory] = useState("Workspace Setup & Onboarding");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, paymentId, category, message }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Failed to send support ticket. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="support-modal-backdrop" onClick={onClose}>
      <div className="support-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button type="button" className="support-modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="support-success-state">
            <div className="support-badge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2>Support Ticket Submitted</h2>
            <p>
              Thank you, <strong>{name}</strong>! We&apos;ve dispatched your query to <strong>support@controve.in</strong>. Our team will review your message and reply to <strong>{email}</strong> within 24 hours.
            </p>
            <button type="button" className="btn-modal-done" onClick={onClose}>
              Close Window
            </button>
          </div>
        ) : (
          <form className="support-form" onSubmit={handleSubmit}>
            <div className="support-modal-header">
              <div className="support-pill">
                <span className="dotping blue" /> Customer Support Desk
              </div>
              <h2>How can we help you?</h2>
              <p>Submit your issue directly to <strong>support@controve.in</strong></p>
            </div>

            {errorMsg && <div className="support-error-banner">{errorMsg}</div>}

            <div className="form-group-row">
              <div className="form-field">
                <label htmlFor="sup-name">Your Full Name *</label>
                <input
                  id="sup-name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="sup-email">Email Address *</label>
                <input
                  id="sup-email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group-row">
              <div className="form-field">
                <label htmlFor="sup-category">Support Category</label>
                <select
                  id="sup-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Workspace Setup & Onboarding">Workspace Setup & Onboarding</option>
                  <option value="Payment & Billing Question">Payment & Billing Question</option>
                  <option value="Feature / System Question">Feature / System Question</option>
                  <option value="Bug / Technical Issue">Bug / Technical Issue</option>
                  <option value="Custom Workflow Request">Custom Workflow Request</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="sup-payid">Payment Ref ID (Optional)</label>
                <input
                  id="sup-payid"
                  type="text"
                  placeholder="e.g. pay_Pxyz12345"
                  value={paymentId}
                  onChange={(e) => setPaymentId(e.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="sup-message">How can we assist you today? *</label>
              <textarea
                id="sup-message"
                rows={4}
                placeholder="Describe your question or setup request in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="support-modal-actions">
              <button type="button" className="btn-modal-cancel" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn-modal-submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Submitting Ticket..." : "Submit to support@controve.in"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi (NCT)",
  "Jammu & Kashmir",
  "Chandigarh",
  "Puducherry",
  "Other / Outside India",
];

export function DemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gstRegistered: "No",
    workType: "Solo Freelancer (1–3 yrs in)",
    city: "",
    state: "Maharashtra",
    note: "",
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("open-demo-modal", handleOpen);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-demo-modal", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSubmitted(false);
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const closeDemoModal = () => setIsOpen(false);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.city || !formData.state) return;
    setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="demo-modal-backdrop" onClick={closeDemoModal}>
      <div
        className="demo-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demoModalTitle"
      >
        <button className="demo-modal-close" onClick={closeDemoModal} aria-label="Close modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="demo-success-state">
            <div className="success-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3>Demo Request Received!</h3>
            <p>
              Thanks <strong>{formData.name}</strong>! We've received your details and will send a personalized calendar invite to <strong>{formData.email}</strong> within 24 hours.
            </p>
            <button className="btn btn-black btn-full" style={{ marginTop: "24px" }} onClick={closeDemoModal}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="demo-modal-header">
              <div className="demo-eyebrow">Interactive Walkthrough</div>
              <h2 id="demoModalTitle">Book a Live Demo</h2>
              <p className="demo-subtitle">
                See how Atlas One unifies your clients, invoices, expenses, and GST position into one quiet workspace.
              </p>

              <div className="demo-step-indicator">
                <div className={`step-item ${step === 1 ? "active" : step > 1 ? "complete" : ""}`}>
                  <span className="step-num">1</span>
                  <span className="step-label">Contact</span>
                </div>
                <div className="step-line" />
                <div className={`step-item ${step === 2 ? "active" : step > 2 ? "complete" : ""}`}>
                  <span className="step-num">2</span>
                  <span className="step-label">Setup &amp; Location</span>
                </div>
                <div className="step-line" />
                <div className={`step-item ${step === 3 ? "active" : ""}`}>
                  <span className="step-num">3</span>
                  <span className="step-label">Final Note</span>
                </div>
              </div>
            </div>

            {/* PAGE 1 */}
            {step === 1 && (
              <form onSubmit={handleNextStep1} className="demo-modal-form">
                <div className="form-group">
                  <label htmlFor="demoName">Full Name *</label>
                  <input
                    id="demoName"
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="demoEmail">Work Email *</label>
                  <input
                    id="demoEmail"
                    type="email"
                    required
                    placeholder="alex@yourstudio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="demoPhone">Phone Number *</label>
                  <input
                    id="demoPhone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-actions" style={{ marginTop: "12px" }}>
                  <button type="submit" className="btn btn-black btn-full" style={{ padding: "14px", borderRadius: "10px", fontWeight: 600 }}>
                    Continue →
                  </button>
                </div>
              </form>
            )}

            {/* PAGE 2 */}
            {step === 2 && (
              <form onSubmit={handleNextStep2} className="demo-modal-form">
                <div className="form-row 2col">
                  <div className="form-group">
                    <label htmlFor="demoGst">GST Registered?</label>
                    <select
                      id="demoGst"
                      value={formData.gstRegistered}
                      onChange={(e) => setFormData({ ...formData, gstRegistered: e.target.value })}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="demoWorkType">Your Setup</label>
                    <select
                      id="demoWorkType"
                      value={formData.workType}
                      onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                    >
                      <option value="Solo Freelancer (1–3 yrs in)">Solo Freelancer (1–3 yrs in)</option>
                      <option value="Multi-Stream Professional (5+ yrs in)">Multi-Stream Professional (5+ yrs in)</option>
                      <option value="Small Agency Owner">Small Agency / Studio Owner</option>
                    </select>
                  </div>
                </div>

                <div className="form-row 2col">
                  <div className="form-group">
                    <label htmlFor="demoCity">City *</label>
                    <input
                      id="demoCity"
                      type="text"
                      required
                      placeholder="e.g. Mumbai / Bengaluru"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="demoState">State *</label>
                    <select
                      id="demoState"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    >
                      {INDIAN_STATES.map((st, idx) => (
                        <option value={st} key={idx}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-actions multi-btn" style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    className="btn btn-outline"
                    style={{ flex: 1, padding: "14px", borderRadius: "10px" }}
                    onClick={() => setStep(1)}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-black"
                    style={{ flex: 2, padding: "14px", borderRadius: "10px", fontWeight: 600 }}
                  >
                    Continue →
                  </button>
                </div>
              </form>
            )}

            {/* PAGE 3 */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="demo-modal-form">
                <div className="form-group">
                  <label htmlFor="demoNote">Specific Questions or Preferred Time (Optional)</label>
                  <textarea
                    id="demoNote"
                    rows={4}
                    placeholder="Let us know what key features you'd like to explore..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  />
                </div>

                <div className="form-actions multi-btn" style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    className="btn btn-outline"
                    style={{ flex: 1, padding: "14px", borderRadius: "10px" }}
                    onClick={() => setStep(2)}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-black"
                    style={{ flex: 2, padding: "14px", borderRadius: "10px", fontWeight: 600 }}
                  >
                    Submit Demo Request
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

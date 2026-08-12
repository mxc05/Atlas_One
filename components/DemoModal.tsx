"use client";

import React, { useState, useEffect } from "react";
import { AnimatedButton } from "./AnimatedButton";

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
  const [direction, setDirection] = useState<"next" | "prev">("next");
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
      setDirection("next");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const closeDemoModal = () => setIsOpen(false);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setDirection("next");
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.city || !formData.state) return;
    setDirection("next");
    setStep(3);
  };

  const handlePrevStep = (targetStep: 1 | 2) => {
    setDirection("prev");
    setStep(targetStep);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDirection("next");
    setSubmitted(true);
  };

  return (
    <div className="demo-modal-backdrop" onClick={closeDemoModal}>
      <div
        className="demo-card-story-container"
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
          <div className="demo-success-state card-anim-slide-next">
            <div className="success-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="card-eyebrow">COMPLETE — ALL SET</div>
            <h3 className="card-loud-heading">DEMO REQUEST RECEIVED</h3>
            <p className="card-subtext">
              Thanks <strong>{formData.name}</strong>! We've received your details and will send a personalized calendar invite to <strong>{formData.email}</strong> within 24 hours.
            </p>
            <div style={{ marginTop: "20px" }}>
              <AnimatedButton
                text="Done"
                variant="black"
                iconDirection="check"
                onClick={closeDemoModal}
                className="w-full"
              />
            </div>
          </div>
        ) : (
          <div className="card-story-inner">
            {/* Step Progress Bar */}
            <div className="card-step-header">
              <div className="demo-step-indicator">
                <div className={`step-item ${step === 1 ? "active" : step > 1 ? "complete" : ""}`}>
                  <span className="step-num">01</span>
                  <span className="step-label">Contact</span>
                </div>
                <div className="step-line" />
                <div className={`step-item ${step === 2 ? "active" : step > 2 ? "complete" : ""}`}>
                  <span className="step-num">02</span>
                  <span className="step-label">Setup</span>
                </div>
                <div className="step-line" />
                <div className={`step-item ${step === 3 ? "active" : ""}`}>
                  <span className="step-num">03</span>
                  <span className="step-label">Notes</span>
                </div>
              </div>
            </div>

            {/* PAGE 1: CONTACT INFO */}
            {step === 1 && (
              <div className={`card-story-step card-anim-slide-${direction}`} key={`step1-${direction}`}>
                <span className="card-watermark-num" aria-hidden="true">
                  01
                </span>
                <div className="card-eyebrow">01 — CONTACT DETAILS</div>
                <h2 id="demoModalTitle" className="card-loud-heading">
                  TELL US WHO YOU ARE
                </h2>
                <p className="card-subtext">
                  Enter your contact details so we can schedule your live walkthrough.
                </p>

                <form onSubmit={handleNextStep1} className="demo-modal-form">
                  <div className="form-group">
                    <label htmlFor="demoName">FULL NAME *</label>
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
                    <label htmlFor="demoEmail">WORK EMAIL *</label>
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
                    <label htmlFor="demoPhone">PHONE NUMBER *</label>
                    <input
                      id="demoPhone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-actions" style={{ marginTop: "16px" }}>
                    <AnimatedButton
                      text="Continue"
                      variant="black"
                      iconDirection="up-right"
                      type="submit"
                      className="w-full"
                    />
                  </div>
                </form>
              </div>
            )}

            {/* PAGE 2: SETUP & LOCATION */}
            {step === 2 && (
              <div className={`card-story-step card-anim-slide-${direction}`} key={`step2-${direction}`}>
                <span className="card-watermark-num" aria-hidden="true">
                  02
                </span>
                <div className="card-eyebrow">02 — SETUP &amp; LOCATION</div>
                <h2 id="demoModalTitle" className="card-loud-heading">
                  WHERE &amp; HOW YOU WORK
                </h2>
                <p className="card-subtext">
                  Tell us a bit about your setup so we can tailor the demo to your tax workflow.
                </p>

                <form onSubmit={handleNextStep2} className="demo-modal-form">
                  <div className="form-row 2col">
                    <div className="form-group">
                      <label htmlFor="demoGst">GST REGISTERED?</label>
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
                      <label htmlFor="demoWorkType">YOUR SETUP</label>
                      <select
                        id="demoWorkType"
                        value={formData.workType}
                        onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                      >
                        <option value="Solo Freelancer (1–3 yrs in)">Solo Freelancer (1–3 yrs in)</option>
                        <option value="Multi-Stream Professional (5+ yrs in)">
                          Multi-Stream Pro (5+ yrs in)
                        </option>
                        <option value="Small Agency Owner">Small Agency / Studio Owner</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row 2col">
                    <div className="form-group">
                      <label htmlFor="demoCity">CITY *</label>
                      <input
                        id="demoCity"
                        type="text"
                        required
                        placeholder="e.g. Mumbai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="demoState">STATE *</label>
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

                  <div
                    className="form-actions multi-btn"
                    style={{ marginTop: "14px", display: "flex", gap: "10px" }}
                  >
                    <div style={{ flex: 1 }}>
                      <AnimatedButton
                        text="Back"
                        variant="outline"
                        iconDirection="left"
                        type="button"
                        onClick={() => handlePrevStep(1)}
                        className="w-full"
                      />
                    </div>
                    <div style={{ flex: 2 }}>
                      <AnimatedButton
                        text="Continue"
                        variant="black"
                        iconDirection="up-right"
                        type="submit"
                        className="w-full"
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* PAGE 3: PREFERENCES & NOTES */}
            {step === 3 && (
              <div className={`card-story-step card-anim-slide-${direction}`} key={`step3-${direction}`}>
                <span className="card-watermark-num" aria-hidden="true">
                  03
                </span>
                <div className="card-eyebrow">03 — YOUR PREFERENCES</div>
                <h2 id="demoModalTitle" className="card-loud-heading">
                  WHAT CAN WE SHOW YOU?
                </h2>
                <p className="card-subtext">
                  Share any specific questions or preferred calendar slots for your demo.
                </p>

                <form onSubmit={handleSubmit} className="demo-modal-form">
                  <div className="form-group">
                    <label htmlFor="demoNote">SPECIFIC QUESTIONS OR PREFERRED TIME (OPTIONAL)</label>
                    <textarea
                      id="demoNote"
                      rows={3}
                      placeholder="Let us know what key features you'd like to explore..."
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    />
                  </div>

                  <div
                    className="form-actions multi-btn"
                    style={{ marginTop: "16px", display: "flex", gap: "10px" }}
                  >
                    <div style={{ flex: 1 }}>
                      <AnimatedButton
                        text="Back"
                        variant="outline"
                        iconDirection="left"
                        type="button"
                        onClick={() => handlePrevStep(2)}
                        className="w-full"
                      />
                    </div>
                    <div style={{ flex: 2 }}>
                      <AnimatedButton
                        text="Submit Demo Request"
                        variant="black"
                        iconDirection="check"
                        type="submit"
                        className="w-full"
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

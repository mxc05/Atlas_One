"use client";

import React, { useState, useEffect } from "react";
import { AnimatedButton } from "./AnimatedButton";

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("open-contact-modal", handleOpen);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-contact-modal", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const closeContactModal = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Contact submission error:", err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="demo-modal-backdrop"
      onClick={closeContactModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contactModalTitle"
    >
      <div className="demo-card-story-container" onClick={(e) => e.stopPropagation()}>
        <button
          className="demo-modal-close"
          onClick={closeContactModal}
          aria-label="Close modal"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="card-story-step text-center py-4">
            <div
              className="card-eyebrow"
              style={{ color: "#3d8a52", justifyContent: "center", display: "flex" }}
            >
              MESSAGE RECEIVED
            </div>
            <h2 id="contactModalTitle" className="card-loud-heading" style={{ marginTop: "12px", textAlign: "center" }}>
              THANK YOU, {formData.name.toUpperCase().split(" ")[0]}!
            </h2>
            <p className="card-subtext" style={{ maxWidth: "380px", margin: "12px auto 24px auto", textAlign: "center" }}>
              We've received your message. Our team will review your inquiry and reach out to{" "}
              <strong>{formData.email}</strong> shortly.
            </p>
            <div style={{ maxWidth: "200px", margin: "0 auto" }}>
              <AnimatedButton
                text="Close Window"
                variant="black"
                onClick={closeContactModal}
                className="w-full"
              />
            </div>
          </div>
        ) : (
          <div className="card-story-step">
            <div className="card-eyebrow">GET IN TOUCH</div>
            <h2 id="contactModalTitle" className="card-loud-heading">
              CONTACT US
            </h2>
            <p className="card-subtext">
              Have a question about Atlas One or custom business setups? Send us a message below.
            </p>

            <form onSubmit={handleSubmit} className="demo-modal-form">
              <div className="form-group">
                <label htmlFor="contactName">FULL NAME *</label>
                <input
                  type="text"
                  id="contactName"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactEmail">WORK EMAIL *</label>
                <input
                  type="email"
                  id="contactEmail"
                  required
                  placeholder="rahul@studio.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactPhone">PHONE / WHATSAPP (OPTIONAL)</label>
                <input
                  type="tel"
                  id="contactPhone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactMessage">HOW CAN WE HELP YOU? *</label>
                <textarea
                  id="contactMessage"
                  required
                  rows={3}
                  placeholder="Tell us about your query or business requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="form-actions" style={{ marginTop: "16px" }}>
                <AnimatedButton
                  text={isSubmitting ? "Sending..." : "Send Message"}
                  variant="black"
                  iconDirection="check"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("razorpay_payment_id") || searchParams.get("payment_id");

  return (
    <div className="success-page-wrap">
      <div className="wrap success-inner">
        {/* Animated Checkmark Badge */}
        <div className="success-badge-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div className="eyebrow-pill success-pill">
          <span className="dotping green" /> Payment Completed
        </div>

        <h1 className="page-title success-title">
          Thank you for choosing <span className="accent">Atlas One</span>.
        </h1>

        <p className="lede success-lede">
          Your payment has been successfully processed. Welcome to a calmer, fully connected business workspace.
        </p>

        {/* Razorpay Reference Badge (Shown whenever present in URL) */}
        {paymentId ? (
          <div className="payment-ref-banner">
            <span className="ref-label">Payment Reference:</span>
            <code className="ref-code">{paymentId}</code>
          </div>
        ) : (
          <div className="payment-ref-banner placeholder-ref">
            <span className="ref-label">Order Status:</span>
            <code className="ref-code green-text">CONFIRMED</code>
          </div>
        )}

        {/* What Happens Next Card */}
        <div className="success-card">
          <h2 className="success-card-heading">What happens next?</h2>
          
          <div className="steps-timeline">
            {/* Step 1 */}
            <div className="timeline-step">
              <div className="step-num">1</div>
              <div className="step-content">
                <h3>Order Confirmed</h3>
                <p>Your payment has been verified and your purchase of Atlas One (Lifetime Access) is confirmed.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="timeline-step">
              <div className="step-num highlight">2</div>
              <div className="step-content">
                <h3>Onboarding Email (Within 24 Hours)</h3>
                <p>
                  You will receive a personalized onboarding email <strong>within 24 hours</strong> containing your workspace link and detailed setup instructions.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="timeline-step">
              <div className="step-num">3</div>
              <div className="step-content">
                <h3>Guided Workspace Setup</h3>
                <p>
                  Follow the step-by-step instructions in your email to set up Atlas One into your account and complete setup in under 5 minutes.
                </p>
              </div>
            </div>
          </div>

          <div className="success-support-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span>
              Have questions or need help sooner? Contact us anytime at{" "}
              <a href="mailto:hello@controve.com" className="support-email-link">
                hello@controve.com
              </a>.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="success-actions">
          <Link href="/" className="btn-success-home">
            Return to Homepage
          </Link>
          <a
            href="mailto:hello@controve.com"
            className="btn-success-support"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="success-page-wrap">
        <div className="wrap success-inner">
          <div className="success-badge-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="page-title success-title">Loading payment details...</h1>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

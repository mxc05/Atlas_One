import React from "react";

export const metadata = {
  title: "Terms & Conditions — Atlas One by Controve",
  description: "Terms and Conditions for Atlas One by Controve.",
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Terms &amp; Conditions</h1>
          <div className="legal-meta">Last updated: August 2026</div>
        </div>

        <div className="legal-content">
          <p>
            These Terms &amp; Conditions (<strong>&quot;Terms&quot;</strong>) govern access to and use of Atlas One (<strong>&quot;Service,&quot;</strong> <strong>&quot;we,&quot;</strong> <strong>&quot;us,&quot;</strong> <strong>&quot;our&quot;</strong>), a product of Controve (<strong>&quot;Company&quot;</strong>), including the website, template/system, and any related services (collectively, the <strong>&quot;Platform&quot;</strong>). By purchasing, duplicating, or using Atlas One, you (<strong>&quot;you,&quot;</strong> <strong>&quot;User&quot;</strong>) agree to be bound by these Terms. If you do not agree, do not use the Platform.
          </p>

          <h2>1. What Atlas One Is — and Is Not</h2>
          <p>
            Atlas One is a pre-built business organization system for freelancers, consultants, and solo-run agencies in India, delivered as a template/system that you duplicate into <strong>your own account</strong> (your own Notion workspace, or your own instance of the Atlas One app). Once duplicated, Atlas One runs entirely within your account — <strong>your business data is never hosted, stored, or processed on Controve&apos;s own infrastructure.</strong>
          </p>

          <div className="legal-highlight-box">
            <strong>Atlas One explicitly does not:</strong>
            <ul style={{ margin: "8px 0 0 18px" }}>
              <li>Store any of your client, invoice, expense, or financial data on our servers.</li>
              <li>File any tax return, GST return, or other statutory filing on your behalf.</li>
              <li>Submit anything to any government portal.</li>
              <li>Calculate your final tax liability or determine which tax scheme you should legally use.</li>
              <li>Provide legal, tax, or accounting advice.</li>
              <li>Guarantee the accuracy of any GST threshold estimate or calculation.</li>
            </ul>
          </div>

          <p>
            Atlas One is a structure and set of formulas to help you organize numbers so you and your chartered accountant can make informed decisions. <strong>You are solely responsible for verifying all figures and for your actual tax and regulatory compliance.</strong> Nothing on the Platform constitutes professional tax, legal, or financial advice.
          </p>

          <h2>2. Eligibility and Accounts</h2>
          <p>
            You must be at least 18 years old and legally capable of entering a binding contract under the Indian Contract Act, 1872. &quot;Your account&quot; refers to the account on the underlying platform (e.g., your own Notion account) into which you duplicate Atlas One.
          </p>

          <h2>3. License to the Template/System</h2>
          <p>
            Purchasing Atlas One grants you a limited, non-exclusive, non-transferable license to duplicate and use the template/system for your own business purposes. You may not:
          </p>
          <ul>
            <li>Resell, sublicense, or redistribute the template or any substantial part of its structure, formulas, or design.</li>
            <li>Share your duplicated copy&apos;s edit access with anyone outside your own business/team for the purpose of circumventing a purchase.</li>
            <li>Use the template to build a competing product.</li>
          </ul>
          <p>
            We retain all intellectual property rights in the underlying template design, formulas, and system architecture. You own the data you enter into your own duplicated copy.
          </p>

          <h2>4. Your Data and Your Responsibility for Accuracy</h2>
          <p>
            All data you enter into your duplicated copy of Atlas One — client records, invoices, expenses, GST figures, and similar — belongs to you and lives in your own account. You are solely responsible for:
          </p>
          <ul>
            <li>The accuracy and completeness of everything you enter.</li>
            <li>The security and access permissions of your own account.</li>
            <li>Any consequence of acting on a number the template calculated from inaccurate or incomplete data you supplied.</li>
            <li>Backing up your own data — since it lives on the underlying platform rather than with us, its availability and durability are governed by that platform&apos;s own terms.</li>
          </ul>

          <h2>5. Fees and Purchase</h2>
          <p>
            Atlas One is offered as a one-time purchase granting lifetime access to the template workspace. Atlas One runs on Notion&apos;s free tier as of today — continued free access depends on Notion&apos;s own policies remaining as they are, which is beyond our purview.
          </p>

          <h2>6. Reliance on a Third-Party Platform</h2>
          <p>
            Atlas One is built to run on Notion. We do not control, and are not responsible for, that platform&apos;s uptime, security practices, pricing, feature changes, or terms of service — those govern your data directly.
          </p>

          <h2>7. Acceptable Use</h2>
          <p>You agree not to use the Platform for any unlawful purpose, including tax evasion or fraudulent filings.</p>

          <h2>8. Disclaimers</h2>
          <p>
            THE PLATFORM IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING FITNESS FOR A PARTICULAR PURPOSE AND ACCURACY OF ANY CALCULATION, FLAG, OR ESTIMATE THE PLATFORM PRODUCES.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the extent permitted by law, Controve&apos;s total aggregate liability arising out of or related to your use of Atlas One shall be limited to the amount paid by you for the license.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms are governed by the laws of India. Courts in India shall have exclusive jurisdiction regarding any dispute arising under these Terms.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions about these Terms, please contact us at:{" "}
            <a href="mailto:hello@controve.com" style={{ color: "var(--blue)", textDecoration: "underline" }}>
              hello@controve.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

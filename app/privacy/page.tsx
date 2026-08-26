import React from "react";

export const metadata = {
  title: "Privacy Policy — Atlas One by Controve",
  description: "Privacy Policy for Atlas One by Controve.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Privacy Policy</h1>
          <div className="legal-meta">Last updated: August 2026</div>
        </div>

        <div className="legal-content">
          <p>
            This Privacy Policy explains how Controve (<strong>&quot;we,&quot;</strong> <strong>&quot;us,&quot;</strong> <strong>&quot;our&quot;</strong>)
            handles information in connection with Atlas One (the <strong>&quot;Platform&quot;</strong>). It&apos;s written to comply with the Digital Personal Data Protection Act, 2023 (DPDP Act) and applicable Indian data protection law.
          </p>

          <h2>Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>

          <div className="legal-highlight-box">
            <strong>The most important thing to know:</strong> Atlas One is delivered as a template/system that you duplicate into your own account. Once duplicated, <strong>we do not have access to, and do not store, the client records, invoices, expenses, GST figures, or any other business data you enter into your copy.</strong> That data lives on the platform your account is on (e.g., Notion) and is governed by that platform&apos;s own privacy practices, which we encourage you to review separately.
          </div>

          <h2>1. Information We Collect</h2>
          <p>We collect only what&apos;s needed to sell you the template, support you, and run our own marketing site:</p>
          <ul>
            <li>
              <strong>Purchase and account information:</strong> name, email address, and payment details processed via secure payment gateways at checkout. We do not store full card details ourselves; our payment processor handles that under its own PCI-compliant systems.
            </li>
            <li>
              <strong>Support communications:</strong> anything you send us via email or a support form, if you contact us with a question or issue.
            </li>
            <li>
              <strong>Website usage data:</strong> standard analytics on our marketing site (pages viewed, referral source, device/browser type).
            </li>
            <li>
              <strong>What we explicitly do not collect:</strong> the contents of your duplicated Atlas One workspace — your clients, invoices, receipts, expenses, GST figures, documents, or any other business data. We have no technical access to it once you&apos;ve duplicated the template into your own account, because it never passes through our servers.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To process your purchase and deliver access to the template</li>
            <li>To send you important service communications (e.g., a template update, a change to these policies)</li>
            <li>With your consent, to send product updates or marketing communications — you can opt out at any time</li>
            <li>To understand aggregate usage of our marketing website, to improve it</li>
          </ul>

          <h2>3. Legal Basis for Processing</h2>
          <p>
            We process your name, email, and purchase information on the basis of contractual necessity (to deliver what you purchased) and, for any marketing communications, your explicit consent, which you can withdraw at any time.
          </p>

          <h2>4. Data Sharing</h2>
          <p>We do not sell your data. We share the limited data we hold only with:</p>
          <ul>
            <li><strong>Our payment processor</strong>, to complete your purchase</li>
            <li><strong>Service providers</strong> who help us run our own website/support systems (e.g., email delivery, hosting for our marketing site)</li>
            <li><strong>Law enforcement or regulators</strong>, only where legally required</li>
          </ul>
          <p>
            We have no involvement in, and no visibility into, any sharing you choose to do within your own duplicated workspace — for example, if you invite your team member, your chartered accountant or your client into your own Notion account. That sharing is entirely between you and the people you invite, using that platform&apos;s own sharing controls, and is your responsibility, not ours.
          </p>

          <h2>5. Your Business Data — Where It Actually Lives</h2>
          <p>
            Because we don&apos;t store it, most of the questions people ask a financial-tool provider about their business data have a different answer for Atlas One than they would for a typical SaaS product:
          </p>
          <ul>
            <li>
              <strong>Security of your financial data:</strong> governed by the security practices of the platform your account is on (e.g., Notion&apos;s own security and compliance posture), not by us. Review that platform&apos;s own security documentation.
            </li>
            <li>
              <strong>Backups:</strong> governed by that platform, not by us. We recommend you understand its backup/export options independently.
            </li>
            <li>
              <strong>Deleting your data:</strong> since it&apos;s in your own account, you control deletion directly — there&apos;s nothing for us to delete on our end beyond your purchase/account records.
            </li>
            <li>
              <strong>A breach of your business data:</strong> would be a breach of the underlying platform, not of Controve&apos;s systems, since we never held that data.
            </li>
          </ul>

          <h2>6. Data Retention</h2>
          <p>
            We retain your purchase and account information for as long as needed to provide support and comply with legal/tax record-keeping obligations for our own business, and delete or anonymize it thereafter.
          </p>

          <h2>7. Your Rights</h2>
          <p>
            For the limited data we do hold (your name, email, purchase history, support communications), you have the right under the DPDP Act to:
          </p>
          <ul>
            <li>Access the data we hold about you</li>
            <li>Correct inaccurate data</li>
            <li>Request erasure (subject to our own legal retention requirements, e.g., invoicing records)</li>
            <li>Withdraw consent to marketing communications</li>
            <li>File a complaint with our Grievance Officer, and subsequently with the Data Protection Board of India if unresolved</li>
          </ul>
          <p>
            For your business data inside your own duplicated workspace, exercise these rights directly with that platform, since we hold no copy of it.
          </p>

          <h2>8. Grievance Officer & Contact</h2>
          <p>
            To exercise these rights regarding data we do hold or for questions about this Policy, contact us at:{" "}
            <a href="mailto:support@controve.in" style={{ color: "var(--blue)", textDecoration: "underline" }}>
              support@controve.in
            </a>
          </p>

          <h2>9. Cookies and Tracking</h2>
          <p>
            Our marketing website uses standard functional cookies for session management and basic analytics. This does not extend to your duplicated workspace.
          </p>

          <h2>10. Children&apos;s Privacy</h2>
          <p>The Platform is not directed at individuals under 18. We do not knowingly collect data from minors.</p>

          <h2>11. Changes to This Policy</h2>
          <p>We may update this Policy periodically. Material changes will be communicated via email or site notice.</p>
        </div>
      </div>
    </div>
  );
}

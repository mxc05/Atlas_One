# 📧 Atlas One — Email Infrastructure & Cold Outreach Strategy Guide

This guide documents the complete email routing architecture, Google Workspace SMTP integration options, database requirements, and cold email deliverability strategies for **Atlas One by Controve**.

---

## 📑 Table of Contents
1. [Email Routing Matrix (`controve.in`)](#1-email-routing-matrix-controvein)
2. [Current API Provisioning](#2-current-api-provisioning)
3. [Google Workspace SMTP Integration Strategy](#3-google-workspace-smtp-integration-strategy)
4. [Database & Financial Requirements](#4-database--financial-requirements)
5. [Cold Outreach & Domain Deliverability Protection](#5-cold-outreach--domain-deliverability-protection)
6. [Actionable Next Steps](#6-actionable-next-steps)

---

## 1. Email Routing Matrix (`controve.in`)

Atlas One enforces operational separation between general sales inquiries and customer support:

| Email Address | Primary Role | Triggering Features / Endpoints |
| :--- | :--- | :--- |
| **`hello@controve.in`** | **Pre-Sales & Demos** | • Demo Booking Form (`/api/demo`)<br>• Contact Us Form (`/api/contact`)<br>• Custom Enterprise Builds (`lib/content.ts`)<br>• Footer Main Business Contact |
| **`support@controve.in`** | **Post-Purchase & Support** | • Support Ticket Form & Modal (`/api/support`)<br>• Post-Payment Success Page (`/success`)<br>• Bug Reporting & Technical Help (`lib/content.ts`)<br>• Legal & Privacy Grievances (`/privacy`, `/terms`) |

---

## 2. Current API Provisioning

The Next.js backend API routes (`app/api/demo`, `app/api/contact`, `app/api/support`) are provisioned using environment variables with built-in fallbacks.

### `.env.local` Configuration:
```env
# Sales & Demo Lead Recipient
BUSINESS_EMAIL=hello@controve.in

# Support Ticket Recipient
SUPPORT_EMAIL=support@controve.in

# Resend API Key (Optional Fallback)
RESEND_API_KEY=your_resend_api_key_here
```

### API Flow Summary:
* **`/api/demo`**: Dispatches incoming demo bookings to `hello@controve.in` and sends auto-confirmations to prospective leads.
* **`/api/contact`**: Dispatches standard contact form entries to `hello@controve.in`.
* **`/api/support`**: Dispatches customer support tickets (including Razorpay Payment IDs and category tags) to `support@controve.in` and sends ticket receipts to users.

---

## 3. Google Workspace SMTP Integration Strategy

Instead of using third-party email APIs like Resend, Atlas One can route all form emails directly through your paid **Google Workspace account**.

### Why Use Google Workspace SMTP?
> [!TIP]
> * **100% Genuine Sender Identity**: Emails originate natively from `@controve.in`.
> * **Automatic Sent History**: Every email sent by your website automatically appears inside your Gmail **Sent** folder.
> * **Native Reply Threading**: Customer replies thread directly into your normal Gmail inbox.
> * **Zero Extra Cost**: Included in your paid Google Workspace subscription.

### How to Configure Google Workspace SMTP (Nodemailer):
1. **Enable 2-Step Verification** on `hello@controve.in` and `support@controve.in` in Google Account settings.
2. **Generate a 16-Character App Password** (Google Account Security → App Passwords).
3. **Backend Setup**: Use `nodemailer` in Next.js:
   * **Host**: `smtp.gmail.com`
   * **Port**: `465` (SSL) or `587` (TLS)
   * **Auth**: User (`hello@controve.in`) & 16-character App Password.

---

## 4. Database & Financial Requirements

### 1. Database Requirement: **NONE**
* **Stateless Execution**: Next.js API endpoints receive form payloads in memory and immediately dispatch them via SMTP.
* **No DB Overhead**: You do **not** need PostgreSQL, Supabase, MongoDB, or Redis.
* **Storage**: Google Workspace automatically acts as your searchable history archive.

### 2. Financial Charges: **FREE ($0 extra)**
* **No Extra Google Charges**: SMTP sending (`smtp.gmail.com`) is **100% included** in your paid Google Workspace plan.
* **Capacity**: Google Workspace allows up to **2,000 emails per day**, which is more than sufficient for website inquiries and support tickets.

---

## 5. Cold Outreach & Domain Deliverability Protection

### ⚠️ The Risk of Cold Emailing from `controve.in`
If you send cold emails directly from `hello@controve.in` or `support@controve.in`:
* Recipients marking cold emails as **Spam** lowers your root domain (`controve.in`) reputation.
* **Consequence**: Website demo responses and support emails will start landing in your customers' **Spam/Junk folders**.
* **Subdomains (`mail.controve.in`)**: Subdomains do **not** fully shield your root domain because major spam filters (Gmail/Outlook) aggregate reputation at the root domain level.

### 🛡️ Recommended Cold Email Architecture:

```mermaid
graph TD
    A[Brand Ecosystem] --> B[Primary Domain: controve.in]
    A --> C[Outreach Domain: getcontrove.in / trycontrove.com]
    
    B --> B1[hello@controve.in - Inbound Leads]
    B --> B2[support@controve.in - Support Tickets]
    B --> B3[Website Transactional Emails]
    
    C --> C1[Cold Email Sequences]
    C --> C2[Outreach Platforms: Instantly.ai / Smartlead.ai]
    C --> C3[301 Web Redirect to controve.in]
```

#### Best Practices for Cold Emailing:
1. **Purchase a Secondary Domain**: e.g., `getcontrove.in` or `trycontrove.com` (~$5–$10/year).
2. **Set Web Redirect**: Point `getcontrove.in` to automatically redirect visitors to `controve.in`.
3. **Google Workspace Seats**: Add a secondary domain or extra seat inside your Google Workspace admin console (no new business plan required).
4. **Use Cold Email Tools**: Use specialized platforms like **Instantly.ai** or **Smartlead.ai** for warmup, list cleaning, and inbox rotation.

---

## 6. Actionable Next Steps

- [ ] **Decide on Email Dispatcher**: Keep Resend or switch Next.js API endpoints to Nodemailer + Google Workspace SMTP.
- [ ] **Set Up Secondary Domain**: Acquire `getcontrove.in` or similar for cold outreach campaigns.
- [ ] **Verify `controve.in` DNS**: Ensure SPF and DKIM records are active in your DNS manager.

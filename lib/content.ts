export type SystemRegion = {
  id: string;
  kicker: string;
  num: string;
  title: string;
  details: string;
  theme: 'ink' | 'paper' | 'signal' | 'coral';
  type: 'numeral' | 'steps' | 'stats' | 'compare' | 'statement' | 'brief' | 'orbital';
  steps?: string[];
  statVal?: string;
  statLabel?: string;
  deemed?: string;
  actual?: string;
  statement?: string;
  status?: string;
};

export type Persona = {
  initials: string;
  who: string;
  title: string;
  body: string;
  quote?: string;
  bg: string;
};

export type PricingPlan = {
  name: string;
  priceMonthly: string;
  priceAnnual: string;
  subMonthly: string;
  subAnnual: string;
  desc: string;
  btnText: string;
  btnLink: string;
  featured?: boolean;
  badge?: string;
  isOneTime?: boolean;
  features: { text: string; included: boolean }[];
};

export type FAQItem = {
  q: string;
  a: string;
};

export const heroMockupInvoices = [
  { client: "Third Wave Studio", amount: "₹86,400", status: "Paid", type: "paid" },
  { client: "Northline Analytics", amount: "₹1,42,000", status: "Due in 3 days", type: "due" },
  { client: "Ferrow & Co.", amount: "₹54,000", status: "Overdue", type: "over" },
  { client: "Pallet Devices", amount: "₹2,10,000", status: "Paid", type: "paid" },
];

export const systemRegions: SystemRegion[] = [
  {
    id: 'sys-01',
    theme: 'ink',
    kicker: 'FOUNDATION · 01',
    num: '01',
    title: 'Profile',
    details: "Your business's core facts — GST status, home state, entity type — set once, used everywhere.",
    type: 'numeral',
  },
  {
    id: 'sys-02',
    theme: 'paper',
    kicker: 'CLASSIFY · 02',
    num: '02',
    title: 'Work Type',
    details: 'Pick what kind of work you do, and we map it to the right presumptive tax rate automatically. No tax code lookups.',
    type: 'steps',
    steps: ['01 Select work category', '02 Auto-map 44ADA / 44AD', '03 Tax rate set once'],
  },
  {
    id: 'sys-03',
    theme: 'signal',
    kicker: 'TREASURY · 03',
    num: '03',
    title: 'Accounts',
    details: 'Every place your money actually sits — bank, cash, wallets — tracked in one view.',
    type: 'stats',
    statVal: '₹18.4L',
    statLabel: 'Across all active accounts',
  },
  {
    id: 'sys-04',
    theme: 'coral',
    kicker: 'CLIENTS · 04',
    num: '04',
    title: 'CRM',
    details: 'Every client, their full billing history, and their TDS trail — auto-calculated, always current.',
    type: 'numeral',
  },
  {
    id: 'sys-05',
    theme: 'paper',
    kicker: 'LIFECYCLE · 05',
    num: '05',
    title: 'Project',
    details: 'Track projects life cycle independent of billing, with its own status and alerts.',
    type: 'brief',
    status: '4 ACTIVE PROJECTS · ON TRACK',
  },
  {
    id: 'sys-06',
    theme: 'ink',
    kicker: 'BILLING · 06',
    num: '06',
    title: 'Invoice Manager',
    details: "What you've billed, what you received. GST logic, due dates, and everything downstream, handled the moment you raise it.",
    type: 'steps',
    steps: ['01 Create & send invoice', '02 Auto GST & TDS logic', '03 Flow downstream instantly'],
  },
  {
    id: 'sys-07',
    theme: 'signal',
    kicker: 'CASH FLOW · 07',
    num: '07',
    title: 'Payment Receivable',
    details: "What you've actually been paid. This is where your real income gets counted.",
    type: 'stats',
    statVal: '₹4.38L',
    statLabel: 'Realized cash this month',
  },
  {
    id: 'sys-08',
    theme: 'paper',
    kicker: 'ADJUSTMENT · 08',
    num: '08',
    title: 'Credit Note',
    details: "Adjusting an invoice? Whether it's a discount or a bad debt, we apply the right tax treatment automatically.",
    type: 'numeral',
  },
  {
    id: 'sys-09',
    theme: 'coral',
    kicker: 'EXPENSES · 09',
    num: '09',
    title: 'Bills Payable',
    details: "Log your expenses, business deductible and we flag the ones GST won't let you claim — before they cost you at filing time.",
    type: 'steps',
    steps: ['01 Log business expense', '02 Check ITC eligibility', '03 Flag non-claimable items'],
  },
  {
    id: 'sys-10',
    theme: 'ink',
    kicker: 'COMPLIANCE · 10',
    num: '10',
    title: 'GST Ledger',
    details: "What you owe, what you've claimed, what's paid — your monthly GST position, always current.",
    type: 'brief',
    status: 'GSTR-3B READY · BALANCED',
  },
  {
    id: 'sys-11',
    theme: 'signal',
    kicker: 'REALIZATION · 11',
    num: '11',
    title: 'Cash Income Statement',
    details: "Your income, counted only when it's actually in hand — a true picture of what you've earned, not what you're owed.",
    type: 'statement',
    statement: '"Counted only when in hand — a true picture of what you earned."',
  },
  {
    id: 'sys-12',
    theme: 'coral',
    kicker: 'TAX COMPARISON · 12',
    num: '12',
    title: 'PL Statement',
    details: 'Your monthly profit and loss, calculated both ways — actual and presumptive — so you always know where you stand.',
    type: 'compare',
    deemed: '₹8.2L',
    actual: '₹9.6L',
  },
  {
    id: 'sys-13',
    theme: 'paper',
    kicker: 'CONSOLIDATED · 13',
    num: '13',
    title: 'Financial Year Summary',
    details: "Twelve months, consolidated into one page — the info you'll actually need at year end to hand to your tax consultant.",
    type: 'statement',
    statement: '"Twelve months consolidated — CA ready in one click."',
  },
  {
    id: 'sys-14',
    theme: 'ink',
    kicker: 'QUARTERLY · 14',
    num: '14',
    title: 'Advance Tax Tracker',
    details: "Your quarterly advance tax, re-estimated as the year unfolds, so you're never guessing what to pay.",
    type: 'orbital',
  },
  {
    id: 'sys-15',
    theme: 'signal',
    kicker: 'STORAGE · 15',
    num: '15',
    title: 'Document Vault',
    details: "Your business documents — filed against the right client, exactly where you'll need them at tax time.",
    type: 'numeral',
  },
];

export const personas: Persona[] = [
  {
    initials: 'GF',
    who: 'Growing solo freelancer',
    title: '1–3 years in',
    body: 'Get your business organised right from the start — keep clients, invoices, expenses and income organised as you grow. So your finances and tax compliances don’t become a mess later.',
    quote: '"How do I keep track of everything before it gets complicated?"',
    bg: 'var(--blue-ic)',
  },
  {
    initials: 'MS',
    who: 'Multi-stream professional',
    title: '5+ years in',
    body: 'Your freelance business has grown into multiple streams of income. Your business structure and finances should keep up. Manage multiple clients, income streams, invoices and expenses in one organised system. Know where your money is coming from, where it’s going, and what you need for tax time and your business growth.',
    quote: '"With income coming from multiple places, how do I know my numbers are right when tax time comes around?"',
    bg: 'var(--purple-ic)',
  },
  {
    initials: 'TC',
    who: 'The Tax Consultant',
    title: 'Secondary user',
    body: 'Not a daily user — a periodic one. Needs a clean, exportable yearly view, readable at a glance without learning anyone\'s system.',
    bg: 'var(--green-ic)',
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Atlas One',
    priceMonthly: '₹4,999',
    priceAnnual: '₹4,999',
    subMonthly: 'one-time payment — lifetime access',
    subAnnual: 'one-time payment — lifetime access',
    desc: 'For freelancers & solo agencies who want their complete business financials & GST in one quiet workspace.',
    btnText: 'Get Started',
    btnLink: process.env.NEXT_PUBLIC_RAZORPAY_URL || '/#cta',
    featured: true,
    badge: 'Lifetime Access',
    isOneTime: true,
    features: [
      { text: 'CRM with client history', included: true },
      { text: 'Project tracker with delivery tracking', included: true },
      { text: 'Unlimited clients & invoices', included: true },
      { text: 'Cash-basis income tracking — billed vs. received', included: true },
      { text: 'GST threshold tracking with early warnings', included: true },
      { text: 'Full GST Ledger & PL Statement', included: true },
      { text: 'Presumptive vs. Actual comparison', included: true },
      { text: 'Document Vault & Overdue Alerts', included: true },
      { text: 'Advance Tax Tracker', included: true },
      { text: '15 Connected Systems — One entry updates everything downstream', included: true },
      { text: 'Financial Year Summary', included: true },
      { text: 'Lifetime Access — No Subscriptions', included: true },
    ],
  },
];

export const comparisonTable = [
  { feature: 'Clients', free: '2', pro: 'Unlimited', studio: 'Unlimited' },
  { feature: 'Invoices & receipts', free: '5 / month', pro: 'Unlimited', studio: 'Unlimited' },
  { feature: 'GST threshold alerts', free: true, pro: true, studio: true },
  { feature: 'Full GST Ledger', free: false, pro: true, studio: true },
  { feature: 'Presumptive vs. Actual comparison', free: false, pro: true, studio: true },
  { feature: 'Document Vault', free: false, pro: true, studio: true },
  { feature: 'Advance Tax Tracker', free: false, pro: true, studio: true },
  { feature: 'Lifetime Access', free: false, pro: true, studio: true },
  { feature: 'Businesses / entities', free: '1', pro: '1', studio: 'Up to 3' },
  { feature: 'Support', free: 'Community', pro: 'Priority email', studio: 'Priority chat' },
];

export const faqItems: FAQItem[] = [
  // General
  {
    q: 'What is Atlas One?',
    a: 'Atlas One is a business organization system built specifically for Indian freelancers, consultants, and solo-run agencies. It connects your clients, projects, invoices, payments, expenses, and GST/tax position in one place, so entering one real event — an invoice raised, a payment received — updates everything downstream that depends on it, instead of you re-entering the same number in four different places.',
  },
  {
    q: 'Who is this actually for?',
    a: 'Independent professionals like content creators, social media managers, graphic designers, video editors, developers, consultants, marketers who invoice clients directly. If you\'re currently tracking clients in one tool, projects in another, invoices in yet another tool, payments in your bank app, and expenses in a folder of email receipts, this is built for exactly that gap.',
  },
  {
    q: 'Is Atlas One an accounting software, like Zoho Books or QuickBooks?',
    a: 'Not quite. General accounting software is built for accrual-basis businesses with formal books. Atlas One starts from a different default — cash-basis income (you\'re only taxed, mentally, on money you\'ve actually received) — and is purpose-built around the specific decisions Indian freelancers face: GST threshold timing, presumptive vs. actual taxation, and TDS reconciliation. It\'s narrower by design, not a general ledger.',
  },
  {
    q: 'Does Atlas One file my taxes for me?',
    a: 'No, Atlas One does not file any return, does not calculate your final tax liability, and does not make legal judgment calls on ambiguous tax questions — it flags those for you to confirm with your CA instead of guessing. Think of it as showing up to your CA conversation with clean, organized numbers instead of a WhatsApp thread of screenshots.',
  },
  {
    q: 'Do I need to know Notion to use this?',
    a: 'Basic comfort with Notion (clicking into a database, filling a field) is enough — you don\'t need to build or understand the underlying formulas.',
  },

  // GST & Tax
  {
    q: 'Does Atlas One file my GST or income tax returns?',
    a: 'No. GSTR and ITR filings still happen at your end on the government portal or through your CA. Atlas One prepares and organizes the numbers for reference; it doesn\'t calculate final tax liability or submit anything anywhere on your behalf.',
  },
  {
    q: 'How does the GST threshold warning actually work?',
    a: 'Atlas One tracks your billing as you invoice clients throughout the year and compares it against the applicable GST registration threshold for your situation (which varies by state and category). As you approach it, you\'ll see a clear warning well before the deadline — the goal is to make registration a decision you make on your own schedule, not a scramble when a CA points out you\'ve already crossed it.',
  },
  {
    q: 'Can I fully rely on the threshold calculation without double-checking?',
    a: 'Treat it as an early-warning system, not a final legal determination. GST thresholds and rules can change, and edge cases (special category states, specific types of work) genuinely need a human judgment call — which is exactly what Atlas One flags rather than silently guessing at. Always confirm registration timing with your CA before or as you approach the threshold.',
  },
  {
    q: 'What\'s "presumptive vs. actual" taxation, and why does Atlas One show both?',
    a: 'They\'re two different legal ways to calculate your taxable profit — presumptive taxation assumes a fixed percentage of your revenue is profit (simpler, less bookkeeping); actual taxation is your real profit after deducting real expenses (often higher, if your expenses are low). Which one is better depends on your specific numbers. Atlas One calculates both, side by side, based on what you\'ve entered, so you get a fair comparison instead of something you have to research or ask your CA to estimate for you from scratch. Atlas One doesn\'t tell you which to file under — that decision, and its legal consequences, is yours and your CA\'s to make.',
  },
  {
    q: 'I\'m not GST-registered. Is Atlas One still useful for me?',
    a: 'Yes — Atlas One has a "Non GST View" for non-GST-registered users that hides GST-specific calculations you don\'t need yet, and its main job for you is watching the threshold so you know when that might change.',
  },
  {
    q: 'Tax rules change every year. Does Atlas One stay current?',
    a: 'All future updates to Atlas One will be shared and communicated to you over email.',
  },
  {
    q: 'Does Atlas One calculate what I\'ll actually owe in tax?',
    a: 'No — there\'s no income-tax slab calculator. Atlas One shows you Deemed Profit and Actual Profit as two computed figures; what your final tax liability is, and which method to use, is a decision for you and your CA.',
  },

  // Your Data & Privacy
  {
    q: 'Where does my financial data actually live?',
    a: 'In your own account — not on Atlas One\'s or Controve\'s servers. Atlas One is delivered as a system you duplicate into your own Notion account workspace; everything you enter from that point stays there.',
  },
  {
    q: 'Does Controve see my invoices, clients, or financial numbers?',
    a: 'No. Once you\'ve duplicated the template, we have no technical access to what you enter into it.',
  },
  {
    q: 'Can I share my Atlas One workspace with my CA or tax consultant?',
    a: 'Yes — that\'s entirely your own action, using your own account\'s sharing controls (e.g., inviting them into your Notion workspace). We\'re not involved in or accountable for that sharing; it\'s between you and your tax advisor.',
  },
  {
    q: 'Is my data secure?',
    a: 'Its security is governed by the platform your account is on (Notion\'s own security practices), since that\'s where it actually lives — not by us. We recommend reviewing that platform\'s own security documentation if this matters to your decision.',
  },
  {
    q: 'What happens to my data if I stop using Atlas One?',
    a: 'The data remain within your account inside Notion platform.',
  },
  {
    q: 'Can I export my data?',
    a: 'Yes, using your account platform\'s own export tools (e.g., Notion\'s CSV/Markdown export), since the data is fully yours and fully in your control.',
  },

  // Pricing & Getting Started
  {
    q: 'How much does Atlas One cost?',
    a: 'Check the pricing section — <a href="/pricing">click here</a>.',
  },
  {
    q: 'Is this a one-time purchase or a subscription?',
    a: 'A one-time purchase — pay once for lifetime access to Atlas One itself, with no subscriptions or recurring fees from us. Atlas One runs on Notion\'s free tier as of today — continued free access depends on Notion\'s own policies remaining as they are, which is beyond our purview. See our Terms for details — <a href="/terms">click here</a>.',
  },
  {
    q: 'What\'s your refund policy?',
    a: 'Refer to the Refund policy — <a href="/refund">click here</a>.',
  },
  {
    q: 'Do I need a paid Notion plan to use Atlas One?',
    a: 'No, this is built around Notion\'s current free-tier plan — subject to change if Notion updates its own policies.',
  },
  {
    q: 'Is there a demo I can try before buying?',
    a: 'You may request a demo by filling out the Book a Demo form.',
  },
  {
    q: 'What do I actually get after I purchase?',
    a: 'You will receive an email from us which shall give you further guidance on the onboarding process.',
  },

  // Using Atlas One Day to Day
  {
    q: 'What\'s the "traffic light" system I keep seeing (red/yellow/green)?',
    a: 'A consistent status vocabulary used across invoices, projects, and tax obligations: red for overdue, yellow for due soon, green for on track, a checkmark for complete, grey for not applicable, and a distinct paused state. Once you recognize it in one place, you can read the status of anything in the system at a glance.',
  },
  {
    q: 'What if I leave a field blank, like an invoice\'s GST status?',
    a: 'Atlas One never silently assumes a safe default. A blank GST status shows zero GST, not a guess; a missing due date shows an explicit "not set" warning rather than a false-safe green light. If something looks incomplete, it\'s meant to look incomplete, not confidently wrong.',
  },
  {
    q: 'What if a number looks wrong?',
    a: 'Every calculated figure in Atlas One is meant to be traceable back to the real transactions that produced it — trace it back to the linked invoice, receipt, or expense behind it first. Always confirm anything compliance-critical with your CA before acting on it.',
  },
  {
    q: 'Can I use Atlas One on my phone?',
    a: 'You can use Atlas One on your phone though the Notion app.',
  },

  // Support
  {
    q: 'What if I run into a problem or have a question?',
    a: 'You can reach out to us on email.',
  },
  {
    q: 'Do you offer help getting set up?',
    a: 'We will guide on the entire onboarding process and help you set it up.',
  },
  {
    q: 'Can I request a feature or report something that seems off in the app?',
    a: 'Yes — feature suggestions and reporting bugs are always welcome. It helps us improve the tool you\'ll use. Reach out to us at hello@controve.com.',
  },
  {
    q: 'Can I get a custom build for my specific workflow?',
    a: 'Yes — if Atlas One\'s standard system doesn\'t quite fit how you work, we\'re happy to discuss a custom build tailored to your workflow. Reach out to us at hello@controve.com to talk through what you need.',
  },
];

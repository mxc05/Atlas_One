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
    theme: 'signal',
    kicker: 'SYS / 01 · SETUP',
    num: '01',
    title: 'Setup & Reference',
    details: 'Bank accounts, GST registration defaults, currency conversion rates, and business identity.',
    type: 'numeral',
  },
  {
    id: 'sys-02',
    theme: 'ink',
    kicker: 'SYS / 02 · CRM',
    num: '02',
    title: 'Build Momentum',
    details: 'Client onboarding, scope definitions, and automated retainer scheduling.',
    type: 'steps',
    steps: ['01 Client Onboarding', '02 Scope & Milestone', '03 Automatic Billing'],
  },
  {
    id: 'sys-03',
    theme: 'paper',
    kicker: 'SYS / 03 · CASHFLOW',
    num: '03',
    title: 'Useful by Design',
    details: 'Real-time cash-basis ledger tracking money received vs money billed.',
    type: 'stats',
    statVal: '₹4.38L',
    statLabel: '30-day received income',
  },
  {
    id: 'sys-04',
    theme: 'coral',
    kicker: 'SYS / 04 · TAX',
    num: '04',
    title: 'Presumptive vs Actual',
    details: 'Calculate deemed 50% profit (Section 44ADA) against real books side by side.',
    type: 'compare',
    deemed: '₹8.2L',
    actual: '₹9.6L',
  },
  {
    id: 'sys-05',
    theme: 'ink',
    kicker: 'SYS / 05 · VAULT',
    num: '05',
    title: 'Find the Signal',
    details: 'Everything your CA will ask for, organized automatically when invoices land.',
    type: 'statement',
    statement: '"One real event updates every downstream ledger instantly."',
  },
  {
    id: 'sys-06',
    theme: 'paper',
    kicker: 'SYS / 06 · GST',
    num: '06',
    title: 'Threshold Watch',
    details: 'Quietly monitoring your annual billing ceiling before registration becomes urgent.',
    type: 'brief',
    status: '72% of ₹20L ceiling · FY 2026-27',
  },
  {
    id: 'sys-07',
    theme: 'signal',
    kicker: 'SYS / 07 · ECOSYSTEM',
    num: '07',
    title: 'Connected Systems',
    details: '15 integrated modules flowing into one unified Financial Year summary.',
    type: 'orbital',
  },
];

export const personas: Persona[] = [
  {
    initials: 'GF',
    who: 'Growing solo freelancer',
    title: '1–3 years in',
    body: 'Income now regularly crossing six figures a month, 3–8 active clients. Comfortable with spreadsheets, wary of tax terminology.',
    quote: '"I just want to know if I\'m about to do something wrong before I do it."',
    bg: 'var(--blue-ic)',
  },
  {
    initials: 'MS',
    who: 'Multi-stream professional',
    title: '5+ years in',
    body: 'Consulting plus a product or course side income, possibly GST-registered, domestic and foreign clients. Wants a trustworthy yearly summary.',
    bg: 'var(--purple-ic)',
  },
  {
    initials: 'CA',
    who: 'The CA',
    title: 'Secondary user',
    body: 'Not a daily user — a periodic one. Needs a clean, exportable yearly view, readable at a glance without learning anyone\'s system.',
    bg: 'var(--green-ic)',
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    priceMonthly: '₹0',
    priceAnnual: '₹0',
    subMonthly: 'forever — no card required',
    subAnnual: 'forever — no card required',
    desc: 'For freelancers just getting started, before GST is even a question.',
    btnText: 'Start free',
    btnLink: '/#cta',
    features: [
      { text: 'Up to 2 clients', included: true },
      { text: '5 invoices & receipts / month', included: true },
      { text: 'Cash vs. billed tracking', included: true },
      { text: 'GST threshold watch', included: true },
      { text: 'Full GST Ledger', included: false },
      { text: 'Document Vault', included: false },
    ],
  },
  {
    name: 'Pro',
    priceMonthly: '₹999',
    priceAnnual: '₹799',
    subMonthly: 'billed monthly',
    subAnnual: 'billed annually — ₹9,588/yr',
    desc: 'For the freelancer whose income has outgrown a spreadsheet.',
    btnText: 'Get Atlas Pro',
    btnLink: '/#cta',
    featured: true,
    badge: 'Most popular',
    features: [
      { text: 'Unlimited clients & invoices', included: true },
      { text: 'Full GST Ledger & PL Statement', included: true },
      { text: 'Presumptive vs. Actual comparison', included: true },
      { text: 'Document Vault & Overdue Alerts', included: true },
      { text: 'Advance Tax Tracker', included: true },
      { text: '1 free CA viewer seat', included: true },
    ],
  },
  {
    name: 'Studio',
    priceMonthly: '₹2,499',
    priceAnnual: '₹1,999',
    subMonthly: 'billed monthly',
    subAnnual: 'billed annually — ₹23,988/yr',
    desc: 'For multi-stream professionals and small agencies with more than one business.',
    btnText: 'Get Atlas Studio',
    btnLink: '/#cta',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Up to 3 businesses / entities', included: true },
      { text: '2 CA / collaborator seats', included: true },
      { text: 'Custom Financial Year exports', included: true },
      { text: 'Priority chat support', included: true },
      { text: 'Early access to new modules', included: true },
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
  { feature: 'CA / collaborator seats', free: '—', pro: '1', studio: '2' },
  { feature: 'Businesses / entities', free: '1', pro: '1', studio: 'Up to 3' },
  { feature: 'Support', free: 'Community', pro: 'Priority email', studio: 'Priority chat' },
];

export const faqItems: FAQItem[] = [
  {
    q: 'Can I switch plans later?',
    a: 'Yes — upgrade or downgrade anytime. Moving up takes effect immediately; moving down takes effect at the start of your next billing cycle, so you never lose paid-for time.',
  },
  {
    q: 'What happens if I go over the Free plan\'s limits?',
    a: 'Nothing breaks and nothing is deleted. You\'ll see a plain notice that you\'ve reached the monthly limit, with the option to upgrade — your existing clients, invoices, and receipts stay exactly as they are.',
  },
  {
    q: 'Does my CA need their own paid plan?',
    a: 'No. Pro and Studio both include free CA viewer seats — your accountant gets read access to the Financial Year Summary and Document Vault without paying for a seat of their own.',
  },
  {
    q: 'Do you file my GST or income tax returns?',
    a: 'No. Atlas One prepares and organizes the numbers — GSTR and ITR filings still happen on the government portal or through your CA. We don\'t submit anything on your behalf.',
  },
  {
    q: 'Is there a discount for annual billing?',
    a: 'Yes — paying annually saves roughly 20% compared to paying monthly, on both Pro and Studio. Toggle "Annual" above to see the exact numbers.',
  },
];

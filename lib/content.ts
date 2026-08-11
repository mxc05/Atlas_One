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

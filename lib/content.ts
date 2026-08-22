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
      { text: 'Unlimited clients & invoices', included: true },
      { text: 'Full GST Ledger & PL Statement', included: true },
      { text: 'Presumptive vs. Actual comparison', included: true },
      { text: 'Document Vault & Overdue Alerts', included: true },
      { text: 'Advance Tax Tracker', included: true },
      { text: '15 Connected Systems Included', included: true },
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
  {
    q: 'Does Atlas One file my taxes for me?',
    a: 'No. GSTR and ITR filings still happen on the government portal or through your CA. Atlas One prepares and organizes the numbers; it does not submit anything.',
  },
  {
    q: 'Do I need to be GST-registered to use it?',
    a: 'No. Atlas One has a Simple View for non-registered users and a Full View with GST detail for registered ones; it adapts to you.',
  },
  {
    q: 'Is this a subscription?',
    a: 'No, it is a one-time payment of ₹4,999. Every future update is included.',
  },
  {
    q: 'What if Indian tax law is ambiguous for my case?',
    a: 'Atlas One surfaces a clear confirm-with-your-CA flag rather than guessing. It computes the arithmetic, not the judgment calls.',
  },
  {
    q: 'I have multiple income streams. Does it handle that?',
    a: 'Yes, it is built for freelancers with mixed income types, domestic and foreign clients alike.',
  },
  {
    q: 'What happens after I buy?',
    a: 'You get lifetime access and every future update, plus a 7-day money-back guarantee if it is not right for you.',
  },
];

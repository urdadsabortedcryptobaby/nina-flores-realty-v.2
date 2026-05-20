import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { CheckCircle, FileText, DollarSign, Phone } from 'lucide-react';
import MortgageCalculator from '@/components/MortgageCalculator';

export const metadata: Metadata = {
  title: 'Get Pre-Qualified | Nina Flores Realty',
  description: 'Understand your buying power before you shop. Learn why pre-qualification matters, what it costs, and how Nina connects you with trusted Tucson lenders.',
};

const whyItems = [
  {
    icon: CheckCircle,
    title: 'Know Your Budget Before You Shop',
    body: "Pre-qualification gives you a realistic price range so you're never falling in love with a home you can't afford. It removes the guesswork and lets you shop with confidence.",
  },
  {
    icon: FileText,
    title: 'Sellers Take You Seriously',
    body: "In a competitive market, sellers often won't even consider an offer without a pre-approval letter. Having one in hand puts you in the same league as cash buyers.",
  },
  {
    icon: DollarSign,
    title: 'It Costs Nothing',
    body: "Getting pre-qualified is free and typically takes 20–30 minutes. There's no commitment and no impact on your credit score for the initial soft pull.",
  },
  {
    icon: Phone,
    title: 'Nina Connects You to Trusted Lenders',
    body: "Nina works with several trusted local lenders in Tucson. She'll introduce you to one that fits your situation — whether you're a W-2 employee, self-employed, or have unique circumstances.",
  },
];

const documents = [
  'Two most recent pay stubs',
  'Two years of W-2s or tax returns (1099s if self-employed)',
  'Two months of bank statements',
  'Government-issued photo ID',
  'Social Security number (for credit pull)',
  'Information on any current debts (car loans, student loans, etc.)',
];

const upfrontCosts = [
  { label: 'Earnest Money Deposit', range: '1%–2% of purchase price', note: 'Applied to your down payment at closing' },
  { label: 'Home Inspection', range: '$350–$550', note: 'Paid when inspection is scheduled' },
  { label: 'Appraisal', range: '$500–$750', note: 'Required by lender; confirms home value' },
  { label: 'Down Payment', range: '3%–20%+ of purchase price', note: 'FHA: 3.5% · Conventional: as low as 3%' },
  { label: 'Closing Costs', range: '2%–5% of loan amount', note: 'Lender fees, title, escrow, prepaid items' },
];

export default async function PrequalifyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const base = locale === 'en' ? '' : '/es';

  const calcLabels = {
    title: t('calculator.title'),
    subtitle: t('calculator.subtitle'),
    homePrice: t('calculator.homePrice'),
    downPayment: t('calculator.downPayment'),
    interestRate: t('calculator.interestRate'),
    loanTerm: t('calculator.loanTerm'),
    years: t('calculator.years'),
    monthlyPayment: t('calculator.monthlyPayment'),
    disclaimer: t('calculator.disclaimer'),
    prequalNote: t('calculator.prequalNote'),
    prequalBtn: t('calculator.prequalBtn'),
  };

  return (
    <>
      {/* Hero */}
      <div className="py-16 px-4 text-center" style={{ background: 'var(--color-maroon)' }}>
        <p className="text-xs uppercase tracking-widest mb-2 opacity-70" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gold)' }}>
          First Time Home Buyers
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Get Pre-Qualified
        </h1>
        <p className="text-base opacity-80 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-cream)' }}>
          Before you fall in love with a home, find out what you can afford. It's free, fast, and the most important first step you can take.
        </p>
      </div>

      {/* Why Pre-Qualify */}
      <section className="py-16 px-4" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-maroon)' }}>
            Why Pre-Qualification Matters
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-sm p-6" style={{ background: 'var(--color-white)', borderTop: '3px solid var(--color-maroon)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: 'var(--color-cream)', color: 'var(--color-maroon)' }}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-70" style={{ fontFamily: 'var(--font-body)' }}>
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Documents Needed */}
      <section className="py-16 px-4" style={{ background: 'var(--color-cream-dark)' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-maroon)' }}>
            What You'll Need
          </h2>
          <div className="rounded-sm p-8" style={{ background: 'var(--color-white)' }}>
            <p className="text-sm mb-6 opacity-70" style={{ fontFamily: 'var(--font-body)' }}>
              Gathering these documents ahead of time makes the pre-qualification process fast and smooth:
            </p>
            <ul className="space-y-3">
              {documents.map((doc) => (
                <li key={doc} className="flex items-start gap-3 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--color-maroon)' }}>✓</span>
                  <span className="opacity-80">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mortgage Calculator */}
      <section className="py-16 px-4" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-maroon)' }}>
            Estimate Your Monthly Payment
          </h2>
          <p className="text-sm text-center mb-8 opacity-60" style={{ fontFamily: 'var(--font-body)' }}>
            Use this calculator to get a ballpark figure before talking to a lender.
          </p>
          <MortgageCalculator labels={calcLabels} />
        </div>
      </section>

      {/* Upfront Costs */}
      <section className="py-16 px-4" style={{ background: 'var(--color-cream-dark)' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-maroon)' }}>
            Upfront Costs to Budget For
          </h2>
          <p className="text-sm text-center mb-8 opacity-60 max-w-lg mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Beyond your monthly mortgage, here's what you'll need to have ready in cash before and at closing.
          </p>
          <div className="space-y-3">
            {upfrontCosts.map((cost) => (
              <div key={cost.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 rounded-sm p-5" style={{ background: 'var(--color-white)' }}>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>{cost.label}</p>
                  <p className="text-xs opacity-55 mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>{cost.note}</p>
                </div>
                <span className="text-sm font-bold shrink-0" style={{ color: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}>{cost.range}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-center mt-6 opacity-45" style={{ fontFamily: 'var(--font-body)' }}>
            Estimates for the Tucson, AZ market. Actual amounts vary by loan type and lender.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-14 px-4 text-center" style={{ background: 'var(--color-maroon)' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Ready to talk to a loan officer?
          </h2>
          <p className="mb-7 opacity-80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-cream)' }}>
            Nina will connect you with a trusted local lender who can walk you through your options and get you pre-qualified — no pressure, no obligation.
          </p>
          <Link
            href={`${base}/contact`}
            className="inline-block px-8 py-3.5 rounded-sm font-bold text-sm transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-gold)', color: 'var(--color-charcoal)', fontFamily: 'var(--font-body)' }}
          >
            Contact Nina to Get Connected
          </Link>
        </div>
      </section>
    </>
  );
}

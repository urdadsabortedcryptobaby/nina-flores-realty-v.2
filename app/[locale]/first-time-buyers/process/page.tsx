import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { DollarSign, Download } from 'lucide-react';
import BuyingProcessWheel from '@/components/BuyingProcessWheel';

export const metadata: Metadata = {
  title: 'The Home Buying Process | Nina Flores Realty',
  description: 'A step-by-step guide to buying a home in Tucson, AZ. From your first meeting with Nina to closing day — know what to expect at every stage.',
};

const processSteps = [
  {
    id: 'meet',
    num: 1,
    title: 'Meet with a REALTOR®',
    body: "Your first step is sitting down with Nina — in person, by phone, or video call — to talk about what you're looking for. This is a no-pressure conversation where she gets to know your timeline, your budget range, and your must-haves. She'll walk you through the entire process so you know exactly what to expect before a single home is toured.",
  },
  {
    id: 'advantage',
    num: 2,
    title: "The Buyer's Advantage",
    body: "Here's something most first-time buyers don't know: in almost all Arizona home purchases, the seller pays your buyer's agent commission. That means Nina's expertise, advocacy, and time cost you nothing out of pocket. You get a seasoned REALTOR® in your corner at zero direct cost — that's the buyer's advantage.",
  },
  {
    id: 'preapproved',
    num: 3,
    title: 'Get Pre-Approved',
    body: "Before you start touring homes, you need to know your buying power. A lender will review your income (pay stubs, W-2s), assets (bank statements), and credit to issue a pre-approval letter. This letter tells sellers you're a serious, qualified buyer — and in a competitive market like Tucson, it can make the difference between winning and losing a home. Nina works with trusted local lenders and can connect you today.",
  },
  {
    id: 'search',
    num: 4,
    title: 'Search for Homes',
    body: "Now the fun starts. Nina will set up a personalized MLS search so you're notified the moment a home matching your criteria hits the market. She'll schedule showings around your schedule, share her honest take on each property, and help you think through the pros and cons. Tucson's market moves fast — being ready and responsive keeps you competitive.",
  },
  {
    id: 'advanced-search',
    num: 5,
    title: 'Advanced Search',
    body: "Not all property search sites show the same listings. Consumer websites like Zillow and Realtor.com often have outdated data, missing listings, or homes already under contract. Nina gives you direct access to the full MLS, ensuring you see every available home that meets your criteria — the moment it lists, not days later.",
  },
  {
    id: 'offer',
    num: 6,
    title: 'Make an Offer',
    body: "Found the one? Nina will pull comparable sales, analyze market conditions, and help you craft a competitive offer. She'll advise on price, earnest money, contingencies, and closing timeline — then present and negotiate on your behalf. Her goal: get you the home at the best possible terms.",
  },
  {
    id: 'negotiate',
    num: 7,
    title: 'Negotiation & Contract',
    body: "It sometimes takes more than one offer to land the right home — and that's completely normal. Nina will keep you grounded, strategic, and informed through every counteroffer. Once both parties agree to price and terms, you'll sign the Arizona purchase contract and officially enter the escrow process.",
  },
  {
    id: 'contract',
    num: 8,
    title: 'The Contract',
    body: "The purchase contract outlines your timeline for financing, inspections, appraisal, and closing. Nina will walk you through every paragraph so you know your rights and responsibilities. Arizona is an 'as-is' state by default, but the contract provides important inspection and due diligence windows that protect you.",
  },
  {
    id: 'under-contract',
    num: 9,
    title: 'Under Contract',
    body: "Once both parties sign, the home is effectively held for you until closing — no other buyers can purchase it. Now the clock starts on your contingency periods. Nina will track every deadline, coordinate with the title company, lender, and inspectors, and keep everything on schedule.",
  },
  {
    id: 'details',
    num: 10,
    title: 'Final Details',
    body: "This is your due diligence period. You'll order a home inspection, review the results with Nina, and decide whether to request repairs, ask for a credit, or accept the property as-is. The lender will order an appraisal to confirm the home's value. Nina will negotiate any repair requests firmly and professionally.",
  },
  {
    id: 'closing-prep',
    num: 11,
    title: 'Preparing for Closing',
    body: "In the days before closing, you'll do a final walk-through of the property to confirm it's in the agreed-upon condition. Your lender will issue final loan documents, and the title company will prepare the closing disclosure showing your exact costs. Nina reviews all of this with you so closing day has zero surprises.",
  },
  {
    id: 'closing',
    num: 12,
    title: 'Closing Day',
    body: "Closing is the finish line. You'll sign your loan documents, the title company will transfer ownership, and the seller will receive their funds. In Arizona, many closings are handled remotely — you may not even need to be in the same room. Once everything is recorded with the county, the keys are yours. Nina will be there celebrating with you.",
  },
];

const expenses = [
  {
    label: 'Earnest Money Deposit',
    range: '1%–2% of purchase price',
    detail: 'Paid upfront when your offer is accepted to show the seller you\'re serious. This is held in escrow and applied toward your closing costs or down payment at closing. If you back out without a valid contingency reason, you may forfeit it.',
  },
  {
    label: 'Home Inspection',
    range: '$300–$1,000',
    detail: 'Paid directly to the inspector, typically within a few days of going under contract. A general inspection covers the structure, roof, HVAC, plumbing, and electrical. Additional inspections (sewer, termite, radon) may be recommended and cost extra.',
  },
  {
    label: 'Appraisal',
    range: '$600–$1,000',
    detail: "Required by your lender to confirm the home's market value. Usually paid when the appraisal is ordered, or rolled into closing costs depending on your lender. If the appraisal comes in low, Nina will negotiate on your behalf.",
  },
  {
    label: 'Down Payment',
    range: '3%–20%+ of purchase price',
    detail: 'The largest upfront cost. FHA loans require 3.5%, conventional loans as low as 3%. Arizona has down payment assistance programs for qualifying buyers. Nina can connect you with lenders who specialize in low-down-payment options.',
  },
  {
    label: 'Closing Costs',
    range: '1%–5% of loan amount',
    detail: 'Closing costs include lender fees (origination, underwriting), title fees, escrow fees, prepaid insurance, and property tax reserves. Your lender will provide a Loan Estimate within 3 days of application — review it with Nina before proceeding.',
  },
];

export default async function BuyingProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const base = locale === 'en' ? '' : '/es';

  return (
    <>
      {/* Hero */}
      <div className="py-16 px-4 text-center" style={{ background: 'var(--color-maroon)' }}>
        <p className="text-xs uppercase tracking-widest mb-2 opacity-70" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gold)' }}>
          First Time Home Buyers
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          The Home Buying Process
        </h1>
        <p className="text-base opacity-80 max-w-xl mx-auto mb-7" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-cream)' }}>
          12 steps from your first conversation with Nina to getting your keys. Click any step to jump to that section.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/BuyerGuide.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-sm transition-colors hover:bg-white/10"
            style={{ border: '1px solid rgba(201,168,76,0.5)', color: 'var(--color-cream)', fontFamily: 'var(--font-body)' }}
          >
            <Download size={14} /> Get My FREE Buyer&apos;s Guide
          </a>
          <a
            href="/BuyerAdvisory.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-sm transition-colors hover:bg-white/10"
            style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'var(--color-cream)', fontFamily: 'var(--font-body)' }}
          >
            <Download size={14} /> Buyer Advisory
          </a>
        </div>
      </div>

      {/* Interactive Wheel */}
      <section className="py-8 sm:py-16 px-0 sm:px-4" style={{ background: 'var(--color-cream)' }}>
        <div className="w-full max-w-3xl mx-auto">
          <BuyingProcessWheel />
        </div>
      </section>

      {/* Step-by-step detail */}
      <section className="py-16 px-4" style={{ background: 'var(--color-cream-dark)' }}>
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-maroon)' }}>
            Every Step, In Detail
          </h2>
          {processSteps.map((step) => (
            <div
              key={step.id}
              id={step.id}
              className="rounded-sm p-6 scroll-mt-28"
              style={{ background: 'var(--color-white)', borderLeft: '4px solid var(--color-maroon)' }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm"
                  style={{ background: step.num % 2 !== 0 ? 'var(--color-maroon)' : 'var(--color-gold)', color: step.num % 2 !== 0 ? 'white' : 'var(--color-charcoal)' }}
                >
                  {step.num}
                </span>
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-75" style={{ fontFamily: 'var(--font-body)' }}>
                    {step.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Out of Pocket Expenses */}
      <section className="py-16 px-4" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ background: 'var(--color-cream-dark)' }}>
              <DollarSign size={22} style={{ color: 'var(--color-maroon)' }} />
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-maroon)' }}>
              Out-of-Pocket Expenses to Expect
            </h2>
            <p className="text-sm mt-2 opacity-70 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
              Buying a home involves more than just the purchase price. Here's what you should be prepared to pay — and when.
            </p>
          </div>

          <div className="space-y-4">
            {expenses.map((exp) => (
              <div
                key={exp.label}
                className="rounded-sm p-5"
                style={{ background: 'var(--color-white)', borderTop: '3px solid var(--color-gold)' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                  <h3 className="font-bold text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>
                    {exp.label}
                  </h3>
                  <span className="text-sm font-bold" style={{ color: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}>
                    {exp.range}
                  </span>
                </div>
                <p className="text-sm leading-relaxed opacity-70" style={{ fontFamily: 'var(--font-body)' }}>
                  {exp.detail}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-center mt-8 opacity-50" style={{ fontFamily: 'var(--font-body)' }}>
            Ranges are estimates for the Tucson, AZ market. Your actual costs will vary based on loan type, purchase price, and lender. Nina will help you review your Loan Estimate.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 text-center" style={{ background: 'var(--color-maroon)' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Ready to start your journey?
          </h2>
          <p className="mb-7 opacity-80 text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-cream)' }}>
            Nina walks every first-time buyer through this process from start to keys-in-hand. Reach out today — no pressure, just answers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/first-time-buyers/prequalify`}
              className="px-7 py-3 rounded-sm font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-gold)', color: 'var(--color-charcoal)', fontFamily: 'var(--font-body)' }}
            >
              Get Pre-Qualified →
            </Link>
            <Link
              href={`${base}/contact`}
              className="px-7 py-3 rounded-sm font-bold text-sm border text-white hover:bg-white/10 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}
            >
              Talk to Nina
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

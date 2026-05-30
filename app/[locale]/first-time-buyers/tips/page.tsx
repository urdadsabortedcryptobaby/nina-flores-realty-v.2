import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'First Timer Tips | Nina Flores Realty',
  description: 'Practical tips for first-time home buyers in Tucson, AZ. Download the Buyer Advisory and OMNI Buyer\'s Guide — free resources from Nina Flores, REALTOR®.',
};

const tips = [
  {
    num: '01',
    title: 'Get Pre-Approved Before You Start Shopping',
    body: "Falling in love with a home you can't afford is heartbreaking. Get pre-approved first so you know your exact price range and can move quickly when you find the right home. Sellers in Tucson take pre-approved buyers much more seriously.",
  },
  {
    num: '02',
    title: "Needs vs. Wants — Know the Difference",
    body: "Write down your non-negotiables (number of bedrooms, school district, proximity to work) separately from your wish list (pool, updated kitchen, big yard). When you find a home that hits all your needs plus some wants, you'll know it's the one.",
  },
  {
    num: '03',
    title: "Don't Make Any Large Purchases Before Closing",
    body: "Once you're under contract, avoid financing a car, opening new credit cards, or making any large purchases. Your lender will re-verify your credit before closing — even a small change in your debt-to-income ratio can affect your loan approval.",
  },
  {
    num: '04',
    title: 'Always Get a Home Inspection',
    body: "Even on new construction. A home inspection is your best opportunity to uncover hidden issues — from roof condition to HVAC age to plumbing problems. Nina will recommend trusted local inspectors and help you navigate any findings during negotiations.",
  },
  {
    num: '05',
    title: 'Understand What You\'re Signing',
    body: "Arizona purchase contracts are detailed legal documents. Nina will walk you through every paragraph — contingencies, timelines, repair limits, and your rights to walk away. You should never feel pressured to sign something you don't fully understand.",
  },
  {
    num: '06',
    title: 'Save More Than Just the Down Payment',
    body: "Budget for closing costs (2–5% of the loan amount), moving expenses, immediate repairs, and a small emergency fund. First-time buyers who only save for the down payment sometimes get caught off guard by these additional expenses.",
  },
  {
    num: '07',
    title: 'Look at the Neighborhood, Not Just the House',
    body: "You can renovate a kitchen — you can't move the location. Visit the neighborhood at different times of day, check nearby schools even if you don't have kids (they affect resale value), and look at the long-term development plans for the area.",
  },
  {
    num: '08',
    title: 'Trust the Process — and Your Agent',
    body: "The home buying process has a lot of moving parts and it can feel overwhelming. That's why Nina is here. Lean on her expertise, communicate openly about your concerns, and trust that she has your best interests front and center — always.",
  },
  {
    num: '09',
    title: "Don't Wait for the 'Perfect' Market",
    body: "Nobody can perfectly time the market. The best time to buy is when you're financially ready and emotionally ready. Waiting for prices to drop often means competing with more buyers later or paying more in rent in the meantime.",
  },
  {
    num: '10',
    title: 'Your Representation Is Free',
    body: "As a buyer, you pay nothing for Nina's services in most transactions — the seller covers buyer agent compensation. You get full professional representation, market expertise, and negotiation support at no direct cost to you.",
  },
];

export default async function FirstTimerTipsPage({ params }: { params: Promise<{ locale: string }> }) {
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
          First Timer Tips
        </h1>
        <p className="text-base opacity-80 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-cream)' }}>
          10 things Nina wishes every first-time buyer knew before they started. Read these, save them, share them.
        </p>
      </div>

      {/* Download Resources */}
      <section className="py-10 px-4" style={{ background: 'var(--color-cream-dark)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-center mb-5 opacity-60" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}>
            Free Resources
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/BuyerAdvisory.pdf"
              download
              className="flex items-center gap-4 rounded-sm p-5 transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-maroon)', color: 'white' }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
                <Download size={18} />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>Buyer Advisory</p>
                <p className="text-xs opacity-70 mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>Arizona Association of REALTORS® — PDF</p>
              </div>
            </a>
            <a
              href="/BuyerGuide.pdf"
              download
              className="flex items-center gap-4 rounded-sm p-5 transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-gold)', color: 'var(--color-charcoal)' }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(0,0,0,0.12)' }}>
                <Download size={18} />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>OMNI Buyer's Guide</p>
                <p className="text-xs opacity-70 mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>Omni Homes International — PDF</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-3xl mx-auto space-y-5">
          {tips.map((tip) => (
            <div
              key={tip.num}
              className="rounded-sm p-6 flex gap-5"
              style={{ background: 'var(--color-white)', borderLeft: '4px solid var(--color-maroon)' }}
            >
              <span className="font-black text-3xl opacity-15 shrink-0 leading-none mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-maroon)' }}>
                {tip.num}
              </span>
              <div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>
                  {tip.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-70" style={{ fontFamily: 'var(--font-body)' }}>
                  {tip.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Buying Process CTA */}
      <section className="py-10 px-4 text-center" style={{ background: 'var(--color-cream-dark)' }}>
        <div className="max-w-xl mx-auto">
          <p className="text-base mb-4" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)', opacity: 0.8 }}>
            Looking for more information about the home buying process?
          </p>
          <Link
            href={`${base}/first-time-buyers/process`}
            className="inline-block px-7 py-3 rounded-sm font-bold text-sm text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}
          >
            See the Buying Process →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 text-center" style={{ background: 'var(--color-maroon)' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Have questions? Nina has answers.
          </h2>
          <p className="mb-7 opacity-80 text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-cream)' }}>
            There's no such thing as a silly question when you're buying your first home. Reach out — Nina responds to every message personally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contact`}
              className="px-7 py-3 rounded-sm font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-gold)', color: 'var(--color-charcoal)', fontFamily: 'var(--font-body)' }}
            >
              Talk to Nina
            </Link>
            <Link
              href={`${base}/first-time-buyers/process`}
              className="px-7 py-3 rounded-sm font-bold text-sm border text-white hover:bg-white/10 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}
            >
              See the Buying Process →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Investing in Real Estate | Nina Flores REALTOR®',
  description:
    'Learn about real estate investing — types of investment properties, why invest in Tucson, financing options, and how Nina Flores can help you build your portfolio.',
};

const INVESTMENT_TYPES = [
  {
    title: 'Single-Family Rentals',
    body: "The most common entry point for new investors. A single-family home in a strong school district or near a major employer can generate consistent monthly cash flow with lower management overhead. Tucson's rental demand — driven by the University of Arizona and Davis-Monthan Air Force Base — keeps vacancy rates competitive.",
  },
  {
    title: 'Multi-Family Properties',
    body: 'Duplexes, triplexes, and small apartment buildings allow you to scale your income while managing one physical property. Financing is different from single-family (often commercial terms above 4 units), but the cash-flow potential is significantly higher. Tucson has a strong inventory of older multi-family properties in need of renovation — ideal for value-add investors.',
  },
  {
    title: 'Fix & Flip',
    body: "Tucson's housing stock includes a significant number of older homes ripe for renovation. Successful flipping requires accurate ARV (after-repair value) estimation, reliable contractor relationships, and a tight timeline. Nina can help identify undervalued properties and connect you with local professionals who understand investor timelines.",
  },
  {
    title: 'Short-Term Rentals (STRs)',
    body: 'Tucson draws snowbirds, Gem Show attendees, university families, and desert tourists year-round. A well-located short-term rental can earn significantly more per month than a traditional lease. Nina understands Tucson STR zoning regulations and can identify properties in high-demand, STR-eligible areas.',
  },
  {
    title: 'Buy-and-Hold for Long-Term Appreciation',
    body: "Not all investing is about immediate cash flow. Tucson has experienced steady home price appreciation, making it an attractive market for investors who want to build equity over time — whether for retirement income, a future 1031 exchange, or generational wealth transfer.",
  },
];

const FINANCING_OPTIONS = [
  {
    title: 'Conventional Investment Loans',
    body: 'Standard financing for 1–4 unit investment properties. Typically requires 15–25% down, a strong credit score, and documented income. Interest rates are slightly higher than primary residence loans. Ideal for investors with W-2 income and clean financial history.',
  },
  {
    title: 'DSCR Loans (Debt Service Coverage Ratio)',
    body: 'DSCR loans qualify you based on the property\'s rental income — not your personal income. If the rent covers the mortgage (usually 1.0–1.25x coverage ratio), you can get approved without tax returns or pay stubs. Popular with self-employed investors and those with large portfolios.',
  },
  {
    title: 'Hard Money Loans',
    body: "Short-term, asset-based loans used primarily by fix-and-flip investors. Hard money lenders fund based on the property's value (and projected ARV), not your creditworthiness. Higher interest rates and fees, but fast approval and flexible terms — critical when speed matters in a competitive acquisition.",
  },
  {
    title: 'Home Equity Line of Credit (HELOC)',
    body: "If you already own a home with significant equity, a HELOC lets you borrow against it to fund an investment purchase. This can be an effective way to avoid a down payment on your first investment property — using your primary residence's equity as the down payment source.",
  },
  {
    title: 'Seller Financing',
    body: "In seller financing, the property owner acts as the lender. You make monthly payments directly to them, often with more flexible terms than a bank. This strategy works well for off-market deals where the seller is motivated and doesn't need all their equity upfront. It's less common but a powerful tool when both parties are aligned.",
  },
  {
    title: '1031 Exchange',
    body: "A 1031 exchange allows you to defer capital gains taxes by selling one investment property and reinvesting the proceeds into a like-kind property within strict IRS timelines (45 days to identify, 180 days to close). It's one of the most powerful wealth-building tools available to real estate investors. Nina can coordinate with your CPA and refer you to a Qualified Intermediary.",
  },
  {
    title: 'Partnerships and Private Money',
    body: "Don't have all the capital yourself? Partnering with another investor — where one brings the money and the other brings the deal and management expertise — is a common way to get started. Private money lenders (individuals, not institutions) can also fund deals at negotiated terms, often faster and more flexibly than banks.",
  },
  {
    title: 'FHA House Hacking (for New Investors)',
    body: 'If you are a first-time buyer, you can purchase a 2–4 unit property with an FHA loan (as low as 3.5% down) as long as you live in one unit. Your tenants cover part or all of your mortgage — an ideal way to start building a portfolio while keeping your initial investment low.',
  },
];

export default async function InvestingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const base = locale === 'en' ? '' : '/es';

  return (
    <>
      {/* Hero */}
      <div className="py-16 px-4 text-center" style={{ background: 'var(--color-charcoal)' }}>
        <p
          className="text-xs uppercase tracking-widest mb-3 font-bold"
          style={{ color: 'rgba(201,168,76,0.8)', fontFamily: 'var(--font-body)' }}
        >
          Real Estate Investing
        </p>
        <h1
          className="text-4xl sm:text-5xl font-black text-white mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Investing in Real Estate
        </h1>
        <p
          className="opacity-70 max-w-xl mx-auto"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-cream)' }}
        >
          Real estate is one of the most reliable paths to long-term wealth. Here is what you need to know — from property types and investment strategy to financing and why Tucson is one of the best markets in the Southwest.
        </p>
      </div>

      {/* Why Invest in Real Estate */}
      <section className="py-16 px-4" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-black mb-5"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}
          >
            Why Invest in Real Estate?
          </h2>
          <div
            className="flex flex-col gap-4 text-base leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)', opacity: 0.85 }}
          >
            <p>
              Real estate has created more millionaires than nearly any other asset class in American history — and for good reason. Unlike stocks or bonds, real estate is a tangible asset that generates income, builds equity, provides tax advantages, and appreciates over time, often all at once.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {[
                { title: 'Monthly Cash Flow', body: 'Rental income pays your mortgage and puts money in your pocket every month — even while you sleep.' },
                { title: 'Long-Term Appreciation', body: "Property values have historically trended upward over time. In Tucson's growing market, that appreciation compounds year over year." },
                { title: 'Tax Advantages', body: 'Depreciation, mortgage interest deductions, and 1031 exchanges allow investors to legally reduce their tax burden in ways stocks cannot match.' },
                { title: 'Leverage', body: 'You can control a $400,000 asset with $80,000 down. No other investment class lets you use borrowed capital this effectively while retaining the full upside.' },
                { title: 'Inflation Hedge', body: 'As inflation rises, so do rents and property values. Real estate naturally protects purchasing power over the long term.' },
                { title: 'Generational Wealth', body: 'Real estate can be passed to your children — with a stepped-up cost basis that significantly reduces their tax burden.' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-sm p-5"
                  style={{ background: '#fff', border: '1px solid var(--color-cream-dark)' }}
                >
                  <h3
                    className="font-bold text-sm mb-1"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-maroon)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-75">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Types of Investment Properties */}
      <section className="py-16 px-4" style={{ background: '#fff' }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-black mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}
          >
            Types of Investment Properties
          </h2>
          <div className="space-y-5">
            {INVESTMENT_TYPES.map((type, idx) => (
              <div
                key={type.title}
                className="rounded-sm p-6 flex gap-5"
                style={{ background: 'var(--color-cream)', borderLeft: '4px solid var(--color-maroon)' }}
              >
                <span
                  className="font-black text-2xl opacity-20 shrink-0 leading-none mt-1"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-maroon)' }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    className="font-bold text-base mb-2"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}
                  >
                    {type.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed opacity-75"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}
                  >
                    {type.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-16 px-4" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-2xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest mb-3 font-bold"
            style={{ color: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}
          >
            Financing
          </p>
          <h2
            className="text-3xl font-black mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}
          >
            Financing Your Investment Property
          </h2>
          <p
            className="text-base leading-relaxed mb-8 opacity-75"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}
          >
            One of the biggest misconceptions about real estate investing is that you need a large amount of cash to get started. While having capital helps, there are more financing paths available to investors than most people realize — from conventional loans to creative strategies that require little or no money down.
          </p>
          <div className="space-y-4">
            {FINANCING_OPTIONS.map((option) => (
              <div
                key={option.title}
                className="rounded-sm p-5"
                style={{ background: '#fff', border: '1px solid var(--color-cream-dark)' }}
              >
                <h3
                  className="font-bold text-base mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-maroon)' }}
                >
                  {option.title}
                </h3>
                <p
                  className="text-sm leading-relaxed opacity-75"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}
                >
                  {option.body}
                </p>
              </div>
            ))}
          </div>
          <p
            className="text-sm mt-6 opacity-60"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}
          >
            Nina can connect you with lenders who specialize in investor financing — from DSCR and hard money to conventional portfolio loans. Contact her to get matched with the right lender for your strategy.
          </p>
        </div>
      </section>

      {/* Why Invest in Tucson */}
      <section className="py-16 px-4" style={{ background: '#fff' }}>
        <div className="max-w-2xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest mb-3 font-bold"
            style={{ color: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}
          >
            The Market
          </p>
          <h2
            className="text-3xl font-black mb-5"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}
          >
            Why Invest in Tucson?
          </h2>
          <div
            className="flex flex-col gap-4 text-base leading-relaxed mb-8"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)', opacity: 0.85 }}
          >
            <p>
              Tucson consistently ranks as one of the most undervalued real estate markets in the Southwest. While Phoenix and coastal cities have experienced extreme price run-ups, Tucson still offers affordable entry points with strong fundamentals driving demand — and that combination is rare.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { stat: '45,000+', label: 'University of Arizona students driving rental demand year-round' },
                { stat: 'Davis-Monthan', label: 'Active Air Force Base providing a stable renter base' },
                { stat: 'Top 20', label: 'Consistently ranked among the fastest-growing metros in the US' },
                { stat: 'Below Phoenix', label: 'Significantly lower price points with comparable or better cap rates' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-sm p-5 text-center"
                  style={{ background: 'var(--color-cream)', border: '1px solid var(--color-cream-dark)' }}
                >
                  <p
                    className="text-2xl font-black mb-1"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-maroon)' }}
                  >
                    {item.stat}
                  </p>
                  <p className="text-sm opacity-70">{item.label}</p>
                </div>
              ))}
            </div>
            <p>
              Population growth, an expanding tech sector, proximity to Mexico (cross-border commerce and tourism), and a relatively landlord-friendly legal environment make Tucson one of the most compelling long-term investment markets in Arizona.
            </p>
          </div>
          <Link
            href={`${base}/investment`}
            className="inline-block px-7 py-3.5 rounded-sm font-bold text-base text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}
          >
            Explore Tucson Investment Opportunities →
          </Link>
        </div>
      </section>

      {/* Why Nina */}
      <section className="py-16 px-4" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-black mb-5"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}
          >
            Why Work With Nina?
          </h2>
          <div
            className="flex flex-col gap-4 text-base leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)', opacity: 0.85 }}
          >
            <p>
              Investing in real estate requires a different kind of agent — someone who understands numbers, knows the local rental market, and can identify opportunity where others see risk. Nina Flores works with investors at every level, from first-time house hackers to experienced portfolio builders.
            </p>
            <ul className="pl-5 list-disc space-y-2">
              <li>Deep knowledge of Tucson rental submarkets and neighborhood-level demand</li>
              <li>Relationships with investor-focused lenders who understand DSCR, hard money, and portfolio loans</li>
              <li>Experience with fix-and-flip transactions, tenant-occupied sales, and multi-family deals</li>
              <li>Off-market property access through her professional network</li>
              <li>Honest, data-driven analysis — Nina will tell you when a deal does not pencil out</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 text-center" style={{ background: 'var(--color-maroon)' }}>
        <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Ready to start building your portfolio?
        </h2>
        <p
          className="opacity-75 mb-6 max-w-md mx-auto"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-cream)' }}
        >
          Whether you are buying your first rental or expanding an existing portfolio, Nina is ready to help you find the right investment in Tucson.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`${base}/contact`}
            className="inline-block px-8 py-3.5 rounded-sm font-bold text-base transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-gold)', color: 'var(--color-charcoal)', fontFamily: 'var(--font-body)' }}
          >
            Talk to Nina
          </Link>
          <Link
            href={`${base}/investment`}
            className="inline-block px-8 py-3.5 rounded-sm font-bold text-base text-white border-2 transition-colors hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}
          >
            Search Tucson Investments →
          </Link>
        </div>
      </section>
    </>
  );
}

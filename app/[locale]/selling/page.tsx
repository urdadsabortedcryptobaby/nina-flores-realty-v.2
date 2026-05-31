import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Selling Your Home | Nina Flores REALTOR®',
  description:
    'Struggling to sell your home in Tucson? Learn why hiring a professional real estate agent matters — and why Nina Flores is the right choice for Tucson sellers.',
};

export default async function SellingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const base = locale === 'en' ? '' : '/es';

  return (
    <>
      {/* Hero */}
      <div className="py-16 px-4 text-center" style={{ background: 'var(--color-maroon)' }}>
        <p
          className="text-xs uppercase tracking-widest mb-3"
          style={{ color: 'rgba(201,168,76,0.8)', fontFamily: 'var(--font-body)' }}
        >
          Selling Your Home
        </p>
        <h1
          className="text-4xl sm:text-5xl font-black text-white mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Let&apos;s Get Your Home Sold
        </h1>
        <p
          className="opacity-75 max-w-xl mx-auto"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-cream)' }}
        >
          Selling a home is one of the biggest financial decisions you will ever make. Here is what you need to know — and how Nina can help you do it right.
        </p>
      </div>

      {/* Struggles */}
      <article className="py-16 px-4" style={{ background: '#fff' }}>
        <div className="max-w-2xl mx-auto">
          <Section title="The Real Challenges of Selling Your Home">
            <p>
              Most homeowners underestimate how complicated selling a home actually is. It is not just putting a sign in the yard and waiting for offers. The process involves pricing strategy, marketing, negotiations, inspections, appraisals, contracts, and deadlines — all happening at once, while you are still living your life.
            </p>
            <p>Common struggles sellers face:</p>
            <ul>
              <li>
                <strong>Mispricing the home.</strong> Overpriced homes sit on the market and develop a stigma. Underpriced homes leave real money behind. Getting the number right from day one requires current market data and local expertise — not an online estimate.
              </li>
              <li>
                <strong>Poor marketing exposure.</strong> If buyers cannot find your home, they cannot buy it. A listing that is not professionally photographed, well-described, and distributed across the right channels will attract fewer offers and take longer to sell.
              </li>
              <li>
                <strong>Emotional decision-making.</strong> Your home has years of memories attached to it. Buyers do not see those — they see square footage and comparable sales. It can be difficult to separate emotion from strategy without an experienced professional guiding the process.
              </li>
              <li>
                <strong>Navigating offers and negotiations.</strong> A low offer, an inspection report full of findings, or a buyer asking for seller concessions can feel personal. Knowing when to hold firm, when to counter, and when to walk away is a skill built from experience.
              </li>
              <li>
                <strong>Managing the contract timeline.</strong> Arizona purchase contracts have dozens of deadlines — inspection periods, appraisal contingencies, loan approvals, and closing timelines. Miss one, and the deal can fall apart or expose you to legal liability.
              </li>
              <li>
                <strong>Coordinating repairs and disclosures.</strong> Sellers are legally required to disclose known material defects. Deciding which repairs to make before listing — and which to price into the sale — can significantly affect your net proceeds.
              </li>
            </ul>
          </Section>

          <Divider />

          {/* Why an agent */}
          <Section title="Why You Should Hire a Real Estate Agent">
            <p>
              A skilled real estate agent does not just put your home on the MLS. They manage the entire process from pre-listing preparation to closing day — protecting your interests, maximizing your proceeds, and handling the complexity so you do not have to.
            </p>
            <ul>
              <li>
                <strong>Accurate, strategic pricing.</strong> A professional Comparative Market Analysis gives you a data-backed price range based on what buyers are actually paying — not public estimates or neighbor opinions.
              </li>
              <li>
                <strong>Professional marketing.</strong> Quality photography, compelling listing descriptions, targeted online advertising, and MLS exposure bring more qualified buyers through your door.
              </li>
              <li>
                <strong>Experienced negotiation.</strong> An agent negotiates on your behalf — keeping emotions out of the equation and focusing on getting you the best possible terms, not just the highest offer number.
              </li>
              <li>
                <strong>Legal and contract expertise.</strong> Arizona real estate contracts are detailed and legally binding. An agent ensures every clause, contingency, and deadline works in your favor.
              </li>
              <li>
                <strong>A network of professionals.</strong> Inspectors, title companies, lenders, contractors, stagers — a connected agent brings the right people to the table at every step.
              </li>
              <li>
                <strong>Peace of mind.</strong> You have someone in your corner who has done this dozens of times, knows what to expect, and will tell you the truth even when it is not what you want to hear.
              </li>
            </ul>
          </Section>

          <Divider />

          {/* Why Nina */}
          <Section title="Why Hire Nina Flores?">
            <p>
              Nina Flores is not just a licensed agent — she is a Southern Arizona native who understands this market at a level that goes beyond the data. She grew up in Tucson, bought her first home here at 24, and has built her career helping families navigate the same decisions she once faced herself.
            </p>
            <ul>
              <li>
                <strong>She knows Tucson.</strong> From Catalina Foothills luxury to South Tucson entry-level homes to Vail new construction — Nina has worked across the entire market and understands what buyers in each area are looking for.
              </li>
              <li>
                <strong>She is honest about pricing.</strong> Nina will not inflate your expectations to win a listing. She will show you the data, explain the reasoning, and give you a realistic strategy that actually gets your home sold.
              </li>
              <li>
                <strong>She is a skilled negotiator.</strong> Whether you are facing a lowball offer, a difficult inspection report, or a buyer asking for concessions, Nina advocates for your best outcome with professionalism and confidence.
              </li>
              <li>
                <strong>She handles the details.</strong> From pre-listing preparation to closing coordination, Nina manages the timeline so nothing falls through the cracks — and you are never left wondering what comes next.
              </li>
              <li>
                <strong>She responds personally.</strong> Nina is not a team where your listing gets handed off to an assistant. When you call or text, you hear back from Nina directly.
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${base}/contact`}
                className="inline-block px-7 py-3.5 rounded-sm font-bold text-base text-white transition-opacity hover:opacity-90"
                style={{ background: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}
              >
                Talk to Nina About Selling →
              </Link>
              <Link
                href={`${base}/selling/home-worth`}
                className="inline-block px-7 py-3.5 rounded-sm font-bold text-base border transition-colors hover:bg-gray-50"
                style={{ borderColor: 'var(--color-maroon)', color: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}
              >
                What&apos;s My Home Worth?
              </Link>
            </div>
          </Section>
        </div>
      </article>

      {/* Selling Investment Properties */}
      <section className="py-16 px-4" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-2xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest mb-3 font-bold"
            style={{ color: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}
          >
            Investors
          </p>
          <h2
            className="text-3xl font-black mb-5"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}
          >
            Selling an Investment Property?
          </h2>
          <p
            className="text-base leading-relaxed mb-5 opacity-80"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}
          >
            Selling an investment property is a different challenge than selling a primary residence. Whether you are offloading a fix-and-flip, exiting a rental, or selling a small multi-family building, the strategy, timing, and tax considerations are unique — and the stakes are often higher.
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                title: 'Fix & Flip Exit Strategy',
                body: 'Timing your sale to maximize return on a flip means pricing aggressively for the current market, not what you put in. Nina understands investor cost structures and helps you hit your margin targets.',
              },
              {
                title: 'Long-Term Rental Properties',
                body: 'Selling a tenant-occupied rental requires navigating lease agreements, disclosure requirements, and buyer expectations. Nina has experience with these transactions and makes the process smooth for both you and your tenants.',
              },
              {
                title: 'Multi-Family Properties',
                body: 'Duplexes, triplexes, and small apartment buildings attract a specific buyer pool — investors looking at cap rates and cash flow. Nina knows how to market income-producing properties to the right audience.',
              },
              {
                title: 'Short-Term Rental (STR) Properties',
                body: 'Selling a property operating as an Airbnb or VRBO? Nina helps you present revenue data, STR permits, and operational history in a way that resonates with buyers who understand the asset class.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-sm p-5"
                style={{ background: '#fff', borderLeft: '4px solid var(--color-maroon)' }}
              >
                <h3
                  className="font-bold text-base mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed opacity-70"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-base leading-relaxed mb-6 opacity-80"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}
          >
            Thinking about growing your portfolio instead of selling? Whether you are looking to buy your first investment property or add to an existing portfolio, Nina can help you find the right opportunity in Tucson&apos;s market.
          </p>
          <Link
            href={`${base}/investing`}
            className="inline-block px-7 py-3.5 rounded-sm font-bold text-base text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}
          >
            Explore Investing in Real Estate →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 text-center" style={{ background: 'var(--color-maroon)' }}>
        <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Ready to sell? Let&apos;s build your strategy.
        </h2>
        <p
          className="opacity-75 mb-6 max-w-md mx-auto"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-cream)' }}
        >
          Contact Nina for a free consultation and Comparative Market Analysis — no pressure, just a clear picture of your options.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`${base}/contact`}
            className="inline-block px-8 py-3.5 rounded-sm font-bold text-base transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-gold)', color: 'var(--color-charcoal)', fontFamily: 'var(--font-body)' }}
          >
            Get My Free CMA
          </Link>
          <Link
            href={`${base}/selling/checklist`}
            className="inline-block px-8 py-3.5 rounded-sm font-bold text-base text-white border-2 transition-colors hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}
          >
            View the Selling Checklist →
          </Link>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="text-2xl font-black mb-4"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-maroon)' }}
      >
        {title}
      </h2>
      <div
        className="flex flex-col gap-4 text-base leading-relaxed [&_strong]:font-bold [&_ul]:pl-5 [&_ul]:list-disc [&_li]:mb-2"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}
      >
        {children}
      </div>
    </section>
  );
}

function Divider() {
  return (
    <hr className="my-10" style={{ borderColor: 'var(--color-cream-dark)' }} />
  );
}

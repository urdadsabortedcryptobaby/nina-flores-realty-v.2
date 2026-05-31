import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import {
  BarChart2, Camera, Scale, FileText, Users, ShieldCheck,
  MapPin, BadgeCheck, Handshake, ClipboardList, Phone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Selling Your Home | Nina Flores REALTOR®',
  description:
    'Struggling to sell your home in Tucson? Learn why hiring a professional real estate agent matters — and why Nina Flores is the right choice for Tucson sellers.',
};

const CHALLENGES = [
  {
    num: '01',
    title: 'Mispricing the Home',
    body: 'Overpriced homes sit on the market and develop a stigma. Underpriced homes leave real money behind. Getting the number right from day one requires current market data and local expertise — not an online estimate.',
  },
  {
    num: '02',
    title: 'Poor Marketing Exposure',
    body: 'If buyers cannot find your home, they cannot buy it. A listing that is not professionally photographed, well-described, and distributed across the right channels will attract fewer offers and take longer to sell.',
  },
  {
    num: '03',
    title: 'Emotional Decision-Making',
    body: 'Your home has years of memories attached to it. Buyers do not see those — they see square footage and comparable sales. It can be difficult to separate emotion from strategy without an experienced professional guiding the process.',
  },
  {
    num: '04',
    title: 'Navigating Offers and Negotiations',
    body: 'A low offer, an inspection report full of findings, or a buyer asking for seller concessions can feel personal. Knowing when to hold firm, when to counter, and when to walk away is a skill built from experience.',
  },
  {
    num: '05',
    title: 'Managing the Contract Timeline',
    body: 'Arizona purchase contracts have dozens of deadlines — inspection periods, appraisal contingencies, loan approvals, and closing timelines. Miss one, and the deal can fall apart or expose you to legal liability.',
  },
  {
    num: '06',
    title: 'Coordinating Repairs and Disclosures',
    body: 'Sellers are legally required to disclose known material defects. Deciding which repairs to make before listing — and which to price into the sale — can significantly affect your net proceeds.',
  },
];

const AGENT_BENEFITS = [
  {
    icon: BarChart2,
    title: 'Accurate, Strategic Pricing',
    body: 'A professional Comparative Market Analysis gives you a data-backed price range based on what buyers are actually paying — not public estimates or neighbor opinions.',
  },
  {
    icon: Camera,
    title: 'Professional Marketing',
    body: 'Quality photography, compelling listing descriptions, targeted online advertising, and MLS exposure bring more qualified buyers through your door.',
  },
  {
    icon: Scale,
    title: 'Experienced Negotiation',
    body: 'An agent negotiates on your behalf — keeping emotions out of the equation and focusing on getting you the best possible terms, not just the highest offer number.',
  },
  {
    icon: FileText,
    title: 'Legal and Contract Expertise',
    body: 'Arizona real estate contracts are detailed and legally binding. An agent ensures every clause, contingency, and deadline works in your favor.',
  },
  {
    icon: Users,
    title: 'A Network of Professionals',
    body: 'Inspectors, title companies, lenders, contractors, stagers — a connected agent brings the right people to the table at every step.',
  },
  {
    icon: ShieldCheck,
    title: 'Peace of Mind',
    body: 'You have someone in your corner who has done this dozens of times, knows what to expect, and will tell you the truth even when it is not what you want to hear.',
  },
];

const NINA_REASONS = [
  {
    icon: MapPin,
    title: 'She Knows Tucson',
    body: 'From Catalina Foothills luxury to South Tucson entry-level homes to Vail new construction — Nina has worked across the entire market and understands what buyers in each area are looking for.',
  },
  {
    icon: BadgeCheck,
    title: 'She Is Honest About Pricing',
    body: 'Nina will not inflate your expectations to win a listing. She will show you the data, explain the reasoning, and give you a realistic strategy that actually gets your home sold.',
  },
  {
    icon: Handshake,
    title: 'She Is a Skilled Negotiator',
    body: 'Whether you are facing a lowball offer, a difficult inspection report, or a buyer asking for concessions, Nina advocates for your best outcome with professionalism and confidence.',
  },
  {
    icon: ClipboardList,
    title: 'She Handles the Details',
    body: 'From pre-listing preparation to closing coordination, Nina manages the timeline so nothing falls through the cracks — and you are never left wondering what comes next.',
  },
  {
    icon: Phone,
    title: 'She Responds Personally',
    body: 'Nina is not a team where your listing gets handed off to an assistant. When you call or text, you hear back from Nina directly.',
  },
];

const INVESTMENT_TYPES = [
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
];

export default async function SellingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const base = locale === 'en' ? '' : '/es';

  return (
    <>
      {/* Hero */}
      <div className="py-20 px-4 text-center" style={{ background: 'var(--color-maroon)' }}>
        <p
          className="text-xs uppercase tracking-widest mb-3 font-bold"
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
          className="opacity-75 max-w-xl mx-auto mb-10"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-cream)' }}
        >
          Selling a home is one of the biggest financial decisions you will ever make. Here is what you need to know — and how Nina can help you do it right.
        </p>
        {/* Jump Links */}
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { href: '#challenges', label: 'The Challenges' },
            { href: '#why-agent', label: 'Why an Agent?' },
            { href: '#why-nina', label: 'Why Nina?' },
            { href: '#investors', label: 'Selling Investments' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-5 py-2 rounded-full text-sm font-bold transition-colors hover:bg-white/20"
              style={{
                border: '1px solid rgba(255,255,255,0.35)',
                color: 'rgba(255,255,255,0.85)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── CHALLENGES ── */}
      <section id="challenges" className="py-16 px-4 scroll-mt-20" style={{ background: '#fff' }}>
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}>
              What Sellers Face
            </p>
            <h2 className="text-3xl font-black mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>
              The Real Challenges of Selling Your Home
            </h2>
            <p className="text-base leading-relaxed opacity-75" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}>
              Most homeowners underestimate how complicated selling a home actually is. It is not just putting a sign in the yard and waiting for offers. The process involves pricing strategy, marketing, negotiations, inspections, appraisals, contracts, and deadlines — all happening at once, while you are still living your life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHALLENGES.map((item) => (
              <div
                key={item.num}
                className="relative rounded-sm p-6 overflow-hidden group transition-shadow hover:shadow-md"
                style={{ background: 'var(--color-cream)', border: '1px solid var(--color-cream-dark)' }}
              >
                <span
                  className="absolute top-3 right-4 text-5xl font-black leading-none select-none"
                  style={{ color: 'var(--color-maroon)', opacity: 0.08, fontFamily: 'var(--font-display)' }}
                >
                  {item.num}
                </span>
                <span
                  className="inline-block text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}
                >
                  {item.num}
                </span>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-70" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY AN AGENT ── */}
      <section id="why-agent" className="py-16 px-4 scroll-mt-20" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}>
              The Case for Expertise
            </p>
            <h2 className="text-3xl font-black mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>
              Why You Should Hire a Real Estate Agent
            </h2>
            <p className="text-base leading-relaxed opacity-75" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}>
              A skilled real estate agent does not just put your home on the MLS. They manage the entire process from pre-listing preparation to closing day — protecting your interests, maximizing your proceeds, and handling the complexity so you do not have to.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {AGENT_BENEFITS.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-sm p-5 transition-shadow hover:shadow-md"
                style={{ background: '#fff', border: '1px solid var(--color-cream-dark)' }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: 'var(--color-maroon)' }}
                >
                  <item.icon size={18} color="white" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-70" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY NINA ── */}
      <section id="why-nina" className="py-16 px-4 scroll-mt-20" style={{ background: 'var(--color-charcoal)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Left — intro + CTAs */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}>
                Your Agent
              </p>
              <h2 className="text-3xl font-black text-white mb-5" style={{ fontFamily: 'var(--font-display)' }}>
                Why Hire Nina Flores?
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.65)' }}>
                Nina Flores is not just a licensed agent — she is a Southern Arizona native who understands this market at a level that goes beyond the data. She grew up in Tucson, bought her first home here at 24, and has built her career helping families navigate the same decisions she once faced herself.
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href={`${base}/contact`}
                  className="inline-block px-7 py-3.5 rounded-sm font-bold text-base text-center transition-opacity hover:opacity-90"
                  style={{ background: 'var(--color-gold)', color: 'var(--color-charcoal)', fontFamily: 'var(--font-body)' }}
                >
                  Talk to Nina About Selling →
                </Link>
                <Link
                  href={`${base}/selling/home-worth`}
                  className="inline-block px-7 py-3.5 rounded-sm font-bold text-base text-center text-white border transition-colors hover:bg-white/10"
                  style={{ borderColor: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}
                >
                  What&apos;s My Home Worth?
                </Link>
              </div>
            </div>

            {/* Right — feature rows */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {NINA_REASONS.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-sm p-5 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: 'var(--color-maroon)' }}
                  >
                    <item.icon size={16} color="white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1 text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.6)' }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── INVESTMENT PROPERTIES ── */}
      <section id="investors" className="py-16 px-4 scroll-mt-20" style={{ background: '#fff' }}>
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}>
              Investors
            </p>
            <h2 className="text-3xl font-black mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>
              Selling an Investment Property?
            </h2>
            <p className="text-base leading-relaxed opacity-75" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}>
              Selling an investment property is a different challenge than selling a primary residence. Whether you are offloading a fix-and-flip, exiting a rental, or selling a small multi-family building, the strategy, timing, and tax considerations are unique — and the stakes are often higher.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {INVESTMENT_TYPES.map((item) => (
              <div
                key={item.title}
                className="rounded-sm p-6 transition-shadow hover:shadow-md"
                style={{ background: 'var(--color-cream)', borderTop: '3px solid var(--color-maroon)' }}
              >
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-70" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div
            className="rounded-sm p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center"
            style={{ background: 'var(--color-cream)', border: '1px solid var(--color-cream-dark)' }}
          >
            <p className="text-base leading-relaxed flex-1 opacity-80" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}>
              Thinking about growing your portfolio instead of selling? Whether you are looking to buy your first investment property or add to an existing portfolio, Nina can help you find the right opportunity in Tucson&apos;s market.
            </p>
            <Link
              href={`${base}/investing`}
              className="shrink-0 inline-block px-6 py-3 rounded-sm font-bold text-sm text-white transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ background: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}
            >
              Explore Investing →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 px-4 text-center" style={{ background: 'var(--color-maroon)' }}>
        <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Ready to sell? Let&apos;s build your strategy.
        </h2>
        <p className="opacity-75 mb-6 max-w-md mx-auto" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-cream)' }}>
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

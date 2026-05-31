import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { Download, BookOpen, Home, TrendingUp, MapPin, DoorOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Your Real Estate Resources | Nina Flores REALTOR®',
  description:
    'Free real estate guides and resources from Nina Flores — buyer guides, seller guides, relocation resources, investment tools, and renter workbooks for Tucson, AZ.',
};

const QUICK_DOWNLOADS = [
  {
    label: "Buyer's Guide",
    sub: 'Omni Homes International — PDF',
    href: '/BuyerGuide.pdf',
    color: 'var(--color-maroon)',
    text: 'white',
  },
  {
    label: "Seller's Guide",
    sub: 'Nina Flores Realty — PDF',
    href: '/SellersGuide.pdf',
    color: 'var(--color-charcoal)',
    text: 'white',
  },
  {
    label: 'Relocation Guide',
    sub: 'Nina Flores Realty — PDF',
    href: '/RelocationGuide.pdf',
    color: 'var(--color-maroon)',
    text: 'white',
  },
  {
    label: 'Buyer Advisory',
    sub: 'Arizona Association of REALTORS® — PDF',
    href: '/BuyerAdvisory.pdf',
    color: 'var(--color-gold)',
    text: 'var(--color-charcoal)',
  },
];

const SECTIONS = [
  {
    id: 'buying',
    icon: Home,
    eyebrow: 'Buyers',
    title: 'Buying a Home',
    body: "Buying a home is one of the most significant financial decisions you will ever make. Whether you are a first-time buyer or you have been through the process before, having the right resources and the right agent makes all the difference. These guides walk you through every step — from understanding your budget and getting pre-approved, to making an offer, navigating inspections, and closing with confidence.",
    downloads: [
      {
        label: "Buyer's Guide",
        sub: 'Omni Homes International — PDF',
        href: '/BuyerGuide.pdf',
        style: 'maroon',
      },
      {
        label: 'Buyer Advisory',
        sub: 'Arizona Association of REALTORS® — PDF',
        href: '/BuyerAdvisory.pdf',
        style: 'gold',
      },
    ],
    links: [
      { label: 'First Time Home Buyer', href: '/first-time-buyers' },
      { label: 'The Buying Process', href: '/first-time-buyers/process' },
      { label: 'Tips for Homebuying', href: '/first-time-buyers/tips' },
      { label: 'Get Pre-Qualified', href: '/first-time-buyers/prequalify' },
    ],
  },
  {
    id: 'selling',
    icon: TrendingUp,
    eyebrow: 'Sellers',
    title: 'Selling Your Home',
    body: "Selling a home successfully requires strategy, market knowledge, and professional execution. From pricing your home correctly to negotiating the best terms and navigating the contract timeline, every step matters. The Seller's Guide gives you a comprehensive overview of what to expect — and what Nina does to make sure your sale goes smoothly from listing day to closing day.",
    downloads: [
      {
        label: "Seller's Guide",
        sub: 'Nina Flores Realty — PDF',
        href: '/SellersGuide.pdf',
        style: 'maroon',
      },
    ],
    links: [
      { label: 'Selling Your Home', href: '/selling' },
      { label: "What's My Home Worth?", href: '/selling/home-worth' },
      { label: 'Selling Checklist', href: '/selling/checklist' },
    ],
  },
  {
    id: 'relocating',
    icon: MapPin,
    eyebrow: 'Relocating',
    title: 'Relocating to Southern Arizona',
    body: "Moving to a new city is exciting — and overwhelming. If you are relocating to Tucson or Southern Arizona, Nina's Relocation Guide is your starting point. It covers the neighborhoods, school districts, lifestyle factors, and everything else you need to make an informed decision about where to plant roots. Nina has helped dozens of families make a smooth transition to the area, and she can help you too.",
    downloads: [
      {
        label: 'Relocation Guide',
        sub: 'Nina Flores Realty — PDF',
        href: '/RelocationGuide.pdf',
        style: 'maroon',
      },
    ],
    links: [
      { label: 'Explore Neighborhoods', href: '/neighborhoods' },
    ],
  },
  {
    id: 'investing',
    icon: TrendingUp,
    eyebrow: 'Investors',
    title: 'Investing in Real Estate',
    body: "Tucson is one of the most compelling real estate investment markets in the Southwest — with affordable entry points, consistent rental demand from the University of Arizona and Davis-Monthan Air Force Base, and steady population growth. Whether you are exploring your first rental property, looking to flip, or building a multi-family portfolio, Nina can help you identify the right opportunities and connect you with investor-focused lenders and resources.",
    downloads: [],
    links: [
      { label: 'Investing in Real Estate', href: '/investing' },
      { label: 'Investing in Tucson', href: '/investment' },
    ],
  },
  {
    id: 'renting',
    icon: DoorOpen,
    eyebrow: 'Renters',
    title: 'Going from Renting to Owning',
    body: "If you are renting, you are not stuck — you might be closer to homeownership than you think. Nina specializes in helping renters understand their options, navigate down payment assistance programs, and find lenders who work with buyers in their situation. The Renter's Workbook to Homeownership walks you step-by-step through the process of making the leap — from understanding your credit to building your savings plan to identifying your first home.",
    downloads: [
      {
        label: "Renter's Workbook to Homeownership",
        sub: 'Coming Soon — PDF',
        href: null,
        style: 'outline',
      },
    ],
    links: [
      { label: "Renter's Guide", href: '/rent-trap' },
    ],
  },
];

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const base = locale === 'en' ? '' : '/es';

  return (
    <>
      {/* Hero */}
      <div className="py-16 px-4 text-center" style={{ background: 'var(--color-maroon)' }}>
        <p
          className="text-xs uppercase tracking-widest mb-3 font-bold"
          style={{ color: 'rgba(201,168,76,0.8)', fontFamily: 'var(--font-body)' }}
        >
          Free Guides & Tools
        </p>
        <h1
          className="text-4xl sm:text-5xl font-black text-white mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Your Real Estate Resources
        </h1>
        <p
          className="opacity-75 max-w-xl mx-auto mb-10"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-cream)' }}
        >
          Everything you need to navigate buying, selling, relocating, investing, or making the leap from renting to owning — all in one place.
        </p>
        {/* Section jump links */}
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { href: '#buying', label: 'Buying' },
            { href: '#selling', label: 'Selling' },
            { href: '#relocating', label: 'Relocating' },
            { href: '#investing', label: 'Investing' },
            { href: '#renting', label: 'Renting → Owning' },
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

      {/* Quick Downloads */}
      <section className="py-10 px-4" style={{ background: 'var(--color-cream-dark)' }}>
        <div className="max-w-5xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest text-center font-bold mb-6"
            style={{ color: 'var(--color-charcoal)', opacity: 0.5, fontFamily: 'var(--font-body)' }}
          >
            Download All Guides
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_DOWNLOADS.map((doc) => (
              <a
                key={doc.label}
                href={doc.href}
                download
                className="flex items-center gap-3 rounded-sm p-4 transition-opacity hover:opacity-90"
                style={{ background: doc.color, color: doc.text }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <Download size={16} />
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    {doc.label}
                  </p>
                  <p className="text-xs opacity-70 mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>
                    {doc.sub}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Sections */}
      {SECTIONS.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className="py-16 px-4 scroll-mt-20"
          style={{ background: idx % 2 === 0 ? '#fff' : 'var(--color-cream)' }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

              {/* Left: icon + heading + body */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-maroon)' }}
                  >
                    <section.icon size={18} color="white" />
                  </div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}
                  >
                    {section.eyebrow}
                  </p>
                </div>
                <h2
                  className="text-3xl font-black mb-4"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}
                >
                  {section.title}
                </h2>
                <p
                  className="text-base leading-relaxed opacity-75"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}
                >
                  {section.body}
                </p>

                {/* Related page links */}
                {section.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        href={`${base}${link.href}`}
                        className="inline-block px-4 py-2 rounded-sm text-sm font-bold border transition-colors hover:bg-gray-50"
                        style={{
                          borderColor: 'var(--color-maroon)',
                          color: 'var(--color-maroon)',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {link.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: download buttons */}
              <div className="lg:col-span-2 flex flex-col gap-3">
                {section.downloads.length > 0 ? (
                  <>
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-1"
                      style={{ color: 'var(--color-charcoal)', opacity: 0.45, fontFamily: 'var(--font-body)' }}
                    >
                      Downloads
                    </p>
                    {section.downloads.map((doc) =>
                      doc.href ? (
                        <a
                          key={doc.label}
                          href={doc.href}
                          download
                          className="flex items-center gap-4 rounded-sm p-5 transition-opacity hover:opacity-90"
                          style={
                            doc.style === 'gold'
                              ? { background: 'var(--color-gold)', color: 'var(--color-charcoal)' }
                              : { background: 'var(--color-maroon)', color: 'white' }
                          }
                        >
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: 'rgba(255,255,255,0.15)' }}
                          >
                            <Download size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                              {doc.label}
                            </p>
                            <p className="text-xs opacity-70 mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>
                              {doc.sub}
                            </p>
                          </div>
                        </a>
                      ) : (
                        <div
                          key={doc.label}
                          className="flex items-center gap-4 rounded-sm p-5"
                          style={{
                            border: '2px dashed var(--color-cream-dark)',
                            background: idx % 2 === 0 ? 'var(--color-cream)' : '#fff',
                          }}
                        >
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: 'var(--color-cream-dark)' }}
                          >
                            <BookOpen size={18} style={{ color: 'var(--color-charcoal)', opacity: 0.4 }} />
                          </div>
                          <div>
                            <p
                              className="font-bold text-sm"
                              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)', opacity: 0.5 }}
                            >
                              {doc.label}
                            </p>
                            <p
                              className="text-xs mt-0.5"
                              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)', opacity: 0.4 }}
                            >
                              {doc.sub}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <div
                    className="rounded-sm p-5 text-center"
                    style={{
                      background: idx % 2 === 0 ? 'var(--color-cream)' : '#fff',
                      border: '1px solid var(--color-cream-dark)',
                    }}
                  >
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)', opacity: 0.6 }}
                    >
                      No downloadable guides yet
                    </p>
                    <p
                      className="text-xs opacity-50"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)' }}
                    >
                      Use the page links to explore this topic.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-14 px-4 text-center" style={{ background: 'var(--color-maroon)' }}>
        <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Have questions? Nina has answers.
        </h2>
        <p
          className="opacity-75 mb-6 max-w-md mx-auto"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-cream)' }}
        >
          Whether you are buying, selling, relocating, or investing — Nina responds to every message personally.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`${base}/contact`}
            className="inline-block px-8 py-3.5 rounded-sm font-bold text-base transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-gold)', color: 'var(--color-charcoal)', fontFamily: 'var(--font-body)' }}
          >
            Contact Nina
          </Link>
          <a
            href="tel:5203424124"
            className="inline-block px-8 py-3.5 rounded-sm font-bold text-base text-white border-2 transition-colors hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}
          >
            Call 520.342.4124
          </a>
        </div>
      </section>
    </>
  );
}

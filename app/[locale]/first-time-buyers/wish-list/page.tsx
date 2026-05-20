import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import WishListForm from '@/components/WishListForm';

export const metadata: Metadata = {
  title: 'My Home Wish List | Nina Flores Realty',
  description: 'Build your personalized home wish list and send it directly to Nina Flores, your Tucson REALTOR®. Define your must-haves, nice-to-haves, and budget.',
};

export default async function WishListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const base = locale === 'en' ? '' : '/es';

  return (
    <>
      <div className="py-16 px-4 text-center" style={{ background: 'var(--color-maroon)' }}>
        <p className="text-xs uppercase tracking-widest mb-2 opacity-70" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gold)' }}>
          First Time Home Buyers
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          My Home Wish List
        </h1>
        <p className="text-base opacity-80 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-cream)' }}>
          Fill this out and send it to Nina. It helps her find homes that actually match what you need — not just what's available.
        </p>
      </div>

      <section className="py-16 px-4" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-3xl mx-auto">
          <WishListForm base={base} />
        </div>
      </section>
    </>
  );
}

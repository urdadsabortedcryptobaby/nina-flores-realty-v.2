'use client';

import { Star, ExternalLink } from 'lucide-react';

export default function TestimonialsCarousel() {
  return (
    <section style={{ background: 'var(--color-cream-dark)' }} className="py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-maroon)' }}>
          What Clients Are Saying
        </h2>

        {/* Star display */}
        <div className="flex gap-1 justify-center mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={24} fill="var(--color-gold)" stroke="var(--color-gold)" />
          ))}
        </div>

        <p className="text-xl italic mb-2" style={{ fontFamily: 'var(--font-script)', color: 'var(--color-charcoal)', fontSize: '1.3rem' }}>
          Be the first to review Nina!
        </p>
        <p className="text-sm opacity-60 mb-8" style={{ fontFamily: 'var(--font-body)' }}>
          Had a great experience working with Nina? Share it on RateMyAgent and help other families find their trusted REALTOR®.
        </p>

        <a
          href="https://www.ratemyagent.com/real-estate-agent/nina-flores-b3992y/sales/overview"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold text-sm transition-opacity hover:opacity-90"
          style={{ background: 'var(--color-maroon)', color: 'var(--color-cream)', fontFamily: 'var(--font-body)' }}
        >
          Leave a Review on RateMyAgent <ExternalLink size={14} />
        </a>
      </div>
    </section>
  );
}

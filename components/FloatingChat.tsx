'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FloatingChat({ locale }: { locale: string }) {
  const base = locale === 'en' ? '' : '/es';
  return (
    <Link
      href={`${base}/contact`}
      className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-1.5 group"
      aria-label="Chat with Nina"
    >
      <div className="relative">
        <div
          className="w-14 h-14 rounded-full overflow-hidden shadow-lg transition-transform group-hover:scale-105"
          style={{ border: '2.5px solid var(--color-gold)' }}
        >
          <Image
            src="/nina-flores.jpg"
            alt="Nina Flores"
            width={56}
            height={56}
            className="object-cover object-top w-full h-full"
          />
        </div>
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
      </div>
      <span
        className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-md transition-transform group-hover:scale-105"
        style={{ background: 'var(--color-maroon)', fontFamily: 'var(--font-body)' }}
      >
        Chat Now
      </span>
    </Link>
  );
}

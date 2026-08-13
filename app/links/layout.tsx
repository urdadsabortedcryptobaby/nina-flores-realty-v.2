import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ninafloresrealty.com'),
  title: 'Nina Flores | Links',
  description:
    'One place for everything Nina Flores — Tucson real estate, the El Tucsonan podcast, Coyote Flower Thrift, Jewelry Mail Club, and more.',
  openGraph: {
    title: 'Nina Flores | Links',
    description: 'Everything Nina Flores in one place.',
    images: [{ url: '/nina-flores.jpg', width: 1200, height: 630, alt: 'Nina Flores' }],
  },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,400;1,400;1,600&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

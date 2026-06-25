/**
 * RealEstateAgent structured data (JSON-LD).
 * Helps Google show rich local results — Nina's name, photo, phone, office,
 * service area, and brokerage — and strengthens local SEO.
 *
 * Rendered as a native <script type="application/ld+json"> per Next.js guidance.
 * The `.replace(/</g, '\\u003c')` scrubs any "<" to prevent XSS via the JSON payload.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ninafloresrealty.com';

const realEstateAgentSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `${SITE_URL}/#nina-flores`,
  name: 'Nina Flores',
  alternateName: 'Nina Flores Realty',
  description:
    'Nina Flores is a bilingual (English/Spanish) REALTOR® in Tucson, AZ with Omni Homes International, specializing in first-time buyers, luxury properties, relocation, investment, and helping renters become homeowners.',
  url: SITE_URL,
  image: `${SITE_URL}/nina-flores.jpg`,
  logo: `${SITE_URL}/nina-logo-footer.png`,
  telephone: '+1-520-342-4124',
  email: 'ninafloresrealty@gmail.com',
  priceRange: '$$',
  knowsLanguage: ['English', 'Spanish'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7445 N Oracle Rd #201',
    addressLocality: 'Tucson',
    addressRegion: 'AZ',
    postalCode: '85704',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Tucson' },
    { '@type': 'City', name: 'Oro Valley' },
    { '@type': 'City', name: 'Marana' },
    { '@type': 'City', name: 'Sahuarita' },
    { '@type': 'City', name: 'Vail' },
  ],
  memberOf: {
    '@type': 'Organization',
    name: 'Omni Homes International',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61575470225036',
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(realEstateAgentSchema).replace(/</g, '\\u003c'),
      }}
    />
  );
}

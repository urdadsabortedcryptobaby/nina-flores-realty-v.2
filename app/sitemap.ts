import type { MetadataRoute } from 'next';
import { NEIGHBORHOODS } from '@/lib/neighborhoods';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ninafloresrealty.com';

// Every crawlable page on the site (English paths; Spanish is added as an alternate).
const STATIC_PAGES = [
  '',
  '/about',
  '/contact',
  '/buying',
  '/selling',
  '/selling/checklist',
  '/selling/home-worth',
  '/first-time-buyers',
  '/first-time-buyers/process',
  '/first-time-buyers/prequalify',
  '/first-time-buyers/tips',
  '/first-time-buyers/wish-list',
  '/investing',
  '/investment',
  '/rent-trap',
  '/new-builds',
  '/neighborhoods',
  '/specialties',
  '/resources',
  '/events',
  '/blog',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PAGES) {
    entries.push({
      url: `${BASE}${page}`,
      lastModified,
      // The homepage is the most important page; everything else gets standard priority.
      priority: page === '' ? 1 : 0.8,
      alternates: { languages: { es: `${BASE}/es${page}` } },
    });
  }

  for (const n of NEIGHBORHOODS) {
    entries.push({
      url: `${BASE}/neighborhoods/${n.slug}`,
      lastModified,
      priority: 0.6,
      alternates: { languages: { es: `${BASE}/es/neighborhoods/${n.slug}` } },
    });
  }

  return entries;
}

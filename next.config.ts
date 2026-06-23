import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const securityHeaders = [
  // Prevents other sites from embedding your site in an iframe (clickjacking protection)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Stops browsers from guessing file types — prevents MIME-sniffing attacks
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Controls how much referrer info is sent when clicking links off your site
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disables browser features your site doesn't use (camera, mic, GPS)
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Forces HTTPS for 2 years — safe because Vercel always serves HTTPS
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

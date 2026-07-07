import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:locale(he|en)/automation',
        destination: '/:locale/business-automation',
        permanent: true,
      },
      {
        source: '/:locale(he|en)/about',
        destination: '/:locale/about-us',
        permanent: true,
      },
      {
        source: '/:locale(he|en)/privacy',
        destination: '/:locale/privacy-policy',
        permanent: true,
      },
      {
        source: '/:locale(he|en)/accessibility',
        destination: '/:locale/accessibility-statement',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

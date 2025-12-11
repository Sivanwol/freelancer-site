import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  // Optimize for Railway deployment
  output: 'standalone',
  // Ensure proper error handling
  reactStrictMode: true,
  // Optimize production builds
  swcMinify: true,
  // Add error handling for production
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Ensure proper static generation
  generateBuildId: async () => {
    // Use a consistent build ID for better caching
    return process.env.BUILD_ID || `build-${Date.now()}`;
  },
};

export default withNextIntl(nextConfig);



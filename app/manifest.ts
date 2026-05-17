import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DevCo Solutions - Software Development and Automation',
    short_name: 'DevCo Solutions',
    description: 'Custom software development, AI products, business automation, CRM workflows, integrations, and dashboards.',
    start_url: '/',
    display: 'standalone',
    background_color: siteConfig.theme.background,
    theme_color: siteConfig.theme.background,
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}

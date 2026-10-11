import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DevCo Solutions — RAG chat repair & product engineering',
    short_name: 'DevCo',
    description:
      'Senior engineer for live RAG chat repair in SaaS and full-stack product builds. Hebrew-first site at /he.',
    start_url: '/he',
    display: 'standalone',
    background_color: siteConfig.theme.background,
    theme_color: siteConfig.theme.background,
    lang: 'he',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}

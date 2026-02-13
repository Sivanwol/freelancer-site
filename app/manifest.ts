import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sivan Wolberg - Full Stack & AI Developer',
    short_name: 'Sivan Wolberg',
    description: '15+ Years Experience | Top Rated Plus on Upwork | React | Node.js | Python | LangChain | Claude Code',
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

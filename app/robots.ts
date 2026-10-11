import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'anthropic-ai', 'Google-Extended', 'PerplexityBot'],
        allow: ['/', '/llms.txt', '/he', '/he/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

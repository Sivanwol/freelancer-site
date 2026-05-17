import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const paths = ['', '/software-development', '/automation', '/about'];

  return paths.flatMap((path) => [
    {
      url: `${baseUrl}/he${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.85,
      alternates: {
        languages: {
          he: `${baseUrl}/he${path}`,
          en: `${baseUrl}/en${path}`,
        },
      },
    },
    {
      url: `${baseUrl}/en${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 0.95 : 0.8,
      alternates: {
        languages: {
          he: `${baseUrl}/he${path}`,
          en: `${baseUrl}/en${path}`,
        },
      },
    },
  ]);
}

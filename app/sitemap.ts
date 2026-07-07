import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/config';
import { publicSitemapPaths, sitePaths } from '@/lib/site-paths';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return publicSitemapPaths.flatMap((path) => [
    {
      url: `${baseUrl}/he${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === sitePaths.home ? 1 : 0.85,
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
      priority: path === sitePaths.home ? 0.95 : 0.8,
      alternates: {
        languages: {
          he: `${baseUrl}/he${path}`,
          en: `${baseUrl}/en${path}`,
        },
      },
    },
  ]);
}

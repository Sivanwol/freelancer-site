import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/config';
import { publicSitemapPaths, sitePaths } from '@/lib/site-paths';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return publicSitemapPaths.flatMap((path) => {
    const normalizedPath = path === '/' ? '' : path;
    const heUrl = `${baseUrl}/he${normalizedPath}`;
    const enUrl = `${baseUrl}/en${normalizedPath}`;
    const languages = {
      he: heUrl,
      en: enUrl,
      'x-default': heUrl,
    };

    return [
      {
        url: heUrl,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: path === sitePaths.home ? 1 : 0.85,
        alternates: { languages },
      },
      {
        url: enUrl,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: path === sitePaths.home ? 0.95 : 0.8,
        alternates: { languages },
      },
    ];
  });
}

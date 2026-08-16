import { MetadataRoute } from 'next';
import { englishLocaleEnabled } from '@/i18n/config';
import { getBaseUrl } from '@/lib/config';
import { publicSitemapPaths, sitePaths } from '@/lib/site-paths';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return publicSitemapPaths.flatMap((path) => {
    const normalizedPath = path === '/' ? '' : path;
    const heUrl = `${baseUrl}/he${normalizedPath}`;
    const enUrl = `${baseUrl}/en${normalizedPath}`;
    const languages = englishLocaleEnabled
      ? {
          he: heUrl,
          en: enUrl,
          'x-default': heUrl,
        }
      : {
          he: heUrl,
          'x-default': heUrl,
        };

    const hebrewEntry = {
      url: heUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === sitePaths.home ? 1 : 0.85,
      alternates: { languages },
    };

    if (!englishLocaleEnabled) {
      return [hebrewEntry];
    }

    return [
      hebrewEntry,
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

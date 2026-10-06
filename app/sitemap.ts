import { MetadataRoute } from 'next';
import { englishLocaleEnabled } from '@/i18n/config';
import { getBaseUrl } from '@/lib/config';
import { blogPostPath } from '@/lib/seo';
import { publicSitemapPaths, sitemapPriority, staticContentUpdatedAt } from '@/lib/site-paths';
import { getSoroArticles, isWave1Slug } from '@/lib/soro';

export const revalidate = 3600;

function languageAlternates(heUrl: string, enUrl: string) {
  return englishLocaleEnabled
    ? { he: heUrl, en: enUrl, 'x-default': heUrl }
    : { he: heUrl, 'x-default': heUrl };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const staticEntries = publicSitemapPaths.flatMap((path) => {
    const normalizedPath = path === '/' ? '' : path;
    const heUrl = `${baseUrl}/he${normalizedPath}`;
    const enUrl = `${baseUrl}/en${normalizedPath}`;
    const languages = languageAlternates(heUrl, enUrl);
    const lastModified = new Date(staticContentUpdatedAt[path]);
    const priority = sitemapPriority(path);

    const hebrewEntry = {
      url: heUrl,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority,
      alternates: { languages },
    };

    if (!englishLocaleEnabled) {
      return [hebrewEntry];
    }

    return [
      hebrewEntry,
      {
        url: enUrl,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority,
        alternates: { languages },
      },
    ];
  });

  const articles = await getSoroArticles();
  const postEntries = articles
    .filter((article) => isWave1Slug(article.slug))
    .map((article) => {
      const path = blogPostPath(article.slug);
      const heUrl = `${baseUrl}/he${path}`;
      const enUrl = `${baseUrl}/en${path}`;
      const languages = languageAlternates(heUrl, enUrl);
      const lastModified = new Date(article.isoDate);
      const hebrewEntry = {
        url: heUrl,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: { languages },
      };

      if (!englishLocaleEnabled) {
        return hebrewEntry;
      }

      return [hebrewEntry, { ...hebrewEntry, url: enUrl, alternates: { languages } }];
    })
    .flat();

  return [...staticEntries, ...postEntries];
}

import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/config';
import { sitePaths } from '@/lib/site-paths';

type SitePath = (typeof sitePaths)[keyof typeof sitePaths];

/**
 * Locale-prefixed canonical + hreflang alternates.
 * x-default always points at the Hebrew (/he) URL to match localePrefix: 'always'.
 */
export function getLocaleAlternates(
  locale: string,
  path: SitePath = sitePaths.home,
): NonNullable<Metadata['alternates']> {
  const baseUrl = getBaseUrl();
  const normalizedPath = path === '/' ? '' : path;
  const heUrl = `${baseUrl}/he${normalizedPath}`;
  const enUrl = `${baseUrl}/en${normalizedPath}`;
  const canonical = `${baseUrl}/${locale}${normalizedPath}`;

  return {
    canonical,
    languages: {
      he: heUrl,
      en: enUrl,
      'x-default': heUrl,
    },
  };
}

import type { Metadata } from 'next';
import { englishLocaleEnabled } from '@/i18n/config';
import { getBaseUrl } from '@/lib/config';
import { sitePaths } from '@/lib/site-paths';

type SitePath = (typeof sitePaths)[keyof typeof sitePaths];

/**
 * Locale-prefixed canonical + hreflang alternates.
 * x-default always points at the Hebrew (/he) URL to match localePrefix: 'always'.
 * While English is paused, canonicals and hreflang stay Hebrew-only.
 */
export function getLocaleAlternates(
  locale: string,
  path: SitePath = sitePaths.home,
): NonNullable<Metadata['alternates']> {
  const baseUrl = getBaseUrl();
  const normalizedPath = path === '/' ? '' : path;
  const heUrl = `${baseUrl}/he${normalizedPath}`;
  const enUrl = `${baseUrl}/en${normalizedPath}`;
  const canonical = englishLocaleEnabled
    ? `${baseUrl}/${locale}${normalizedPath}`
    : heUrl;

  if (!englishLocaleEnabled) {
    return {
      canonical,
      languages: {
        he: heUrl,
        'x-default': heUrl,
      },
    };
  }

  return {
    canonical,
    languages: {
      he: heUrl,
      en: enUrl,
      'x-default': heUrl,
    },
  };
}

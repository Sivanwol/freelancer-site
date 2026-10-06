import type { Metadata } from 'next';
import { englishLocaleEnabled } from '@/i18n/config';
import { getBaseUrl, siteConfig } from '@/lib/config';
import { sitePaths } from '@/lib/site-paths';

/**
 * Locale-prefixed canonical + hreflang alternates.
 * x-default always points at the Hebrew (/he) URL to match localePrefix: 'always'.
 * While English is paused, canonicals and hreflang stay Hebrew-only.
 *
 * `path` is a locale-relative path (`/` or `/rag-production` or `/blog/${encodedSlug}`).
 */
export function getLocaleAlternates(
  locale: string,
  path: string = sitePaths.home,
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

export function blogPostPath(slug: string): string {
  return `${sitePaths.blog}/${encodeURIComponent(slug)}`;
}

type PageImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

type BuildPageMetadataInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
  imageAlt?: string;
  /** Page-specific image. Defaults to the generated OG/Twitter routes. */
  image?: PageImage;
  robots?: Metadata['robots'];
  openGraphType?: 'website' | 'article';
};

function canonicalUrl(alternates: NonNullable<Metadata['alternates']>, fallback: string): string {
  return typeof alternates.canonical === 'string' ? alternates.canonical : fallback;
}

/**
 * Page-scoped title, description, canonical, Open Graph, and Twitter tags.
 * Child pages must call this so they do not inherit the homepage social tags.
 * twitter:site and twitter:creator are omitted — no X handle is configured.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  imageAlt,
  image,
  robots,
  openGraphType = 'website',
}: BuildPageMetadataInput): Metadata {
  const baseUrl = getBaseUrl();
  const alternates = getLocaleAlternates(locale, path);
  const url = canonicalUrl(alternates, `${baseUrl}/he${path === '/' ? '' : path}`);
  const alt = imageAlt ?? title;
  const openGraphImage = image ?? {
    url: '/opengraph-image',
    width: 1200,
    height: 630,
    alt,
  };
  const twitterImage = image?.url ?? '/twitter-image';

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === 'he' ? 'he_IL' : 'en_US',
      type: openGraphType,
      images: [
        {
          url: openGraphImage.url,
          alt: openGraphImage.alt || alt,
          ...(openGraphImage.width ? { width: openGraphImage.width } : {}),
          ...(openGraphImage.height ? { height: openGraphImage.height } : {}),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [twitterImage],
    },
    ...(robots ? { robots } : {}),
  };
}

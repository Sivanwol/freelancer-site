import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { englishLocaleEnabled } from '@/i18n/config';
import { routing } from '@/i18n/routing';
import { siteConfig, getBaseUrl } from '@/lib/config';
import { blogPostPath, buildPageMetadata } from '@/lib/seo';
import { sitePaths } from '@/lib/site-paths';
import { getSoroArticleBySlug, getSoroArticles, isWave1Slug } from '@/lib/soro';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SiteChrome } from '@/components/site-chrome';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = true;
export const revalidate = 3600;

function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export async function generateStaticParams() {
  const articles = await getSoroArticles();
  const locales = englishLocaleEnabled ? routing.locales : (['he'] as const);
  return locales.flatMap((locale) =>
    articles.map((article) => ({
      locale,
      slug: article.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = (await getSoroArticles()).find((item) => item.slug === decodeSlug(slug));
  if (!article) {
    return {
      title: 'DevCo',
      robots: { index: false, follow: false },
    };
  }

  const indexable = isWave1Slug(article.slug);

  return buildPageMetadata({
    locale,
    path: blogPostPath(article.slug),
    title: `${article.title} | DevCo`,
    description: article.excerpt,
    imageAlt: article.title,
    image: article.image
      ? { url: article.image, alt: article.title }
      : undefined,
    openGraphType: 'article',
    robots: {
      index: indexable,
      follow: true,
      googleBot: {
        index: indexable,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = await getSoroArticleBySlug(decodeSlug(slug));
  if (!article) {
    notFound();
  }

  const baseUrl = getBaseUrl();
  const canonical = `${baseUrl}/he${blogPostPath(article.slug)}`;
  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    datePublished: article.isoDate,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: siteConfig.author,
    },
    ...(article.image ? { image: article.image } : {}),
    mainEntityOfPage: canonical,
  };

  return (
    <ErrorBoundary>
      <SiteChrome locale={locale}>
        <main id="main-content" className="min-h-screen bg-[#f8fbff] pb-20 pt-32">
          <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
            />
            <p className="text-sm font-bold text-[#718198]">
              <Link href={sitePaths.blog} className="hover:text-[#1d72d2]">
                {locale === 'he' ? 'בלוג' : 'Blog'}
              </Link>
            </p>
            <h1 className="hero-display mt-4 text-4xl font-black leading-[1.05] text-[#0d1626] md:text-5xl">{article.title}</h1>
            <p className="mt-4 text-sm font-bold text-[#718198]">
              <time dateTime={article.isoDate}>{article.date || article.isoDate.slice(0, 10)}</time>
            </p>
            {article.excerpt ? (
              <p className="mt-6 text-lg font-semibold leading-8 text-[#526174]">{article.excerpt}</p>
            ) : null}
            {article.image ? (
              // Soro hosts the featured image; a plain img avoids a remote-image allowlist.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.image}
                alt={article.title}
                className="mt-8 w-full rounded-[28px] border border-[#dbe7f5] object-cover"
              />
            ) : null}
            <div
              className="article-body mt-10 text-base font-medium leading-8 text-[#243044]"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          </article>
        </main>
      </SiteChrome>
    </ErrorBoundary>
  );
}

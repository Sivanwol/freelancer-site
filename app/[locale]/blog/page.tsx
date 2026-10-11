import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { getCompanyContent } from '@/lib/company-content';
import { buildPageMetadata } from '@/lib/seo';
import { sitePaths } from '@/lib/site-paths';
import { getSoroArticles, isWave1Slug, type SoroArticleMeta } from '@/lib/soro';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SiteChrome } from '@/components/site-chrome';

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = getCompanyContent(locale);

  return buildPageMetadata({
    locale,
    path: sitePaths.blog,
    title: content.blog.title,
    description: content.blog.subtitle,
    imageAlt: content.blog.title,
  });
}

function ArticleList({ articles }: { articles: SoroArticleMeta[] }) {
  return (
    <ul className="grid gap-4">
      {articles.map((article) => (
        <li key={article.id}>
          <article className="rounded-[28px] border border-stone-800 bg-stone-900/75 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-600">
            <p className="text-sm font-bold text-stone-500">
              <time dateTime={article.isoDate}>{article.date || article.isoDate.slice(0, 10)}</time>
            </p>
            <h2 className="mt-2 text-2xl font-black leading-snug text-stone-100">
              <Link href={`${sitePaths.blog}/${article.slug}`} className="hover:text-amber-500">
                {article.title}
              </Link>
            </h2>
            {article.excerpt ? (
              <p className="mt-3 text-base font-medium leading-8 text-stone-400">{article.excerpt}</p>
            ) : null}
          </article>
        </li>
      ))}
    </ul>
  );
}

export default async function BlogIndex({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getCompanyContent(locale);
  const articles = await getSoroArticles();
  const wave1 = articles.filter((article) => isWave1Slug(article.slug));
  const rest = articles.filter((article) => !isWave1Slug(article.slug));

  return (
    <ErrorBoundary>
      <SiteChrome locale={locale}>
        <main id="main-content" className="min-h-screen bg-stone-950/40 pb-20 pt-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="hero-display text-5xl font-black leading-[0.95] text-stone-100 md:text-6xl">{content.blog.title}</h1>
            <p className="mt-6 text-lg font-semibold leading-8 text-stone-400">{content.blog.subtitle}</p>
            <p className="mt-8 max-w-3xl text-base font-medium leading-8 text-stone-400">
              {locale === 'he'
                ? 'רשימת המאמרים נטענת בשרת (SSR) כדי שמנועי חיפוש ועוזרי AI יוכלו לקרוא כותרות ותקצירים בלי JavaScript.'
                : 'Article titles and excerpts are server-rendered so search engines and AI assistants can read them without JavaScript.'}
            </p>
            <div className="mt-10">
              {wave1.length > 0 ? (
                <ArticleList articles={wave1} />
              ) : (
                <p className="rounded-[24px] border border-stone-800 bg-stone-900/75 p-6 text-base font-medium text-stone-400">
                  {locale === 'he' ? 'מאמרים יופיעו כאן בקרוב.' : 'Articles will appear here shortly.'}
                </p>
              )}
            </div>
            {rest.length > 0 ? (
              <div className="mt-12">
                <ArticleList articles={rest} />
              </div>
            ) : null}
          </div>
        </main>
      </SiteChrome>
    </ErrorBoundary>
  );
}

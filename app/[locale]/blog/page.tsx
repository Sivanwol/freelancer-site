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
          <article className="rounded-[28px] border border-[#dbe7f5] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#4c9df2]">
            <p className="text-sm font-bold text-[#718198]">
              <time dateTime={article.isoDate}>{article.date || article.isoDate.slice(0, 10)}</time>
            </p>
            <h2 className="mt-2 text-2xl font-black leading-snug text-[#0d1626]">
              <Link href={`${sitePaths.blog}/${article.slug}`} className="hover:text-[#1d72d2]">
                {article.title}
              </Link>
            </h2>
            {article.excerpt ? (
              <p className="mt-3 text-base font-medium leading-8 text-[#526174]">{article.excerpt}</p>
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
        <main id="main-content" className="min-h-screen bg-[#f8fbff] pb-20 pt-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="hero-display text-5xl font-black leading-[0.95] text-[#0d1626] md:text-6xl">{content.blog.title}</h1>
            <p className="mt-6 text-lg font-semibold leading-8 text-[#526174]">{content.blog.subtitle}</p>
            <div className="mt-10">
              <ArticleList articles={wave1} />
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

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getBaseUrl } from '@/lib/config';
import { getCompanyContent } from '@/lib/company-content';
import { sitePaths } from '@/lib/site-paths';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SiteChrome } from '@/components/site-chrome';
import LazySoroEmbed from '@/components/blog/lazy-soro-embed';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = getCompanyContent(locale);
  const baseUrl = getBaseUrl();

  return {
    title: content.blog.title,
    description: content.blog.subtitle,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}${sitePaths.blog}`,
      languages: {
        he: `${baseUrl}/he${sitePaths.blog}`,
        en: `${baseUrl}/en${sitePaths.blog}`,
      },
    },
    openGraph: {
      title: content.blog.title,
      description: content.blog.subtitle,
      url: `${baseUrl}/${locale}${sitePaths.blog}`,
      type: 'website',
    },
  };
}

export default async function BlogIndex({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ErrorBoundary>
      <SiteChrome locale={locale}>
        <main className="min-h-screen bg-[#f8fbff] pb-20 pt-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <LazySoroEmbed />
          </div>
        </main>
      </SiteChrome>
    </ErrorBoundary>
  );
}

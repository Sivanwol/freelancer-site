import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getCompanyContent } from '@/lib/company-content';
import { buildPageMetadata } from '@/lib/seo';
import { sitePaths } from '@/lib/site-paths';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SiteChrome } from '@/components/site-chrome';
import { HomePage } from '@/components/company/CompanySections';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = getCompanyContent(locale);

  return buildPageMetadata({
    locale,
    path: sitePaths.home,
    title: content.meta.defaultTitle,
    description: content.meta.defaultDescription,
    imageAlt: content.meta.defaultTitle,
  });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ErrorBoundary>
      <SiteChrome locale={locale}>
        <HomePage locale={locale} />
      </SiteChrome>
    </ErrorBoundary>
  );
}

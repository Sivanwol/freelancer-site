import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getCompanyContent } from '@/lib/company-content';
import { buildPageMetadata } from '@/lib/seo';
import { sitePaths } from '@/lib/site-paths';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SiteChrome } from '@/components/site-chrome';
import { RagProductionPage } from '@/components/company/CompanySections';

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
    path: sitePaths.ragProduction,
    title: content.meta.ragTitle,
    description: content.meta.ragDescription,
    imageAlt: content.meta.ragTitle,
  });
}

export default async function RagProduction({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ErrorBoundary>
      <SiteChrome locale={locale}>
        <RagProductionPage locale={locale} />
      </SiteChrome>
    </ErrorBoundary>
  );
}

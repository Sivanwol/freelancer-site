import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getBaseUrl } from '@/lib/config';
import { getCompanyContent } from '@/lib/company-content';
import { getLocaleAlternates } from '@/lib/seo';
import { sitePaths } from '@/lib/site-paths';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SiteChrome } from '@/components/site-chrome';
import { ServicePage } from '@/components/company/CompanySections';

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
    title: content.meta.softwareTitle,
    description: content.meta.softwareDescription,
    metadataBase: new URL(baseUrl),
    alternates: getLocaleAlternates(locale, sitePaths.softwareDevelopment),
  };
}

export default async function SoftwareDevelopment({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ErrorBoundary>
      <SiteChrome locale={locale}>
        <ServicePage locale={locale} type="software" />
      </SiteChrome>
    </ErrorBoundary>
  );
}

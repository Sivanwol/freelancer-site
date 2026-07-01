import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getBaseUrl } from '@/lib/config';
import { getCompanyContent } from '@/lib/company-content';
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
    alternates: {
      canonical: `${baseUrl}/${locale}/software-development`,
      languages: {
        he: `${baseUrl}/he/software-development`,
        en: `${baseUrl}/en/software-development`,
      },
    },
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

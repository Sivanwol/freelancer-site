import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getBaseUrl } from '@/lib/config';
import { getCompanyContent } from '@/lib/company-content';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AboutPage } from '@/components/company/CompanySections';

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
    title: content.meta.aboutTitle,
    description: content.meta.aboutDescription,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/about`,
      languages: {
        he: `${baseUrl}/he/about`,
        en: `${baseUrl}/en/about`,
      },
    },
  };
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ErrorBoundary>
      <Navbar />
      <FloatingCTA />
      <AboutPage locale={locale} />
      <Footer />
    </ErrorBoundary>
  );
}

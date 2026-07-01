import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SiteChrome } from '@/components/site-chrome';
import { HomePage } from '@/components/company/CompanySections';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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

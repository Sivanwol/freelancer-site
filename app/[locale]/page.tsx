import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { ErrorBoundary } from '@/components/ErrorBoundary';
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[6px] focus:bg-sky-500 focus:px-4 focus:py-2 focus:text-slate-950 focus:outline-none"
      >
        {locale === 'he' ? 'דלג לתוכן' : 'Skip to content'}
      </a>
      <Navbar />
      <FloatingCTA />
      <HomePage locale={locale} />
      <Footer />
    </ErrorBoundary>
  );
}

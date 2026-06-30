import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getBaseUrl } from '@/lib/config';
import { getCompanyContent } from '@/lib/company-content';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import SoroEmbed from '@/components/blog/soro-embed';

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
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        he: `${baseUrl}/he/blog`,
        en: `${baseUrl}/en/blog`,
      },
    },
    openGraph: {
      title: content.blog.title,
      description: content.blog.subtitle,
      url: `${baseUrl}/${locale}/blog`,
      type: 'website',
    },
  };
}

export default async function BlogIndex({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ErrorBoundary>
      <Navbar />
      <FloatingCTA />
      <main className="min-h-screen bg-[#f8fbff] pb-20 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SoroEmbed />
        </div>
      </main>
      <Footer />
    </ErrorBoundary>
  );
}

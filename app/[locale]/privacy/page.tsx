import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getBaseUrl } from '@/lib/config';
import { getCompanyContent } from '@/lib/company-content';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { ErrorBoundary } from '@/components/ErrorBoundary';

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
    title: content.meta.privacyTitle,
    description: content.meta.privacyDescription,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/privacy`,
      languages: {
        he: `${baseUrl}/he/privacy`,
        en: `${baseUrl}/en/privacy`,
      },
    },
  };
}

export default async function Privacy({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getCompanyContent(locale);

  return (
    <ErrorBoundary>
      <Navbar />
      <FloatingCTA />
      <main id="main-content" className="min-h-screen bg-[#f8fbff] text-[#0d1626]">
        <section className="relative overflow-hidden bg-[#f8fbff] pt-28">
          <div className="tech-grid" aria-hidden="true" />
          <div className="site-container relative z-10 pb-12 pt-10">
            <div className="max-w-4xl">
              <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.2em] text-[#1d72d2]">
                {content.brand.name}
              </p>
              <h1 className="hero-display text-5xl font-black leading-[0.9] text-[#0d1626] md:text-7xl">
                {content.privacyPage.title}
              </h1>
              <p className="mt-5 text-sm font-extrabold text-[#1d72d2]">{content.privacyPage.updated}</p>
              <p className="mt-7 max-w-3xl text-lg font-semibold leading-8 text-[#526174] md:text-xl md:leading-9">
                {content.privacyPage.intro}
              </p>
            </div>
          </div>
        </section>

        <section className="site-section bg-white">
          <div className="site-container">
            <div className="grid gap-5">
              {content.privacyPage.sections.map((section, index) => (
                <article key={section.title} className="rounded-[28px] border border-[#dbe7f5] bg-[#f8fbff] p-6 shadow-sm md:p-8">
                  <p className="text-sm font-black text-[#1d72d2]">{String(index + 1).padStart(2, '0')}</p>
                  <h2 className="mt-4 text-3xl font-black leading-tight text-[#0d1626]">{section.title}</h2>
                  <p className="mt-4 text-base font-medium leading-8 text-[#526174] md:text-lg">{section.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </ErrorBoundary>
  );
}

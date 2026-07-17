import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getBaseUrl } from '@/lib/config';
import { getCompanyContent } from '@/lib/company-content';
import { sitePaths } from '@/lib/site-paths';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SiteChrome } from '@/components/site-chrome';
import ContactForm from '@/components/contact-form';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { FaEnvelope, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ source?: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = getCompanyContent(locale);
  const baseUrl = getBaseUrl();

  return {
    title: content.meta.contactTitle,
    description: content.meta.contactDescription,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}${sitePaths.contact}`,
      languages: {
        he: `${baseUrl}/he${sitePaths.contact}`,
        en: `${baseUrl}/en${sitePaths.contact}`,
      },
    },
  };
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const content = getCompanyContent(locale);
  const source = query.source?.trim() || 'contact-page';

  return (
    <ErrorBoundary>
      <SiteChrome locale={locale}>
        <main id="main-content" className="min-h-screen overflow-hidden bg-[#f8fbff] text-[#0d1626]">
          <section className="relative bg-[#f8fbff] pt-28">
            <div className="tech-grid" aria-hidden="true" />
            <div className="site-container relative z-10 grid gap-10 pb-16 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.2em] text-[#1d72d2]">
                  {content.cta.contact}
                </p>
                <h1 className="hero-display max-w-3xl text-5xl font-black leading-[0.95] text-[#0d1626] md:text-7xl">
                  {content.contact.title}
                </h1>
                <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-[#526174] md:text-xl md:leading-9">
                  {content.contact.subtitle}
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <a href={`mailto:${content.brand.email}`} className="contact-link">
                    <FaEnvelope aria-hidden="true" />
                    <span>{content.contact.email}</span>
                  </a>
                  <a
                    href={buildWhatsAppUrl(content.brand.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <FaWhatsapp aria-hidden="true" />
                    <span>{content.contact.whatsapp}</span>
                  </a>
                  <a
                    href={content.brand.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <FaLinkedinIn aria-hidden="true" />
                    <span>{content.contact.linkedin}</span>
                  </a>
                </div>
              </div>
              <div className="rounded-[32px] border border-[#dbe7f5] bg-white p-6 shadow-2xl shadow-blue-950/5 md:p-8">
                <h2 className="mb-6 text-2xl font-black text-[#0d1626]">{content.contact.form.title}</h2>
                <ContactForm source={source} />
              </div>
            </div>
          </section>
        </main>
      </SiteChrome>
    </ErrorBoundary>
  );
}

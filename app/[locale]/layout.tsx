import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.devco-solution.online';

  return {
    title: t('title'),
    description: t('description'),
    keywords: ['Full Stack Developer', 'AI Developer', 'React', 'Node.js', 'Python', 'LangChain', 'Claude Code', 'Cursor', 'Freelancer', 'Haifa', 'Israel'],
    authors: [{ name: 'Sivan Wolberg' }],
    creator: 'Sivan Wolberg',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'he': '/he',
        'en': '/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: baseUrl,
      siteName: 'Sivan Wolberg Portfolio',
      locale: locale === 'he' ? 'he_IL' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'he' ? 'rtl' : 'ltr';

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sivan Wolberg',
    jobTitle: 'Full Stack & AI Developer',
    description: '15+ Years Full-Stack & AI Developer specializing in React, Node.js, Python, and LangChain',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.devco-solution.online',
    email: 'fastwings@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Haifa',
      addressCountry: 'Israel',
    },
    sameAs: [
      'https://www.linkedin.com/in/swolberg',
      'https://upwork.com/freelancers/swolberg',
    ],
    knowsAbout: [
      'Full Stack Development',
      'AI Development',
      'React',
      'Node.js',
      'Python',
      'LangChain',
      'Next.js',
      'NestJS',
      'TypeScript',
      'Claude Code',
      'Cursor AI',
    ],
  };

  return (
    <html lang={locale} dir={dir}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}




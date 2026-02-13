import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { siteConfig, getBaseUrl } from '@/lib/config';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import '../globals.css';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Locale = (typeof routing.locales)[number];

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const baseUrl = getBaseUrl();

  return {
    title: t('title'),
    description: t('description'),
    keywords: ['Full Stack Developer', 'AI Developer', 'React', 'Node.js', 'Python', 'LangChain', 'Claude Code', 'Cursor', 'Freelancer', 'Haifa', 'Israel'],
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
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
      siteName: siteConfig.name,
      locale: locale === 'he' ? 'he_IL' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/twitter-image'],
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
    icons: {
      icon: '/favicon.png',
      apple: '/favicon.png',
    },
    verification: {
      google: siteConfig.verification.google,
    },
    other: {
      'theme-color': siteConfig.theme.background,
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

  // Validate locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === 'he' ? 'rtl' : 'ltr';
  const baseUrl = getBaseUrl();

  // Structured data for SEO — all values are from trusted siteConfig constants, safe for injection
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author,
    jobTitle: siteConfig.jobTitle,
    description: '15+ Years Full-Stack & AI Developer specializing in React, Node.js, Python, and LangChain',
    url: baseUrl,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Haifa',
      addressCountry: 'Israel',
    },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.upwork,
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

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: baseUrl,
    inLanguage: [locale === 'he' ? 'he-IL' : 'en-US'],
    author: {
      '@type': 'Person',
      name: siteConfig.author,
    },
  };

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'DevCo Solution',
    provider: {
      '@type': 'Person',
      name: siteConfig.author,
    },
    areaServed: 'Worldwide',
    serviceType: ['Full Stack Development', 'AI Development', 'Backend API Development'],
    url: baseUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Haifa',
      addressCountry: 'Israel',
    },
  };

  // Critical inline CSS uses only trusted constant values from siteConfig (no user input)
  const criticalCss = `
    body {
      background-color: ${siteConfig.theme.background} !important;
      color: ${siteConfig.theme.foreground} !important;
      margin: 0;
      padding: 0;
    }
    html {
      background-color: ${siteConfig.theme.background} !important;
    }
  `;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://www.linkedin.com" />
        <link rel="preconnect" href="https://upwork.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://upwork.com" />
        <meta name="theme-color" content={siteConfig.theme.background} />
        {/* Critical CSS — values sourced from trusted siteConfig constants only */}
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personSchema, websiteSchema, professionalServiceSchema]) }}
          suppressHydrationWarning
        />
      </head>
      <body className="antialiased" suppressHydrationWarning style={{ backgroundColor: siteConfig.theme.background, color: siteConfig.theme.foreground }}>
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

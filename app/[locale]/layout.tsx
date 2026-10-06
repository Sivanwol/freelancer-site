import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { siteConfig, getBaseUrl } from '@/lib/config';
import { getCompanyContent } from '@/lib/company-content';
import { buildPageMetadata } from '@/lib/seo';
import { sitePaths } from '@/lib/site-paths';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import WebVitalsReporter from '@/components/WebVitalsReporter';
import LazyAccessibilityWidget from '@/components/lazy-accessibility-widget';
import { GoogleTagManagerHead, GoogleTagManagerNoScript } from '@/components/GoogleTagManager';
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
  const content = getCompanyContent(locale);

  return {
    ...buildPageMetadata({
      locale,
      path: sitePaths.home,
      title: content.meta.defaultTitle,
      description: content.meta.defaultDescription,
      imageAlt: content.meta.defaultTitle,
    }),
    keywords: [
      'RAG',
      'LLM evals',
      'AI agents',
      'tool calling',
      'ACL',
      'retrieval security',
      'Next.js',
      'NestJS',
      'Python',
      'FastAPI',
      'AI in production',
    ],
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.name,
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
  const content = getCompanyContent(locale);

  // Structured data for SEO. Values are trusted constants/content from this codebase.
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    email: siteConfig.email,
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.upwork,
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.phone,
        email: siteConfig.email,
        contactType: 'customer service',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Hebrew'],
      },
    ],
    description: content.meta.defaultDescription,
    founder: {
      '@type': 'Person',
      name: siteConfig.author,
      jobTitle: content.home.title,
      description: content.home.subtitle,
      knowsAbout: [
        'RAG',
        'LLM evals',
        'AI agents',
        'tool calling',
        'Next.js',
        'NestJS',
        'Laravel',
        'Python',
        'FastAPI',
        'ACL',
        'retrieval security',
      ],
    },
    knowsAbout: [
      'RAG',
      'LLM evals',
      'AI agents',
      'tool calling',
      'Next.js',
      'NestJS',
      'Laravel',
      'Python',
      'FastAPI',
      'ACL',
      'retrieval security',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: baseUrl,
    inLanguage: [locale === 'he' ? 'he-IL' : 'en-US'],
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    areaServed: 'Worldwide',
    serviceType: [
      'Software architecture',
      'Full-stack product development',
      'AI agents',
      'RAG chat repair',
      'API integrations',
    ],
    description: content.meta.defaultDescription,
    url: baseUrl,
    telephone: siteConfig.phone,
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
        <meta charSet="utf-8" />
        <GoogleTagManagerHead />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema, professionalServiceSchema]) }}
          suppressHydrationWarning
        />
      </head>
      <body className="antialiased" suppressHydrationWarning style={{ backgroundColor: siteConfig.theme.background, color: siteConfig.theme.foreground }}>
        <GoogleTagManagerNoScript />
        <GoogleAnalytics />
        <WebVitalsReporter />
        <NextIntlClientProvider messages={messages}>
          {children}
          <LazyAccessibilityWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

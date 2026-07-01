import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { siteConfig, getBaseUrl } from '@/lib/config';
import { getCompanyContent } from '@/lib/company-content';
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
  const t = await getTranslations({ locale, namespace: 'meta' });
  const baseUrl = getBaseUrl();

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Software Development Company',
      'Custom Software Development',
      'Business Automation',
      'CRM Automation',
      'AI Development',
      'SaaS Development',
      'MVP Development',
      'Web Application Development',
      'React',
      'Node.js',
      'Python',
      'LangChain',
      'n8n',
      'Make',
      'Zapier',
      'HubSpot',
      'Israel',
    ],
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.name,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'he': `${baseUrl}/he`,
        'en': `${baseUrl}/en`,
        'x-default': `${baseUrl}/he`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}`,
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
    founder: {
      '@type': 'Person',
      name: siteConfig.author,
      jobTitle: siteConfig.jobTitle,
    },
    knowsAbout: [
      'Custom Software Development',
      'Business Automation',
      'AI Development',
      'CRM Automation',
      'SaaS Development',
      'MVP Development',
      'Workflow Automation',
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
    serviceType: ['Custom Software Development', 'Business Automation Solutions', 'AI Development', 'CRM Automation'],
    description: content.meta.defaultDescription,
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

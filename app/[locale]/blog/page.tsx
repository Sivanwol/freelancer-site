import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getBaseUrl } from '@/lib/config';
import { getCompanyContent } from '@/lib/company-content';
import { getPosts } from '@/lib/payload/client';
import type { PayloadLocale } from '@/lib/payload/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import PostCard from '@/components/blog/post-card';
import SoroEmbed from '@/components/blog/soro-embed';

export const revalidate = 60;

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

  const content = getCompanyContent(locale);
  const { docs: posts } = await getPosts(locale as PayloadLocale);

  return (
    <ErrorBoundary>
      <Navbar />
      <FloatingCTA />
      <main className="min-h-screen bg-[#f8fbff] pb-20 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 text-center">
            <h1 className="text-3xl font-extrabold text-[#0d1626] md:text-4xl">{content.blog.title}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#526174]">{content.blog.subtitle}</p>
          </header>

          <SoroEmbed />

          {posts.length === 0 ? (
            <p className="py-16 text-center text-[#526174]">{content.blog.empty}</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} locale={locale} readMoreLabel={content.blog.readMore} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </ErrorBoundary>
  );
}

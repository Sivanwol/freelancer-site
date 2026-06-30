import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing, Link } from '@/i18n/routing';
import { getBaseUrl } from '@/lib/config';
import { getCompanyContent } from '@/lib/company-content';
import { getPostBySlug, getAllPostSlugs, mediaUrl } from '@/lib/payload/client';
import type { Media, PayloadLocale } from '@/lib/payload/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import RichText from '@/components/blog/rich-text';
import SoroEmbed from '@/components/blog/soro-embed';

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

function ogImageUrl(image: Media | string | null | undefined, fallback: Media | string | null | undefined) {
  return mediaUrl(image, 'og') ?? mediaUrl(image) ?? mediaUrl(fallback, 'og') ?? mediaUrl(fallback);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale as PayloadLocale, slug);
  const baseUrl = getBaseUrl();

  if (!post) {
    return { title: 'Not found' };
  }

  const title = post.meta?.title || post.title || '';
  const description = post.meta?.description || post.excerpt || '';
  const image = ogImageUrl(post.meta?.image, post.heroImage);

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${slug}`,
      languages: {
        he: `${baseUrl}/he/blog/${slug}`,
        en: `${baseUrl}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt ?? undefined,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

function formatDate(value: string | null | undefined, locale: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale === 'he' ? 'he-IL' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export default async function BlogArticle({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(locale as PayloadLocale, slug);
  if (!post) {
    notFound();
  }

  const content = getCompanyContent(locale);
  const image = mediaUrl(post.heroImage, 'xlarge') ?? mediaUrl(post.heroImage, 'large') ?? mediaUrl(post.heroImage);
  const alt = typeof post.heroImage === 'object' && post.heroImage?.alt ? post.heroImage.alt : post.title ?? '';
  const date = formatDate(post.publishedAt, locale);

  return (
    <ErrorBoundary>
      <Navbar />
      <FloatingCTA />
      <main className="min-h-screen bg-[#f8fbff] pb-20 pt-32">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center text-sm font-bold text-[#1d72d2] transition hover:text-[#0d1626]"
          >
            {content.blog.backToBlog}
          </Link>

          <header className="mb-8">
            <h1 className="text-3xl font-extrabold leading-tight text-[#0d1626] md:text-4xl">{post.title}</h1>
            {date ? (
              <p className="mt-3 text-sm font-semibold text-[#7186a0]">
                {content.blog.publishedOn} <time dateTime={post.publishedAt ?? undefined}>{date}</time>
              </p>
            ) : null}
          </header>

          {image ? (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl bg-[#eef3fb]">
              <Image src={image} alt={alt} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
            </div>
          ) : null}

          <RichText content={post.content} />

          <SoroEmbed />
        </article>
      </main>
      <Footer />
    </ErrorBoundary>
  );
}

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { mediaUrl } from '@/lib/payload/client';
import type { Category, Post } from '@/lib/payload/types';

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

function firstCategoryTitle(categories: Post['categories']): string | null {
  if (!categories?.length) return null;
  const first = categories[0];
  if (typeof first === 'object' && first !== null) {
    return (first as Category).title ?? null;
  }
  return null;
}

export default function PostCard({
  post,
  locale,
  readMoreLabel,
}: {
  post: Post;
  locale: string;
  readMoreLabel: string;
}) {
  const image = mediaUrl(post.heroImage, 'medium') ?? mediaUrl(post.heroImage);
  const alt = typeof post.heroImage === 'object' && post.heroImage?.alt ? post.heroImage.alt : post.title ?? '';
  const date = formatDate(post.publishedAt, locale);
  const category = firstCategoryTitle(post.categories);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#dbe7f5] bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="block" aria-label={post.title ?? ''}>
        <div className="relative aspect-[16/9] overflow-hidden bg-[#eef3fb]">
          {image ? (
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-3 text-xs font-semibold text-[#7186a0]">
          {category ? <span className="rounded-full bg-[#e7f2ff] px-2.5 py-1 text-[#1d72d2]">{category}</span> : null}
          {date ? <time dateTime={post.publishedAt ?? undefined}>{date}</time> : null}
        </div>
        <h2 className="mb-2 text-lg font-extrabold leading-snug text-[#0d1626]">
          <Link href={`/blog/${post.slug}`} className="transition hover:text-[#1d72d2]">
            {post.title}
          </Link>
        </h2>
        {post.excerpt ? <p className="mb-4 line-clamp-3 text-sm leading-6 text-[#526174]">{post.excerpt}</p> : null}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center text-sm font-bold text-[#1d72d2] transition hover:text-[#0d1626]"
        >
          {readMoreLabel}
        </Link>
      </div>
    </article>
  );
}

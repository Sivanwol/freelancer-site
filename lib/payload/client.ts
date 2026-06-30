import type { Media, PaginatedDocs, PayloadLocale, Post } from './types';

const PAYLOAD_URL = (process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001').replace(/\/$/, '');

const REVALIDATE_SECONDS = 60;

// Node's fetch has no default timeout; cap requests so an unreachable
// Payload backend can't hang static generation/builds indefinitely.
const FETCH_TIMEOUT_MS = 5000;

/**
 * Resolve a Payload media object (or relative url) to an absolute URL.
 * Prefers the requested size when available, falling back to the original.
 */
export function mediaUrl(
  media: Media | string | null | undefined,
  size?: keyof NonNullable<Media['sizes']>
): string | null {
  if (!media) return null;

  if (typeof media === 'string') {
    return toAbsolute(media);
  }

  const sized = size ? media.sizes?.[size]?.url : undefined;
  const url = sized || media.url;
  return toAbsolute(url);
}

function toAbsolute(url: string | null | undefined): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return `${PAYLOAD_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

async function fetchPosts(params: URLSearchParams): Promise<PaginatedDocs<Post>> {
  const empty: PaginatedDocs<Post> = {
    docs: [],
    totalDocs: 0,
    totalPages: 0,
    page: 1,
    limit: 0,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
    prevPage: null,
  };

  const url = `${PAYLOAD_URL}/api/posts?${params.toString()}`;
  const started = Date.now();
  console.info(`[payload] GET ${url} (base=${PAYLOAD_URL})`);

  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      console.error(`[payload] ${res.status} ${res.statusText} ${url} (${Date.now() - started}ms)`);
      return empty;
    }

    const json = (await res.json()) as PaginatedDocs<Post>;
    console.info(
      `[payload] ${res.status} ${url} docs=${json?.docs?.length ?? 0}/${json?.totalDocs ?? 0} (${Date.now() - started}ms)`
    );
    return json;
  } catch (err) {
    console.error(`[payload] FAILED ${url} after ${Date.now() - started}ms:`, err);
    return empty;
  }
}

export interface GetPostsOptions {
  limit?: number;
  page?: number;
}

export async function getPosts(
  locale: PayloadLocale,
  { limit = 12, page = 1 }: GetPostsOptions = {}
): Promise<PaginatedDocs<Post>> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: '-publishedAt',
    depth: '1',
    locale,
    limit: String(limit),
    page: String(page),
  });

  return fetchPosts(params);
}

export async function getPostBySlug(locale: PayloadLocale, slug: string): Promise<Post | null> {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    'where[_status][equals]': 'published',
    depth: '2',
    locale,
    limit: '1',
  });

  const data = await fetchPosts(params);
  return data.docs[0] ?? null;
}

/**
 * Slugs are not localized, so a single request returns every published slug.
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    depth: '0',
    limit: '500',
    locale: 'en',
  });

  const data = await fetchPosts(params);
  return data.docs.map((post) => post.slug).filter((slug): slug is string => Boolean(slug));
}

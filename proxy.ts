import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { englishLocaleEnabled } from './i18n/config';
import { routing } from './i18n/routing';
import { logPageAccess } from './lib/access-log';

const handleI18nRouting = createMiddleware(routing);

const SKIP_LOCALE_PREFIX = new Set(['/opengraph-image', '/twitter-image', '/apple-touch-icon']);

function redirectLegacyBlogPost(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;
  const post = request.nextUrl.searchParams.get('post');
  if (!post) {
    return null;
  }

  const isBlogIndex =
    pathname === '/blog' ||
    pathname === '/blog/' ||
    pathname === '/he/blog' ||
    pathname === '/he/blog/' ||
    pathname === '/en/blog' ||
    pathname === '/en/blog/';

  if (!isBlogIndex) {
    return null;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/he/blog/${encodeURIComponent(post)}`;
  url.search = '';
  return NextResponse.redirect(url, 301);
}

export default function proxy(request: NextRequest) {
  try {
    logPageAccess(request);
  } catch (error) {
    console.error(
      '[access] failed_to_log',
      error instanceof Error ? error.message : String(error),
    );
  }

  const blogRedirect = redirectLegacyBlogPost(request);
  if (blogRedirect) {
    return blogRedirect;
  }

  if (SKIP_LOCALE_PREFIX.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!englishLocaleEnabled) {
    const { pathname } = request.nextUrl;
    if (pathname === '/en' || pathname.startsWith('/en/')) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(/^\/en(?=\/|$)/, '/he');
      // 301 preserves query strings (e.g. ?post=slug) so Google consolidates /en SEO to /he.
      return NextResponse.redirect(url, 301);
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  // Page routes only — skip API, Next internals, and files with extensions (images/js/css/etc).
  matcher: [
    '/',
    '/(he|en)',
    '/(he|en)/:path*',
    '/((?!api|_next(?:/.*)?$|.*\\..*).*)',
  ],
};

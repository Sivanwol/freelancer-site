import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { englishLocaleEnabled } from './i18n/config';
import { routing } from './i18n/routing';
import { logPageAccess } from './lib/access-log';

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  try {
    logPageAccess(request);
  } catch (error) {
    console.error(
      '[access] failed_to_log',
      error instanceof Error ? error.message : String(error),
    );
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

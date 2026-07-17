import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
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

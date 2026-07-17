import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { logPageAccess } from './lib/access-log';

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  logPageAccess(request);
  return handleI18nRouting(request);
}

export const config = {
  // Page routes only — skip API, Next internals, and files with extensions (images/js/css/etc).
  matcher: ['/', '/(he|en)/:path*', '/((?!api|_next(?:/.*)?$|.*\\..*).*)'],
};

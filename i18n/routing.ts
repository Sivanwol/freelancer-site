import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['he', 'en'],
  defaultLocale: 'he',
  localePrefix: 'always',
  // next-intl's Link header builds x-default without the locale prefix, which
  // conflicts with localePrefix: 'always' and our HTML canonicals (/he/...).
  alternateLinks: false,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

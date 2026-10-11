'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { sitePaths } from '@/lib/site-paths';
import type { ClientChromeContent } from '@/lib/company-content';
import { SiteLogo } from '@/components/site-logo';
import { FaLinkedinIn } from 'react-icons/fa';

type FooterProps = {
  content: ClientChromeContent;
};

export default function Footer({ content }: FooterProps) {
  const locale = useLocale();
  const year = new Date().getFullYear();
  const tagline =
    locale === 'he'
      ? 'סיון וולברג — ארכיטקט תוכנה ו-CTO. עוזר לחברות לבנות טכנולוגיה יציבה, חכמה ורווחית.'
      : 'Sivan Wolberg — software architect and CTO. Helping companies ship stable, smart, profitable technology.';

  return (
    <footer className="border-t border-stone-900 bg-stone-950 px-4 py-16" role="contentinfo">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" aria-label={content.brand.name}>
              <SiteLogo locale={locale} alt={content.brand.name} />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-stone-400">{tagline}</p>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-bold text-white">{locale === 'he' ? 'שירותים' : 'Services'}</h2>
            <ul className="space-y-3 text-sm text-stone-500">
              <li>
                <Link href={sitePaths.ragProduction} className="transition hover:text-amber-500">
                  {locale === 'he' ? "תיקון צ'אט AI" : 'RAG chat repair'}
                </Link>
              </li>
              <li>
                <Link href={sitePaths.softwareDevelopment} className="transition hover:text-amber-500">
                  {content.nav.software}
                </Link>
              </li>
              <li>
                <Link href={sitePaths.businessAutomation} className="transition hover:text-amber-500">
                  {content.nav.automation}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-bold text-white">{locale === 'he' ? 'מידע נוסף' : 'Legal'}</h2>
            <ul className="space-y-3 text-sm text-stone-500">
              <li>
                <Link href={sitePaths.accessibilityStatement} className="transition hover:text-amber-500">
                  {content.footer.accessibility}
                </Link>
              </li>
              <li>
                <Link href={sitePaths.privacyPolicy} className="transition hover:text-amber-500">
                  {content.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={sitePaths.termsOfUse} className="transition hover:text-amber-500">
                  {content.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-stone-900 pt-8 md:flex-row">
          <p className="text-sm text-stone-500">{content.footer.rights.replace('{year}', String(year))}</p>
          <a
            href={content.brand.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-stone-500 transition hover:text-amber-500"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
}

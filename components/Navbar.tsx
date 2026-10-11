'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { englishLocaleEnabled } from '@/i18n/config';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { sitePaths } from '@/lib/site-paths';
import type { ClientChromeContent } from '@/lib/company-content';
import { SiteLogo } from '@/components/site-logo';
import { HiMenu, HiX } from 'react-icons/hi';

type NavbarProps = {
  content: ClientChromeContent;
};

export default function Navbar({ content }: NavbarProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRafRef = useRef<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 12);
      scrollRafRef.current = null;
    };
    const handleScroll = () => {
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = window.requestAnimationFrame(updateScrollState);
    };
    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollRafRef.current !== null) window.cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

  const navItems = [
    { label: content.nav.home, href: sitePaths.home },
    { label: content.nav.rag, href: sitePaths.ragProduction },
    { label: content.nav.software, href: sitePaths.softwareDevelopment },
    { label: content.nav.automation, href: sitePaths.businessAutomation },
    { label: content.nav.about, href: sitePaths.aboutUs },
    { label: content.nav.blog, href: sitePaths.blog },
  ];

  const changeLocale = (newLocale: string) => {
    if (!englishLocaleEnabled && newLocale !== 'he') return;
    router.replace(pathname, { locale: newLocale });
  };

  const isActive = (href: string) => pathname === (href.split('#')[0] || href);

  const scrollToHash = (href: string) => {
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return false;
    const pathOnly = href.slice(0, hashIndex) || sitePaths.home;
    const hash = href.slice(hashIndex + 1);
    if (pathname !== pathOnly) return false;
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  };

  return (
    <nav
      role="navigation"
      aria-label={content.nav.main}
      className={`fixed inset-x-0 top-0 z-50 border-b border-stone-800 bg-stone-950/90 backdrop-blur-md transition-shadow ${
        isScrolled ? 'shadow-lg shadow-black/30' : ''
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={content.brand.name}>
          <SiteLogo locale={locale} alt={content.brand.name} priority />
        </Link>

        <div className="hidden items-center gap-5 text-sm font-semibold text-stone-300 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-amber-500 ${isActive(item.href) ? 'text-amber-500' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href={sitePaths.contact} className="rounded-full bg-amber-600 px-6 py-2 text-sm font-bold text-white transition hover:bg-amber-500">
            {content.nav.contact}
          </Link>
          {englishLocaleEnabled ? (
            <div className="flex rounded-full border border-stone-700 p-1">
              <button type="button" onClick={() => changeLocale('he')} className={`rounded-full px-3 py-1 text-xs font-bold ${locale === 'he' ? 'bg-amber-600 text-white' : 'text-stone-400'}`}>
                עברית
              </button>
              <button type="button" onClick={() => changeLocale('en')} className={`rounded-full px-3 py-1 text-xs font-bold ${locale === 'en' ? 'bg-amber-600 text-white' : 'text-stone-400'}`}>
                EN
              </button>
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-stone-700 text-stone-200 lg:hidden"
          aria-label={isMobileMenuOpen ? content.nav.close : content.nav.menu}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-stone-800 bg-stone-950 px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  if (scrollToHash(item.href)) event.preventDefault();
                  setIsMobileMenuOpen(false);
                }}
                className={`rounded-xl px-3 py-3 font-bold ${isActive(item.href) ? 'bg-stone-900 text-amber-500' : 'text-stone-300'}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href={sitePaths.contact} onClick={() => setIsMobileMenuOpen(false)} className="btn-primary mt-2 justify-center">
              {content.nav.contact}
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

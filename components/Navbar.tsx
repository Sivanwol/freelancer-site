'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { englishLocaleEnabled } from '@/i18n/config';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { sitePaths } from '@/lib/site-paths';
import type { ClientChromeContent } from '@/lib/company-content';
import { HiMenu, HiX } from 'react-icons/hi';

type NavbarProps = {
  content: ClientChromeContent;
};

export default function Navbar({ content }: NavbarProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRafRef = useRef<number | null>(null);
  const isScrolledRef = useRef(false);

  useEffect(() => {
    const updateScrollState = () => {
      const nextIsScrolled = window.scrollY > 20;
      if (nextIsScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextIsScrolled;
        setIsScrolled(nextIsScrolled);
      }
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
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  const navItems = [
    { label: content.nav.home, href: sitePaths.home },
    { label: content.nav.rag, href: sitePaths.ragProduction },
    { label: content.nav.software, href: sitePaths.softwareDevelopment },
    { label: content.nav.about, href: sitePaths.aboutUs },
    { label: content.nav.testimonials, href: `${sitePaths.home}#testimonials` },
    { label: content.nav.blog, href: sitePaths.blog },
    { label: content.nav.privacy, href: sitePaths.privacyPolicy },
  ];

  const changeLocale = (newLocale: string) => {
    if (!englishLocaleEnabled && newLocale !== 'he') {
      return;
    }
    router.replace(pathname, { locale: newLocale });
  };

  const isActive = (href: string) => {
    const pathOnly = href.split('#')[0] || href;
    if (href.includes('#testimonials')) {
      return pathname === sitePaths.home;
    }
    return pathname === pathOnly;
  };

  const scrollToHash = (href: string) => {
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) {
      return false;
    }
    const pathOnly = href.slice(0, hashIndex) || sitePaths.home;
    const hash = href.slice(hashIndex + 1);
    if (pathname !== pathOnly) {
      return false;
    }
    const target = document.getElementById(hash);
    if (!target) {
      return false;
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  };

  const shellClass = isScrolled
    ? 'border-[#ddd5c8] bg-[#fffcf7]/94 text-[#12151c] shadow-md shadow-ink/5'
    : 'border-white/10 bg-[#0c0e14]/82 text-[#f5efe6] shadow-lg shadow-black/25';

  const linkClass = (active: boolean) =>
    active
      ? isScrolled
        ? 'text-[#9a5a14]'
        : 'text-[#e8b56a]'
      : isScrolled
        ? 'text-[#5a6270] hover:text-[#12151c]'
        : 'text-[#d8cfc2] hover:text-white';

  return (
    <nav
      role="navigation"
      aria-label={content.nav.main}
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${shellClass}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.75rem] items-center justify-between gap-4">
          <Link href="/" className="flex h-12 w-36 shrink-0 items-center overflow-hidden" aria-label={content.brand.name}>
            <Image
              key={locale}
              src={locale === 'he' ? '/logo-he.png' : '/logo.png'}
              alt={content.brand.name}
              width={240}
              height={80}
              className={`h-full w-full scale-[2.05] object-contain ${isScrolled ? '' : 'brightness-110 contrast-125'}`}
              priority
            />
          </Link>

          <div className="hidden items-center gap-4 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  if (scrollToHash(item.href)) {
                    event.preventDefault();
                  }
                }}
                className={`text-sm font-semibold transition ${linkClass(isActive(item.href))}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 xl:flex">
            <Link href={sitePaths.contact} className="btn-primary px-5 py-2.5 text-xs uppercase tracking-wide">
              {content.nav.contact}
            </Link>
            {englishLocaleEnabled ? (
              <div className="flex rounded-full border border-[#cfc4b4] bg-white/90 p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => changeLocale('he')}
                  className={`rounded-full px-3 py-1.5 text-sm font-extrabold transition ${
                    locale === 'he' ? 'bg-[#c87628] text-white' : 'text-[#5a6270] hover:text-[#12151c]'
                  }`}
                >
                  עברית
                </button>
                <button
                  type="button"
                  onClick={() => changeLocale('en')}
                  className={`rounded-full px-3 py-1.5 text-sm font-extrabold transition ${
                    locale === 'en' ? 'bg-[#c87628] text-white' : 'text-[#5a6270] hover:text-[#12151c]'
                  }`}
                >
                  EN
                </button>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className={`grid h-11 w-11 place-items-center rounded-full border shadow-sm lg:hidden ${
              isScrolled
                ? 'border-[#cfc4b4] bg-[#fffcf7] text-[#12151c]'
                : 'border-white/20 bg-white/10 text-[#f5efe6]'
            }`}
            aria-label={isMobileMenuOpen ? content.nav.close : content.nav.menu}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div
            className={`border-t py-4 lg:hidden ${
              isScrolled ? 'border-[#ddd5c8] bg-[#fffcf7]' : 'border-white/10 bg-[#0c0e14]/95'
            }`}
          >
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    if (scrollToHash(item.href)) {
                      event.preventDefault();
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className={`rounded-2xl px-3 py-3 text-base font-extrabold ${
                    isActive(item.href)
                      ? isScrolled
                        ? 'bg-[#f3e4d0] text-[#9a5a14]'
                        : 'bg-white/10 text-[#e8b56a]'
                      : isScrolled
                        ? 'text-[#5a6270]'
                        : 'text-[#d8cfc2]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={sitePaths.contact}
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary mt-2 justify-center"
              >
                {content.nav.contact}
              </Link>
              {englishLocaleEnabled ? (
                <div className="mt-2 flex gap-2 border-t border-[#ddd5c8] pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      changeLocale('he');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`rounded-full px-3 py-2 text-sm font-extrabold ${
                      locale === 'he' ? 'bg-[#c87628] text-white' : 'border border-[#cfc4b4] text-[#5a6270]'
                    }`}
                  >
                    עברית
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      changeLocale('en');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`rounded-full px-3 py-2 text-sm font-extrabold ${
                      locale === 'en' ? 'bg-[#c87628] text-white' : 'border border-[#cfc4b4] text-[#5a6270]'
                    }`}
                  >
                    EN
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

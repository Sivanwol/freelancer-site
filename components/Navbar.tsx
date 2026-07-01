'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
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
    { label: content.nav.home, href: '/' },
    { label: content.nav.software, href: '/software-development' },
    { label: content.nav.automation, href: '/automation' },
    { label: content.nav.about, href: '/about' },
    { label: content.nav.blog, href: '/blog' },
    { label: content.nav.privacy, href: '/privacy' },
  ];

  const changeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      role="navigation"
      aria-label={content.nav.main}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'border-b border-[#dbe7f5] bg-[#f8fbff]/92 shadow-sm backdrop-blur-xl' : 'bg-[#f8fbff]/72 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex h-14 w-40 shrink-0 items-center" aria-label={content.brand.name}>
            <Image
              src={locale === 'he' ? '/logo-he.png' : '/logo.png'}
              alt={content.brand.name}
              width={160}
              height={56}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition ${
                  isActive(item.href) ? 'text-[#1d72d2]' : 'text-[#526174] hover:text-[#0d1626]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex rounded-full border border-[#c7d9ee] bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => changeLocale('he')}
                className={`rounded-full px-3 py-1.5 text-sm font-extrabold transition ${
                  locale === 'he' ? 'bg-[#4c9df2] text-white' : 'text-[#526174] hover:text-[#0d1626]'
                }`}
              >
                עברית
              </button>
              <button
                type="button"
                onClick={() => changeLocale('en')}
                className={`rounded-full px-3 py-1.5 text-sm font-extrabold transition ${
                  locale === 'en' ? 'bg-[#4c9df2] text-white' : 'text-[#526174] hover:text-[#0d1626]'
                }`}
              >
                EN
              </button>
            </div>
            <a href={content.brand.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary !px-4 !py-2.5">
              {content.nav.contact}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#c7d9ee] bg-white text-[#0d1626] shadow-sm lg:hidden"
            aria-label={isMobileMenuOpen ? content.nav.close : content.nav.menu}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div className="border-t border-[#dbe7f5] bg-[#f8fbff] py-4 lg:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-2xl px-3 py-3 text-base font-extrabold ${
                    isActive(item.href) ? 'bg-[#e7f2ff] text-[#1d72d2]' : 'text-[#526174]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={content.brand.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full bg-[#4c9df2] px-3 py-3 text-center text-base font-extrabold text-white"
              >
                {content.nav.contact}
              </a>
              <div className="mt-2 flex gap-2 border-t border-[#dbe7f5] pt-4">
                <button
                  type="button"
                  onClick={() => {
                    changeLocale('he');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`rounded-full px-3 py-2 text-sm font-extrabold ${
                    locale === 'he' ? 'bg-[#4c9df2] text-white' : 'border border-[#c7d9ee] text-[#526174]'
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
                    locale === 'en' ? 'bg-[#4c9df2] text-white' : 'border border-[#c7d9ee] text-[#526174]'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

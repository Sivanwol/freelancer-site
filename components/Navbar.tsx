'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import Image from 'next/image';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'services', href: '#services' },
    { key: 'skills', href: '#skills' },
    { key: 'testimonials', href: '#testimonials' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0d1117]/95 backdrop-blur-md border-b border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 xs:h-16 md:h-20">
          {/* Logo/Name */}
          <a
            href="#home"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              key={locale}
              src={locale === 'he' ? '/logo-he.png' : '/logo.png'}
              alt={locale === 'he' ? 'סיון וולברג' : 'Sivan Wolberg'}
              width={240}
              height={80}
              className="h-14 xs:h-16 md:h-20 w-auto"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors relative group"
              >
                {t(item.key)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2 ms-4 border-s border-gray-700 ps-4">
              <button
                onClick={() => changeLocale('he')}
                className={`px-3 py-1 rounded ${
                  locale === 'he'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                } transition-colors`}
              >
                עברית
              </button>
              <button
                onClick={() => changeLocale('en')}
                className={`px-3 py-1 rounded ${
                  locale === 'en'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                } transition-colors`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-800"
            >
              <div className="flex flex-col py-4 space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-white px-4 py-2 transition-colors"
                  >
                    {t(item.key)}
                  </a>
                ))}
                <div className="flex items-center gap-2 px-4 pt-2 border-t border-gray-800">
                  <button
                    onClick={() => {
                      changeLocale('he');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded ${
                      locale === 'he'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400'
                    }`}
                  >
                    עברית
                  </button>
                  <button
                    onClick={() => {
                      changeLocale('en');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded ${
                      locale === 'en'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}




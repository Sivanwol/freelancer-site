'use client';

import { useTranslations } from 'next-intl';
import { FaLinkedinIn } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="py-8 px-4 bg-[#020617] border-t border-white/5 relative z-50">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Logo or Name */}
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent opacity-80">
            Sivan Wolberg
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://upwork.com/freelancers/swolberg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#14a800] transition-all hover:scale-110"
              aria-label="Upwork"
            >
              <SiUpwork className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/swolberg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#0077b5] transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-6 h-6" />
            </a>
          </div>

          {/* Copyright & Credits */}
          <div className="space-y-2">
            <p className="text-gray-500 text-sm">
              {t('rights')}
            </p>
            <p className="text-gray-600 text-xs">
              Developed by Sivan Wolberg - DevCo Solution
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}




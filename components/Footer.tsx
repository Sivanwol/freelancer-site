'use client';

import { useTranslations } from 'next-intl';
import { FaLinkedinIn } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="py-8 px-4 bg-[#161b22] border-t border-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            {t('rights')}
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://upwork.com/freelancers/swolberg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#14a800] transition-colors"
              aria-label="Upwork"
            >
              <SiUpwork className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/swolberg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#0077b5] transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}




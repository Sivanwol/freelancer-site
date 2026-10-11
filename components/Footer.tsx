'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { sitePaths } from '@/lib/site-paths';
import type { ClientChromeContent } from '@/lib/company-content';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

type FooterProps = {
  content: ClientChromeContent;
};

export default function Footer({ content }: FooterProps) {
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#ddd5c8] bg-[#0c0e14] px-4 py-12 text-[#d8cfc2]" role="contentinfo">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_auto] md:items-start">
        <div>
          <Link href="/" className="inline-flex h-12 w-36 items-center overflow-hidden">
            <Image
              key={locale}
              src={locale === 'he' ? '/logo-he.png' : '/logo.png'}
              alt={content.brand.name}
              width={220}
              height={72}
              className="h-full w-full scale-[2.05] object-contain brightness-110"
            />
          </Link>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-[#b8aa98]">{content.footer.credit}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-[#8f8578]">
            <p>{content.footer.rights.replace('{year}', String(year))}</p>
            <span aria-hidden="true">/</span>
            <Link href={sitePaths.termsOfUse} className="font-extrabold text-[#d8cfc2] transition hover:text-[#e8b56a]">
              {content.footer.terms}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={sitePaths.privacyPolicy} className="font-extrabold text-[#d8cfc2] transition hover:text-[#e8b56a]">
              {content.footer.privacy}
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={sitePaths.accessibilityStatement}
              className="font-extrabold text-[#d8cfc2] transition hover:text-[#e8b56a]"
            >
              {content.footer.accessibility}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4 md:justify-end">
          <a
            href={content.brand.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-[#f5efe6] transition hover:border-[#c87628]/50 hover:text-[#e8b56a]"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="h-5 w-5" />
          </a>
          <a
            href={content.brand.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-[#f5efe6] transition hover:border-[#0077b5]/40 hover:text-[#e8b56a]"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

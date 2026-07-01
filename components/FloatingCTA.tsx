'use client';

import { useLocale } from 'next-intl';
import type { ClientChromeContent } from '@/lib/company-content';
import { FaEnvelope, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

type FloatingCTAProps = {
  content: ClientChromeContent;
};

export default function FloatingCTA({ content }: FloatingCTAProps) {
  const locale = useLocale();
  const isRtl = locale === 'he';

  const links = [
    {
      href: `mailto:${content.brand.email}`,
      label: content.contact.email,
      icon: FaEnvelope,
    },
    {
      href: content.brand.whatsapp,
      label: 'WhatsApp',
      icon: FaWhatsapp,
    },
    {
      href: content.brand.linkedin,
      label: 'LinkedIn',
      icon: FaLinkedinIn,
    },
  ];

  return (
    <div className={`fixed top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex ${isRtl ? 'left-5' : 'right-5'}`}>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="group relative grid h-11 w-11 place-items-center rounded-full border border-[#c7d9ee] bg-white/92 text-[#1d72d2] shadow-lg shadow-blue-950/10 backdrop-blur transition hover:border-[#4c9df2] hover:bg-[#4c9df2] hover:text-white"
            aria-label={link.label}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-[#0a1423] px-3 py-1.5 text-sm font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 ${
                isRtl ? 'left-14' : 'right-14'
              }`}
            >
              {link.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}

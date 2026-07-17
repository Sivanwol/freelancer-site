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
      external: false,
    },
    {
      href: content.brand.whatsappUrl,
      label: content.nav.contact,
      icon: FaWhatsapp,
      external: true,
    },
    {
      href: content.brand.linkedin,
      label: 'LinkedIn',
      icon: FaLinkedinIn,
      external: true,
    },
  ];

  return (
    <div
      className={`fixed top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 xl:flex ${
        isRtl ? 'left-6' : 'right-6'
      }`}
    >
      {links.map((link) => {
        const Icon = link.icon;
        const className =
          'group relative grid h-12 w-12 place-items-center rounded-full border border-[#d5e4f4] bg-white text-[#1d72d2] shadow-sm transition hover:border-[#9cc7f0] hover:bg-[#f3f8fd] hover:text-[#155aa8]';
        const tooltip = (
          <span
            className={`pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 whitespace-nowrap rounded-lg border border-[#d5e4f4] bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#3d4f66] opacity-0 shadow-sm backdrop-blur transition duration-200 group-hover:opacity-100 ${
              isRtl ? 'left-full ms-3' : 'right-full me-3'
            }`}
          >
            {link.label}
          </span>
        );

        return (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className={className}
            aria-label={link.label}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            {tooltip}
          </a>
        );
      })}
    </div>
  );
}

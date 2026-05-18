'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getCompanyContent } from '@/lib/company-content';
import { FaEnvelope, FaLinkedinIn } from 'react-icons/fa';
import CalBookingButton from './CalBookingButton';

export default function Footer() {
  const locale = useLocale();
  const content = getCompanyContent(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#dbe7f5] bg-white px-4 py-10" role="contentinfo">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <Link href="/" className="inline-flex h-14 w-40 items-center overflow-hidden">
            <Image
              src={locale === 'he' ? '/logo-he.png' : '/logo.png'}
              alt={content.brand.name}
              width={220}
              height={72}
              className="h-full w-full scale-[2.15] object-contain"
            />
          </Link>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-[#526174]">{content.footer.credit}</p>
          <p className="mt-2 text-sm font-medium text-[#718198]">{content.footer.rights.replace('{year}', String(year))}</p>
        </div>
        <div className="flex items-center gap-4">
          <CalBookingButton
            calLink={content.brand.bookingCalLink}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#c7d9ee] bg-[#f8fbff] text-[#0d1626] transition hover:border-[#4c9df2]/40 hover:text-[#1d72d2]"
            iconClassName="h-5 w-5"
            ariaLabel={content.contact.booking}
          >
            <span className="sr-only">{content.contact.booking}</span>
          </CalBookingButton>
          <a
            href={`mailto:${content.brand.email}`}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#c7d9ee] bg-[#f8fbff] text-[#0d1626] transition hover:border-[#4c9df2]/40 hover:text-[#1d72d2]"
            aria-label={content.contact.email}
          >
            <FaEnvelope className="h-5 w-5" />
          </a>
          <a
            href={content.brand.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full border border-[#c7d9ee] bg-[#f8fbff] text-[#0d1626] transition hover:border-[#0077b5]/40 hover:text-[#1d72d2]"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

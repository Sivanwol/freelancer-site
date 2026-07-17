'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getCompanyContent } from '@/lib/company-content';
import { acceptCookieConsent, hasAcceptedCookieConsent } from '@/lib/cookie-consent';
import { sitePaths } from '@/lib/site-paths';

export default function CookieConsentBanner() {
  const locale = useLocale();
  const content = getCompanyContent(locale);
  const copy = content.cookieConsent;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!hasAcceptedCookieConsent());
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#d5e4f4] bg-white/95 p-5 shadow-[0_12px_40px_rgba(13,22,38,0.08)] backdrop-blur md:p-6">
        <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#1d72d2]">{copy.title}</p>
        <p className="mt-3 text-sm font-medium leading-7 text-[#526174]">{copy.body}</p>
        <p className="mt-2 text-xs font-semibold text-[#718198]">{copy.durationNote}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
            <Link href={sitePaths.termsOfUse} className="text-[#1d72d2] underline-offset-2 hover:underline">
              {copy.termsLabel}
            </Link>
            <Link href={sitePaths.privacyPolicy} className="text-[#1d72d2] underline-offset-2 hover:underline">
              {copy.privacyLabel}
            </Link>
          </div>
          <button
            type="button"
            className="btn-primary !px-5 !py-2.5"
            onClick={() => {
              acceptCookieConsent();
              setVisible(false);
            }}
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

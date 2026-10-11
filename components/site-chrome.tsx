import { getClientChromeContent } from '@/lib/company-content';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LazyFloatingCTA from '@/components/lazy-floating-cta';
import LazyAmbientCanvas from '@/components/lazy-ambient-canvas';
import CookieConsentBanner from '@/components/cookie-consent-banner';

type SiteChromeProps = {
  locale: string;
  children: React.ReactNode;
};

export function SiteChrome({ locale, children }: SiteChromeProps) {
  const content = getClientChromeContent(locale);

  return (
    <>
      <LazyAmbientCanvas />
      <Navbar content={content} />
      <LazyFloatingCTA content={content} />
      {children}
      <Footer content={content} />
      <CookieConsentBanner />
    </>
  );
}

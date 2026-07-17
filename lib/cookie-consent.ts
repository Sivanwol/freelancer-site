export const COOKIE_CONSENT_KEY = 'devco_cookie_consent';
export const COOKIE_CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 months
export const COOKIE_CONSENT_EVENT = 'devco:cookie-consent';

export type CookieConsentValue = 'accepted';

export function hasAcceptedCookieConsent(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }

  return document.cookie
    .split(';')
    .map((part) => part.trim())
    .some((part) => part === `${COOKIE_CONSENT_KEY}=accepted`);
}

export function acceptCookieConsent(): void {
  if (typeof document === 'undefined') {
    return;
  }

  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE_CONSENT_KEY}=accepted; Max-Age=${COOKIE_CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}

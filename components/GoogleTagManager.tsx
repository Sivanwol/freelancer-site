'use client';

import { useEffect } from 'react';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-MN4LJ534';
const DEFER_TIMEOUT_MS = 4000;

function injectGtm(id: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const w = window as Window & { __gtmInjected?: boolean; dataLayer?: Record<string, unknown>[] };
  if (w.__gtmInjected) {
    return;
  }

  w.__gtmInjected = true;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  const firstScript = document.getElementsByTagName('script')[0];
  const gtmScript = document.createElement('script');
  gtmScript.async = true;
  gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  firstScript.parentNode?.insertBefore(gtmScript, firstScript);
}

export function GoogleTagManagerHead() {
  useEffect(() => {
    if (!GTM_ID) {
      return;
    }

    let injected = false;

    const loadGtm = () => {
      if (injected) {
        return;
      }

      injected = true;
      injectGtm(GTM_ID);
      cleanup();
    };

    const interactionEvents = ['scroll', 'touchstart', 'click', 'keydown'] as const;
    let timeoutId: number | undefined;

    const cleanup = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, loadGtm, true);
      });

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, loadGtm, { once: true, passive: true, capture: true });
    });

    timeoutId = window.setTimeout(loadGtm, DEFER_TIMEOUT_MS);

    return cleanup;
  }, []);

  return null;
}

export function GoogleTagManagerNoScript() {
  if (!GTM_ID) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

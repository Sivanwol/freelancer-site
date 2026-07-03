'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AccessibilityWidget = dynamic(() => import('@/components/AccessibilityWidget'), {
  ssr: false,
});

const IDLE_MOUNT_TIMEOUT_MS = 3000;
const FALLBACK_MOUNT_DELAY_MS = 2000;

export default function LazyAccessibilityWidget() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const mountWidget = () => {
      setShouldMount(true);
    };

    if (typeof window.requestIdleCallback === 'function') {
      const idleCallbackId = window.requestIdleCallback(mountWidget, {
        timeout: IDLE_MOUNT_TIMEOUT_MS,
      });

      return () => {
        window.cancelIdleCallback(idleCallbackId);
      };
    }

    const timeoutId = globalThis.setTimeout(mountWidget, FALLBACK_MOUNT_DELAY_MS);

    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, []);

  if (!shouldMount) {
    return null;
  }

  return <AccessibilityWidget />;
}

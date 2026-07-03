'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import type { ClientChromeContent } from '@/lib/company-content';

const FloatingCTA = dynamic(() => import('@/components/FloatingCTA'), {
  ssr: false,
});

type LazyFloatingCTAProps = {
  content: ClientChromeContent;
};

export default function LazyFloatingCTA({ content }: LazyFloatingCTAProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1280px)');

    const update = () => {
      setShouldLoad(mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener('change', update);

    return () => {
      mediaQuery.removeEventListener('change', update);
    };
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return <FloatingCTA content={content} />;
}

'use client';

import dynamic from 'next/dynamic';
import type { ClientChromeContent } from '@/lib/company-content';

const FloatingCTA = dynamic(() => import('@/components/FloatingCTA'), {
  ssr: false,
});

type LazyFloatingCTAProps = {
  content: ClientChromeContent;
};

export default function LazyFloatingCTA({ content }: LazyFloatingCTAProps) {
  return <FloatingCTA content={content} />;
}

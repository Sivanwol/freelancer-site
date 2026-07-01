'use client';

import dynamic from 'next/dynamic';

const AccessibilityWidget = dynamic(() => import('@/components/AccessibilityWidget'), {
  ssr: false,
});

export default function LazyAccessibilityWidget() {
  return <AccessibilityWidget />;
}

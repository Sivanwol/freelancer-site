'use client';

import dynamic from 'next/dynamic';

const AmbientCanvas = dynamic(() => import('@/components/ambient-canvas'), { ssr: false });

export default function LazyAmbientCanvas() {
  return <AmbientCanvas />;
}

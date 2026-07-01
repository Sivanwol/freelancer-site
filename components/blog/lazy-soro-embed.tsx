'use client';

import dynamic from 'next/dynamic';

const SoroEmbed = dynamic(() => import('@/components/blog/soro-embed'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[320px] items-center justify-center rounded-[28px] border border-[#dbe7f5] bg-white p-8 text-[#526174]">
      Loading blog...
    </div>
  ),
});

export default function LazySoroEmbed() {
  return <SoroEmbed />;
}

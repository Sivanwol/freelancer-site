'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Showcase } from '@/lib/company-content';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type Props = {
  items: readonly Showcase[];
  isRtl: boolean;
};

export default function HeroShowcaseCarousel({ items, isRtl }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [items.length]);

  const active = items[activeIndex];

  const previous = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  return (
    <div className="rounded-[34px] border border-[#dbe7f5] bg-white p-3 shadow-2xl shadow-blue-950/10 md:p-4">
      <div className="relative overflow-hidden rounded-[26px] bg-[#e7f2ff]">
        <Image
          key={active.slug}
          src={active.image}
          alt={active.title}
          width={1536}
          height={1024}
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="aspect-[16/10] w-full object-cover transition duration-500 md:aspect-[16/9]"
          priority={activeIndex === 0}
          loading={activeIndex === 0 ? undefined : 'lazy'}
        />
        <button
          type="button"
          onClick={previous}
          className="absolute top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/88 text-[#1d72d2] shadow-lg shadow-slate-950/10 backdrop-blur transition hover:bg-[#4c9df2] hover:text-white ltr:left-3 rtl:right-3"
          aria-label={isRtl ? 'הפרויקט הקודם' : 'Previous project'}
        >
          {isRtl ? <FaChevronRight aria-hidden="true" /> : <FaChevronLeft aria-hidden="true" />}
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/88 text-[#1d72d2] shadow-lg shadow-slate-950/10 backdrop-blur transition hover:bg-[#4c9df2] hover:text-white ltr:right-3 rtl:left-3"
          aria-label={isRtl ? 'הפרויקט הבא' : 'Next project'}
        >
          {isRtl ? <FaChevronLeft aria-hidden="true" /> : <FaChevronRight aria-hidden="true" />}
        </button>
      </div>

      <div className="mt-5 px-2 pb-1 text-start">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#1d72d2]">{active.category}</p>
        <h2 className="mt-2 text-2xl font-black leading-tight text-[#0d1626] md:text-3xl">{active.title}</h2>
        <p className="mt-2 text-sm font-medium leading-7 text-[#526174]">{active.summary}</p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition ${
              index === activeIndex ? 'w-9 bg-[#1d72d2]' : 'w-2 bg-[#c7d9ee] hover:bg-[#4c9df2]'
            }`}
            aria-label={isRtl ? `מעבר לפרויקט ${index + 1}` : `Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

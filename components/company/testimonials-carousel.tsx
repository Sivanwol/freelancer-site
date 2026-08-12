'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FaQuoteLeft, FaStar, FaTimes } from 'react-icons/fa';

export type Testimonial = {
  text: string;
  project: string;
  date: string;
};

type Props = {
  testimonials: readonly Testimonial[];
  isRtl: boolean;
  labels: {
    stars: string;
    readFull: string;
    close: string;
  };
};

function Stars({ label }: { label: string }) {
  return (
    <div className="flex gap-1 text-[#1d72d2]" aria-label={label}>
      {[0, 1, 2, 3, 4].map((star) => (
        <FaStar key={star} className="h-4 w-4" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function TestimonialsCarousel({ testimonials, isRtl, labels }: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [preferReducedMotion, setPreferReducedMotion] = useState(false);

  const looped = [...testimonials, ...testimonials];
  const active = activeIndex === null ? null : testimonials[activeIndex];
  const titleId = 'testimonial-dialog-title';
  const bodyId = 'testimonial-dialog-body';

  const open = useCallback((index: number, trigger?: HTMLButtonElement | null) => {
    triggerRef.current = trigger ?? null;
    setActiveIndex(index % testimonials.length);
    setPaused(true);
  }, [testimonials.length]);

  const close = useCallback(() => {
    setActiveIndex(null);
    setPaused(false);
    window.requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPreferReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (window.location.hash !== '#testimonials') {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, close]);

  return (
    <>
      <div
        dir="ltr"
        className="relative -mx-4 h-[320px] overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
        onMouseEnter={() => {
          if (activeIndex === null) {
            setPaused(true);
          }
        }}
        onMouseLeave={() => {
          if (activeIndex === null) {
            setPaused(false);
          }
        }}
      >
        <div
          dir="ltr"
          className={`flex h-full w-max flex-row gap-5 ${
            preferReducedMotion
              ? ''
              : isRtl
                ? 'animate-testimonials-marquee-rtl'
                : 'animate-testimonials-marquee'
          } ${paused || preferReducedMotion ? '[animation-play-state:paused]' : '[animation-play-state:running]'}`}
        >
          {looped.map((testimonial, index) => {
            const sourceIndex = index % testimonials.length;
            const seoQuoteId =
              index < testimonials.length ? `testimonial-seo-${sourceIndex}` : undefined;

            return (
              <button
                key={`${testimonial.project}-${index}`}
                type="button"
                className="flex h-[320px] w-[min(100vw-2.5rem,22rem)] shrink-0 flex-col rounded-[28px] border border-[#dbe7f5] bg-white p-6 text-start shadow-sm outline-none transition hover:border-[#9cc7f0] hover:shadow-md focus-visible:border-[#1d72d2] sm:w-[22rem]"
                aria-label={`${labels.readFull}: ${testimonial.project}`}
                onClick={(event) => open(sourceIndex, event.currentTarget)}
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <FaQuoteLeft className="h-7 w-7 text-[#1d72d2]/30" aria-hidden="true" />
                  <Stars label={labels.stars} />
                </div>
                <blockquote
                  id={seoQuoteId}
                  lang="en"
                  dir="ltr"
                  className="line-clamp-5 overflow-hidden text-start text-base font-semibold leading-8 text-[#0d1626]"
                >
                  “{testimonial.text}”
                </blockquote>
                <div className="mt-auto pt-6">
                  <p lang="en" dir="ltr" className="text-start text-sm font-extrabold text-[#0d1626]">
                    {testimonial.project}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#526174]">{testimonial.date}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {active ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-[#0a1423]/45 backdrop-blur-[1px]"
            aria-label={labels.close}
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={bodyId}
            className={`relative z-10 flex max-h-[min(90vh,42rem)] w-full max-w-2xl flex-col overflow-hidden rounded-[28px] border border-[#dbe7f5] bg-white p-6 shadow-2xl shadow-blue-950/20 sm:p-8 ${
              preferReducedMotion ? '' : 'animate-scale-in'
            }`}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              className="absolute top-4 grid h-9 w-9 place-items-center rounded-full border border-[#d5e4f4] bg-white text-[#526174] transition hover:border-[#9cc7f0] hover:text-[#1d72d2] ltr:right-4 rtl:left-4"
              aria-label={labels.close}
            >
              <FaTimes className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="mb-5 flex items-center justify-between gap-4 pe-10">
              <FaQuoteLeft className="h-7 w-7 text-[#1d72d2]/30" aria-hidden="true" />
              <Stars label={labels.stars} />
            </div>

            <blockquote
              id={bodyId}
              lang="en"
              dir="ltr"
              className="overflow-y-auto text-start text-base font-semibold leading-8 text-[#0d1626] sm:text-lg sm:leading-9"
            >
              “{active.text}”
            </blockquote>

            <div className="mt-6 border-t border-[#dbe7f5] pt-5">
              <p id={titleId} lang="en" dir="ltr" className="text-start text-sm font-extrabold text-[#0d1626]">
                {active.project}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#526174]">{active.date}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

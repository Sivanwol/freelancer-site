'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export type Testimonial = {
  text: string;
  project: string;
  date: string;
};

type Props = {
  testimonials: readonly Testimonial[];
  isRtl: boolean;
  labels: {
    previous: string;
    next: string;
    slide: string;
  };
  ctaHref: string;
  ctaLabel: string;
};

export default function TestimonialsCarousel({ testimonials, isRtl, labels, ctaHref, ctaLabel }: Props) {
  const trackId = useId();
  const regionLabel = isRtl ? 'לקוחות ממליצים' : 'Client testimonials';
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [preferReducedMotion, setPreferReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const count = testimonials.length;

  const go = useCallback(
    (next: number) => {
      setIndex((next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPreferReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (preferReducedMotion || paused || count <= 1) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [preferReducedMotion, paused, count]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!sectionRef.current?.contains(document.activeElement) && document.activeElement !== document.body) {
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        go(isRtl ? index - 1 : index + 1);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        go(isRtl ? index + 1 : index - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [go, index, isRtl]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden py-24 md:py-32"
      aria-roledescription="carousel"
      aria-label={regionLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!sectionRef.current?.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <div className="site-container">
        <h2 className="mb-12 text-center text-4xl font-bold italic text-white md:text-6xl">
          {isRtl ? 'לקוחות ממליצים' : 'Client testimonials'}
        </h2>

        <div className="relative px-2 sm:px-12">
          <div className="overflow-hidden">
            <div
              id={trackId}
              className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(${index * 100}%)` }}
              aria-live="polite"
            >
              {testimonials.map((testimonial, slideIndex) => (
                <article
                  key={`${testimonial.project}-${slideIndex}`}
                  className="min-w-full shrink-0 px-2"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${labels.slide} ${slideIndex + 1} ${isRtl ? 'מתוך' : 'of'} ${count}`}
                  aria-hidden={slideIndex !== index}
                >
                  <div className="glass-card mx-auto max-w-4xl rounded-[3rem] p-8 md:p-12">
                    <blockquote lang="en" dir="ltr" className="text-lg italic leading-relaxed text-stone-300 md:text-xl">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>
                    <footer className="mt-8 border-t border-stone-800 pt-8">
                      <p lang="en" dir="ltr" className="text-lg font-bold text-white">
                        {testimonial.project}
                      </p>
                      <p className="text-stone-500">{testimonial.date}</p>
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(isRtl ? index + 1 : index - 1)}
                className="absolute top-1/2 hidden -translate-y-1/2 rounded-full border border-stone-800 bg-stone-900 p-4 text-amber-500 opacity-80 transition hover:border-amber-600 hover:opacity-100 focus-visible:opacity-100 sm:grid ltr:left-0 rtl:right-0"
                aria-label={labels.previous}
                aria-controls={trackId}
              >
                {isRtl ? <FaChevronRight aria-hidden="true" /> : <FaChevronLeft aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={() => go(isRtl ? index - 1 : index + 1)}
                className="absolute top-1/2 hidden -translate-y-1/2 rounded-full border border-stone-800 bg-stone-900 p-4 text-amber-500 opacity-80 transition hover:border-amber-600 hover:opacity-100 focus-visible:opacity-100 sm:grid ltr:right-0 rtl:left-0"
                aria-label={labels.next}
                aria-controls={trackId}
              >
                {isRtl ? <FaChevronLeft aria-hidden="true" /> : <FaChevronRight aria-hidden="true" />}
              </button>
            </>
          ) : null}

          {count > 1 ? (
            <div className="mt-10 flex justify-center gap-3" role="tablist" aria-label={isRtl ? 'בחירת עדות' : 'Choose testimonial'}>
              {testimonials.map((testimonial, dotIndex) => (
                <button
                  key={`dot-${testimonial.project}`}
                  type="button"
                  role="tab"
                  aria-selected={dotIndex === index}
                  aria-label={`${labels.slide} ${dotIndex + 1}`}
                  onClick={() => setIndex(dotIndex)}
                  className={`h-3 rounded-full transition-all ${
                    dotIndex === index ? 'w-9 bg-amber-600' : 'w-3 bg-stone-700 hover:bg-stone-500'
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-12 text-center">
          <a href={ctaHref} className="btn-primary px-10 py-4">
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

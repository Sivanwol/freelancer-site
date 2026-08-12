'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

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
  };
};

const COMMIT_DELAY_MS = 280;
const LEAVE_DELAY_MS = 250;
const PANEL_DELAY_MS = 220;
const CENTER_MS = 450;

function Stars({ label }: { label: string }) {
  return (
    <div className="flex gap-1 text-[#1d72d2]" aria-label={label}>
      {[0, 1, 2, 3, 4].map((star) => (
        <FaStar key={star} className="h-4 w-4" aria-hidden="true" />
      ))}
    </div>
  );
}

function readTranslateX(element: HTMLElement): number {
  const value = window.getComputedStyle(element).transform;
  if (!value || value === 'none') {
    return 0;
  }
  const matrix = new DOMMatrixReadOnly(value);
  return matrix.m41;
}

export default function TestimonialsCarousel({ testimonials, isRtl, labels }: Props) {
  const reactId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());
  const commitTimerRef = useRef<number | null>(null);
  const leaveTimerRef = useRef<number | null>(null);
  const panelTimerRef = useRef<number | null>(null);
  const pendingKeyRef = useRef<string | null>(null);
  const skipTransitionRef = useRef(false);
  const marqueeRunningRef = useRef(true);

  const [preferReducedMotion, setPreferReducedMotion] = useState(false);
  const [marqueeRunning, setMarqueeRunning] = useState(true);
  const [trackX, setTrackX] = useState(0);
  const [committedKey, setCommittedKey] = useState<string | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [pinned, setPinned] = useState(false);

  const looped = [...testimonials, ...testimonials];
  const committedIndex = committedKey ? Number.parseInt(committedKey, 10) % testimonials.length : null;
  const active = committedIndex === null ? null : testimonials[committedIndex];
  const titleId = `${reactId}-title`;
  const bodyId = `${reactId}-body`;
  const copy = {
    readFull: isRtl ? 'קרא את העדות המלאה' : 'Read full testimonial',
    close: isRtl ? 'סגור' : 'Close',
  };

  const clearTimer = (timer: { current: number | null }) => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const clearCommitTimer = useCallback(() => {
    clearTimer(commitTimerRef);
    pendingKeyRef.current = null;
  }, []);

  const clearLeaveTimer = useCallback(() => {
    clearTimer(leaveTimerRef);
  }, []);

  const clearPanelTimer = useCallback(() => {
    clearTimer(panelTimerRef);
  }, []);

  const revealPanel = useCallback(() => {
    clearPanelTimer();
    if (preferReducedMotion) {
      setShowPanel(true);
      return;
    }
    panelTimerRef.current = window.setTimeout(() => {
      setShowPanel(true);
    }, PANEL_DELAY_MS);
  }, [clearPanelTimer, preferReducedMotion]);

  const centerCard = useCallback(
    (itemKey: string) => {
      const viewport = viewportRef.current;
      const card = cardRefs.current.get(itemKey);
      if (!viewport || !card) {
        return;
      }
      const viewportRect = viewport.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const delta =
        viewportRect.left + viewportRect.width / 2 - (cardRect.left + cardRect.width / 2);
      if (Math.abs(delta) < 1) {
        return;
      }
      setTrackX((current) => current + delta);
    },
    []
  );

  const commit = useCallback(
    (itemKey: string, options?: { pin?: boolean }) => {
      clearCommitTimer();
      clearLeaveTimer();
      pendingKeyRef.current = null;
      setCommittedKey(itemKey);
      if (options?.pin) {
        setPinned(true);
      }

      const track = trackRef.current;
      if (!track) {
        return;
      }

      const finish = () => {
        centerCard(itemKey);
        revealPanel();
      };

      if (marqueeRunningRef.current) {
        const frozenX = readTranslateX(track);
        skipTransitionRef.current = true;
        marqueeRunningRef.current = false;
        setMarqueeRunning(false);
        setTrackX(frozenX);
        window.requestAnimationFrame(() => {
          skipTransitionRef.current = false;
          finish();
        });
        return;
      }

      finish();
    },
    [centerCard, clearCommitTimer, clearLeaveTimer, revealPanel]
  );

  const release = useCallback(() => {
    clearCommitTimer();
    clearLeaveTimer();
    clearPanelTimer();
    pendingKeyRef.current = null;
    setShowPanel(false);
    setCommittedKey(null);
    setPinned(false);
    skipTransitionRef.current = true;
    marqueeRunningRef.current = true;
    setMarqueeRunning(true);
    setTrackX(0);
    window.requestAnimationFrame(() => {
      skipTransitionRef.current = false;
    });
  }, [clearCommitTimer, clearLeaveTimer, clearPanelTimer]);

  const scheduleCommit = useCallback(
    (itemKey: string) => {
      clearLeaveTimer();
      if (committedKey === itemKey) {
        clearCommitTimer();
        return;
      }
      if (pendingKeyRef.current === itemKey && commitTimerRef.current !== null) {
        return;
      }
      clearCommitTimer();
      pendingKeyRef.current = itemKey;
      commitTimerRef.current = window.setTimeout(() => {
        commit(itemKey);
      }, COMMIT_DELAY_MS);
    },
    [clearCommitTimer, clearLeaveTimer, commit, committedKey]
  );

  const scheduleRelease = useCallback(() => {
    if (pinned) {
      return;
    }
    clearCommitTimer();
    clearLeaveTimer();
    leaveTimerRef.current = window.setTimeout(() => {
      release();
    }, LEAVE_DELAY_MS);
  }, [clearCommitTimer, clearLeaveTimer, pinned, release]);

  useEffect(() => {
    marqueeRunningRef.current = marqueeRunning;
  }, [marqueeRunning]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPreferReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && committedKey) {
        event.preventDefault();
        release();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [committedKey, release]);

  useEffect(() => {
    return () => {
      clearCommitTimer();
      clearLeaveTimer();
      clearPanelTimer();
    };
  }, [clearCommitTimer, clearLeaveTimer, clearPanelTimer]);

  const trackStyle =
    marqueeRunning || preferReducedMotion
      ? undefined
      : {
          transform: `translateX(${trackX}px)`,
          transition: skipTransitionRef.current
            ? 'none'
            : preferReducedMotion
              ? 'none'
              : `transform ${CENTER_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        };

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={clearLeaveTimer}
      onMouseLeave={scheduleRelease}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          scheduleRelease();
        }
      }}
    >
      <div
        ref={viewportRef}
        dir="ltr"
        className="relative -mx-4 h-[320px] overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
      >
        <div
          ref={trackRef}
          dir="ltr"
          className={`flex h-full w-max flex-row gap-5 will-change-transform ${
            marqueeRunning && !preferReducedMotion
              ? isRtl
                ? 'animate-testimonials-marquee-rtl'
                : 'animate-testimonials-marquee'
              : ''
          }`}
          style={trackStyle}
        >
          {looped.map((testimonial, index) => {
            const sourceIndex = index % testimonials.length;
            const itemKey = String(index);
            const isCommitted = committedKey === itemKey;
            const dimmed = committedKey !== null && !isCommitted;
            const seoQuoteId =
              index < testimonials.length ? `${reactId}-seo-${sourceIndex}` : undefined;

            return (
              <article
                key={itemKey}
                ref={(node) => {
                  if (node) {
                    cardRefs.current.set(itemKey, node);
                  } else {
                    cardRefs.current.delete(itemKey);
                  }
                }}
                tabIndex={0}
                aria-expanded={isCommitted}
                aria-label={`${copy.readFull}: ${testimonial.project}`}
                className={`flex h-[320px] w-[min(100vw-2.5rem,22rem)] shrink-0 flex-col rounded-[28px] border bg-[#f8fbff] p-6 shadow-sm outline-none transition-[opacity,border-color,box-shadow] duration-300 sm:w-[22rem] ${
                  isCommitted
                    ? 'z-10 border-[#9cc7f0] shadow-lg shadow-blue-950/10'
                    : 'border-[#dbe7f5]'
                } ${dimmed ? 'opacity-40' : 'opacity-100'}`}
                onMouseEnter={() => scheduleCommit(itemKey)}
                onFocus={() => commit(itemKey)}
                onPointerUp={(event) => {
                  if (event.pointerType !== 'mouse') {
                    commit(itemKey, { pin: true });
                  }
                }}
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
              </article>
            );
          })}
        </div>
      </div>

      {pinned ? (
        <button
          type="button"
          className="absolute inset-0 z-10 cursor-default bg-transparent"
          aria-label={copy.close}
          onClick={release}
        />
      ) : null}

      {showPanel && active ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          aria-describedby={bodyId}
          className={`absolute inset-x-0 top-0 z-20 mx-auto w-[min(100%,36rem)] rounded-[28px] border border-[#9cc7f0] bg-[#f8fbff] p-6 shadow-xl shadow-blue-950/15 sm:p-8 ${
            preferReducedMotion ? '' : 'animate-testimonial-zoom-in'
          }`}
          onMouseEnter={clearLeaveTimer}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <FaQuoteLeft className="h-7 w-7 text-[#1d72d2]/30" aria-hidden="true" />
            <Stars label={labels.stars} />
          </div>
          <blockquote
            id={bodyId}
            lang="en"
            dir="ltr"
            className="text-start text-base font-semibold leading-8 text-[#0d1626] sm:text-lg sm:leading-9"
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
      ) : null}
    </div>
  );
}

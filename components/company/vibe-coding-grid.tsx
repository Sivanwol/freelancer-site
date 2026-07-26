'use client';

import { useEffect, useId, useRef, useState } from 'react';
import {
  FaBug,
  FaExchangeAlt,
  FaExclamationTriangle,
  FaFlask,
  FaHeart,
  FaHourglassHalf,
  FaLayerGroup,
  FaQuestionCircle,
  FaRobot,
  FaShieldAlt,
  FaSyncAlt,
  FaUserFriends,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';

type VibeItem = {
  id: string;
  label: string;
  icon: string;
  problem: string;
};

const iconMap: Record<string, IconType> = {
  shuffle: FaExchangeAlt,
  bug: FaBug,
  question: FaQuestionCircle,
  warning: FaExclamationTriangle,
  robot: FaRobot,
  heart: FaHeart,
  flask: FaFlask,
  layers: FaLayerGroup,
  hourglass: FaHourglassHalf,
  shield: FaShieldAlt,
  users: FaUserFriends,
  refresh: FaSyncAlt,
};

type Accent = {
  chip: string;
  chipHover: string;
  chipActive: string;
  iconWrap: string;
  icon: string;
  popover: string;
  shadow: string;
};

const accentsById: Record<string, Accent> = {
  'small-change': {
    chip: 'border-sky-400/25 bg-sky-500/10',
    chipHover: 'hover:border-sky-300/50 hover:bg-sky-500/15',
    chipActive: 'border-sky-400 bg-sky-500/20 shadow-[0_0_0_1px_rgba(56,189,248,0.35)]',
    iconWrap: 'bg-sky-400/15',
    icon: 'text-sky-300',
    popover: 'border-sky-400/50 bg-[#0f1a2c]',
    shadow: 'hover:shadow-[0_18px_40px_-12px_rgba(56,189,248,0.45)]',
  },
  'fixing-bugs': {
    chip: 'border-amber-400/25 bg-amber-500/10',
    chipHover: 'hover:border-amber-300/50 hover:bg-amber-500/15',
    chipActive: 'border-amber-400 bg-amber-500/20 shadow-[0_0_0_1px_rgba(251,191,36,0.35)]',
    iconWrap: 'bg-amber-400/15',
    icon: 'text-amber-300',
    popover: 'border-amber-400/50 bg-[#1a160f]',
    shadow: 'hover:shadow-[0_18px_40px_-12px_rgba(251,191,36,0.4)]',
  },
  'nobody-understands': {
    chip: 'border-violet-400/25 bg-violet-500/10',
    chipHover: 'hover:border-violet-300/50 hover:bg-violet-500/15',
    chipActive: 'border-violet-400 bg-violet-500/20 shadow-[0_0_0_1px_rgba(167,139,250,0.35)]',
    iconWrap: 'bg-violet-400/15',
    icon: 'text-violet-300',
    popover: 'border-violet-400/50 bg-[#161225]',
    shadow: 'hover:shadow-[0_18px_40px_-12px_rgba(167,139,250,0.4)]',
  },
  'feature-risk': {
    chip: 'border-orange-400/25 bg-orange-500/10',
    chipHover: 'hover:border-orange-300/50 hover:bg-orange-500/15',
    chipActive: 'border-orange-400 bg-orange-500/20 shadow-[0_0_0_1px_rgba(251,146,60,0.35)]',
    iconWrap: 'bg-orange-400/15',
    icon: 'text-orange-300',
    popover: 'border-orange-400/50 bg-[#1a120c]',
    shadow: 'hover:shadow-[0_18px_40px_-12px_rgba(251,146,60,0.4)]',
  },
  'ai-dependent': {
    chip: 'border-fuchsia-400/25 bg-fuchsia-500/10',
    chipHover: 'hover:border-fuchsia-300/50 hover:bg-fuchsia-500/15',
    chipActive: 'border-fuchsia-400 bg-fuchsia-500/20 shadow-[0_0_0_1px_rgba(232,121,249,0.35)]',
    iconWrap: 'bg-fuchsia-400/15',
    icon: 'text-fuchsia-300',
    popover: 'border-fuchsia-400/50 bg-[#1a1020]',
    shadow: 'hover:shadow-[0_18px_40px_-12px_rgba(232,121,249,0.4)]',
  },
  'fragile-system': {
    chip: 'border-rose-400/25 bg-rose-500/10',
    chipHover: 'hover:border-rose-300/50 hover:bg-rose-500/15',
    chipActive: 'border-rose-400 bg-rose-500/20 shadow-[0_0_0_1px_rgba(251,113,133,0.35)]',
    iconWrap: 'bg-rose-400/15',
    icon: 'text-rose-300',
    popover: 'border-rose-400/50 bg-[#1a1014]',
    shadow: 'hover:shadow-[0_18px_40px_-12px_rgba(251,113,133,0.4)]',
  },
  'demo-fails': {
    chip: 'border-teal-400/25 bg-teal-500/10',
    chipHover: 'hover:border-teal-300/50 hover:bg-teal-500/15',
    chipActive: 'border-teal-400 bg-teal-500/20 shadow-[0_0_0_1px_rgba(45,212,191,0.35)]',
    iconWrap: 'bg-teal-400/15',
    icon: 'text-teal-300',
    popover: 'border-teal-400/50 bg-[#0f1a19]',
    shadow: 'hover:shadow-[0_18px_40px_-12px_rgba(45,212,191,0.4)]',
  },
  'no-architecture': {
    chip: 'border-indigo-400/25 bg-indigo-500/10',
    chipHover: 'hover:border-indigo-300/50 hover:bg-indigo-500/15',
    chipActive: 'border-indigo-400 bg-indigo-500/20 shadow-[0_0_0_1px_rgba(129,140,248,0.35)]',
    iconWrap: 'bg-indigo-400/15',
    icon: 'text-indigo-300',
    popover: 'border-indigo-400/50 bg-[#12162a]',
    shadow: 'hover:shadow-[0_18px_40px_-12px_rgba(129,140,248,0.4)]',
  },
  'slow-changes': {
    chip: 'border-lime-400/25 bg-lime-500/10',
    chipHover: 'hover:border-lime-300/50 hover:bg-lime-500/15',
    chipActive: 'border-lime-400 bg-lime-500/20 shadow-[0_0_0_1px_rgba(163,230,53,0.35)]',
    iconWrap: 'bg-lime-400/15',
    icon: 'text-lime-300',
    popover: 'border-lime-400/50 bg-[#141a0f]',
    shadow: 'hover:shadow-[0_18px_40px_-12px_rgba(163,230,53,0.35)]',
  },
  'no-trust': {
    chip: 'border-cyan-400/25 bg-cyan-500/10',
    chipHover: 'hover:border-cyan-300/50 hover:bg-cyan-500/15',
    chipActive: 'border-cyan-400 bg-cyan-500/20 shadow-[0_0_0_1px_rgba(34,211,238,0.35)]',
    iconWrap: 'bg-cyan-400/15',
    icon: 'text-cyan-300',
    popover: 'border-cyan-400/50 bg-[#0f1a1c]',
    shadow: 'hover:shadow-[0_18px_40px_-12px_rgba(34,211,238,0.4)]',
  },
  'no-owner': {
    chip: 'border-blue-400/25 bg-blue-500/10',
    chipHover: 'hover:border-blue-300/50 hover:bg-blue-500/15',
    chipActive: 'border-blue-400 bg-blue-500/20 shadow-[0_0_0_1px_rgba(96,165,250,0.35)]',
    iconWrap: 'bg-blue-400/15',
    icon: 'text-blue-300',
    popover: 'border-blue-400/50 bg-[#10182a]',
    shadow: 'hover:shadow-[0_18px_40px_-12px_rgba(96,165,250,0.4)]',
  },
  'freelancer-zero': {
    chip: 'border-emerald-400/25 bg-emerald-500/10',
    chipHover: 'hover:border-emerald-300/50 hover:bg-emerald-500/15',
    chipActive: 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_0_1px_rgba(52,211,153,0.35)]',
    iconWrap: 'bg-emerald-400/15',
    icon: 'text-emerald-300',
    popover: 'border-emerald-400/50 bg-[#0f1a16]',
    shadow: 'hover:shadow-[0_18px_40px_-12px_rgba(52,211,153,0.4)]',
  },
};

const fallbackAccent: Accent = accentsById['small-change'];

type Props = {
  eyebrow: string;
  title: string;
  items: readonly VibeItem[];
};

export default function VibeCodingGrid({ eyebrow, title, items }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pinnedIdRef = useRef<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const baseId = useId();

  pinnedIdRef.current = pinnedId;

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setOpenId(pinnedIdRef.current);
    }, 120);
  };

  const show = (id: string) => {
    clearCloseTimer();
    setOpenId(id);
  };

  const togglePin = (id: string) => {
    clearCloseTimer();
    if (pinnedId === id) {
      setPinnedId(null);
      setOpenId(null);
      return;
    }
    setPinnedId(id);
    setOpenId(id);
  };

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!gridRef.current?.contains(event.target as Node)) {
        setPinnedId(null);
        setOpenId(null);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPinnedId(null);
        setOpenId(null);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      clearCloseTimer();
    };
  }, []);

  return (
    <section id="vibe-coding" className="site-section overflow-visible bg-[#0a1423] text-white">
      <div className="site-container overflow-visible">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-extrabold text-[#75b7ff]">
            {eyebrow}
          </p>
          <h2 className="hero-display text-4xl font-black leading-[0.98] md:text-6xl">{title}</h2>
        </div>
        <div ref={gridRef} className="mx-auto grid max-w-5xl gap-3 overflow-visible sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = iconMap[item.icon] ?? FaQuestionCircle;
            const accent = accentsById[item.id] ?? fallbackAccent;
            const isOpen = openId === item.id;
            const panelId = `${baseId}-${item.id}`;

            return (
              <div
                key={item.id}
                className={`relative ${isOpen ? 'z-30' : 'z-0'}`}
                onMouseEnter={() => show(item.id)}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  onClick={() => togglePin(item.id)}
                  onFocus={() => show(item.id)}
                  onBlur={scheduleClose}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className={`flex w-full origin-center items-center gap-3 rounded-[22px] border px-4 py-3.5 text-start text-sm font-semibold leading-6 text-slate-100 transition duration-300 ease-out will-change-transform hover:z-10 hover:scale-[1.045] focus-visible:scale-[1.045] active:scale-[0.98] ${accent.chip} ${accent.chipHover} ${accent.shadow} ${
                    isOpen ? `${accent.chipActive} scale-[1.045]` : 'scale-100'
                  }`}
                >
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${accent.iconWrap}`}>
                    <Icon className={`h-4 w-4 ${accent.icon}`} aria-hidden="true" />
                  </span>
                  <span className="flex-1">{item.label}</span>
                </button>
                {isOpen ? (
                  <div
                    id={panelId}
                    role="tooltip"
                    onMouseEnter={() => show(item.id)}
                    onMouseLeave={scheduleClose}
                    className={`vibe-popover absolute inset-x-0 top-[calc(100%+0.5rem)] origin-top rounded-[20px] border p-4 text-sm font-medium leading-7 text-slate-200 shadow-2xl shadow-black/50 ${accent.popover}`}
                  >
                    {item.problem}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

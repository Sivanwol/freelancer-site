'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { sitePaths } from '@/lib/site-paths';
import {
  FaAdjust,
  FaFont,
  FaLink,
  FaMinus,
  FaPauseCircle,
  FaPlus,
  FaTimes,
  FaUniversalAccess,
} from 'react-icons/fa';

type AccessibilityState = {
  fontStep: number;
  highContrast: boolean;
  highlightLinks: boolean;
  reduceMotion: boolean;
  readableFont: boolean;
};

const STORAGE_KEY = 'devco-accessibility-preferences';
const defaultState: AccessibilityState = {
  fontStep: 0,
  highContrast: false,
  highlightLinks: false,
  reduceMotion: false,
  readableFont: false,
};

function clampFontStep(value: number) {
  return Math.min(2, Math.max(-2, value));
}

function readStoredSettings(): AccessibilityState {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState;
    const parsed = JSON.parse(stored) as Partial<AccessibilityState>;
    return {
      fontStep: clampFontStep(Number(parsed.fontStep ?? 0)),
      highContrast: Boolean(parsed.highContrast),
      highlightLinks: Boolean(parsed.highlightLinks),
      reduceMotion: Boolean(parsed.reduceMotion),
      readableFont: Boolean(parsed.readableFont),
    };
  } catch {
    return defaultState;
  }
}

function applySettings(settings: AccessibilityState) {
  const root = document.documentElement;
  root.style.fontSize = settings.fontStep ? `${100 + settings.fontStep * 10}%` : '';
  root.classList.toggle('a11y-high-contrast', settings.highContrast);
  root.classList.toggle('a11y-highlight-links', settings.highlightLinks);
  root.classList.toggle('a11y-reduce-motion', settings.reduceMotion);
  root.classList.toggle('a11y-readable-font', settings.readableFont);
}

export default function AccessibilityWidget() {
  const locale = useLocale();
  const isHebrew = locale === 'he';
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilityState>(defaultState);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const labels = useMemo(
    () =>
      isHebrew
        ? {
            open: 'פתיחת תפריט נגישות',
            close: 'סגירת תפריט נגישות',
            title: 'תפריט נגישות',
            textSize: 'גודל טקסט',
            decreaseText: 'הקטנת טקסט',
            increaseText: 'הגדלת טקסט',
            highContrast: 'ניגודיות גבוהה',
            highlightLinks: 'הדגשת קישורים',
            readableFont: 'גופן קריא',
            reduceMotion: 'עצור אנימציות',
            reset: 'איפוס',
            statement: 'הצהרת נגישות מלאה',
            on: 'פעיל',
            off: 'כבוי',
          }
        : {
            open: 'Open accessibility menu',
            close: 'Close accessibility menu',
            title: 'Accessibility menu',
            textSize: 'Text size',
            decreaseText: 'Decrease text',
            increaseText: 'Increase text',
            highContrast: 'High contrast',
            highlightLinks: 'Highlight links',
            readableFont: 'Readable font',
            reduceMotion: 'Stop animations',
            reset: 'Reset',
            statement: 'Full accessibility statement',
            on: 'On',
            off: 'Off',
          },
    [isHebrew],
  );

  useEffect(() => {
    const stored = readStoredSettings();
    setSettings(stored);
    applySettings(stored);
  }, []);

  useEffect(() => {
    applySettings(settings);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Persistence is optional.
    }
  }, [settings]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || toggleRef.current?.contains(target)) {
        return;
      }
      setIsOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  function updateSettings(update: Partial<AccessibilityState>) {
    setSettings((current) => ({ ...current, ...update }));
  }

  function resetSettings() {
    setSettings(defaultState);
  }

  const fontPercent = 100 + settings.fontStep * 10;

  return (
    <div className={`fixed bottom-6 z-[60] ${isHebrew ? 'left-6' : 'right-6'}`}>
      <div
        ref={panelRef}
        id="accessibility-panel"
        className={`absolute bottom-20 w-72 rounded-3xl border border-stone-800 bg-stone-900 p-6 shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-8 opacity-0'
        } ${isHebrew ? 'left-0' : 'right-0'}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-label={labels.title}
      >
        <div className="mb-6 flex items-center justify-between border-b border-stone-800 pb-2">
          <h2 className="text-base font-bold text-white">{labels.title}</h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-full text-stone-400 transition hover:text-white"
            aria-label={labels.close}
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-stone-800 bg-stone-950/80 p-3">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-stone-300">
              <span>{labels.textSize}</span>
              <span className="text-amber-400">{fontPercent}%</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => updateSettings({ fontStep: clampFontStep(settings.fontStep - 1) })} className="a11y-action">
                <FaMinus aria-hidden="true" />
                {labels.decreaseText}
              </button>
              <button type="button" onClick={() => updateSettings({ fontStep: clampFontStep(settings.fontStep + 1) })} className="a11y-action">
                <FaPlus aria-hidden="true" />
                {labels.increaseText}
              </button>
            </div>
          </div>

          <ToggleRow
            icon={<FaAdjust aria-hidden="true" />}
            label={labels.highContrast}
            enabled={settings.highContrast}
            onText={labels.on}
            offText={labels.off}
            onClick={() => updateSettings({ highContrast: !settings.highContrast })}
          />
          <ToggleRow
            icon={<FaLink aria-hidden="true" />}
            label={labels.highlightLinks}
            enabled={settings.highlightLinks}
            onText={labels.on}
            offText={labels.off}
            onClick={() => updateSettings({ highlightLinks: !settings.highlightLinks })}
          />
          <ToggleRow
            icon={<FaFont aria-hidden="true" />}
            label={labels.readableFont}
            enabled={settings.readableFont}
            onText={labels.on}
            offText={labels.off}
            onClick={() => updateSettings({ readableFont: !settings.readableFont })}
          />
          <ToggleRow
            icon={<FaPauseCircle aria-hidden="true" />}
            label={labels.reduceMotion}
            enabled={settings.reduceMotion}
            onText={labels.on}
            offText={labels.off}
            onClick={() => updateSettings({ reduceMotion: !settings.reduceMotion })}
          />

          <Link href={sitePaths.accessibilityStatement} className="mt-2 block text-sm text-amber-400 hover:underline">
            {labels.statement}
          </Link>

          <button type="button" onClick={resetSettings} className="mt-2 w-full rounded-xl border border-stone-700 py-2 text-sm font-bold text-stone-300 hover:border-amber-600">
            {labels.reset}
          </button>
        </div>
      </div>

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="grid h-14 w-14 place-items-center rounded-full bg-amber-600 text-white shadow-2xl transition hover:scale-105 hover:bg-amber-500"
        aria-label={isOpen ? labels.close : labels.open}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        <FaUniversalAccess className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}

function ToggleRow({
  icon,
  label,
  enabled,
  onText,
  offText,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  enabled: boolean;
  onText: string;
  offText: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-sm font-semibold transition ${
        enabled ? 'border-amber-600/50 bg-amber-600/10 text-amber-300' : 'border-stone-800 bg-stone-950/50 text-stone-300 hover:border-stone-600'
      }`}
      aria-pressed={enabled}
    >
      <span className="inline-flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span className="text-xs font-bold text-stone-400">{enabled ? onText : offText}</span>
    </button>
  );
}

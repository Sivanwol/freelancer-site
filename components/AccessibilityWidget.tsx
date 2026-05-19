'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { FaAdjust, FaLink, FaMinus, FaPlus, FaTimes, FaUniversalAccess } from 'react-icons/fa';

type AccessibilityState = {
  fontStep: number;
  highContrast: boolean;
  highlightLinks: boolean;
  reduceMotion: boolean;
};

const STORAGE_KEY = 'devco-accessibility-preferences';
const defaultState: AccessibilityState = {
  fontStep: 0,
  highContrast: false,
  highlightLinks: false,
  reduceMotion: false,
};

function clampFontStep(value: number) {
  return Math.min(2, Math.max(0, value));
}

export default function AccessibilityWidget() {
  const locale = useLocale();
  const isHebrew = locale === 'he';
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilityState>(defaultState);

  const labels = useMemo(
    () =>
      isHebrew
        ? {
            open: 'פתיחת תפריט נגישות',
            close: 'סגירת תפריט נגישות',
            title: 'אפשרויות נגישות',
            textSize: 'גודל טקסט',
            decreaseText: 'הקטנת טקסט',
            increaseText: 'הגדלת טקסט',
            highContrast: 'ניגודיות גבוהה',
            highlightLinks: 'הדגשת קישורים',
            reduceMotion: 'צמצום אנימציות',
            reset: 'איפוס',
            on: 'פעיל',
            off: 'כבוי',
          }
        : {
            open: 'Open accessibility menu',
            close: 'Close accessibility menu',
            title: 'Accessibility options',
            textSize: 'Text size',
            decreaseText: 'Decrease text',
            increaseText: 'Increase text',
            highContrast: 'High contrast',
            highlightLinks: 'Highlight links',
            reduceMotion: 'Reduce motion',
            reset: 'Reset',
            on: 'On',
            off: 'Off',
          },
    [isHebrew]
  );

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<AccessibilityState>;
        setSettings({
          fontStep: clampFontStep(Number(parsed.fontStep ?? 0)),
          highContrast: Boolean(parsed.highContrast),
          highlightLinks: Boolean(parsed.highlightLinks),
          reduceMotion: Boolean(parsed.reduceMotion),
        });
      }
    } catch {
      setSettings(defaultState);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = settings.fontStep ? `${100 + settings.fontStep * 10}%` : '';
    root.classList.toggle('a11y-high-contrast', settings.highContrast);
    root.classList.toggle('a11y-highlight-links', settings.highlightLinks);
    root.classList.toggle('a11y-reduce-motion', settings.reduceMotion);

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Preference persistence is optional; the controls still work for the current session.
    }

    return () => {
      root.style.fontSize = '';
      root.classList.remove('a11y-high-contrast', 'a11y-highlight-links', 'a11y-reduce-motion');
    };
  }, [settings]);

  function updateSettings(update: Partial<AccessibilityState>) {
    setSettings((current) => ({ ...current, ...update }));
  }

  function resetSettings() {
    setSettings(defaultState);
  }

  const fontPercent = 100 + settings.fontStep * 10;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div
          className="mb-3 w-[min(calc(100vw-2.5rem),22rem)] rounded-2xl border border-[#c7d9ee] bg-white p-4 text-[#0d1626] shadow-2xl shadow-blue-950/15"
          role="dialog"
          aria-label={labels.title}
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-black">{labels.title}</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-full border border-[#dbe7f5] text-[#526174] transition hover:border-[#4c9df2] hover:text-[#1d72d2]"
              aria-label={labels.close}
            >
              <FaTimes className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4 rounded-xl border border-[#dbe7f5] bg-[#f8fbff] p-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-sm font-extrabold">{labels.textSize}</span>
              <span className="text-sm font-black text-[#1d72d2]">{fontPercent}%</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updateSettings({ fontStep: clampFontStep(settings.fontStep - 1) })}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c7d9ee] bg-white px-3 py-2 text-sm font-extrabold transition hover:border-[#4c9df2] hover:text-[#1d72d2]"
              >
                <FaMinus className="h-3 w-3" aria-hidden="true" />
                {labels.decreaseText}
              </button>
              <button
                type="button"
                onClick={() => updateSettings({ fontStep: clampFontStep(settings.fontStep + 1) })}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c7d9ee] bg-white px-3 py-2 text-sm font-extrabold transition hover:border-[#4c9df2] hover:text-[#1d72d2]"
              >
                <FaPlus className="h-3 w-3" aria-hidden="true" />
                {labels.increaseText}
              </button>
            </div>
          </div>

          <div className="mt-3 grid gap-2">
            <ToggleButton
              icon={<FaAdjust className="h-4 w-4" aria-hidden="true" />}
              label={labels.highContrast}
              enabled={settings.highContrast}
              onText={labels.on}
              offText={labels.off}
              onClick={() => updateSettings({ highContrast: !settings.highContrast })}
            />
            <ToggleButton
              icon={<FaLink className="h-4 w-4" aria-hidden="true" />}
              label={labels.highlightLinks}
              enabled={settings.highlightLinks}
              onText={labels.on}
              offText={labels.off}
              onClick={() => updateSettings({ highlightLinks: !settings.highlightLinks })}
            />
            <ToggleButton
              icon={<FaUniversalAccess className="h-4 w-4" aria-hidden="true" />}
              label={labels.reduceMotion}
              enabled={settings.reduceMotion}
              onText={labels.on}
              offText={labels.off}
              onClick={() => updateSettings({ reduceMotion: !settings.reduceMotion })}
            />
          </div>

          <button
            type="button"
            onClick={resetSettings}
            className="mt-4 w-full rounded-full border border-[#c7d9ee] bg-white px-4 py-2.5 text-sm font-extrabold text-[#526174] transition hover:border-[#4c9df2] hover:text-[#1d72d2]"
          >
            {labels.reset}
          </button>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="grid h-12 w-12 place-items-center rounded-full border border-[#c7d9ee] bg-white text-[#1d72d2] shadow-lg shadow-blue-950/10 transition hover:border-[#4c9df2] hover:bg-[#f8fbff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d72d2]"
        aria-label={isOpen ? labels.close : labels.open}
        aria-expanded={isOpen}
      >
        {isOpen ? <FaTimes className="h-4 w-4" aria-hidden="true" /> : <FaUniversalAccess className="h-5 w-5" aria-hidden="true" />}
      </button>
    </div>
  );
}

function ToggleButton({
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
      className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-3 text-sm font-extrabold transition ${
        enabled
          ? 'border-[#4c9df2] bg-[#e7f2ff] text-[#1d72d2]'
          : 'border-[#dbe7f5] bg-white text-[#0d1626] hover:border-[#4c9df2] hover:text-[#1d72d2]'
      }`}
      aria-pressed={enabled}
    >
      <span className="inline-flex items-center gap-3">
        {icon}
        {label}
      </span>
      <span className="rounded-full bg-white px-2 py-1 text-xs font-black text-[#526174]">{enabled ? onText : offText}</span>
    </button>
  );
}

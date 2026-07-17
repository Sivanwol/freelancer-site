'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import { getCompanyContent } from '@/lib/company-content';

type ContactFormProps = {
  source: string;
  compact?: boolean;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  website: string;
  company: string;
  serviceType: string;
};

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  website: '',
  company: '',
  serviceType: '',
};

export default function ContactForm({ source, compact = false }: ContactFormProps) {
  const locale = useLocale();
  const content = getCompanyContent(locale);
  const formCopy = content.contact.form;
  const language = locale === 'en' ? 'en' : 'he';
  const [values, setValues] = useState<FormState>(initialState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>(formCopy.error);
  const inFlightRef = useRef(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const updateField = (field: keyof FormState, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const dismissSuccess = () => {
    setStatus('idle');
  };

  useEffect(() => {
    if (status !== 'success') return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dismissSuccess();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [status]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlightRef.current || status === 'submitting') {
      return;
    }

    inFlightRef.current = true;
    setStatus('submitting');
    setErrorMessage(formCopy.error);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          language,
          source,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setErrorMessage(payload?.error || formCopy.error);
        setStatus('error');
        return;
      }

      setValues(initialState);
      setStatus('success');
    } catch {
      setErrorMessage(formCopy.error);
      setStatus('error');
    } finally {
      inFlightRef.current = false;
    }
  };

  const fieldClassName =
    'w-full rounded-xl border border-[#dce8f5] bg-[#fbfcfe] px-3.5 py-2.5 text-sm font-medium text-[#0d1626] outline-none transition placeholder:text-[#9aa8bc] focus:border-[#7eb4ea] focus:bg-white focus:ring-2 focus:ring-[#7eb4ea]/20';

  return (
    <>
      <form onSubmit={onSubmit} className="grid gap-3.5 text-start" noValidate>
        <div className={`grid gap-3.5 ${compact ? '' : 'sm:grid-cols-2'}`}>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6b7c90]">
              {formCopy.name}
            </span>
            <input
              required
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(event) => updateField('name', event.target.value)}
              className={fieldClassName}
            />
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6b7c90]">
              {formCopy.phone}
            </span>
            <input
              required
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              className={fieldClassName}
            />
          </label>
        </div>

        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6b7c90]">
            {formCopy.email}
          </span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField('email', event.target.value)}
            className={fieldClassName}
          />
        </label>

        <div className={`grid gap-3.5 ${compact ? '' : 'sm:grid-cols-2'}`}>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6b7c90]">
              {formCopy.company}
            </span>
            <input
              name="company"
              autoComplete="organization"
              value={values.company}
              onChange={(event) => updateField('company', event.target.value)}
              className={fieldClassName}
            />
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6b7c90]">
              {formCopy.website}
            </span>
            <input
              name="website"
              type="text"
              inputMode="url"
              autoComplete="url"
              value={values.website}
              onChange={(event) => updateField('website', event.target.value)}
              className={fieldClassName}
            />
          </label>
        </div>

        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6b7c90]">
            {formCopy.serviceType}
          </span>
          <select
            required
            name="serviceType"
            value={values.serviceType}
            onChange={(event) => updateField('serviceType', event.target.value)}
            className={`${fieldClassName} appearance-none bg-[length:12px] bg-[right_0.9rem_center] bg-no-repeat pe-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7c90' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="" disabled>
              {formCopy.servicePlaceholder}
            </option>
            {formCopy.serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary mt-1 w-full justify-center disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status === 'submitting' ? formCopy.submitting : formCopy.submit}
        </button>

        {status === 'error' ? (
          <p
            className="rounded-xl border border-red-100 bg-red-50/80 px-3.5 py-2.5 text-sm font-medium text-red-700"
            role="alert"
          >
            {errorMessage}
          </p>
        ) : null}
      </form>

      {status === 'success' ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-[#0a1423]/55 backdrop-blur-[2px]"
            aria-label={formCopy.successClose}
            onClick={dismissSuccess}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            aria-describedby="contact-success-body"
            className="relative z-10 w-full max-w-md rounded-[28px] border border-[#dbe7f5] bg-white p-7 shadow-2xl shadow-blue-950/20"
          >
            <button
              type="button"
              onClick={dismissSuccess}
              className="absolute top-4 grid h-9 w-9 place-items-center rounded-full border border-[#d5e4f4] text-[#526174] transition hover:border-[#9cc7f0] hover:text-[#1d72d2] ltr:right-4 rtl:left-4"
              aria-label={formCopy.successClose}
            >
              <FaTimes className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="flex flex-col items-center text-center">
              <FaCheckCircle className="mb-4 h-12 w-12 text-[#1d72d2]" aria-hidden="true" />
              <h2
                id="contact-success-title"
                className="text-2xl font-black leading-tight text-[#0d1626]"
              >
                {formCopy.successTitle}
              </h2>
              <p
                id="contact-success-body"
                className="mt-3 text-base font-medium leading-7 text-[#526174]"
              >
                {formCopy.success}
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={dismissSuccess}
                className="btn-primary mt-7 w-full justify-center sm:w-auto"
              >
                {formCopy.successClose}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

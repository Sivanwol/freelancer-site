'use client';

import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { FaCalendarCheck } from 'react-icons/fa';
import type { ReactNode } from 'react';

const calConfig = {
  layout: 'month_view',
  theme: 'light',
} as const;

const calNamespace = 'discovery-call';

let calPromise: ReturnType<typeof getCalApi> | null = null;

async function getConfiguredCal() {
  if (!calPromise) {
    calPromise = getCalApi({ namespace: calNamespace });
  }

  return calPromise;
}

type CalBookingButtonProps = {
  calLink: string;
  children: ReactNode;
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
  ariaLabel?: string;
  onOpen?: () => void;
};

export default function CalBookingButton({
  calLink,
  children,
  className = 'btn-primary',
  iconClassName = 'h-4 w-4',
  showIcon = true,
  ariaLabel,
  onOpen,
}: CalBookingButtonProps) {
  useEffect(() => {
    void getConfiguredCal();
  }, []);

  return (
    <button
      type="button"
      onClick={onOpen}
      data-cal-namespace={calNamespace}
      data-cal-link={calLink}
      data-cal-config={JSON.stringify(calConfig)}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
      {showIcon ? <FaCalendarCheck className={iconClassName} aria-hidden="true" /> : null}
    </button>
  );
}

'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { reportWebVitals } from '@/lib/web-vitals';

export default function WebVitalsReporter() {
  useReportWebVitals(reportWebVitals);
  return null;
}

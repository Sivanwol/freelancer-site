/**
 * Web Vitals reporting utility
 *
 * Core Web Vitals are Google ranking signals:
 * - LCP (Largest Contentful Paint): loading performance
 * - INP (Interaction to Next Paint): interactivity
 * - CLS (Cumulative Layout Shift): visual stability
 * - FCP (First Contentful Paint): perceived load speed
 * - TTFB (Time to First Byte): server responsiveness
 *
 * These metrics are sent to Google Analytics when GA_MEASUREMENT_ID is set.
 * Uses Next.js built-in web vitals types — no external package needed.
 */

interface WebVitalMetric {
  id: string;
  name: string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function reportWebVitals(metric: WebVitalMetric) {
  if (!GA_MEASUREMENT_ID) return;

  // Send to Google Analytics
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

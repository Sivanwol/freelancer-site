export const siteConfig = {
  name: 'Sivan Wolberg Portfolio',
  author: 'Sivan Wolberg',
  jobTitle: 'Full Stack & AI Developer',
  email: 'fastwings@gmail.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.devco-solution.online',
  social: {
    linkedin: 'https://www.linkedin.com/in/swolberg',
    upwork: 'https://upwork.com/freelancers/swolberg',
  },
  locale: {
    default: 'he' as const,
    supported: ['he', 'en'] as const,
  },
  theme: {
    background: '#111827',
    foreground: '#f0f6fc',
  },
  verification: {
    google: 'SLo_aGwT241-MU7vu68QtpEX4G8GXrlioxS8RBhJzEM',
  },
} as const;

export function getBaseUrl(): string {
  return siteConfig.url;
}

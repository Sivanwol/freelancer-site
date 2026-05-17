export const siteConfig = {
  name: 'DevCo Solutions',
  legalName: 'DevCo Solution',
  author: 'Sivan Wolberg',
  jobTitle: 'CEO, DevCo Solutions',
  email: 'info@devco-solution.online',
  fallbackEmail: 'fastwings@gmail.com',
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
    background: '#07111f',
    foreground: '#f3f7fb',
  },
  verification: {
    google: 'SLo_aGwT241-MU7vu68QtpEX4G8GXrlioxS8RBhJzEM',
  },
} as const;

export function getBaseUrl(): string {
  return siteConfig.url;
}

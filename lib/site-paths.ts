export const sitePaths = {
  home: '/',
  softwareDevelopment: '/software-development',
  ragProduction: '/rag-production',
  businessAutomation: '/business-automation',
  aboutUs: '/about-us',
  blog: '/blog',
  contact: '/contact',
  termsOfUse: '/terms-of-use',
  privacyPolicy: '/privacy-policy',
  accessibilityStatement: '/accessibility-statement',
} as const;

export const publicSitemapPaths = [
  sitePaths.home,
  sitePaths.softwareDevelopment,
  sitePaths.ragProduction,
  sitePaths.businessAutomation,
  sitePaths.aboutUs,
  sitePaths.blog,
  sitePaths.contact,
  sitePaths.termsOfUse,
  sitePaths.privacyPolicy,
  sitePaths.accessibilityStatement,
] as const;

/** Content revision dates. Not a build-time stamp shared by every URL. */
export const staticContentUpdatedAt: Record<(typeof publicSitemapPaths)[number], string> = {
  [sitePaths.home]: '2026-10-06',
  [sitePaths.softwareDevelopment]: '2026-10-06',
  [sitePaths.ragProduction]: '2026-10-06',
  [sitePaths.businessAutomation]: '2026-10-06',
  [sitePaths.aboutUs]: '2026-10-06',
  [sitePaths.blog]: '2026-10-06',
  [sitePaths.contact]: '2026-10-06',
  [sitePaths.termsOfUse]: '2026-05-19',
  [sitePaths.privacyPolicy]: '2026-10-06',
  [sitePaths.accessibilityStatement]: '2026-10-06',
};

export function sitemapPriority(path: string): number {
  switch (path) {
    case sitePaths.home:
      return 1;
    case sitePaths.ragProduction:
      return 0.95;
    case sitePaths.softwareDevelopment:
      return 0.9;
    case sitePaths.aboutUs:
    case sitePaths.contact:
      return 0.8;
    case sitePaths.blog:
      return 0.6;
    case sitePaths.businessAutomation:
      return 0.5;
    case sitePaths.termsOfUse:
    case sitePaths.privacyPolicy:
    case sitePaths.accessibilityStatement:
      return 0.3;
    default:
      return 0.5;
  }
}

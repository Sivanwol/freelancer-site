export const sitePaths = {
  home: '/',
  softwareDevelopment: '/software-development',
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
  sitePaths.businessAutomation,
  sitePaths.aboutUs,
  sitePaths.blog,
  sitePaths.contact,
  sitePaths.termsOfUse,
  sitePaths.privacyPolicy,
  sitePaths.accessibilityStatement,
] as const;

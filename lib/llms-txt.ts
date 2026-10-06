import { siteConfig, getBaseUrl } from '@/lib/config';
import { companyContent } from '@/lib/company-content';
import { sitePaths } from '@/lib/site-paths';

function pageUrl(path: string): string {
  const baseUrl = getBaseUrl();
  const normalizedPath = path === '/' ? '' : path;
  return `${baseUrl}/he${normalizedPath}`;
}

export function generateLlmsTxt(): string {
  const he = companyContent.he;
  const baseUrl = getBaseUrl();

  return `# ${siteConfig.name}

> DevCo Solutions / Sivan Wolberg — software architect and CTO for product systems and AI in production. Full-stack product work in Next.js, React, Node.js, NestJS, Laravel, and Python/FastAPI. Repairing a live chat is one of the services.

${he.home.subtitle}

## Pages

- [Home](${pageUrl(sitePaths.home)}): ${he.meta.defaultDescription}
- [RAG production repair](${pageUrl(sitePaths.ragProduction)}): ${he.meta.ragDescription}
- [AI features in an existing product](${pageUrl(sitePaths.softwareDevelopment)}): ${he.meta.softwareDescription}
- [About Sivan Wolberg](${pageUrl(sitePaths.aboutUs)}): ${he.aboutPage.subtitle}
- [Blog](${pageUrl(sitePaths.blog)}): ${he.blog.subtitle}
- [Contact](${pageUrl(sitePaths.contact)}): ${he.meta.contactDescription}
- [Integrations around AI systems](${pageUrl(sitePaths.businessAutomation)}): Supporting integrations only, when a live AI system needs a connection to an existing process. Not the lead offer.
- [Privacy Policy](${pageUrl(sitePaths.privacyPolicy)}): ${he.meta.privacyDescription}
- [Accessibility Statement](${pageUrl(sitePaths.accessibilityStatement)}): ${he.meta.accessibilityDescription}

## Core Topics

- RAG repair for a chat already in production
- LLM evals and release gates
- ACL for retrieval
- AI agents in production
- NestJS, Next.js, and Python/FastAPI

## Company

- **Legal name**: ${siteConfig.legalName}
- **Founder**: ${siteConfig.author}
- **Role**: ${he.home.title}
- **Location**: Haifa, Israel
- **Email**: ${siteConfig.email}
- **Phone**: ${siteConfig.phoneDisplay}
- **LinkedIn**: ${he.brand.linkedin}
- **Upwork**: ${he.brand.upwork}
- **Default locale**: Hebrew (\`/he\`, x-default)
- **English**: paused (not currently served)
- **Contact page**: ${pageUrl(sitePaths.contact)}

## Legal

- [Privacy Policy](${pageUrl(sitePaths.privacyPolicy)})
- [Terms of Use](${pageUrl(sitePaths.termsOfUse)})
- [Accessibility Statement](${pageUrl(sitePaths.accessibilityStatement)})

## Sitemap

- [sitemap.xml](${baseUrl}/sitemap.xml)
`;
}

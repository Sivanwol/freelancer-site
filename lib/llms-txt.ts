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

> Primary offer (2026): repair RAG / AI chat that is already live in a SaaS product — wrong answers, missing citations, ACL leaks, and no eval gates. Secondary offer: build a new product from scratch until it is live.

${he.meta.ragDescription}

## Primary service

- [RAG production repair](${pageUrl(sitePaths.ragProduction)}): ${he.meta.ragDescription}

## Secondary service

- [Build from scratch](${pageUrl(sitePaths.softwareDevelopment)}): ${he.meta.softwareDescription}

## Pages

- [Home (Hebrew)](${pageUrl(sitePaths.home)}): ${he.meta.defaultDescription}
- [About Sivan Wolberg](${pageUrl(sitePaths.aboutUs)}): ${he.aboutPage.subtitle}
- [Blog](${pageUrl(sitePaths.blog)}): ${he.blog.subtitle}
- [Contact](${pageUrl(sitePaths.contact)}): ${he.meta.contactDescription}
- [Integrations (supporting)](${pageUrl(sitePaths.businessAutomation)}): ${he.meta.automationDescription}
- [Privacy Policy](${pageUrl(sitePaths.privacyPolicy)}): ${he.meta.privacyDescription}
- [Accessibility Statement](${pageUrl(sitePaths.accessibilityStatement)}): ${he.meta.accessibilityDescription}

## Core Topics

- Live RAG chat repair in SaaS (retrieval, citations, ACL, evals)
- LLM evals and release gates before shipping prompt changes
- AI agents and tool calling in production
- NestJS, Next.js, Python/FastAPI delivery

## Company

- **Legal name**: ${siteConfig.legalName} (${siteConfig.legalEntityDescription})
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
- [Accessibility Statement](${pageUrl(sitePaths.accessibilityStatement)}

## Sitemap

- [sitemap.xml](${baseUrl}/sitemap.xml)
`;
}

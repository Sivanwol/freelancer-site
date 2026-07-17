import { siteConfig, getBaseUrl } from '@/lib/config';
import { companyContent } from '@/lib/company-content';
import { sitePaths } from '@/lib/site-paths';

function pageUrl(path: string, locale: 'en' | 'he' = 'en'): string {
  const baseUrl = getBaseUrl();
  const normalizedPath = path === '/' ? '' : path;
  return `${baseUrl}/${locale}${normalizedPath}`;
}

export function generateLlmsTxt(): string {
  const content = companyContent.en;
  const baseUrl = getBaseUrl();

  const pages = [
    {
      title: 'Home',
      path: sitePaths.home,
      description: content.meta.defaultDescription,
    },
    {
      title: 'Custom Software Development',
      path: sitePaths.softwareDevelopment,
      description: content.meta.softwareDescription,
    },
    {
      title: 'Business Automation Solutions',
      path: sitePaths.businessAutomation,
      description: content.meta.automationDescription,
    },
    {
      title: 'About DevCo Solutions',
      path: sitePaths.aboutUs,
      description: content.meta.aboutDescription,
    },
    {
      title: 'Blog',
      path: sitePaths.blog,
      description: content.blog.subtitle,
    },
    {
      title: 'Contact',
      path: sitePaths.contact,
      description: content.meta.contactDescription,
    },
    {
      title: 'Privacy Policy',
      path: sitePaths.privacyPolicy,
      description: content.meta.privacyDescription,
    },
    {
      title: 'Accessibility Statement',
      path: sitePaths.accessibilityStatement,
      description: content.meta.accessibilityDescription,
    },
  ];

  const pageLines = pages
    .map(
      (page) =>
        `- [${page.title}](${pageUrl(page.path)}): ${page.description} (Hebrew: ${pageUrl(page.path, 'he')})`,
    )
    .join('\n');

  const softwareServices = content.softwarePage.services
    .map((service) => `- **${service.title}**: ${service.text}`)
    .join('\n');

  const automationServices = content.automationPage.services
    .map((service) => `- **${service.title}**: ${service.text}`)
    .join('\n');

  return `# ${siteConfig.name}

> ${content.meta.defaultDescription}

${content.home.subtitle}

## Pages

${pageLines}

## Services

### Custom Software Development

${softwareServices}

### Business Automation

${automationServices}

## Company

- **Legal name**: ${siteConfig.legalName}
- **Founder / CEO**: ${siteConfig.author}
- **Location**: Haifa, Israel
- **Email**: ${siteConfig.email}
- **Phone**: ${siteConfig.phoneDisplay}
- **LinkedIn**: ${content.brand.linkedin}
- **Upwork**: ${content.brand.upwork}
- **Default locale**: Hebrew (\`/he\`, x-default)
- **English mirror**: \`${baseUrl}/en\`
- **Contact page**: ${pageUrl(sitePaths.contact)}
- **Contact section**: ${pageUrl(sitePaths.home)}#contact

## Core Topics

- Custom software development
- SaaS and MVP development
- Web and mobile applications
- Backend APIs and scalable platforms
- AI agents, smarter bots, and agentic workflows
- Business automation and CRM integrations
- Workflow automation with n8n, Make, and Zapier

## Legal

- [Privacy Policy](${pageUrl(sitePaths.privacyPolicy)})
- [Accessibility Statement](${pageUrl(sitePaths.accessibilityStatement)})

## Sitemap

- [sitemap.xml](${baseUrl}/sitemap.xml)
`;
}

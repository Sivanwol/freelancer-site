import { sitePaths } from '@/lib/site-paths';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export type Locale = 'he' | 'en';

export type Showcase = {
  slug: string;
  image: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  technologies: string[];
  result: string;
};

export const serviceRoutes = {
  software: sitePaths.softwareDevelopment,
  automation: sitePaths.businessAutomation,
  about: sitePaths.aboutUs,
} as const;

export const companyContent = {
  en: {
    brand: {
      name: 'DevCo Solutions',
      legalName: 'DevCo Solution',
      tagline: 'Innovate Now',
      email: 'info@devco-solution.online',
      fallbackEmail: 'fastwings@gmail.com',
      phone: '+972545566786',
      phoneDisplay: '+972 54-556-6786',
      whatsappMessage:
        "Hi, I'm interested in your services. When can we talk about starting a project?",
      upwork: 'https://upwork.com/freelancers/swolberg',
      linkedin: 'https://www.linkedin.com/in/swolberg',
    },
    nav: {
      home: 'Home',
      software: 'Software',
      automation: 'Automation',
      showcases: 'Showcases',
      about: 'About',
      blog: 'Blog',
      privacy: 'Privacy',
      contact: "Let's Talk",
      menu: 'Open menu',
      close: 'Close menu',
      main: 'Main navigation',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Insights on software development, automation, and AI.',
    },
    cta: {
      primary: "Let's Talk",
      secondary: 'View Showcases',
      software: 'Explore Software',
      automation: 'Explore Automation',
      contact: 'Talk With Our Team',
    },
    home: {
      eyebrow: 'Software development company and automation partner',
      title: 'Software and automation systems built to scale',
      subtitle:
        'DevCo Solutions designs, builds, and modernizes custom software, AI products, CRM automations, and business workflows for teams that need reliable systems, not just code.',
      proof: ['17+ years of architecture experience', 'Top Rated Plus Upwork proof', 'AI, web, mobile, backend, and automation delivery'],
      pathsTitle: 'Choose the track that fits your next move',
      paths: [
        {
          title: 'Custom Software Development',
          description:
            'Full product delivery for SaaS, MVPs, web platforms, mobile apps, APIs, AI features, and scalable backend systems.',
          href: serviceRoutes.software,
          tags: ['React', 'Node.js', 'Python', 'TypeScript', 'React Native', 'AI'],
        },
        {
          title: 'Business Automation',
          description:
            'Workflow automation, CRM integration, dashboards, chatbots, lead routing, and multi-system operations with tools like n8n, Make, Zapier, Monday, Zoho, and HubSpot.',
          href: serviceRoutes.automation,
          tags: ['n8n', 'Make', 'Zapier', 'HubSpot', 'Zoho', 'Monday'],
        },
      ],
      processTitle: 'A clear development process',
      processSubtitle:
        'The onboarding flow from the Canva deck becomes the operating model clients can understand before the first sprint begins.',
      proofTitle: 'Built around senior execution',
      proofText:
        'DevCo combines senior architecture, hands-on delivery, and practical automation thinking so every build has a path from discovery to launch and scale.',
      faq: {
        eyebrow: 'FAQ',
        title: 'Common questions about working with DevCo',
        items: [
          {
            question: 'Who is DevCo Solutions and who leads the work?',
            answer:
              'DevCo Solutions is a software development and business automation company led by Sivan Wolberg, with 17+ years of experience in architecture, full-stack delivery, AI integration, and complex system builds.',
          },
          {
            question: 'How does pricing work?',
            answer:
              'Projects typically start with a focused discovery session, then move into a scoped proposal with milestones, priorities, and clear deliverables. Pricing depends on scope, integrations, and timeline rather than a one-size-fits-all package.',
          },
          {
            question: 'How long does a typical project take?',
            answer:
              'Timelines vary by scope. MVPs and focused automation flows can move quickly after discovery, while larger platforms usually follow a phased plan with a first valuable release before broader scale work.',
          },
          {
            question: 'Do you work with remote teams and international clients?',
            answer:
              'Yes. DevCo works with startups, agencies, and businesses worldwide through structured discovery, planning, delivery updates, and launch support.',
          },
          {
            question: 'What technologies and tools do you cover?',
            answer:
              'DevCo covers custom software with React, Next.js, Node.js, Python, TypeScript, and React Native, plus business automation with n8n, Make, Zapier, HubSpot, Zoho, Monday, APIs, and CRM workflows — and modern AI systems on top of that stack.',
          },
          {
            question: 'Do you build with the latest AI tools and models?',
            answer:
              'Yes. DevCo designs and ships production AI workflows with LangChain and LangGraph, multi-model setups (OpenAI, Claude, Gemini, and others), retrieval/RAG pipelines, agents, tool calling, and cloud AI platforms. The focus is practical product outcomes — assistants, automation, and intelligent features that stay maintainable after launch — not demos.',
          },
        ],
      },
    },
    process: [
      {
        title: 'Step one — Discovery',
        text: 'Clarify business goals, users, systems, risks, integrations, and the first measurable outcome.',
      },
      {
        title: 'Step two — Planning',
        text: 'Translate goals into architecture, scope, milestones, estimates, and a delivery path.',
      },
      {
        title: 'Step three — Build',
        text: 'Build production-ready software, automations, APIs, dashboards, and AI workflows.',
      },
      {
        title: 'Step four — Launch',
        text: 'Deploy, test, observe, and support the system — then improve reliability, automation coverage, and product velocity after release.',
      },
    ],
    processExpectations: {
      title: 'What to expect during the process',
      text:
        'The goal is to make the project feel predictable. We start by understanding the business need, then turn it into a practical delivery plan with clear priorities, communication, milestones, and launch expectations.',
      points: [
        'A focused discovery session that maps goals, users, systems, and the first valuable release.',
        'A clear implementation path with scope, priorities, timeline, and technical direction before development starts.',
        'Ongoing delivery updates, testing, launch support, and a plan for what should improve after release.',
      ],
    },
    softwarePage: {
      eyebrow: 'Software Development Company',
      title: 'Custom software, AI products, and scalable platforms',
      subtitle:
        'You are not hiring another vendor to talk technology. You get a senior partner who owns architecture, delivery judgment, and the systems that keep the business moving — the trusted technical lead behind the product.',
      vibeCoding: {
        eyebrow: 'Sound familiar?',
        title: 'Vibe coding works… until it doesn’t.',
        items: [
          {
            id: 'small-change',
            label: 'A small change breaks something else',
            icon: 'shuffle',
            problem:
              'Without clear boundaries, every tweak ripples through the system. You ship a “tiny” fix and suddenly login, billing, or a core flow fails — because nothing was designed to change safely.',
          },
          {
            id: 'fixing-bugs',
            label: 'Fixing bugs instead of building forward',
            icon: 'bug',
            problem:
              'Velocity dies when the team spends sprints firefighting. New features wait while you chase regressions that keep coming back because root causes were never owned.',
          },
          {
            id: 'nobody-understands',
            label: 'The code works, but nobody understands it',
            icon: 'question',
            problem:
              'If only the model (or one freelancer) “knows” the codebase, every change is a gamble. Readable architecture and ownership are what keep products alive after the demo.',
          },
          {
            id: 'feature-risk',
            label: 'Every new feature feels like a risk',
            icon: 'warning',
            problem:
              'When the foundation is fragile, product decisions turn into fear. Teams stop shipping because they cannot predict what will break — and growth stalls.',
          },
          {
            id: 'ai-dependent',
            label: 'Dependent on AI for everything',
            icon: 'robot',
            problem:
              'AI is a force multiplier when you already understand the system. Blind generation creates chaotic diffs, hidden debt, and code nobody can defend in production.',
          },
          {
            id: 'fragile-system',
            label: 'The system feels fragile',
            icon: 'heart',
            problem:
              'Fragile products fail under real load, edge cases, and messy data. What looked fine in a happy-path demo does not survive customers, integrations, or scale.',
          },
          {
            id: 'demo-fails',
            label: 'Works in demo, fails with real users',
            icon: 'flask',
            problem:
              'Demos hide auth edge cases, empty states, concurrency, and ops reality. Production needs structure, testing, and judgment — not a one-time generated UI.',
          },
          {
            id: 'no-architecture',
            label: 'No architecture — only slides on slides',
            icon: 'layers',
            problem:
              'Pretty decks are not a system. Without domain boundaries, data models, and delivery plans, you rebuild the same product every quarter under a new name.',
          },
          {
            id: 'slow-changes',
            label: 'Simple changes take hours',
            icon: 'hourglass',
            problem:
              'When everything is tangled, a copy change or a field rename becomes archaeology. Maintainable systems make small work stay small.',
          },
          {
            id: 'no-trust',
            label: 'You don’t trust your own product',
            icon: 'shield',
            problem:
              'If shipping feels like crossing your fingers, customers feel it too. Trust comes from predictable releases, ownership, and systems you can explain.',
          },
          {
            id: 'no-owner',
            label: 'Nobody truly owns the code',
            icon: 'users',
            problem:
              'Orphaned codebases stall hiring and burn budget. You need someone who can read the system, stabilize it, and make the next person faster — not restart from zero.',
          },
          {
            id: 'freelancer-zero',
            label: 'Every new freelancer starts from zero',
            icon: 'refresh',
            problem:
              'Without documentation, conventions, and architecture, each handoff resets context. That is expensive, slow, and the opposite of a production-ready product.',
          },
        ],
      },
      services: [
        {
          title: 'SaaS and MVP Development',
          summary:
            'From first version to production platform: product architecture, data models, admin tools, payments, and launch readiness with a clear path after release.',
          technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
          outcomes: [
            'A scoped MVP or SaaS core ready for real users',
            'Clear data models, admin flows, and launch checklist',
            'A path from first release to scale — not a throwaway demo',
          ],
        },
        {
          title: 'Web and Mobile Applications',
          summary:
            'React, Next.js, React Native, and modern frontend systems built for usability, speed, and maintainable growth across real user journeys.',
          technologies: ['React', 'Next.js', 'React Native', 'TypeScript', 'Tailwind CSS', 'Vite'],
          outcomes: [
            'Fast, usable interfaces across web and mobile',
            'Maintainable UI architecture that can grow with the product',
            'Consistent journeys from first visit to core actions',
          ],
        },
        {
          title: 'Backend and API Systems',
          summary:
            'Node.js, Python, NestJS, FastAPI, queues, databases, and secure service boundaries that hold up under real load.',
          technologies: ['Node.js', 'Python', 'NestJS', 'FastAPI', 'PostgreSQL', 'MongoDB', 'APIs'],
          outcomes: [
            'Stable APIs and service boundaries under real traffic',
            'Queues, auth, and data layers designed for ownership',
            'Integrations that stay reliable after launch',
          ],
        },
        {
          title: 'Smarter Bots and Agentic Workflows',
          summary:
            'AI assistants, internal agents, and retrieval pipelines that handle defined tasks — routing, drafting, qualifying — before a human takes over.',
          technologies: ['LangChain', 'LangGraph', 'OpenAI', 'Claude', 'Gemini', 'RAG', 'AI Agents'],
          outcomes: [
            'Agents with clear tasks, handoffs, and guardrails',
            'RAG and tool calling wired into your product — not chaos',
            'AI that expands capability without losing ownership of the system',
          ],
        },
        {
          title: 'Automation and System Integration',
          summary:
            'Connect CRMs, ops tools, APIs, and custom services so product software and business workflows move as one system, not disconnected apps.',
          technologies: ['n8n', 'APIs', 'Webhooks', 'HubSpot', 'Zoho', 'Node.js'],
          outcomes: [
            'Connected systems instead of copy-paste between tools',
            'Observable workflows your team can trust',
            'Less manual ops between product and business process',
          ],
        },
        {
          title: 'Information Systems that Scale',
          summary:
            'Structured platforms for operations, customer data, and internal tooling — designed for clarity, ownership, and long-term evolution without BI fluff.',
          technologies: ['TypeScript', 'Next.js', 'PostgreSQL', 'APIs', 'Auth', 'Admin tools'],
          outcomes: [
            'Internal platforms people actually use day to day',
            'Clear ownership of data and workflows',
            'Room to evolve without rewriting everything yearly',
          ],
        },
      ],
      technologiesLabel: 'Technologies',
      outcomesLabel: 'What you get',
      stackTitle: 'Technology coverage',
      stack: [
        'React',
        'Next.js',
        'Node.js',
        'Python',
        'TypeScript',
        'React Native',
        'LangChain',
        'LangGraph',
        'OpenAI',
        'Claude',
        'Gemini',
        'Codex',
        'RAG',
        'AI Agents',
        'n8n',
        'APIs',
        'PostgreSQL',
        'MongoDB',
      ],
      faq: {
        eyebrow: 'Software FAQ',
        title: 'Questions about custom software development',
        items: [
          {
            question: 'How long does an MVP or SaaS build usually take?',
            answer:
              'After discovery and planning, many MVPs move in phased releases so the first production-ready version can launch with the highest-value features first. Larger platforms are usually delivered in milestones rather than one long block.',
          },
          {
            question: 'Can you work with our existing stack or recommend one?',
            answer:
              'Yes. DevCo can extend an existing codebase or recommend a practical stack based on product goals, team constraints, integrations, and long-term maintainability.',
          },
          {
            question: 'Do you provide support after launch?',
            answer:
              'Yes. Launch support, monitoring, fixes, and post-release improvements are part of the delivery model, with a clear path toward scale, performance, and product velocity.',
          },
          {
            question: 'What AI frameworks and models do you work with?',
            answer:
              'DevCo builds with LangChain and LangGraph for agent and workflow orchestration, connects to leading models and providers (OpenAI, Claude, Gemini, Codex, and others), and implements RAG, tool calling, evaluation, and cloud AI integrations so the product can evolve with the latest AI capabilities.',
          },
        ],
      },
    },
    automationPage: {
      eyebrow: 'Business Automation Solutions',
      title: 'Automation that connects your CRM, leads, teams, and operations',
      subtitle:
        'DevCo builds practical automations that remove manual work, connect the tools your team already uses, and make business processes observable — from smart CRM to appointments, sales, and ops.',
      services: [
        {
          title: 'AI Agents for Business',
          text: 'Agents that take defined tasks: answering, sorting, opening tasks, updating CRM, or handing off to a human with full context.',
        },
        {
          title: 'Voice AI Agent',
          text: 'An AI phone representative that collects details, screens calls, schedules meetings, and documents everything in the CRM before transfer to a person.',
        },
        {
          title: 'Smart CRM',
          text: 'AI-backed customer management: every conversation, lead, and action is documented automatically in the system you already use.',
        },
        {
          title: 'System Integration and Dashboards',
          text: 'Connect invoices, documents, tasks, statuses, and reports into one organized flow with owner-facing dashboards.',
        },
        {
          title: 'Automatic Lead Management',
          text: 'Capture leads from any source, run screening questions, document in CRM and tools like Monday or Pipedrive until the right team responds.',
        },
        {
          title: 'Automatic Shop',
          text: 'Store automation for orders, inventory, customer updates, and abandoned-cart recovery tied into your existing process.',
        },
        {
          title: 'Sales and Service',
          text: 'Automation for sales and service teams: follow-up, quotes, deal tracking, full documentation — plus human sales handoff when a person should close.',
        },
        {
          title: 'Automatic Appointment Scheduling',
          text: 'Book meetings with screening questions, reminders, arrival confirmations, and CRM updates — without chasing people on the phone.',
        },
        {
          title: 'Integrations and Data Sync',
          text: 'n8n, Make, Zapier, direct APIs, webhooks, database sync, reporting flows, and multi-system reliability checks.',
        },
      ],
      stackTitle: 'Automation stack',
      stack: ['n8n', 'Make', 'Zapier', 'Monday', 'Zoho', 'HubSpot', 'APIs', 'Webhooks', 'AI Agents', 'Voice AI', 'CRM', 'Dashboards', 'Slack', 'Email'],
      faq: {
        eyebrow: 'Automation FAQ',
        title: 'Questions about business automation',
        items: [
          {
            question: 'Which CRMs and automation tools do you support?',
            answer:
              'DevCo works with HubSpot, Zoho, Monday, custom CRMs, and automation platforms such as n8n, Make, and Zapier, plus direct APIs, webhooks, Slack, email, and reporting flows.',
          },
          {
            question: 'How quickly can an automation project start delivering value?',
            answer:
              'Many automation projects begin with one high-impact workflow such as lead routing, CRM sync, appointment booking, or internal approvals. After discovery, the first useful automation can often ship in a focused first phase.',
          },
          {
            question: 'Do you maintain automations after they go live?',
            answer:
              'Yes. DevCo can monitor workflows, improve reliability, extend coverage, and adjust automations as tools, teams, and business processes evolve.',
          },
        ],
      },
    },
    showcasesPage: {
      eyebrow: 'Selected work',
      title: 'Showcases built from real product surfaces',
      subtitle:
        'A focused look at custom software and product systems using only the provided showcase visuals.',
    },
    showcases: [
      {
        slug: 'delet-platform-accessibility',
        image: '/showcase-delet-mobile-accessibility.webp',
        title: 'Delet real-estate operations and accessibility tooling',
        category: 'Web, mobile, and internal tools',
        summary:
          'A product ecosystem combining mobile property flows, operational screens, and accessibility-oriented tooling.',
        problem:
          'The business needed production software across property operations and specialized internal workflows.',
        solution:
          'DevCo delivered structured product surfaces across mobile and desktop contexts with attention to operational clarity.',
        technologies: ['React', 'Node.js', 'Mobile UI', 'Accessibility', 'Internal tools'],
        result: 'A stronger operating platform with clear product interfaces for real teams and users.',
      },
      {
        slug: 'vme-mobile-app',
        image: '/showcase-vme.webp',
        title: 'VME dating app for iOS and Android',
        category: 'Mobile product development',
        summary:
          'A branded dating application experience with onboarding, profile, studio, and content-driven product surfaces.',
        problem:
          'The product needed a distinctive mobile experience that could support modern matching and user engagement flows.',
        solution:
          'DevCo built mobile screens and product flows around the VME brand, Hebrew content, and app-store style expectations.',
        technologies: ['React Native', 'Mobile UX', 'iOS', 'Android', 'Hebrew RTL'],
        result: 'A polished mobile product direction ready for real audience validation.',
      },
      {
        slug: 'real-estate-platform',
        image: '/showcase-real-estate-platform.webp',
        title: 'Real-estate booking and order platform',
        category: 'SaaS and operations platform',
        summary:
          'A web platform for managing orders, bookings, scheduling, property viewings, and reservations.',
        problem:
          'Property operations required a centralized system for bookings, orders, recurring workflows, and scheduling logic.',
        solution:
          'DevCo created a structured platform experience with admin workflows, booking steps, and operational visibility.',
        technologies: ['Next.js', 'Backend APIs', 'Scheduling', 'SaaS', 'Admin tools'],
        result: 'A scalable platform foundation for real-estate operations and customer workflows.',
      },
    ] satisfies Showcase[],
    aboutPage: {
      eyebrow: 'About DevCo',
      title: 'I help build products the way they should ship — to production scale',
      subtitle:
        'DevCo Solutions is led by Sivan Wolberg: senior engineering judgment, clear process, and systems that hold up after the demo looks good.',
      bioTitle: 'Sivan Wolberg',
      bioRole: 'CEO, DevCo Solutions',
      bioParagraphs: [
        'I am Sivan Wolberg. I help turn product ideas into systems that work at production scale — not just screens that look nice.',
        'I have been in the field for more than 17 years: complex web platforms, Unity systems, and full-stack product work from invention to delivery. I know how to take broken or fragile codebases and bring them to a stable state.',
        'I work across a wide range of stacks — frontend, backend, and the seams between them — so the product does not fall apart when parts meet. I also use AI to expand what I can ship, without letting it create chaos. I do not blindly trust what a model generates.',
        'My philosophy is simple: if you do not understand it, you do not own it. That is how products stay trustworthy after launch.',
        'Outside of work I love dogs, games, and traveling.',
      ],
      personalTags: ['Dogs', 'Games', 'Travel', 'Full-Stack Systems', 'AI-Powered Products', 'System Architecture'],
      values: [
        'Architecture before shortcuts',
        'Clear process before unclear scope',
        'Production systems, not demo code',
        'Automation that fits the business process',
      ],
      upworkTitle: 'Upwork proof',
      upworkText:
        'The existing site includes Upwork proof such as 100% Job Success and Top Rated Plus status. Exact testimonials are kept only where source text or assets are provided.',
    },
    contact: {
      title: 'Ready to plan the system?',
      subtitle:
        'Tell us what you need. We will map the product, automation, integration, or workflow and decide the first practical delivery step.',
      email: 'Email DevCo',
      whatsapp: 'WhatsApp DevCo',
      linkedin: 'Connect on LinkedIn',
      form: {
        title: 'Contact form',
        name: 'Full name',
        phone: 'Phone number',
        email: 'Email',
        website: 'Website (optional)',
        company: 'Company (optional)',
        serviceType: 'What do you need?',
        servicePlaceholder: 'Select an option',
        submit: "Let's Talk",
        submitting: 'Sending…',
        successTitle: 'We received your message',
        success:
          'Hi — thanks for reaching out. We got your inquiry and will get back to you within 24 to 48 hours.',
        successClose: 'Got it',
        error: 'Something went wrong. Please try again in a moment.',
        required: 'Required field',
        serviceOptions: [
          {
            value: 'Business automation',
            label: 'Business automation',
          },
          {
            value: 'Custom-developed SaaS',
            label: 'Custom-developed SaaS',
          },
        ],
      },
    },
    cookieConsent: {
      title: 'Cookies and terms',
      body:
        'We use cookies and similar technologies to run the site, remember preferences, and measure usage (for example Google Analytics / Tag Manager when enabled). Preference cookies are kept for up to 12 months. By accepting, you agree to our cookie use and to the Terms of Use and Privacy Policy.',
      durationNote: 'Cookie preference storage duration: up to 12 months.',
      accept: 'Accept',
      termsLabel: 'Terms of Use',
      privacyLabel: 'Privacy Policy',
    },
    termsPage: {
      title: 'Terms of Use',
      updated: 'Last updated: July 17, 2026',
      intro:
        'These Terms of Use explain the basic rules for using the DevCo Solutions website. They are a practical baseline for a company website and are not legal advice.',
      sections: [
        {
          title: 'Acceptance',
          text:
            'By browsing this website or accepting the cookie notice, you confirm that you have read these Terms of Use and our Privacy Policy and that you agree to use the site under those terms.',
        },
        {
          title: 'Website purpose',
          text:
            'This website presents DevCo Solutions services, company information, and contact options. Content is provided for general information and business inquiry purposes.',
        },
        {
          title: 'Contact submissions',
          text:
            'Any contact details you share through this website — including the contact form, WhatsApp, email, or phone — will be used only for the purpose of contacting you about your inquiry, your project, or your stated intent. We will not transfer your contact data to any third party.',
        },
        {
          title: 'Cookies and analytics',
          text:
            'When you accept cookies, we may store a consent preference for up to 12 months and may load analytics tools such as Google Analytics or Google Tag Manager. You can clear cookies in your browser at any time.',
        },
        {
          title: 'External links',
          text:
            'The site may link to third-party services such as LinkedIn, Upwork, or analytics providers. Their terms and privacy policies apply when you use those services.',
        },
        {
          title: 'Contact',
          text:
            'Questions about these terms can be sent to info@devco-solution.online.',
        },
      ],
    },
    footer: {
      rights: 'All rights reserved © {year} DevCo Solutions',
      credit: 'Custom software development and business automation',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      accessibility: 'Accessibility Statement',
    },
    privacyPage: {
      title: 'Privacy Policy',
      updated: 'Last updated: May 19, 2026',
      intro:
        'This privacy policy explains how DevCo Solutions handles information when you visit this website, contact us, or use links to external services. It is written as a practical baseline for a company website and is not legal advice.',
      sections: [
        {
          title: 'Who operates this website',
          text:
            'This website is operated by DevCo Solutions / DevCo Solution. You can contact us at info@devco-solution.online.',
        },
        {
          title: 'Information we may receive',
          text:
            'We may receive information you choose to send through the contact form or by email, and we may see basic interaction data when you click links to LinkedIn, Upwork, or other external services. If Google Analytics is enabled through NEXT_PUBLIC_GA_MEASUREMENT_ID, the site may also collect analytics data such as visited pages, device/browser information, approximate location, referral source, and usage events.',
        },
        {
          title: 'How we use information',
          text:
            'We use information to respond to inquiries, understand which services and content are useful, improve the website, and manage reasonable business communication with potential clients and partners. Contact form submissions may be stored in our CRM to manage leads and follow-up.',
        },
        {
          title: 'Analytics, cookies, and similar technologies',
          text:
            'When Google Analytics is active, Google may use cookies or similar identifiers to help measure site traffic and usage. You can manage cookies through your browser settings and use Google tools or browser extensions to limit analytics tracking.',
        },
        {
          title: 'External services',
          text:
            'The website links to services such as LinkedIn, Upwork, and Google Analytics. When you open or use those services, their own privacy policies and terms apply.',
        },
        {
          title: 'Retention',
          text:
            'We keep inquiry and business-contact information only for as long as reasonably needed to respond, manage the business relationship, maintain records, or meet legitimate operational needs.',
        },
        {
          title: 'Your choices',
          text:
            'You can ask us to review, update, or delete personal information you previously sent to us by contacting info@devco-solution.online. Some information may need to be retained when required for legitimate business, security, or legal reasons.',
        },
        {
          title: 'Policy updates',
          text:
            'We may update this page from time to time so it continues to reflect the website, tools, and contact options we use.',
        },
      ],
    },
    accessibilityPage: {
      title: 'Accessibility Statement',
      updated: 'Last updated: May 25, 2026',
      intro:
        'DevCo Solutions is committed to making this website accessible, usable, and respectful for as many people as possible, including people who use assistive technologies. This statement describes the practical accessibility work on the site and how to report an issue.',
      sections: [
        {
          title: 'Accessibility approach',
          text:
            'We aim to maintain this website in line with the principles of Israeli Standard SI 5568 and WCAG level AA guidance. This is an ongoing effort and should not be read as a formal external certification or legal opinion.',
        },
        {
          title: 'Current accessibility features',
          text:
            'The site uses semantic page structure, clear headings, keyboard-accessible links and buttons, responsive layouts for desktop and mobile, visible focus states, and alternative text for meaningful images where relevant.',
        },
        {
          title: 'Accessibility tools on the site',
          text:
            'A site-wide accessibility widget is available and includes controls for text size, high contrast, link highlighting, and reduced motion. These preferences are intended to make browsing more comfortable for different users.',
        },
        {
          title: 'External services',
          text:
            'Some links open external services such as LinkedIn, Upwork, or Google Analytics. These services are operated by third parties, and their own accessibility support, privacy policies, and terms apply.',
        },
        {
          title: 'Feedback and accessibility requests',
          text:
            'If you find an accessibility issue, missing alternative text, keyboard navigation problem, or content that is difficult to use, please contact us at info@devco-solution.online or through the contact form on this website. We will review the request and make reasonable efforts to improve the experience.',
        },
        {
          title: 'Statement updates',
          text:
            'This statement may be updated as the website changes, as new content is added, or as accessibility improvements are made.',
        },
      ],
    },
    meta: {
      defaultTitle: 'DevCo Solutions - Custom Software Development and Business Automation',
      defaultDescription:
        'DevCo Solutions builds custom software, AI products, web and mobile apps, CRM automations, dashboards, integrations, and business workflow systems.',
      softwareTitle: 'Custom Software Development - DevCo Solutions',
      softwareDescription:
        'Senior software development for SaaS, MVPs, AI products, web apps, mobile apps, backend APIs, and scalable platforms.',
      automationTitle: 'Business Automation Solutions - DevCo Solutions',
      automationDescription:
        'Business automation with n8n, Make, Zapier, Monday, Zoho, HubSpot, APIs, workflows, chatbots, dashboards, and CRM integrations.',
      showcasesTitle: 'Showcases - DevCo Solutions',
      showcasesDescription:
        'Selected DevCo software and automation showcase work using real product visuals.',
      aboutTitle: 'About DevCo Solutions',
      aboutDescription:
        'Learn about DevCo Solutions, Sivan Wolberg, 17+ years of software architecture experience, and the company delivery process.',
      contactTitle: 'Contact DevCo Solutions',
      contactDescription:
        'Contact DevCo Solutions about custom software, business automation, SaaS, integrations, and architecture support.',
      termsTitle: 'Terms of Use - DevCo Solutions',
      termsDescription:
        'Terms of Use for the DevCo Solutions website, including acceptance, contact submissions, cookies, and external links.',
      privacyTitle: 'Privacy Policy - DevCo Solutions',
      privacyDescription:
        'Privacy policy for DevCo Solutions, including website analytics, contact information, external links, retention, and user choices.',
      accessibilityTitle: 'Accessibility Statement - DevCo Solutions',
      accessibilityDescription:
        'Accessibility statement for DevCo Solutions, including accessibility approach, site accommodations, accessibility widget, external services, and feedback contact details.',
    },
  },
  he: {
    brand: {
      name: 'DevCo Solutions',
      legalName: 'DevCo Solution',
      tagline: 'לחשוב, ליצור, להוביל',
      email: 'info@devco-solution.online',
      fallbackEmail: 'fastwings@gmail.com',
      phone: '+972545566786',
      phoneDisplay: '+972 54-556-6786',
      whatsappMessage: 'היי, אני מעוניין/ת בשירותים שלכם. מתי אפשר לדבר על תחילת פרויקט?',
      upwork: 'https://upwork.com/freelancers/swolberg',
      linkedin: 'https://www.linkedin.com/in/swolberg',
    },
    nav: {
      home: 'בית',
      software: 'תוכנה',
      automation: 'אוטומציה',
      showcases: 'פרויקטים',
      about: 'אודות',
      blog: 'בלוג',
      privacy: 'פרטיות',
      contact: 'בואו נדבר',
      menu: 'פתיחת תפריט',
      close: 'סגירת תפריט',
      main: 'ניווט ראשי',
    },
    blog: {
      title: 'בלוג',
      subtitle: 'תובנות על פיתוח תוכנה, אוטומציה ובינה מלאכותית.',
    },
    cta: {
      primary: 'בואו נדבר',
      secondary: 'צפייה בפרויקטים',
      software: 'פיתוח תוכנה',
      automation: 'אוטומציה עסקית',
      contact: 'דברו עם הצוות',
    },
    home: {
      eyebrow: 'חברת פיתוח תוכנה ושותף לאוטומציה עסקית',
      title: 'פיתוח מערכות תוכנה ואוטומציה לעסקים',
      subtitle:
        'אנחנו מתכננים, בונים ומשדרגים מערכות תוכנה מותאמות אישית, מוצרי AI, אוטומציות CRM ותהליכים עסקיים לצוותים שצריכים מערכת אמינה ולא רק קוד.',
      proof: ['17+ שנות ניסיון בארכיטקטורה', 'הוכחת Upwork ו-Top Rated Plus', 'פיתוח AI, ווב, מובייל, Backend ואוטומציה'],
      pathsTitle: 'בחרו את המסלול שמתאים לשלב הבא',
      paths: [
        {
          title: 'פיתוח תוכנה מותאמת אישית',
          description:
            'פיתוח מוצר מלא עבור SaaS, MVP, פלטפורמות ווב, אפליקציות מובייל, APIs, יכולות AI ומערכות Backend סקיילביליות.',
          href: serviceRoutes.software,
          tags: ['React', 'Node.js', 'Python', 'TypeScript', 'React Native', 'AI'],
        },
        {
          title: 'אוטומציה עסקית',
          description:
            'אוטומציית תהליכים, אינטגרציות CRM, דשבורדים, צ׳אטבוטים, ניתוב לידים ותפעול רב-מערכתי עם n8n, Make, Zapier, Monday, Zoho ו-HubSpot.',
          href: serviceRoutes.automation,
          tags: ['n8n', 'Make', 'Zapier', 'HubSpot', 'Zoho', 'Monday'],
        },
      ],
      processTitle: 'תהליך פיתוח ברור',
      processSubtitle:
        'תהליך האונבורדינג מהמצגת הופך למודל עבודה שהלקוח מבין לפני תחילת הספרינט הראשון.',
      proofTitle: 'בנוי סביב ביצוע בכיר',
      proofText:
        'DevCo משלבת ארכיטקטורה בכירה, פיתוח Hands-on וחשיבה אוטומטית פרקטית, כדי שלכל בנייה יהיה מסלול ברור מ-Discovery ועד Scale.',
      faq: {
        eyebrow: 'שאלות נפוצות',
        title: 'שאלות נפוצות על העבודה עם DevCo',
        items: [
          {
            question: 'מי זו DevCo Solutions ומי מוביל את העבודה?',
            answer:
              'DevCo Solutions היא חברת פיתוח תוכנה ואוטומציה עסקית שמובלת על ידי סיון וולברג, עם 17+ שנות ניסיון בארכיטקטורה, פיתוח Full Stack, אינטגרציות AI ובניית מערכות מורכבות.',
          },
          {
            question: 'איך עובדת התמחור?',
            answer:
              'פרויקטים מתחילים בדרך כלל בשיחת Discovery ממוקדת, ואחר כך מקבלים הצעה עם Scope, אבני דרך, סדרי עדיפויות ותוצרים ברורים. התמחור תלוי בהיקף, באינטגרציות ובלוח הזמנים.',
          },
          {
            question: 'כמה זמן לוקח פרויקט טיפוסי?',
            answer:
              'לוחות הזמנים משתנים לפי ההיקף. MVP או אוטומציה ממוקדת יכולים להתקדם מהר אחרי Discovery, בעוד שפלטפורמות גדולות יותר נבנות לרוב בשלבים עם גרסה ראשונה בעלת ערך.',
          },
          {
            question: 'האם אתם עובדים עם צוותים מרוחקים ולקוחות בינלאומיים?',
            answer:
              'כן. DevCo עובדת עם סטארטאפים, סוכנויות ועסקים ברחבי העולם דרך Discovery, תכנון, עדכוני התקדמות ותמיכה בהשקה.',
          },
          {
            question: 'באילו טכנולוגיות וכלים אתם מתמחים?',
            answer:
              'DevCo מכסה פיתוח תוכנה עם React, Next.js, Node.js, Python, TypeScript ו-React Native, וגם אוטומציה עסקית עם n8n, Make, Zapier, HubSpot, Zoho, Monday, APIs ו-Workflows של CRM — ומערכות AI מודרניות מעל הסטאק הזה.',
          },
          {
            question: 'האם אתם עובדים עם כלי AI ומודלים עדכניים?',
            answer:
              'כן. DevCo מתכננת ומספקת זרימות AI לפרודקשן עם LangChain ו-LangGraph, עבודה עם מודלים שונים (OpenAI, Claude, Gemini ועוד), צינורות RAG, סוכנים, Tool calling ופלטפורמות AI בענן. הדגש הוא על תוצאות מוצר פרקטיות — עוזרים, אוטומציה ופיצ׳רים חכמים שנשארים תחזוקתיים אחרי ההשקה — לא רק דמואים.',
          },
        ],
      },
    },
    process: [
      {
        title: 'שלב אחד — Discovery',
        text: 'מגדירים מטרות עסקיות, משתמשים, מערכות, סיכונים, אינטגרציות ותוצאה מדידה ראשונה.',
      },
      {
        title: 'שלב שניים — Planning',
        text: 'מתרגמים את המטרות לארכיטקטורה, Scope, אבני דרך, הערכות ומסלול מסירה.',
      },
      {
        title: 'שלב שלוש — Build',
        text: 'בונים תוכנה, אוטומציות, APIs, דשבורדים וזרימות AI שמוכנים לפרודקשן.',
      },
      {
        title: 'שלב ארבע — Launch',
        text: 'מעלים לאוויר, בודקים, מנטרים ותומכים במערכת — ואז משפרים אמינות, כיסוי אוטומציה ומהירות מוצר אחרי ההשקה.',
      },
    ],
    processExpectations: {
      title: 'מה צפוי לאורך התהליך',
      text:
        'המטרה היא שהפרויקט יהיה ברור וצפוי, לא משהו שמתחיל באוויר. מתחילים בהבנת הצורך העסקי, מתרגמים אותו לתוכנית עבודה פרקטית, ואז מתקדמים בשלבים עם סדר עדיפויות, תקשורת ברורה, אבני דרך וציפיות השקה.',
      points: [
        'שיחת Discovery ממוקדת שממפה מטרות, משתמשים, מערכות קיימות ומה הערך הראשון שצריך לצאת לדרך.',
        'תוכנית יישום ברורה לפני הפיתוח: Scope, סדרי עדיפויות, כיוון טכני, הערכות ולוחות זמנים.',
        'עדכוני התקדמות, בדיקות, תמיכה בהשקה ותוכנית המשך לשיפור המערכת אחרי שהיא עולה לאוויר.',
      ],
    },
    softwarePage: {
      eyebrow: 'חברת פיתוח תוכנה',
      title: 'פיתוח תוכנה מותאמת אישית ומערכות AI לעסקים',
      subtitle:
        'אתם לא שוכרים עוד ספק שמדבר טכנולוגיה. אתם מקבלים שותף בכיר שמחזיק ארכיטקטורה, שיקול דעת במסירה, ומערכות שמזיזות את העסק — האבא הטכני של המוצר.',
      vibeCoding: {
        eyebrow: 'נשמע מוכר?',
        title: 'וויב קודינג עובד… עד שלא.',
        items: [
          {
            id: 'small-change',
            label: 'שינוי קטן → שובר משהו אחר',
            icon: 'shuffle',
            problem:
              'בלי גבולות ברורים, כל תיקון קטן מתגלגל במערכת. משחררים “פיקס קטן” ופתאום התחברות, תשלום או זרימה מרכזית נשברים — כי שום דבר לא תוכנן להשתנות בבטחה.',
          },
          {
            id: 'fixing-bugs',
            label: 'מתקנים באגים במקום לבנות קדימה',
            icon: 'bug',
            problem:
              'המהירות מתה כשהצוות מבלה ספרינטים בכיבוי שריפות. פיצ׳רים חדשים מחכים בזמן שרגרסיות חוזרות — כי אף פעם לא לקחו בעלות על שורש הבעיה.',
          },
          {
            id: 'nobody-understands',
            label: 'הקוד עובד, אבל אף אחד לא מבין אותו',
            icon: 'question',
            problem:
              'אם רק המודל (או פרילנסר אחד) “מכיר” את הקוד, כל שינוי הוא הימור. ארכיטקטורה קריאה ובעלות הן מה שמשאיר מוצרים בחיים אחרי הדמו.',
          },
          {
            id: 'feature-risk',
            label: 'כל פיצ׳ר חדש מרגיש כמו סיכון',
            icon: 'warning',
            problem:
              'כשהיסוד שברירי, החלטות מוצר הופכות לפחד. הצוות מפסיק לשחרר כי אי אפשר לחזות מה יישבר — והצמיחה נעצרת.',
          },
          {
            id: 'ai-dependent',
            label: 'תלויים ב-AI בשביל הכל',
            icon: 'robot',
            problem:
              'AI הוא מכפיל כוח כשכבר מבינים את המערכת. יצירה עיוורת מייצרת דיפים כאוטיים, חוב נסתר וקוד שאי אפשר להגן עליו בפרודקשן.',
          },
          {
            id: 'fragile-system',
            label: 'המערכת מרגישה שברירית',
            icon: 'heart',
            problem:
              'מוצרים שברירים נשברים תחת עומס אמיתי, מקרי קצה ודאטה מלוכלך. מה שנראה טוב בדמו של happy path לא שורד לקוחות, אינטגרציות או Scale.',
          },
          {
            id: 'demo-fails',
            label: 'עובד בדמו, נכשל עם משתמשים אמיתיים',
            icon: 'flask',
            problem:
              'דמואים מסתירים מקרי קצה של Auth, מצבים ריקים, מקביליות ומציאות תפעולית. פרודקשן דורש מבנה, בדיקות ושיקול דעת — לא UI שנוצר פעם אחת.',
          },
          {
            id: 'no-architecture',
            label: 'אין ארכיטקטורה – רק סליידים על סליידים',
            icon: 'layers',
            problem:
              'מצגות יפות הן לא מערכת. בלי גבולות דומיין, מודלי דאטה ותוכנית מסירה, בונים מחדש את אותו מוצר כל רבעון בשם אחר.',
          },
          {
            id: 'slow-changes',
            label: 'שינויים פשוטים לוקחים שעות',
            icon: 'hourglass',
            problem:
              'כשהכל סבוך, שינוי טקסט או שדה הופך לארכיאולוגיה. מערכות תחזוקתיות שומרות על עבודה קטנה — קטנה.',
          },
          {
            id: 'no-trust',
            label: 'אתם לא סומכים על המוצר שלכם',
            icon: 'shield',
            problem:
              'אם שחרור מרגיש כמו הצלבת אצבעות, גם הלקוחות מרגישים את זה. אמון מגיע משחרורים צפויים, בעלות ומערכות שאפשר להסביר.',
          },
          {
            id: 'no-owner',
            label: 'אין לכם מי שבאמת מבין את הקוד',
            icon: 'users',
            problem:
              'קוד יתום עוצר גיוס ושורף תקציב. צריך מישהו שיודע לקרוא את המערכת, לייצב אותה ולהאיץ את הבא בתור — לא להתחיל מאפס.',
          },
          {
            id: 'freelancer-zero',
            label: 'כל פרילנסר חדש מתחיל מאפס',
            icon: 'refresh',
            problem:
              'בלי תיעוד, מוסכמות וארכיטקטורה, כל העברה מאפסת קונטקסט. זה יקר, איטי וההפך ממוצר מוכן לפרודקשן.',
          },
        ],
      },
      services: [
        {
          title: 'פיתוח SaaS ו-MVP',
          summary:
            'מהגרסה הראשונה ועד פלטפורמת פרודקשן: ארכיטקטורה, מודלי דאטה, כלי ניהול, תשלומים והכנה להשקה עם מסלול ברור אחרי העלייה לאוויר.',
          technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
          outcomes: [
            'MVP או ליבת SaaS מוכנים למשתמשים אמיתיים',
            'מודלי דאטה ברורים, זרימות אדמין ורשימת השקה',
            'מסלול מהגרסה הראשונה ל-Scale — לא דמו חד־פעמי',
          ],
        },
        {
          title: 'אפליקציות ווב ומובייל',
          summary:
            'React, Next.js, React Native ומערכות Frontend מודרניות שנבנות לשימושיות, מהירות וצמיחה תחזוקתית לאורך מסעות משתמש אמיתיים.',
          technologies: ['React', 'Next.js', 'React Native', 'TypeScript', 'Tailwind CSS', 'Vite'],
          outcomes: [
            'ממשקים מהירים ושימושיים בווב ובמובייל',
            'ארכיטקטורת UI שגדלה עם המוצר',
            'מסעות עקביים מהביקור הראשון לפעולות הליבה',
          ],
        },
        {
          title: 'Backend ו-APIs',
          summary:
            'Node.js, Python, NestJS, FastAPI, תורים, מסדי נתונים וגבולות שירות מאובטחים שעומדים בעומס אמיתי.',
          technologies: ['Node.js', 'Python', 'NestJS', 'FastAPI', 'PostgreSQL', 'MongoDB', 'APIs'],
          outcomes: [
            'APIs יציבים וגבולות שירות תחת תעבורה אמיתית',
            'תורים, Auth ושכבות דאטה עם בעלות ברורה',
            'אינטגרציות שנשארות אמינות אחרי ההשקה',
          ],
        },
        {
          title: 'בוטים חכמים ותהליכי Agent',
          summary:
            'עוזרי AI, סוכנים פנימיים וצינורות Retrieval שמבצעים משימות מוגדרות — ניתוב, ניסוח, סינון — לפני שמעבירים לאדם.',
          technologies: ['LangChain', 'LangGraph', 'OpenAI', 'Claude', 'Gemini', 'RAG', 'AI Agents'],
          outcomes: [
            'סוכנים עם משימות, העברות וגבולות ברורים',
            'RAG ו-Tool calling מחוברים למוצר — לא כאוס',
            'AI שמרחיב יכולת בלי לאבד בעלות על המערכת',
          ],
        },
        {
          title: 'אוטומציה ואינטגרציות מערכות',
          summary:
            'מחברים CRM, כלי תפעול, APIs ושירותים מותאמים כדי שתוכנת המוצר ותהליכי העסק יזוזו כמערכת אחת, לא כאפליקציות מנותקות.',
          technologies: ['n8n', 'APIs', 'Webhooks', 'HubSpot', 'Zoho', 'Node.js'],
          outcomes: [
            'מערכות מחוברות במקום העתקה בין כלים',
            'זרימות מדידות שהצוות יכול לסמוך עליהן',
            'פחות תפעול ידני בין המוצר לתהליך העסקי',
          ],
        },
        {
          title: 'מערכות מידע שגדלות איתכם',
          summary:
            'פלטפורמות מובנות לתפעול, נתוני לקוחות וכלים פנימיים — עם בהירות, בעלות ואבולוציה לטווח ארוך, בלי BI שלא מטפלים בו.',
          technologies: ['TypeScript', 'Next.js', 'PostgreSQL', 'APIs', 'Auth', 'Admin tools'],
          outcomes: [
            'פלטפורמות פנימיות שבאמת משתמשים בהן יום־יום',
            'בעלות ברורה על דאטה ותהליכים',
            'מקום להתפתח בלי לשכתב הכל כל שנה',
          ],
        },
      ],
      technologiesLabel: 'טכנולוגיות',
      outcomesLabel: 'מה תקבלו',
      stackTitle: 'טכנולוגיות',
      stack: [
        'React',
        'Next.js',
        'Node.js',
        'Python',
        'TypeScript',
        'React Native',
        'LangChain',
        'LangGraph',
        'OpenAI',
        'Claude',
        'Gemini',
        'Codex',
        'RAG',
        'AI Agents',
        'n8n',
        'APIs',
        'PostgreSQL',
        'MongoDB',
      ],
      faq: {
        eyebrow: 'שאלות על תוכנה',
        title: 'שאלות על פיתוח תוכנה מותאם',
        items: [
          {
            question: 'כמה זמן לוקח בדרך כלל MVP או SaaS?',
            answer:
              'אחרי Discovery ו-Planning, רבים מה-MVPים מתקדמים בשלבים כדי שהגרסה הראשונה לפרודקשן תכלול קודם את הפיצ\'רים בעלי הערך הגבוה ביותר. פלטפורמות גדולות יותר נמסרות לרוב באבני דרך.',
          },
          {
            question: 'האם אתם יכולים לעבוד עם הסטאק הקיים או להמליץ על אחד?',
            answer:
              'כן. DevCo יכולה להרחיב קוד קיים או להמליץ על סטאק פרקטי לפי מטרות המוצר, מגבלות הצוות, אינטגרציות ותחזוקה לטווח ארוך.',
          },
          {
            question: 'האם אתם מספקים תמיכה אחרי ההשקה?',
            answer:
              'כן. תמיכה בהשקה, ניטור, תיקונים ושיפורים אחרי העלייה לאוויר הם חלק מהמודל, עם מסלול ברור ל-Scale, ביצועים ומהירות פיתוח.',
          },
          {
            question: 'באילו מסגרות ומודלי AI אתם עובדים?',
            answer:
              'DevCo בונה עם LangChain ו-LangGraph לאורקסטרציה של סוכנים וזרימות, מתחברת למודלים וספקים מובילים (OpenAI, Claude, Gemini, Codex ועוד), ומממשת RAG, Tool calling, הערכה ואינטגרציות AI בענן — כדי שהמוצר יוכל להתקדם עם יכולות ה-AI העדכניות.',
          },
        ],
      },
    },
    automationPage: {
      eyebrow: 'פתרונות אוטומציה לעסקים',
      title: 'אוטומציה שמחברת CRM, לידים, צוותים ותפעול',
      subtitle:
        'DevCo בונה אוטומציות פרקטיות שמורידות עבודה ידנית, מחברות את הכלים שהצוות כבר משתמש בהם, והופכות תהליכים עסקיים למדידים — מ-Smart CRM ועד קביעת תורים, מכירה ושירות.',
      services: [
        {
          title: 'סוכני AI לעסקים',
          text: 'סוכנים שמקבלים משימות מוגדרות: מענה, מיון, פתיחת משימות, עדכון CRM או העברה לאדם עם כל הקונטקסט.',
        },
        {
          title: 'סוכן AI קולי',
          text: 'נציג טלפוני מבוסס AI שאוסף פרטים, מסנן שיחות, קובע פגישות ומתעד הכל ב-CRM לפני העברה לנציג אנושי.',
        },
        {
          title: 'CRM חכם',
          text: 'ניהול לקוחות מבוסס AI: כל שיחה, ליד ופעולה מתועדים אוטומטית במערכת שכבר משתמשים בה.',
        },
        {
          title: 'חיבור מערכות ודשבורדים',
          text: 'מחברים חשבוניות, מסמכים, משימות, סטטוסים ודוחות לזרימה אחת מסודרת עם דשבורד לבעלים.',
        },
        {
          title: 'ניהול לידים אוטומטי',
          text: 'קליטת לידים מכל מקור, שאלות סינון, תיעוד ב-CRM ובכלים כמו Monday או Pipedrive עד שיש מענה מהמחלקה הרלוונטית.',
        },
        {
          title: 'חנות אוטומטית',
          text: 'אוטומציה לחנויות אונליין: הזמנות, מלאי, עדכוני לקוחות והחזרת עגלות נטושות מחוברות לתהליך.',
        },
        {
          title: 'מכירות ושירות',
          text: 'אוטומציה לצוותי מכירות ושירות: פולואפ, הצעות מחיר, מעקב עסקאות ותיעוד מלא — כולל מכירה אנושית כשצריך אדם לסגור.',
        },
        {
          title: 'קביעת תורים אוטומטית',
          text: 'תיאום פגישות עם שאלות סינון, תזכורות, אישורי הגעה ועדכוני CRM — בלי לרדוף אחרי אנשים בטלפון.',
        },
        {
          title: 'אינטגרציות וסנכרון נתונים',
          text: 'n8n, Make, Zapier, APIs ישירים, Webhooks, סנכרון דאטה, זרימות דוחות ובדיקות אמינות בין מערכות.',
        },
      ],
      stackTitle: 'כלי אוטומציה',
      stack: ['n8n', 'Make', 'Zapier', 'Monday', 'Zoho', 'HubSpot', 'APIs', 'Webhooks', 'AI Agents', 'Voice AI', 'CRM', 'Dashboards', 'Slack', 'Email'],
      faq: {
        eyebrow: 'שאלות על אוטומציה',
        title: 'שאלות על אוטומציה עסקית',
        items: [
          {
            question: 'באילו CRMים וכלי אוטומציה אתם עובדים?',
            answer:
              'DevCo עובדת עם HubSpot, Zoho, Monday, CRMים מותאמים ופלטפורמות כמו n8n, Make ו-Zapier, לצד APIs, Webhooks, Slack, אימייל וזרימות דיווח.',
          },
          {
            question: 'כמה מהר אוטומציה יכולה להתחיל לייצר ערך?',
            answer:
              'רבים מהפרויקטים מתחילים ב-Workflow אחד בעל השפעה גבוהה, כמו ניתוב לידים, סנכרון CRM, קביעת תורים או אישורים פנימיים. אחרי Discovery, האוטומציה הראשונה יכולה לרוב לצאת לדרך בשלב ראשון ממוקד.',
          },
          {
            question: 'האם אתם מטפלים באוטומציות גם אחרי שהן עולות לאוויר?',
            answer:
              'כן. DevCo יכולה לנטר Workflows, לשפר אמינות, להרחיב כיסוי ולהתאים אוטומציות כשהכלים, הצוותים והתהליכים משתנים.',
          },
        ],
      },
    },
    showcasesPage: {
      eyebrow: 'עבודות נבחרות',
      title: 'פרויקטים שמבוססים על מסכי מוצר אמיתיים',
      subtitle:
        'מבט ממוקד על פיתוח תוכנה ומערכות מוצר, באמצעות תמונות הפרויקטים שסופקו בלבד.',
    },
    showcases: [
      {
        slug: 'delet-platform-accessibility',
        image: '/showcase-delet-mobile-accessibility.webp',
        title: 'מערכת נדל״ן וכלי נגישות של Delet',
        category: 'ווב, מובייל וכלים פנימיים',
        summary:
          'אקוסיסטם מוצרי שמשלב מסכי מובייל לנכסים, תפעול פנימי וכלי עבודה סביב נגישות.',
        problem:
          'העסק היה צריך תוכנת פרודקשן עבור תפעול נכסים ותהליכים פנימיים ייחודיים.',
        solution:
          'DevCo בנתה משטחי מוצר מובנים במובייל ובדסקטופ עם דגש על בהירות תפעולית.',
        technologies: ['React', 'Node.js', 'Mobile UI', 'Accessibility', 'Internal tools'],
        result: 'בסיס תפעולי חזק יותר עם ממשקים ברורים לצוותים ולמשתמשים אמיתיים.',
      },
      {
        slug: 'vme-mobile-app',
        image: '/showcase-vme.webp',
        title: 'אפליקציית ההיכרויות VME ל-iOS ו-Android',
        category: 'פיתוח מוצר מובייל',
        summary:
          'חוויית אפליקציה ממותגת עם אונבורדינג, פרופיל, סטודיו ומסכי תוכן.',
        problem:
          'המוצר היה צריך חוויית מובייל ייחודית שתתמוך בחיבור משתמשים ובמעורבות.',
        solution:
          'DevCo בנתה מסכי מובייל וזרימות מוצר סביב המותג, תוכן בעברית וציפיות של אפליקציה מודרנית.',
        technologies: ['React Native', 'Mobile UX', 'iOS', 'Android', 'Hebrew RTL'],
        result: 'כיוון מוצר מובייל מלוטש שמוכן לוולידציה מול קהל אמיתי.',
      },
      {
        slug: 'real-estate-platform',
        image: '/showcase-real-estate-platform.webp',
        title: 'פלטפורמת הזמנות ותפעול נדל״ן',
        category: 'SaaS ומערכת תפעול',
        summary:
          'פלטפורמת ווב לניהול הזמנות, Bookings, תיאום צפיות נכס ורזרבציות.',
        problem:
          'תפעול נכסים דרש מערכת מרכזית להזמנות, תהליכים חוזרים ולוגיקת תיאום.',
        solution:
          'DevCo יצרה חוויית פלטפורמה עם תהליכי אדמין, שלבי Booking ונראות תפעולית.',
        technologies: ['Next.js', 'Backend APIs', 'Scheduling', 'SaaS', 'Admin tools'],
        result: 'בסיס סקיילבילי לתפעול נדל״ן ולתהליכים מול לקוחות.',
      },
    ] satisfies Showcase[],
    aboutPage: {
      eyebrow: 'אודות DevCo',
      title: 'אני עוזר לבנות מוצרים כמו שצריך — עד סקייל של פרודקשן',
      subtitle:
        'DevCo Solutions מובלת על ידי סיון וולברג: שיקול דעת הנדסי בכיר, תהליך ברור, ומערכות שעומדות אחרי שהדמו כבר נראה טוב.',
      bioTitle: 'סיון וולברג',
      bioRole: 'CEO, DevCo Solutions',
      bioParagraphs: [
        'אני סיון וולברג. אני עוזר להפוך רעיונות למוצרים למערכות שעובדות בסקייל של פרודקשן — לא רק מסכים שנראים יפים.',
        'אני בתחום יותר מ־17 שנים: פלטפורמות ווב מורכבות, מערכות Unity, ועבודה Full Stack מהמצאה ועד מסירה. אני יודע לקחת מערכות שבורות או שברירות ולהביא אותן למצב יציב.',
        'אני עובד על מגוון רחב של סטאקים — Frontend, Backend והחיבורים ביניהם — כדי שהמוצר לא יתפרק כשהחלקים נפגשים. אני גם משתמש ב-AI כדי להרחיב מה שאני יכול למסור, בלי לתת לו ליצור כאוס. אני לא סומך בעיניים עצומות על מה שמודל מייצר.',
        'הפילוסופיה שלי פשוטה: אם אתה לא מבין את זה, אתה לא באמת בעל המערכת. ככה מוצרים נשארים אמינים אחרי ההשקה.',
        'מחוץ לעבודה אני אוהב כלבים, משחקים וטיולים.',
      ],
      personalTags: ['כלבים', 'משחקים', 'טיולים', 'מערכות Full-Stack', 'מוצרי AI', 'ארכיטקטורת מערכות'],
      values: [
        'ארכיטקטורה לפני קיצורי דרך',
        'תהליך ברור לפני Scope מעורפל',
        'מערכות פרודקשן, לא קוד דמו',
        'אוטומציה שמתאימה לתהליך העסקי',
      ],
      upworkTitle: 'הוכחת Upwork',
      upworkText:
        'האתר הקיים כולל הוכחות Upwork כמו 100% Job Success ו-Top Rated Plus. המלצות מדויקות נשמרות רק כאשר יש טקסט מקור או נכס שסופק.',
    },
    contact: {
      title: 'מוכנים לתכנן את המערכת?',
      subtitle:
        'ספרו לנו מה צריך. נמפה את המוצר, האוטומציה, האינטגרציה או ה-Workflow ונבחר את שלב המסירה הראשון.',
      email: 'אימייל ל-DevCo',
      whatsapp: 'WhatsApp ל-DevCo',
      linkedin: 'LinkedIn',
      form: {
        title: 'טופס יצירת קשר',
        name: 'שם מלא',
        phone: 'מספר טלפון',
        email: 'אימייל',
        website: 'אתר (אופציונלי)',
        company: 'חברה (אופציונלי)',
        serviceType: 'מה אתם צריכים?',
        servicePlaceholder: 'בחרו אפשרות',
        submit: 'בואו נדבר',
        submitting: 'שולחים…',
        successTitle: 'קיבלנו את הפנייה',
        success:
          'היי — תודה שפניתם. קיבלנו את ההודעה ונחזור אליכם תוך 24 עד 48 שעות.',
        successClose: 'הבנתי',
        error: 'משהו השתבש. נסו שוב בעוד רגע.',
        required: 'שדה חובה',
        serviceOptions: [
          {
            value: 'Business automation',
            label: 'אוטומציה עסקית',
          },
          {
            value: 'Custom-developed SaaS',
            label: 'פיתוח SaaS מותאם',
          },
        ],
      },
    },
    cookieConsent: {
      title: 'עוגיות ותנאים',
      body:
        'אנחנו משתמשים בעוגיות ובטכנולוגיות דומות להפעלת האתר, שמירת העדפות ומדידת שימוש (למשל Google Analytics / Tag Manager כשהם פעילים). עוגיית ההעדפה נשמרת עד 12 חודשים. בלחיצה על אישור אתם מסכימים לשימוש בעוגיות ולתנאי השימוש ולמדיניות הפרטיות.',
      durationNote: 'משך שמירת העדפת העוגיות: עד 12 חודשים.',
      accept: 'מאשר/ת',
      termsLabel: 'תנאי שימוש',
      privacyLabel: 'מדיניות פרטיות',
    },
    termsPage: {
      title: 'תנאי שימוש',
      updated: 'עודכן לאחרונה: 17 ביולי 2026',
      intro:
        'תנאי שימוש אלה מסבירים את הכללים הבסיסיים לשימוש באתר DevCo Solutions. זהו נוסח בסיסי ופרקטי לאתר חברה, והוא אינו מהווה ייעוץ משפטי.',
      sections: [
        {
          title: 'הסכמה',
          text:
            'בגלישה באתר או באישור הודעת העוגיות, אתם מאשרים שקראתם את תנאי השימוש ואת מדיניות הפרטיות ושמסכימים להשתמש באתר לפיהם.',
        },
        {
          title: 'מטרת האתר',
          text:
            'האתר מציג את שירותי DevCo Solutions, מידע על החברה ואפשרויות יצירת קשר. התוכן מסופק למידע כללי ולפניות עסקיות.',
        },
        {
          title: 'יצירת קשר',
          text:
            'כל פרטי הקשר שתשתפו דרך האתר — כולל טופס יצירת הקשר, WhatsApp, אימייל או טלפון — ישמשו אך ורק למטרת יצירת קשר איתכם בנוגע לפנייה, לפרויקט או לכוונה שציינתם. לא נעביר את נתוני הקשר שלכם לצד שלישי כלשהו.',
        },
        {
          title: 'עוגיות ואנליטיקה',
          text:
            'כאשר אתם מאשרים עוגיות, ייתכן שנשמור העדפת הסכמה עד 12 חודשים ונפעיל כלי אנליטיקה כגון Google Analytics או Google Tag Manager. ניתן למחוק עוגיות דרך הדפדפן בכל עת.',
        },
        {
          title: 'קישורים חיצוניים',
          text:
            'האתר עשוי לקשר לשירותי צד שלישי כגון LinkedIn, Upwork או ספקי אנליטיקה. התנאים ומדיניות הפרטיות שלהם חלים בעת השימוש בשירותים אלה.',
        },
        {
          title: 'יצירת קשר',
          text:
            'שאלות בנוגע לתנאים אלה ניתן לשלוח אל info@devco-solution.online.',
        },
      ],
    },
    footer: {
      rights: 'כל הזכויות שמורות © {year} DevCo Solutions',
      credit: 'פיתוח תוכנה מותאמת ואוטומציה עסקית',
      privacy: 'מדיניות פרטיות',
      terms: 'תנאי שימוש',
      accessibility: 'הצהרת נגישות',
    },
    privacyPage: {
      title: 'מדיניות פרטיות',
      updated: 'עודכן לאחרונה: 19 במאי 2026',
      intro:
        'מדיניות פרטיות זו מסבירה כיצד DevCo Solutions מטפלת במידע כאשר אתם מבקרים באתר, פונים אלינו או משתמשים בקישורים לשירותים חיצוניים. זהו נוסח בסיסי ופרקטי לאתר חברה, והוא אינו מהווה ייעוץ משפטי.',
      sections: [
        {
          title: 'מי מפעיל את האתר',
          text:
            'האתר מופעל על ידי DevCo Solutions / DevCo Solution. ניתן ליצור איתנו קשר בכתובת info@devco-solution.online.',
        },
        {
          title: 'איזה מידע עשוי להתקבל',
          text:
            'אנחנו עשויים לקבל מידע שאתם בוחרים לשלוח דרך טופס יצירת הקשר או באימייל, וכן מידע בסיסי על אינטראקציה כאשר אתם לוחצים על קישורים ל-LinkedIn, Upwork או שירותים חיצוניים אחרים. אם Google Analytics מופעל דרך NEXT_PUBLIC_GA_MEASUREMENT_ID, האתר עשוי לאסוף גם מידע אנליטי כגון עמודים שנצפו, מידע על דפדפן/מכשיר, מיקום משוער, מקור הגעה ואירועי שימוש.',
        },
        {
          title: 'כיצד נעשה שימוש במידע',
          text:
            'המידע משמש למענה לפניות, להבנת השירותים והתכנים שמעניינים משתמשים, לשיפור האתר, ולניהול תקשורת עסקית סבירה עם לקוחות פוטנציאליים ושותפים. פניות מטופס יצירת הקשר עשויות להישמר ב-CRM לניהול לידים ומעקב.',
        },
        {
          title: 'אנליטיקה, עוגיות וטכנולוגיות דומות',
          text:
            'כאשר Google Analytics פעיל, Google עשויה להשתמש בעוגיות או מזהים דומים כדי למדוד תנועה ושימוש באתר. ניתן לנהל עוגיות דרך הגדרות הדפדפן ולהשתמש בכלים של Google או תוספי דפדפן כדי להגביל מעקב אנליטי.',
        },
        {
          title: 'שירותים חיצוניים',
          text:
            'האתר מקשר לשירותים כגון LinkedIn, Upwork ו-Google Analytics. כאשר אתם פותחים או משתמשים בשירותים אלה, מדיניות הפרטיות והתנאים שלהם חלים.',
        },
        {
          title: 'שמירת מידע',
          text:
            'אנחנו שומרים מידע מפניות וקשר עסקי רק למשך הזמן שנדרש באופן סביר כדי לענות, לנהל את הקשר העסקי, לשמור רשומות או לעמוד בצרכים תפעוליים לגיטימיים.',
        },
        {
          title: 'הבחירות שלכם',
          text:
            'ניתן לבקש מאיתנו לבדוק, לעדכן או למחוק מידע אישי ששלחתם אלינו בעבר באמצעות פנייה ל-info@devco-solution.online. ייתכן שחלק מהמידע יישמר כאשר הדבר נדרש מסיבות עסקיות, אבטחתיות או משפטיות לגיטימיות.',
        },
        {
          title: 'עדכוני מדיניות',
          text:
            'אנו עשויים לעדכן עמוד זה מעת לעת כדי שישקף את האתר, הכלים ואפשרויות יצירת הקשר שבהם אנחנו משתמשים.',
        },
      ],
    },
    accessibilityPage: {
      title: 'הצהרת נגישות',
      updated: 'עודכן לאחרונה: 25 במאי 2026',
      intro:
        'DevCo Solutions מחויבת לאפשר שימוש נגיש, מכבד ונוח באתר לכמה שיותר אנשים, כולל משתמשים הנעזרים בטכנולוגיות מסייעות. הצהרה זו מתארת את מאמצי הנגישות באתר ואת הדרך לדווח על בעיית נגישות.',
      sections: [
        {
          title: 'גישת הנגישות באתר',
          text:
            'אנו שואפים לתחזק את האתר בהתאם לעקרונות התקן הישראלי ת"י 5568 ולהנחיות WCAG ברמת AA. מדובר במאמץ מתמשך, ואין לראות בהצהרה זו אישור הסמכה חיצוני או חוות דעת משפטית.',
        },
        {
          title: 'התאמות נגישות קיימות',
          text:
            'האתר עושה שימוש במבנה סמנטי, כותרות ברורות, קישורים וכפתורים הניתנים להפעלה באמצעות מקלדת, פריסה רספונסיבית למחשב ולמובייל, סימון פוקוס גלוי וטקסט חלופי לתמונות משמעותיות כאשר הדבר רלוונטי.',
        },
        {
          title: 'כלי נגישות באתר',
          text:
            'באתר קיים רכיב נגישות רוחבי הכולל אפשרויות להגדלת טקסט, ניגודיות גבוהה, הדגשת קישורים וצמצום אנימציות. ההעדפות נועדו לאפשר חוויית גלישה נוחה יותר למשתמשים שונים.',
        },
        {
          title: 'שירותים חיצוניים',
          text:
            'חלק מהקישורים באתר מובילים לשירותים חיצוניים כגון LinkedIn, Upwork או Google Analytics. שירותים אלה מופעלים על ידי צדדים שלישיים, והנגישות, מדיניות הפרטיות והתנאים שלהם חלים בנפרד.',
        },
        {
          title: 'פניות ומשוב בנושא נגישות',
          text:
            'אם נתקלתם בבעיית נגישות, טקסט חלופי חסר, קושי בניווט מקלדת או תוכן שקשה להשתמש בו, ניתן לפנות אלינו בכתובת info@devco-solution.online או דרך טופס יצירת הקשר באתר. נבחן את הפנייה ונעשה מאמץ סביר לשפר את חוויית השימוש.',
        },
        {
          title: 'עדכוני הצהרה',
          text:
            'הצהרה זו עשויה להתעדכן מעת לעת בהתאם לשינויים באתר, הוספת תכנים חדשים או ביצוע שיפורי נגישות.',
        },
      ],
    },
    meta: {
      defaultTitle: 'DevCo Solutions - פיתוח תוכנה ואוטומציה עסקית',
      defaultDescription:
        'DevCo Solutions בונה תוכנה מותאמת אישית, מוצרי AI, אפליקציות ווב ומובייל, אוטומציות CRM, דשבורדים, אינטגרציות ותהליכים עסקיים.',
      softwareTitle: 'פיתוח תוכנה מותאמת - DevCo Solutions',
      softwareDescription:
        'פיתוח תוכנה בכיר עבור SaaS, MVP, מוצרי AI, אפליקציות ווב, מובייל, Backend APIs ופלטפורמות סקיילביליות.',
      automationTitle: 'פתרונות אוטומציה לעסקים - DevCo Solutions',
      automationDescription:
        'אוטומציה עסקית עם n8n, Make, Zapier, Monday, Zoho, HubSpot, APIs, Workflows, צ׳אטבוטים, דשבורדים ואינטגרציות CRM.',
      showcasesTitle: 'פרויקטים - DevCo Solutions',
      showcasesDescription:
        'עבודות נבחרות של DevCo בפיתוח תוכנה ואוטומציה, על בסיס תמונות מוצר אמיתיות.',
      aboutTitle: 'אודות DevCo Solutions',
      aboutDescription:
        'הכירו את DevCo Solutions, סיון וולברג, 17+ שנות ניסיון בארכיטקטורת תוכנה ותהליך העבודה של החברה.',
      contactTitle: 'יצירת קשר - DevCo Solutions',
      contactDescription:
        'צרו קשר עם DevCo Solutions בנושא פיתוח תוכנה, אוטומציה עסקית, SaaS, אינטגרציות וליווי ארכיטקטורה.',
      termsTitle: 'תנאי שימוש - DevCo Solutions',
      termsDescription:
        'תנאי השימוש של אתר DevCo Solutions, כולל הסכמה, פניות, עוגיות וקישורים חיצוניים.',
      privacyTitle: 'מדיניות פרטיות - DevCo Solutions',
      privacyDescription:
        'מדיניות הפרטיות של DevCo Solutions, כולל אנליטיקה באתר, פרטי קשר, קישורים חיצוניים, שמירת מידע ובחירות משתמשים.',
      accessibilityTitle: 'הצהרת נגישות - DevCo Solutions',
      accessibilityDescription:
        'הצהרת הנגישות של DevCo Solutions, כולל גישת הנגישות באתר, התאמות קיימות, רכיב הנגישות, שירותים חיצוניים ופרטי קשר למשוב.',
    },
  },
} as const;

export function getCompanyContent(locale: string) {
  return companyContent[locale === 'en' ? 'en' : 'he'];
}

export type ClientChromeContent = {
  brand: {
    name: string;
    email: string;
    phone: string;
    phoneDisplay: string;
    whatsappUrl: string;
    linkedin: string;
  };
  nav: {
    home: string;
    software: string;
    automation: string;
    about: string;
    blog: string;
    privacy: string;
    contact: string;
    menu: string;
    close: string;
    main: string;
  };
  footer: {
    credit: string;
    rights: string;
    privacy: string;
    terms: string;
    accessibility: string;
  };
  contact: {
    email: string;
  };
};

export function getClientChromeContent(locale: string): ClientChromeContent {
  const content = getCompanyContent(locale);

  return {
    brand: {
      name: content.brand.name,
      email: content.brand.email,
      phone: content.brand.phone,
      phoneDisplay: content.brand.phoneDisplay,
      whatsappUrl: buildWhatsAppUrl(content.brand.whatsappMessage),
      linkedin: content.brand.linkedin,
    },
    nav: {
      home: content.nav.home,
      software: content.nav.software,
      automation: content.nav.automation,
      about: content.nav.about,
      blog: content.nav.blog,
      privacy: content.nav.privacy,
      contact: content.nav.contact,
      menu: content.nav.menu,
      close: content.nav.close,
      main: content.nav.main,
    },
    footer: {
      credit: content.footer.credit,
      rights: content.footer.rights,
      privacy: content.footer.privacy,
      terms: content.footer.terms,
      accessibility: content.footer.accessibility,
    },
    contact: {
      email: content.contact.email,
    },
  };
}

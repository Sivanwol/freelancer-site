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
  software: '/software-development',
  automation: '/automation',
  about: '/about',
} as const;

export const companyContent = {
  en: {
    brand: {
      name: 'DevCo Solutions',
      legalName: 'DevCo Solution',
      tagline: 'Innovate Now',
      email: 'info@devco-solution.online',
      fallbackEmail: 'fastwings@gmail.com',
      bookingCalLink: 'sivan-wolberg-jbxkli/15min',
      bookingUrl: 'https://cal.com/sivan-wolberg-jbxkli/15min',
      upwork: 'https://upwork.com/freelancers/swolberg',
      linkedin: 'https://www.linkedin.com/in/swolberg',
    },
    nav: {
      home: 'Home',
      software: 'Software',
      automation: 'Automation',
      showcases: 'Showcases',
      about: 'About',
      contact: 'Book a Discovery Call',
      menu: 'Open menu',
      close: 'Close menu',
      main: 'Main navigation',
    },
    cta: {
      primary: 'Book a Discovery Call',
      secondary: 'View Showcases',
      software: 'Explore Software',
      automation: 'Explore Automation',
      contact: 'Book a Discovery Call',
    },
    home: {
      eyebrow: 'Software development company and automation partner',
      title: 'Software and automation systems built to scale',
      subtitle:
        'DevCo Solutions designs, builds, and modernizes custom software, AI products, CRM automations, and business workflows for teams that need reliable systems, not just code.',
      proof: ['15+ years of architecture experience', 'Top Rated Plus Upwork proof', 'AI, web, mobile, backend, and automation delivery'],
      pathsTitle: 'Choose the track that fits your next move',
      paths: [
        {
          title: 'Custom Software Development',
          description:
            'Full product delivery for SaaS, MVPs, web platforms, mobile apps, APIs, AI features, and scalable backend systems.',
          href: serviceRoutes.software,
          tags: ['React', 'Node.js', 'Python', '.NET', 'React Native', 'AI'],
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
    },
    process: [
      {
        title: 'Discovery',
        text: 'Clarify business goals, users, systems, risks, integrations, and the first measurable outcome.',
      },
      {
        title: 'Planning',
        text: 'Translate goals into architecture, scope, milestones, estimates, and a delivery path.',
      },
      {
        title: 'Development',
        text: 'Build production-ready software, automations, APIs, dashboards, and AI workflows.',
      },
      {
        title: 'Launch',
        text: 'Deploy, test, observe, and support the system as real users and operations begin.',
      },
      {
        title: 'Scale',
        text: 'Improve reliability, performance, reporting, automation coverage, and product velocity.',
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
        'For startups, agencies, and businesses that need senior engineering across architecture, product delivery, and long-term maintainability.',
      services: [
        {
          title: 'SaaS and MVP Development',
          text: 'From first version to production platform, including product architecture, data models, admin tools, payments, and launch readiness.',
        },
        {
          title: 'Web and Mobile Applications',
          text: 'React, Next.js, React Native, and modern frontend systems built for usability, speed, and maintainable growth.',
        },
        {
          title: 'Backend and API Systems',
          text: 'Node.js, Python, C#, .NET, NestJS, FastAPI, integrations, queues, databases, and secure service boundaries.',
        },
        {
          title: 'AI and Agentic Workflows',
          text: 'AI features and internal tools using LangChain, OpenAI, Claude, Codex-style engineering workflows, and retrieval or automation pipelines.',
        },
      ],
      stackTitle: 'Technology coverage',
      stack: ['React', 'Next.js', 'Node.js', 'Python', 'C#', '.NET', 'React Native', 'TypeScript', 'LangChain', 'OpenAI', 'Claude', 'Codex', 'PostgreSQL', 'MongoDB'],
    },
    automationPage: {
      eyebrow: 'Business Automation Solutions',
      title: 'Automation that connects your CRM, leads, teams, and operations',
      subtitle:
        'DevCo builds practical automations that remove manual work, connect the tools your team already uses, and make business processes observable.',
      services: [
        {
          title: 'Lead and Sales Automation',
          text: 'Capture, qualify, enrich, route, notify, and follow up with leads across forms, CRMs, email, Slack, and sales pipelines.',
        },
        {
          title: 'CRM and Workflow Automation',
          text: 'HubSpot, Zoho, Monday, custom CRMs, API workflows, internal approvals, task creation, and lifecycle triggers.',
        },
        {
          title: 'Integrations and Data Sync',
          text: 'n8n, Make, Zapier, direct APIs, webhooks, database sync, reporting flows, and multi-system reliability checks.',
        },
        {
          title: 'Chatbots, Dashboards, and Reports',
          text: 'AI assistants, customer-facing bots, operational dashboards, recurring reports, and visibility for business owners.',
        },
      ],
      stackTitle: 'Automation stack',
      stack: ['n8n', 'Make', 'Zapier', 'Monday', 'Zoho', 'HubSpot', 'APIs', 'Webhooks', 'Chatbots', 'Dashboards', 'Slack', 'Email'],
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
        image: '/showcase-delet-mobile-accessibility.png',
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
        image: '/showcase-vme.png',
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
        image: '/showcase-real-estate-platform.png',
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
      title: 'A senior software partner with company-level process',
      subtitle:
        'DevCo Solutions is led by Sivan Wolberg and built around senior engineering, automation thinking, and reliable delivery for custom software and business systems.',
      bioTitle: 'Sivan Wolberg',
      bioRole: 'CEO, DevCo Solutions',
      bio:
        'Sivan brings 15+ years of experience in software architecture, full-stack development, AI integration, and complex system delivery. The site now speaks as a company because the work is handled with company-level process: discovery, planning, implementation, launch, and scale.',
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
        'Start with a focused discovery conversation. We will map the product, automation, integration, or workflow and decide the first practical delivery step.',
      email: 'Email DevCo',
      booking: 'Book a Discovery Call',
      linkedin: 'Connect on LinkedIn',
    },
    footer: {
      rights: 'All rights reserved © {year} DevCo Solutions',
      credit: 'Custom software development and business automation',
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
        'Learn about DevCo Solutions, Sivan Wolberg, 15+ years of software architecture experience, and the company delivery process.',
    },
  },
  he: {
    brand: {
      name: 'DevCo Solutions',
      legalName: 'DevCo Solution',
      tagline: 'לחשוב, ליצור, להוביל',
      email: 'info@devco-solution.online',
      fallbackEmail: 'fastwings@gmail.com',
      bookingCalLink: 'sivan-wolberg-jbxkli/15min',
      bookingUrl: 'https://cal.com/sivan-wolberg-jbxkli/15min',
      upwork: 'https://upwork.com/freelancers/swolberg',
      linkedin: 'https://www.linkedin.com/in/swolberg',
    },
    nav: {
      home: 'בית',
      software: 'תוכנה',
      automation: 'אוטומציה',
      showcases: 'פרויקטים',
      about: 'אודות',
      contact: 'קביעת שיחת ייעוץ',
      menu: 'פתיחת תפריט',
      close: 'סגירת תפריט',
      main: 'ניווט ראשי',
    },
    cta: {
      primary: 'קביעת שיחת ייעוץ',
      secondary: 'צפייה בפרויקטים',
      software: 'פיתוח תוכנה',
      automation: 'אוטומציה עסקית',
      contact: 'קביעת שיחת ייעוץ',
    },
    home: {
      eyebrow: 'חברת פיתוח תוכנה ושותף לאוטומציה עסקית',
      title: 'פיתוח מערכות תוכנה ואוטומציה לעסקים',
      subtitle:
        'אנחנו מתכננים, בונים ומשדרגים מערכות תוכנה מותאמות אישית, מוצרי AI, אוטומציות CRM ותהליכים עסקיים לצוותים שצריכים מערכת אמינה ולא רק קוד.',
      proof: ['15+ שנות ניסיון בארכיטקטורה', 'הוכחת Upwork ו-Top Rated Plus', 'פיתוח AI, ווב, מובייל, Backend ואוטומציה'],
      pathsTitle: 'בחרו את המסלול שמתאים לשלב הבא',
      paths: [
        {
          title: 'פיתוח תוכנה מותאמת אישית',
          description:
            'פיתוח מוצר מלא עבור SaaS, MVP, פלטפורמות ווב, אפליקציות מובייל, APIs, יכולות AI ומערכות Backend סקיילביליות.',
          href: serviceRoutes.software,
          tags: ['React', 'Node.js', 'Python', '.NET', 'React Native', 'AI'],
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
    },
    process: [
      {
        title: 'Discovery',
        text: 'מגדירים מטרות עסקיות, משתמשים, מערכות, סיכונים, אינטגרציות ותוצאה מדידה ראשונה.',
      },
      {
        title: 'Planning',
        text: 'מתרגמים את המטרות לארכיטקטורה, Scope, אבני דרך, הערכות ומסלול מסירה.',
      },
      {
        title: 'Development',
        text: 'בונים תוכנה, אוטומציות, APIs, דשבורדים וזרימות AI שמוכנים לפרודקשן.',
      },
      {
        title: 'Launch',
        text: 'מעלים לאוויר, בודקים, מנטרים ותומכים במערכת כשמשתמשים ותהליכים אמיתיים נכנסים.',
      },
      {
        title: 'Scale',
        text: 'משפרים אמינות, ביצועים, דוחות, כיסוי אוטומציה ומהירות פיתוח מוצר.',
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
        'אנחנו מלווים סטארטאפים, סוכנויות ועסקים משלב הרעיון ועד מערכת עובדת בפרודקשן. התהליך כולל אפיון טכני, ארכיטקטורה, פיתוח Frontend ו-Backend, אינטגרציות, יכולות AI ותשתית שאפשר להמשיך לפתח ולתחזק לאורך זמן.',
      services: [
        {
          title: 'פיתוח SaaS ו-MVP',
          text: 'מהגרסה הראשונה ועד פלטפורמת פרודקשן, כולל ארכיטקטורה, מודלי דאטה, כלי ניהול, תשלומים והכנה להשקה.',
        },
        {
          title: 'אפליקציות ווב ומובייל',
          text: 'React, Next.js, React Native ומערכות Frontend מודרניות שנבנות לשימושיות, מהירות וצמיחה תחזוקתית.',
        },
        {
          title: 'Backend ו-APIs',
          text: 'Node.js, Python, C#, .NET, NestJS, FastAPI, אינטגרציות, תורים, מסדי נתונים וגבולות שירות מאובטחים.',
        },
        {
          title: 'AI ותהליכי Agent',
          text: 'יכולות AI וכלים פנימיים עם LangChain, OpenAI, Claude, תהליכי עבודה בסגנון Codex, Retrieval ואוטומציה.',
        },
      ],
      stackTitle: 'טכנולוגיות',
      stack: ['React', 'Next.js', 'Node.js', 'Python', 'C#', '.NET', 'React Native', 'TypeScript', 'LangChain', 'OpenAI', 'Claude', 'Codex', 'PostgreSQL', 'MongoDB'],
    },
    automationPage: {
      eyebrow: 'פתרונות אוטומציה לעסקים',
      title: 'אוטומציה שמחברת CRM, לידים, צוותים ותפעול',
      subtitle:
        'DevCo בונה אוטומציות פרקטיות שמורידות עבודה ידנית, מחברות את הכלים שהצוות כבר משתמש בהם, והופכות תהליכים עסקיים למדידים.',
      services: [
        {
          title: 'אוטומציית לידים ומכירות',
          text: 'איסוף, סינון, העשרה, ניתוב, התראות ופולואפים ללידים דרך טפסים, CRM, אימייל, Slack וצינורות מכירה.',
        },
        {
          title: 'CRM ואוטומציית Workflow',
          text: 'HubSpot, Zoho, Monday, מערכות CRM מותאמות, תהליכי API, אישורים פנימיים, יצירת משימות וטריגרים.',
        },
        {
          title: 'אינטגרציות וסנכרון נתונים',
          text: 'n8n, Make, Zapier, APIs ישירים, Webhooks, סנכרון דאטה, זרימות דוחות ובדיקות אמינות בין מערכות.',
        },
        {
          title: 'צ׳אטבוטים, דשבורדים ודוחות',
          text: 'עוזרי AI, בוטים ללקוחות, דשבורדים תפעוליים, דוחות חוזרים ונראות לבעלי העסק.',
        },
      ],
      stackTitle: 'כלי אוטומציה',
      stack: ['n8n', 'Make', 'Zapier', 'Monday', 'Zoho', 'HubSpot', 'APIs', 'Webhooks', 'Chatbots', 'Dashboards', 'Slack', 'Email'],
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
        image: '/showcase-delet-mobile-accessibility.png',
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
        image: '/showcase-vme.png',
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
        image: '/showcase-real-estate-platform.png',
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
      title: 'שותף תוכנה בכיר עם תהליך עבודה של חברה',
      subtitle:
        'DevCo Solutions מובלת על ידי סיון וולברג ונבנתה סביב הנדסה בכירה, חשיבה אוטומטית ומסירה אמינה של תוכנה ותהליכים עסקיים.',
      bioTitle: 'סיון וולברג',
      bioRole: 'CEO, DevCo Solutions',
      bio:
        'סיון מביא 15+ שנות ניסיון בארכיטקטורת תוכנה, פיתוח Full Stack, אינטגרציות AI ובניית מערכות מורכבות. האתר מדבר עכשיו כחברה כי העבודה מתנהלת בתהליך של חברה: Discovery, Planning, Implementation, Launch ו-Scale.',
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
        'מתחילים בשיחת Discovery ממוקדת. נמפה את המוצר, האוטומציה, האינטגרציה או ה-Workflow ונבחר את שלב המסירה הראשון.',
      email: 'אימייל ל-DevCo',
      booking: 'קביעת שיחת ייעוץ',
      linkedin: 'LinkedIn',
    },
    footer: {
      rights: 'כל הזכויות שמורות © {year} DevCo Solutions',
      credit: 'פיתוח תוכנה מותאמת ואוטומציה עסקית',
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
        'הכירו את DevCo Solutions, סיון וולברג, 15+ שנות ניסיון בארכיטקטורת תוכנה ותהליך העבודה של החברה.',
    },
  },
} as const;

export function getCompanyContent(locale: string) {
  return companyContent[locale === 'en' ? 'en' : 'he'];
}

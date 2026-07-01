import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getCompanyContent, type Locale } from '@/lib/company-content';
import {
  FaArrowDown,
  FaArrowRight,
  FaBolt,
  FaBrain,
  FaChartLine,
  FaCheck,
  FaCode,
  FaDatabase,
  FaEnvelope,
  FaLayerGroup,
  FaLinkedinIn,
  FaQuoteLeft,
  FaRocket,
  FaShieldAlt,
  FaStar,
  FaWhatsapp,
} from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import HeroShowcaseCarousel from './HeroShowcaseCarousel';

type PageProps = {
  locale: string;
};

type Content = ReturnType<typeof getCompanyContent>;

const pathIcons = [FaCode, FaBolt];
const serviceIcons = [FaLayerGroup, FaDatabase, FaBrain, FaShieldAlt];
const processIcons = [FaShieldAlt, FaLayerGroup, FaCode, FaRocket, FaChartLine];
const sourceTestimonials = [
  {
    text: 'It was a pleasure working with Sivan Wolberg. He quickly understood our web app setup and was very responsive in fixing bugs and adding new features. His work was efficient and professional.',
    project: 'Web App Specialist - Node.js/React Project',
    date: 'Oct 2025',
  },
  {
    text: 'Excellent full-stack developer with deep knowledge of modern technologies. Communication was clear and deliverables were always on time. Highly recommended for complex projects.',
    project: 'Full-Stack Developer for Social App',
    date: 'Jun 2025',
  },
  {
    text: 'Great experience working with Sivan on our marketing platform. Strong technical skills combined with good understanding of business requirements. Would definitely work with again.',
    project: 'Full-Stack Developer for Marketing Platform',
    date: 'Mar 2025',
  },
];

function localeValue(locale: string): Locale {
  return locale === 'en' ? 'en' : 'he';
}

function ArrowIcon({ isRtl }: { isRtl: boolean }) {
  return <FaArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} aria-hidden="true" />;
}

function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden bg-[#f8fbff] text-[#0d1626]">
      {children}
    </main>
  );
}

function HighlightTitle({
  as: Tag = 'h1',
  text,
  accent,
  className,
}: {
  as?: 'h1' | 'h2';
  text: string;
  accent: string;
  className: string;
}) {
  const index = text.indexOf(accent);

  if (index === -1) {
    return <Tag className={className}>{text}</Tag>;
  }

  const before = text.slice(0, index).trimEnd();
  const after = text.slice(index + accent.length).trimStart();

  return (
    <Tag className={className}>
      {before ? <>{before} </> : null}
      <span className="text-[#1d72d2]">{accent}</span>
      {after ? <> {after}</> : null}
    </Tag>
  );
}

function getAccent(locale: string, page: 'home' | 'software' | 'automation' | 'about') {
  const isHebrew = localeValue(locale) === 'he';
  const accents = {
    home: isHebrew ? 'לעסקים' : 'built to scale',
    software: isHebrew ? 'מערכות AI לעסקים' : 'scalable platforms',
    automation: isHebrew ? 'לידים, צוותים ותפעול' : 'CRM, leads, teams, and operations',
    about: isHebrew ? 'תהליך עבודה של חברה' : 'company-level process',
  };

  return accents[page];
}

function HeroActions({
  content,
}: {
  content: Content;
  isRtl: boolean;
}) {
  return (
    <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <a href={content.brand.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
        {content.cta.primary}
        <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  subtitle,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-10 ${centered ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'}`}>
      <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.2em] text-[#1d72d2]">{eyebrow}</p>
      <h2 className="hero-display text-4xl font-black leading-[0.98] text-[#0d1626] md:text-6xl">{title}</h2>
      {subtitle ? <p className="mt-6 text-lg font-medium leading-8 text-[#526174] md:text-xl">{subtitle}</p> : null}
    </div>
  );
}

function SplitPaths({ content, isRtl }: { content: Content; isRtl: boolean }) {
  return (
    <section className="site-section bg-white">
      <div className="site-container">
        <SectionIntro eyebrow={content.brand.name} title={content.home.pathsTitle} centered />
        <div className="grid gap-5 lg:grid-cols-2">
          {content.home.paths.map((path, index) => {
            const Icon = pathIcons[index] ?? FaCode;
            return (
              <Link
                key={path.href}
                href={path.href}
                className="group flex min-h-[320px] flex-col justify-between rounded-[28px] border border-[#dbe7f5] bg-[#f8fbff] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#4c9df2] hover:shadow-2xl hover:shadow-blue-500/10 md:p-8"
              >
                <div>
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#e7f2ff] text-[#1d72d2]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-[#1d72d2] shadow-sm">
                      {index === 0 ? content.cta.software : content.cta.automation}
                      <ArrowIcon isRtl={isRtl} />
                    </span>
                  </div>
                  <h3 className="hero-display text-3xl font-black leading-none text-[#0d1626] md:text-5xl">{path.title}</h3>
                  <p className="mt-5 text-base font-medium leading-8 text-[#526174] md:text-lg">{path.description}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {path.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[#c7d9ee] bg-white px-3 py-1 text-xs font-extrabold text-[#526174]">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ content }: { content: Content }) {
  return (
    <section className="site-section soft-lines bg-[#f8fbff]">
      <div className="site-container">
        <SectionIntro
          eyebrow={content.brand.tagline}
          title={content.home.processTitle}
          subtitle={content.home.processSubtitle}
          centered
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {content.process.map((step, index) => {
            const Icon = processIcons[index] ?? FaCheck;
            const isLast = index === content.process.length - 1;
            return (
              <div key={step.title} className="relative">
                <article className="h-full rounded-[24px] border border-[#dbe7f5] bg-white p-5 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-sm font-black text-[#1d72d2]">0{index + 1}</span>
                    <Icon className="h-5 w-5 text-[#1d72d2]" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-black leading-tight text-[#0d1626] xl:text-2xl">{step.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-7 text-[#526174]">{step.text}</p>
                </article>
                {!isLast ? (
                  <>
                    <div className="pointer-events-none absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#c7d9ee] bg-[#4c9df2] text-white shadow-lg shadow-blue-500/20 xl:flex ltr:-right-[28px] rtl:-left-[28px]">
                      <FaArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                    </div>
                    <div className="mx-auto my-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#c7d9ee] bg-[#4c9df2] text-white shadow-lg shadow-blue-500/20 xl:hidden">
                      <FaArrowDown className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
        <div className="mt-8 rounded-[28px] bg-[#0a1423] p-6 text-white shadow-2xl shadow-slate-950/10 md:p-8">
          <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h3 className="hero-display text-3xl font-black leading-none md:text-5xl">{content.processExpectations.title}</h3>
              <p className="mt-5 text-base font-medium leading-8 text-slate-300">{content.processExpectations.text}</p>
            </div>
            <div className="grid gap-3">
              {content.processExpectations.points.map((point) => (
                <div key={point} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-medium leading-7 text-slate-200">
                  <FaCheck className="mt-1 h-4 w-4 shrink-0 text-[#75b7ff]" aria-hidden="true" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompanyProof({ content }: { content: Content }) {
  return (
    <section className="site-section bg-white">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <SectionIntro eyebrow="DevCo" title={content.home.proofTitle} subtitle={content.home.proofText} />
            <div className="grid gap-4 sm:grid-cols-3">
              {content.home.proof.map((item, index) => (
                <div key={item} className="rounded-[24px] border border-[#dbe7f5] bg-[#f8fbff] p-5 shadow-sm">
                  <p className="text-5xl font-black leading-none text-[#1d72d2]">{index === 0 ? '15+' : index === 1 ? 'Top' : 'AI'}</p>
                  <p className="mt-4 text-sm font-extrabold leading-6 text-[#0d1626]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[32px] bg-[#e7f2ff]">
            <Image
              src="/sivan-devco-avatar.webp"
              alt={`${content.aboutPage.bioTitle} - ${content.aboutPage.bioRole}`}
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1423]/85 to-transparent p-6 text-white">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#75b7ff]">{content.aboutPage.bioRole}</p>
              <p className="mt-2 text-3xl font-black">{content.aboutPage.bioTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBand({ content }: { content: Content }) {
  return (
    <section id="contact" className="site-section bg-[#f8fbff]">
      <div className="site-container">
        <div className="rounded-[32px] border border-[#dbe7f5] bg-white p-6 text-center shadow-2xl shadow-blue-950/5 md:p-10">
          <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.2em] text-[#1d72d2]">{content.cta.contact}</p>
          <h2 className="hero-display mx-auto max-w-4xl text-4xl font-black leading-[0.98] text-[#0d1626] md:text-6xl">{content.contact.title}</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-8 text-[#526174]">{content.contact.subtitle}</p>
          <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
            <a href={`mailto:${content.brand.email}`} className="contact-link">
              <FaEnvelope aria-hidden="true" />
              <span>{content.contact.email}</span>
            </a>
            <a href={content.brand.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-link">
              <FaWhatsapp aria-hidden="true" />
              <span>{content.contact.whatsapp}</span>
            </a>
            <a href={content.brand.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
              <FaLinkedinIn aria-hidden="true" />
              <span>{content.contact.linkedin}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ locale }: { locale: string }) {
  const isHebrew = localeValue(locale) === 'he';
  const title = isHebrew ? 'לקוחות מספרים על העבודה' : 'Client feedback from real work';
  const subtitle = isHebrew
    ? 'העדויות כאן נשענות על טקסט קיים באתר בלבד, בלי שמות, מדדים או ציטוטים שהומצאו.'
    : 'These testimonials use existing site text only, with no invented names, metrics, or quotes.';
  const eyebrow = isHebrew ? 'הוכחות ועדויות' : 'Testimonials';

  return (
    <section className="site-section bg-white">
      <div className="site-container">
        <SectionIntro eyebrow={eyebrow} title={title} subtitle={subtitle} centered />
        <div className="grid gap-5 lg:grid-cols-3">
          {sourceTestimonials.map((testimonial) => (
            <article key={testimonial.project} className="flex h-full flex-col rounded-[28px] border border-[#dbe7f5] bg-[#f8fbff] p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <FaQuoteLeft className="h-7 w-7 text-[#1d72d2]/30" aria-hidden="true" />
                <div className="flex gap-1 text-[#1d72d2]" aria-label="5 stars">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <FaStar key={star} className="h-4 w-4" aria-hidden="true" />
                  ))}
                </div>
              </div>
              <blockquote className="text-base font-semibold leading-8 text-[#0d1626]">
                “{testimonial.text}”
              </blockquote>
              <div className="mt-auto pt-6">
                <p className="text-sm font-extrabold text-[#0d1626]">{testimonial.project}</p>
                <p className="mt-1 text-sm font-semibold text-[#526174]">{testimonial.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceChoiceBand({ content, isRtl }: { content: Content; isRtl: boolean }) {
  return (
    <div className="mx-auto mt-10 grid max-w-4xl gap-3 md:grid-cols-2">
      {content.home.paths.map((path) => (
        <Link
          key={path.href}
          href={path.href}
          className="group flex items-center justify-between gap-4 rounded-full border border-[#c7d9ee] bg-white px-5 py-4 text-sm font-extrabold text-[#0d1626] shadow-sm transition hover:border-[#4c9df2] hover:text-[#1d72d2]"
        >
          <span>{path.title}</span>
          <ArrowIcon isRtl={isRtl} />
        </Link>
      ))}
    </div>
  );
}

export function HomePage({ locale }: PageProps) {
  const content = getCompanyContent(locale);
  const isRtl = localeValue(locale) === 'he';

  return (
    <PageFrame>
      <section className="relative min-h-screen bg-[#f8fbff] pt-24">
        <div className="tech-grid" aria-hidden="true" />
        <div className="site-container relative z-10 pb-16 pt-12 text-center">
          <p className="mx-auto mb-6 max-w-3xl text-sm font-extrabold uppercase tracking-[0.2em] text-[#1d72d2]">{content.home.eyebrow}</p>
          <HighlightTitle
            text={content.home.title}
            accent={getAccent(locale, 'home')}
            className="hero-display mx-auto max-w-6xl text-5xl font-black leading-[0.9] text-[#0d1626] sm:text-6xl md:text-8xl lg:text-[7.5rem]"
          />
          <p className="mx-auto mt-8 max-w-3xl text-lg font-semibold leading-8 text-[#526174] md:text-2xl md:leading-10">{content.home.subtitle}</p>
          <div className="mt-8">
            <HeroActions content={content} isRtl={isRtl} />
          </div>
          <ServiceChoiceBand content={content} isRtl={isRtl} />
          <div className="mx-auto mt-12 max-w-5xl">
            <HeroShowcaseCarousel items={content.showcases} isRtl={isRtl} />
          </div>
        </div>
      </section>
      <SplitPaths content={content} isRtl={isRtl} />
      <ProcessSection content={content} />
      <TestimonialsSection locale={locale} />
      <CompanyProof content={content} />
      <ContactBand content={content} />
    </PageFrame>
  );
}

export function ServicePage({
  locale,
  type,
}: PageProps & {
  type: 'software' | 'automation';
}) {
  const content = getCompanyContent(locale);
  const isRtl = localeValue(locale) === 'he';
  const page = type === 'software' ? content.softwarePage : content.automationPage;
  const heroImage = type === 'software' ? '/showcase-real-estate-platform.webp' : '/showcase-delet-mobile-accessibility.webp';
  const heroAlt = type === 'software' ? content.showcases[2].title : content.showcases[0].title;

  return (
    <PageFrame>
      <section className="relative bg-[#f8fbff] pt-28">
        <div className="tech-grid" aria-hidden="true" />
        <div className="site-container relative z-10 grid gap-10 pb-16 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.2em] text-[#1d72d2]">{page.eyebrow}</p>
            <HighlightTitle
              text={page.title}
              accent={getAccent(locale, type)}
              className="hero-display max-w-5xl text-5xl font-black leading-[0.9] text-[#0d1626] md:text-7xl"
            />
            <p className="mt-7 max-w-3xl text-lg font-semibold leading-8 text-[#526174] md:text-xl md:leading-9">{page.subtitle}</p>
            <div className="mt-8">
              <HeroActions content={content} isRtl={isRtl} />
            </div>
          </div>
          <div className="relative min-h-[340px] overflow-hidden rounded-[32px] bg-[#e7f2ff] shadow-2xl shadow-blue-950/10 md:min-h-[520px]">
            <Image
              src={heroImage}
              alt={heroAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
      <section className="site-section bg-white">
        <div className="site-container">
          <div className="grid gap-5 md:grid-cols-2">
            {page.services.map((service, index) => {
              const Icon = serviceIcons[index] ?? FaCheck;
              return (
                <article key={service.title} className="rounded-[28px] border border-[#dbe7f5] bg-[#f8fbff] p-6 shadow-sm md:p-8">
                  <Icon className="mb-6 h-7 w-7 text-[#1d72d2]" aria-hidden="true" />
                  <h2 className="text-3xl font-black leading-tight text-[#0d1626]">{service.title}</h2>
                  <p className="mt-4 text-base font-medium leading-8 text-[#526174]">{service.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="site-section bg-[#f8fbff]">
        <div className="site-container">
          <SectionIntro eyebrow="DevCo" title={page.stackTitle} centered />
          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3">
            {page.stack.map((item) => (
              <span key={item} className="rounded-full border border-[#c7d9ee] bg-white px-4 py-2 text-sm font-extrabold text-[#0d1626] shadow-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
      <ProcessSection content={content} />
      <ContactBand content={content} />
    </PageFrame>
  );
}

export function AboutPage({ locale }: PageProps) {
  const content = getCompanyContent(locale);
  const isRtl = localeValue(locale) === 'he';

  return (
    <PageFrame>
      <section className="relative min-h-screen bg-[#f8fbff] pt-28">
        <div className="tech-grid" aria-hidden="true" />
        <div className="site-container relative z-10 grid gap-10 pb-16 pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.2em] text-[#1d72d2]">{content.aboutPage.eyebrow}</p>
            <HighlightTitle
              text={content.aboutPage.title}
              accent={getAccent(locale, 'about')}
              className="hero-display max-w-5xl text-5xl font-black leading-[0.9] text-[#0d1626] md:text-7xl"
            />
            <p className="mt-7 max-w-3xl text-lg font-semibold leading-8 text-[#526174] md:text-xl md:leading-9">{content.aboutPage.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="proof-pill"><FaStar aria-hidden="true" />100% Job Success</span>
              <span className="proof-pill"><SiUpwork aria-hidden="true" />Top Rated Plus</span>
            </div>
            <div className="mt-8">
              <HeroActions content={content} isRtl={isRtl} />
            </div>
          </div>
          <div className="relative min-h-[440px] overflow-hidden rounded-[36px] bg-[#e7f2ff] shadow-2xl shadow-blue-950/10 md:min-h-[620px]">
            <Image
              src="/sivan-devco-avatar.webp"
              alt={`${content.aboutPage.bioTitle} - ${content.aboutPage.bioRole}`}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1423]/90 via-[#0a1423]/40 to-transparent p-6 text-white md:p-8">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#75b7ff]">{content.aboutPage.bioRole}</p>
              <p className="mt-2 text-4xl font-black">{content.aboutPage.bioTitle}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="site-section bg-white">
        <div className="site-container grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <article>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#1d72d2]">{content.aboutPage.bioRole}</p>
            <h2 className="hero-display mt-4 text-4xl font-black leading-none text-[#0d1626] md:text-6xl">{content.aboutPage.bioTitle}</h2>
            <p className="mt-6 text-lg font-medium leading-9 text-[#526174]">{content.aboutPage.bio}</p>
          </article>
          <aside className="rounded-[28px] border border-[#dbe7f5] bg-[#f8fbff] p-6 shadow-sm md:p-8">
            <h2 className="text-3xl font-black text-[#0d1626]">{content.aboutPage.upworkTitle}</h2>
            <p className="mt-4 text-base font-medium leading-8 text-[#526174]">{content.aboutPage.upworkText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="proof-pill"><FaStar aria-hidden="true" />100% Job Success</span>
              <span className="proof-pill"><SiUpwork aria-hidden="true" />Top Rated Plus</span>
            </div>
          </aside>
        </div>
      </section>
      <TestimonialsSection locale={locale} />
      <section className="site-section dark-band">
        <div className="site-container">
          <div className="grid gap-4 md:grid-cols-4">
            {content.aboutPage.values.map((value, index) => (
              <div key={value} className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5 text-base font-extrabold leading-7 text-white">
                <span className="mb-8 block text-5xl font-black text-[#75b7ff]">{String(index + 1).padStart(2, '0')}</span>
                {value}
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProcessSection content={content} />
      <ContactBand content={content} />
    </PageFrame>
  );
}

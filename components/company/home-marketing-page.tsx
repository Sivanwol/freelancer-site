import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getCompanyContent, type Locale } from '@/lib/company-content';
import { siteConfig } from '@/lib/config';
import { sitePaths } from '@/lib/site-paths';
import { blogPostPath } from '@/lib/seo';
import { getSoroArticles, isWave1Slug } from '@/lib/soro';
import { FaArrowLeft, FaDatabase, FaRocket } from 'react-icons/fa';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import TestimonialsCarousel from './testimonials-carousel';

type Props = {
  locale: string;
};

function localeValue(locale: string): Locale {
  return locale === 'en' ? 'en' : 'he';
}

const sourceTestimonials = [
  {
    text: 'We’ve had an excellent experience working with Sivan Wolberg, our Senior Developer. He joined us August 2025 and took on the significant task of rebuilding our platform. Since then, he has become an incredibly valuable part of our team. What sets him apart is that he doesn’t just focus on writing code, he takes the time to truly understand our business, our Clients, and the problems we are trying to solve. He approaches development with a business mindset, thinking through how technology can better meet the needs of our clients and improve the overall product. He is thoughtful, dependable, solutions-oriented, and a strong technical partner. We’ve been extremely pleased with both the platform he has built and his continued commitment to making it better. He has become a trusted and highly valued member of our team, and we look forward to continuing to work with him.',
    project: 'Platform Rebuild',
    date: 'Aug 2026',
  },
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

const testimonialMonthsHe: Record<string, string> = {
  Jan: 'ינואר',
  Feb: 'פברואר',
  Mar: 'מרץ',
  Apr: 'אפריל',
  May: 'מאי',
  Jun: 'יוני',
  Jul: 'יולי',
  Aug: 'אוגוסט',
  Sep: 'ספטמבר',
  Oct: 'אוקטובר',
  Nov: 'נובמבר',
  Dec: 'דצמבר',
};

function formatTestimonialDate(date: string, isHebrew: boolean): string {
  if (!isHebrew) return date;
  const [month, year] = date.split(' ');
  return `${testimonialMonthsHe[month] ?? month} ${year}`;
}

export async function HomeMarketingPage({ locale }: Props) {
  const isHebrew = localeValue(locale) === 'he';
  const content = getCompanyContent(locale);
  const m = content.home.marketing;
  const articles = await getSoroArticles();
  const blogPosts = articles.filter((a) => isWave1Slug(a.slug)).slice(0, 3);

  const testimonials = sourceTestimonials.map((item) => ({
    ...item,
    date: formatTestimonialDate(item.date, isHebrew),
  }));

  return (
    <>
      <section id="hero" className="relative overflow-hidden pb-24 pt-36 md:pb-32 md:pt-44">
        <div className="site-container">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-600/30 bg-amber-900/30 px-4 py-1.5 text-sm font-bold text-amber-400">
                {m.badgeBeforeCto}
                <bdi dir="ltr">CTO</bdi>
              </div>
              <h1 className="mb-8 text-4xl font-bold leading-[1.15] text-white md:text-6xl lg:text-7xl">
                {m.heroTitleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="text-gradient-copper mt-2 block italic">
                  <span className="whitespace-nowrap">{m.heroAccentLine}</span>
                </span>
              </h1>
              <p className="mb-12 max-w-xl text-lg leading-relaxed text-stone-300 md:text-2xl">{m.heroSubtitle}</p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href={sitePaths.contact} className="btn-primary px-10 py-5 text-lg">
                  {m.heroPrimaryCta}
                  <FaArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
                <a href="#offers" className="btn-secondary px-10 py-5 text-lg">
                  {m.heroSecondaryCta}
                </a>
              </div>
            </div>

            <div className="group relative">
              <div className="glass-card relative overflow-hidden rounded-[2.5rem] border-stone-800 shadow-2xl">
                <Image
                  src={m.featuredProject.image}
                  alt={m.featuredProject.imageAlt}
                  width={1536}
                  height={1024}
                  className="duotone-filter aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-8 bottom-8">
                  <div className="mb-3 w-fit rounded bg-amber-600/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    {m.featuredProject.badge}
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">{m.featuredProject.title}</h2>
                  <p className="text-sm font-medium text-amber-200/90">{m.featuredProject.caption}</p>
                  <p className="mt-2 text-stone-300">{m.featuredProject.summary}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="offers" className="inner-section-alt py-24 md:py-32">
        <div className="site-container mb-16 text-center md:mb-24">
          <h2 className="mb-6 text-4xl font-bold italic text-white md:text-6xl">{m.offersTitle}</h2>
          <p className="mx-auto max-w-2xl text-xl text-stone-400">{m.offersSubtitle}</p>
        </div>
        <div className="site-container grid gap-8 md:grid-cols-2">
          <article className="glass-card rounded-[2.5rem] p-8 md:p-12">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-600/10 text-4xl text-amber-500">
              <HiOutlineChatAlt2 aria-hidden="true" />
            </div>
            <h3 className="mb-4 text-3xl font-bold text-white">
              {m.offerRagTitle} <bdi dir="ltr">AI</bdi>
            </h3>
            <p className="mb-6 text-lg text-stone-300">{m.offerRagText}</p>
            <Link href={sitePaths.ragProduction} className="font-bold text-amber-500 hover:underline">
              {m.offerLinkLabel}
            </Link>
          </article>
          <article className="glass-card rounded-[2.5rem] p-8 md:p-12">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-600/10 text-4xl text-amber-500">
              <FaRocket aria-hidden="true" />
            </div>
            <h3 className="mb-4 text-3xl font-bold text-white">{m.offerBuildTitle}</h3>
            <p className="mb-6 text-lg text-stone-300">{m.offerBuildText}</p>
            <Link href={sitePaths.softwareDevelopment} className="font-bold text-amber-500 hover:underline">
              {m.offerLinkLabel}
            </Link>
          </article>
        </div>
        <div className="site-container mt-12 text-center">
          <Link href={sitePaths.contact} className="btn-primary px-10 py-4">
            {m.offersCta}
          </Link>
        </div>
      </section>

      <section id="showcase" className="py-24 md:py-32">
        <div className="site-container">
          <h2 className="mb-16 text-center text-4xl font-bold italic text-white md:text-6xl">{m.projectsTitle}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {m.projects.map((project) =>
              project.type === 'image' ? (
                <article
                  key={project.title}
                  className="group glass-card overflow-hidden rounded-3xl border-stone-800 transition hover:border-amber-600/40 hover:shadow-[0_0_30px_rgba(217,119,6,0.15)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      width={1200}
                      height={750}
                      className="duotone-filter h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent" aria-hidden="true" />
                    <div className="absolute inset-x-4 bottom-4">
                      <h3 className="text-lg font-bold text-white md:text-xl">{project.title}</h3>
                      <p className="text-sm text-stone-400">{project.summary}</p>
                    </div>
                  </div>
                </article>
              ) : (
                <article
                  key={project.title}
                  className="group flex flex-col items-center justify-center rounded-3xl border border-stone-800 bg-amber-600/5 p-10 text-center transition hover:border-amber-600/40"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-600/10 text-5xl text-amber-500 transition group-hover:scale-110">
                    <FaDatabase aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-white">{project.title}</h3>
                  <p className="text-stone-400">{project.summary}</p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <TestimonialsCarousel
        testimonials={testimonials}
        isRtl={isHebrew}
        labels={{
          previous: isHebrew ? 'עדות קודמת' : 'Previous testimonial',
          next: isHebrew ? 'עדות הבאה' : 'Next testimonial',
          slide: isHebrew ? 'עדות' : 'Testimonial',
        }}
        ctaHref={`${sitePaths.contact}`}
        ctaLabel={m.testimonialsCta}
      />

      <section id="about" className="py-24 md:py-32">
        <div className="site-container grid items-center gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="relative aspect-square overflow-hidden rounded-[3rem] border-2 border-amber-600/30 shadow-2xl shadow-amber-600/10">
              <Image
                src="/sivan-devco-avatar.webp"
                alt={m.aboutImageAlt}
                fill
                sizes="(min-width: 1024px) 32vw, 90vw"
                className="duotone-filter object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="mb-8 text-4xl font-bold italic text-white md:text-5xl">{m.aboutTitle}</h2>
            <div className="space-y-6 text-lg leading-relaxed text-stone-300 md:text-xl">
              {m.aboutParagraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraph.slice(0, 40)}>
                  {isHebrew && paragraphIndex === 0 ? (
                    <>
                      כארכיטקט תוכנה ו-<bdi dir="ltr">CTO</bdi>, אני עוזר לחברות לדלג מעל שלב הניסוי והטעייה היקר
                      בעולמות הפיתוח והבינה המלאכותית.
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={content.brand.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-stone-800 bg-stone-900 p-4 text-3xl text-amber-500 transition hover:border-amber-600"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href={content.brand.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-stone-800 bg-stone-900 px-4 py-4 text-sm font-bold text-amber-500 transition hover:border-amber-600"
                aria-label="Upwork"
              >
                Upwork
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="blog" className="inner-section-alt py-24 md:py-32">
        <div className="site-container">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-bold italic text-white md:text-6xl">{m.blogTitle}</h2>
              <p className="mt-4 text-xl text-stone-400">{m.blogSubtitle}</p>
            </div>
            <Link href={sitePaths.blog} className="flex items-center gap-2 font-bold text-amber-500 hover:underline">
              {m.blogAllLink}
              <FaArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid gap-8 md:grid-cols-3">
            {blogPosts.map((post) => (
              <li key={post.id}>
                <Link
                  href={blogPostPath(post.slug)}
                  className="group glass-card block overflow-hidden rounded-3xl border-stone-800 transition hover:border-amber-600/40"
                >
                  <div className="aspect-video bg-gradient-to-br from-amber-600/20 to-stone-900" aria-hidden="true" />
                  <div className="p-6 md:p-8">
                    <h3 className="mb-3 text-xl font-bold text-white transition group-hover:text-amber-500">{post.title}</h3>
                    {post.excerpt ? <p className="line-clamp-2 text-sm text-stone-400">{post.excerpt}</p> : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="px-4 py-24 md:py-32">
        <div className="site-container">
          <div className="glass-card relative mx-auto max-w-5xl overflow-hidden rounded-[4rem] p-10 text-center md:p-20">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent" aria-hidden="true" />
            <div className="relative z-10">
              <h2 className="mb-8 text-3xl font-bold italic leading-tight text-white md:text-5xl">
                {isHebrew ? (
                  <>
                    אל תתנו ל-<bdi dir="ltr">AI</bdi> בינוני <br className="hidden sm:block" />
                    לעכב את הצמיחה שלכם.
                  </>
                ) : (
                  m.closingTitle
                )}
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-lg text-stone-300 md:text-2xl">{m.closingSubtitle}</p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href={sitePaths.contact} className="rounded-2xl bg-white px-10 py-5 text-lg font-bold text-stone-900 transition hover:scale-105">
                  {m.closingPrimaryCta}
                </Link>
                <a href={`mailto:${siteConfig.email}`} className="btn-secondary px-10 py-5 text-lg">
                  {m.closingEmailCta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

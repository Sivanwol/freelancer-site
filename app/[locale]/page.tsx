import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import Testimonials from '@/components/Testimonials';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { ErrorBoundary } from '@/components/ErrorBoundary';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-[#0d1117]">
        <Navbar />
        <FloatingCTA />
        <Hero />
        <About />
        <Services />
        <Skills />
        <Testimonials />
        <ExperienceTimeline />
        <Contact />
        <Footer />
      </main>
    </ErrorBoundary>
  );
}




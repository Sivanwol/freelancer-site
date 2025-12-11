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

export default function Home() {
  return (
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
  );
}




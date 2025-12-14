import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BuildingAnimation from '@/components/BuildingAnimation';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Achievements from '@/components/Achievements';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <BuildingAnimation />
      <Services />
      <Projects />
      <About />
      <Achievements />
      <Testimonials />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}

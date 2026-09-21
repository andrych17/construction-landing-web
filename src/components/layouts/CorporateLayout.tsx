'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BuildingAnimation from '@/components/BuildingAnimation';
import RemotionSection from '@/components/RemotionSection';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Achievements from '@/components/Achievements';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function CorporateLayout() {
  return (
    <div className="w-full">
      <Navbar />
      <Hero />
      <BuildingAnimation />
      <RemotionSection />
      <Services />
      <Projects />
      <About />
      <Achievements />
      <Testimonials />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
}

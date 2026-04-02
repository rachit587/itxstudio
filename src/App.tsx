import Lenis from 'lenis';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpotlightEffect from './components/SpotlightEffect';
import { LimelightNav } from './components/ui/limelight-nav';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ 
      duration: 1.4, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
    });
    
    function raf(time: number) { 
      lenis.raf(time); 
      requestAnimationFrame(raf); 
    }
    
    requestAnimationFrame(raf);
    
    return () => lenis.destroy();
  }, []);

  return (
    <main className="bg-[#0a0a0a] min-h-screen font-delius text-[#9a9a9a] selection:bg-[#00ff66] selection:text-black">
      <SpotlightEffect />
      
      <Navbar />
      
      <section id="home">
        <Hero />
      </section>
      
      <Marquee />
      
      <section id="services">
        <Services />
      </section>
      
      <section id="portfolio">
        <Portfolio />
      </section>
      
      <Testimonials />
      
      <section id="about">
        <About />
      </section>
      
      <section id="contact">
        <Contact />
      </section>
      
      <Footer />
      
      <LimelightNav />
    </main>
  );
}

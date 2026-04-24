import Lenis from 'lenis';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Smoother Lenis config — slightly longer duration with custom easing for premium feel
    const lenis = new Lenis({ 
      duration: 1.6, 
      easing: (t) => {
        // Custom easeOutExpo — ultra-smooth deceleration
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      smoothWheel: true,
      // Reduce touch multiplier for smoother mobile scroll
      touchMultiplier: 1.5,
    });
    
    function raf(time: number) { 
      lenis.raf(time); 
      requestAnimationFrame(raf); 
    }
    
    requestAnimationFrame(raf);

    // Trigger page entrance after a tiny delay
    requestAnimationFrame(() => setIsLoaded(true));
    
    return () => lenis.destroy();
  }, []);

  return (
    <AnimatePresence>
      <motion.main 
        className="bg-[#0a0a0a] min-h-screen font-delius text-[#9a9a9a] selection:bg-[#00ff66] selection:text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <SpotlightEffect />
        
        <Navbar />
        
        <section id="home">
          <Hero />
        </section>
        
        <Marquee />
        
        <section id="services" className="section-lazy">
          <Services />
        </section>
        
        <section id="portfolio" className="section-lazy">
          <Portfolio />
        </section>
        
        <div className="section-lazy">
          <Testimonials />
        </div>
        
        <section id="about" className="section-lazy">
          <About />
        </section>
        
        <section id="contact" className="section-lazy">
          <Contact />
        </section>
        
        <Footer />
        
        <LimelightNav />
      </motion.main>
    </AnimatePresence>
  );
}

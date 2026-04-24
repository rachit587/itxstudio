import { motion, useInView } from "framer-motion";
import { Check, IndianRupee, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LiquidMetalButton } from "./ui/liquid-metal-button";
import createGlobe from "cobe";

function Counter({ from, to, label, suffix = "" }: { from: number; to: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      let start = from;
      const duration = 2000;
      const step = (to - from) / (duration / 16);
      let rafId: number;
      
      const animate = () => {
        start += step;
        if ((to > from && start < to) || (to < from && start > to)) {
          setCount(Math.floor(start));
          rafId = requestAnimationFrame(animate);
        } else {
          setCount(to);
        }
      };
      rafId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(rafId);
    }
  }, [inView, from, to]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="text-3xl md:text-4xl lg:text-5xl text-[#00ff66] tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-[#9a9a9a] uppercase tracking-widest text-[10px] md:text-xs font-bold text-center">
        {label}
      </div>
    </div>
  );
}



/* Spinning Globe */
function SpinningGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 160,
      height: 160,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.1],
      markerColor: [0, 1, 0.4],
      glowColor: [0, 1, 0.4],
      markers: [
        // India
        { location: [20.5937, 78.9629], size: 0.1 },
      ],
      // @ts-ignore: onRender is missing in cobe types
      onRender: (state: Record<string, any>) => {
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] flex items-center justify-center relative">
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 1,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}

const smoothEase = [0.25, 0.46, 0.45, 0.94] as const;

export default function About() {
  return (
    <div className="py-24 md:py-32 bg-[#0f0f0f] relative z-10 flex flex-col items-center px-4 md:px-8 overflow-hidden">
      
      {/* Hero Tagline */}
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="text-[clamp(2rem,4.5vw,4.5rem)] text-white text-center max-w-4xl leading-tight mb-6"
      >
        Built Different. Priced Fair.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15, ease: smoothEase }}
        className="text-[#9a9a9a] text-center text-base md:text-lg max-w-xl mb-16"
      >
        We build custom digital products for Indian &amp; international clients — no templates, no shortcuts.
      </motion.p>

      {/* Stats Row — 4 columns on all sizes */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
        className="grid grid-cols-4 gap-4 sm:gap-8 md:gap-16 w-full max-w-4xl mb-24"
      >
        <Counter from={0} to={12} suffix="+" label="Projects Delivered" />
        <Counter from={0} to={100} suffix="%" label="Custom Built" />
        <Counter from={0} to={100} suffix="%" label="Trustworthy" />
        <div className="flex flex-col items-center gap-2">
          <SpinningGlobe />
          <div className="text-[#9a9a9a] uppercase tracking-widest text-[10px] md:text-xs font-bold text-center">India & Global</div>
        </div>
      </motion.div>

      {/* ─── Pricing Section ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="w-full max-w-3xl mb-24"
      >
        <div className="relative rounded-3xl border border-[#222222] bg-gradient-to-br from-[#111111] via-[#0f0f0f] to-[#0a0a0a] p-8 md:p-12 overflow-hidden">
          {/* Glow effect */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#00ff66]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#00ff66]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="bg-[#00ff66]/10 border border-[#00ff66]/20 rounded-full p-3">
                <IndianRupee className="w-6 h-6 text-[#00ff66]" />
              </div>
              <h3 className="text-2xl md:text-3xl text-white">How We Price</h3>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
              className="text-[#9a9a9a] text-center text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              We don&apos;t believe in fixed packages. You tell us what you need — we show you a working demo — and then we talk business. 
              <span className="text-white font-medium"> You only pay for the features you choose.</span> No hidden costs, no bloated bundles. You save money, we save effort — everyone wins.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35, ease: smoothEase }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl md:text-5xl text-[#00ff66] font-medium">₹ Custom</span>
              </div>
              <p className="text-[#9a9a9a] text-sm text-center">
                Your price. Your features. Nothing extra.
              </p>
              <div className="mt-4">
                <LiquidMetalButton
                  label="Let's Talk"
                  icon={<ArrowRight size={18} />}
                  width={180}
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Key Facts Pills */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
        className="flex flex-wrap justify-center gap-4 max-w-3xl mb-16"
      >
        {[
          "One-time fee — no monthly charges",
          "Best value for money",
          "Built for businesses of all sizes",
          "From startups to established businesses"
        ].map((fact, i) => (
          <div key={i} className="flex items-center gap-2 bg-[#1a1a1a] border border-[#222222] rounded-full px-5 py-2 transition-all duration-300 ease-out hover:border-[#00ff66]/30 hover:shadow-[0_0_15px_rgba(0,255,102,0.08)]">
            <Check className="w-4 h-4 text-[#00ff66] flex-shrink-0" />
            <span className="text-[#9a9a9a] text-sm md:text-base">{fact}</span>
          </div>
        ))}
      </motion.div>

      {/* Location */}
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ ease: smoothEase }}
        className="text-[#9a9a9a] text-xs uppercase tracking-[0.2em]"
      >
        Team based in Bengaluru &amp; Kolkata
      </motion.p>
    </div>
  );
}

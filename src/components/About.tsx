import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MISSION = "Beautiful digital products. Built for you. Priced right.";

function Counter({ from, to, label, suffix = "" }: { from: number; to: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      let start = from;
      const duration = 2000;
      const step = (to - from) / (duration / 16);
      
      const animate = () => {
        start += step;
        if (start < to) {
          setCount(Math.floor(start));
          requestAnimationFrame(animate);
        } else {
          setCount(to);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, from, to]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="text-4xl md:text-5xl lg:text-6xl text-[#00ff66]">
        {count}{suffix}
      </div>
      <div className="text-[#9a9a9a] uppercase tracking-widest text-xs md:text-sm font-bold">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const words = MISSION.split(" ");
  
  return (
    <div className="py-32 bg-[#0f0f0f] relative z-10 flex flex-col items-center px-4 md:px-8 overflow-hidden">
      
      {/* Mission Statement */}
      <h2 className="text-[clamp(2rem,4vw,4.5rem)] text-white text-center max-w-5xl leading-tight mb-24 flex flex-wrap justify-center gap-x-[0.5em] gap-y-2">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 20 }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Stats Row */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 w-full max-w-4xl mb-24">
        <Counter from={0} to={47} suffix="+" label="Projects Delivered" />
        <Counter from={0} to={100} suffix="%" label="Custom Built" />
        <Counter from={100} to={0} label="Monthly Charges" />
      </div>

      {/* Short Paragraph */}
      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-[#9a9a9a] text-center max-w-[600px] text-lg md:text-xl leading-relaxed mb-16"
      >
        ITX Studio builds digital products that work — for startups, local businesses, and everyone in between. We don't do one-size-fits-all. Every project is built from scratch, exactly the way you need it, at a price that makes sense.
      </motion.p>

      {/* Key Facts Pills */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 max-w-3xl mb-32"
      >
        {[
          "One-time fee — no monthly charges",
          "Best value for money",
          "Built for businesses of all sizes",
          "From startups to established businesses"
        ].map((fact, i) => (
          <div key={i} className="flex items-center gap-2 bg-[#1a1a1a] border border-[#222222] rounded-full px-5 py-2">
            <Check className="w-4 h-4 text-[#00ff66]" />
            <span className="text-[#9a9a9a] text-sm md:text-base">{fact}</span>
          </div>
        ))}
      </motion.div>

      {/* Location */}
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-[#9a9a9a] text-xs uppercase tracking-[0.2em]"
      >
        Team based in Bengaluru & Kolkata
      </motion.p>
    </div>
  );
}

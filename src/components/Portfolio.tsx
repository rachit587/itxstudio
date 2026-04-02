import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Portfolio() {
  return (
    <div className="min-h-screen py-24 bg-[#0a0a0a] relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-4"
          >
            our work
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#9a9a9a] text-lg lg:text-xl"
          >
            Coming soon. Great things are being built.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {[1, 2, 3, 4].map((i) => (
            <PortfolioCard key={i} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioCard({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  const smoothRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative w-full aspect-video rounded-3xl bg-[#111111] overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(0,255,102,0.1)] border border-[#222222]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] z-0" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 transform-style-preserve-3d" style={{ transform: "translateZ(50px)" }}>
          <div className="bg-[#00ff66] text-black text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full mb-4">
            Coming Soon
          </div>
          <h3 className="text-white text-3xl mb-2 text-center">
            Coming Soon
          </h3>
          <p className="text-[#9a9a9a] text-center max-w-sm">
            Something amazing is on its way.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

import { useState, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Throttle the scroll event to avoid excessive state updates
  useMotionValueEvent(scrollY, "change", useCallback((latest: number) => {
    const threshold = typeof window !== "undefined" ? window.innerHeight / 2 : 400;
    setScrolled(latest > threshold);
  }, []));

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out ${
        scrolled ? "translate-y-0 bg-black/85 backdrop-blur-xl border-b border-[#222222]" : "-translate-y-full"
      }`}
      style={{ willChange: scrolled ? 'transform' : 'auto' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-10 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center">
          <img
            src="/itx-logo.png"
            alt="ITX Studio"
            className="h-12 md:h-24 w-auto object-contain"
            loading="eager"
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </a>

        {/* Status Badge */}
        <div className="flex items-center gap-3 bg-[#111111] border border-[#222222] rounded-full px-4 py-2">
          <div className="w-2.5 h-2.5 bg-[#00ff66] rounded-full animate-pulse-ring" />
          <span className="text-[#9a9a9a] text-xs uppercase tracking-wider hidden sm:block">
            Available for projects
          </span>
          <span className="text-[#9a9a9a] text-xs uppercase tracking-wider sm:hidden">
            Available
          </span>
        </div>
      </div>
    </motion.nav>
  );
}

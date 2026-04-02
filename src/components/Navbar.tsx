import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > (typeof window !== "undefined" ? window.innerHeight / 2 : 400));
  });

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? "translate-y-0 bg-black/85 backdrop-blur-xl border-b border-[#222222]" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center">
          <img
            src="/itx-logo.png"
            alt="ITX Studio"
            className="h-18 w-auto object-contain"
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

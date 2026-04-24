import { BackgroundPaths } from "./ui/background-paths";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const TITLE = "Your One-Stop Solution For Everything Digital";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    // Use RAF-based typing for smoother character reveal (syncs with display refresh)
    let rafId: number;
    let lastTime = 0;
    const charInterval = 22; // ms between characters

    const tick = (time: number) => {
      if (time - lastTime >= charInterval) {
        lastTime = time;
        if (indexRef.current <= TITLE.length) {
          setDisplayText(TITLE.substring(0, indexRef.current));
          indexRef.current++;
        } else {
          return; // Stop animation
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative min-h-[75vh] md:min-h-screen flex items-center justify-center pt-16 md:pt-20 overflow-hidden">
      <BackgroundPaths />

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center flex flex-col items-center -translate-y-16 md:-translate-y-24">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
           className="mb-8"
        >
          <img
            src="/itx-logo.png"
            alt="ITX Studio"
            className="w-[240px] md:w-[360px] mx-auto object-contain"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </motion.div>

        <h1 className="text-[clamp(2.5rem,5vw,5rem)] leading-tight mb-12 max-w-4xl font-normal mx-auto text-[#BCC6CC] [text-shadow:0_0_20px_rgba(188,198,204,0.6),0_0_40px_rgba(188,198,204,0.3)] min-h-[140px] md:min-h-0">
          {displayText}
          {displayText.length <= TITLE.length && (
            <span 
              className="inline-block w-[4px] h-[0.9em] bg-[#BCC6CC] ml-2 animate-pulse align-middle opacity-80" 
              style={{ animationDuration: '0.8s' }}
            />
          )}
        </h1>
      </div>
    </div>
  );
}

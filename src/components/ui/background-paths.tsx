"use client";

import { motion } from "framer-motion";

// ITX Studio brand colors
const GREEN = "#00ff66";
const SILVER = "#BCC6CC";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => {
    // Alternate between green and silver for variety
    const isGreen = i % 3 !== 1; // 2 out of 3 green, 1 silver for balance
    return {
      id: i,
      d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
        380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
        152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
        684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
      color: isGreen ? GREEN : SILVER,
      width: 0.6 + i * 0.035,
      // Much brighter opacity range for shining appearance
      opacity: isGreen
        ? 0.5 + (i % 5) * 0.1   // green: 0.5–0.9
        : 0.4 + (i % 4) * 0.1,  // silver: 0.4–0.7
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.3, pathOffset: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              pathOffset: 1,
              opacity: [0, path.opacity, 0],
            }}
            transition={{
              duration: 20 + (path.id * 7) % 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths() {
  return (
    <div className="absolute inset-0 z-0 bg-[#0a0a0a] overflow-hidden">
      {/* Subtle radial glow — slightly stronger */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,255,102,0.06)_0%,transparent_70%)] opacity-60" />
      {/* Grain overlay */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC4zNSIvPjwvc3ZnPg==')]" />
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}

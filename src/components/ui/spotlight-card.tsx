import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: string;
}

export function GlowCard({ className, children, glowColor = "green", ...props }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [styles, setStyles] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // We can set CSS variables for the glow effect
    setStyles({
      "--x": `${x}px`,
      "--y": `${y}px`,
      "--glow-color": glowColor === "green" ? "#00ff66" : glowColor,
    } as React.CSSProperties);
  };

  const handleMouseLeave = () => {
    setStyles({
      "--x": "-1000px",
      "--y": "-1000px",
    } as React.CSSProperties);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={styles}
      className={cn(
        "relative overflow-hidden rounded-[50px] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        "before:absolute before:inset-0 before:z-0 before:pointer-events-none",
        "before:bg-[radial-gradient(400px_circle_at_var(--x,_0)_var(--y,_0),_var(--glow-color,_#00ff66)_0%,_transparent_50%)]",
        "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        className
      )}
      {...props}
    >
      <div className="absolute inset-[1px] z-10 rounded-[49px] bg-[#1a1a1a] transition-colors duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:bg-transparent" />
      <div className="relative z-20 w-full h-full text-silver">
        {children}
      </div>
    </div>
  );
}

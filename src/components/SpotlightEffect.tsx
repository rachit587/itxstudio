import { useEffect, useRef } from 'react';

export default function SpotlightEffect() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    // Use RAF-throttled mouse tracking for smooth 60fps updates
    let rafId: number;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      // Smooth interpolation (lerp) for buttery cursor follow
      currentX = lerp(currentX, targetX, 0.15);
      currentY = lerp(currentY, targetY, 0.15);

      el.style.setProperty('--spotlight-x', `${currentX}px`);
      el.style.setProperty('--spotlight-y', `${currentY}px`);

      rafId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Mobile: don't render at all
  if (typeof window !== 'undefined' && 
      (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{
        background: `radial-gradient(500px circle at var(--spotlight-x, -100px) var(--spotlight-y, -100px), rgba(0, 255, 102, 0.035), transparent 60%)`,
        willChange: 'background',
      }}
    />
  );
}

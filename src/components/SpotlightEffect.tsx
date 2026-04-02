import { useEffect, useState } from 'react';

export default function SpotlightEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isMobile) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{
        background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(0, 255, 102, 0.03), transparent 60%)`,
        transition: 'background 0.1s ease',
      }}
    />
  );
}

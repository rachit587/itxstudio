import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is touch capable or mobile width
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full z-[9999] pointer-events-none mix-blend-difference"
      animate={{
        x: position.x - (isHovering ? 12 : 6),
        y: position.y - (isHovering ? 12 : 6),
        width: isHovering ? 24 : 12,
        height: isHovering ? 24 : 12,
        backgroundColor: isHovering ? '#00ff66' : '#9a9a9a'
      }}
      transition={{
        type: 'spring',
        stiffness: 700,
        damping: 40,
        mass: 0.5
      }}
    />
  );
}

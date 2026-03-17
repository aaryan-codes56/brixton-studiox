import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for the outer ring (lag effect)
  const ringX = useSpring(0, { stiffness: 150, damping: 20 });
  const ringY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      // Check if the hovered element or its parent is interactive
      const isInteractive = e.target.closest('a, button, [role="button"], input, select, textarea');
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [ringX, ringY, isVisible]);

  if (typeof window === 'undefined' || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Outer Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          borderColor: isHovering ? 'rgba(124, 58, 237, 0.5)' : 'rgba(255, 255, 255, 0.3)',
          backgroundColor: isHovering ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
        className="absolute w-10 h-10 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-[1px]"
      />
      
      {/* Inner Dot */}
      <motion.div
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
        className="absolute w-1.5 h-1.5 bg-accent-ice rounded-full shadow-[0_0_10px_rgba(103,232,249,0.8)]"
      />
    </div>
  );
};

export default CustomCursor;

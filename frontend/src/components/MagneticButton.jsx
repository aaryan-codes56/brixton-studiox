import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const MagneticButton = ({ children, className = "", ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const quickSpring = { stiffness: 300, damping: 20 };
  
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull strength (distance from center / 4)
    x.set((clientX - centerX) / 3.5);
    y.set((clientY - centerY) / 3.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className={`relative inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const headline = "We Build Brands That Dominate";
  const words = headline.split(" ");

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const wordVars = {
    hidden: { opacity: 0, y: 100, rotateX: 45, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-between pt-24 pb-10 overflow-hidden">
      {/* Grid Overlay with Parallax - Bold "Graph" Look with Purple Glow */}
      <motion.div 
        animate={{ x: mousePos.x * 0.4, y: mousePos.y * 0.4 }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        className="absolute inset-[-150px] pointer-events-none opacity-80"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124, 58, 237, 0.1) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 70%, transparent 100%)',
          filter: 'drop-shadow(0 0 8px rgba(124, 58, 237, 0.2))'
        }}
      ></motion.div>
      
      {/* Secondary sharper grid for definition */}
      <motion.div 
        animate={{ x: mousePos.x * 0.35, y: mousePos.y * 0.35 }}
        transition={{ type: 'spring', stiffness: 80, damping: 25 }}
        className="absolute inset-[-150px] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40"
      ></motion.div>
      
      {/* Noise Texture for that premium grainy look */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E')] pointer-events-none"></div>

      {/* Frame Corners */}
      <div className="absolute inset-8 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/5 opacity-40"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/5 opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/5 opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-white/5 opacity-40"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto px-6 text-center w-full">
        
        {/* Floating Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-xl shadow-2xl">
            <span className="font-body font-medium text-[10px] text-accent-gold-light tracking-[0.4em] uppercase">✦ Premium Branding Mastery</span>
          </div>
        </motion.div>

        {/* Headline with Split Animation */}
        <motion.h1 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-[85px] xl:text-[95px] font-display font-bold leading-[0.9] tracking-tighter mb-8 perspective-[2000px] w-full"
        >
          <div className="flex flex-wrap justify-center gap-x-[0.15em]">
            {words.map((word, i) => (
              <div key={i} className="overflow-hidden py-2">
                <motion.span 
                  variants={wordVars}
                  className={`inline-block ${i >= 3 ? 'gradient-text italic opacity-90' : 'text-white'}`}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="text-base md:text-[18px] lg:text-[20px] text-text-secondary font-body font-light tracking-wide max-w-2xl mb-12 leading-relaxed"
        >
          Crafting cinematic advertising and digital growth blueprints for the world's most ambitious visionary brands.
        </motion.p>

        {/* CTAs with Magnetic Feedback */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
        >
          <MagneticButton>
            <Link 
              to="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-void border border-white/20 text-text-white font-body font-bold text-[14px] tracking-[0.05em] shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:shadow-[0_0_60px_rgba(124,58,237,0.5)] hover:border-white/40 transition-all overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-3">
                Book Free Call 
                <ArrowDown size={17} className="-rotate-90 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-accent-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link 
              to="/services"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-void border border-white/10 hover:border-white/30 text-text-white font-body font-bold text-[14px] tracking-[0.05em] backdrop-blur-md transition-all hover:bg-white/[0.05]"
            >
              Explore Services
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white/40 group-hover:w-1/2 transition-all duration-500"></div>
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
        className="relative z-10 flex flex-col items-center gap-4 text-text-muted cursor-pointer hover:text-text-primary transition-all group pb-4"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          });
        }}
      >
        <span className="font-body text-[10px] tracking-[0.4em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">Scroll</span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="p-3 rounded-full border border-white/5 bg-white/[0.02]"
        >
          <ArrowDown size={20} strokeWidth={1.2} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

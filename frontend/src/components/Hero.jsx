import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
    hidden: { opacity: 0, y: 100, rotateX: 45 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-between pt-32 pb-10 overflow-hidden bg-void">
      {/* Background Animated Orbs with Parallax */}
      <motion.div 
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-violet rounded-full blur-[140px] opacity-20 animate-orb-flow pointer-events-none"
      ></motion.div>
      <motion.div 
        animate={{ x: -mousePos.x, y: -mousePos.y }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-ice rounded-full blur-[140px] opacity-15 animate-orb-flow pointer-events-none" 
        style={{ animationDelay: '2s' }}
      ></motion.div>

      {/* Grid Overlay with Parallax */}
      <motion.div 
        animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        className="absolute inset-[-100px] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
      ></motion.div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E')] pointer-events-none"></div>

      {/* Frame Corners */}
      <div className="absolute inset-6 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-border-strong opacity-40"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-border-strong opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-border-strong opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-border-strong opacity-40"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto px-6 text-center w-full">
        
        {/* Floating Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[rgba(255,255,255,0.03)] border border-white/5 backdrop-blur-xl shadow-2xl">
            <span className="font-body font-medium text-[11px] text-text-primary tracking-[0.3em] uppercase">✦ Premium Branding Mastery</span>
          </div>
        </motion.div>

        {/* Headline with Split Animation */}
        <motion.h1 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl lg:text-[110px] xl:text-[120px] font-display font-bold leading-[0.85] tracking-tight mb-8 perspective-[1000px] w-full"
        >
          <div className="flex flex-wrap justify-center gap-x-[0.2em]">
            {words.map((word, i) => (
              <div key={i} className="overflow-hidden py-2">
                <motion.span 
                  variants={wordVars}
                  className={`inline-block ${i >= 3 ? 'gradient-text italic' : ''}`}
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
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="text-lg md:text-[20px] lg:text-[22px] text-text-secondary font-body font-light tracking-wide max-w-2xl mb-12"
        >
          Crafting cinematic advertising and digital growth blueprints for the world's most ambitious visionary brands.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
        >
          <Link 
            to="/contact"
            className="group relative w-full sm:w-auto px-10 py-4 rounded-full bg-[var(--gradient-brand)] text-text-white font-body font-bold text-[15px] tracking-[0.05em] shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all overflow-hidden"
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              Book Free Call 
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
            </div>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </Link>
          <Link 
            to="/services"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-white/10 hover:border-white/30 text-text-white font-body font-bold text-[15px] tracking-[0.05em] backdrop-blur-md transition-all hover:bg-white/[0.03]"
          >
            Our Work
          </Link>
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

import { motion } from 'framer-motion';
import { ArrowDown, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center pt-24 overflow-hidden bg-void">
      {/* Background Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent-violet rounded-full blur-[120px] opacity-20 animate-orb-flow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-ice rounded-full blur-[120px] opacity-15 animate-orb-flow" style={{ animationDelay: '2s' }}></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E')] pointer-events-none"></div>

      {/* Frame Corners */}
      <div className="absolute inset-6 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-border-strong"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-border-strong"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-border-strong"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-border-strong"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Floating Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[rgba(255,255,255,0.03)] border border-border-subtle backdrop-blur-md">
            <span className="font-body font-medium text-[12px] text-text-primary tracking-widest uppercase">✦ Leading Video & Branding Agency</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-[110px] font-display font-bold leading-[0.9] tracking-tight mb-8"
        >
          We Build Brands<br />
          <span className="gradient-text inline-block">That Dominate</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-[20px] text-text-secondary font-body font-light tracking-wide max-w-2xl mb-12"
        >
          Premium video production, cinematic advertising, and digital growth for visionary brands.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
        >
          <Link 
            to="/work"
            className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[var(--gradient-brand)] text-text-white font-body font-semibold text-[15px] tracking-[0.03em] shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] transform hover:-translate-y-1 transition-all"
          >
            <Play size={18} fill="currentColor" strokeWidth={0} />
            View Our Showreel
          </Link>
          <Link 
            to="/services"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-card border border-border-medium hover:border-border-strong text-text-white font-body font-semibold text-[15px] tracking-[0.03em] backdrop-blur-md transform hover:-translate-y-1 transition-all hover:bg-card-hover"
          >
            Services
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-text-muted cursor-pointer hover:text-text-primary transition-colors"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          });
        }}
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

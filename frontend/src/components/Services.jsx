import { useRef, useState } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Video, Film, Share2, ArrowRight, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Film size={32} className="text-accent-gold" />,
    title: 'Brand Films & Commercials',
    desc: 'Cinema-grade shoots, compelling storytelling, and high-end post-production that elevates your brand.',
    border: 'group-hover:border-accent-gold/40',
    shadow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    price: '₹3,999'
  },
  {
    icon: <Video size={32} className="text-accent-violet" />,
    title: 'Short-Form Video',
    desc: 'Viral-ready Reels and TikToks crafted for massive engagement, optimized for modern algorithms.',
    border: 'group-hover:border-accent-violet/40',
    shadow: 'group-hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]',
    price: '₹1,499'
  },
  {
    icon: <Monitor size={32} className="text-accent-ice" />,
    title: 'Web & App Engineering',
    desc: 'High-performance websites, SaaS platforms, and mobile apps built with cutting-edge tech.',
    border: 'group-hover:border-accent-ice/40',
    shadow: 'group-hover:shadow-[0_0_30px_rgba(103,232,249,0.15)]',
    price: '₹8,999'
  },
  {
    icon: <Share2 size={32} className="text-accent-rose" />,
    title: 'Digital Marketing & Growth',
    desc: 'Data-driven paid ad campaigns, SEO, and social media management to scale your business.',
    border: 'group-hover:border-accent-rose/40',
    shadow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]',
    price: '₹10,999/mo'
  }
];

const ServiceCard = ({ srv, idx }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    x.set((mouseXPos / width) - 0.5);
    y.set((mouseYPos / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Magnetic effect for icon
  const iconX = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const iconY = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`group relative flex flex-col bg-card border border-border-subtle p-6 rounded-2xl transition-all duration-300 hover:border-white/20 backdrop-blur-sm shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-none-interactive`}
    >
      {/* Shine/Glare Effect */}
      <motion.div 
        style={{ 
          background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          opacity: useTransform(mouseX, [-0.5, 0.5, 1], [0, 1, 0])
        }}
        className="absolute inset-0 pointer-events-none rounded-2xl z-0"
      />

      <div className="relative z-10 flex justify-between items-start mb-6 gap-3" style={{ transform: 'translateZ(40px)' }}>
        <motion.div 
          style={{ x: iconX, y: iconY }}
          className="p-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-border-subtle inline-flex items-center justify-center shrink-0 group-hover:bg-[rgba(255,255,255,0.06)] transition-colors"
        >
          {srv.icon && <srv.icon.type {...srv.icon.props} size={28} />}
        </motion.div>
        <div className="flex flex-col items-end gap-1 shrink-0 mt-1">
          <span className="text-[9px] text-text-secondary uppercase tracking-widest font-medium mr-1">Starting at</span>
          <span className="font-body font-semibold text-text-white text-[13px] bg-[rgba(255,255,255,0.05)] px-3 py-1 rounded-full border border-border-medium whitespace-nowrap">{srv.price}</span>
        </div>
      </div>

      <h3 className="relative z-10 text-xl font-display font-bold text-text-white mb-3" style={{ transform: 'translateZ(30px)' }}>{srv.title}</h3>
      <p className="relative z-10 font-body text-[14px] text-text-secondary leading-relaxed mb-6 flex-1" style={{ transform: 'translateZ(20px)' }}>
        {srv.desc}
      </p>
    </motion.div>
  );
};

const ServicesTeaser = () => {
  const title = "Premium capability. Proven results.";
  const words = title.split(" ");

  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 relative z-10 perspective-[1500px]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <span className="font-body font-medium text-[12px] text-accent-violet-light tracking-widest uppercase mb-4 block">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-white leading-tight">
            <div className="flex flex-wrap gap-x-[0.2em]">
              {words.map((word, i) => (
                <div key={i} className="overflow-hidden py-1">
                  <motion.span
                    initial={{ y: "100%", filter: "blur(8px)" }}
                    whileInView={{ y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`inline-block ${i >= 2 ? 'text-text-secondary' : ''}`}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>
          </h2>
        </div>
        <Link 
          to="/services" 
          className="group flex items-center gap-2 font-body font-medium text-[14px] text-text-white hover:text-accent-violet-light transition-colors"
        >
          View All Services 
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((srv, idx) => (
          <ServiceCard key={idx} srv={srv} idx={idx} />
        ))}
      </div>
    </section>
  );
};

export default ServicesTeaser;

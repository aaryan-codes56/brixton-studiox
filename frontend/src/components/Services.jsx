import { motion } from 'framer-motion';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { 
      duration: 1, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

const ServicesTeaser = () => {
  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <span className="font-body font-medium text-[12px] text-accent-violet-light tracking-widest uppercase mb-4 block">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-white leading-tight">
            Premium capability.<br/>
            <span className="text-text-secondary">Proven results.</span>
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

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {services.map((srv, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            className={`group flex flex-col bg-card border border-border-subtle p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm ${srv.border} ${srv.shadow}`}
          >
            <div className="flex justify-between items-start mb-8 gap-3">
              <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-border-subtle inline-flex items-center justify-center shrink-0 group-hover:bg-[rgba(255,255,255,0.06)] transition-colors">
                {srv.icon}
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0 mt-1">
                <span className="text-[10px] text-text-secondary uppercase tracking-widest font-medium mr-1">Starting at</span>
                <span className="font-body font-semibold text-text-white text-[14px] bg-[rgba(255,255,255,0.05)] px-3 py-1 rounded-full border border-border-medium whitespace-nowrap">{srv.price}</span>
              </div>
            </div>
            <h3 className="text-2xl font-display font-bold text-text-white mb-4">{srv.title}</h3>
            <p className="font-body text-[15px] text-text-secondary leading-relaxed mb-8 flex-1">
              {srv.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ServicesTeaser;

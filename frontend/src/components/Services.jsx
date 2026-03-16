import { motion } from 'framer-motion';
import { Video, Film, Share2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Film size={32} className="text-accent-gold" />,
    title: 'Brand Films & Commercials',
    desc: 'Cinema-grade shoots, compelling storytelling, and high-end post-production that elevates your brand.',
    border: 'group-hover:border-accent-gold/40',
    shadow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    price: 'Starting at ₹3,999'
  },
  {
    icon: <Video size={32} className="text-accent-violet" />,
    title: 'Short-Form Video',
    desc: 'Viral-ready Reels and TikToks crafted for massive engagement, optimized for modern algorithms.',
    border: 'group-hover:border-accent-violet/40',
    shadow: 'group-hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]',
    price: 'Starting at ₹1,499'
  },
  {
    icon: <Share2 size={32} className="text-accent-ice" />,
    title: 'Digital Marketing & Growth',
    desc: 'Data-driven paid ad campaigns, SEO, and social media management to scale your business.',
    border: 'group-hover:border-accent-ice/40',
    shadow: 'group-hover:shadow-[0_0_30px_rgba(103,232,249,0.15)]',
    price: 'Starting at ₹10,999/mo'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
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
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {services.map((srv, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            className={`group flex flex-col bg-card border border-border-subtle p-10 rounded-2xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm ${srv.border} ${srv.shadow}`}
          >
            <div className="flex justify-between items-start mb-8">
              <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-border-subtle inline-table w-max group-hover:bg-[rgba(255,255,255,0.06)] transition-colors">
                {srv.icon}
              </div>
              <div className="text-right">
                <span className="font-body font-semibold text-text-white text-[14px] bg-[rgba(255,255,255,0.05)] px-3 py-1 rounded-full border border-border-medium">{srv.price}</span>
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

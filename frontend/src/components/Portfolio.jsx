import { motion } from 'framer-motion';
import { Play, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const portfolioItems = [
  { id: 1, category: 'Brand Films', client: 'Luxe Athletics', color: 'text-accent-violet-light', type: 'video' },
  { id: 2, category: 'Websites', client: 'Nexus SaaS', color: 'text-accent-ice', type: 'web' },
  { id: 3, category: 'Commercials', client: 'TechNova', color: 'text-accent-gold-light', type: 'video' },
  { id: 4, category: 'Apps', client: 'Volt Fitness', color: 'text-accent-rose', type: 'web' }
];

const PortfolioTeaser = () => {
  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 relative z-10 border-t border-border-subtle">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <span className="font-body font-medium text-[12px] text-accent-ice tracking-widest uppercase mb-4 block">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-white leading-tight">
            Crafting visual<br/>
            <span className="text-text-secondary">masterpieces.</span>
          </h2>
        </div>
        <Link 
          to="/work" 
          className="group flex items-center gap-2 font-body font-medium text-[14px] text-text-white hover:text-accent-ice transition-colors"
        >
          Explore Portfolio
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {portfolioItems.map((item, idx) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 20 },
              visible: { 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-secondary border border-border-medium cursor-pointer"
          >
            {/* Dark placeholder */}
            <div className="absolute inset-0 bg-primary flex items-center justify-center opacity-60 group-hover:scale-105 transition-transform duration-700">
              <span className={`font-display font-bold text-4xl transform -rotate-45 opacity-20 ${item.color}`}>{item.category}</span>
            </div>
            
            {/* Action Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[rgba(0,0,0,0.4)] backdrop-blur-md flex items-center justify-center border border-border-strong text-text-white transform group-hover:scale-110 group-hover:bg-[rgba(124,58,237,0.4)] group-hover:border-accent-violet-light transition-all duration-300">
                {item.type === 'web' ? (
                  <ExternalLink className="w-6 h-6" />
                ) : (
                  <Play className="ml-1 w-6 h-6" fill="currentColor" strokeWidth={0} />
                )}
              </div>
            </div>

            {/* Hover Details */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,2,10,0.9)] via-[rgba(2,2,10,0.4)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 border-inset border-2 border-transparent group-hover:border-border-strong rounded-xl box-border">
              <span className={`${item.color} font-body text-[11px] font-semibold tracking-widest uppercase mb-2`}>{item.category}</span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-text-white">{item.client}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PortfolioTeaser;

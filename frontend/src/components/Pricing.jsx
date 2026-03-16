import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const teaserPlans = [
  {
    name: 'Short-Form Video',
    role: 'Essential',
    price: '1,499',
    unit: 'starting/reel',
    features: ['iPhone 4K / Pro Camera', 'Trending Audio & Cuts', 'Basic Text Animation', 'Color Correction'],
    highlight: false,
    color: 'text-accent-violet-light',
    border: 'group-hover:border-accent-violet-light/50'
  },
  {
    name: 'Brand Commercial',
    role: 'Premium',
    price: '3,999',
    unit: 'starting/video',
    features: ['Cinema-grade Equipment', 'Storyboarding & Direction', 'Advanced Sound Design', 'Full Color Grading'],
    highlight: true,
    color: 'text-accent-gold-light',
    border: 'border-accent-gold-light/30 group-hover:border-accent-gold-light/60'
  },
  {
    name: 'Social Growth',
    role: 'Monthly Retainer',
    price: '10,999',
    unit: 'starting/mo',
    features: ['Content Strategy', '12+ Posts/Reels', 'Caption & Hashtags', 'Algorithm Optimization'],
    highlight: false,
    color: 'text-accent-ice',
    border: 'group-hover:border-accent-ice/50'
  }
];

const PricingTeaser = () => {
  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 relative z-10 border-t border-border-subtle">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <span className="font-body font-medium text-[12px] text-accent-gold-light tracking-widest uppercase mb-4 block">
            Investment
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-white leading-tight">
            Transparent pricing.<br/>
            <span className="text-text-secondary">Exceptional value.</span>
          </h2>
        </div>
        <Link 
          to="/pricing" 
          className="group flex items-center gap-2 font-body font-medium text-[14px] text-text-white hover:text-accent-gold-light transition-colors"
        >
          View Detailed Pricing 
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teaserPlans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className={`group relative flex flex-col bg-card border ${plan.highlight ? 'border-accent-gold-light/30 shadow-[0_0_40px_rgba(245,158,11,0.1)]' : 'border-border-subtle'} p-10 rounded-2xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-md ${plan.border}`}
          >
            {plan.highlight && (
               <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--gradient-brand)] text-text-white font-body font-bold text-[10px] tracking-widest uppercase shadow-lg">
                 Most Popular
               </div>
            )}
            
            <div className="mb-2">
              <span className={`${plan.color} font-body text-[11px] font-semibold tracking-widest uppercase`}>{plan.role}</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-text-white mb-6">{plan.name}</h3>
            
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl lg:text-5xl font-display font-bold text-text-white">₹{plan.price}</span>
              <span className="text-text-muted font-body text-[13px]">{plan.unit}</span>
            </div>
            
            <div className="h-[1px] w-full bg-border-subtle mb-8"></div>
            
            <ul className="flex-1 space-y-4 mb-8">
              {plan.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={16} className={`${plan.color} mt-0.5 shrink-0`} />
                  <span className="font-body text-[14px] text-text-secondary leading-tight">{feat}</span>
                </li>
              ))}
            </ul>
            
            <Link 
              to="/pricing"
              className={`w-full py-4 rounded-full font-body font-semibold text-[14px] flex items-center justify-center transition-all duration-300 ${
                plan.highlight 
                  ? 'bg-text-white text-void hover:bg-gray-200' 
                  : 'bg-[rgba(255,255,255,0.05)] text-text-white hover:bg-[rgba(255,255,255,0.1)] border border-border-medium'
              }`}
            >
              See All Features
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PricingTeaser;

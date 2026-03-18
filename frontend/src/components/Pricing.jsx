import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

const teaserPlans = [
  {
    name: 'Short-Form Video',
    role: 'Essential',
    price: '1,499',
    unit: 'starting/reel',
    features: ['iPhone 4K / Pro Camera', 'Trending Audio & Cuts', 'Alex Hormozi Style', 'Color Correction'],
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
    highlight: false,
    color: 'text-accent-rose',
    border: 'group-hover:border-accent-rose/50'
  },
  {
    name: 'Social Growth',
    role: 'Retainer',
    price: '10,999',
    unit: 'starting/mo',
    features: ['Full Content Strategy', '12+ Posts/Reels', 'Caption & Hashtags', 'Account Management'],
    highlight: true,
    color: 'text-accent-gold-light',
    border: 'border-accent-gold-light/30 group-hover:border-accent-gold-light/60'
  },
  {
    name: 'Web Design & Dev',
    role: 'High Performance',
    price: '8,999',
    unit: 'starting',
    features: ['Custom UI/UX Design', 'Ultra-fast Performance', 'SEO-Ready Structure', 'Contact Integration'],
    highlight: false,
    color: 'text-accent-ice',
    border: 'group-hover:border-accent-ice/50'
  },
  {
    name: 'App Development',
    role: 'Scalable MVP',
    price: '40,000',
    unit: 'starting',
    features: ['iOS & Android Solutions', 'Scalable Backend App', 'Core Feature Focused', 'Store Deployment'],
    highlight: false,
    color: 'text-accent-violet-light',
    border: 'group-hover:border-accent-violet-light/50'
  }
];

const PricingCard = ({ plan, idx }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion Values for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 150, damping: 20 });

  // Shine glare effect
  const shineX = useSpring(useTransform(x, [-100, 100], [0, 100]), { stiffness: 150, damping: 20 });
  const shineY = useSpring(useTransform(y, [-100, 100], [0, 100]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate position relative to center (-100 to 100)
    const xPct = ((mouseX / width) - 0.5) * 200;
    const yPct = ((mouseY / height) - 0.5) * 200;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: idx * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className={`group relative flex flex-col bg-card border ${plan.highlight ? 'border-accent-gold-light/30 shadow-[0_0_40px_rgba(245,158,11,0.15)]' : 'border-border-subtle'} p-6 rounded-2xl transition-all duration-500 backdrop-blur-md ${plan.border} w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] min-w-[280px] max-w-[400px] cursor-none-interactive`}
    >
      {/* Dynamic Shine Glare */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: useTransform(
            [shineX, shineY],
            ([sx, sy]) => `radial-gradient(600px circle at ${sx}% ${sy}%, rgba(255,255,255,0.08), transparent 40%)`
          )
        }}
      />

      {plan.highlight && (
         <motion.div 
           animate={{ y: [0, -5, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[var(--gradient-brand)] border border-white/20 text-text-white font-body font-bold text-[9px] tracking-widest uppercase shadow-[0_4px_20px_rgba(124,58,237,0.3)] z-20 whitespace-nowrap"
         >
           Most Popular
         </motion.div>
      )}
      
      <div className="mb-1.5" style={{ transform: 'translateZ(20px)' }}>
        <span className={`${plan.color} font-body text-[9px] font-semibold tracking-widest uppercase`}>{plan.role}</span>
      </div>
      <h3 className="text-lg font-display font-bold text-text-white mb-4 leading-tight" style={{ transform: 'translateZ(30px)' }}>
        {plan.name}
      </h3>
      
      <div className="flex items-baseline gap-1 mb-4" style={{ transform: 'translateZ(40px)' }}>
        <span className="text-2xl lg:text-3xl font-display font-bold text-text-white tracking-tight">₹{plan.price}</span>
        <span className="text-text-muted font-body text-[11px]">{plan.unit}</span>
      </div>
      
      <div className="h-[1px] w-full bg-border-subtle mb-5" style={{ transform: 'translateZ(10px)' }}></div>
      
      <ul className="flex-1 space-y-2.5 mb-6" style={{ transform: 'translateZ(25px)' }}>
        {plan.features.map((feat, i) => (
          <li key={i} className="flex items-start gap-2 group/item">
            <motion.div
              style={{
                x: useSpring(useTransform(x, [-100, 100], [-3, 3]), { stiffness: 200, damping: 10 }),
                y: useSpring(useTransform(y, [-100, 100], [-3, 3]), { stiffness: 200, damping: 10 })
              }}
            >
              <Check size={12} className={`${plan.color} mt-0.5 shrink-0`} strokeWidth={3} />
            </motion.div>
            <span className="font-body text-[12px] text-text-secondary leading-tight">{feat}</span>
          </li>
        ))}
      </ul>
      
      <div style={{ transform: 'translateZ(35px)' }}>
        <Link 
          to="/pricing"
          className={`w-full py-3 rounded-xl font-body font-semibold text-[12px] flex items-center justify-center transition-all duration-300 ${
            plan.highlight 
              ? 'bg-text-white text-void shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:bg-gray-100' 
              : 'bg-[rgba(255,255,255,0.03)] text-text-white hover:bg-[rgba(255,255,255,0.08)] border border-border-medium'
          }`}
        >
          See All Features
        </Link>
      </div>
    </motion.div>
  );
};

const PricingTeaser = () => {
  const words = ["Transparent", "pricing.", "Exceptional", "value."];

  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 relative z-10 border-t border-border-subtle overflow-visible">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <span className="font-body font-medium text-[12px] text-accent-gold-light tracking-widest uppercase mb-4 block">
            Investment
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
                    className={`inline-block ${i >= 2 ? 'text-text-secondary' : 'text-white'}`}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>
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

      <div className="flex flex-wrap justify-center gap-6">
        {teaserPlans.map((plan, idx) => (
          <PricingCard key={idx} plan={plan} idx={idx} />
        ))}
      </div>
    </section>
  );
};

export default PricingTeaser;

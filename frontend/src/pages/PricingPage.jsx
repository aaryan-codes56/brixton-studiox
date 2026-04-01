import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsappBtn from '../components/WhatsappBtn';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import AnimatedHeading from '../components/AnimatedHeading';
import SEO from '../components/SEO';

// Maps pricing tab names to contact form service values
const tabToService = {
  'Short-Form (Reels)': 'Reels',
  'Brand Films': 'Long Form',
  'Social Media': 'Social Media',
  'Web Dev': 'Web/App',
  'App Dev': 'Web/App',
};

const tabs = ['Short-Form (Reels)', 'Brand Films', 'Social Media', 'Web Dev', 'App Dev'];

const plans = {
  'Short-Form (Reels)': [
    {
      name: 'Basic Reel',
      price: '1,499',
      unit: '/reel',
      features: ['Shoot (iPhone 4K / Pro Setup)', 'Basic cuts & trimming', 'Simple transitions', 'Trending Background Music', 'Basic text titles', '1080p / 4K export'],
      express: '₹1,699',
      popular: false,
      color: 'text-accent-violet-light'
    },
    {
      name: 'Premium Reel',
      price: '2,099',
      unit: '/reel',
      features: ['Shoot (iPhone 4K / Pro Setup)', 'Professional cuts & masking', 'Smooth creative transitions', 'Beat sync editing', 'Advanced text animation / Alex Hormozi style', 'Color correction & Sound FX', 'Subtitles included', 'Up to 3 free revisions', '1080p / 4K export'],
      express: '₹2,599',
      popular: true,
      color: 'text-accent-gold-light'
    }
  ],
  'Brand Films': [
    {
      name: 'Basic Package (5-10 min)',
      price: '3,999',
      unit: '/video',
      features: ['Cinema camera shoot', 'Mic setup included', 'Clean editing', 'Background music', 'Basic color correction', '1080p / 4K export'],
      popular: false,
      color: 'text-accent-violet-light'
    },
    {
      name: 'Standard Package (12-15 min)',
      price: '5,999',
      unit: '/video',
      features: ['Everything in Basic', 'B-roll integration', 'Advanced editing', 'Color grading', 'Sound design', 'Up to 3 free revisions', '1080p / 4K export'],
      popular: true,
      color: 'text-accent-gold-light'
    }
  ],
  'Social Media': [
    {
      name: 'Starter',
      price: '10,999',
      unit: '/month',
      features: ['6 Posts + 6 Reels', 'Caption writing', 'Basic hashtag research', 'Monthly reporting'],
      popular: false,
      color: 'text-accent-violet-light'
    },
    {
      name: 'Growth',
      price: '16,999',
      unit: '/month',
      features: ['8 Posts + 10 Reels', 'Caption writing', 'Hashtag strategy', '2 ad campaigns'],
      popular: true,
      color: 'text-accent-gold-light'
    },
    {
      name: 'Premium',
      price: '26,999',
      unit: '/month',
      features: ['10 Posts + 15 Reels', 'Full content strategy', '4 ad campaigns', 'Monthly performance report'],
      popular: false,
      color: 'text-accent-ice'
    }
  ],
  'Web Dev': [
    {
      name: 'Landing Page',
      price: '8,999',
      unit: ' starting',
      features: ['Product launches', '5–7 days timeline', 'Custom UI/UX design', 'Contact forms', 'Performance optimization', 'SEO-ready structure'],
      popular: false,
      color: 'text-accent-violet-light'
    },
    {
      name: 'Business Website',
      price: '18,999',
      unit: ' starting',
      features: ['Small businesses', '10–15 days timeline', 'Fully responsive layout', 'Analytics integration', 'Custom UI/UX design', '1 month free support'],
      popular: true,
      color: 'text-accent-gold-light'
    },
    {
      name: 'E-Commerce Store',
      price: '35,000',
      unit: ' starting',
      features: ['Online stores', '20–30 days timeline', 'Payment gateway integration', 'Product management', 'SEO-ready structure', '1 month free support'],
      popular: false,
      color: 'text-accent-ice'
    }
  ],
  'App Dev': [
    {
      name: 'Basic App (MVP)',
      price: '40,000',
      unit: ' starting',
      features: ['30–45 days timeline', 'UI/UX design', 'Backend development', 'Authentication', 'Store deployment assistance'],
      popular: false,
      color: 'text-accent-violet-light'
    },
    {
      name: 'Standard App',
      price: '90,000',
      unit: ' starting',
      features: ['45–75 days timeline', 'Advanced UI/UX mapping', 'Push notifications', 'Payment integration', 'Store deployment assistance'],
      popular: true,
      color: 'text-accent-gold-light'
    },
    {
      name: 'Advanced App',
      price: '2,00,000',
      unit: ' starting',
      features: ['75–120 days timeline', 'Complex architectures', 'Real-time features', 'Advanced analytics', 'Enterprise scalability'],
      popular: false,
      color: 'text-accent-ice'
    }
  ]
};

const addons = {
  'Short-Form (Reels)': [
    { name: 'Extra Revision', price: '₹499/ea' },
    { name: 'Custom Thumbnail', price: '₹299' },
    { name: 'Rush Delivery (24hr)', price: '+30%' }
  ],
  'Brand Films': [
    { name: 'Drone Capabilities (4K)', price: '₹4,999/shoot' },
    { name: 'Extra Revision', price: '₹999/ea' },
    { name: 'Raw Footage Delivery', price: '₹2,499' }
  ],
  'Social Media': [
    { name: 'Single Post Design', price: '₹549' },
    { name: 'Carousel (3-5 slides)', price: '₹849 - ₹1,049' },
    { name: 'Extra Reel Edit', price: '₹1,499' }
  ],
  'Web Dev': [
    { name: 'Additional Page', price: '₹2,499' },
    { name: 'Blog Setup', price: '₹4,999' },
    { name: 'Priority Support (1 mo)', price: '₹2,999' }
  ],
  'App Dev': [
    { name: 'Tablet Optimization', price: '₹15,000' },
    { name: 'Admin Dashboard', price: 'Starting ₹20,000' },
    { name: 'Priority Support (1 mo)', price: '₹9,999' }
  ]
};

const SectionWrapper = ({ children, className = "" }) => (
  <motion.section
    initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.section>
);

const PricingPageHero = () => (
  <section className="relative pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/5">
    <div className="relative z-10 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-accent-gold-light font-body text-[10px] tracking-widest uppercase mb-6">
          Investment Plans
        </span>
        <AnimatedHeading 
          text="Clear value. No surprises." 
          className="text-5xl md:text-7xl font-display font-bold text-text-white mb-6 leading-tight justify-center"
        />
        <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto leading-relaxed mb-10">
          Whether you need a single viral Reel or a dedicated growth partner, we have scalable options tailored to your ambition.
        </p>
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.1)] rounded-full text-accent-gold-light font-body text-sm font-bold tracking-wide uppercase">
          <Info size={16} className="text-accent-gold-light" /> First shoot is always totally FREE.
        </div>
      </motion.div>
    </div>
  </section>
);

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('Short-Form (Reels)');

  return (
    <PageWrapper>
      <SEO
        title="Pricing & Packages"
        description="Transparent pricing for video production, social media management, web development, and app development. Starting from ₹1,499. First shoot is FREE."
        url="/pricing"
      />
      <Navbar />
      
      <main>
        <PricingPageHero />
        
        <SectionWrapper className="py-16 max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl overflow-x-auto max-w-full scrollbar-none" style={{WebkitOverflowScrolling: 'touch'}}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative shrink-0 whitespace-nowrap px-6 py-2.5 rounded-xl font-body font-bold text-[11px] tracking-widest uppercase transition-all duration-500 overflow-hidden ${
                    activeTab === tab ? 'text-void' : 'text-text-secondary hover:text-text-white'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="pricingTab"
                      className="absolute inset-0 bg-text-white z-0"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 ${plans[activeTab].length === 2 ? 'lg:grid-cols-2 max-w-5xl mx-auto' : 'lg:grid-cols-3'} gap-8`}
              >
                {plans[activeTab].map((plan, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative flex flex-col bg-[#0d0d0d]/40 border p-8 md:p-10 rounded-[2rem] transition-all duration-700 hover:-translate-y-2 backdrop-blur-md group ${
                      plan.popular 
                        ? 'border-accent-gold-light/30 shadow-[0_30px_60px_-15px_rgba(245,158,11,0.15)]' 
                        : 'border-white/5 hover:border-white/10'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-accent-gold-light border border-white/20 text-void font-body font-black text-[9px] tracking-[0.2em] uppercase shadow-2xl z-10 whitespace-nowrap">
                        Most Popular
                      </div>
                    )}
                    
                    <h3 className="text-xl font-display font-bold text-text-white mb-2 tracking-tight">{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-8">
                      <span className="text-4xl font-display font-bold text-text-white tracking-tighter">₹{plan.price}</span>
                      <span className="text-text-secondary font-body font-bold text-[10px] uppercase tracking-widest">{plan.unit}</span>
                    </div>
                    
                    <div className="h-[2px] w-10 bg-white/5 mb-8 group-hover:w-20 transition-all duration-700"></div>
                    
                    <ul className="flex-1 space-y-4 mb-10">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3.5">
                          <Check size={16} className={`${plan.color} mt-0.5 shrink-0 group-hover:scale-125 transition-transform`} />
                          <span className="text-[13px] font-body text-text-secondary leading-tight group-hover:text-text-white transition-colors">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.express && (
                      <div className="mb-8 py-3.5 px-4 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between items-center text-[11px] font-body">
                        <span className="text-text-secondary font-bold tracking-widest uppercase">⚡ Express 48h</span>
                        <span className="text-text-white font-black">{plan.express}</span>
                      </div>
                    )}
                    
                    <Link 
                      to="/contact"
                      state={{ service: tabToService[activeTab], planName: plan.name, tab: activeTab }}
                      className={`w-full py-4 rounded-xl font-body font-black text-[12px] tracking-[0.2em] uppercase flex items-center justify-center transition-all ${
                        plan.popular 
                          ? 'bg-accent-gold-light text-void shadow-2xl hover:scale-[1.02]' 
                          : 'bg-white/5 border border-white/10 text-text-white hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      Choose Plan
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Add-ons Section */}
          <SectionWrapper className="max-w-4xl mx-auto bg-void border border-white/5 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 blur-[100px] pointer-events-none"></div>
             <h3 className="text-3xl md:text-4xl font-display font-bold text-text-white mb-12 text-center">Add-ons & <span className="gradient-text italic opacity-90">Extras</span></h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                {addons[activeTab]?.map((addon, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex justify-between items-center border-b border-white/5 pb-5 group hover:border-white/10 transition-colors"
                  >
                    <span className="font-body text-text-secondary text-[15px] group-hover:text-text-white transition-colors">{addon.name}</span>
                    <span className="font-body font-black text-text-white tracking-tight">{addon.price}</span>
                  </motion.div>
                ))}
             </div>
             <p className="text-center text-text-muted font-body text-[11px] font-bold tracking-widest uppercase mt-12 opacity-50">
               * Custom rates available for bulk orders. Contact us directly.
             </p>
          </SectionWrapper>
        </SectionWrapper>
      </main>

      <Footer />
      <WhatsappBtn />
    </PageWrapper>
  );
}

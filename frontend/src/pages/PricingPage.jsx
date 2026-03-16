import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsappBtn from '../components/WhatsappBtn';
import { Link } from 'react-router-dom';

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
      express: '₹2,599', // Kept 2599 as higher priority logic, doc said 2099 which is same as base price, likely a typo in doc.
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

const PricingPageHero = () => (
  <section className="relative pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden border-b border-border-subtle bg-base">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] w-[600px] h-[600px] bg-accent-gold/5 rounded-full blur-[150px] pointer-events-none"></div>
    <div className="relative z-10 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-border-subtle text-accent-gold-light font-body text-xs tracking-widest uppercase mb-6">
          Investment Plans
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-text-white mb-6 leading-tight">
          Clear value. <span className="gradient-text italic opacity-90">No surprises.</span>
        </h1>
        <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto leading-relaxed mb-6">
          Whether you need a single viral Reel or a dedicated growth partner, we have scalable options tailored to your ambition.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-amber/10 border border-accent-amber/20 rounded-full text-accent-amber font-body text-sm">
          <Info size={16} /> First shoot is always totally FREE.
        </div>
      </motion.div>
    </div>
  </section>
);

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('Short-Form (Reels)');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen bg-void relative selection:bg-accent-gold/30"
    >
      <Navbar />
      
      <main>
        <PricingPageHero />
        
        <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-center mb-16">
            <div className="flex p-1 bg-[rgba(255,255,255,0.03)] rounded-full border border-border-subtle backdrop-blur-sm relative overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 sm:px-10 py-3 rounded-full font-body font-medium text-sm transition-colors duration-300 whitespace-nowrap ${
                    activeTab === tab ? 'text-text-white' : 'text-text-secondary hover:text-text-white'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="pricingTab"
                      className="absolute inset-0 bg-border-medium rounded-full"
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className={`grid grid-cols-1 ${plans[activeTab].length === 2 ? 'lg:grid-cols-2 max-w-4xl mx-auto' : 'lg:grid-cols-3'} gap-8`}
              >
                {plans[activeTab].map((plan, idx) => (
                  <div 
                    key={idx} 
                    className={`relative flex flex-col bg-card border p-8 md:p-10 rounded-3xl transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm ${
                      plan.popular 
                        ? 'border-accent-gold-light/40 shadow-[0_0_40px_rgba(245,158,11,0.1)]' 
                        : 'border-border-subtle hover:border-border-medium'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[var(--gradient-brand)] border border-white/20 text-text-white font-body font-bold text-[10px] tracking-widest uppercase shadow-[0_4px_20px_rgba(124,58,237,0.3)] z-10 whitespace-nowrap">
                        Most Popular
                      </div>
                    )}
                    
                    <h3 className="text-2xl font-display font-bold text-text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-5xl font-display font-bold text-text-white">₹{plan.price}</span>
                      <span className="text-text-secondary font-body font-medium text-sm">{plan.unit}</span>
                    </div>
                    
                    <div className="h-[1px] w-full bg-border-subtle mb-8"></div>
                    
                    <ul className="flex-1 space-y-4 mb-8">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check size={18} className={`${plan.color} mt-0.5 shrink-0`} />
                          <span className="text-[14px] font-body text-text-secondary leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.express && (
                      <div className="mb-8 py-3 px-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-border-subtle flex justify-between items-center text-[13px] font-body">
                        <span className="text-text-secondary">⚡ Express 48h Delivery</span>
                        <span className="text-text-white font-semibold">{plan.express}</span>
                      </div>
                    )}
                    
                    <Link 
                      to="/contact"
                      className={`w-full py-4 rounded-xl font-body font-semibold text-[15px] flex items-center justify-center transition-all ${
                        plan.popular 
                          ? 'bg-[var(--gradient-brand)] text-text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:opacity-90' 
                          : 'bg-[rgba(255,255,255,0.05)] border border-border-medium text-text-white hover:bg-[rgba(255,255,255,0.1)]'
                      }`}
                    >
                      Book this Package
                    </Link>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Add-ons Section */}
          <div className="max-w-4xl mx-auto bg-base border border-border-subtle rounded-3xl p-8 md:p-12">
             <h3 className="text-2xl md:text-3xl font-display font-bold text-text-white mb-8 text-center">Add-ons & Extras</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="flex justify-between items-center border-b border-border-subtle pb-4">
                  <span className="font-body text-text-secondary text-[15px]">Drone Capabilities (4K)</span>
                  <span className="font-body font-semibold text-text-white">₹4,999/shoot</span>
                </div>
                <div className="flex justify-between items-center border-b border-border-subtle pb-4">
                  <span className="font-body text-text-secondary text-[15px]">Extra Revision</span>
                  <span className="font-body font-semibold text-text-white">₹499/ea</span>
                </div>
                <div className="flex justify-between items-center border-b border-border-subtle pb-4">
                  <span className="font-body text-text-secondary text-[15px]">Single Post Design</span>
                  <span className="font-body font-semibold text-text-white">₹549</span>
                </div>
                <div className="flex justify-between items-center border-b border-border-subtle pb-4">
                  <span className="font-body text-text-secondary text-[15px]">Carousel (3-5 slides)</span>
                  <span className="font-body font-semibold text-text-white">₹849 - ₹1,049</span>
                </div>
             </div>
             <p className="text-center text-text-muted font-body text-sm mt-8">
               * Custom rates available for bulk orders. Contact us directly.
             </p>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsappBtn />
    </motion.div>
  );
}

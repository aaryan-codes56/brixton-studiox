import { motion } from 'framer-motion';
import { Video, Film, Share2, Search, Code, Smartphone, Check, ArrowRight, PlayCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsappBtn from '../components/WhatsappBtn';
import { Link } from 'react-router-dom';

const detailedServices = [
  {
    icon: <Film size={32} className="text-accent-gold-light" />,
    title: 'Brand Films & Commercials',
    desc: 'Cinematic storytelling designed to build trust and authority. We handle everything from creative conceptualization to the final color grade.',
    border: 'hover:border-accent-gold-light/40',
    shadow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    features: ['Canon/Sony Cinema Line', 'Professional Audio & Lighting', 'Creative Storyboarding', 'Full Color Grading', 'Drone Operations (Add-on)'],
    price: 'Starting at ₹3,999'
  },
  {
    icon: <Video size={32} className="text-accent-violet-light" />,
    title: 'Short-Form Video',
    desc: 'Attention-grabbing Reels and TikToks engineered for virality. We study algorithms to craft hooks that keep viewers watching.',
    border: 'hover:border-accent-violet-light/40',
    shadow: 'hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]',
    features: ['High-Retention Editing', 'Trending Audio Integration', 'Dynamic Subtitles', 'Motion Graphics', 'Optimized Export (4K/1080p)'],
    price: 'Starting at ₹1,499'
  },
  {
    icon: <Share2 size={32} className="text-accent-ice" />,
    title: 'Social Media Growth',
    desc: 'End-to-end management of your social presence. We build engaged communities and turn followers into paying customers.',
    border: 'hover:border-accent-ice/40',
    shadow: 'hover:shadow-[0_0_30px_rgba(103,232,249,0.15)]',
    features: ['Content Strategy', 'Daily/Weekly Posting', 'Community Management', 'Hashtag Optimization', 'Paid Ad Campaigns'],
    price: 'Starting at ₹10,999/mo'
  },
  {
    icon: <Search size={32} className="text-accent-rose" />,
    title: 'Search Engine Optimization',
    desc: 'Dominate Google search results. We optimize your digital presence so customers find you exactly when they need you.',
    border: 'hover:border-accent-rose/40',
    shadow: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]',
    features: ['Technical SEO Audits', 'Keyword Research', 'On-Page Optimization', 'Backlink Strategy', 'Local Business Ranking'],
    price: 'Custom Pricing'
  },
  {
    icon: <Code size={32} className="text-accent-gold-light" />,
    title: 'Web Design & Development',
    desc: 'High-performance websites that convert. We build beautiful, fast, and responsive digital homes for your brand.',
    border: 'hover:border-accent-gold-light/40',
    shadow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    features: ['Custom UI/UX Design', 'React / Next.js / Webflow', 'E-Commerce Integrations', 'Speed Optimization', 'Mobile-First Approach'],
    price: 'Starting at ₹8,999'
  },
  {
    icon: <Smartphone size={32} className="text-accent-violet-light" />,
    title: 'App Development',
    desc: 'User-centric mobile applications. We bring your ideas to life on both iOS and Android platforms seamlessly.',
    border: 'hover:border-accent-violet-light/40',
    shadow: 'hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]',
    features: ['Cross-Platform (React Native)', 'Native iOS/Android', 'Intuitive Interfaces', 'API Integration', 'App Store Deployment'],
    price: 'Starting at ₹40,000'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const ServicesPageHero = () => (
  <section className="relative pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden border-b border-border-subtle bg-base">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-violet/10 rounded-full blur-[150px] pointer-events-none"></div>
    <div className="relative z-10 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-border-subtle text-accent-ice font-body text-xs tracking-widest uppercase mb-6">
          Our Capabilities
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-text-white mb-6 leading-tight">
          Everything you need to <span className="gradient-text">scale</span>.
        </h1>
        <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto leading-relaxed">
          From cinematic video production to data-driven growth strategies, we provide an end-to-end framework for digital dominance.
        </p>
      </motion.div>
    </div>
  </section>
);

export default function ServicesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen bg-void relative selection:bg-accent-violet/30"
    >
      <Navbar />
      
      <main>
        <ServicesPageHero />
        
        <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {detailedServices.map((srv, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className={`group flex flex-col bg-card border border-border-subtle p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm ${srv.border} ${srv.shadow}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-border-subtle group-hover:bg-[rgba(255,255,255,0.06)] transition-colors">
                    {srv.icon}
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-text-secondary uppercase tracking-widest block">Starting</span>
                    <span className="font-body font-semibold text-text-white">{srv.price}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-display font-bold text-text-white mb-3">{srv.title}</h3>
                <p className="font-body text-[15px] text-text-secondary leading-relaxed mb-8">
                  {srv.desc}
                </p>
                
                <div className="h-[1px] w-full bg-border-subtle mb-6"></div>
                
                <ul className="flex-1 space-y-3 mb-8">
                  {srv.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={16} className="text-text-muted mt-0.5 shrink-0 group-hover:text-accent-ice transition-colors" />
                      <span className="font-body text-[13px] text-text-secondary leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/pricing"
                  className="w-full py-3 rounded-lg font-body text-sm font-semibold flex items-center justify-center gap-2 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] border border-border-medium transition-all text-text-white mt-auto"
                >
                  View Packages <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        <section className="py-24 max-w-4xl mx-auto px-6 text-center border-t border-border-subtle relative">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
           <h2 className="text-4xl md:text-5xl font-display font-bold text-text-white mb-6">Need a custom solution?</h2>
           <p className="text-lg text-text-secondary font-body mb-10">We build tailored packages for agencies and enterprises.</p>
           <Link 
            to="/contact" 
            className="inline-block px-10 py-4 text-[15px] rounded-full bg-text-white text-void font-body font-semibold tracking-[0.03em] hover:bg-gray-200 transition-colors"
           >
             Book a Strategy Call
           </Link>
        </section>

      </main>

      <Footer />
      <WhatsappBtn />
    </motion.div>
  );
}

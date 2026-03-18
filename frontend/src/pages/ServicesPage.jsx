import { motion } from 'framer-motion';
import { Video, Film, Share2, Search, Code, Smartphone, Check, ArrowRight, PlayCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsappBtn from '../components/WhatsappBtn';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import AnimatedHeading from '../components/AnimatedHeading';

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

const detailedServices = [
  // ... (content remains same but I'll update the render logic below)
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

const ServicesPageHero = () => (
  <section className="relative pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/5">
    <div className="relative z-10 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-accent-ice font-body text-[10px] tracking-widest uppercase mb-6">
          Our Capabilities
        </span>
        <AnimatedHeading 
          text="Everything you need to scale." 
          className="text-5xl md:text-7xl font-display font-bold text-text-white mb-6 leading-tight justify-center"
        />
        <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto leading-relaxed">
          From cinematic video production to data-driven growth strategies, we provide an end-to-end framework for digital dominance.
        </p>
      </motion.div>
    </div>
  </section>
);

export default function ServicesPage() {
  return (
    <PageWrapper>
      <Navbar />
      
      <main>
        <ServicesPageHero />
        
        <SectionWrapper className="py-24 max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {detailedServices.map((srv, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`group flex flex-col bg-[#0d0d0d]/40 border border-white/5 p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-md ${srv.border} ${srv.shadow}`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:bg-white/[0.06] transition-colors">
                    {srv.icon}
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-1">Starting</span>
                    <span className="font-body font-bold text-text-white text-lg">{srv.price}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-display font-bold text-text-white mb-4">{srv.title}</h3>
                <p className="font-body text-[15px] text-text-secondary leading-relaxed mb-10">
                  {srv.desc}
                </p>
                
                <div className="h-[1px] w-full bg-white/5 mb-8"></div>
                
                <ul className="flex-1 space-y-4 mb-10">
                  {srv.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <Check size={16} className="text-accent-ice mt-0.5 shrink-0" />
                      <span className="font-body text-[13px] text-text-secondary leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/pricing"
                  className="w-full py-4 rounded-xl font-body text-sm font-bold flex items-center justify-center gap-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all text-text-white mt-auto"
                >
                  View Packages <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
        
        <SectionWrapper className="py-24 max-w-5xl mx-auto px-6 text-center border-t border-white/5 relative">
           <h2 className="text-4xl md:text-6xl font-display font-bold text-text-white mb-8">Need a <span className="gradient-text italic">custom</span> solution?</h2>
           <p className="text-xl text-text-secondary font-body mb-12 max-w-2xl mx-auto">We build tailored packages for visionary agencies and global enterprises looking for unfair advantages.</p>
           <Link 
            to="/contact" 
            className="inline-block px-12 py-5 text-[15px] rounded-full bg-text-white text-void font-body font-bold tracking-[0.05em] hover:bg-accent-ice transition-all hover:scale-105 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
           >
             Book a Strategy Call
           </Link>
        </SectionWrapper>

      </main>

      <Footer />
      <WhatsappBtn />
    </PageWrapper>
  );
}

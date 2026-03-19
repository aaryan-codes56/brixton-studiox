import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsappBtn from '../components/WhatsappBtn';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';
import BackdropOrbs from '../components/BackdropOrbs';

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

const StatsBar = () => {
  const stats = [
    { value: '50', suffix: '+', label: 'Brands Built', color: 'text-accent-violet' },
    { value: '100', suffix: '+', label: 'Videos Produced', color: 'text-accent-gold' },
    { value: '25', suffix: '+', label: 'Websites Built', color: 'text-accent-ice' },
    { value: '5M', suffix: '+', label: 'Organic Views', color: 'text-accent-rose' },
    { value: '3', suffix: '+', label: 'Years Exp.', color: 'text-accent-violet-light' }
  ];

  // Quadruple stats for very long seamless marquee on all screens
  const marqueeStats = [...stats, ...stats, ...stats, ...stats];

  return (
    <div className="py-16 relative z-20 overflow-hidden">
      <div className="relative">
        <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border-y border-white/5 py-12 relative overflow-hidden group">
          {/* Subtle top/bottom edge highlights */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <motion.div 
            className="flex items-center gap-12 md:gap-24 px-12 w-max"
            animate={{ x: [0, -1500] }} // Adjusted for 5 items
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40, // Reduced from 60 to make it faster
                ease: "linear",
              }
            }}
          >
            {marqueeStats.map((stat, i) => (
              <div 
                key={i}
                className="flex flex-col items-center justify-center shrink-0 min-w-[200px]"
              >
                <span className="font-display font-bold text-5xl md:text-6xl text-white mb-3 drop-shadow-xl relative tracking-tight">
                  {stat.value}
                  <span className={`${stat.color} relative ml-1`}>{stat.suffix}</span>
                </span>
                <span className="font-body text-[11px] md:text-xs text-text-secondary tracking-[0.25em] uppercase font-semibold">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Premium Gradient Fades */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-void via-void/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-void via-void/80 to-transparent z-20 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

const CTABanner = () => (
  <SectionWrapper className="py-20 md:py-28 relative overflow-hidden">
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <h2 className="font-display font-bold text-5xl md:text-7xl text-white leading-tight mb-8">
        Ready to scale your brand?<br/>
        <span className="gradient-text italic opacity-90">Let's craft your story.</span>
      </h2>
      <p className="font-body text-lg text-text-secondary mb-12 max-w-2xl mx-auto">
        Partner with Brixton Studio to transform your digital presence. Get a free consultation and strategy blueprint on your first call.
      </p>
      <Link 
        to="/contact" 
        className="inline-block px-10 py-5 rounded-full bg-[var(--gradient-brand)] text-text-white font-body font-semibold text-lg tracking-[0.03em] shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] transform hover:-translate-y-1 transition-all"
      >
        Start Your Project
      </Link>
    </div>
  </SectionWrapper>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-void relative selection:bg-accent-violet/30 overflow-x-hidden">
      <SEO
        title="Cinematic Branding & Digital Agency"
        description="Brixton Studio — Premium Video Production, Social Media Management, and Web & App Development for brands that demand excellence. First shoot free."
        url="/"
      />
      <BackdropOrbs />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <SectionWrapper>
          <StatsBar />
        </SectionWrapper>
        <SectionWrapper>
          <Services />
        </SectionWrapper>
        <SectionWrapper>
          <Portfolio />
        </SectionWrapper>
        <SectionWrapper>
          <Pricing />
        </SectionWrapper>
        <SectionWrapper>
          <Testimonials />
        </SectionWrapper>
        <CTABanner />
      </main>
      <Footer />
      <WhatsappBtn />
    </div>
  );
};

export default HomePage;

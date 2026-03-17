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

const StatsBar = () => (
  <section className="py-16 relative z-20 max-w-6xl mx-auto px-6">
    {/* Animated ambient background glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent-violet/15 blur-[120px] -z-10 rounded-full pointer-events-none"></div>
    
    <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-10 md:p-14 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
      {/* Soft inner glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Subtle top edge high-light */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 md:gap-8 md:divide-x divide-white/10 text-center relative z-10">
        {[
          { value: '50', suffix: '+', label: 'Brands Built', color: 'text-accent-violet' },
          { value: '100', suffix: '+', label: 'Videos Produced', color: 'text-accent-gold' },
          { value: '5M', suffix: '+', label: 'Organic Views', color: 'text-accent-ice' },
          { value: '3', suffix: '+', label: 'Years Exp.', color: 'text-accent-rose' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center relative group/stat hover:-translate-y-2 transition-transform duration-500"
          >
            <span className="font-display font-bold text-5xl md:text-6xl text-white mb-3 drop-shadow-xl relative tracking-tight">
              {stat.value}
              <span className={`${stat.color} relative ml-1`}>{stat.suffix}</span>
            </span>
            <span className="font-body text-[11px] md:text-xs text-text-secondary tracking-[0.25em] uppercase font-semibold group-hover/stat:text-text-white transition-colors duration-300">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CTABanner = () => (
  <section className="py-20 md:py-28 relative overflow-hidden bg-void">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-accent-violet/5 blur-[150px] rounded-full pointer-events-none"></div>
    
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto px-6 text-center relative z-10"
    >
      <h2 className="font-display font-bold text-5xl md:text-7xl text-white leading-tight mb-8">
        Ready to scale your brand?<br/>
        <span className="gradient-text italic opacity-90">Let's craft your story.</span>
      </h2>
      <p className="font-body text-lg text-text-secondary mb-12 max-w-2xl mx-auto">
        Partner with Brixton StudioX to transform your digital presence. Get a free consultation and strategy blueprint on your first call.
      </p>
      <Link 
        to="/contact" 
        className="inline-block px-10 py-5 rounded-full bg-[var(--gradient-brand)] text-text-white font-body font-semibold text-lg tracking-[0.03em] shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] transform hover:-translate-y-1 transition-all"
      >
        Start Your Project
      </Link>
    </motion.div>
  </section>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-void relative selection:bg-accent-violet/30">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
      <WhatsappBtn />
    </div>
  );
};

export default HomePage;

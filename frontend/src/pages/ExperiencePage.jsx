import { motion } from 'framer-motion';
import { Camera, Focus, Activity, Film } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsappBtn from '../components/WhatsappBtn';

const stats = [
  { value: '50+', label: 'Brands Elevated', color: 'text-accent-violet-light' },
  { value: '100+', label: 'Cinematic Films', color: 'text-accent-gold-light' },
  { value: '5M+', label: 'Organic Views', color: 'text-accent-ice' },
  { value: '98%', label: 'Client Retention', color: 'text-accent-rose' },
];

const timelineSteps = [
  {
    phase: 'Phase 1',
    title: 'Discovery & Strategy',
    desc: 'We dive deep into your brand identity, target audience, and business goals. This phase sets the architectural foundation for creative execution.',
    icon: <Search size={24} className="text-text-white" />,
    color: 'bg-accent-violet'
  },
  {
    phase: 'Phase 2',
    title: 'Pre-Production',
    desc: 'Meticulous planning, storyboarding, scriptwriting, and location scouting. Every shot is engineered before the cameras even roll.',
    icon: <Focus size={24} className="text-text-white" />,
    color: 'bg-accent-gold'
  },
  {
    phase: 'Phase 3',
    title: 'Production',
    desc: 'Execution with cinema-grade equipment. Our crew operates with precision to capture stunning visuals and immaculate audio.',
    icon: <Camera size={24} className="text-text-white" />,
    color: 'bg-accent-rose'
  },
  {
    phase: 'Phase 4',
    title: 'Post-Production',
    desc: 'The magic happens here: offline editing, motion graphics, professional sound design, and rigorous color grading to ensure a premium look.',
    icon: <Film size={24} className="text-text-white" />,
    color: 'bg-accent-ice'
  },
  {
    phase: 'Phase 5',
    title: 'Distribution',
    desc: 'We do not just deliver files. We provide a tailored distribution strategy to maximize reach and ROI across all digital platforms.',
    icon: <Activity size={24} className="text-text-white" />,
    color: 'bg-accent-violet'
  }
];

const equipment = [
  'Sony FX3 / A7S III Cinema Line',
  'DJI RS3 Pro Gimbals',
  'Pro Sony G-Master Lenses',
  'Godox / Aputure Lighting',
  'RODE Wireless PRO Audio',
  'DJI Mavic 3 Cine Drones'
];

import { Search } from 'lucide-react';

const ExperiencePageHero = () => (
  <section className="relative pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden border-b border-border-subtle bg-base">
    <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2 w-[500px] h-[500px] bg-accent-violet/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div className="relative z-10 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-border-subtle text-accent-violet-light font-body text-xs tracking-widest uppercase mb-6">
          The Brixton Standard
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-text-white mb-6 leading-tight">
          Engineered for <span className="gradient-text italic">impact</span>.
        </h1>
        <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto leading-relaxed">
          We combine cinematic artistry with data-driven strategy to build digital assets that perform.
        </p>
      </motion.div>
    </div>
  </section>
);

export default function ExperiencePage() {
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
        <ExperiencePageHero />

        {/* Stats Section */}
        <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border-subtle/50 text-center">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center justify-center"
              >
                <span className={`font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-2 ${stat.color}`}>{stat.value}</span>
                <span className="font-body text-xs md:text-sm text-text-secondary tracking-widest uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-24 max-w-4xl mx-auto px-6 relative z-10 border-t border-border-subtle">
           <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-display font-bold text-text-white mb-4">The Production Process</h2>
             <p className="text-text-secondary font-body">From concept to final export, we leave nothing to chance.</p>
           </div>

           <div className="relative border-l-2 border-border-subtle ml-4 md:ml-10 space-y-12">
             {timelineSteps.map((step, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.6, delay: idx * 0.1 }}
                 className="relative pl-10 md:pl-16"
               >
                 {/* Node */}
                 <div className={`absolute -left-[21px] top-1 w-10 h-10 rounded-full border-4 border-void ${step.color} flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                   <div className="scale-50">{step.icon}</div>
                 </div>
                 
                 <div className="bg-card border border-border-subtle p-6 rounded-2xl hover:border-border-medium transition-colors">
                   <span className="font-body text-[11px] font-bold tracking-widest uppercase text-text-muted mb-2 block">{step.phase}</span>
                   <h3 className="text-2xl font-display font-bold text-text-white mb-3">{step.title}</h3>
                   <p className="font-body text-[15px] text-text-secondary leading-relaxed">{step.desc}</p>
                 </div>
               </motion.div>
             ))}
           </div>
        </section>

        {/* Equipment Section */}
        <section className="py-24 bg-card border-t border-b border-border-subtle relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-ice/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-white mb-10">Cinema-Grade Arsenal</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {equipment.map((item, idx) => (
                <div key={idx} className="px-6 py-3 rounded-full bg-[rgba(255,255,255,0.03)] border border-border-subtle text-text-secondary font-body text-[14px] hover:text-text-white hover:border-border-medium transition-colors">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsappBtn />
    </motion.div>
  );
}

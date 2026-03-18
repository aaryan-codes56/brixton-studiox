import { motion } from 'framer-motion';
import { Camera, Focus, Activity, Film, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsappBtn from '../components/WhatsappBtn';
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

const ExperiencePageHero = () => (
  <section className="relative pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/5">
    <div className="relative z-10 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-accent-violet-light font-body text-[10px] tracking-widest uppercase mb-6">
          The Brixton Standard
        </span>
        <AnimatedHeading 
          text="Engineered for impact." 
          className="text-5xl md:text-7xl font-display font-bold text-text-white mb-6 leading-tight justify-center"
        />
        <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto leading-relaxed">
          We combine cinematic artistry with data-driven strategy to build digital assets that perform at the highest level.
        </p>
      </motion.div>
    </div>
  </section>
);

export default function ExperiencePage() {
  return (
    <PageWrapper>
      <Navbar />
      
      <main>
        <ExperiencePageHero />

        {/* Stats Section */}
        <SectionWrapper className="py-24 max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="flex flex-col items-center justify-center p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2"
              >
                <span className={`font-display font-bold text-5xl md:text-6xl mb-4 tracking-tighter ${stat.color}`}>{stat.value}</span>
                <span className="font-body text-[10px] font-black text-text-secondary tracking-[0.3em] uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Process Timeline */}
        <SectionWrapper className="py-24 max-w-5xl mx-auto px-6 relative z-10 border-t border-white/5">
           <div className="text-center mb-20">
             <h2 className="text-4xl md:text-6xl font-display font-bold text-text-white mb-6">The <span className="gradient-text italic opacity-90">Production</span> Process</h2>
             <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto leading-relaxed">From initial conceptualization to global distribution, we leave zero room for error.</p>
           </div>

           <div className="relative border-l-2 border-white/5 ml-6 md:ml-12 space-y-16">
             {timelineSteps.map((step, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8, delay: idx * 0.1 }}
                 className="relative pl-12 md:pl-20 group"
               >
                 {/* Node */}
                 <div className={`absolute -left-[27px] top-1 w-12 h-12 rounded-full border-4 border-void ${step.color} flex items-center justify-center group-hover:scale-125 transition-transform duration-500 shadow-2xl z-20`}>
                   <div className="scale-75">{step.icon}</div>
                 </div>
                 
                 <div className="bg-[#0d0d0d]/40 border border-white/5 p-8 md:p-10 rounded-3xl hover:border-white/20 transition-all duration-700 backdrop-blur-md group-hover:-translate-y-2">
                   <div className="flex items-center gap-4 mb-4">
                     <span className="font-body text-[10px] font-black tracking-[0.3em] uppercase text-accent-ice opacity-60">{step.phase}</span>
                     <div className="h-[1px] w-8 bg-white/10 group-hover:w-16 transition-all duration-700"></div>
                   </div>
                   <h3 className="text-2xl md:text-3xl font-display font-bold text-text-white mb-4 tracking-tight">{step.title}</h3>
                   <p className="font-body text-[16px] text-text-secondary leading-relaxed group-hover:text-text-white transition-colors">{step.desc}</p>
                 </div>
                 
                 {/* Decorative line extension on hover */}
                 <div className="absolute top-7 -left-[40px] w-10 h-[2px] bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               </motion.div>
             ))}
           </div>
        </SectionWrapper>

        {/* Equipment Section */}
        <SectionWrapper className="py-32 bg-void border-t border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-ice/5 blur-[150px] pointer-events-none"></div>
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-white mb-16 tracking-tight">Cinema-Grade arsenal.</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {equipment.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-text-secondary font-body font-bold text-sm tracking-widest uppercase hover:text-text-white hover:border-accent-ice hover:bg-accent-ice/10 transition-all duration-300 cursor-default shadow-xl"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </main>

      <Footer />
      <WhatsappBtn />
    </PageWrapper>
  );
}

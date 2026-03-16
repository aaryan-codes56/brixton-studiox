import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsappBtn from '../components/WhatsappBtn';

const categories = ['All', 'Brand Films', 'Short-Form', 'Websites', 'Apps', 'Commercials'];

const portfolioItems = [
  { id: 1, category: 'Brand Films', client: 'Luxe Athletics', color: 'text-accent-violet-light', size: 'aspect-[4/5]' },
  { id: 2, category: 'Short-Form', client: 'Cafe Mocha', color: 'text-accent-gold-light', size: 'aspect-[9/16]' },
  { id: 3, category: 'Websites', client: 'Nexus SaaS', color: 'text-accent-ice', size: 'aspect-[16/9]' },
  { id: 4, category: 'Apps', client: 'Volt Fitness', color: 'text-accent-rose', size: 'aspect-[9/16]' },
  { id: 5, category: 'Websites', client: 'Vogue E-comm', color: 'text-accent-gold-light', size: 'aspect-[4/5]' },
  { id: 6, category: 'Apps', client: 'CryptoTrack', color: 'text-accent-ice', size: 'aspect-[16/9]' },
  { id: 7, category: 'Brand Films', client: 'Elevate Real Estate', color: 'text-accent-violet-light', size: 'aspect-[4/5]' },
  { id: 8, category: 'Short-Form', client: 'Glow Cosmetics', color: 'text-accent-rose', size: 'aspect-[9/16]' },
  { id: 9, category: 'Websites', client: 'Horizon Homes', color: 'text-accent-violet-light', size: 'aspect-square' },
  { id: 10, category: 'Apps', client: 'EcoLife Plus', color: 'text-accent-gold-light', size: 'aspect-[9/16]' },
];

const WorkPageHero = () => (
  <section className="relative pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden border-b border-border-subtle bg-base">
    <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[60%] w-[500px] h-[500px] bg-accent-ice/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div className="relative z-10 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-border-subtle text-accent-ice font-body text-xs tracking-widest uppercase mb-6">
          Selected Portfolio
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-text-white mb-6 leading-tight">
          Work that speaks <span className="gradient-text">volumes</span>.
        </h1>
        <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto leading-relaxed">
          From cinematic brand films to high-performance websites and scalable mobile applications.
        </p>
      </motion.div>
    </div>
  </section>
);

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = activeTab === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen bg-void relative selection:bg-accent-ice/30"
    >
      <Navbar />
      
      <main>
        <WorkPageHero />
        
        <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full font-body font-medium text-[13px] tracking-wide transition-all duration-300 ${
                  activeTab === cat 
                    ? 'bg-text-white text-void shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                    : 'bg-[rgba(255,255,255,0.05)] text-text-secondary hover:text-text-white border border-border-subtle hover:border-border-medium'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout using columns for masonry feel */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative ${item.size} w-full rounded-xl overflow-hidden bg-primary border border-border-medium cursor-pointer break-inside-avoid`}
                >
                  {/* Dark placeholder background */}
                  <div className="absolute inset-0 bg-base flex flex-col items-center justify-center opacity-60 group-hover:scale-105 transition-transform duration-700">
                    <span className={`font-display font-bold text-3xl md:text-5xl transform -rotate-45 opacity-10 whitespace-nowrap ${item.color}`}>{item.category}</span>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[rgba(0,0,0,0.5)] backdrop-blur-md flex items-center justify-center border border-border-strong text-text-white transform group-hover:scale-110 group-hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 shadow-xl">
                      <Play className="ml-1 w-6 h-6 md:w-8 md:h-8" fill="currentColor" strokeWidth={0} />
                    </div>
                  </div>

                  {/* Hover Details Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,2,10,0.95)] via-[rgba(2,2,10,0.4)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8 border-inset border-2 border-transparent group-hover:border-border-strong rounded-xl box-border">
                    <span className={`${item.color} font-body text-[11px] font-semibold tracking-widest uppercase mb-2`}>{item.category}</span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-text-white shadow-sm">{item.client}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsappBtn />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-void/90 backdrop-blur-lg"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-base border border-border-strong rounded-2xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(0,0,0,0.5)] text-text-white hover:bg-white hover:text-void transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="aspect-video bg-black flex items-center justify-center border-b border-border-subtle relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/5 to-accent-ice/5"></div>
                 <div className="text-center relative z-10">
                   {['Websites', 'Apps'].includes(selectedItem.category) ? (
                     <div className="flex flex-col items-center">
                       <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                         <Play size={32} className="text-accent-ice rotate-90" strokeWidth={1} />
                       </div>
                       <p className="text-text-secondary font-body font-medium">Interactive Project Preview</p>
                     </div>
                   ) : (
                     <div className="flex flex-col items-center">
                       <Play size={64} className="mx-auto mb-4 text-white/20" strokeWidth={1} />
                       <p className="text-text-secondary font-body font-medium">Video Player Placeholder</p>
                     </div>
                   )}
                 </div>
              </div>
              
              <div className="p-6 md:p-8">
                <span className={`${selectedItem.color} font-body text-[12px] font-semibold tracking-widest uppercase mb-2 block`}>
                  {selectedItem.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-text-white mb-4">
                  {selectedItem.client}
                </h2>
                <p className="text-text-secondary font-body leading-relaxed max-w-3xl">
                  {['Websites', 'Apps'].includes(selectedItem.category) 
                    ? `A high-performance ${selectedItem.category.toLowerCase()} solution engineered for ${selectedItem.client}. We focused on modern UI/UX principles, lightning-fast performance, and a conversion-centric architecture.`
                    : `A comprehensive ${selectedItem.category.toLowerCase()} campaign developed for ${selectedItem.client}. This project showcases our ability to blend beautiful visuals with striking narratives.`
                  }
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

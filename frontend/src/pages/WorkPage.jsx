import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsappBtn from '../components/WhatsappBtn';
import PageWrapper from '../components/PageWrapper';
import AnimatedHeading from '../components/AnimatedHeading';

const categories = ['All', 'Brand Films', 'Short-Form', 'Websites', 'Apps', 'Commercials'];

const portfolioItems = [
  { id: 11, category: 'Websites', client: 'Poppin Flea', color: 'text-accent-rose', size: 'aspect-[16/9]', thumbnail: '/assets/portfolio/poppin-flea.png', url: 'https://www.poppinflea.in/' },
  { id: 12, category: 'Websites', client: 'Pufflio', color: 'text-accent-ice', size: 'aspect-[4/5]', thumbnail: '/assets/portfolio/pufflio.png', url: 'https://www.pufflio.in/' },
  { id: 13, category: 'Websites', client: 'Varsal Healthcare', color: 'text-accent-violet-light', size: 'aspect-[16/9]', thumbnail: '/assets/portfolio/varsal-healthcare.png', url: 'https://varsalhealthcare.in/' },
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
  <section className="relative pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/5">
    <div className="relative z-10 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-accent-ice font-body text-[10px] tracking-widest uppercase mb-6">
          Selected Portfolio
        </span>
        <AnimatedHeading 
          text="Work that speaks volumes." 
          className="text-5xl md:text-7xl font-display font-bold text-text-white mb-6 leading-tight justify-center"
        />
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
    <PageWrapper>
      <Navbar />
      
      <main>
        <WorkPageHero />
        
        <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-8 py-3 rounded-full font-body font-bold text-[13px] tracking-widest uppercase transition-all duration-500 border ${
                  activeTab === cat 
                    ? 'bg-text-white text-void border-text-white shadow-[0_10px_30px_rgba(255,255,255,0.2)]' 
                    : 'bg-white/5 text-text-secondary hover:text-text-white border-white/5 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout using columns for masonry feel */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative ${item.size} w-full rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 cursor-pointer break-inside-avoid shadow-2xl`}
                >
                  {/* Thumbnail Image or Placeholder */}
                  <div className="absolute inset-0 bg-void flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-1000 ease-out">
                    {item.thumbnail ? (
                      <img 
                        src={item.thumbnail} 
                        alt={item.client} 
                        className={`w-full h-full object-cover ${item.category === 'Websites' ? 'object-top' : 'object-center'} opacity-60 group-hover:opacity-80 transition-opacity duration-700`} 
                      />
                    ) : (
                      <>
                        <span className={`font-display font-bold text-4xl md:text-6xl transform -rotate-45 opacity-5 whitespace-nowrap ${item.color}`}>{item.category}</span>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent"></div>
                      </>
                    )}
                  </div>
                  
                  {/* Play/External Link Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    {item.url ? (
                      <a 
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-void/60 backdrop-blur-xl flex items-center justify-center border border-white/10 text-text-white transform group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 shadow-2xl pointer-events-auto"
                      >
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-void/60 backdrop-blur-xl flex items-center justify-center border border-white/10 text-text-white transform group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 shadow-2xl">
                        <Play className="ml-1 w-6 h-6 md:w-8 md:h-8" fill="currentColor" strokeWidth={0} />
                      </div>
                    )}
                  </div>

                  {/* Hover Details Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 md:p-10 z-30">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className={`${item.color} font-body text-[11px] font-bold tracking-[0.2em] uppercase mb-3 block`}>{item.category}</span>
                      <h3 className="text-3xl md:text-4xl font-display font-bold text-text-white leading-tight">{item.client}</h3>
                    </motion.div>
                  </div>
                  
                  {/* Premium Corner Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-violet/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-void/90 backdrop-blur-2xl"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-void/60 backdrop-blur-md text-text-white border border-white/10 hover:bg-text-white hover:text-void transition-all duration-300 transform hover:rotate-90 shadow-xl"
              >
                <X size={24} />
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto bg-black flex items-center justify-center relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/10 to-accent-ice/10"></div>
                   
                   {selectedItem.thumbnail ? (
                     <img 
                       src={selectedItem.thumbnail} 
                       alt={selectedItem.client} 
                       className={`absolute inset-0 w-full h-full object-cover ${selectedItem.category === 'Websites' ? 'object-top' : 'object-center'} opacity-50 group-hover:opacity-70 transition-opacity duration-1000`} 
                     />
                   ) : (
                     <div className="text-center relative z-10 p-12">
                       <Play size={80} className="mx-auto mb-6 text-white/10 group-hover:text-white/30 transition-colors duration-700" strokeWidth={0.5} />
                       <p className="text-text-secondary font-body font-bold tracking-widest uppercase text-xs">Project Preview</p>
                     </div>
                   )}

                   {/* Static noise overlay for cinematic feel */}
                   <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat animate-noise"></div>
                   </div>
                </div>
                
                <div className="p-10 md:p-14 flex flex-col justify-center bg-void">
                  <span className={`${selectedItem.color} font-body text-[12px] font-bold tracking-[0.3em] uppercase mb-4 block`}>
                    {selectedItem.category}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-text-white mb-8 leading-tight">
                    {selectedItem.client}
                  </h2>
                  <div className="h-[2px] w-20 bg-gradient-to-r from-accent-violet to-accent-ice mb-8"></div>
                  <p className="text-text-secondary font-body text-lg leading-relaxed mb-10">
                    {['Websites', 'Apps'].includes(selectedItem.category) 
                      ? `A high-performance ${selectedItem.category.toLowerCase()} solution engineered for ${selectedItem.client}. We focused on modern UI/UX principles, lightning-fast performance, and a conversion-centric architecture.`
                      : `A comprehensive ${selectedItem.category.toLowerCase()} campaign developed for ${selectedItem.client}. This project showcases our ability to blend beautiful visuals with striking narratives for global audiences.`
                    }
                  </p>
                  {selectedItem.url ? (
                    <a 
                      href={selectedItem.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="self-start px-10 py-4 rounded-full bg-[var(--gradient-brand)] border border-accent-violet/20 hover:scale-105 text-white font-body font-bold text-sm tracking-widest transition-all uppercase shadow-lg shadow-accent-violet/20"
                    >
                      Launch Website
                    </a>
                  ) : (
                    <button className="self-start px-10 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-body font-bold text-sm tracking-widest transition-all uppercase">
                      Launch Project
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

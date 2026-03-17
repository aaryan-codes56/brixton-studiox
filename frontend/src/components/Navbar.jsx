import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Services', to: '/services' },
    { name: 'Work', to: '/work' },
    { name: 'Pricing', to: '/pricing' },
    { name: 'Experience', to: '/experience' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[0.16,1,0.3,1] border-b
        ${scrolled 
          ? 'bg-void/80 backdrop-blur-2xl border-white/5 h-[80px] shadow-[0_4px_30px_rgba(0,0,0,0.3)]' 
          : 'bg-transparent border-transparent h-[100px]'} 
        flex items-center`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Group */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer group transition-all">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full transform group-hover:rotate-[120deg] transition-transform duration-1000 ease-in-out">
              <polygon points="50,5 93,27 93,72 50,95 7,72 7,27" fill="transparent" stroke="url(#hexBrand)" strokeWidth="2" />
              <circle cx="50" cy="50" r="38" stroke="white" strokeOpacity="0.1" strokeWidth="1" fill="transparent" />
              <defs>
                <linearGradient id="hexBrand" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#67E8F9" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-display font-bold text-[18px] relative z-10 gradient-text">B</span>
          </div>
          
          <div className="flex flex-col leading-none">
            <span className="font-body font-black text-[20px] text-text-white tracking-tighter">BRIXTON</span>
            <span className="font-body font-medium text-[10px] text-accent-ice tracking-[0.4em] mt-0.5 opacity-80">STUDIOX</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link 
                key={link.name} 
                to={link.to} 
                className={`text-[13px] font-bold font-body relative transition-all duration-300 tracking-widest uppercase
                  ${isActive ? 'text-text-white' : 'text-text-muted hover:text-text-white'}`}
              >
                {link.name}
                {isActive && (
                  <motion.span 
                    layoutId="navUnderline"
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-accent-violet-light rounded-full" 
                  />
                )}
              </Link>
            );
          })}
        </div>  

        {/* Mobile Toggle */}
        <button className="md:hidden text-text-white p-2 z-50 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <motion.div animate={isOpen ? "open" : "closed"} className="relative w-6 h-6 flex flex-col justify-center items-center">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 min-h-screen bg-void z-40 flex flex-col items-center justify-center space-y-8 px-6"
          >
            {links.map((link) => {
               const isActive = location.pathname === link.to;
               return (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`text-[48px] font-body font-semibold ${isActive ? 'text-accent-violet-light' : 'text-text-white'}`}
                >
                  {link.name}
                </Link>
               );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

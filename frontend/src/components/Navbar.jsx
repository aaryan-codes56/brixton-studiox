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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out border-b border-transparent 
        ${scrolled ? 'bg-[rgba(7,7,26,0.85)] backdrop-blur-[20px] border-border-subtle h-[72px] md:h-[72px]' : 'bg-transparent h-[72px] md:h-[72px]'} 
        flex items-center`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Group */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer group hover:brightness-110 transition-all">
          {/* Hexagon icon 36x36 */}
          <div className="relative w-9 h-9 flex items-center justify-center">
            {/* SVG Logo definition exactly as requested */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full transform group-hover:rotate-30 transition-transform duration-700 ease-out">
              <polygon points="50,5 93,27 93,72 50,95 7,72 7,27" fill="transparent" stroke="url(#hexBrand)" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="40" stroke="#F59E0B" strokeOpacity="0.6" strokeWidth="1" fill="transparent" />
              {/* Dots at vertices */}
              <circle cx="50" cy="5" r="2" fill="#7C3AED" />
              <circle cx="93" cy="27" r="2" fill="#F59E0B" />
              <circle cx="93" cy="72" r="2" fill="#67E8F9" />
              <circle cx="50" cy="95" r="2" fill="#7C3AED" />
              <circle cx="7" cy="72" r="2" fill="#F59E0B" />
              <circle cx="7" cy="27" r="2" fill="#67E8F9" />
              <defs>
                <linearGradient id="hexBrand" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#67E8F9" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-display font-bold text-[16px] relative z-10 gradient-text mt-0.5">B</span>
          </div>
          
          <div className="flex items-baseline gap-1.5">
            <span className="font-body font-bold text-[18px] text-text-white">BRIXTON</span>
            <span className="font-body font-light text-[18px] text-accent-violet-light tracking-[0.3em]">STUDIOX</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-9">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link 
                key={link.name} 
                to={link.to} 
                className={`text-[14px] font-medium font-body relative transition-colors duration-300 
                  ${isActive ? 'text-accent-violet-light' : 'text-text-secondary hover:text-text-white'}`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-[8px] left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-accent-gold" />
                )}
              </Link>
            );
          })}
          
          <Link 
            to="/contact" 
            className="ml-2 px-6 py-2.5 rounded-full bg-[var(--gradient-brand)] text-text-white font-body font-semibold text-[13px] tracking-[0.03em] shadow-[0_0_24px_rgba(124,58,237,0.35)] hover:shadow-[0_0_40px_rgba(124,58,237,0.55)] transform hover:-translate-y-px transition-all"
          >
            Book Free Call
          </Link>
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
            
            <Link 
              to="/contact" 
              onClick={() => setIsOpen(false)}
              className="mt-4 px-10 py-4 rounded-full bg-[var(--gradient-brand)] text-text-white font-body font-semibold text-[18px] tracking-[0.03em] shadow-[0_0_30px_rgba(124,58,237,0.4)]"
            >
              Book Free Call
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const links = [
    { name: 'Services', to: '/services' },
    { name: 'Work', to: '/work' },
    { name: 'Pricing', to: '/pricing' },
    { name: 'Experience', to: '/experience' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[0.16,1,0.3,1] border-b
        ${scrolled 
          ? 'bg-void/70 backdrop-blur-3xl border-white/5 h-[80px] shadow-[0_10px_40px_rgba(0,0,0,0.4)]' 
          : 'bg-transparent border-transparent h-[100px]'} 
        flex items-center`}
    >
      <div className="relative z-50 w-full max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Group */}
        <Link to="/" className="flex items-center gap-1.5 cursor-pointer hover:opacity-90 transition-opacity">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <img src="/logo.png" alt="Brixton StudioX Logo" className="w-full h-full object-contain" />
          </div>
          
          <div className="flex flex-col leading-none">
            <img src="/logo-text.png" alt="Brixton StudioX" className="h-[44px] w-auto object-contain" />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <MagneticButton key={link.name}>
                <Link 
                  to={link.to} 
                  className={`text-[12px] font-bold font-body relative transition-all duration-300 tracking-[0.2em] uppercase p-2
                    ${isActive ? 'text-text-white' : 'text-text-muted hover:text-text-white'}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span 
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-2 right-2 h-[2px] bg-[var(--gradient-brand)] rounded-full" 
                    />
                  )}
                </Link>
              </MagneticButton>
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
            className="fixed inset-0 min-h-screen bg-void/90 backdrop-blur-3xl z-40 flex flex-col items-center justify-center space-y-8 px-6"
          >
            {links.map((link, i) => {
               const isActive = location.pathname === link.to;
               return (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`group relative text-[24px] sm:text-[32px] font-display uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center
                    ${isActive ? 'text-text-white font-medium' : 'text-text-secondary font-light hover:text-text-white'}`}
                >
                  {isActive && (
                    <motion.span 
                      layoutId="mobileNavActive"
                      className="absolute -left-6 w-1.5 h-1.5 rounded-full bg-accent-violet shadow-[0_0_10px_rgba(124,58,237,0.8)]"
                    />
                  )}
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

import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M12 12c-2.5 0-4.5-2-4.5-4.5S9.5 3 12 3s4.5 2 4.5 4.5V12a6 6 0 0 1-12 0V9" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-void border-t border-border-subtle pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col items-start gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full transform group-hover:rotate-12 transition-transform duration-500 text-accent-violet">
                   <polygon points="50,5 93,27 93,72 50,95 7,72 7,27" fill="transparent" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="font-display font-bold text-[14px] text-text-white z-10">B</span>
              </div>
              <div className="flex flex-col">
                <span className="font-body font-bold text-[16px] text-text-white leading-tight">BRIXTON</span>
                <span className="font-body font-light text-[10px] text-accent-violet-light tracking-[0.3em] leading-tight">STUDIOX</span>
              </div>
            </Link>
            <p className="font-body text-[13px] text-text-secondary mt-2">Brand · Create · Grow</p>
            <div className="mt-4 px-3 py-1.5 rounded-full bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)]">
              <span className="font-body font-medium text-[11px] text-accent-gold-light tracking-wide uppercase">✦ First Shoot is Always FREE</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-body font-semibold text-[14px] text-text-white mb-6 tracking-wide">Quick Links</h4>
            <ul className="flex flex-col space-y-3">
              {[
                { name: 'Home', to: '/' },
                { name: 'Services', to: '/services' },
                { name: 'Work', to: '/work' },
                { name: 'Pricing', to: '/pricing' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.to} className="font-body text-[14px] text-text-secondary hover:text-accent-violet-light transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-body font-semibold text-[14px] text-text-white mb-6 tracking-wide">Get in Touch</h4>
            <ul className="flex flex-col space-y-3 font-body text-[13px] text-text-secondary leading-relaxed">
              <li className="pt-2 flex flex-col gap-1">
                <a href="mailto:brixtonstudiox@gmail.com" className="hover:text-text-white transition-colors">brixtonstudiox@gmail.com</a>
                <a href="tel:+919754593311" className="hover:text-text-white transition-colors mt-1">+91 9754593311</a>
                <a href="tel:+917300026329" className="hover:text-text-white transition-colors">+91 7300026329</a>
              </li>
              <li className="pt-2">
                <a href="https://wa.me/919754593311" target="_blank" rel="noopener noreferrer" className="text-accent-gold-light hover:text-white transition-colors">
                  Message on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-subtle pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-body text-[12px] text-text-muted">
            © {new Date().getFullYear()} Brixton StudioX. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
             <a href="https://www.facebook.com/share/1G2MS3rUnn/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-violet-light transition-colors" title="Facebook">
               <Facebook size={18} />
             </a>
             <a href="https://www.instagram.com/brixtonstudiox.official?igsh=MzY4NnNwaHY1MnFu" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-violet-light transition-colors" title="Instagram">
               <Instagram size={18} />
             </a>
             <a href="https://www.threads.com/@brixtonstudiox.official" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-violet-light transition-colors" title="Threads">
               <ThreadsIcon />
             </a>
             <a href="https://x.com/brixtonstudiox" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-violet-light transition-colors" title="X (Twitter)">
               <Twitter size={18} />
             </a>
             <a href="https://www.linkedin.com/company/brixton-studiox/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-violet-light transition-colors" title="LinkedIn">
               <Linkedin size={18} />
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

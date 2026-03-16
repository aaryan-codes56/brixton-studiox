import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Loader2, MapPin, Mail, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsappBtn from '../components/WhatsappBtn';

const InputField = ({ label, id, type = 'text', required, ...props }) => (
  <div className="mb-6 w-full">
    <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-2">
      {label} {required && <span className="text-accent-rose">*</span>}
    </label>
    <input
      id={id}
      type={type}
      required={required}
      className="w-full bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-xl px-4 py-3 text-text-white focus:outline-none focus:border-accent-violet focus:ring-1 focus:ring-accent-violet/50 transition-all placeholder:text-text-muted font-body"
      {...props}
    />
  </div>
);

const ContactPageHero = () => (
  <section className="relative pt-40 pb-12 px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-base">
    <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-1/2 w-[400px] h-[400px] bg-accent-rose/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div className="relative z-10 max-w-3xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-border-subtle text-accent-rose font-body text-xs tracking-widest uppercase mb-6">
          Connect With Us
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-text-white mb-6 leading-tight">
          Let's build something <span className="gradient-text">iconic</span>.
        </h1>
        <p className="text-lg text-text-secondary font-body leading-relaxed mb-6">
          Whether you have a fully fleshed-out request or just a rough idea, we're here to execute it with precision.
        </p>
      </motion.div>
    </div>
  </section>
);

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post('/leads', formData);
      if (data.success) {
        toast.success(data.message || 'Call request sent successfully!');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        toast.error('Failed to send request. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server error. Please contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen bg-void relative selection:bg-accent-rose/30 flex flex-col"
    >
      <Navbar />
      
      <main className="flex-1">
        <ContactPageHero />
        
        <section className="py-12 pb-24 max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left Column: Info & Map */}
            <div className="flex flex-col gap-8 order-2 lg:order-1">
              <h2 className="text-3xl font-display font-bold text-text-white mb-2">Our Studio</h2>
              
              <div className="flex flex-col gap-6">

                <div className="bg-card border border-border-subtle p-6 rounded-2xl flex items-start gap-4">
                  <div className="p-3 bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-xl shrink-0">
                    <Phone className="text-accent-gold-light" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-body font-semibold text-text-white mb-2">Direct Lines</h3>
                    <div className="flex flex-col gap-1 text-text-secondary text-[15px] font-body">
                      <span>+91 97545 93311 (Primary)</span>
                      <span>+91 73000 26329</span>
                      <span>+91 99985 85772</span>
                      <span>+91 74888 75048</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border-subtle p-6 rounded-2xl flex items-start gap-4">
                  <div className="p-3 bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-xl shrink-0">
                    <Mail className="text-accent-ice" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-body font-semibold text-text-white mb-2">Email Us On</h3>
                    <p className="text-text-secondary text-[15px] font-body">
                      brixtonstudiox@gmail.com
                    </p>
                  </div>
                </div>

                <div className="bg-card border border-border-subtle p-6 rounded-2xl">
                  <h3 className="text-lg font-body font-semibold text-text-white mb-4">Follow Our Journey</h3>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: <Facebook size={20} />, url: 'https://www.facebook.com/share/1G2MS3rUnn/', label: 'Facebook' },
                      { icon: <Instagram size={20} />, url: 'https://www.instagram.com/brixtonstudiox.official?igsh=MzY4NnNwaHY1MnFu', label: 'Instagram' },
                      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 12c-2.5 0-4.5-2-4.5-4.5S9.5 3 12 3s4.5 2 4.5 4.5V12a6 6 0 0 1-12 0V9" /></svg>, url: 'https://www.threads.com/@brixtonstudiox.official', label: 'Threads' },
                      { icon: <Twitter size={20} />, url: 'https://x.com/brixtonstudiox', label: 'X' },
                      { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/company/brixton-studiox/about/?viewAsMember=true', label: 'LinkedIn' }
                    ].map((social) => (
                      <a 
                        key={social.label} 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-xl text-text-secondary hover:text-accent-violet-light hover:border-accent-violet-light/30 transition-all"
                        title={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map Removed per request */}
            </div>

            {/* Right Column: Form */}
            <div className="order-1 lg:order-2">
              <div className="bg-card border border-border-subtle p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-violet/5 rounded-full blur-[80px] pointer-events-none"></div>
                
                <h2 className="text-2xl font-display font-bold text-text-white mb-6">Book a Strategy Session</h2>
                <form onSubmit={handleSubmit}>
                  <InputField label="Name" id="name" required placeholder="John Doe" value={formData.name} onChange={handleChange} />
                  <InputField label="Email Address" id="email" type="email" required placeholder="john@example.com" value={formData.email} onChange={handleChange} />
                  <InputField label="Contact Number" id="phone" type="tel" required placeholder="+91 90000 00000" value={formData.phone} onChange={handleChange} />
                  
                  <div className="mb-6 w-full">
                    <label htmlFor="service" className="block text-sm font-medium text-text-secondary mb-2">
                      Primary Interest <span className="text-accent-rose">*</span>
                    </label>
                    <div className="relative">
                      <select 
                        id="service" 
                        required 
                        value={formData.service} 
                        onChange={handleChange}
                        className="appearance-none w-full bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-xl px-4 py-3 text-text-white focus:outline-none focus:border-accent-violet transition-all font-body text-[15px]"
                      >
                        <option value="" disabled className="bg-void text-text-muted">Select an area...</option>
                        <option value="Reels" className="bg-void text-white">Short Form Content (Reels)</option>
                        <option value="Long Form" className="bg-void text-white">Brand Films & Commercials</option>
                        <option value="Social Media" className="bg-void text-white">Social Media Mastery</option>
                        <option value="SEO" className="bg-void text-white">Search Engine Optimization</option>
                        <option value="Web/App" className="bg-void text-white">Web & App Engineering</option>
                        <option value="Other" className="bg-void text-white">Other / Multiple</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-muted">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 w-full">
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">Project Details (Optional)</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Give us brief context on your brand and goals..."
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-xl px-4 py-3 text-text-white focus:outline-none focus:border-accent-violet transition-all placeholder:text-text-muted resize-none font-body text-[15px]"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-[var(--gradient-brand)] text-text-white font-body font-semibold text-[15px] shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : 'Request Strategy Call'}
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-border-subtle flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="https://wa.me/919754593311" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[rgba(34,197,94,0.1)] hover:bg-[rgba(34,197,94,0.15)] border border-[rgba(34,197,94,0.2)] text-green-400 font-body font-medium transition-colors text-sm">
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
      <WhatsappBtn />
    </motion.div>
  );
}

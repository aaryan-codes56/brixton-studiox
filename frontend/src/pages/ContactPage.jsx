import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Loader2, MapPin, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
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

const InputField = ({ label, id, type = 'text', required, ...props }) => (
  <div className="mb-8 w-full group">
    <label htmlFor={id} className="block text-[10px] font-black tracking-[0.2em] uppercase text-text-secondary mb-3 group-focus-within:text-accent-rose transition-colors">
      {label} {required && <span className="text-accent-rose opacity-50">*</span>}
    </label>
    <input
      id={id}
      type={type}
      required={required}
      className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-text-white focus:outline-none focus:border-accent-rose/30 focus:bg-white/[0.04] transition-all placeholder:text-text-muted/30 font-body text-[15px]"
      {...props}
    />
  </div>
);

const ContactPageHero = () => (
  <section className="relative pt-40 pb-16 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
    <div className="relative z-10 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-accent-rose font-body text-[10px] tracking-widest uppercase mb-6">
          Connect With Us
        </span>
        <AnimatedHeading 
          text="Let's build something iconic." 
          className="text-5xl md:text-7xl font-display font-bold text-text-white mb-6 leading-tight justify-center"
        />
        <p className="text-lg text-text-secondary font-body leading-relaxed max-w-2xl mx-auto">
          Whether you have a fully fleshed-out request or just a rough idea, we're here to execute it with technical precision and cinematic flair.
        </p>
      </motion.div>
    </div>
  </section>
);

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 12c-2.5 0-4.5-2-4.5-4.5S9.5 3 12 3s4.5 2 4.5 4.5V12a6 6 0 0 1-12 0V9" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298L17.607 20.65z" />
  </svg>
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
    <PageWrapper>
      <Navbar />
      
      <main className="flex-1">
        <ContactPageHero />
        
        <SectionWrapper className="py-20 pb-32 max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Left Column: Info & Map */}
            <div className="flex flex-col gap-12 order-2 lg:order-1">
              <div className="group">
                <h2 className="text-4xl font-display font-bold text-text-white mb-3 tracking-tight">Our <span className="gradient-text italic opacity-90">Studio</span></h2>
                <div className="h-[2px] w-12 bg-white/10 group-hover:w-24 transition-all duration-700"></div>
              </div>
              
              <div className="flex flex-col gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#0d0d0d]/40 border border-white/5 p-8 rounded-[2.5rem] flex items-start gap-6 hover:border-white/20 transition-all duration-500 backdrop-blur-md hover:-translate-y-1"
                >
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shrink-0 text-accent-gold-light">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-text-white mb-3">Direct Lines</h3>
                    <div className="flex flex-col gap-2 text-text-secondary text-[16px] font-body">
                      {[
                        '+91 97545 93311 (Primary)',
                        '+91 73000 26329',
                        '+91 99985 85772',
                        '+91 74888 75048'
                      ].map(num => (
                        <span key={num} className="hover:text-text-white transition-colors cursor-default">{num}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.1 }}
                   className="bg-[#0d0d0d]/40 border border-white/5 p-8 rounded-[2.5rem] flex items-start gap-6 hover:border-white/20 transition-all duration-500 backdrop-blur-md hover:-translate-y-1"
                >
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shrink-0 text-accent-ice">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-text-white mb-3">Electronic Mail</h3>
                    <p className="text-text-secondary text-[16px] font-body hover:text-text-white transition-colors cursor-pointer">
                      brixtonstudiox@gmail.com
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 }}
                   className="bg-[#0d0d0d]/40 border border-white/5 p-8 rounded-[2.5rem] hover:border-white/20 transition-all duration-500 backdrop-blur-md hover:-translate-y-1"
                >
                  <h3 className="text-xl font-display font-bold text-text-white mb-6">Follow Our Journey</h3>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: <Facebook size={20} />, url: 'https://www.facebook.com/share/1G2MS3rUnn/', label: 'Facebook' },
                      { icon: <Instagram size={20} />, url: 'https://www.instagram.com/brixtonstudiox.official?igsh=MzY4NnNwaHY1MnFu', label: 'Instagram' },
                      { icon: <ThreadsIcon />, url: 'https://www.threads.com/@brixtonstudiox.official', label: 'Threads' },
                      { icon: <XIcon />, url: 'https://x.com/brixtonstudiox', label: 'X' },
                      { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/company/brixton-studiox/about/?viewAsMember=true', label: 'LinkedIn' }
                    ].map((social) => (
                      <a 
                        key={social.label} 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-text-secondary hover:text-void hover:bg-text-white transition-all transform hover:scale-110"
                        title={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="order-1 lg:order-2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-[#0d0d0d]/60 border border-white/5 p-10 md:p-14 rounded-[3rem] relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent-rose/5 rounded-full blur-[120px] pointer-events-none"></div>
                
                <h2 className="text-3xl font-display font-bold text-text-white mb-10 tracking-tight">Book a <span className="gradient-text">Strategy</span> Session</h2>
                <form onSubmit={handleSubmit}>
                  <InputField label="Full Name" id="name" required placeholder="John Doe" value={formData.name} onChange={handleChange} />
                  <InputField label="Electronic Mail" id="email" type="email" required placeholder="john@example.com" value={formData.email} onChange={handleChange} />
                  <InputField label="Contact Number" id="phone" type="tel" required placeholder="+91 90000 00000" value={formData.phone} onChange={handleChange} />
                  
                  <div className="mb-10 w-full group">
                    <label htmlFor="service" className="block text-[10px] font-black tracking-[0.2em] uppercase text-text-secondary mb-3 group-focus-within:text-accent-rose transition-colors">
                      Primary Interest <span className="text-accent-rose opacity-50">*</span>
                    </label>
                    <div className="relative">
                      <select 
                        id="service" 
                        required 
                        value={formData.service} 
                        onChange={handleChange}
                        className="appearance-none w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-text-white focus:outline-none focus:border-accent-rose/30 focus:bg-white/[0.04] transition-all font-body text-[15px] cursor-pointer"
                      >
                        <option value="" disabled className="bg-void text-text-muted">Select an area...</option>
                        <option value="Reels" className="bg-void text-white">Short Form Content (Reels)</option>
                        <option value="Long Form" className="bg-void text-white">Brand Films & Commercials</option>
                        <option value="Social Media" className="bg-void text-white">Social Media Mastery</option>
                        <option value="SEO" className="bg-void text-white">Search Engine Optimization</option>
                        <option value="Web/App" className="bg-void text-white">Web & App Engineering</option>
                        <option value="Other" className="bg-void text-white">Other / Multiple</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-text-muted/30">
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="mb-12 w-full group">
                    <label htmlFor="message" className="block text-[10px] font-black tracking-[0.2em] uppercase text-text-secondary mb-3 group-focus-within:text-accent-rose transition-colors">Project Details (Optional)</label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Brief context on your brand and goals..."
                      className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-text-white focus:outline-none focus:border-accent-rose/30 focus:bg-white/[0.04] transition-all placeholder:text-text-muted/30 resize-none font-body text-[15px]"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-5 rounded-2xl bg-accent-rose text-void font-body font-black text-xs tracking-[0.3em] uppercase shadow-2xl hover:scale-[1.02] hover:shadow-accent-rose/20 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="animate-spin text-void" /> : 'Request Strategy Call'}
                  </button>
                </form>

                <div className="mt-10 pt-10 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="https://wa.me/919754593311" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-text-white font-body font-black text-[10px] tracking-[0.2em] uppercase transition-all">
                    <MessageCircle size={18} className="text-green-500" />
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>

          </div>
        </SectionWrapper>
      </main>

      <Footer />
      <WhatsappBtn />
    </PageWrapper>
  );
}

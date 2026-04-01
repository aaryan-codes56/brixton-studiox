import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';

const InputField = ({ label, id, type = 'text', required, ...props }) => (
  <div className="mb-6 w-full">
    <label htmlFor={id} className="block text-sm font-medium text-textMuted mb-2">
      {label} {required && <span className="text-accent-amber">*</span>}
    </label>
    <input
      id={id}
      type={type}
      required={required}
      className="w-full bg-white/5 border border-glassBorder rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/50 transition-all placeholder:text-white/20"
      {...props}
    />
  </div>
);

const BookingForm = () => {
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
    <section id="booking" className="py-24 max-w-4xl mx-auto px-6 relative">
      <div className="mb-12 flex flex-col items-center text-center">
        <span className="font-mono text-accent-amber mb-4 tracking-widest">// Let's Talk</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Ready to Level Up Your Brand?</h2>
        <p className="text-textMuted text-lg max-w-xl">
          Book a free discovery call — no commitments, just clarity on how we can help you grow.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden"
      >
        {/* Soft glowing orb behind form */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <InputField label="Name" id="name" required placeholder="John Doe" value={formData.name} onChange={handleChange} />
            <InputField label="Email Address" id="email" type="email" required placeholder="john@example.com" value={formData.email} onChange={handleChange} />
            <InputField label="Phone Number" id="phone" type="tel" required placeholder="+91 90000 00000" value={formData.phone} onChange={handleChange} />
            
            <div className="mb-6 w-full">
              <label htmlFor="service" className="block text-sm font-medium text-textMuted mb-2">
                Service Interested In <span className="text-accent-amber">*</span>
              </label>
              <div className="relative">
                <select 
                  id="service" 
                  required 
                  value={formData.service} 
                  onChange={handleChange}
                  className="appearance-none w-full bg-white/5 border border-glassBorder rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple transition-all"
                >
                  <option value="" disabled className="bg-secondary text-textMuted">Select a service...</option>
                  <option value="Reels" className="bg-secondary">Short Form Content (Reels)</option>
                  <option value="Long Form" className="bg-secondary">Long Form Video</option>
                  <option value="Social Media" className="bg-secondary">Social Media Management</option>
                  <option value="SEO" className="bg-secondary">SEO</option>
                  <option value="Web/App" className="bg-secondary">Website & App Development</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 w-full">
            <label htmlFor="message" className="block text-sm font-medium text-textMuted mb-2">Message (Optional)</label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us a bit about your brand..."
              className="w-full bg-white/5 border border-glassBorder rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple transition-all placeholder:text-white/20 resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-purple via-accent-amber to-accent-cyan text-white font-semibold text-lg shadow-[0_0_15px_rgba(167,139,250,0.3)] hover:shadow-[0_0_25px_rgba(167,139,250,0.5)] transform hover:-translate-y-1 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Book Your Free Call'}
          </button>
        </form>

        <div className="mt-12 w-full flex items-center gap-4">
          <div className="flex-1 h-px bg-glassBorder"></div>
          <span className="text-textMuted text-sm font-mono uppercase tracking-widest">or reach us directly</span>
          <div className="flex-1 h-px bg-glassBorder"></div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="https://wa.me/919754593311" target="_blank" rel="noreferrer" className="flex-1 max-w-[240px] flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-green-500/50 hover:bg-green-500/10 text-green-400 font-medium transition-colors">
            <MessageCircle size={20} />
            WhatsApp Us
          </a>
          <a href="tel:+919754593311" className="flex-1 max-w-[240px] flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-glassBorder hover:bg-white/5 text-white font-medium transition-colors">
            <Phone size={20} />
            +91 97545 93311
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default BookingForm;

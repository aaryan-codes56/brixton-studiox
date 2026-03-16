import { MapPin, PhoneCall, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6 border-t border-glassBorder">
      <div className="mb-16 flex flex-col items-center text-center">
        <span className="font-mono text-accent-cyan mb-4 tracking-widest">// Find Us</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Visit Our Studio</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Contact Info */}
        <div className="order-2 md:order-1 flex flex-col gap-8">
          <div className="glass-card p-6 rounded-2xl flex items-start gap-4 hover:border-accent-purple/50 transition-colors">
            <div className="p-3 bg-accent-purple/10 rounded-full shrink-0">
               <MapPin className="text-accent-purple" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-display font-medium text-white mb-2">Location</h3>
              <p className="text-textMuted text-lg leading-relaxed">
                HUDA Sector-2, Palwal<br />
                Haryana (121102)
              </p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl flex items-start gap-4 hover:border-accent-amber/50 transition-colors">
            <div className="p-3 bg-accent-amber/10 rounded-full shrink-0">
               <PhoneCall className="text-accent-amber" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-display font-medium text-white mb-2">Phone Lines</h3>
              <div className="flex flex-col gap-1 text-textMuted text-lg">
                <a href="tel:+919754593311" className="hover:text-amber-400 transition-colors">+91 97545 93311 (Primary)</a>
                <a href="tel:+917300026329" className="hover:text-amber-400 transition-colors">+91 73000 26329</a>
                <a href="tel:+919998585772" className="hover:text-amber-400 transition-colors">+91 99985 85772</a>
                <a href="tel:+917488875048" className="hover:text-amber-400 transition-colors">+91 74888 75048</a>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl flex items-start gap-4 hover:border-accent-cyan/50 transition-colors">
            <div className="p-3 bg-accent-cyan/10 rounded-full shrink-0">
               <Mail className="text-accent-cyan" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-display font-medium text-white mb-2">Email</h3>
              <p className="text-textMuted text-lg">
                <a href="mailto:hello@brixtonstudiox.com" className="hover:text-cyan-400 transition-colors">hello@brixtonstudiox.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="order-1 md:order-2">
          <div className="aspect-square md:aspect-[4/3] rounded-3xl glass-card relative overflow-hidden group">
             {/* Map styling using a styled iframe mapping to Palwal coordinates if possible, or just a dark placeholder */}
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14068.73030237748!2d77.31958611116637!3d28.14080183307689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdbf9cdbfba3b%3A0x6bde33be92fb30a8!2sHUDA%20Sector%202%2C%20Palwal%2C%20Haryana%20121102!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
               className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 opacity-60 grayscale-[50%] transition-opacity duration-500 group-hover:opacity-80" 
               allowFullScreen="" 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade">
             </iframe>
             
             {/* Overlay to prevent dragging out if needed or just styling */}
             <div className="absolute inset-0 pointer-events-none rounded-3xl border border-glassBorder shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;

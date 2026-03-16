import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Founder, Luxe Athletics',
    text: 'Brixton StudioX completely transformed our online presence. The quality of the brand video was exceptional, and their turnaround time was incredibly fast.',
    rating: 5
  },
  {
    name: 'Priya Patel',
    role: 'Marketing Head, Cafe Mocha',
    text: 'Their handle on social media and reel editing brought us a 300% increase in engagement. Highly recommend their Growth package!',
    rating: 5
  },
  {
    name: 'Amit Verma',
    role: 'CEO, TechNova Solutions',
    text: 'Professional, creative, and data-driven. They understood our brand vision perfectly and delivered a website that exceeded our expectations.',
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-transparent to-base relative border-t border-glassBorder overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="font-mono text-accent-cyan mb-4 tracking-widest">// What Clients Say</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Don't just take our word for it</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="glass-card p-8 rounded-3xl relative flex flex-col hover:-translate-y-2 transition-transform duration-300 before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-b before:from-white/10 before:to-transparent before:content-[''] before:rounded-3xl before:-z-10"
            >
              <Quote className="text-accent-purple/20 absolute top-6 right-8 w-16 h-16" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-accent-amber text-accent-amber" />
                ))}
              </div>
              
              <p className="text-textPrimary leading-relaxed mb-8 flex-1 relative z-10 font-body text-lg italic text-white/90">
                "{test.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan p-0.5">
                  <div className="w-full h-full bg-secondary rounded-full flex items-center justify-center font-bold text-white font-display">
                    {test.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{test.name}</h4>
                  <p className="text-textMuted text-xs">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

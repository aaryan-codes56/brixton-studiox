import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CEO, Nexa Digital",
    content: "Brixton StudioX transformed our brand identity. The cinematic quality of our commercials surpassed all expectations.",
    rating: 5,
    color: "text-accent-violet-light"
  },
  {
    name: "Sarah Chen",
    role: "Marketing Director, Float App",
    content: "The app development team is world-class. They delivered a scalable MVP in record time without compromising design.",
    rating: 5,
    color: "text-accent-ice"
  },
  {
    name: "Marcus Thorne",
    role: "Founder, Urban Wear",
    content: "Our short-form content view count exploded after we started working with Brixton. They understand the algorithm like no one else.",
    rating: 5,
    color: "text-accent-gold-light"
  },
  {
    name: "Elena Rodriguez",
    role: "CMO, Horizon SaaS",
    content: "The website they built for us isn't just beautiful—it's a conversion machine. High performance and sleek UI.",
    rating: 5,
    color: "text-accent-rose"
  },
  {
    name: "David Park",
    role: "Creative Lead, Apex Studios",
    content: "Working with Brixton is seamless. Their production process is transparent, and the final results are pure cinema.",
    rating: 5,
    color: "text-accent-violet-light"
  },
  {
    name: "Jessica Wu",
    role: "Influencer & Content Creator",
    content: "They turn raw footage into viral gold. My engagement has tripled since Brixton took over my editing.",
    rating: 5,
    color: "text-accent-gold-light"
  }
];

// Duplicate for seamless scroll
const extendedTestimonials = [...testimonials, ...testimonials];

const Testimonials = () => {
  return (
    <section className="py-24 bg-void overflow-hidden relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <span className="font-body font-medium text-[12px] text-accent-violet-light tracking-widest uppercase mb-4 block">
          Social Proof
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-white leading-tight">
          What our clients <span className="gradient-text">say</span>.
        </h2>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Infinite Scroll Wrapper */}
        <motion.div 
          className="flex gap-6 py-4 px-4"
          animate={{ x: [0, -1920] }} 
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          style={{ width: "fit-content" }}
        >
          {extendedTestimonials.map((item, idx) => (
            <div 
              key={idx}
              className="w-[300px] sm:w-[350px] md:w-[450px] shrink-0 p-8 rounded-3xl bg-card border border-border-subtle backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-colors group"
            >
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-accent-gold-light text-accent-gold-light" />
                  ))}
                </div>
                <Quote className={`${item.color} opacity-20 mb-4`} size={32} />
                <p className="text-text-secondary font-body text-base md:text-lg leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center font-display font-bold text-lg text-white`}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-text-white font-display font-bold text-sm tracking-wide">{item.name}</h4>
                  <p className="text-text-muted font-body text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient Fades for edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Testimonials;

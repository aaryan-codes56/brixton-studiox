import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Camera, Zap, RefreshCw, BarChart, Gift } from 'lucide-react';

const StatItem = ({ end, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / end));
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center px-4 py-6 border border-glassBorder rounded-2xl bg-secondary/30 backdrop-blur-sm relative overflow-hidden group">
       <div className="absolute -inset-2 bg-gradient-to-r from-accent-purple/0 via-white/5 to-accent-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur"></div>
       <div className="text-5xl font-display font-bold text-gradient-primary mb-2 relative z-10">
         {count}{suffix}
       </div>
       <div className="text-sm font-mono text-textMuted uppercase tracking-widest relative z-10">
         {label}
       </div>
    </div>
  );
};

const Experience = () => {
  const features = [
    { icon: <Target />, title: 'Strategy-First Approach', color: 'text-accent-purple', bg: 'bg-accent-purple/10', border: 'border-accent-purple/20' },
    { icon: <Camera />, title: 'Cinema-Grade Equipment', color: 'text-accent-amber', bg: 'bg-accent-amber/10', border: 'border-accent-amber/20' },
    { icon: <Zap />, title: 'Fast Turnaround', color: 'text-accent-cyan', bg: 'bg-accent-cyan/10', border: 'border-accent-cyan/20' },
    { icon: <RefreshCw />, title: 'Free Revisions Included', color: 'text-accent-purple', bg: 'bg-accent-purple/10', border: 'border-accent-purple/20' },
    { icon: <BarChart />, title: 'Data-Driven Strategy', color: 'text-accent-amber', bg: 'bg-accent-amber/10', border: 'border-accent-amber/20' },
    { icon: <Gift />, title: 'First Shoot Always FREE', color: 'text-accent-cyan', bg: 'bg-accent-cyan/10', border: 'border-accent-cyan/20' },
  ];

  return (
    <section id="experience" className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        
        {/* Left Col - Text & Features */}
        <div className="flex-1">
          <span className="font-mono text-accent-purple mb-4 tracking-widest inline-block">// Why Brixton studiox</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Built for Impact</h2>
          <p className="text-textMuted text-lg mb-12 max-w-xl leading-relaxed">
            We don't just shoot videos; we build brands. With over 3 years of 
            industry experience and cinema-grade gear, we transform your vision into 
            compelling content that converts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl glass-card hover:bg-white/5 transition-colors cursor-default group"
              >
                <div className={`p-3 rounded-xl ${feat.bg} ${feat.border} border border-solid group-hover:scale-110 transition-transform`}>
                  <div className={feat.color}>{feat.icon}</div>
                </div>
                <h4 className="font-semibold text-textPrimary text-sm leading-tight">{feat.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Col - Stats Grid */}
        <div className="flex-1 w-full grid grid-cols-2 gap-4">
          <StatItem end={50} suffix="+" label="Projects Done" />
          <StatItem end={3} suffix="+" label="Years Exp." />
          <StatItem end={20} suffix="+" label="Happy Clients" />
          <StatItem end={4} suffix="K" label="Quality Output" />
        </div>

      </div>
    </section>
  );
};

export default Experience;

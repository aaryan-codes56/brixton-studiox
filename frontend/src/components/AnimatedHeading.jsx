import { motion } from 'framer-motion';

const AnimatedHeading = ({ text, className = "", delay = 0, as: Component = "h1" }) => {
  const words = text.split(" ");

  return (
    <Component className={`${className} flex flex-wrap gap-x-[0.2em]`}>
      {words.map((word, i, arr) => (
        <div key={i} className="overflow-hidden py-1">
          <motion.span
            initial={{ y: "100%", filter: "blur(8px)" }}
            whileInView={{ y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1, 
              delay: delay + (i * 0.1), 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className={`inline-block ${i === arr.length - 1 && text.includes(".") ? 'text-text-secondary italic' : ''}`}
          >
            {word}
          </motion.span>
        </div>
      ))}
    </Component>
  );
};

export default AnimatedHeading;

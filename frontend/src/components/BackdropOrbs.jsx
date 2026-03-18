import { motion } from 'framer-motion';

const BackdropOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-accent-violet/30 blur-[160px]"
      />
      <motion.div
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 150, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent-ice/15 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 50, -150, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-accent-rose/15 blur-[180px]"
      />
    </div>
  );
};

export default BackdropOrbs;

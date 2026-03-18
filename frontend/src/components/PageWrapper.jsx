import { motion } from 'framer-motion';
import BackdropOrbs from './BackdropOrbs';

const PageWrapper = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`min-h-screen bg-void relative selection:bg-accent-violet/30 overflow-x-hidden ${className}`}
    >
      <BackdropOrbs />
      {children}
    </motion.div>
  );
};

export default PageWrapper;

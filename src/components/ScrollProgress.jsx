import { motion, useScroll, useSpring } from 'framer-motion';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  return (
    <motion.div style={{ scaleX, transformOrigin: 'left' }} className="fixed inset-x-0 top-0 z-[110] h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
  );
}

export default ScrollProgress;

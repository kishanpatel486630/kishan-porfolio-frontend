import { motion } from 'framer-motion';

export default function GlowOrb({ color = 'blue', size = 400, className = '', delay = 0 }) {
  const colors = {
    blue: 'from-gradient-start/20 to-gradient-end/10',
    purple: 'from-accent-glow/20 to-gradient-start/10',
    cyan: 'from-gradient-end/20 to-accent-glow/10',
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-[120px] bg-gradient-to-br ${colors[color] || colors.blue} pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

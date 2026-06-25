import { motion } from 'framer-motion';

export default function Card({ children, className = '', glowColor = 'blue', hover = true, ...props }) {
  const glowMap = {
    blue: 'hover:shadow-[0_0_40px_rgba(37,99,235,0.12)]',
    purple: 'hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]',
    cyan: 'hover:shadow-[0_0_40px_rgba(0,209,255,0.12)]',
  };

  return (
    <motion.div
      className={`
        relative rounded-2xl glass overflow-hidden
        transition-all duration-500 ease-out
        ${hover ? `hover:border-border-hover ${glowMap[glowColor] || glowMap.blue} hover:-translate-y-1` : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}

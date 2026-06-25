import { motion } from "framer-motion";

const variants = {
  primary: `relative inline-flex items-center justify-center gap-2 px-6 py-3 
            bg-[#4B4EFC] hover:bg-[#3f43eb] shadow-[0_0_15px_rgba(75,78,252,0.2)]
            text-white font-medium rounded-[10px] 
            transition-all duration-300 ease-out 
            hover:shadow-[0_0_25px_rgba(75,78,252,0.5)] 
            hover:-translate-y-0.5 active:scale-[0.98]`,
  secondary: `relative inline-flex items-center justify-center gap-2 px-6 py-3 
              bg-[#0E132B] text-white font-medium rounded-[10px] 
              border border-[#1E3A8A] hover:border-[#3B82F6]
              transition-all duration-300 ease-out 
              hover:bg-[#151C3B] hover:shadow-[0_0_15px_rgba(30,58,138,0.5)]
              hover:-translate-y-0.5 active:scale-[0.98]`,
  ghost: `relative inline-flex items-center justify-center gap-2 px-5 py-2.5 
          bg-transparent text-text-secondary font-medium rounded-lg 
          transition-all duration-300 
          hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5`,
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  href,
  onClick,
  ...props
}) {
  const classes = `${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}

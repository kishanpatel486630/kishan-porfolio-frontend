import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, align = 'center', className = '' }) {
  return (
    <motion.div
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
        {title.split(' ').map((word, i) => (
          <span key={i}>
            {i === title.split(' ').length - 1 ? (
              <span className="gradient-text">{word}</span>
            ) : (
              <span>{word} </span>
            )}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end ${align === 'center' ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}

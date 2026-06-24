import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';
import { usePortfolio } from '../context/PortfolioContext';
import SectionHeading from './ui/SectionHeading';
import FadeInOnScroll from './motion/FadeInOnScroll';
import GlowOrb from './ui/GlowOrb';

export default function Experience() {
  const { experience } = usePortfolio();
  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden">
      <GlowOrb color="purple" size={350} className="top-[20%] right-[-10%]" delay={1} />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey in design and product development."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-[22px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-gradient-start via-gradient-end to-accent-glow" />

          {experience.map((exp, index) => (
            <FadeInOnScroll
              key={exp.title + exp.company}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 0.15}
              className={`relative mb-12 last:mb-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'
              } pl-14 md:pl-0`}
            >
              {/* Timeline dot */}
              <div className={`absolute top-2 ${
                index % 2 === 0 ? 'left-[14px] md:left-auto md:-right-[2.65rem]' : 'left-[14px] md:-left-[2.65rem]'
              }`}>
                <motion.div
                  className="w-4 h-4 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end border-4 border-bg-primary"
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Card */}
              <div className="p-6 rounded-2xl glass hover:border-border-hover transition-all duration-500 group hover:shadow-[0_0_30px_rgba(37,99,235,0.08)]">
                <div className="flex items-center gap-2 mb-3">
                  <HiBriefcase className="text-gradient-end" size={16} />
                  <span className="text-xs text-gradient-end font-semibold uppercase tracking-wider">
                    {exp.period}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-1 group-hover:text-gradient-end transition-colors duration-300">
                  {exp.title}
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  {exp.company} · {exp.location}
                </p>
                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  {exp.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gradient-end mt-2 flex-shrink-0" />
                      <span className="text-xs text-text-secondary">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

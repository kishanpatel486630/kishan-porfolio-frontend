import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import SectionHeading from './ui/SectionHeading';
import Card from './ui/Card';
import { StaggerContainer, StaggerItem } from './motion/StaggerContainer';

export default function Skills() {
  const { skills } = usePortfolio();
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Tools and technologies I use to bring ideas to life."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {skills.map((group, gi) => (
            <StaggerItem key={group.category}>
              <Card
                glowColor={gi % 3 === 0 ? 'blue' : gi % 3 === 1 ? 'cyan' : 'purple'}
                className="p-6 md:p-8 h-full"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-3 h-3 rounded-full ${gi % 3 === 0 ? 'bg-gradient-start' : gi % 3 === 1 ? 'bg-gradient-end' : 'bg-accent-glow'}`} />
                  <h3 className="text-lg font-bold uppercase tracking-wider">{group.category}</h3>
                </div>

                {/* Skill bars */}
                <div className="space-y-5">
                  {group.items.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-text-secondary">{skill.name}</span>
                        <span className="text-xs font-bold text-text-muted">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            gi % 3 === 0
                              ? 'bg-gradient-to-r from-gradient-start to-gradient-end'
                              : gi % 3 === 1
                              ? 'bg-gradient-to-r from-gradient-end to-accent-glow'
                              : 'bg-gradient-to-r from-accent-glow to-gradient-start'
                          }`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.2,
                            delay: si * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

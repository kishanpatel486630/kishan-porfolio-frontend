import { motion } from 'framer-motion';
import { HiDownload } from 'react-icons/hi';
import { personalInfo, dynamicExperienceValue } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import GlowOrb from './ui/GlowOrb';
import FadeInOnScroll from './motion/FadeInOnScroll';

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <GlowOrb color="cyan" size={400} className="top-[20%] left-[-10%]" delay={2} />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="About Me"
          subtitle="The person behind the pixels."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Photo */}
          <FadeInOnScroll direction="left">
            <div className="relative group max-w-md mx-auto lg:mx-0">
              {/* Glow ring behind image */}
              <div className="absolute inset-[-4px] rounded-3xl bg-gradient-to-br from-gradient-start via-gradient-end to-accent-glow opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />

              <div className="relative rounded-3xl overflow-hidden glass p-2">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full rounded-2xl object-cover aspect-[4/5]"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 px-5 py-3 rounded-2xl glass-strong shadow-xl"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="text-xs text-text-muted mb-0.5">Experience</p>
                <p className="text-lg font-bold gradient-text">{dynamicExperienceValue} Years</p>
              </motion.div>
            </div>
          </FadeInOnScroll>

          {/* Bio */}
          <FadeInOnScroll direction="right" delay={0.2}>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Designing with
                <span className="gradient-text"> purpose</span> &
                <span className="gradient-text-accent"> passion</span>
              </h3>

              <div className="space-y-4 text-text-secondary leading-relaxed mb-8">
                <p>{personalInfo.bio}</p>
                <p>
                  When I'm not designing, you'll find me exploring new design trends,
                  contributing to open-source projects, or sharing knowledge through
                  blog posts and community workshops.
                </p>
              </div>

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Location', value: personalInfo.location },
                  { label: 'Email', value: personalInfo.email },
                  { label: 'Status', value: 'Available' },
                  { label: 'Specialty', value: 'Product Design' },
                ].map((fact) => (
                  <div key={fact.label} className="p-3 rounded-xl bg-white/[0.02] border border-border">
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{fact.label}</p>
                    <p className="text-sm font-medium text-text-primary truncate">{fact.value}</p>
                  </div>
                ))}
              </div>

              <Button href={personalInfo.resumeUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
                <HiDownload />
                Download Resume
              </Button>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}

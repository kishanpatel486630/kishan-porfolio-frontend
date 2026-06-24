import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import { SiBehance } from "react-icons/si";
import { usePortfolio } from "../context/PortfolioContext";
import Button from "./ui/Button";
import GlowOrb from "./ui/GlowOrb";

export default function Hero() {
  const { personalInfo, stats } = usePortfolio();
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Orbs */}
      <GlowOrb
        color="blue"
        size={1200}
        className="top-[-10%] left-1/2 -translate-x-1/2 opacity-[0.15]"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-text-secondary font-medium">
              Available for new projects
            </span>
          </motion.div>

          {/* Name & Role */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-4">
              Hi, I'm{" "}
              <span className="gradient-text">
                {personalInfo.name.split(" ")[0]}
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-secondary">
              {personalInfo.role}
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-lg md:text-xl text-text-secondary max-w-xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {personalInfo.tagline}
            <br className="hidden sm:block" />I design products people love to
            use.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Button href="#projects" variant="primary">
              View My Work
              <HiArrowDown className="animate-bounce" />
            </Button>
            <Button href="#contact" variant="secondary">
              Get in Touch
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-4 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {[
              {
                icon: SiBehance,
                href: personalInfo.social.behance,
                label: "Behance",
              },
              {
                icon: FiLinkedin,
                href: personalInfo.social.linkedin,
                label: "LinkedIn",
              },
              {
                icon: FiGithub,
                href: personalInfo.social.github,
                label: "GitHub",
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl glass flex items-center justify-center
                  text-text-secondary hover:text-text-primary hover:border-border-hover
                  transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-text-primary/20 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-gradient-start to-gradient-end"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

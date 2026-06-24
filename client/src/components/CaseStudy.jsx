import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiX,
  HiArrowLeft,
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { usePortfolio } from "../context/PortfolioContext";
import GlowOrb from "./ui/GlowOrb";

export default function CaseStudy({ activeProjectId, onClose }) {
  const { caseStudies, projects } = usePortfolio();
  const currentProject = projects?.find((p) => p.id === activeProjectId);
  // No fallback — only show the matching case study data
  const activeCaseStudy = caseStudies?.[activeProjectId] || null;
  const [imageIndex, setImageIndex] = useState(0);
  const images = currentProject?.images?.length
    ? currentProject.images
    : [currentProject?.image].filter(Boolean);

  useEffect(() => {
    setImageIndex(0);
  }, [activeProjectId]);

  useEffect(() => {
    if (!images || images.length < 2) return undefined;
    const timer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  const changeImage = (direction) => {
    if (!images || images.length < 2) return;
    setImageIndex((prev) => (prev + direction + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {activeProjectId && currentProject && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-0 z-[70] overflow-y-auto"
            data-lenis-prevent="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="min-h-screen">
              <motion.div
                className="relative max-w-4xl mx-auto bg-bg-primary min-h-screen"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Background decoration */}
                <GlowOrb color="blue" size={400} className="top-0 right-0" />
                <GlowOrb color="purple" size={300} className="top-[50%] left-[-10%]" delay={3} />

                {/* Sticky Back / Close Bar */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 glass-strong">
                  <button
                    onClick={onClose}
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <HiArrowLeft size={18} />
                    <span className="text-sm font-medium">Back to Projects</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                    aria-label="Close"
                  >
                    <HiX size={18} />
                  </button>
                </div>

                {/* ── Case Study NOT available: show redirect panel ── */}
                {!activeCaseStudy && (
                  <motion.div
                    className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center text-white text-3xl mb-6 shadow-lg shadow-gradient-start/20">
                      ↗
                    </div>
                    <span className="text-xs text-gradient-end font-bold uppercase tracking-widest mb-3">
                      {currentProject.category}
                    </span>
                    <h1 className="text-4xl font-bold mb-4">{currentProject.title}</h1>
                    <p className="text-text-secondary text-lg max-w-lg mb-8 leading-relaxed">
                      {currentProject.description}
                    </p>
                    {currentProject.projectUrl ? (
                      <a
                        href={currentProject.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-end hover:to-gradient-start text-white text-base font-bold shadow-xl shadow-gradient-start/20 hover:shadow-gradient-start/40 transition duration-300"
                      >
                        View Live Project <HiArrowRight size={20} />
                      </a>
                    ) : (
                      <p className="text-text-muted text-sm bg-bg-card border border-border rounded-xl px-6 py-4">
                        📁 Detailed case study coming soon
                      </p>
                    )}
                  </motion.div>
                )}

                {/* ── Case Study IS available: full case study view ── */}
                {activeCaseStudy && (
                  <div className="relative px-6 md:px-12 py-12">
                    {/* Header */}
                    <motion.div
                      className="mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-sm text-gradient-end font-semibold uppercase tracking-wider">
                        Case Study • {currentProject.category}
                      </span>
                      <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6 tracking-tight">
                        {activeCaseStudy.title}
                      </h1>
                      <p className="text-base md:text-lg text-text-secondary mb-6 max-w-3xl">
                        {activeCaseStudy.subtitle}
                      </p>

                      {/* Live Project Link Button */}
                      {currentProject?.projectUrl && (
                        <div className="mb-8">
                          <a
                            href={currentProject.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-end hover:to-gradient-start text-white text-sm font-bold shadow-lg shadow-gradient-start/15 hover:shadow-gradient-start/30 transition duration-300"
                          >
                            Visit Live Project <HiArrowRight />
                          </a>
                        </div>
                      )}

                      {/* Project Image Carousel */}
                      <div className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] rounded-2xl overflow-hidden glass p-2 mb-8 bg-bg-secondary">
                        <img
                          src={images[imageIndex]}
                          alt={currentProject.title}
                          className="w-full h-full object-contain rounded-xl"
                        />
                        {images.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={() => changeImage(-1)}
                              className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-text-primary/90 hover:text-text-primary"
                              aria-label="Previous image"
                            >
                              <HiChevronLeft size={20} />
                            </button>
                            <button
                              type="button"
                              onClick={() => changeImage(1)}
                              className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-text-primary/90 hover:text-text-primary"
                              aria-label="Next image"
                            >
                              <HiChevronRight size={20} />
                            </button>
                            {/* Dot indicators */}
                            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                              {images.map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => setImageIndex(i)}
                                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    i === imageIndex
                                      ? "bg-white w-5"
                                      : "bg-white/40"
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
                        {currentProject.description}
                      </p>
                    </motion.div>

                    {/* Meta Chips */}
                    <motion.div
                      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {[
                        { label: "Role", value: activeCaseStudy.role },
                        { label: "Timeline", value: activeCaseStudy.timeline },
                        { label: "Team", value: activeCaseStudy.team },
                        {
                          label: "Tools",
                          value: (activeCaseStudy.tools || []).join(", "),
                        },
                      ].map((item) => (
                        <div key={item.label} className="p-4 rounded-xl glass">
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                            {item.label}
                          </p>
                          <p className="text-sm font-medium text-text-primary">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </motion.div>

                    {/* Overview */}
                    <motion.div
                      className="mb-16"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h2 className="text-2xl font-bold mb-4">Overview</h2>
                      <p className="text-text-secondary leading-relaxed text-lg">
                        {activeCaseStudy.overview}
                      </p>
                    </motion.div>

                    {/* Case Study Sections */}
                    {(activeCaseStudy.sections || []).map((section, index) => (
                      <motion.div
                        key={section.title}
                        className="mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.15 }}
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <h2 className="text-2xl font-bold">{section.title}</h2>
                        </div>

                        {/* Render content with bullet points */}
                        <div className="pl-14">
                          {(section.content || "").split("\n").map((line, lineIndex) => {
                            const trimmed = line.trim();
                            if (trimmed.startsWith("•")) {
                              return (
                                <div key={lineIndex} className="flex items-start gap-3 mb-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-end mt-2.5 flex-shrink-0" />
                                  <p className="text-text-secondary leading-relaxed">
                                    {trimmed.slice(1).trim()}
                                  </p>
                                </div>
                              );
                            }
                            if (trimmed) {
                              return (
                                <p key={lineIndex} className="text-text-secondary leading-relaxed mb-3">
                                  {trimmed}
                                </p>
                              );
                            }
                            return null;
                          })}
                        </div>

                        {/* Results section gets special card grid treatment */}
                        {section.title === "Results" && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pl-14">
                            {section.content
                              .split("•")
                              .filter(Boolean)
                              .slice(1)
                              .map((result, i) => {
                                const parts = result.trim().split(":");
                                if (parts.length < 2) return null;
                                return (
                                  <div key={i} className="p-4 rounded-xl glass text-center">
                                    <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
                                      {parts[0].trim()}
                                    </p>
                                    <p className="text-lg font-bold gradient-text">
                                      {parts[1].trim()}
                                    </p>
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Bottom CTA */}
                    <motion.div
                      className="text-center py-12 border-t border-border mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <p className="text-text-secondary mb-4">
                        Interested in working together?
                      </p>
                      <a
                        href="#contact"
                        onClick={onClose}
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-gradient-start to-gradient-end text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300 btn-shine"
                      >
                        Let's Talk
                      </a>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

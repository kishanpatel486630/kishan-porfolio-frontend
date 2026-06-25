import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
  HiArrowLeft,
} from "react-icons/hi";
import { usePortfolio } from "../context/PortfolioContext";
import Card from "../components/ui/Card";
import SectionHeading from "../components/ui/SectionHeading";
import {
  StaggerContainer,
  StaggerItem,
} from "../components/motion/StaggerContainer";
import Contact from "../components/Contact";

export default function ProjectsPage({ onOpenCaseStudy }) {
  const { projects, projectFilters } = usePortfolio();
  const TABS = projectFilters || ["All", "Designer", "Manager"];
  const [activeTab, setActiveTab] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);
  const [imageIndexes, setImageIndexes] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndexes((prev) => {
        const next = { ...prev };
        projects.forEach((project) => {
          const images = project.images?.length
            ? project.images
            : [project.image];
          if (images.length > 1) {
            const current = prev[project.id] || 0;
            next[project.id] = (current + 1) % images.length;
          }
        });
        return next;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const changeImage = (projectId, total, direction) => {
    setImageIndexes((prev) => {
      const current = prev[projectId] || 0;
      return {
        ...prev,
        [projectId]: (current + direction + total) % total,
      };
    });
  };

  // Modify local representation of projects to have roles for demonstration
  // In reality, this data would come directly from portfolio.js with roles already assigned
  const projectsWithRoles = projects.map((p, i) => ({
    ...p,
    role: p.role || (i % 2 === 0 ? "Designer" : "Manager"), // fallback if not properly assigned in portfolio.js
  }));

  const filteredProjects = projectsWithRoles.filter((project) => {
    if (activeTab === "All") return true;
    return project.role === activeTab;
  });

  return (
    <main className="pt-32 pb-0">
      <section className="relative py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="All Projects"
            subtitle="Dive deep into my complete portfolio spanning design and management roles."
          />

          {/* Interactive Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center p-1.5 glass rounded-2xl relative">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative z-10 px-6 py-2.5 text-sm font-semibold transition-colors duration-300 rounded-xl ${
                    activeTab === tab
                      ? "text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="active-tab-projects"
                      className="absolute inset-0 bg-gradient-to-r from-gradient-start to-gradient-end rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProjects.map((project) => (
                  <StaggerItem key={project.id}>
                    {(() => {
                      const images = project.images?.length
                        ? project.images
                        : [project.image];
                      const currentIndex = imageIndexes[project.id] || 0;
                      const currentImage = images[currentIndex];

                      return (
                        <Card
                          glowColor="blue"
                          className="group cursor-pointer h-full"
                          onMouseEnter={() => setHoveredId(project.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onClick={() => {
                            if (project.hasCaseStudy) {
                              onOpenCaseStudy?.(project.id);
                            } else if (project.projectUrl) {
                              window.open(project.projectUrl, "_blank");
                            }
                          }}
                          whileHover={{ y: -8 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {/* Image Container */}
                          <div className="relative overflow-hidden aspect-[16/10] bg-bg-secondary">
                            <img
                              src={currentImage}
                              alt={project.title}
                              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-60" />

                            {/* Carousel controls */}
                            {images.length > 1 && (
                              <>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    changeImage(project.id, images.length, -1);
                                  }}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass flex items-center justify-center text-text-primary/90 hover:text-text-primary"
                                  aria-label="Previous image"
                                >
                                  <HiChevronLeft size={18} />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    changeImage(project.id, images.length, 1);
                                  }}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass flex items-center justify-center text-text-primary/90 hover:text-text-primary"
                                  aria-label="Next image"
                                >
                                  <HiChevronRight size={18} />
                                </button>
                              </>
                            )}

                            {/* Case Study indicator */}
                            {project.hasCaseStudy && (
                              <motion.div
                                className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end text-white text-xs font-semibold"
                                animate={
                                  hoveredId === project.id
                                    ? { scale: [1, 1.05, 1] }
                                    : {}
                                }
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                Case Study
                              </motion.div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <p className="text-xs text-gradient-end font-semibold uppercase tracking-wider mb-2">
                              {project.category}
                            </p>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-gradient-end transition-colors duration-300">
                              {project.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed mb-4">
                              {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 text-xs font-medium rounded-full bg-black/5 dark:bg-white/[0.05] text-text-secondary border border-border"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Link */}
                            <div className="flex items-center gap-2 text-sm font-medium text-gradient-end group-hover:gap-3 transition-all duration-300">
                              {project.hasCaseStudy
                                ? "View Case Study"
                                : "View Project"}
                              <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                          </div>
                        </Card>
                      );
                    })()}
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-text-secondary">
                  <p>No projects found for this category at the moment.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Have an idea to implement real like that slogan -> Contact */}
      <Contact />
    </main>
  );
}

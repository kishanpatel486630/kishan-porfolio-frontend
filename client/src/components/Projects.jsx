import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { usePortfolio } from "../context/PortfolioContext";
import Card from "./ui/Card";
import SectionHeading from "./ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "./motion/StaggerContainer";

export default function Projects({ onOpenCaseStudy }) {
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

  const projectsWithRoles = projects.map((p, i) => ({
    ...p,
    role: p.role || (i % 2 === 0 ? "Designer" : "Manager"),
  }));

  const filteredProjects = projectsWithRoles.filter((project) => {
    if (activeTab === "All") return true;
    return project.role === activeTab;
  });

  const displayedProjects = filteredProjects.slice(0, 5);
  const hasMore = true; // Always show view all as the 6th card

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Featured Projects"
          subtitle="A curated selection of my recent design work across various industries and platforms."
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
                    layoutId="active-tab"
                    className="absolute inset-0 bg-gradient-to-r from-gradient-start to-gradient-end rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
              {displayedProjects.map((project) => (
                <StaggerItem key={project.id}>
                  {(() => {
                    const images = project.images?.length
                      ? project.images
                      : [project.image];
                    const currentIndex = imageIndexes[project.id] || 0;
                    const currentImage = images[currentIndex];

                    return (
                      <Card
                        glowColor={
                          project.id === "finflow"
                            ? "cyan"
                            : project.id === "pulse"
                              ? "purple"
                              : "blue"
                        }
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
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
                                className="px-3 py-1 text-xs font-medium rounded-full bg-white/[0.05] text-text-secondary border border-border"
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

              {hasMore && (
                <StaggerItem>
                  <Link to="/projects" className="block h-full">
                    <Card
                      glowColor="purple"
                      className="group cursor-pointer h-full flex flex-col items-center justify-center min-h-[400px] text-center"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="p-8 flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gradient-end to-accent-glow flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform duration-500">
                          <HiArrowRight size={24} />
                        </div>
                        <h3 className="text-2xl font-bold group-hover:text-gradient-end transition-colors duration-300">
                          View All Projects
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed max-w-[250px]">
                          Explore the complete archive of my case studies,
                          product designs, and management roles.
                        </p>
                      </div>
                    </Card>
                  </Link>
                </StaggerItem>
              )}

              {filteredProjects.length === 0 && (
                <div className="col-span-full text-center py-20 text-text-secondary">
                  <p>No featured projects found for {activeTab}.</p>
                </div>
              )}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

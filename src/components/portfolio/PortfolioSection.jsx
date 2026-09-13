import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUpRight, Play, Layers, Box, LayoutGrid } from "lucide-react";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { ThreeDTiltCard } from "../3d/ThreeDTiltCard";
import { ThreeProjectCarousel } from "../3d/ThreeProjectCarousel";
import { useCursor } from "../../context/CursorContext";

export const PortfolioSection = ({ projects, soundState }) => {
  const { playSynthSound } = soundState || { playSynthSound: () => {} };
  const { setCursor } = useCursor();

  const [viewMode, setViewMode] = useState("3d-cylinder"); // "3d-cylinder" | "3d-grid"
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ["All", "Social Media", "Video Editing", "Content Writing"];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleOpenProject = (project) => {
    setSelectedProject(project);
    playSynthSound?.("click");
  };

  return (
    <section 
      id="work" 
      className="relative py-24 sm:py-32 bg-dark-950/90 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -right-[15%] w-[55vw] h-[55vw] rounded-full bg-cyan-neon/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-[15%] w-[55vw] h-[55vw] rounded-full bg-purple-glow/20 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header & 3D Mode Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-purple-deep/25 border border-purple-glow/40 text-purple-soft text-xs font-mono font-medium mb-3 shadow-glow-purple/20">
              <Box className="w-3.5 h-3.5 text-cyan-neon animate-pulse" />
              <span>3D SPATIAL SHOWCASE & WORKS</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white-pure tracking-tight">
              Selected <span className="text-gradient-purple-cyan">Creative Works</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* 3D Mode Switch Buttons */}
            <div className="flex items-center bg-dark-900/90 p-1 rounded-[6px] border border-cyan-neon/30 shadow-glow-cyan/20">
              <button
                onClick={() => {
                  setViewMode("3d-cylinder");
                  playSynthSound?.("click");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-heading font-bold transition-all ${
                  viewMode === "3d-cylinder"
                    ? "bg-cyan-neon text-dark-950 shadow-glow-cyan"
                    : "text-white-dim hover:text-white-pure"
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D Spatial Cylinder</span>
              </button>

              <button
                onClick={() => {
                  setViewMode("3d-grid");
                  playSynthSound?.("click");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-heading font-bold transition-all ${
                  viewMode === "3d-grid"
                    ? "bg-purple-deep text-white-pure shadow-glow-purple border border-purple-glow"
                    : "text-white-dim hover:text-white-pure"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>3D Tilt Grid</span>
              </button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-1.5 bg-dark-900/80 p-1 rounded-[6px] border border-white/10 backdrop-blur-md">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    playSynthSound?.("click");
                  }}
                  className={`px-3 py-1 rounded-[4px] text-xs font-heading font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-white/15 text-white-pure border border-white/20"
                      : "text-white-dim hover:text-white-pure hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* VIEW 1: 3D CYLINDRICAL SPATIAL CAROUSEL (Generous Padding & Smooth Control) */}
        {/* ============================================================ */}
        {viewMode === "3d-cylinder" ? (
          <div className="relative my-4">
            <ThreeProjectCarousel
              projects={filteredProjects}
              onOpenProject={handleOpenProject}
              soundState={soundState}
              setCursor={setCursor}
            />
          </div>
        ) : (
          /* ============================================================ */
          /* VIEW 2: 3D TILT MATRIX GRID */
          /* ============================================================ */
          <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-6 my-4">
            <AnimatePresence>
              {filteredProjects.map((project, index) => {
                const isLarge = index % 3 === 0;
                const colSpanClass = isLarge ? "md:col-span-8" : "md:col-span-4";
                const aspectClass = isLarge ? "aspect-[16/10]" : "aspect-[4/5]";

                return (
                  <motion.div
                    layout
                    key={project.id || index}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className={`${colSpanClass}`}
                  >
                    <ThreeDTiltCard
                      maxTilt={12}
                      onClick={() => handleOpenProject(project)}
                      className="group cursor-pointer glass-panel rounded-[8px] border border-white/15 bg-dark-900/90 overflow-hidden flex flex-col justify-between hover:border-purple-glow/60 transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(168,85,247,0.25)] h-full"
                    >
                      <div className={`relative ${aspectClass} overflow-hidden bg-black`}>
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 contrast-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                          <span className="text-[11px] px-2.5 py-1 rounded-[3px] bg-dark-950/90 text-purple-mist border border-white/15 uppercase font-bold backdrop-blur-md">
                            {project.category}
                          </span>
                          <div className="w-8 h-8 rounded-[4px] bg-dark-950/80 border border-white/20 text-white-pure flex items-center justify-center group-hover:bg-purple-deep group-hover:border-purple-glow transition-all">
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>

                        {project.category === "Video Editing" && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-12 h-12 rounded-[5px] bg-cyan-neon/90 text-dark-950 flex items-center justify-center shadow-glow-cyan group-hover:scale-110 transition-transform">
                              <Play className="w-5 h-5 ml-0.5 fill-current" />
                            </div>
                          </div>
                        )}

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                          <span className="px-2.5 py-1 rounded-[3px] bg-dark-900/90 text-cyan-neon border border-cyan-neon/30 font-bold backdrop-blur-md">
                            {project.metrics?.[0]?.value} {project.metrics?.[0]?.label}
                          </span>
                          <span className="text-white-muted text-[11px] font-medium">
                            {project.year}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-2.5">
                            {project.tags?.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2.5 py-0.5 rounded-[2px] bg-white/5 text-white-dim font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <h3 className="font-heading font-bold text-lg sm:text-xl text-white-pure group-hover:text-purple-mist transition-colors mb-2">
                            {project.title}
                          </h3>

                          <p className="text-white-dim text-xs sm:text-sm line-clamp-2 leading-relaxed font-normal">
                            {project.shortDescription}
                          </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white-muted">
                          <span>Client: <strong className="text-white-crisp">{project.client}</strong></span>
                          <span className="text-purple-soft font-bold flex items-center gap-1 group-hover:text-cyan-neon transition-colors">
                            Inspect 3D Study →
                          </span>
                        </div>
                      </div>
                    </ThreeDTiltCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* Project Detail Modal Popup */}
      <ProjectDetailModal
        project={selectedProject}
        allProjects={projects}
        onClose={() => setSelectedProject(null)}
        onSelectNext={(next) => setSelectedProject(next)}
        soundState={soundState}
      />
    </section>
  );
};

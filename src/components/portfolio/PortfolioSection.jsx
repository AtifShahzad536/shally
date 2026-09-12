import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUpRight, Play, Heart, Layers, Filter } from "lucide-react";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { useCursor } from "../../context/CursorContext";

export const PortfolioSection = ({ projects, soundState }) => {
  const { playSynthSound } = soundState;
  const { setCursor } = useCursor();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ["All", "Social Media", "Video Editing", "Content Writing"];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleOpenProject = (project) => {
    setSelectedProject(project);
    playSynthSound("click");
  };

  return (
    <section id="work" className="relative py-28 bg-dark-950 overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-1/4 -right-[15%] w-[55vw] h-[55vw] rounded-full bg-cyan-neon/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-[15%] w-[55vw] h-[55vw] rounded-full bg-purple-glow/15 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-purple-deep/20 border border-purple-glow/30 text-purple-soft text-xs font-mono font-medium mb-3">
              <Layers className="w-3.5 h-3.5 text-purple-glow" />
              <span>FEATURED CASE STUDIES</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white-pure tracking-tight">
              Selected <span className="text-gradient-purple-cyan">Creative Works</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0 bg-dark-900/80 p-1.5 rounded-[5px] border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  playSynthSound("click");
                }}
                className={`px-3.5 py-1.5 rounded-[4px] text-xs font-heading font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-purple-deep to-purple-soft text-white-pure shadow-glow-purple/40 border border-purple-glow/50"
                    : "text-white-dim hover:text-white-pure hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* ASYMMETRIC MAGAZINE-STYLE PORTFOLIO GRID (5px Radius Standards) */}
        {/* ============================================================ */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              // Create asymmetric layout sizes based on index
              const isLarge = index % 3 === 0;
              const colSpanClass = isLarge ? "md:col-span-8" : "md:col-span-4";
              const aspectClass = isLarge ? "aspect-[16/10]" : "aspect-[4/5]";

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  onClick={() => handleOpenProject(project)}
                  onMouseEnter={() => {
                    setCursor("hover", "VIEW PROJECT");
                    playSynthSound("hover");
                  }}
                  onMouseLeave={() => setCursor("default")}
                  className={`${colSpanClass} group cursor-pointer glass-panel rounded-[5px] border border-white/15 bg-dark-900/90 overflow-hidden flex flex-col justify-between hover:border-purple-glow/60 transition-all duration-500 shadow-xl hover:shadow-[0_15px_40px_rgba(168,85,247,0.2)]`}
                >
                  {/* Media Visual Container */}
                  <div className={`relative ${aspectClass} overflow-hidden bg-black`}>
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Category & Status Overlay Tag */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-[11px] px-2.5 py-1 rounded-[3px] bg-dark-950/90 text-purple-mist border border-white/15 uppercase font-bold backdrop-blur-md">
                        {project.category}
                      </span>
                      <div className="w-8 h-8 rounded-[4px] bg-dark-950/80 border border-white/20 text-white-pure flex items-center justify-center group-hover:bg-purple-deep group-hover:border-purple-glow transition-all">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Video Play Badge if Video */}
                    {project.category === "Video Editing" && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 rounded-[5px] bg-cyan-neon/90 text-dark-950 flex items-center justify-center shadow-glow-cyan group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 ml-0.5 fill-current" />
                        </div>
                      </div>
                    )}

                    {/* Bottom Primary Metric Badge */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                      <span className="px-2.5 py-1 rounded-[3px] bg-dark-900/90 text-cyan-neon border border-cyan-neon/30 font-bold backdrop-blur-md">
                        {project.metrics[0]?.value} {project.metrics[0]?.label}
                      </span>
                      <span className="text-white-muted text-[11px] font-medium">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {project.tags.slice(0, 3).map((tag, i) => (
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
                        View Study →
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

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

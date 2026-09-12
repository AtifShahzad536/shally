import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, ArrowRight, ExternalLink, Calendar, User, Wrench, Award } from "lucide-react";
import { MagneticButton } from "../common/MagneticButton";
import { useCursor } from "../../context/CursorContext";

export const ProjectDetailModal = ({ project, allProjects, onClose, onSelectNext, soundState }) => {
  const { playSynthSound } = soundState;
  const { setCursor } = useCursor();

  // Prevent background body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  const nextProject = allProjects.find((p) => p.id !== project.id) || allProjects[0];

  return (
    <AnimatePresence>
      <div 
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto"
      >
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            onClose();
            playSynthSound("click");
          }}
          className="fixed inset-0 bg-dark-950/90 backdrop-blur-2xl"
        />

        {/* Modal Window Container (5px Border Radius) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          data-lenis-prevent="true"
          className="relative w-full max-w-5xl bg-dark-900 border border-white/20 rounded-[5px] shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-auto flex flex-col max-h-[88vh]"
        >
          {/* Top Modal Navigation Header */}
          <div className="bg-dark-950 px-6 py-4 border-b border-white/10 flex items-center justify-between sticky top-0 z-20 shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-neon animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-purple-mist font-bold">
                CASE STUDY // {project.category}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                playSynthSound("click");
              }}
              onMouseEnter={() => setCursor("hover")}
              onMouseLeave={() => setCursor("default")}
              className="p-2 rounded-[5px] bg-dark-800 border border-white/15 text-white-crisp hover:bg-cute-pink/20 hover:text-cute-pink transition-colors"
              aria-label="Close Project View"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Project Body (with data-lenis-prevent to guarantee full mouse wheel scrolling) */}
          <div 
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            className="p-6 sm:p-10 overflow-y-auto space-y-10 flex-1 overscroll-contain"
          >
            
            {/* Title & Metadata Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-[3px] bg-purple-deep/30 border border-purple-glow/40 text-purple-soft font-mono text-xs font-bold">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-white-muted">
                  Client: <strong className="text-white-crisp">{project.client}</strong>
                </span>
                <span className="text-white-muted">•</span>
                <span className="font-mono text-xs text-white-muted">Year: {project.year}</span>
              </div>

              <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white-pure tracking-tight leading-tight mb-4">
                {project.title}
              </h2>

              <p className="text-white-dim text-base sm:text-lg leading-relaxed max-w-3xl">
                {project.fullDescription}
              </p>
            </div>

            {/* Hero Cover Image Preview */}
            <div className="relative aspect-video rounded-[5px] overflow-hidden border border-white/15 bg-black shadow-2xl">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white-crisp">
                <span className="bg-dark-950/80 px-3 py-1 rounded-[3px] border border-white/10 font-medium">
                  Role: {project.role}
                </span>
                <span className="bg-cyan-deep/80 text-cyan-ice px-3 py-1 rounded-[3px] font-bold">
                  High-Impact Production
                </span>
              </div>
            </div>

            {/* Impact Metrics Matrix (4 Columns) */}
            <div>
              <span className="text-xs uppercase tracking-wider text-purple-mist font-bold block mb-4">
                ✦ Quantifiable Business Impact
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {project.metrics?.map((metric, i) => (
                  <div key={i} className="glass-panel p-4 rounded-[5px] border border-cyan-neon/30 bg-dark-950/80 text-center">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-gradient-purple-cyan block mb-1">
                      {metric.value}
                    </span>
                    <span className="text-xs text-white-muted uppercase font-semibold">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables & Tool Arsenal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Deliverables */}
              <div className="glass-panel p-6 rounded-[5px] border border-white/15 bg-dark-950/80">
                <span className="text-xs uppercase tracking-wider text-cute-pink font-bold block mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cute-pink" />
                  Key Deliverables
                </span>
                <div className="space-y-2.5">
                  {project.deliverables?.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-white-crisp font-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-glow" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools Used */}
              <div className="glass-panel p-6 rounded-[5px] border border-white/15 bg-dark-950/80">
                <span className="font-mono text-xs uppercase tracking-widest text-cyan-neon font-bold block mb-4 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-cyan-neon" />
                  Software & Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tools?.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-[4px] bg-dark-800 border border-white/15 text-xs font-mono text-white-crisp"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-xs font-mono text-white-muted">
                    Execution timeline: <strong className="text-white-crisp">Delivered on schedule</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery Grid */}
            {project.gallery && project.gallery.length > 0 && (
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-purple-mist font-bold block mb-4">
                  // PROJECT ASSETS & VISUALS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.gallery.map((img, idx) => (
                    <div key={idx} className="aspect-video rounded-[4px] overflow-hidden border border-white/15 bg-black">
                      <img src={img} alt={`Asset ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Next Project Switcher & Inquiry CTA */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => {
                  onSelectNext(nextProject);
                  playSynthSound("click");
                }}
                className="group flex items-center gap-3 text-left p-3 rounded-[5px] bg-dark-800 border border-white/10 hover:border-purple-glow transition-all"
              >
                <div>
                  <span className="font-mono text-[10px] text-purple-soft uppercase block">NEXT CASE STUDY</span>
                  <span className="font-heading font-bold text-sm text-white-pure group-hover:text-cyan-neon transition-colors">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-glow group-hover:translate-x-1 transition-transform" />
              </button>

              <MagneticButton
                href="#contact"
                onClick={() => {
                  onClose();
                  playSynthSound("click");
                }}
                variant="cyan"
                className="text-xs px-6 py-3 w-full sm:w-auto"
              >
                <span>Inquire About Similar Project</span>
              </MagneticButton>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

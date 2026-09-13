import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, ChevronUp, ChevronDown, Compass, Disc, Eye, Layers } from "lucide-react";

export const ThreeProjectCarousel = ({
  projects,
  onOpenProject,
  soundState,
  setCursor,
  externalActiveIndex
}) => {
  const { playSynthSound } = soundState || { playSynthSound: () => {} };
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentAngle = useRef(0);
  const containerRef = useRef(null);

  const totalProjects = Math.max(projects.length, 1);
  const anglePerItem = 360 / totalProjects;
  const radius = Math.max(360, totalProjects * 60);

  const rotateTo = (index) => {
    setActiveProjectIndex(index);
    const target = -index * anglePerItem;
    setRotationAngle(target);
    currentAngle.current = target;
  };

  useEffect(() => {
    if (typeof externalActiveIndex === "number" && externalActiveIndex !== activeProjectIndex) {
      rotateTo(externalActiveIndex);
    }
  }, [externalActiveIndex]);

  const handleNext = () => {
    const nextIdx = (activeProjectIndex + 1) % totalProjects;
    rotateTo(nextIdx);
    playSynthSound?.("click");
  };

  const handlePrev = () => {
    const prevIdx = (activeProjectIndex - 1 + totalProjects) % totalProjects;
    rotateTo(prevIdx);
    playSynthSound?.("click");
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
        setMouseTilt({ x, y });
      }
      return;
    }
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - startX.current;
    const newAngle = currentAngle.current + deltaX * 0.32;
    setRotationAngle(newAngle);
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    currentAngle.current = rotationAngle;

    const nearestIndex = Math.round(-rotationAngle / anglePerItem);
    const normalizedIndex = ((nearestIndex % totalProjects) + totalProjects) % totalProjects;
    rotateTo(normalizedIndex);
    playSynthSound?.("click");
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-6 sm:py-8 flex items-center justify-center select-none overflow-hidden"
    >
      {/* 3D Orbit Floor Guide & Core Nebula */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-cyan-neon/20 opacity-25 pointer-events-none"
        style={{ transform: "rotateX(75deg)" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-tr from-purple-glow/20 via-cyan-neon/20 to-cute-pink/20 blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* LEFT VERTICAL SLIM CYBER NAVIGATION DOCK */}
      {/* ========================================================================= */}
      <div className="absolute left-2 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2.5 p-2 rounded-full bg-dark-900/90 border border-white/15 backdrop-blur-md shadow-xl">
        <button
          onClick={handlePrev}
          onMouseEnter={() => { setCursor("hover", "PREV"); playSynthSound?.("hover"); }}
          onMouseLeave={() => setCursor("default")}
          className="w-7 h-7 rounded-full bg-dark-850 hover:bg-cyan-deep/40 text-white-crisp hover:text-cyan-neon flex items-center justify-center border border-white/10 hover:border-cyan-neon/60 transition-all hover:scale-110 shadow-sm"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>

        <div className="relative py-1.5 flex flex-col items-center gap-1.5">
          <div className="absolute top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />
          
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { rotateTo(idx); playSynthSound?.("click"); }}
              className={`relative z-10 transition-all duration-300 ${
                idx === activeProjectIndex
                  ? "w-2.5 h-5 rounded-full bg-gradient-to-b from-cyan-neon via-purple-glow to-cute-pink shadow-glow-cyan"
                  : "w-2 h-2 rounded-full bg-white/20 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          onMouseEnter={() => { setCursor("hover", "NEXT"); playSynthSound?.("hover"); }}
          onMouseLeave={() => setCursor("default")}
          className="w-7 h-7 rounded-full bg-dark-850 hover:bg-cyan-deep/40 text-white-crisp hover:text-cyan-neon flex items-center justify-center border border-white/10 hover:border-cyan-neon/60 transition-all hover:scale-110 shadow-sm"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        <div className="pt-1 border-t border-white/10 flex flex-col items-center font-mono text-[9px]">
          <span className="font-bold text-cyan-neon">0{activeProjectIndex + 1}</span>
          <span className="text-[8px] text-white-muted">/0{totalProjects}</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3D CYLINDRICAL SPATIAL VIEWPORT (GPU Accelerated 120FPS) */}
      {/* ========================================================================= */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        onMouseEnter={() => setCursor("hover", "DRAG 3D ORBIT")}
        onMouseLeave={() => setCursor("default")}
        className="relative w-full h-[450px] sm:h-[490px] flex items-center justify-center cursor-grab active:cursor-grabbing pl-10 sm:pl-14"
        style={{ perspective: "1600px" }}
      >
        <div
          className="relative w-[290px] sm:w-[360px] h-[380px] sm:h-[420px]"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${-mouseTilt.y * 0.3}deg) rotateY(${rotationAngle + mouseTilt.x * 0.25}deg)`,
            transition: isDragging.current ? "none" : "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          {projects.map((project, index) => {
            const itemAngle = index * anglePerItem;
            const isActive = index === activeProjectIndex;

            return (
              <div
                key={project.id || index}
                onClick={() => {
                  if (isActive) {
                    onOpenProject(project);
                  } else {
                    rotateTo(index);
                    playSynthSound?.("click");
                  }
                }}
                className="absolute inset-0 transition-all duration-300"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${isActive ? 1.03 : 0.94})`,
                  opacity: isActive ? 1 : 0.4,
                }}
              >
                <div
                  className={`w-full h-full rounded-[10px] border overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 ${
                    isActive
                      ? "border-2 border-cyan-neon shadow-[0_20px_50px_rgba(0,229,255,0.3)] bg-dark-900"
                      : "border border-white/10 bg-dark-950"
                  }`}
                >
                  {/* Card Cover Image */}
                  <div className="relative h-[190px] sm:h-[220px] overflow-hidden bg-black group">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />

                    {/* Top Floating Badge Bar */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-[4px] bg-dark-950/90 text-purple-mist border border-cyan-neon/40 uppercase font-bold shadow-sm">
                        {project.category}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-dark-950/90 border border-white/30 text-white-pure flex items-center justify-center group-hover:bg-cyan-neon group-hover:text-dark-950 group-hover:border-cyan-neon transition-all shadow-md">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Bottom Primary Metric Tag */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded-[4px] bg-dark-900/95 text-cyan-neon border border-cyan-neon/50 font-bold text-[11px] shadow-sm">
                        {project.metrics?.[0]?.value || "Viral"} {project.metrics?.[0]?.label}
                      </span>
                      <span className="text-white-dim text-[10px] bg-dark-950/80 px-2 py-0.5 rounded-[3px] border border-white/10">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Card Details Bottom */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-dark-900/95">
                    <div>
                      <h4 className="font-heading font-black text-base sm:text-lg text-white-pure mb-1 leading-snug group-hover:text-purple-mist transition-colors truncate">
                        {project.title}
                      </h4>
                      <p className="text-white-dim text-xs line-clamp-2 leading-relaxed font-normal">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-white-muted font-mono text-[10px]">
                        Client: <strong className="text-white-crisp">{project.client}</strong>
                      </span>
                      <span className={`font-mono text-[10px] font-bold flex items-center gap-1 ${isActive ? "text-cyan-neon" : "text-purple-mist"}`}>
                        {isActive ? "Inspect 3D Study →" : "Rotate to Center"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

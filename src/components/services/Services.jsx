import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, PenTool, Film, ArrowRight, CheckCircle2, Shield, Lock, Unlock, Zap } from "lucide-react";
import { MagneticButton } from "../common/MagneticButton";
import { ThreeDTiltCard } from "../3d/ThreeDTiltCard";
import { useCursor } from "../../context/CursorContext";

export const Services = ({ services, soundState }) => {
  const { playSynthSound } = soundState || { playSynthSound: () => {} };
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);

  // Direct zero-lag scroll tracking synced with Lenis
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // 1. LEFT VAULT BLAST DOOR: Slides Left & Swings Outward in 3D
  const leftDoorX = useTransform(scrollYProgress, [0.15, 0.45], ["0%", "-105%"]);
  const leftDoorRotateY = useTransform(scrollYProgress, [0.15, 0.45], [0, -35]);
  const leftDoorZ = useTransform(scrollYProgress, [0.15, 0.45], [0, 80]);

  // 2. RIGHT VAULT BLAST DOOR: Slides Right & Swings Outward in 3D
  const rightDoorX = useTransform(scrollYProgress, [0.15, 0.45], ["0%", "105%"]);
  const rightDoorRotateY = useTransform(scrollYProgress, [0.15, 0.45], [0, 35]);
  const rightDoorZ = useTransform(scrollYProgress, [0.15, 0.45], [0, 80]);

  // 3. Central Vault Core Glow & Reveal
  const coreScale = useTransform(scrollYProgress, [0.2, 0.5, 0.85], [0.8, 1, 0.95]);
  const coreZ = useTransform(scrollYProgress, [0.2, 0.5, 0.85], [-350, 40, -100]);
  const coreOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0.3, 1]);

  // Status Indicator on Doors
  const lockOpacity = useTransform(scrollYProgress, [0.1, 0.25], [1, 0]);
  const unlockOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);

  const iconMap = {
    Sparkles: Sparkles,
    PenTool: PenTool,
    Film: Film,
  };

  const serviceAccents = {
    "01": {
      gradient: "from-purple-deep/40 via-purple-electric/20 to-transparent",
      badge: "border-purple-glow/50 text-purple-soft bg-purple-deep/30",
      accent: "#A855F7",
      hoverBorder: "hover:border-purple-glow"
    },
    "02": {
      gradient: "from-cute-pink/35 via-purple-deep/20 to-transparent",
      badge: "border-cute-pink/50 text-cute-pink bg-cute-pink/30",
      accent: "#F472B6",
      hoverBorder: "hover:border-cute-pink"
    },
    "03": {
      gradient: "from-cyan-deep/40 via-cyan-neon/20 to-transparent",
      badge: "border-cyan-neon/50 text-cyan-neon bg-cyan-deep/30",
      accent: "#00E5FF",
      hoverBorder: "hover:border-cyan-neon"
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="services" 
      className="relative min-h-[130vh] py-32 bg-dark-950 overflow-hidden select-none"
      style={{ perspective: "1600px" }}
    >
      {/* Background Cyber Laser Lines & Atmospheric Fog */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[550px] rounded-full bg-cyan-neon/10 blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-purple-deep/25 border border-purple-glow/40 text-purple-soft text-xs font-mono font-medium mb-3 shadow-glow-purple/20">
              <Zap className="w-3.5 h-3.5 text-cyan-neon animate-pulse" />
              <span>3D CYBER VAULT // DISCIPLINE ARCHIVES</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white-pure tracking-tight">
              Three Disciplines. <span className="text-gradient-purple-cyan">One Vision.</span>
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-white-dim flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-neon animate-ping" />
            <span>Scroll down to disengage 3D Blast Doors & Unlock Capabilities</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE 3D SCI-FI BLAST DOOR PORTAL MECHANISM */}
        {/* ========================================================================= */}
        <div 
          className="relative w-full min-h-[520px] sm:min-h-[680px] flex items-center justify-center overflow-hidden rounded-[10px] p-2 sm:p-4 border border-white/10 bg-dark-950/60 shadow-[0_20px_70px_rgba(0,0,0,0.9)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Inner Reveal Stage (3 Services Cores inside Vault) in 2 columns on mobile */}
          <motion.div
            style={{
              scale: coreScale,
              z: coreZ,
              opacity: coreOpacity,
              transformStyle: "preserve-3d"
            }}
            className="w-full grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 z-10"
          >
            {services.map((service, idx) => {
              const Icon = iconMap[service.icon] || Sparkles;
              const accent = serviceAccents[service.id] || serviceAccents["01"];
              const isThirdCard = idx === 2;

              return (
                <ThreeDTiltCard
                  key={service.id}
                  maxTilt={10}
                  scale={1.01}
                  className={`h-full ${isThirdCard ? "col-span-2 lg:col-span-1 max-w-sm lg:max-w-none mx-auto w-full" : "w-full"}`}
                >
                  <div
                    onMouseEnter={() => {
                      setCursor("hover", "INSPECT CORE");
                      playSynthSound("hover");
                    }}
                    onMouseLeave={() => setCursor("default")}
                    className={`glass-panel p-3 sm:p-7 rounded-[8px] border border-white/20 bg-dark-900/95 flex flex-col justify-between relative group transition-all duration-500 overflow-hidden h-full ${accent.hoverBorder} shadow-2xl hover:shadow-[0_25px_60px_rgba(168,85,247,0.3)]`}
                  >
                    {/* Background Card Ambient Glow */}
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${accent.gradient} rounded-full blur-3xl opacity-30 group-hover:opacity-80 transition-opacity pointer-events-none`} />

                    <div>
                      {/* Top Bar: Number & Service Icon */}
                      <div className="flex items-center justify-between mb-2 sm:mb-6">
                        <span className="font-mono text-base sm:text-4xl font-black text-white/20 group-hover:text-white/50 transition-colors">
                          {service.id}
                        </span>
                        <div className={`w-7 h-7 sm:w-12 sm:h-12 rounded-[5px] sm:rounded-[6px] flex items-center justify-center border transition-all duration-300 group-hover:scale-110 shadow-glow-cyan/20 ${accent.badge}`}>
                          <Icon className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.2]" />
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="font-heading font-extrabold text-xs sm:text-2xl text-white-pure mb-1 sm:mb-1.5 group-hover:text-purple-mist transition-colors line-clamp-1 sm:line-clamp-none">
                        {service.title}
                      </h3>
                      <p className="text-[9px] sm:text-xs text-cute-pink mb-1.5 sm:mb-4 font-semibold tracking-wide truncate">
                        {service.subtitle}
                      </p>

                      <p className="text-white-dim text-[9.5px] sm:text-sm leading-snug sm:leading-relaxed mb-2 sm:mb-6 font-normal line-clamp-2 sm:line-clamp-none">
                        {service.description}
                      </p>

                      {/* Deliverables List */}
                      <div className="space-y-1.5 sm:space-y-2.5 mb-2 sm:mb-6 pt-2 sm:pt-4 border-t border-white/10">
                        <span className="text-[8.5px] sm:text-[11px] uppercase tracking-wider text-purple-mist font-bold block mb-1 sm:mb-3">
                          ✦ Deliverables
                        </span>
                        {service.deliverables.slice(0, 3).map((del, i) => (
                          <div key={i} className="flex items-start gap-1.5 sm:gap-2.5 text-[8.5px] sm:text-[13px] text-white-crisp font-normal leading-tight line-clamp-1 sm:line-clamp-none">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 shrink-0 mt-0.5" style={{ color: accent.accent }} />
                            <span className="truncate sm:whitespace-normal">{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Stat & Action */}
                    <div className="pt-2 sm:pt-4 border-t border-white/10 flex items-center justify-between gap-1">
                      <span className="text-[7.5px] sm:text-xs font-mono text-white-muted font-medium truncate">
                        {service.stats}
                      </span>
                      <a
                        href="#contact"
                        onClick={() => playSynthSound?.("click")}
                        className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-[4px] bg-dark-800/90 hover:bg-purple-deep/40 border border-white/20 hover:border-purple-glow text-white-crisp hover:text-white-pure text-[8px] sm:text-xs font-heading font-semibold transition-all duration-200 shrink-0 select-none shadow-sm"
                      >
                        <span>Inquire</span>
                        <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </a>
                    </div>
                  </div>
                </ThreeDTiltCard>
              );
            })}
          </motion.div>

          {/* ========================================================= */}
          {/* THE 3D SLIDING BLAST DOOR PANELS (Open on Scroll) */}
          {/* ========================================================= */}

          {/* Left Blast Door Panel */}
          <motion.div
            style={{
              x: leftDoorX,
              rotateY: leftDoorRotateY,
              z: leftDoorZ,
              transformStyle: "preserve-3d"
            }}
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-dark-950 via-dark-900 to-dark-850 border-r-2 border-cyan-neon/60 z-30 shadow-[15px_0_40px_rgba(0,0,0,0.9)] p-6 flex flex-col justify-between pointer-events-none"
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <span className="font-mono text-xs text-cyan-neon font-black tracking-widest uppercase flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-neon" /> VAULT_DOOR_01 // LEFT
              </span>
              <span className="font-mono text-[10px] text-white-muted">HYDRAULIC-LOCK</span>
            </div>

            <div className="self-end my-auto -mr-12 w-24 h-24 rounded-full border-4 border-cyan-neon/80 bg-dark-950 flex items-center justify-center shadow-glow-cyan">
              <motion.div style={{ opacity: lockOpacity }} className="flex flex-col items-center">
                <Lock className="w-6 h-6 text-rose-500" />
                <span className="text-[8px] font-mono text-rose-400 font-bold mt-1">SEALED</span>
              </motion.div>
              <motion.div style={{ opacity: unlockOpacity }} className="absolute flex flex-col items-center">
                <Unlock className="w-6 h-6 text-emerald-400" />
                <span className="text-[8px] font-mono text-emerald-400 font-bold mt-1">OPEN</span>
              </motion.div>
            </div>

            <div className="border-t border-white/15 pt-4 flex items-center justify-between text-[10px] font-mono text-white-muted">
              <span>SECURITY LEVEL: ALPHA</span>
              <span className="text-cyan-neon font-bold">SCROLL TO OPEN ➔</span>
            </div>
          </motion.div>

          {/* Right Blast Door Panel */}
          <motion.div
            style={{
              x: rightDoorX,
              rotateY: rightDoorRotateY,
              z: rightDoorZ,
              transformStyle: "preserve-3d"
            }}
            className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-dark-950 via-dark-900 to-dark-850 border-l-2 border-purple-glow/60 z-30 shadow-[-15px_0_40px_rgba(0,0,0,0.9)] p-6 flex flex-col justify-between pointer-events-none"
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <span className="font-mono text-[10px] text-white-muted">HYDRAULIC-LOCK</span>
              <span className="font-mono text-xs text-purple-mist font-black tracking-widest uppercase flex items-center gap-2">
                VAULT_DOOR_02 // RIGHT <Shield className="w-4 h-4 text-purple-glow" />
              </span>
            </div>

            <div className="self-start my-auto -ml-12 w-24 h-24 rounded-full border-4 border-purple-glow/80 bg-dark-950 flex items-center justify-center shadow-glow-purple">
              <Sparkles className="w-6 h-6 text-cyan-neon animate-spin" />
            </div>

            <div className="border-t border-white/15 pt-4 flex items-center justify-between text-[10px] font-mono text-white-muted">
              <span className="text-purple-mist font-bold">DISENGAGING LOCKS</span>
              <span>PRESSURE: NOMINAL</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

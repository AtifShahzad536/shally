import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Compass, ArrowDown } from "lucide-react";

export const WorldTransitionSeam = ({
  fromRealm = "Cosmic Tree",
  toRealm = "Spatial Chamber",
  realmNumber = "01",
  accentColor = "#00E5FF",
  glowGradient = "from-purple-glow/30 via-cyan-neon/40 to-transparent"
}) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth cinematic warp parallax transforms
  const beamScaleX = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.2, 1, 0.2]);
  const beamOpacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.2, 1, 0.2]);
  const portalGlowScale = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0.5, 1.2, 0.5]);
  const tagY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [30, 0, -30]);
  const tagOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-16 sm:py-24 flex flex-col items-center justify-center overflow-hidden pointer-events-none select-none z-20"
    >
      {/* 1. Volumetric Dimensional Horizon Light Lens */}
      <motion.div
        style={{ scale: portalGlowScale, opacity: beamOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-4xl h-[120px] rounded-full blur-[70px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${accentColor} 0%, rgba(168, 85, 247, 0.2) 40%, transparent 75%)`
        }}
      />

      {/* 2. Razor-Sharp Luminescent Horizon Line */}
      <div className="relative w-full max-w-5xl px-6 flex items-center justify-center">
        
        {/* Left Tapering Laser Beam */}
        <motion.div
          style={{ scaleX: beamScaleX }}
          className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-neon/60 to-purple-glow/80 origin-right shadow-[0_0_15px_rgba(0,229,255,0.8)]"
        />

        {/* Central Dimensional Warp Node / Realm Gateway Tag */}
        <motion.div
          style={{ y: tagY, opacity: tagOpacity }}
          className="mx-4 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-dark-950/95 border border-white/20 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.9),0_0_20px_rgba(0,229,255,0.4)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: accentColor }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: accentColor }}></span>
          </span>

          <span className="text-[10px] sm:text-[11px] font-heading font-extrabold uppercase tracking-widest text-white-pure flex items-center gap-1.5">
            <span>SECTOR {realmNumber}</span>
            <span className="text-white/30">•</span>
            <span style={{ color: accentColor }}>{toRealm}</span>
          </span>

          <ArrowDown className="w-3 h-3 animate-bounce" style={{ color: accentColor }} />
        </motion.div>

        {/* Right Tapering Laser Beam */}
        <motion.div
          style={{ scaleX: beamScaleX }}
          className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-cyan-neon/60 to-purple-glow/80 origin-left shadow-[0_0_15px_rgba(0,229,255,0.8)]"
        />

      </div>

      {/* 3. Subtle Ambient Space Dust Drifting between Horizons */}
      <div className="absolute inset-0 flex justify-around opacity-40 pointer-events-none">
        <div className="w-1 h-1 rounded-full bg-cyan-neon blur-[0.5px] animate-pulse" />
        <div className="w-1.5 h-1.5 rounded-full bg-purple-glow blur-[0.5px] animate-ping" />
        <div className="w-1 h-1 rounded-full bg-cute-pink blur-[0.5px] animate-pulse" />
      </div>

    </div>
  );
};

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, RotateCcw, Volume2, Sparkles, Film, 
  Layers, Zap, Check, Eye, Compass, Camera, Maximize2, 
  ArrowLeft, ArrowRight, ArrowUpRight, Flame, Disc, Radio, Monitor
} from "lucide-react";
import { ThreeDTiltCard } from "./ThreeDTiltCard";

export const ThreeVideoWorldTheater = ({
  data,
  soundState,
  setCursor,
  onSelectClip,
  videoPresets,
  activePreset
}) => {
  const { playSynthSound } = soundState;
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentAngle = useRef(0);

  // 6 Cinematic Video Production Pillars for the 3D Virtual World
  const videoModules = [
    {
      id: "module-hook",
      title: "Viral 3-Second Retention Hook",
      tag: "RETENTION HACK",
      badgeColor: "bg-cyan-neon/20 text-cyan-neon border-cyan-neon/40",
      description: "Psychological framing and rapid kinetic punch-ins designed to stop scrollers in under 3 seconds and skyrocket watch time.",
      metric: "+84% Avg Retention",
      videoThumb: data.videoPreviewUrl || "/shally.png",
      category: "Pacing & Psychology",
      specs: "4K 60FPS • Dynamic Zoom"
    },
    {
      id: "module-kinetic",
      title: "3D Kinetic Typography & Motion",
      tag: "MOTION FX",
      badgeColor: "bg-cute-pink/20 text-cute-pink border-cute-pink/40",
      description: "Custom keyframed typography, glowing stroke accents, and 3D floating icons synced frame-by-frame with vocal inflections.",
      metric: "100% Word Sync",
      videoThumb: data.videoPreviewUrl || "/shally.png",
      category: "Visual FX",
      specs: "After Effects 3D • Glow LUT"
    },
    {
      id: "module-grading",
      title: "Cinematic DaVinci 3D Color LUTs",
      tag: "COLOR SCIENCE",
      badgeColor: "bg-purple-glow/20 text-purple-mist border-purple-glow/40",
      description: "Film emulation, split-toning, obsidian shadows, and skin-tone refinement creating high-production value studio aesthetics.",
      metric: "10-Bit HDR Grade",
      videoThumb: data.videoPreviewUrl || "/shally.png",
      category: "Color Grading",
      specs: "DaVinci Resolve 19 • AcesCC"
    },
    {
      id: "module-speedramp",
      title: "Velocity Speed Ramps & Whip Transitions",
      tag: "FLOW MASTERY",
      badgeColor: "bg-amber-400/20 text-amber-300 border-amber-400/40",
      description: "Seamless optical flow motion blur, whip pans, and rhythmic cuts tailored to high-BPM viral audio tracks.",
      metric: "Fluid 120 FPS Flow",
      videoThumb: data.videoPreviewUrl || "/shally.png",
      category: "Kinetic Flow",
      specs: "Optical Flow • Sound Lock"
    },
    {
      id: "module-sound",
      title: "Multi-Track 3D Spatial Audio & Foley",
      tag: "IMMERSIVE AUDIO",
      badgeColor: "bg-emerald-400/20 text-emerald-300 border-emerald-400/40",
      description: "Deep 808 sub-bass drops, spatial stereo risers, crisp whooshes, and tactile UI sound design that triggers dopamine.",
      metric: "Spatial 3D Foley",
      videoThumb: data.videoPreviewUrl || "/shally.png",
      category: "Sound Design",
      specs: "24-bit 48kHz • Sub Drops"
    },
    {
      id: "module-architecture",
      title: "Short-Form Growth Architecture",
      tag: "VIRAL FORMULA",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      description: "Algorithmic loop structures, seamless transition endings, and call-to-action hooks engineered for maximum shares.",
      metric: "4.2M+ Reach Proven",
      videoThumb: data.videoPreviewUrl || "/shally.png",
      category: "Algorithm Strategy",
      specs: "TikTok / Reels / Shorts"
    }
  ];

  const totalClips = videoModules.length;
  const anglePerItem = 360 / totalClips;
  const radius = 380; // 3D cylinder depth radius

  const rotateTo = (index) => {
    setActiveClipIndex(index);
    const target = -index * anglePerItem;
    setRotationAngle(target);
    currentAngle.current = target;
    playSynthSound("click");
    if (onSelectClip) {
      onSelectClip(videoModules[index]);
    }
  };

  const handleNext = () => {
    const nextIdx = (activeClipIndex + 1) % totalClips;
    rotateTo(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeClipIndex - 1 + totalClips) % totalClips;
    rotateTo(prevIdx);
  };

  // Touch and Mouse Drag handlers for 3D Video Cylinder
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
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
    const normalizedIndex = ((nearestIndex % totalClips) + totalClips) % totalClips;
    rotateTo(normalizedIndex);
  };

  const activeModule = videoModules[activeClipIndex];

  return (
    <div className="relative w-full flex flex-col items-center select-none py-4">
      
      {/* 3D Holo-Ring Stage HUD Header */}
      <div className="flex items-center justify-between w-full max-w-5xl mb-4 px-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-neon animate-ping" />
          <span className="font-mono text-xs text-cyan-neon font-bold uppercase tracking-wider">
            3D Spatial Video Ring // Orbit Mode Active
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-white-muted">
          <span className="px-2 py-0.5 rounded-[3px] bg-dark-900 border border-white/10">
            DRAG TO ROTATE 3D CYLINDER
          </span>
        </div>
      </div>

      {/* 3D Cylindrical Spatial Arena */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        className="relative w-full h-[520px] sm:h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
        style={{ perspective: "1500px" }}
      >
        {/* Central 3D Holographic Core & Energy Rings */}
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-purple-glow/20 via-cyan-neon/25 to-cute-pink/20 blur-3xl pointer-events-none" />
        
        {/* Orbit Grid Floor Disc */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full border border-cyan-neon/20 opacity-40 pointer-events-none"
          style={{ 
            transform: "rotateX(80deg) translateZ(-120px)",
            background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)"
          }}
        />

        {/* 3D Rotating Video Module Ring */}
        <div
          className="relative w-[300px] sm:w-[360px] h-[430px] sm:h-[480px]"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotationAngle}deg)`,
            transition: isDragging.current ? "none" : "transform 0.85s cubic-bezier(0.2, 0.8, 0.2, 1)"
          }}
        >
          {videoModules.map((module, index) => {
            const itemAngle = index * anglePerItem;
            const isActive = index === activeClipIndex;

            return (
              <div
                key={module.id}
                onClick={() => rotateTo(index)}
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  opacity: isActive ? 1 : 0.55
                }}
              >
                <ThreeDTiltCard
                  maxTilt={14}
                  scale={isActive ? 1.06 : 0.92}
                  className={`w-full h-full glass-panel rounded-[6px] border overflow-hidden flex flex-col justify-between shadow-2xl transition-all ${
                    isActive
                      ? "border-cyan-neon/80 shadow-[0_20px_60px_rgba(0,229,255,0.35)] bg-dark-900/95"
                      : "border-white/15 bg-dark-950/80"
                  }`}
                >
                  {/* Video Viewport Top Box */}
                  <div className="relative h-[220px] sm:h-[260px] overflow-hidden bg-black border-b border-white/10 group">
                    <img
                      src={module.videoThumb}
                      alt={module.title}
                      style={{ filter: videoPresets?.[activePreset]?.filter || "none" }}
                      className="w-full h-full object-cover brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Cyber Scanline Overlay */}
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-25"
                      style={{
                        background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 229, 255, 0.25) 50%)",
                        backgroundSize: "100% 4px"
                      }}
                    />

                    {/* Gradient Fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />

                    {/* Top Tag Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-[3px] border uppercase font-bold ${module.badgeColor}`}>
                        {module.tag}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[2px] bg-dark-950/90 text-white-muted border border-white/10">
                        {module.specs}
                      </span>
                    </div>

                    {/* Center Play Beacon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-12 h-12 rounded-[5px] flex items-center justify-center transition-all ${
                        isActive 
                          ? "bg-gradient-to-r from-purple-deep to-cyan-deep text-white-pure shadow-glow-cyan scale-110 border border-cyan-neon/50" 
                          : "bg-dark-900/80 text-white-dim border border-white/20"
                      }`}>
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                    </div>

                    {/* Bottom Metadata Hook */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded-[3px] bg-dark-900/90 text-cyan-neon border border-cyan-neon/40 font-bold">
                        {module.metric}
                      </span>
                      <span className="text-white-dim">{module.category}</span>
                    </div>
                  </div>

                  {/* Card Details Bottom */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-dark-900/95">
                    <div>
                      <h4 className="font-heading font-extrabold text-base sm:text-lg text-white-pure mb-1.5 leading-snug">
                        {module.title}
                      </h4>
                      <p className="text-white-dim text-xs leading-relaxed font-normal">
                        {module.description}
                      </p>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-purple-mist flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-cyan-neon" /> 3D Master Track
                      </span>
                      <span className="text-cyan-neon font-bold flex items-center gap-1 font-mono text-[11px]">
                        {isActive ? "Active in Orbit" : "Select Module →"}
                      </span>
                    </div>
                  </div>
                </ThreeDTiltCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3D Video Carousel Navigation Bar */}
      <div className="flex items-center gap-4 mt-4 z-20">
        <button
          onClick={handlePrev}
          onMouseEnter={() => setCursor("hover", "PREV")}
          onMouseLeave={() => setCursor("default")}
          className="w-10 h-10 rounded-[5px] bg-dark-900/90 border border-white/20 hover:border-cyan-neon text-white-crisp hover:text-cyan-neon flex items-center justify-center shadow-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Indicator Dots */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-[5px] bg-dark-900/90 border border-white/10">
          {videoModules.map((_, idx) => (
            <button
              key={idx}
              onClick={() => rotateTo(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === activeClipIndex
                  ? "w-7 bg-gradient-to-r from-cyan-neon via-purple-glow to-cute-pink shadow-glow-cyan"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          onMouseEnter={() => setCursor("hover", "NEXT")}
          onMouseLeave={() => setCursor("default")}
          className="w-10 h-10 rounded-[5px] bg-dark-900/90 border border-white/20 hover:border-cyan-neon text-white-crisp hover:text-cyan-neon flex items-center justify-center shadow-lg transition-all"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Active Module Full Spotlight Banner */}
      <div className="w-full max-w-5xl mt-6 p-4 sm:p-5 rounded-[6px] bg-dark-900/90 border border-cyan-neon/30 backdrop-blur-md shadow-glow-cyan/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[5px] bg-gradient-to-tr from-purple-deep to-cyan-deep border border-cyan-neon/40 flex items-center justify-center text-white-pure shrink-0 shadow-glow-cyan">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-[3px] border font-bold ${activeModule.badgeColor}`}>
                ACTIVE: {activeModule.tag}
              </span>
              <span className="text-white-crisp font-heading text-sm sm:text-base font-bold">
                {activeModule.title}
              </span>
            </div>
            <p className="text-white-dim text-xs font-normal max-w-2xl">
              {activeModule.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-mono text-cyan-neon font-bold block">{activeModule.metric}</span>
            <span className="text-[10px] font-mono text-white-muted">{activeModule.specs}</span>
          </div>
          <button
            onClick={() => playSynthSound("success")}
            className="px-4 py-2 rounded-[4px] bg-gradient-to-r from-purple-deep via-purple-electric to-cyan-deep text-white-pure text-xs font-mono font-bold border border-cyan-neon/40 shadow-glow-cyan/40 hover:brightness-110 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>APPLY FORMULA</span>
          </button>
        </div>
      </div>

    </div>
  );
};

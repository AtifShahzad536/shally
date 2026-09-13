import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Play, Pause, RotateCcw, Volume2, Sliders, Sparkles, Film, 
  Layers, Zap, Check, Eye, Compass, Camera, Maximize2 
} from "lucide-react";

export const ThreeVideoStudioStage = ({
  data,
  isPlaying,
  setIsPlaying,
  activePreset,
  setActivePreset,
  videoPresets,
  volumeLevel,
  setVolumeLevel,
  speedMultiplier,
  setSpeedMultiplier,
  playheadRef,
  timecodeRef1,
  timecodeRef2,
  timelineRef,
  handleTimelineClick,
  setActiveClipId,
  playSynthSound,
  setCursor
}) => {
  const stageRef = useRef(null);
  const [cameraAngle, setCameraAngle] = useState("isometric"); // "isometric" | "cockpit" | "flat"
  const [stageTilt, setStageTilt] = useState({ x: 8, y: -6 });
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic Mouse Parallax inside 3D Studio
  const handleMouseMove = (e) => {
    if (!stageRef.current || cameraAngle === "flat") return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    const baseRotX = cameraAngle === "isometric" ? 10 : 18;
    const baseRotY = cameraAngle === "isometric" ? -8 : 0;

    setStageTilt({
      x: baseRotX - y * 14,
      y: baseRotY + x * 18
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cameraAngle === "isometric") setStageTilt({ x: 8, y: -6 });
    else if (cameraAngle === "cockpit") setStageTilt({ x: 16, y: 0 });
    else setStageTilt({ x: 0, y: 0 });
  };

  const isVideoFile = data.videoPreviewUrl && (
    data.videoPreviewUrl.endsWith('.mp4') || 
    data.videoPreviewUrl.endsWith('.webm') || 
    data.videoPreviewUrl.includes('/video/upload/')
  );

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      
      {/* 3D Camera Mode Switcher Toolbar */}
      <div className="flex flex-wrap items-center justify-between w-full max-w-6xl mb-6 px-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-neon animate-ping" />
          <span className="font-mono text-xs text-cyan-neon font-bold uppercase tracking-wider">
            3D Virtual Production Metaverse Suite
          </span>
        </div>

        {/* 3D Camera Angle Selector */}
        <div className="flex items-center bg-dark-900/90 p-1 rounded-[5px] border border-white/15 backdrop-blur-md shadow-glow-purple/20">
          <button
            onClick={() => {
              setCameraAngle("isometric");
              setStageTilt({ x: 8, y: -6 });
              playSynthSound("click");
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-xs font-mono font-bold transition-all ${
              cameraAngle === "isometric"
                ? "bg-gradient-to-r from-purple-deep to-cyan-deep text-white-pure border border-cyan-neon/40 shadow-glow-cyan/30"
                : "text-white-dim hover:text-white-crisp"
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-neon" />
            <span>3D Isometric Angle</span>
          </button>

          <button
            onClick={() => {
              setCameraAngle("cockpit");
              setStageTilt({ x: 16, y: 0 });
              playSynthSound("click");
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-xs font-mono font-bold transition-all ${
              cameraAngle === "cockpit"
                ? "bg-gradient-to-r from-purple-deep to-cute-pink/40 text-white-pure border border-cute-pink/50 shadow-glow-pink/30"
                : "text-white-dim hover:text-white-crisp"
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-cute-pink" />
            <span>3D Cockpit Deck</span>
          </button>

          <button
            onClick={() => {
              setCameraAngle("flat");
              setStageTilt({ x: 0, y: 0 });
              playSynthSound("click");
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-xs font-mono font-bold transition-all ${
              cameraAngle === "flat"
                ? "bg-white/20 text-white-pure border border-white/30"
                : "text-white-dim hover:text-white-crisp"
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Standard 2D</span>
          </button>
        </div>
      </div>

      {/* 3D Viewport Stage Stage Container */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-6xl transition-all duration-500"
        style={{ perspective: "1500px" }}
      >
        {/* Ambient Floor Reflection Halo */}
        <div 
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-32 bg-gradient-to-r from-purple-glow/25 via-cyan-neon/30 to-cute-pink/25 rounded-full blur-3xl pointer-events-none"
          style={{ transform: "rotateX(90deg) translateZ(-40px)" }}
        />

        {/* 3D Rotating Editing Deck Box */}
        <div
          className="relative w-full glass-panel rounded-[6px] border border-white/20 bg-dark-900/95 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${stageTilt.x}deg) rotateY(${stageTilt.y}deg)`,
            transition: isHovered
              ? "transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)"
              : "transform 0.75s cubic-bezier(0.2, 0.8, 0.2, 1)"
          }}
        >
          {/* Top Virtual Deck Toolbar */}
          <div 
            className="bg-dark-950 px-4 py-2.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono"
            style={{ transform: "translateZ(15px)" }}
          >
            <div className="flex items-center gap-2 text-white-muted">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-neon animate-pulse shadow-glow-cyan" />
              <span className="text-white-crisp font-semibold">SHALLY_3D_NLE //</span>
              <span className="text-purple-mist">VIRTUAL_SPACE_PRODUCTION_4K.prproj</span>
            </div>

            <div className="hidden lg:flex items-center gap-2 bg-dark-850 px-2.5 py-1 rounded-[4px] border border-white/10">
              <span className="text-[10px] text-cyan-neon font-bold">SPATIAL RENDERING: ACTIVE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 60 FPS • PRORES 4444
              </span>
              <button
                onClick={() => playSynthSound("success")}
                className="px-3 py-1 rounded-[4px] bg-gradient-to-r from-purple-deep via-purple-electric to-cyan-deep text-white-pure text-[11px] font-bold border border-cyan-neon/40 shadow-glow-cyan/40 hover:brightness-110 transition-all"
              >
                RENDER 3D MASTER
              </button>
            </div>
          </div>

          {/* Main 3D Dual Monitor Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-white/10">
            
            {/* Left 8 Cols: 3D Holographic Screen */}
            <div className="lg:col-span-8 p-4 sm:p-6 bg-dark-950/90 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
              
              {/* Curved 3D Monitor Bezel */}
              <div 
                className="relative aspect-video rounded-[5px] overflow-hidden bg-black border-2 border-cyan-neon/40 group shadow-[0_0_35px_rgba(0,229,255,0.25)] cursor-pointer"
                style={{
                  transform: "translateZ(30px)",
                  transformStyle: "preserve-3d"
                }}
                onMouseEnter={() => setCursor("play", isPlaying ? "PAUSE" : "PLAY")}
                onMouseLeave={() => setCursor("default")}
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  playSynthSound("click");
                }}
              >
                {/* Active Video Player / Image Viewport */}
                {isVideoFile ? (
                  <video
                    src={data.videoPreviewUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ filter: videoPresets[activePreset].filter }}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                ) : (
                  <img
                    src={data.videoPreviewUrl}
                    alt="3D Video Studio Preview"
                    style={{ filter: videoPresets[activePreset].filter }}
                    className="w-full h-full object-cover transition-all duration-300 brightness-95 contrast-105"
                  />
                )}

                {/* Cyber Hologram Scanner Scanline Beam */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 229, 255, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                    backgroundSize: "100% 4px, 6px 100%"
                  }}
                />

                {/* Subtitle / Hook Tag */}
                <div 
                  className="absolute bottom-6 left-6 right-6 flex flex-col items-center text-center pointer-events-none"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <span className="font-heading text-xs sm:text-base md:text-lg font-black tracking-wide text-white-pure uppercase bg-dark-950/85 px-4 py-1.5 rounded-[4px] border border-cyan-neon/50 shadow-glow-cyan">
                    {data.subtitleHookText}
                  </span>
                  <span className="font-mono text-[10px] text-cute-pink mt-1 tracking-widest bg-dark-900/90 px-2 py-0.5 rounded-[3px] border border-cute-pink/30">
                    [3D KINETIC SUBTITLES HOOK ACTIVE]
                  </span>
                </div>

                {/* Top Corner HUD Metadata */}
                <div 
                  className="absolute top-3 left-3 flex items-center gap-2"
                  style={{ transform: "translateZ(35px)" }}
                >
                  <span className="px-2 py-0.5 rounded-[3px] bg-rose-500/90 text-white-pure font-mono text-[10px] font-bold tracking-wider animate-pulse shadow-glow-pink">
                    ● 3D REC LIVE
                  </span>
                  <span className="px-2 py-0.5 rounded-[3px] bg-dark-900/90 text-cyan-neon font-mono text-[10px] border border-cyan-neon/40">
                    4K PRORES
                  </span>
                </div>

                <div 
                  ref={timecodeRef1}
                  style={{ transform: "translateZ(35px)" }}
                  className="absolute top-3 right-3 px-2 py-0.5 rounded-[3px] bg-dark-900/90 text-purple-mist font-mono text-[11px] font-bold border border-purple-glow/40"
                >
                  00:00:12:18
                </div>

                {/* Play Indicator if Paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-dark-950/60 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-16 h-16 rounded-[5px] bg-gradient-to-r from-purple-deep to-cyan-deep text-white-pure flex items-center justify-center shadow-glow-purple border border-white/20">
                      <Play className="w-8 h-8 ml-1 fill-current" />
                    </div>
                  </div>
                )}
              </div>

              {/* Monitor Transport Bar */}
              <div 
                className="mt-4 flex items-center justify-between gap-4"
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      playSynthSound("click");
                    }}
                    className="w-9 h-9 rounded-[4px] bg-gradient-to-r from-purple-deep to-cyan-deep text-white-pure flex items-center justify-center shadow-glow-purple/40 hover:scale-105 transition-transform border border-cyan-neon/30"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
                  </button>

                  <button
                    onClick={() => {
                      playSynthSound("cut");
                    }}
                    className="p-2 rounded-[4px] bg-dark-850 text-white-dim hover:text-white-pure border border-white/10"
                    title="Reset Timeline"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1 bg-dark-850 px-2 py-1 rounded-[4px] border border-white/10 text-[11px] font-mono">
                    <span className="text-white-muted">Speed:</span>
                    {[1, 1.5, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSpeedMultiplier(s);
                          playSynthSound("click");
                        }}
                        className={`px-1.5 py-0.5 rounded-[3px] ${speedMultiplier === s ? "bg-cyan-neon text-dark-950 font-bold" : "text-white-dim hover:text-white-pure"}`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>

                <div 
                  ref={timecodeRef2}
                  className="font-mono text-sm font-bold text-cyan-neon bg-dark-900 px-3 py-1 rounded-[4px] border border-cyan-neon/30 shadow-glow-cyan/20"
                >
                  00:00:12:18 / 00:00:30:00
                </div>
              </div>
            </div>

            {/* Right 4 Cols: 3D Color LUT Deck & Audio Master */}
            <div 
              className="lg:col-span-4 p-4 sm:p-6 bg-dark-900/80 flex flex-col justify-between"
              style={{ transform: "translateZ(25px)" }}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-purple-mist font-bold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-purple-glow" />
                    Color Grade LUTs
                  </span>
                  <span className="text-[10px] font-mono text-cyan-neon bg-cyan-deep/30 px-1.5 py-0.5 rounded-[3px] border border-cyan-neon/30">
                    DaVinci 3D
                  </span>
                </div>

                {/* LUT Preset Buttons */}
                <div className="flex flex-col gap-2.5 mb-6">
                  {Object.entries(videoPresets).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setActivePreset(key);
                        playSynthSound("click");
                      }}
                      className={`p-2.5 rounded-[5px] border text-left transition-all ${
                        activePreset === key
                          ? `${preset.badgeColor} shadow-glow-purple/20`
                          : "bg-dark-850/60 border-white/10 text-white-muted hover:border-white/20 hover:text-white-crisp"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-heading text-xs font-bold">{preset.name}</span>
                        {activePreset === key && <span className="text-[10px] font-mono">ACTIVE</span>}
                      </div>
                      <p className="text-[11px] text-white-dim leading-snug">{preset.description}</p>
                    </button>
                  ))}
                </div>

                {/* Arsenal List */}
                <div className="bg-dark-950 p-3 rounded-[5px] border border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-cute-pink font-bold block mb-2">
                    // 3D VIDEO PRODUCTION ARSENAL
                  </span>
                  <ul className="text-[11px] font-mono text-white-dim space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon" />
                      Dynamic 3D Whip Pans & Speed Ramps
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-glow" />
                      Sub-Bass 808 Audio Frequency Risers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cute-pink" />
                      Multi-Track 3D Spatial Audio Foley
                    </li>
                  </ul>
                </div>
              </div>

              {/* Master Volume Slider */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-white-muted mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-cyan-neon" /> Master Audio
                  </span>
                  <span className="text-cyan-neon font-bold">{volumeLevel}% (-3.2 dB)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volumeLevel}
                  onChange={(e) => setVolumeLevel(Number(e.target.value))}
                  className="w-full h-1.5 bg-dark-800 rounded-[3px] accent-cyan-neon cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* THE 3D MULTI-TRACK NLE TIMELINE (Elevated Z-Depth Tracks) */}
          {/* ============================================================ */}
          <div 
            className="bg-dark-950 p-4 border-t border-white/10"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-white-muted mb-2">
              <div className="flex items-center gap-3">
                <span className="text-white-crisp font-bold">SPATIAL TIMELINE (30s DURATION)</span>
                <span className="text-purple-mist">4 MULTI-LAYER Z-TRACKS</span>
              </div>
              <div className="flex items-center gap-4 text-cyan-ice font-bold">
                <span>00:00:00</span>
                <span>00:00:10</span>
                <span>00:00:20</span>
                <span>00:00:30</span>
              </div>
            </div>

            {/* Timeline Workspace Canvas Container */}
            <div
              ref={timelineRef}
              onClick={handleTimelineClick}
              onMouseEnter={() => setCursor("hover", "SCRUB 3D")}
              onMouseLeave={() => setCursor("default")}
              className="relative bg-dark-900/95 rounded-[5px] border border-white/20 p-3 flex flex-col gap-2.5 cursor-col-resize select-none overflow-hidden shadow-inner"
            >
              {/* Dynamic Laser Playhead Indicator */}
              <div
                ref={playheadRef}
                style={{ left: "42%" }}
                className="absolute top-0 bottom-0 w-[2px] bg-cyan-neon z-30 shadow-[0_0_15px_#00E5FF] pointer-events-none"
              >
                <div className="w-3.5 h-3.5 bg-cyan-neon rotate-45 -ml-[6px] -mt-1 rounded-[1px] shadow-glow-cyan" />
              </div>

              {/* TRACK V2: Motion Graphics & Kinetic Subtitles (Z-Depth +40px) */}
              <div className="flex items-center gap-2">
                <div className="w-16 shrink-0 font-mono text-[10px] text-purple-mist font-bold bg-purple-deep/40 px-2 py-1 rounded-[3px] border border-purple-glow/40 shadow-glow-purple/20">
                  V2 [FX]
                </div>
                <div className="flex-1 grid grid-cols-12 gap-1.5 h-7">
                  <div 
                    onClick={(e) => { e.stopPropagation(); setActiveClipId("fx-hook"); playSynthSound("cut"); }}
                    className="col-span-3 bg-purple-deep/70 hover:bg-purple-deep border border-purple-glow rounded-[3px] px-2 flex items-center justify-between text-[9px] font-mono text-white-pure font-bold transition-all shadow-glow-purple/30 hover:scale-[1.02]"
                  >
                    <span className="truncate">{data.trackV2Label}</span>
                    <Sparkles className="w-2.5 h-2.5 text-cyan-neon shrink-0" />
                  </div>
                  <div 
                    onClick={(e) => { e.stopPropagation(); setActiveClipId("fx-motion"); playSynthSound("cut"); }}
                    className="col-span-5 bg-cute-pink/40 hover:bg-cute-pink/60 border border-cute-pink/50 rounded-[3px] px-2 flex items-center justify-between text-[9px] font-mono text-white-crisp font-bold transition-all hover:scale-[1.02]"
                  >
                    <span>[3D KINETIC SUBTITLES]</span>
                    <span className="text-[8px] opacity-75">100% Retention</span>
                  </div>
                  <div 
                    onClick={(e) => { e.stopPropagation(); setActiveClipId("fx-outro"); playSynthSound("cut"); }}
                    className="col-span-4 bg-cyan-deep/50 hover:bg-cyan-deep border border-cyan-neon/50 rounded-[3px] px-2 flex items-center justify-between text-[9px] font-mono text-white-crisp font-bold transition-all hover:scale-[1.02]"
                  >
                    <span>[CTA OUTRO CARD]</span>
                    <Zap className="w-2.5 h-2.5 text-amber-300 shrink-0" />
                  </div>
                </div>
              </div>

              {/* TRACK V1: Main Video Footage Cuts (Z-Depth +25px) */}
              <div className="flex items-center gap-2">
                <div className="w-16 shrink-0 font-mono text-[10px] text-cyan-ice font-bold bg-cyan-deep/40 px-2 py-1 rounded-[3px] border border-cyan-neon/40 shadow-glow-cyan/20">
                  V1 [4K]
                </div>
                <div className="flex-1 grid grid-cols-12 gap-1.5 h-8">
                  <div 
                    onClick={(e) => { e.stopPropagation(); setActiveClipId("v1-hook"); playSynthSound("cut"); }}
                    className="col-span-3 bg-cyan-900/70 hover:bg-cyan-900 border border-cyan-neon/70 rounded-[3px] px-2 flex items-center justify-between text-[9px] font-mono text-cyan-ice font-bold transition-all shadow-glow-cyan/20 hover:scale-[1.02]"
                  >
                    <span className="truncate">{data.trackV1Label}</span>
                    <span className="text-[8px] bg-cyan-neon/20 px-1 rounded-[2px] shrink-0">4K 60FPS</span>
                  </div>
                  <div 
                    onClick={(e) => { e.stopPropagation(); setActiveClipId("v1-broll"); playSynthSound("cut"); }}
                    className="col-span-5 bg-indigo-900/70 hover:bg-indigo-900 border border-purple-glow/60 rounded-[3px] px-2 flex items-center justify-between text-[9px] font-mono text-purple-mist font-bold transition-all hover:scale-[1.02]"
                  >
                    <span className="truncate">BROLL_MONTAGE_SPEEDRAMP.mp4</span>
                    <span className="text-[8px] bg-purple-glow/30 px-1 rounded-[2px] shrink-0">CINEMATIC</span>
                  </div>
                  <div 
                    onClick={(e) => { e.stopPropagation(); setActiveClipId("v1-cta"); playSynthSound("cut"); }}
                    className="col-span-4 bg-cyan-900/70 hover:bg-cyan-900 border border-cyan-neon/70 rounded-[3px] px-2 flex items-center justify-between text-[9px] font-mono text-cyan-ice font-bold transition-all hover:scale-[1.02]"
                  >
                    <span className="truncate">PRODUCT_HERO_SHOT.mp4</span>
                    <span className="text-[8px] bg-cyan-neon/20 px-1 rounded-[2px] shrink-0">HDR 10-BIT</span>
                  </div>
                </div>
              </div>

              {/* TRACK A1: Sound Effects & Foley */}
              <div className="flex items-center gap-2">
                <div className="w-16 shrink-0 font-mono text-[10px] text-amber-300 font-bold bg-amber-500/20 px-2 py-1 rounded-[3px] border border-amber-400/30">
                  A1 [SFX]
                </div>
                <div className="flex-1 grid grid-cols-12 gap-1.5 h-6">
                  <div className="col-span-3 bg-amber-900/40 border border-amber-400/40 rounded-[3px] px-1.5 flex items-center text-[8px] font-mono text-amber-200 truncate">
                    {data.trackA1Label}
                  </div>
                  <div className="col-span-1 bg-amber-900/40 border border-amber-400/40 rounded-[3px] px-1 flex items-center text-[8px] font-mono text-amber-200">
                    POP
                  </div>
                  <div className="col-span-3 bg-amber-900/40 border border-amber-400/40 rounded-[3px] px-1.5 flex items-center text-[8px] font-mono text-amber-200 truncate">
                    SUB_BASS_DROP
                  </div>
                  <div className="col-span-2 bg-amber-900/40 border border-amber-400/40 rounded-[3px] px-1.5 flex items-center text-[8px] font-mono text-amber-200">
                    CLICK_UI
                  </div>
                  <div className="col-span-3 bg-amber-900/40 border border-amber-400/40 rounded-[3px] px-1.5 flex items-center text-[8px] font-mono text-amber-200">
                    RISER_04
                  </div>
                </div>
              </div>

              {/* TRACK A2: Trending Music Audio Waveform Track */}
              <div className="flex items-center gap-2">
                <div className="w-16 shrink-0 font-mono text-[10px] text-emerald-300 font-bold bg-emerald-500/20 px-2 py-1 rounded-[3px] border border-emerald-400/30">
                  A2 [OST]
                </div>
                <div className="flex-1 bg-emerald-950/50 border border-emerald-500/40 rounded-[3px] h-7 px-2 flex items-center justify-between relative overflow-hidden shadow-inner">
                  
                  {/* Visual Audio Waveform Simulation */}
                  <div className="flex items-center gap-[2px] w-full h-full opacity-80 py-1">
                    {Array.from({ length: 60 }).map((_, i) => {
                      const height = 20 + Math.sin(i * 0.4) * 45 + Math.cos(i * 0.8) * 25;
                      return (
                        <div
                          key={i}
                          style={{ height: `${Math.max(15, height)}%` }}
                          className="w-full rounded-[1px] bg-emerald-400/70"
                        />
                      );
                    })}
                  </div>

                  <span className="absolute right-2 text-[8px] font-mono text-emerald-300 font-bold bg-dark-950/90 px-1.5 py-0.5 rounded-[2px] max-w-[200px] truncate border border-emerald-500/30">
                    {data.trackA2Label}
                  </span>
                </div>
              </div>

            </div>

            {/* Instruction Tip */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-white-muted">
              <span>💡 Hover and move mouse to tilt 3D cockpit angle. Click timeline to scrub in real-time.</span>
              <span className="text-cyan-neon font-bold">100% 3D Audio-Visual Precision</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

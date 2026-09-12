import React, { useState, useEffect, useRef } from "react";
import { 
  Play, Pause, Scissors, Sparkles, Sliders, Volume2, Film, Layers, 
  RotateCcw, Eye, ZoomIn, ZoomOut, Zap, Music, Check
} from "lucide-react";
import { useCursor } from "../../context/CursorContext";

export const VideoWorkspace = ({ soundState, videoData = {} }) => {
  const { playSynthSound } = soundState;
  const { setCursor } = useCursor();

  // Dynamic CMS Fallback Data
  const data = {
    badgeText: videoData.badgeText || "NLE TIMELINE WORKSPACE",
    headlinePrefix: videoData.headlinePrefix || "Crafting",
    headlineHighlight: videoData.headlineHighlight || "Hypnotic Edits",
    headlineSuffix: videoData.headlineSuffix || "Frame by Frame",
    description: videoData.description || "Short-form video editing isn't just cutting clips—it's psychological pacing, rhythmic sound design, speed ramps, and retention engineering.",
    videoPreviewUrl: videoData.videoPreviewUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    subtitleHookText: videoData.subtitleHookText || "“STOP LOSING 70% OF SCROLLERS IN THE FIRST 3 SECONDS.”",
    trackV2Label: videoData.trackV2Label || "[3s HOOK TITLE]",
    trackV1Label: videoData.trackV1Label || "HOOK_CLIP_A.mp4",
    trackA1Label: videoData.trackA1Label || "WHOOSH_01",
    trackA2Label: videoData.trackA2Label || "VIRAL_TIKTOK_AUDIO_TREND.wav (128 BPM)"
  };

  const isVideoFile = data.videoPreviewUrl && (
    data.videoPreviewUrl.endsWith('.mp4') || 
    data.videoPreviewUrl.endsWith('.webm') || 
    data.videoPreviewUrl.includes('/video/upload/')
  );

  const [isPlaying, setIsPlaying] = useState(true);
  const [activeClipId, setActiveClipId] = useState("clip-v1-hook");
  const [activePreset, setActivePreset] = useState("luxe-cyber");
  const [volumeLevel, setVolumeLevel] = useState(85);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  // References for direct 60fps DOM animation (Zero React Re-render Lag!)
  const playheadRef = useRef(null);
  const timecodeRef1 = useRef(null);
  const timecodeRef2 = useRef(null);
  const timelineRef = useRef(null);
  const playheadPos = useRef(42);

  // Smooth Direct DOM Animation Loop
  useEffect(() => {
    let animationFrame;
    if (isPlaying) {
      const step = () => {
        playheadPos.current += 0.12 * speedMultiplier;
        if (playheadPos.current >= 99.5) playheadPos.current = 0;

        const pos = playheadPos.current;
        if (playheadRef.current) {
          playheadRef.current.style.left = `${pos}%`;
        }

        const sec = Math.floor((pos * 0.3) % 60).toString().padStart(2, "0");
        const frm = Math.floor((pos * 1.8) % 60).toString().padStart(2, "0");
        const tc = `00:00:${sec}:${frm}`;

        if (timecodeRef1.current) timecodeRef1.current.textContent = tc;
        if (timecodeRef2.current) timecodeRef2.current.textContent = `${tc} / 00:00:30:00`;

        animationFrame = requestAnimationFrame(step);
      };
      animationFrame = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, speedMultiplier]);

  const handleTimelineClick = (e) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(99.5, (clickX / rect.width) * 100));
    playheadPos.current = percentage;

    if (playheadRef.current) {
      playheadRef.current.style.left = `${percentage}%`;
    }
    playSynthSound("cut");
  };

  const videoPresets = {
    "luxe-cyber": {
      name: "Luxe Cyberpunk",
      filter: "contrast(115%) saturate(130%) hue-rotate(330deg)",
      badgeColor: "bg-cyan-neon/20 text-cyan-neon border-cyan-neon/30",
      description: "Deep obsidian shadows with neon cyan highlights & purple rim glow."
    },
    "film-vintage": {
      name: "35mm Film Grain",
      filter: "contrast(105%) sepia(20%) saturate(110%) brightness(95%)",
      badgeColor: "bg-amber-400/20 text-amber-300 border-amber-400/30",
      description: "Warm organic tones, soft film roll highlights, and subtle vintage texture."
    },
    "hyper-speed": {
      name: "High-Energy Kinetic",
      filter: "contrast(125%) saturate(145%) brightness(105%)",
      badgeColor: "bg-purple-glow/20 text-purple-soft border-purple-glow/30",
      description: "Punchy contrast, crisp motion blur, tuned for viral 3-second short-form hooks."
    }
  };

  return (
    <section id="video-studio" className="relative py-28 bg-dark-950/90 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-cyan-neon/10 border border-cyan-neon/30 text-cyan-neon text-xs font-mono font-medium mb-3">
              <Film className="w-3.5 h-3.5" />
              <span>{data.badgeText}</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white-pure tracking-tight">
              {data.headlinePrefix} <span className="text-gradient-electric">{data.headlineHighlight}</span> {data.headlineSuffix}
            </h2>
          </div>
          <p className="text-white-dim text-sm max-w-md mt-4 md:mt-0 font-normal">
            {data.description}
          </p>
        </div>

        {/* ============================================================ */}
        {/* THE VIDEO EDITING WORKSPACE CONTAINER (5px Sharp-Modern Radius) */}
        {/* ============================================================ */}
        <div className="glass-panel rounded-[5px] border border-white/15 bg-dark-900/90 shadow-2xl overflow-hidden">
          
          {/* Top Menu / Workspace Toolbar */}
          <div className="bg-dark-950/95 px-4 py-2.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            
            {/* Left: Project File Breadcrumb */}
            <div className="flex items-center gap-2 text-white-muted">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-neon animate-pulse" />
              <span className="text-white-crisp font-semibold">SHALLY_PRO_SUITE //</span>
              <span className="text-purple-mist">PROJECT_VIRAL_COMMERCIAL_4K.prproj</span>
            </div>

            {/* Middle: Tool Mode Chips */}
            <div className="hidden lg:flex items-center gap-1.5 bg-dark-850 px-2 py-1 rounded-[5px] border border-white/10">
              <button 
                onClick={() => playSynthSound("cut")}
                className="px-2 py-0.5 rounded-[3px] bg-purple-deep/40 text-purple-soft font-bold border border-purple-glow/30 flex items-center gap-1"
              >
                <Scissors className="w-3 h-3" /> CUT [C]
              </button>
              <button 
                onClick={() => playSynthSound("click")}
                className="px-2 py-0.5 rounded-[3px] text-white-dim hover:text-white-pure hover:bg-white/5 flex items-center gap-1"
              >
                <Layers className="w-3 h-3" /> SLIP [Y]
              </button>
              <button 
                onClick={() => playSynthSound("click")}
                className="px-2 py-0.5 rounded-[3px] text-white-dim hover:text-white-pure hover:bg-white/5 flex items-center gap-1"
              >
                <Sliders className="w-3 h-3" /> COLOR [L]
              </button>
              <button 
                onClick={() => playSynthSound("click")}
                className="px-2 py-0.5 rounded-[3px] text-white-dim hover:text-white-pure hover:bg-white/5 flex items-center gap-1"
              >
                <Music className="w-3 h-3" /> SFX FOLEY
              </button>
            </div>

            {/* Right: Render / Export Badge */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 60 FPS • PRORES 4444
              </span>
              <button
                onClick={() => playSynthSound("success")}
                className="px-3 py-1 rounded-[5px] bg-gradient-to-r from-purple-deep to-cyan-deep text-white-pure text-[11px] font-bold border border-cyan-neon/40 shadow-glow-cyan/30 hover:brightness-110 transition-all"
              >
                EXPORT MASTER
              </button>
            </div>
          </div>

          {/* Main Monitor & Control Panels Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-white/10">
            
            {/* Left 8 Cols: Video Preview Monitor */}
            <div className="lg:col-span-8 p-4 sm:p-6 bg-dark-950 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
              
              {/* Monitor Screen Frame */}
              <div 
                className="relative aspect-video rounded-[4px] overflow-hidden bg-black border border-white/15 group shadow-inner cursor-pointer"
                onMouseEnter={() => setCursor("play", isPlaying ? "PAUSE" : "PLAY")}
                onMouseLeave={() => setCursor("default")}
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  playSynthSound("click");
                }}
              >
                {/* Active Video Mock Canvas / Video Player */}
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
                    alt="Video Workspace Preview"
                    style={{ filter: videoPresets[activePreset].filter }}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                )}

                {/* Cyberpunk Grid / Rule of Thirds Overlay */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20 border border-white/10">
                  <div className="border-r border-b border-white/20" />
                  <div className="border-r border-b border-white/20" />
                  <div className="border-b border-white/20" />
                  <div className="border-r border-b border-white/20" />
                  <div className="border-r border-b border-white/20" />
                  <div className="border-b border-white/20" />
                  <div className="border-r border-b border-white/20" />
                  <div className="border-r border-b border-white/20" />
                  <div />
                </div>

                {/* Subtitle / Hook Tag */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col items-center text-center pointer-events-none">
                  <span className="font-heading text-xs sm:text-base md:text-lg font-black tracking-wide text-white-pure uppercase bg-dark-950/80 px-3 py-1 rounded-[4px] border border-cyan-neon/40 shadow-glow-cyan/40">
                    {data.subtitleHookText}
                  </span>
                  <span className="font-mono text-[10px] text-cute-pink mt-1 tracking-widest bg-dark-900/90 px-2 py-0.5 rounded-[3px]">
                    [KINETIC POP-UP SUBTITLES ACTIVE]
                  </span>
                </div>

                {/* Top Corner HUD Metadata */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-[3px] bg-rose-500/80 text-white-pure font-mono text-[10px] font-bold tracking-wider animate-pulse">
                    ● REC PREVIEW
                  </span>
                  <span className="px-2 py-0.5 rounded-[3px] bg-dark-900/80 text-cyan-neon font-mono text-[10px] border border-cyan-neon/30">
                    4K ULTRA HD
                  </span>
                </div>

                <div 
                  ref={timecodeRef1}
                  className="absolute top-3 right-3 px-2 py-0.5 rounded-[3px] bg-dark-900/90 text-purple-mist font-mono text-[11px] font-bold border border-purple-glow/30"
                >
                  00:00:12:18
                </div>

                {/* Central Play Indicator if Paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-dark-950/50 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-14 h-14 rounded-[5px] bg-purple-glow text-white-pure flex items-center justify-center shadow-glow-purple">
                      <Play className="w-7 h-7 ml-1 fill-current" />
                    </div>
                  </div>
                )}
              </div>

              {/* Monitor Scrubbing & Playback Bar */}
              <div className="mt-4 flex items-center justify-between gap-4">
                
                {/* Transport Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      playSynthSound("click");
                    }}
                    className="w-9 h-9 rounded-[5px] bg-purple-deep text-white-pure flex items-center justify-center shadow-glow-purple/40 hover:scale-105 transition-transform"
                    aria-label={isPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
                  </button>

                  <button
                    onClick={() => {
                      playheadPos.current = 0;
                      if (playheadRef.current) playheadRef.current.style.left = "0%";
                      playSynthSound("cut");
                    }}
                    className="p-2 rounded-[5px] bg-dark-850 text-white-dim hover:text-white-pure border border-white/10"
                    title="Reset to 00:00"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1 bg-dark-850 px-2 py-1 rounded-[5px] border border-white/10 text-[11px] font-mono">
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

                {/* Live Timecode Gauge */}
                <div 
                  ref={timecodeRef2}
                  className="font-mono text-sm font-bold text-cyan-neon bg-dark-900 px-3 py-1 rounded-[4px] border border-cyan-neon/30"
                >
                  00:00:12:18 / 00:00:30:00
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Color Grading & Motion FX Inspector */}
            <div className="lg:col-span-4 p-4 sm:p-6 bg-dark-900/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-purple-mist font-bold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-purple-glow" />
                    Color Grade LUTs
                  </span>
                  <span className="text-[10px] font-mono text-cyan-neon">DaVinci Engine</span>
                </div>

                {/* LUT Preset Switcher */}
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

                {/* Short-Form Retention Features Checklist */}
                <div className="bg-dark-950 p-3 rounded-[5px] border border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-cute-pink font-bold block mb-2">
                    // SHALLY'S EDITING ARSENAL
                  </span>
                  <ul className="text-[11px] font-mono text-white-dim space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon" />
                      Dynamic Whip Pans & Zoom Cuts
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-glow" />
                      Custom Subtitle Karaoke Tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cute-pink" />
                      Bass Riser & Foley Audio Immersion
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Aesthetic 9:16 Mobile Framing
                    </li>
                  </ul>
                </div>
              </div>

              {/* Master Volume Meter */}
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
          {/* THE MULTI-TRACK NLE TIMELINE (Interactive & Scrubbable) */}
          {/* ============================================================ */}
          <div className="bg-dark-950 p-4 border-t border-white/10">
            
            {/* Timeline Header & Scale Bar */}
            <div className="flex items-center justify-between text-[10px] font-mono text-white-muted mb-2">
              <div className="flex items-center gap-3">
                <span className="text-white-crisp font-bold">TIMELINE (30s DURATION)</span>
                <span className="text-purple-mist">TRACKS: 4 ACTIVE</span>
              </div>
              <div className="flex items-center gap-4">
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
              onMouseEnter={() => setCursor("hover", "SCRUB")}
              onMouseLeave={() => setCursor("default")}
              className="relative bg-dark-900/90 rounded-[4px] border border-white/15 p-2.5 flex flex-col gap-2 cursor-col-resize select-none overflow-hidden"
            >
              {/* Dynamic Playhead Indicator via DOM Ref */}
              <div
                ref={playheadRef}
                style={{ left: "42%" }}
                className="absolute top-0 bottom-0 w-[2px] bg-cyan-neon z-30 shadow-[0_0_12px_#00E5FF] pointer-events-none"
              >
                <div className="w-3 h-3 bg-cyan-neon rotate-45 -ml-[5px] -mt-1 rounded-[1px] shadow-glow-cyan" />
              </div>

              {/* TRACK V2: Motion Graphics & Kinetic Subtitles */}
              <div className="flex items-center gap-2">
                <div className="w-14 shrink-0 font-mono text-[10px] text-purple-mist font-bold bg-purple-deep/30 px-1.5 py-1 rounded-[3px] border border-purple-glow/30">
                  V2 [FX]
                </div>
                <div className="flex-1 grid grid-cols-12 gap-1.5 h-7">
                  <div 
                    onClick={(e) => { e.stopPropagation(); setActiveClipId("fx-hook"); playSynthSound("cut"); }}
                    className="col-span-3 bg-purple-deep/60 hover:bg-purple-deep border border-purple-glow rounded-[3px] px-2 flex items-center justify-between text-[9px] font-mono text-white-pure font-bold transition-all shadow-glow-purple/20"
                  >
                    <span className="truncate">{data.trackV2Label}</span>
                    <Sparkles className="w-2.5 h-2.5 text-cyan-neon shrink-0" />
                  </div>
                  <div 
                    onClick={(e) => { e.stopPropagation(); setActiveClipId("fx-motion"); playSynthSound("cut"); }}
                    className="col-span-5 bg-cute-pink/40 hover:bg-cute-pink/60 border border-cute-pink/50 rounded-[3px] px-2 flex items-center justify-between text-[9px] font-mono text-white-crisp font-bold transition-all"
                  >
                    <span>[KINETIC SUBTITLES]</span>
                    <span className="text-[8px] opacity-75">100% Retentive</span>
                  </div>
                  <div 
                    onClick={(e) => { e.stopPropagation(); setActiveClipId("fx-outro"); playSynthSound("cut"); }}
                    className="col-span-4 bg-cyan-deep/50 hover:bg-cyan-deep border border-cyan-neon/50 rounded-[3px] px-2 flex items-center justify-between text-[9px] font-mono text-white-crisp font-bold transition-all"
                  >
                    <span>[CTA OUTRO CARD]</span>
                    <Zap className="w-2.5 h-2.5 text-amber-300 shrink-0" />
                  </div>
                </div>
              </div>

              {/* TRACK V1: Main Video Footage Cuts */}
              <div className="flex items-center gap-2">
                <div className="w-14 shrink-0 font-mono text-[10px] text-cyan-ice font-bold bg-cyan-deep/30 px-1.5 py-1 rounded-[3px] border border-cyan-neon/30">
                  V1 [4K]
                </div>
                <div className="flex-1 grid grid-cols-12 gap-1.5 h-8">
                  <div 
                    onClick={(e) => { e.stopPropagation(); setActiveClipId("v1-hook"); playSynthSound("cut"); }}
                    className="col-span-3 bg-cyan-900/60 hover:bg-cyan-900 border border-cyan-neon/60 rounded-[3px] px-2 flex items-center justify-between text-[9px] font-mono text-cyan-ice font-bold transition-all"
                  >
                    <span className="truncate">{data.trackV1Label}</span>
                    <span className="text-[8px] bg-cyan-neon/20 px-1 rounded-[2px] shrink-0">4K</span>
                  </div>
                  <div 
                    onClick={(e) => { e.stopPropagation(); setActiveClipId("v1-broll"); playSynthSound("cut"); }}
                    className="col-span-5 bg-indigo-900/60 hover:bg-indigo-900 border border-purple-glow/50 rounded-[3px] px-2 flex items-center justify-between text-[9px] font-mono text-purple-mist font-bold transition-all"
                  >
                    <span className="truncate">BROLL_MONTAGE_SPEEDRAMP.mp4</span>
                    <span className="text-[8px] bg-purple-glow/20 px-1 rounded-[2px] shrink-0">60FPS</span>
                  </div>
                  <div 
                    onClick={(e) => { e.stopPropagation(); setActiveClipId("v1-cta"); playSynthSound("cut"); }}
                    className="col-span-4 bg-cyan-900/60 hover:bg-cyan-900 border border-cyan-neon/60 rounded-[3px] px-2 flex items-center justify-between text-[9px] font-mono text-cyan-ice font-bold transition-all"
                  >
                    <span className="truncate">PRODUCT_HERO_SHOT.mp4</span>
                    <span className="text-[8px] bg-cyan-neon/20 px-1 rounded-[2px] shrink-0">HDR</span>
                  </div>
                </div>
              </div>

              {/* TRACK A1: Sound Effects & Foley */}
              <div className="flex items-center gap-2">
                <div className="w-14 shrink-0 font-mono text-[10px] text-amber-300 font-bold bg-amber-500/20 px-1.5 py-1 rounded-[3px] border border-amber-400/30">
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
                <div className="w-14 shrink-0 font-mono text-[10px] text-emerald-300 font-bold bg-emerald-500/20 px-1.5 py-1 rounded-[3px] border border-emerald-400/30">
                  A2 [OST]
                </div>
                <div className="flex-1 bg-emerald-950/40 border border-emerald-500/30 rounded-[3px] h-7 px-2 flex items-center justify-between relative overflow-hidden">
                  
                  {/* Visual Audio Waveform Simulation */}
                  <div className="flex items-center gap-[2px] w-full h-full opacity-80 py-1">
                    {Array.from({ length: 60 }).map((_, i) => {
                      const height = 20 + Math.sin(i * 0.4) * 45 + Math.cos(i * 0.8) * 25;
                      return (
                        <div
                          key={i}
                          style={{ height: `${Math.max(15, height)}%` }}
                          className="w-full rounded-[1px] bg-emerald-400/60"
                        />
                      );
                    })}
                  </div>

                  <span className="absolute right-2 text-[8px] font-mono text-emerald-300 font-bold bg-dark-950/80 px-1.5 py-0.5 rounded-[2px] max-w-[200px] truncate">
                    {data.trackA2Label}
                  </span>
                </div>
              </div>

            </div>

            {/* Instruction Tip */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-white-muted">
              <span>💡 Click anywhere along the timeline to scrub playhead in real time.</span>
              <span className="text-purple-soft font-bold">100% Precision Sync</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

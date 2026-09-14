import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Film, 
  Layers, Zap, Check, Eye, Compass, Camera, Maximize2, 
  Flame, Sliders, Activity, Disc, Radio
} from "lucide-react";

export const ThreeSpatialVideoChamber = ({
  data,
  soundState,
  setCursor
}) => {
  const { playSynthSound } = soundState || { playSynthSound: () => {} };
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  // States
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeGrade, setActiveGrade] = useState("cyber");
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [activeSoundPad, setActiveSoundPad] = useState(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Direct DOM Timecode & Playhead
  const timecodeRef = useRef(null);
  const playheadRef = useRef(null);
  const playPos = useRef(38);

  // Sync Video Play / Pause with state
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy fallback
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  // Sync Video Speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speedMultiplier;
    }
  }, [speedMultiplier]);

  // Sync Video Mute
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Time update sync from video
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      const p = (cur / dur) * 100;
      playPos.current = p;
      if (playheadRef.current) playheadRef.current.style.left = `${p}%`;

      const min = Math.floor(cur / 60).toString().padStart(2, "0");
      const sec = Math.floor(cur % 60).toString().padStart(2, "0");
      const frm = Math.floor((cur % 1) * 30).toString().padStart(2, "0");
      if (timecodeRef.current) timecodeRef.current.textContent = `00:${min}:${sec}:${frm}`;
    }
  };

  const seekToPercent = (p) => {
    playPos.current = p;
    if (playheadRef.current) playheadRef.current.style.left = `${p}%`;
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = (p / 100) * videoRef.current.duration;
    }
  };

  // Direct Zero-Lag Scroll Tracking synced with Lenis
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Fast GPU-Accelerated 120FPS Fly-In Assembly
  const centerScale = useTransform(scrollYProgress, [0.1, 0.45, 0.85], [0.85, 1, 0.92]);
  const centerOpacity = useTransform(scrollYProgress, [0.08, 0.3], [0.4, 1]);

  const leftX = useTransform(scrollYProgress, [0.1, 0.45, 0.85], [-160, 0, -80]);
  const leftOpacity = useTransform(scrollYProgress, [0.08, 0.35], [0, 1]);

  const rightX = useTransform(scrollYProgress, [0.1, 0.45, 0.85], [160, 0, 80]);
  const rightOpacity = useTransform(scrollYProgress, [0.08, 0.35], [0, 1]);

  const bottomY = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [120, 0, 60]);
  const bottomOpacity = useTransform(scrollYProgress, [0.12, 0.4], [0, 1]);

  // Lightweight Three.js Background Canvas with Intersection Observer
  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return;
    const canvas = canvasRef.current;
    const width = canvas.clientWidth || 800;
    const height = canvas.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));

    // Tunnel Rings
    const ringGroup = new THREE.Group();
    const ringGeometry = new THREE.TorusGeometry(12, 0.06, 8, 36);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00E5FF,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });

    for (let i = 0; i < 4; i++) {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.z = -i * 12;
      ring.scale.set(1 + i * 0.15, 1 + i * 0.15, 1);
      ringGroup.add(ring);
    }
    scene.add(ringGroup);

    let reqId;
    const startTime = performance.now();
    let isVisible = true;

    // IntersectionObserver to pause loop when offscreen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);

    const renderLoop = () => {
      reqId = requestAnimationFrame(renderLoop);
      if (!isVisible) return;

      const elapsed = (performance.now() - startTime) * 0.001;
      ringGroup.rotation.z = elapsed * 0.1;
      ringGroup.position.z = (elapsed * 3) % 12;

      renderer.render(scene, camera);
    };
    renderLoop();

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      renderer.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
    };
  }, []);

  const colorGrades = {
    cyber: {
      name: "Cyberpunk 2099",
      filter: "contrast(125%) saturate(145%) hue-rotate(15deg)",
      badge: "NEON MATRIX",
    },
    cyberpunk: {
      name: "Cyberpunk 2099",
      filter: "contrast(125%) saturate(145%) hue-rotate(15deg)",
      badge: "NEON MATRIX",
    },
    cinematic: {
      name: "Teal & Orange Blockbuster",
      filter: "contrast(115%) saturate(125%) sepia(10%) hue-rotate(-10deg)",
      badge: "ARRI ALEXA 35",
    },
    noir: {
      name: "High-Contrast Monochrome",
      filter: "contrast(140%) grayscale(100%) brightness(95%)",
      badge: "NOIR 4K",
    },
    vintage: {
      name: "35mm Kodak Grain",
      filter: "contrast(105%) saturate(110%) sepia(25%)",
      badge: "KODAK FILM",
    },
    raw: {
      name: "Raw Flat Log (Before)",
      filter: "contrast(80%) saturate(60%) brightness(105%)",
      badge: "LOG C S-GAMUT",
    }
  };

  const soundPads = [
    { id: "sub", name: "808 Sub Drop", sound: "success", freq: "40 Hz" },
    { id: "whoosh", name: "Whip Whoosh", sound: "cut", freq: "2.4 kHz" },
    { id: "pop", name: "Dopamine Pop", sound: "click", freq: "8.1 kHz" },
    { id: "riser", name: "Pitch Riser", sound: "hover", freq: "12 kHz" }
  ];

  const defaultDemoVideo = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";
  const rawUrl = data.videoPreviewUrl;
  const isMixkitOrInvalid = !rawUrl || rawUrl.includes("mixkit.co") || rawUrl.endsWith(".png") || rawUrl.endsWith(".jpg") || rawUrl.endsWith(".jpeg") || rawUrl.endsWith(".webp");
  const activeVideoUrl = isMixkitOrInvalid ? defaultDemoVideo : rawUrl;

  const [currentVideoSrc, setCurrentVideoSrc] = useState(activeVideoUrl);
  useEffect(() => {
    setCurrentVideoSrc(activeVideoUrl);
  }, [activeVideoUrl]);

  return (
    <section 
      ref={sectionRef}
      id="video-studio" 
      className="relative min-h-screen py-24 bg-dark-950 overflow-hidden select-none"
    >
      {/* 3D WebGL Background Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
      />

      {/* Cyber Grid Floor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,229,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-gradient-to-r from-purple-deep/50 to-cyan-deep/50 border border-cyan-neon/40 text-cyan-neon text-xs font-mono font-bold mb-3 shadow-glow-cyan/20">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{data.badgeText}</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white-pure tracking-tight">
            {data.headlinePrefix} <span className="text-gradient-electric">{data.headlineHighlight}</span> {data.headlineSuffix}
          </h2>
          <p className="text-white-dim text-sm sm:text-base mt-3 font-normal leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* ULTRA-SMOOTH 120FPS VIDEO STUDIO ASSEMBLY */}
        {/* ========================================================================= */}
        <div className="relative w-full min-h-[640px] flex items-center justify-center">
          
          {/* 1. LEFT FLYING WING: TACTILE AUDIO SOUND FOLEY TOWER */}
          <motion.div
            style={{
              x: leftX,
              opacity: leftOpacity,
            }}
            className="hidden lg:flex flex-col gap-3 absolute -left-2 w-72 p-4 rounded-[10px] bg-dark-900/95 border border-cute-pink/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-cute-pink animate-pulse" />
                <span className="font-heading text-xs font-bold text-white-pure">3D Foley Station</span>
              </div>
              <span className="text-[9px] font-mono text-cute-pink bg-cute-pink/20 px-1.5 py-0.5 rounded-[2px] font-bold">
                24-BIT 48k
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {soundPads.map((pad) => (
                <button
                  key={pad.id}
                  onClick={() => {
                    setActiveSoundPad(pad.id);
                    playSynthSound?.(pad.sound);
                    setTimeout(() => setActiveSoundPad(null), 300);
                  }}
                  className={`p-2.5 rounded-[6px] border text-left transition-all ${
                    activeSoundPad === pad.id
                      ? "border-cute-pink bg-cute-pink/30 scale-95 shadow-glow-pink"
                      : "bg-dark-950/70 border-white/10 text-white-crisp hover:border-cute-pink/40 hover:scale-105"
                  }`}
                >
                  <span className="font-heading text-[11px] font-bold block">{pad.name}</span>
                  <span className="font-mono text-[9px] text-white-muted">{pad.freq}</span>
                </button>
              ))}
            </div>

            {/* Audio Waveform Spectrum */}
            <div className="mt-1 p-2 bg-dark-950 rounded-[4px] border border-white/10 flex items-center justify-between gap-1 h-8">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  style={{ height: `${20 + Math.sin(i * 0.5 + playPos.current * 0.1) * 60}%` }}
                  className="w-1 bg-gradient-to-t from-purple-glow to-cute-pink rounded-full transition-all duration-75"
                />
              ))}
            </div>
          </motion.div>

          {/* 2. CENTER PROJECTION MONITOR */}
          <motion.div
            style={{
              scale: centerScale,
              opacity: centerOpacity,
            }}
            className="relative w-full max-w-2xl rounded-[10px] sm:rounded-[12px] bg-dark-900/95 border-2 border-cyan-neon/50 p-2 sm:p-4 shadow-[0_25px_80px_rgba(0,0,0,0.9)] z-30"
          >
            {/* Monitor Top Bezel HUD */}
            <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-white/10 text-[10px] sm:text-xs font-mono mb-2 sm:mb-3">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-neon animate-ping shrink-0" />
                <span className="text-white-crisp font-bold uppercase tracking-wider text-[9px] sm:text-xs truncate">
                  SHALLY_3D_CORE // 4K
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <span className="px-1.5 sm:px-2 py-0.5 rounded-[3px] bg-cyan-deep/40 border border-cyan-neon/40 text-cyan-neon text-[8.5px] sm:text-[10px] font-bold">
                  {colorGrades[activeGrade]?.badge || "ACES CC"}
                </span>
                <span ref={timecodeRef} className="text-purple-mist font-bold text-[9px] sm:text-xs">
                  00:00:12:18
                </span>
              </div>
            </div>

            {/* Video Viewport */}
            <div 
              className="relative aspect-video rounded-[6px] sm:rounded-[8px] overflow-hidden bg-black border border-cyan-neon/40 group cursor-pointer"
              onClick={() => {
                setIsPlaying(!isPlaying);
                playSynthSound?.("click");
              }}
              onMouseEnter={() => setCursor?.("play", isPlaying ? "PAUSE" : "PLAY")}
              onMouseLeave={() => setCursor?.("default")}
            >
              <video
                key={currentVideoSrc}
                ref={videoRef}
                src={currentVideoSrc}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                onError={() => {
                  if (currentVideoSrc !== defaultDemoVideo) {
                    setCurrentVideoSrc(defaultDemoVideo);
                  }
                }}
                onTimeUpdate={handleTimeUpdate}
                style={{ filter: colorGrades[activeGrade]?.filter || "none" }}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Subtitle / Hook Tag */}
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex flex-col items-center text-center pointer-events-none">
                <span className="font-heading text-[9px] sm:text-sm font-black tracking-wide text-white-pure uppercase bg-dark-950/90 px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-[4px] border border-cyan-neon/50 shadow-glow-cyan line-clamp-1 sm:line-clamp-none">
                  {data.subtitleHookText}
                </span>
                <span className="font-mono text-[7.5px] sm:text-[9px] text-cute-pink mt-0.5 sm:mt-1 tracking-widest bg-dark-900/90 px-1.5 sm:px-2 py-0.5 rounded-[3px] border border-cute-pink/30">
                  [3D SPATIAL KINETIC ENGINE]
                </span>
              </div>

              {!isPlaying && (
                <div className="absolute inset-0 bg-dark-950/60 flex items-center justify-center">
                  <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-[8px] bg-gradient-to-r from-purple-deep to-cyan-deep text-white-pure flex items-center justify-center shadow-glow-purple border border-white/20">
                    <Play className="w-5 sm:w-7 h-5 sm:h-7 ml-0.5 sm:ml-1 fill-current" />
                  </div>
                </div>
              )}
            </div>

            {/* Transport Controls */}
            <div className="mt-2.5 sm:mt-3 flex items-center justify-between text-xs font-mono gap-1.5 sm:gap-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    playSynthSound?.("click");
                  }}
                  className="px-2 sm:px-3 py-1 rounded-[4px] bg-gradient-to-r from-purple-deep to-cyan-deep text-white-pure font-bold border border-cyan-neon/40 shadow-glow-cyan/30 flex items-center gap-1 hover:brightness-110 text-[9px] sm:text-xs"
                >
                  {isPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />}
                  <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
                </button>

                <button
                  onClick={() => {
                    seekToPercent(0);
                    playSynthSound?.("cut");
                  }}
                  className="p-1 sm:p-1.5 rounded-[3px] bg-dark-850 hover:bg-dark-800 text-white-dim hover:text-white-pure border border-white/10"
                  title="Restart Clip"
                >
                  <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>

                {/* Audio Sound Toggle */}
                <button
                  onClick={() => {
                    setIsMuted(!isMuted);
                    playSynthSound?.("click");
                  }}
                  className={`px-1.5 sm:px-2.5 py-1 rounded-[4px] font-bold border flex items-center gap-1 sm:gap-1.5 transition-all text-[9px] sm:text-xs ${
                    !isMuted 
                      ? "bg-cute-pink/30 border-cute-pink text-cute-pink shadow-glow-pink" 
                      : "bg-dark-850 hover:bg-dark-800 text-white-muted border-white/10"
                  }`}
                  title={isMuted ? "Unmute Video Sound" : "Mute Video Sound"}
                >
                  {isMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cute-pink animate-pulse" />}
                  <span className="text-[8.5px] sm:text-[10px]">{isMuted ? "MUTED" : "SOUND"}</span>
                </button>
              </div>

              <div className="flex items-center gap-0.5 sm:gap-1 bg-dark-850 px-1.5 sm:px-2 py-1 rounded-[4px] border border-white/10 shrink-0">
                <span className="text-[8.5px] sm:text-[10px] text-white-muted hidden sm:inline">Speed:</span>
                {[1, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSpeedMultiplier(s);
                      playSynthSound?.("click");
                    }}
                    className={`px-1 sm:px-1.5 py-0.5 rounded-[2px] text-[8.5px] sm:text-[10px] font-bold ${
                      speedMultiplier === s 
                        ? "bg-cyan-neon text-dark-950" 
                        : "text-white-dim hover:text-white-crisp"
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 3. RIGHT FLYING WING: DAVINCI COLOR GRADE ORB STATION */}
          <motion.div
            style={{
              x: rightX,
              opacity: rightOpacity,
            }}
            className="hidden lg:flex flex-col gap-3 absolute -right-2 w-72 p-4 rounded-[10px] bg-dark-900/95 border border-purple-glow/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-glow" />
                <span className="font-heading text-xs font-bold text-white-pure">DaVinci 3D LUTs</span>
              </div>
              <span className="text-[9px] font-mono text-cyan-neon bg-cyan-deep/30 px-1.5 py-0.5 rounded-[2px] font-bold">
                ACES CC
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {Object.entries(colorGrades).map(([key, grade]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveGrade(key);
                    playSynthSound?.("click");
                  }}
                  className={`p-2.5 rounded-[6px] border text-left transition-all ${
                    activeGrade === key
                      ? "bg-dark-800 border-cyan-neon text-white-pure shadow-glow-cyan/30 scale-[1.02]"
                      : "bg-dark-950/70 border-white/10 text-white-muted hover:border-white/20 hover:text-white-crisp"
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-heading text-xs font-bold">{grade.name}</span>
                    {activeGrade === key && <span className="text-[9px] font-mono text-cyan-neon">● ACTIVE</span>}
                  </div>
                  <span className="text-[9px] font-mono text-purple-mist">{grade.badge}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* 4. BOTTOM ELEVATED NLE TIMELINE DECK */}
          <motion.div
            style={{
              y: bottomY,
              opacity: bottomOpacity,
            }}
            className="absolute -bottom-24 w-full max-w-4xl p-2.5 sm:p-4 rounded-[8px] sm:rounded-[10px] bg-dark-900/95 border border-cyan-neon/30 shadow-[0_30px_90px_rgba(0,0,0,0.95)] z-40"
          >
            <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-white-muted mb-1.5 sm:mb-2 gap-1 overflow-hidden">
              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                <span className="text-white-crisp font-bold whitespace-nowrap">NLE TIMELINE DECK</span>
                <span className="text-purple-mist hidden sm:inline whitespace-nowrap">4 MULTI-DEPTH Z-TRACKS</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 text-cyan-ice font-bold whitespace-nowrap text-[8px] sm:text-[10px]">
                <span>00:00</span>
                <span>00:10</span>
                <span>00:20</span>
                <span className="hidden sm:inline">00:30</span>
              </div>
            </div>

            {/* Timeline Multi-Tracks */}
            <div 
              className="relative bg-dark-950 rounded-[4px] sm:rounded-[6px] border border-white/15 p-1.5 sm:p-2.5 flex flex-col gap-1.5 sm:gap-2 cursor-pointer overflow-hidden shadow-inner"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const p = ((e.clientX - rect.left) / rect.width) * 100;
                seekToPercent(p);
                playSynthSound?.("cut");
              }}
            >
              {/* Laser Playhead */}
              <div
                ref={playheadRef}
                style={{ left: "38%" }}
                className="absolute top-0 bottom-0 w-[2px] bg-cyan-neon z-30 shadow-[0_0_15px_#00E5FF] pointer-events-none"
              >
                <div className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 bg-cyan-neon rotate-45 -ml-[4px] sm:-ml-[6px] -mt-1 rounded-[1px] shadow-glow-cyan" />
              </div>

              {/* Track V2 */}
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="w-9 sm:w-14 shrink-0 font-mono text-[7px] sm:text-[9px] text-purple-mist font-bold bg-purple-deep/40 px-1 py-0.5 rounded-[2px] border border-purple-glow/30 text-center truncate">
                  V2 [FX]
                </span>
                <div className="flex-1 grid grid-cols-12 gap-1 h-5 sm:h-6">
                  <div className="col-span-4 sm:col-span-3 bg-purple-deep/70 border border-purple-glow rounded-[2px] px-1 sm:px-2 flex items-center text-[7px] sm:text-[8px] font-mono text-white-pure truncate">
                    {data.trackV2Label}
                  </div>
                  <div className="col-span-4 sm:col-span-5 bg-cute-pink/40 border border-cute-pink/50 rounded-[2px] px-1 sm:px-2 flex items-center text-[7px] sm:text-[8px] font-mono text-white-crisp truncate">
                    [3D SUBTITLES]
                  </div>
                  <div className="col-span-4 bg-cyan-deep/50 border border-cyan-neon/50 rounded-[2px] px-1 sm:px-2 flex items-center text-[7px] sm:text-[8px] font-mono text-white-crisp truncate">
                    [OUTRO]
                  </div>
                </div>
              </div>

              {/* Track V1 */}
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="w-9 sm:w-14 shrink-0 font-mono text-[7px] sm:text-[9px] text-cyan-ice font-bold bg-cyan-deep/40 px-1 py-0.5 rounded-[2px] border border-cyan-neon/30 text-center truncate">
                  V1 [4K]
                </span>
                <div className="flex-1 grid grid-cols-12 gap-1 h-5 sm:h-7">
                  <div className="col-span-4 bg-cyan-900/70 border border-cyan-neon/60 rounded-[2px] px-1 sm:px-2 flex items-center text-[7px] sm:text-[8px] font-mono text-cyan-ice truncate">
                    {data.trackV1Label}
                  </div>
                  <div className="col-span-4 bg-indigo-900/70 border border-purple-glow/50 rounded-[2px] px-1 sm:px-2 flex items-center text-[7px] sm:text-[8px] font-mono text-purple-mist truncate">
                    BROLL.mp4
                  </div>
                  <div className="col-span-4 bg-cyan-900/70 border border-cyan-neon/60 rounded-[2px] px-1 sm:px-2 flex items-center text-[7px] sm:text-[8px] font-mono text-cyan-ice truncate">
                    HERO.mp4
                  </div>
                </div>
              </div>

              {/* Track A1 */}
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="w-9 sm:w-14 shrink-0 font-mono text-[7px] sm:text-[9px] text-emerald-300 font-bold bg-emerald-500/20 px-1 py-0.5 rounded-[2px] border border-emerald-400/30 text-center truncate">
                  A1 [OST]
                </span>
                <div className="flex-1 bg-emerald-950/40 border border-emerald-500/30 rounded-[2px] h-5 sm:h-6 px-1.5 sm:px-2 flex items-center justify-between text-[7px] sm:text-[8px] font-mono text-emerald-300 truncate">
                  {data.trackA2Label}
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* 6 3D PRODUCTION CAPABILITY SPECIFICATIONS (2 Columns on Mobile, 3 on Desktop) */}
        {/* ========================================================================= */}
        <div className="mt-16 sm:mt-36 grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
          {[
            {
              title: "3D Kinetic Motion & Captions",
              tag: "MOTION DESIGN",
              metric: "100% Word Sync",
              desc: "Dynamic animated typography, tracking markers, and 3D floating icons synced frame-by-frame with speech rhythm.",
              color: "text-cyan-neon border-cyan-neon/30"
            },
            {
              title: "DaVinci 3D Color Science",
              tag: "COLOR GRADING",
              metric: "10-Bit DCI-P3",
              desc: "Custom 3D LUT look-development, film grain emulation, split toning, and skin tone isolation for cinematic depth.",
              color: "text-purple-mist border-purple-glow/30"
            },
            {
              title: "Multi-Track Spatial Foley",
              tag: "AUDIO DESIGN",
              metric: "Spatial 3D Foley",
              desc: "Sub-bass 808 risers, crisp whooshes, ambient textures, and tactile UI click sounds engineered for dopamine feedback.",
              color: "text-cute-pink border-cute-pink/30"
            },
            {
              title: "Velocity Speed Ramping",
              tag: "FLOW MASTERY",
              metric: "Smooth 120 FPS",
              desc: "Seamless whip pans, optical flow speed ramps, and seamless invisible cuts that create an addictive watch-loop.",
              color: "text-amber-300 border-amber-400/30"
            },
            {
              title: "3-Second Hook Retention",
              tag: "RETENTION LAB",
              metric: "+84% Watch Time",
              desc: "Pacing psychology and pattern interrupts specifically tested on algorithms to stop high-speed feed scrollers.",
              color: "text-emerald-300 border-emerald-400/30"
            },
            {
              title: "Viral Short-Form Architecture",
              tag: "ALGORITHM",
              metric: "4.2M+ Reach",
              desc: "Engineered specifically for YouTube Shorts, Instagram Reels, and TikTok viral distribution standards.",
              color: "text-rose-300 border-rose-500/30"
            }
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-6 rounded-[8px] bg-dark-900/90 border border-white/15 glass-panel shadow-lg flex flex-col justify-between hover:border-cyan-neon/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-3 gap-1">
                  <span className={`text-[7.5px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-[2px] sm:rounded-[3px] border font-bold uppercase truncate ${pillar.color}`}>
                    {pillar.tag}
                  </span>
                  <span className="text-cyan-neon font-mono text-[8px] sm:text-xs font-bold shrink-0">{pillar.metric}</span>
                </div>
                <h3 className="font-heading font-bold text-xs sm:text-lg text-white-pure mb-1 sm:mb-2 leading-snug line-clamp-1 sm:line-clamp-none">
                  {pillar.title}
                </h3>
                <p className="text-white-dim text-[8.5px] sm:text-xs leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-2.5 sm:mt-5 pt-1.5 sm:pt-3 border-t border-white/10 flex items-center justify-between text-[8px] sm:text-xs font-mono text-white-muted">
                <span className="hidden sm:inline">PRODUCTION SPEC</span>
                <span className="text-cyan-neon font-bold">Studio Active →</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

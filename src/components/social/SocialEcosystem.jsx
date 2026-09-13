import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Heart, MessageCircle, Share2, Bookmark, TrendingUp, 
  Calendar, Sparkles, Eye, Users, Zap, CheckCircle, ArrowUpRight, BarChart3,
  Smartphone, Volume2, VolumeX, Play, Pause, ChevronLeft, ChevronRight,
  Flame, Bell, Compass, Radio, Orbit
} from "lucide-react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import confetti from "canvas-confetti";
import { ThreeDTiltCard } from "../3d/ThreeDTiltCard";
import { useCursor } from "../../context/CursorContext";

export const SocialEcosystem = ({ soundState, socialData = {} }) => {
  const { playSynthSound } = soundState;
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);

  // 3D Scroll Parallax Physics (Direct Zero-Lag Binding)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // 1. Central 3D Cyberphone: Rises from Deep Subterranean Hologram Floor with 3D Arc
  const phoneY = useTransform(scrollYProgress, [0.1, 0.45, 0.85], [160, 0, -80]);
  const phoneScale = useTransform(scrollYProgress, [0.1, 0.45, 0.85], [0.75, 1, 0.92]);
  const phoneRotateX = useTransform(scrollYProgress, [0.1, 0.45, 0.85], [28, 0, -14]);
  const phoneRotateY = useTransform(scrollYProgress, [0.1, 0.45, 0.85], [-22, 0, 16]);
  const phoneZ = useTransform(scrollYProgress, [0.1, 0.45, 0.85], [-350, 45, -120]);

  // 2. Left Analytics Satellite: Spirals Outward from BEHIND the Phone in Deep Z-Space along a 3D Helix Orbit
  const leftWidgetY = useTransform(scrollYProgress, [0.12, 0.48, 0.85], [180, -20, -100]);
  const leftWidgetX = useTransform(scrollYProgress, [0.12, 0.48, 0.85], [-60, 0, -40]);
  const leftWidgetZ = useTransform(scrollYProgress, [0.12, 0.48, 0.85], [-450, 30, -70]);
  const leftWidgetRotateZ = useTransform(scrollYProgress, [0.12, 0.48, 0.85], [-24, 0, 10]);
  const leftWidgetRotateY = useTransform(scrollYProgress, [0.12, 0.48, 0.85], [40, 10, 20]);
  const leftWidgetRotateX = useTransform(scrollYProgress, [0.12, 0.48, 0.85], [25, 0, -15]);
  const leftWidgetOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  // 3. Right Content Sprint Satellite: Descends from the TOP Stratosphere along a 3D Parabolic Gravitational Curve
  const rightWidgetY = useTransform(scrollYProgress, [0.12, 0.48, 0.85], [-240, 20, -60]);
  const rightWidgetX = useTransform(scrollYProgress, [0.12, 0.48, 0.85], [60, 0, 40]);
  const rightWidgetZ = useTransform(scrollYProgress, [0.12, 0.48, 0.85], [-450, 30, -70]);
  const rightWidgetRotateZ = useTransform(scrollYProgress, [0.12, 0.48, 0.85], [24, 0, -10]);
  const rightWidgetRotateY = useTransform(scrollYProgress, [0.12, 0.48, 0.85], [-40, -10, -20]);
  const rightWidgetRotateX = useTransform(scrollYProgress, [0.12, 0.48, 0.85], [-25, 0, 15]);
  const rightWidgetOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  // 4. Floating Holographic Reaction Bubbles emerging in Foreground Z-Depth (+80px)
  const bubble1Y = useTransform(scrollYProgress, [0.15, 0.85], [80, -120]);
  const bubble2Y = useTransform(scrollYProgress, [0.15, 0.85], [-80, 100]);

  // Active Platform: "instagram" | "tiktok" | "youtube"
  const [platform, setPlatform] = useState("instagram");
  const [activeReelIdx, setActiveReelIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likesCount, setLikesCount] = useState({ 0: 42300, 1: 89100, 2: 124500 });
  const [hasLiked, setHasLiked] = useState({ 0: false, 1: false, 2: false });
  const [floatingHearts, setFloatingHearts] = useState([]);

  const data = {
    badgeText: socialData.badgeText || "3D VIRAL ORBITAL SIMULATOR",
    headlinePrefix: socialData.headlinePrefix || "Strategy + Aesthetics +",
    headlineHighlight: socialData.headlineHighlight || "Viral Growth",
    description: socialData.description || "We don't post random content. Every piece is engineered with psychological 3-second hooks, aesthetic curation, and strategic CTA funnels that build loyal brand cults.",
    reel1Tag: socialData.reel1Tag || "#OrganicSkincare",
    reel1Views: socialData.reel1Views || "1.4M",
    reel1Caption: socialData.reel1Caption || "POV: You finally found the 3-step routine that fixes dull barrier damage in 7 days ✨🧴",
    reel1Image: socialData.reel1Image || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    reel2Tag: socialData.reel2Tag || "#FashionAesthetics",
    reel2Views: socialData.reel2Views || "2.8M",
    reel2Caption: socialData.reel2Caption || "How to style vintage leather jackets for aesthetic night outs in NYC 🖤⚡",
    reel2Image: socialData.reel2Image || "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
    reel3Tag: socialData.reel3Tag || "#MatchaRituals",
    reel3Views: socialData.reel3Views || "3.2M",
    reel3Caption: socialData.reel3Caption || "The sound of ceremonial matcha on a rainy Sunday morning in Tokyo 🍵🌧️",
    reel3Image: socialData.reel3Image || "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80"
  };

  const reels = [
    {
      id: 0,
      tag: data.reel1Tag,
      views: data.reel1Views,
      comments: "1,240",
      shares: "8.4k",
      caption: data.reel1Caption,
      image: data.reel1Image,
      music: "Original Audio — @shally.curates (Viral Trend)",
      hookScore: "98% Retention"
    },
    {
      id: 1,
      tag: data.reel2Tag,
      views: data.reel2Views,
      comments: "3,480",
      shares: "14.2k",
      caption: data.reel2Caption,
      image: data.reel2Image,
      music: "Cyberpunk Night Drive — Synth 128 BPM",
      hookScore: "96% Viral Trajectory"
    },
    {
      id: 2,
      tag: data.reel3Tag,
      views: data.reel3Views,
      comments: "4,120",
      shares: "22.8k",
      caption: data.reel3Caption,
      image: data.reel3Image,
      music: "Rainy Tokyo ASMR — Organic Foley",
      hookScore: "99% Sound Save Rate"
    }
  ];

  const activeReel = reels[activeReelIdx];

  const handleLike = () => {
    const isCurrentlyLiked = hasLiked[activeReelIdx];
    setHasLiked(prev => ({ ...prev, [activeReelIdx]: !isCurrentlyLiked }));
    setLikesCount(prev => ({
      ...prev,
      [activeReelIdx]: isCurrentlyLiked ? prev[activeReelIdx] - 1 : prev[activeReelIdx] + 1
    }));
    playSynthSound("success");

    // Spawn floating neon hearts
    const newHeartId = Date.now();
    setFloatingHearts(prev => [...prev, newHeartId]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(id => id !== newHeartId));
    }, 1200);

    // Particle Burst
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.65 },
      colors: ["#F472B6", "#A855F7", "#00E5FF"]
    });
  };

  const handleNextReel = () => {
    setActiveReelIdx((activeReelIdx + 1) % reels.length);
    playSynthSound("click");
  };

  const handlePrevReel = () => {
    setActiveReelIdx((activeReelIdx - 1 + reels.length) % reels.length);
    playSynthSound("click");
  };

  return (
    <section 
      ref={sectionRef}
      id="social-hub" 
      className="relative min-h-[140vh] py-32 bg-dark-950 overflow-hidden select-none"
      style={{ perspective: "1600px" }}
    >
      {/* Ambient Neon Atmosphere */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-cute-pink/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full bg-cyan-neon/20 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[500px] rounded-full bg-purple-glow/15 blur-[160px] pointer-events-none" />

      {/* Cyber Orbital Grid Plane Floor */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-cute-pink/20 opacity-30 pointer-events-none"
        style={{ transform: "rotateX(75deg)" }}
      />

      {/* Floating 3D Reaction Bubbles Emerging in Z-Depth */}
      <motion.div
        style={{ y: bubble1Y, z: 80 }}
        className="hidden xl:flex absolute top-48 left-16 z-40 glass-panel p-3.5 rounded-[8px] border border-cute-pink/50 bg-dark-900/95 shadow-glow-pink/30 text-xs font-mono text-white-pure items-center gap-2.5 pointer-events-none"
      >
        <div className="w-7 h-7 rounded-full bg-cute-pink/20 text-cute-pink flex items-center justify-center font-bold">
          ❤️
        </div>
        <div>
          <p className="font-heading font-bold text-cute-pink text-[11px]">@elena_brand</p>
          <p className="text-[10px] text-white-dim">“Your hook pacing literally tripled our sales! 🔥”</p>
        </div>
      </motion.div>

      <motion.div
        style={{ y: bubble2Y, z: 80 }}
        className="hidden xl:flex absolute bottom-52 right-16 z-40 glass-panel p-3.5 rounded-[8px] border border-cyan-neon/50 bg-dark-900/95 shadow-glow-cyan/30 text-xs font-mono text-white-pure items-center gap-2.5 pointer-events-none"
      >
        <div className="w-7 h-7 rounded-full bg-cyan-deep/30 text-cyan-neon flex items-center justify-center font-bold">
          🚀
        </div>
        <div>
          <p className="font-heading font-bold text-cyan-neon text-[11px]">ALGORITHM SPIKE</p>
          <p className="text-[10px] text-white-dim">+14.2k Shares in 48 Hours</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-gradient-to-r from-cute-pink/20 to-purple-deep/30 border border-cute-pink/40 text-cute-pink text-xs font-mono font-bold mb-4 shadow-glow-pink/30">
            <Orbit className="w-3.5 h-3.5 text-cyan-neon animate-spin" />
            <span>{data.badgeText}</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white-pure tracking-tight">
            {data.headlinePrefix} <span className="text-gradient-cute">{data.headlineHighlight}</span>
          </h2>
          <p className="text-white-dim text-sm sm:text-base mt-4 font-normal leading-relaxed">
            {data.description}
          </p>

          {/* Interactive Platform Skin Switcher */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => { setPlatform("instagram"); playSynthSound("click"); }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-[4px] font-mono text-xs font-bold transition-all ${
                platform === "instagram"
                  ? "bg-gradient-to-r from-purple-deep via-cute-pink/60 to-purple-glow text-white-pure border border-cute-pink/50 shadow-glow-pink/40"
                  : "bg-dark-900 border border-white/10 text-white-dim hover:text-white-crisp"
              }`}
            >
              <FaInstagram className="w-3.5 h-3.5 text-cute-pink" />
              <span>Instagram Reels</span>
            </button>

            <button
              onClick={() => { setPlatform("tiktok"); playSynthSound("click"); }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-[4px] font-mono text-xs font-bold transition-all ${
                platform === "tiktok"
                  ? "bg-gradient-to-r from-cyan-deep via-cyan-neon/40 to-dark-900 text-white-pure border border-cyan-neon/50 shadow-glow-cyan/40"
                  : "bg-dark-900 border border-white/10 text-white-dim hover:text-white-crisp"
              }`}
            >
              <FaTiktok className="w-3.5 h-3.5 text-cyan-neon" />
              <span>TikTok FYP</span>
            </button>

            <button
              onClick={() => { setPlatform("youtube"); playSynthSound("click"); }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-[4px] font-mono text-xs font-bold transition-all ${
                platform === "youtube"
                  ? "bg-gradient-to-r from-rose-900/80 via-rose-600/40 to-dark-900 text-white-pure border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                  : "bg-dark-900 border border-white/10 text-white-dim hover:text-white-crisp"
              }`}
            >
              <FaYoutube className="w-3.5 h-3.5 text-rose-500" />
              <span>YT Shorts</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3D VIRAL CYBERPHONE & HELIX/STRATOSPHERE SATELLITE CONVERGENCE */}
        {/* ========================================================================= */}
        <div 
          className="relative w-full min-h-[720px] flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          
          {/* 1. LEFT ORBITING SATELLITE: SPIRALS FROM BEHIND THE PHONE IN DEEP Z-SPACE */}
          <motion.div
            style={{
              x: leftWidgetX,
              y: leftWidgetY,
              z: leftWidgetZ,
              rotateZ: leftWidgetRotateZ,
              rotateY: leftWidgetRotateY,
              rotateX: leftWidgetRotateX,
              opacity: leftWidgetOpacity,
              transformStyle: "preserve-3d"
            }}
            className="hidden lg:flex flex-col gap-4 absolute left-4 w-80 z-20"
          >
            <ThreeDTiltCard maxTilt={12}>
              <div className="glass-panel p-5 rounded-[8px] border border-cyan-neon/40 shadow-[0_20px_50px_rgba(0,229,255,0.25)] bg-dark-900/95">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-[5px] bg-cyan-deep/30 flex items-center justify-center border border-cyan-neon/40 text-cyan-neon shadow-glow-cyan">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xs font-bold text-white-pure uppercase tracking-wider">
                        Viral Growth Engine
                      </h4>
                      <p className="font-mono text-[9px] text-purple-mist">Real-Time Algorithm Lift</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-[3px] border border-emerald-500/30">
                    +340% LIFT
                  </span>
                </div>

                {/* Animated Bars */}
                <div className="h-24 w-full flex items-end gap-2 pt-3 pb-1 px-2 bg-dark-950/80 rounded-[4px] border border-white/10 mb-4">
                  {[38, 48, 62, 54, 72, 85, 96, 115, 135].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                      <div
                        style={{ height: `${(val / 135) * 100}%` }}
                        className="w-full rounded-[2px] bg-gradient-to-t from-purple-deep via-purple-glow to-cyan-neon shadow-glow-cyan"
                      />
                    </div>
                  ))}
                </div>

                {/* KPI Matrix */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-dark-950 p-2 rounded-[4px] border border-white/10">
                    <span className="font-mono text-[8px] text-white-muted uppercase block">Total Reach</span>
                    <span className="font-heading text-sm font-bold text-gradient-purple-cyan">18.4M+</span>
                  </div>
                  <div className="bg-dark-950 p-2 rounded-[4px] border border-white/10">
                    <span className="font-mono text-[8px] text-white-muted uppercase block">Engagement</span>
                    <span className="font-heading text-sm font-bold text-cute-pink">8.9%</span>
                  </div>
                  <div className="bg-dark-950 p-2 rounded-[4px] border border-white/10">
                    <span className="font-mono text-[8px] text-white-muted uppercase block">New Followers</span>
                    <span className="font-heading text-sm font-bold text-cyan-neon">+84.2K</span>
                  </div>
                  <div className="bg-dark-950 p-2 rounded-[4px] border border-white/10">
                    <span className="font-mono text-[8px] text-white-muted uppercase block">Store ROI</span>
                    <span className="font-heading text-sm font-bold text-emerald-400">4.8x</span>
                  </div>
                </div>
              </div>
            </ThreeDTiltCard>

            {/* Live Retention Hook Score */}
            <div className="p-3 rounded-[6px] bg-dark-900/90 border border-purple-glow/30 text-xs font-mono text-white-dim flex items-center justify-between shadow-lg">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-cute-pink animate-pulse" />
                Retention Score:
              </span>
              <strong className="text-cyan-neon font-bold">{activeReel.hookScore}</strong>
            </div>
          </motion.div>

          {/* 2. CENTER: 3D HOLOGRAPHIC CYBERPHONE (Rises from Subterranean Depth with 3D Arc) */}
          <motion.div
            style={{
              y: phoneY,
              scale: phoneScale,
              z: phoneZ,
              rotateX: phoneRotateX,
              rotateY: phoneRotateY,
              transformStyle: "preserve-3d"
            }}
            className="relative w-[320px] sm:w-[350px] h-[640px] rounded-[36px] bg-dark-950 border-[6px] border-slate-700/80 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(244,114,182,0.35)] p-2.5 z-30 flex flex-col justify-between overflow-hidden"
          >
            {/* Phone Top Dynamic Island Speaker Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-black border border-white/15 z-40 flex items-center justify-between px-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-600" />
            </div>

            {/* Phone Screen Canvas (9:16 Feed Viewport) */}
            <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-black flex flex-col justify-between select-none">
              
              {/* Media Image / Video Feed */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${platform}-${activeReel.id}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeReel.image}
                    alt={activeReel.tag}
                    className="w-full h-full object-cover brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Like Neon Heart Burst Animations */}
              {floatingHearts.map((heartId) => (
                <motion.div
                  key={heartId}
                  initial={{ opacity: 1, scale: 0.5, y: 0 }}
                  animate={{ opacity: 0, scale: 2, y: -180 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute bottom-28 right-8 pointer-events-none z-50 text-cute-pink"
                >
                  <Heart className="w-12 h-12 fill-cute-pink drop-shadow-[0_0_15px_#F472B6]" />
                </motion.div>
              ))}

              {/* Top Status Bar & App Header */}
              <div className="relative z-30 pt-7 px-4 flex items-center justify-between text-white-pure text-xs font-medium">
                <div className="flex items-center gap-1.5 font-bold">
                  {platform === "instagram" && <FaInstagram className="w-4 h-4 text-cute-pink" />}
                  {platform === "tiktok" && <FaTiktok className="w-4 h-4 text-cyan-neon" />}
                  {platform === "youtube" && <FaYoutube className="w-4 h-4 text-rose-500" />}
                  <span className="capitalize">{platform}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-dark-950/80 text-[10px] font-mono text-cyan-neon border border-cyan-neon/30 font-bold">
                    ● VIRAL LIVE
                  </span>
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-full bg-dark-900/80 text-white-crisp"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-neon" />}
                  </button>
                </div>
              </div>

              {/* Right Vertical Action Rail (Like, Comment, Share, Sound) */}
              <div className="relative z-30 self-end mr-3 flex flex-col items-center gap-4 mb-2">
                {/* Creator Avatar */}
                <div className="w-10 h-10 rounded-full border-2 border-cute-pink overflow-hidden p-0.5 shadow-glow-pink">
                  <img src="/shally.png" alt="Shally" className="w-full h-full object-cover rounded-full" />
                </div>

                {/* Like Button */}
                <button
                  onClick={handleLike}
                  className="flex flex-col items-center gap-1 text-white-pure hover:scale-110 transition-transform"
                >
                  <div className={`p-2 rounded-full ${hasLiked[activeReelIdx] ? "bg-cute-pink text-white-pure shadow-glow-pink" : "bg-dark-900/80 text-white-pure"}`}>
                    <Heart className={`w-5 h-5 ${hasLiked[activeReelIdx] ? "fill-white-pure" : ""}`} />
                  </div>
                  <span className="font-mono text-[10px] font-bold">
                    {(likesCount[activeReelIdx] / 1000).toFixed(1)}k
                  </span>
                </button>

                {/* Comments */}
                <div className="flex flex-col items-center gap-1 text-white-pure">
                  <div className="p-2 rounded-full bg-dark-900/80 text-white-pure">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold">{activeReel.comments}</span>
                </div>

                {/* Share */}
                <div className="flex flex-col items-center gap-1 text-white-pure">
                  <div className="p-2 rounded-full bg-dark-900/80 text-white-pure">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold">{activeReel.shares}</span>
                </div>
              </div>

              {/* Bottom Caption & Audio Ticker */}
              <div className="relative z-30 p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-heading text-xs font-extrabold text-white-pure">@shally.curates</span>
                  <span className="px-1.5 py-0.5 rounded-[2px] bg-cute-pink/30 text-cute-pink text-[9px] font-bold">PRO CREATOR</span>
                </div>
                
                <p className="text-white-crisp text-xs leading-snug line-clamp-2 mb-2 font-medium">
                  {activeReel.caption}
                </p>

                <div className="flex items-center gap-2 text-[10px] font-mono text-purple-mist bg-dark-950/70 px-2 py-1 rounded-[4px] border border-white/10">
                  <Sparkles className="w-3 h-3 text-cyan-neon animate-spin" />
                  <span className="truncate">{activeReel.music}</span>
                </div>
              </div>

            </div>

            {/* Bottom Cyber Swiper Controls */}
            <div className="flex items-center justify-between pt-2 px-4 text-xs font-mono text-white-muted">
              <button 
                onClick={handlePrevReel}
                className="p-1.5 rounded-full bg-dark-900 hover:bg-dark-800 text-white-crisp border border-white/15"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-cyan-neon font-bold">REEL 0{activeReelIdx + 1} / 03</span>
              <button 
                onClick={handleNextReel}
                className="p-1.5 rounded-full bg-dark-900 hover:bg-dark-800 text-white-crisp border border-white/15"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* 3. RIGHT ORBITING SATELLITE: DESCENDS FROM TOP STRATOSPHERE ALONG 3D PARABOLA */}
          <motion.div
            style={{
              x: rightWidgetX,
              y: rightWidgetY,
              z: rightWidgetZ,
              rotateZ: rightWidgetRotateZ,
              rotateY: rightWidgetRotateY,
              rotateX: rightWidgetRotateX,
              opacity: rightWidgetOpacity,
              transformStyle: "preserve-3d"
            }}
            className="hidden lg:flex flex-col gap-4 absolute right-4 w-80 z-20"
          >
            <ThreeDTiltCard maxTilt={12}>
              <div className="glass-panel p-5 rounded-[8px] border border-cute-pink/40 shadow-[0_20px_50px_rgba(244,114,182,0.25)] bg-dark-900/95">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cute-pink" />
                    <span className="font-heading text-xs font-bold text-white-crisp uppercase tracking-wider">
                      Weekly Viral Sprint
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-cyan-neon bg-cyan-deep/30 px-1.5 py-0.5 rounded-[2px]">
                    ACTIVE ROTATION
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { day: "MON", title: "Pattern Interrupt Hook Reel", channel: "TikTok & Reels", stat: "240k Views" },
                    { day: "WED", title: "Carousel: 5 Costly Mistakes", channel: "IG Grid Carousel", stat: "Top Save Rate" },
                    { day: "FRI", title: "BTS Cinematic Story Drop", channel: "IG Stories", stat: "82% Tap-Through" },
                    { day: "SUN", title: "Sunday Ritual Newsletter", channel: "Substack / Email", stat: "46% Open Rate" }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-[4px] bg-dark-950/80 border border-white/10 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] bg-purple-deep/40 text-cute-pink border border-cute-pink/30">
                          {item.day}
                        </span>
                        <div>
                          <p className="font-heading font-medium text-white-crisp text-[11px] leading-tight">{item.title}</p>
                          <p className="font-mono text-[9px] text-white-muted">{item.channel}</p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-cyan-neon font-bold">
                        {item.stat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ThreeDTiltCard>

            {/* Quick Scalability Badge */}
            <div className="p-3 rounded-[6px] bg-dark-900/90 border border-cyan-neon/30 text-xs font-mono text-white-dim flex items-center justify-between shadow-lg">
              <span className="text-white-crisp font-bold">Omnichannel Engine</span>
              <span className="text-emerald-400 font-bold">100% Scalable ✓</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

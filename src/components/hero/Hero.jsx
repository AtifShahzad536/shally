import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play, Heart, TrendingUp, Film, PenTool, CheckCircle2 } from "lucide-react";
import { MagneticButton } from "../common/MagneticButton";
import { useCursor } from "../../context/CursorContext";

export const Hero = ({ soundState, heroData = {} }) => {
  const { playSynthSound } = soundState;
  const { setCursor } = useCursor();
  const [likesCount, setLikesCount] = useState(84200);
  const [isLiked, setIsLiked] = useState(false);
  const timecodeRef = useRef(null);

  // Dynamic CMS Fallback
  const data = {
    availabilityText: heroData.availabilityText || "Available for Select Brand Collaborations & Retainers",
    isAvailable: heroData.isAvailable ?? true,
    titleGreeting: heroData.titleGreeting || "Hi, I'm",
    titleName: heroData.titleName || "Shally",
    titleLine2: heroData.titleLine2 || "Creative Content &",
    titleLine3: heroData.titleLine3 || "Digital Experiences",
    description: heroData.description || "Blending magnetic Social Media Marketing, conversion-focused Editorial Copywriting, and high-energy Cinematic Video Editing to make modern brands impossible to ignore.",
    chip1: heroData.chip1 || "Social Media Growth",
    chip2: heroData.chip2 || "Editorial Copywriting",
    chip3: heroData.chip3 || "Short-Form Video Production",
    previewImage: heroData.previewImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    motto: heroData.motto || "Design for emotion. Edit for rhythm. Write for conversion.",
    stat1Val: heroData.stat1Val || "18M+",
    stat1Label: heroData.stat1Label || "Organic Video Views",
    stat2Val: heroData.stat2Val || "+340%",
    stat2Label: heroData.stat2Label || "Avg Client Social Lift",
    stat3Val: heroData.stat3Val || "46.2%",
    stat3Label: heroData.stat3Label || "Email Open Rate Record",
    stat4Val: heroData.stat4Val || "99.8%",
    stat4Label: heroData.stat4Label || "Client Satisfaction"
  };

  useEffect(() => {
    let frame = 18;
    let sec = 24;
    const interval = setInterval(() => {
      frame = (frame + 1) % 60;
      if (frame === 0) sec = (sec + 1) % 60;
      const formatted = `00:01:${sec.toString().padStart(2, "0")}:${frame.toString().padStart(2, "0")}`;
      if (timecodeRef.current) {
        timecodeRef.current.textContent = formatted;
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    playSynthSound("click");
  };

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Availability Badge */}
        {data.isAvailable && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-[5px] bg-dark-850/80 border border-purple-glow/30 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-neon opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-neon"></span>
            </span>
            <span className="text-xs text-purple-mist uppercase tracking-wider font-semibold">
              {data.availabilityText}
            </span>
          </motion.div>
        )}

        {/* Main Grid: Headline & Interactive Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-black tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-7.5xl leading-[1.05] mb-6"
            >
              {data.titleGreeting} <span className="text-gradient-purple-cyan">{data.titleName}</span>.
              <br />
              <span className="text-white-crisp">{data.titleLine2}</span>
              <br />
              <span className="text-gradient-cute">{data.titleLine3}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-white-dim text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-8"
            >
              {data.description}
            </motion.p>

            {/* Specialties Chips */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap gap-2.5 mb-10"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[5px] bg-purple-deep/20 border border-purple-glow/30 text-purple-soft text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-purple-glow" />
                {data.chip1}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[5px] bg-cute-pink/15 border border-cute-pink/30 text-cute-pink text-xs font-medium">
                <PenTool className="w-3.5 h-3.5 text-cute-pink" />
                {data.chip2}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[5px] bg-cyan-neon/15 border border-cyan-neon/30 text-cyan-neon text-xs font-medium">
                <Film className="w-3.5 h-3.5 text-cyan-neon" />
                {data.chip3}
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                href="#work"
                onClick={() => playSynthSound("click")}
                variant="primary"
                className="text-sm px-7 py-3.5"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                href="#contact"
                onClick={() => playSynthSound("click")}
                variant="secondary"
                className="text-sm px-6 py-3.5"
              >
                <span>Let's Work Together</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Floating Visual Composition (5 Cols) */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0">
            
            {/* Main Creative Card 1: Video Editing Preview Mini-Monitor */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onMouseEnter={() => {
                setCursor("play", "PREVIEW");
                playSynthSound("hover");
              }}
              onMouseLeave={() => setCursor("default")}
              className="glass-panel p-3 shadow-2xl relative z-20 border border-purple-glow/30 group"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[11px] font-mono text-white-muted">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-white-crisp font-semibold">PREMIERE_CUT_V4.mp4</span>
                </div>
                <span ref={timecodeRef} className="text-cyan-neon font-bold tracking-wider">00:01:24:18</span>
              </div>

              {/* Video Thumbnail Frame */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-dark-900">
                <img
                  src={data.previewImage}
                  alt="Creative Video Production"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-transparent" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-[5px] bg-purple-glow/80 text-white-pure flex items-center justify-center shadow-glow-purple group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>

                {/* Subtitle / Hook Tag */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="bg-dark-950/80 backdrop-blur-md px-2.5 py-1 rounded-[4px] border border-white/10 text-[10px] font-mono text-purple-mist">
                    ⚡ 3-SEC HOOK RETENTION: 94%
                  </div>
                  <span className="px-2 py-0.5 rounded-[4px] bg-cyan-deep/80 text-cyan-ice text-[9px] font-mono uppercase font-bold tracking-wider">
                    4K ProRes
                  </span>
                </div>
              </div>

              {/* Mini Audio Track Level */}
              <div className="mt-2.5 flex items-center gap-1.5 h-2 bg-dark-900/90 rounded-[3px] p-0.5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-neon via-purple-glow to-cute-pink rounded-[2px] w-[78%]" />
                <div className="h-full bg-white/10 rounded-[2px] w-[22%]" />
              </div>
            </motion.div>

            {/* Floating Card 2: Viral Instagram Metrics Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-10 -left-6 sm:-left-10 z-30 glass-panel p-3.5 w-60 border border-cyan-neon/40 shadow-glow-cyan/20 bg-dark-900/95"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-glow to-cute-pink p-[1px] flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                      alt="Shally Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-heading text-xs font-bold text-white-pure">@shally.creates</p>
                    <p className="font-mono text-[9px] text-cute-pink">Viral Reel Series</p>
                  </div>
                </div>
                <button
                  onClick={handleLike}
                  className="p-1 rounded-[3px] bg-white/5 hover:bg-cute-pink/20 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-cute-pink text-cute-pink" : "text-white-muted"}`} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10 text-center">
                <div className="bg-dark-900/60 p-1.5 rounded-[4px]">
                  <p className="font-mono text-[9px] text-white-muted">Organic Reach</p>
                  <p className="font-heading text-xs font-bold text-cyan-neon flex items-center justify-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    4.2M+
                  </p>
                </div>
                <div className="bg-dark-900/60 p-1.5 rounded-[4px]">
                  <p className="font-mono text-[9px] text-white-muted">Engagement</p>
                  <p className="font-heading text-xs font-bold text-purple-soft">
                    {likesCount.toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 3: Cute Editorial Memo Card */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -15 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="absolute -top-6 -right-4 sm:-right-8 z-30 glass-panel p-3 w-52 border border-cute-pink/40 shadow-glow-pink/15 rotate-2 bg-dark-900/95"
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-cute-pink" />
                <span className="text-[11px] uppercase font-bold text-cute-pink tracking-wider">
                  Creative Motto
                </span>
              </div>
              <p className="font-heading text-[12px] leading-snug text-white-crisp italic font-medium">
                “{data.motto}”
              </p>
              <div className="mt-2 flex items-center justify-between text-[10px] text-purple-mist font-medium">
                <span>✦ SHALLY STUDIO</span>
                <span className="text-cyan-neon">100% Retentive</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero Impact Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="glass-panel p-4 flex flex-col items-center sm:items-start text-center sm:text-left border-l-2 border-l-purple-glow">
            <span className="font-heading font-black text-2xl sm:text-3xl text-gradient-purple-cyan">
              {data.stat1Val}
            </span>
            <span className="text-xs text-white-muted mt-1 uppercase tracking-wider font-semibold">
              {data.stat1Label}
            </span>
          </div>

          <div className="glass-panel p-4 flex flex-col items-center sm:items-start text-center sm:text-left border-l-2 border-l-cyan-neon">
            <span className="font-heading font-black text-2xl sm:text-3xl text-cyan-neon">
              {data.stat2Val}
            </span>
            <span className="text-xs text-white-muted mt-1 uppercase tracking-wider font-semibold">
              {data.stat2Label}
            </span>
          </div>

          <div className="glass-panel p-4 flex flex-col items-center sm:items-start text-center sm:text-left border-l-2 border-l-cute-pink">
            <span className="font-heading font-black text-2xl sm:text-3xl text-cute-pink">
              {data.stat3Val}
            </span>
            <span className="text-xs text-white-muted mt-1 uppercase tracking-wider font-semibold">
              {data.stat3Label}
            </span>
          </div>

          <div className="glass-panel p-4 flex flex-col items-center sm:items-start text-center sm:text-left border-l-2 border-l-purple-soft">
            <span className="font-heading font-black text-2xl sm:text-3xl text-white-pure flex items-center gap-1">
              {data.stat4Val} <CheckCircle2 className="w-5 h-5 text-emerald-400 inline" />
            </span>
            <span className="text-xs text-white-muted mt-1 uppercase tracking-wider font-semibold">
              {data.stat4Label}
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

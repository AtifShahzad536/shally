import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { MessageSquare, Star, Quote, CheckCircle2, Sparkles, Orbit, Radio, Volume2, ShieldCheck, TrendingUp } from "lucide-react";
import { ThreeDTiltCard } from "../3d/ThreeDTiltCard";
import { useCursor } from "../../context/CursorContext";

export const TestimonialsSection = ({ testimonials = [], soundState }) => {
  const { playSynthSound } = soundState || { playSynthSound: () => {} };
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback reviews if empty
  const reviews = testimonials.length > 0 ? testimonials : [
    {
      id: "1",
      name: "Marcus Sterling",
      role: "Founder & CEO",
      company: "Aether AI (San Francisco)",
      rating: 5,
      tag: "10x Social ROI",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      metric: "+4.2M Views in 30 Days",
      quote: "Shally completely restructured our content pipeline. Her pacing in video editing and hook architecture resulted in over 4.2 million organic views in our first 30 days without spending a dime on ads."
    },
    {
      id: "2",
      name: "Elena Rostova",
      role: "Creative Brand Lead",
      company: "Luxe Botanical (Milan)",
      rating: 5,
      tag: "Editorial Masterpiece",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      metric: "46.2% Email Open Rate",
      quote: "Finding someone who understands luxury brand nuance and high-velocity digital formats is almost impossible. Shally delivered scripts and manifestos that gave our brand a timeless, magnetic soul."
    },
    {
      id: "3",
      name: "Devon Vance",
      role: "Head of Growth",
      company: "Pulse Media (New York)",
      rating: 5,
      tag: "Viral Velocity",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      metric: "18.4M Total Impressions",
      quote: "Working with Shally feels like having an entire 3D creative studio on retainer. Her turnarounds are lightning fast, communication is effortless, and the metrics speak for themselves."
    }
  ];

  const currentReview = reviews[activeIndex] || reviews[0];

  const handleSelectReview = (idx) => {
    setActiveIndex(idx);
    playSynthSound?.("click");
  };

  // 3D Parallax Tilt on Scroll (Direct Zero-Lag Binding)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const chamberRotateX = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [25, 0, -20]);
  const chamberScale = useTransform(scrollYProgress, [0.1, 0.45, 0.85], [0.85, 1, 0.9]);
  const chamberZ = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [-200, 30, -100]);

  return (
    <section 
      ref={sectionRef}
      id="testimonials"
      className="relative min-h-[110vh] py-28 bg-dark-950 overflow-hidden border-t border-b border-white/5 select-none"
      style={{ perspective: "1800px" }}
    >
      {/* Zero-Gravity Ambient Lighting & Orbit Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[500px] rounded-full bg-gradient-to-tr from-purple-glow/20 via-cyan-neon/15 to-cute-pink/20 blur-[150px] pointer-events-none" />

      {/* 3D Geometric Orbit Floor Rings */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-cyan-neon/20 opacity-30 pointer-events-none"
        style={{ transform: "rotateX(75deg)" }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-purple-glow/25 opacity-30 pointer-events-none"
        style={{ transform: "rotateX(75deg) rotateZ(45deg)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-deep/30 border border-purple-glow/40 text-purple-mist text-xs font-mono font-bold mb-3 shadow-glow-purple/30">
            <Orbit className="w-3.5 h-3.5 text-cyan-neon animate-spin" />
            <span>3D HOLOGRAPHIC REVIEW CORE</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white-pure tracking-tight mb-3">
            Trusted by Modern <span className="text-gradient-purple-cyan">Brands & Creators</span>
          </h2>
          <p className="text-white-dim text-sm sm:text-base font-normal leading-relaxed">
            Verified client audio transcripts and growth telemetry floating in zero-gravity space.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3D HOLOGRAPHIC REVIEW CHAMBER */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            scale: chamberScale,
            z: chamberZ,
            rotateX: chamberRotateX,
            transformStyle: "preserve-3d"
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto"
        >
          
          {/* Left: Interactive Client Pod Satellites (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-neon font-bold mb-1">
              // SELECT CLIENT TRANSMISSION
            </p>

            {reviews.map((r, idx) => {
              const isActive = idx === activeIndex;

              return (
                <button
                  key={r.id || idx}
                  onClick={() => handleSelectReview(idx)}
                  onMouseEnter={() => { setCursor("hover", "SELECT REVIEW"); playSynthSound?.("hover"); }}
                  onMouseLeave={() => setCursor("default")}
                  className={`p-3.5 rounded-[10px] border text-left transition-all duration-300 flex items-center gap-3.5 ${
                    isActive
                      ? "bg-dark-900/95 border-2 border-cyan-neon text-white-pure shadow-[0_0_30px_rgba(0,229,255,0.35)] scale-[1.03]"
                      : "bg-dark-950/70 border-white/10 text-white-muted hover:border-white/25 hover:text-white-crisp"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className={`w-11 h-11 rounded-full object-cover border-2 transition-all ${
                        isActive ? "border-cyan-neon shadow-glow-cyan" : "border-white/20 grayscale"
                      }`}
                    />
                    {isActive && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-cyan-neon border-2 border-dark-950 shadow-glow-cyan animate-pulse" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-extrabold text-sm text-white-pure truncate">{r.name}</h4>
                      {isActive && <Radio className="w-3.5 h-3.5 text-cyan-neon animate-pulse shrink-0" />}
                    </div>
                    <p className="font-mono text-[11px] text-white-dim truncate">{r.role}</p>
                    <p className="font-mono text-[10px] text-purple-mist font-bold truncate">{r.company}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: 3D Holographic Review Prism Monolith (8 Cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <ThreeDTiltCard maxTilt={10} scale={1.02} className="w-full">
                <motion.div
                  key={currentReview.id || activeIndex}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="glass-panel p-6 sm:p-10 rounded-[14px] border-2 border-cyan-neon/50 bg-dark-900/95 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(0,229,255,0.25)] relative overflow-hidden"
                >
                  {/* Cyber Scanline Overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-15"
                    style={{
                      background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 229, 255, 0.4) 50%)",
                      backgroundSize: "100% 4px"
                    }}
                  />

                  {/* Top Transmission Status Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10 text-xs font-mono relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-neon animate-ping" />
                      <span className="text-cyan-neon font-bold tracking-wider">✦ VERIFIED CLIENT TRANSMISSION ✦</span>
                    </div>

                    {/* Dynamic Audio Spectrum Waveform Visualizer */}
                    <div className="flex items-end gap-1 h-4">
                      {[14, 20, 8, 24, 16, 22, 10, 18, 24, 12].map((h, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: ["25%", `${h}px`, "25%"] }}
                          transition={{ duration: 0.45 + i * 0.07, repeat: Infinity, ease: "easeInOut" }}
                          className="w-1 bg-gradient-to-t from-cyan-neon to-purple-glow rounded-full"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Star Rating & Result Metric Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(currentReview.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                      ))}
                      <span className="ml-2 font-mono text-xs text-white-dim font-bold">5.0 / 5.0</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] bg-cyan-deep/40 border border-cyan-neon/50 text-cyan-neon font-mono text-xs font-bold shadow-glow-cyan/30">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{currentReview.metric || currentReview.tag || "Top Tier"}</span>
                    </div>
                  </div>

                  {/* Quote Body */}
                  <div className="relative z-10 mb-8">
                    <Quote className="w-8 h-8 text-cyan-neon/30 absolute -top-4 -left-2 pointer-events-none" />
                    <p className="text-white-crisp text-base sm:text-lg leading-relaxed italic font-body relative z-10 pl-6 border-l-2 border-cyan-neon/40">
                      “{currentReview.quote}”
                    </p>
                  </div>

                  {/* Author Metadata Footer */}
                  <div className="flex items-center justify-between pt-5 border-t border-white/10 relative z-10">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={currentReview.avatar}
                        alt={currentReview.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-cyan-neon/60 shadow-glow-cyan"
                      />
                      <div>
                        <h4 className="font-heading font-extrabold text-white-pure text-base">{currentReview.name}</h4>
                        <p className="font-mono text-xs text-white-muted">
                          {currentReview.role} • <strong className="text-cute-pink">{currentReview.company}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-1 text-emerald-400 font-mono text-xs font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>100% Verified</span>
                    </div>
                  </div>

                </motion.div>
              </ThreeDTiltCard>
            </AnimatePresence>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

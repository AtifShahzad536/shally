import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Film, PenTool, CheckCircle2 } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { MagneticButton } from "../common/MagneticButton";
import { useCursor } from "../../context/CursorContext";

export const Hero = ({ soundState, heroData = {} }) => {
  const { playSynthSound } = soundState;
  const { setCursor } = useCursor();

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
    previewImage: heroData.previewImage || "/shally.png",
    stat1Val: heroData.stat1Val || "18M+",
    stat1Label: heroData.stat1Label || "Organic Video Views",
    stat2Val: heroData.stat2Val || "+340%",
    stat2Label: heroData.stat2Label || "Avg Client Social Lift",
    stat3Val: heroData.stat3Val || "46.2%",
    stat3Label: heroData.stat3Label || "Email Open Rate Record",
    stat4Val: heroData.stat4Val || "99.8%",
    stat4Label: heroData.stat4Label || "Client Satisfaction"
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
          <div className="lg:col-span-5 relative mt-12 lg:mt-0 flex items-center justify-center">
            
            {/* Surrounding Ambient Radial Light Rays & Aura Halo */}
            <div className="absolute w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] rounded-full -z-10 flex items-center justify-center pointer-events-none">
              {/* Rotating Conic Light Rays */}
              <div 
                className="absolute inset-0 rounded-full opacity-65 animate-spin-slow"
                style={{
                  background: "conic-gradient(from 0deg at 50% 50%, rgba(168, 85, 247, 0.45) 0deg, rgba(0, 229, 255, 0.45) 60deg, transparent 120deg, rgba(244, 114, 182, 0.45) 180deg, rgba(0, 229, 255, 0.45) 240deg, transparent 300deg, rgba(168, 85, 247, 0.45) 360deg)",
                  filter: "blur(45px)"
                }}
              />
              
              {/* Pulsing Core Aura Glow */}
              <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-purple-glow/40 via-cyan-neon/30 to-cute-pink/40 blur-3xl animate-pulse" />
              
              {/* Subtle Radial Light Ring */}
              <div className="absolute inset-2 rounded-full border border-purple-glow/30 opacity-40 shadow-[0_0_50px_rgba(168,85,247,0.3)]" />
            </div>

            {/* Clean, High-End Portrait Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] aspect-square flex items-center justify-center"
            >
              <div className="relative w-full h-full rounded-2xl p-2 flex items-center justify-center">
                <img
                  src={data.previewImage || "/shally.png"}
                  alt="Shally — Creative Professional"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] drop-shadow-[0_0_35px_rgba(168,85,247,0.35)] transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>

              {/* Floating Service Icon 1: Social Media Marketing (Top Left) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                className="absolute -top-3 -left-2 sm:-left-6 z-20 glass-panel p-2.5 sm:p-3 rounded-[5px] border border-cute-pink/40 bg-dark-900/90 shadow-glow-pink/30 flex items-center gap-2 backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-[4px] bg-cute-pink/20 border border-cute-pink/40 flex items-center justify-center text-cute-pink shadow-inner">
                  <FaInstagram className="w-4 h-4" />
                </div>
                <span className="text-xs font-heading font-bold text-white-pure pr-1">
                  Social Growth
                </span>
              </motion.div>

              {/* Floating Service Icon 2: Video Editing (Top Right) */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute -top-4 -right-2 sm:-right-6 z-20 glass-panel p-2.5 sm:p-3 rounded-[5px] border border-cyan-neon/40 bg-dark-900/90 shadow-glow-cyan/30 flex items-center gap-2 backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-[4px] bg-cyan-deep/30 border border-cyan-neon/40 flex items-center justify-center text-cyan-neon shadow-inner">
                  <Film className="w-4 h-4" />
                </div>
                <span className="text-xs font-heading font-bold text-white-pure pr-1">
                  Video Editing
                </span>
              </motion.div>

              {/* Floating Service Icon 3: Content Writing (Bottom Left / Bottom) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 left-4 sm:left-0 z-20 glass-panel p-2.5 sm:p-3 rounded-[5px] border border-purple-glow/40 bg-dark-900/90 shadow-glow-purple/30 flex items-center gap-2 backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-[4px] bg-purple-deep/30 border border-purple-glow/40 flex items-center justify-center text-purple-soft shadow-inner">
                  <PenTool className="w-4 h-4" />
                </div>
                <span className="text-xs font-heading font-bold text-white-pure pr-1">
                  Editorial Copy
                </span>
              </motion.div>
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

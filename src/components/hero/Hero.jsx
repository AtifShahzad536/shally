import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { MagneticButton } from "../common/MagneticButton";
import { HeroAncientTree } from "../3d/HeroAncientTree";
import { AnimatedCounter } from "../common/AnimatedCounter";

export const Hero = ({ soundState, heroData = {} }) => {
  const { playSynthSound } = soundState || { playSynthSound: () => {} };

  // Dynamic CMS Fallback
  const data = {
    titleGreeting: heroData.titleGreeting || "Hi, I'm",
    titleName: heroData.titleName || "Shally",
    previewImage: heroData.previewImage || "/shally.png",
    stat1Val: heroData.stat1Val || "18M+",
    stat1Label: heroData.stat1Label || "Organic Views",
    stat2Val: heroData.stat2Val || "+340%",
    stat2Label: heroData.stat2Label || "Social Growth",
    stat3Val: heroData.stat3Val || "46.2%",
    stat3Label: heroData.stat3Label || "Retention Rate",
    stat4Val: heroData.stat4Val || "99.8%",
    stat4Label: heroData.stat4Label || "Satisfaction"
  };

  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center items-center text-center overflow-hidden select-none">
      
      {/* Background Ambient Celestial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[600px] rounded-full bg-gradient-to-tr from-purple-glow/20 via-cyan-neon/15 to-cute-pink/20 blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center">
        
        {/* Ancient Sacred Tree Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/40 border border-purple-glow/30 text-purple-soft text-xs font-semibold mb-4 backdrop-blur-md shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-neon" />
          <span>Ancient Tree of Digital Storytelling</span>
        </motion.div>

        {/* Kinetic Falling Letters Headline */}
        <h1 className="font-heading font-black tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] max-w-4xl mb-4 text-white-pure flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4">
          
          {/* Greeting Word with Falling Letters */}
          <span className="inline-flex overflow-hidden">
            {(data.titleGreeting || "Hi, I'm").split("").map((char, index) => (
              <motion.span
                key={`greet-${index}`}
                initial={{ opacity: 0, y: -80, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 140,
                  delay: index * 0.04
                }}
                whileHover={{ y: -8, color: "#00E5FF", transition: { duration: 0.15 } }}
                className="inline-block cursor-pointer select-none"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>

          {/* Highlight Name with Gradient Falling Letters */}
          <span className="inline-flex overflow-hidden text-gradient-purple-cyan">
            {(data.titleName || "Shally").split("").map((char, index) => (
              <motion.span
                key={`name-${index}`}
                initial={{ opacity: 0, y: -100, rotateX: -90, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 10,
                  stiffness: 130,
                  delay: 0.3 + index * 0.05
                }}
                whileHover={{ y: -10, scale: 1.15, transition: { duration: 0.15 } }}
                className="inline-block cursor-pointer select-none"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>

        </h1>

        {/* Cascading Typing / Falling Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4 text-xs sm:text-sm font-medium text-white-muted uppercase tracking-wider"
        >
          {/* Tag 1 */}
          <motion.span
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 14, stiffness: 120, delay: 0.6 }}
            className="text-cyan-neon font-semibold hover:text-white-pure transition-colors cursor-default"
          >
            🎬 4K Video Editing
          </motion.span>
          
          <span className="text-white/30">•</span>

          {/* Tag 2 */}
          <motion.span
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 14, stiffness: 120, delay: 0.75 }}
            className="text-cute-pink font-semibold hover:text-white-pure transition-colors cursor-default"
          >
            🌸 Viral Social Growth
          </motion.span>

          <span className="text-white/30">•</span>

          {/* Tag 3 */}
          <motion.span
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 14, stiffness: 120, delay: 0.9 }}
            className="text-purple-mist font-semibold hover:text-white-pure transition-colors cursor-default"
          >
            ✍️ Cult Copywriting
          </motion.span>
        </motion.div>

        {/* ========================================================================= */}
        {/* 3D ANCIENT SACRED TREE STAGE (ZERO CARDS, PURE ORGANIC 3D ART) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full my-1 flex items-center justify-center"
        >
          <HeroAncientTree 
            previewImage={data.previewImage}
            soundState={soundState}
          />
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
        >
          <MagneticButton
            href="#work"
            onClick={() => playSynthSound("click")}
            variant="primary"
            className="text-xs sm:text-sm px-8 py-3.5 font-bold tracking-wide shadow-glow-cyan"
          >
            <span>Explore Works</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </MagneticButton>

          <MagneticButton
            href="#contact"
            onClick={() => playSynthSound("click")}
            variant="secondary"
            className="text-xs sm:text-sm px-7 py-3.5 font-bold"
          >
            <span>Get In Touch →</span>
          </MagneticButton>
        </motion.div>

        {/* Seamless Cardless Stat Ribbon with Live Animated Counting on Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-white-muted"
        >
          <div className="flex items-baseline gap-1.5">
            <AnimatedCounter 
              value={data.stat1Val} 
              className="font-heading font-black text-xl sm:text-2xl text-gradient-purple-cyan"
            />
            <span className="text-[11px] uppercase tracking-wider font-medium">{data.stat1Label}</span>
          </div>

          <span className="text-white/20 hidden sm:inline">•</span>

          <div className="flex items-baseline gap-1.5">
            <AnimatedCounter 
              value={data.stat2Val} 
              className="font-heading font-black text-xl sm:text-2xl text-cyan-neon"
            />
            <span className="text-[11px] uppercase tracking-wider font-medium">{data.stat2Label}</span>
          </div>

          <span className="text-white/20 hidden sm:inline">•</span>

          <div className="flex items-baseline gap-1.5">
            <AnimatedCounter 
              value={data.stat3Val} 
              className="font-heading font-black text-xl sm:text-2xl text-cute-pink"
            />
            <span className="text-[11px] uppercase tracking-wider font-medium">{data.stat3Label}</span>
          </div>

          <span className="text-white/20 hidden sm:inline">•</span>

          <div className="flex items-baseline gap-1.5">
            <AnimatedCounter 
              value={data.stat4Val} 
              className="font-heading font-black text-xl sm:text-2xl text-white-pure"
            />
            <span className="text-[11px] uppercase tracking-wider font-medium">{data.stat4Label}</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

import React from "react";
import { motion } from "framer-motion";
import { User, Sparkles, Heart, Coffee, Compass, CheckCircle2, ArrowUpRight } from "lucide-react";
import { creativeTools } from "../../data/portfolioData";
import { useCursor } from "../../context/CursorContext";

export const AboutSection = ({ soundState, aboutData = {} }) => {
  const { playSynthSound } = soundState;
  const { setCursor } = useCursor();

  const data = {
    badgeText: aboutData.badgeText || "BEHIND THE CREATIVE VISION",
    headlinePrefix: aboutData.headlinePrefix || "Meet",
    headlineName: aboutData.headlineName || "Shally",
    headlineSuffix: aboutData.headlineSuffix || "— Digital Creator & Strategist",
    bioParagraph1: aboutData.bioParagraph1 || "I live at the intersection of visual psychology, high-retention video cutting, and hypnotic editorial copy.",
    bioParagraph2: aboutData.bioParagraph2 || "Over the past 5+ years, I've helped boutique luxury brands, disruptive tech founders, and ambitious lifestyle creators break through algorithm fatigue. My philosophy is simple: attention isn't given; it is engineered with artistic taste and rhythm.",
    portraitImage: aboutData.portraitImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    statusBadge: aboutData.statusBadge || "Based in Digital Nomad Orbit",
    timezone: aboutData.timezone || "EST / GMT",
    hobbyTitle: aboutData.hobbyTitle || "Fueled By Iced Matcha",
    hobbySub: aboutData.hobbySub || "& 90s Cyberpunk Soundtracks",
    pillar1Title: aboutData.pillar1Title || "Rhythmic Storytelling",
    pillar1Desc: aboutData.pillar1Desc || "Every edit, paragraph, and reel is scored like music with intentional cadence, tension, and release.",
    pillar2Title: aboutData.pillar2Title || "Psychological Hooks",
    pillar2Desc: aboutData.pillar2Desc || "Capturing attention in the first 3 seconds through visual curiosity, bold statements, and pattern interrupts.",
    pillar3Title: aboutData.pillar3Title || "Dark-Luxe Aesthetics",
    pillar3Desc: aboutData.pillar3Desc || "Elevated, editorial visuals that stand apart from generic templates and cheap commercial noise.",
    stat1: aboutData.stat1 || "5+ Years Active Production",
    stat2: aboutData.stat2 || "45+ Campaigns Shipped",
    stat3: aboutData.stat3 || "100% On-Time Track Record"
  };

  const creativePillars = [
    { title: data.pillar1Title, desc: data.pillar1Desc },
    { title: data.pillar2Title, desc: data.pillar2Desc },
    { title: data.pillar3Title, desc: data.pillar3Desc }
  ];

  return (
    <section id="about" className="relative py-28 bg-dark-950/90 overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-1/3 -left-[10%] w-[45vw] h-[45vw] rounded-full bg-purple-glow/15 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-purple-deep/20 border border-purple-glow/30 text-purple-soft text-xs font-mono font-medium mb-3">
            <User className="w-3.5 h-3.5 text-purple-glow" />
            <span>{data.badgeText}</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white-pure tracking-tight">
            {data.headlinePrefix} <span className="text-gradient-cute">{data.headlineName}</span> {data.headlineSuffix}
          </h2>
        </div>

        {/* ============================================================ */}
        {/* CREATIVE PROFILE COMPOSITION */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          
          {/* Left: Creative Portrait & Badge Stack (5 Cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Ambient Background Box */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-deep/40 to-cyan-neon/30 rounded-[5px] filter blur-xl -z-10" />

            <div className="glass-panel p-3 rounded-[5px] border border-white/20 bg-dark-900/90 shadow-2xl relative">
              {/* Portrait Frame */}
              <div className="relative aspect-[4/5] rounded-[4px] overflow-hidden bg-black">
                <img
                  src={data.portraitImage}
                  alt={data.headlineName}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-transparent" />

                {/* Live Creative Status Pill */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs">
                  <div className="bg-dark-950/80 backdrop-blur-md px-3 py-1 rounded-[3px] border border-white/10 text-purple-mist flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cute-pink" />
                    <span>{data.statusBadge}</span>
                  </div>
                  <span className="bg-cyan-deep/80 text-cyan-ice px-2 py-0.5 rounded-[3px] font-bold">
                    {data.timezone}
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Personality Pill 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-4 sm:-right-8 z-20 glass-panel p-3.5 rounded-[5px] border border-cute-pink/40 shadow-glow-pink/20 bg-dark-900/95 flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-[4px] bg-cute-pink/20 text-cute-pink flex items-center justify-center font-bold">
                <Coffee className="w-4 h-4" />
              </div>
              <div>
                <p className="font-heading text-xs font-bold text-white-pure">{data.hobbyTitle}</p>
                <p className="font-mono text-[9px] text-cute-pink">{data.hobbySub}</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Narrative Story & Creative Pillars (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-4 text-white-dim text-base sm:text-lg leading-relaxed mb-8">
              <p>{data.bioParagraph1}</p>
              <p>{data.bioParagraph2}</p>
            </div>

            {/* Creative Pillars (3 Box Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {creativePillars.map((p, i) => (
                <div key={i} className="glass-panel p-4 rounded-[5px] border border-white/10 bg-dark-900/70">
                  <span className="text-xs text-cyan-neon font-bold block mb-1">
                    Pillar 0{i + 1}
                  </span>
                  <h4 className="font-heading text-sm font-bold text-white-crisp mb-1.5">{p.title}</h4>
                  <p className="text-xs text-white-dim leading-snug font-normal">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Quick Metrics Tag */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10 text-xs text-white-muted font-medium">
              <span className="flex items-center gap-1.5 text-white-crisp">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {data.stat1}
              </span>
              <span className="flex items-center gap-1.5 text-white-crisp">
                <CheckCircle2 className="w-4 h-4 text-purple-glow" />
                {data.stat2}
              </span>
              <span className="flex items-center gap-1.5 text-white-crisp">
                <CheckCircle2 className="w-4 h-4 text-cyan-neon" />
                {data.stat3}
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SHALLY'S INTERACTIVE TOOLBOX & ARSENAL */}
        {/* ============================================================ */}
        <div className="glass-panel p-6 sm:p-8 rounded-[5px] border border-white/15 bg-dark-900/90">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-purple-mist font-bold block mb-1">
                ✦ Production Suite & Creative Arsenal
              </span>
              <h3 className="font-heading font-bold text-xl text-white-pure">
                Software, Tools & Ecosystems I Master Daily
              </h3>
            </div>
            <span className="text-xs text-cyan-neon mt-2 sm:mt-0 font-bold">
              10+ Specialized Workflows
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {creativeTools.map((tool, idx) => (
              <div
                key={idx}
                onMouseEnter={() => {
                  setCursor("hover");
                  playSynthSound("hover");
                }}
                onMouseLeave={() => setCursor("default")}
                className="p-3 rounded-[5px] bg-dark-950/80 border border-white/10 hover:border-purple-glow/50 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl group-hover:scale-110 transition-transform">{tool.icon}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-[2px] bg-purple-deep/30 text-purple-mist border border-purple-glow/20 font-medium">
                    {tool.level}
                  </span>
                </div>
                <div>
                  <p className="font-heading text-xs font-bold text-white-crisp group-hover:text-purple-soft transition-colors">
                    {tool.name}
                  </p>
                  <p className="text-[11px] text-white-muted font-medium">{tool.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

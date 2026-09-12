import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, PenTool, Film, ArrowRight, CheckCircle2, 
  TrendingUp, Eye, Zap, Layers, Play, MessageSquare, Flame
} from "lucide-react";
import { MagneticButton } from "../common/MagneticButton";
import { useCursor } from "../../context/CursorContext";

export const Services = ({ services, soundState }) => {
  const { playSynthSound } = soundState;
  const { setCursor } = useCursor();
  const [activeTab, setActiveTab] = useState("01");

  const serviceCreatives = {
    "01": {
      title: "Social Media Growth",
      badgeText: "VIRAL CAMPAIGN ENGINE",
      accent: "#A855F7",
      gradient: "from-purple-500/20 via-purple-900/10 to-transparent",
      glowColor: "rgba(168, 85, 247, 0.4)",
      metric1: { val: "4.2M+", label: "Avg Campaign Views" },
      metric2: { val: "+340%", label: "Organic Reach Lift" },
      metric3: { val: "8.6%", label: "Engagement Rate" },
      visualTag: "3-Sec Hook Engineering",
      features: [
        "Viral 3s Hook Architecture",
        "Aesthetic Feed Curation",
        "TikTok & Reels SEO Ranking",
        "Community & DM Funnels"
      ],
      interactivePills: ["Reels Direction", "Storytelling Pacing", "Bio & Grid Sync", "Hashtag Matrix"]
    },
    "02": {
      title: "Editorial Copywriting",
      badgeText: "HIGH-CONVERTING WORDS",
      accent: "#F472B6",
      gradient: "from-pink-500/20 via-pink-900/10 to-transparent",
      glowColor: "rgba(244, 114, 182, 0.4)",
      metric1: { val: "46.2%", label: "Record Email Open" },
      metric2: { val: "4.8x", label: "Direct Sales ROI" },
      metric3: { val: "99%", label: "Clarity Score" },
      visualTag: "Neuro-Copywriting Formulas",
      features: [
        "Landing Page Conversion Copy",
        "Magnetic Brand Manifestos",
        "VIP Newsletter Sequences",
        "Viral Social Media Hooks"
      ],
      interactivePills: ["Punchy Hooks", "Micro-Interactions", "SaaS Narrative", "SEO Authority"]
    },
    "03": {
      title: "Cinematic Video Editing",
      badgeText: "NLE TIMELINE PACING",
      accent: "#00E5FF",
      gradient: "from-cyan-500/20 via-cyan-900/10 to-transparent",
      glowColor: "rgba(0, 229, 255, 0.4)",
      metric1: { val: "92%", label: "Viewer Retention" },
      metric2: { val: "18M+", label: "Organic Views Cut" },
      metric3: { val: "128 BPM", label: "Rhythmic Audio Sync" },
      visualTag: "Frame-by-Frame Rhythm",
      features: [
        "Speed Ramps & Whip-Pans",
        "Foley & Hybrid SFX Design",
        "DaVinci Cinematic Grading",
        "Dynamic Karaoke Subtitles"
      ],
      interactivePills: ["4K DaVinci Grade", "Speed Ramping", "Bass Hit Foley", "Motion Glitch"]
    }
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-dark-950 overflow-hidden">
      
      {/* Background Lighting Ambient Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[450px] rounded-full bg-purple-glow/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Clean, Punchy, Zero Fluff */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-purple-deep/20 border border-purple-glow/30 text-purple-soft text-xs font-mono font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-glow" />
              <span>CORE DISCIPLINES</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white-pure tracking-tight">
              Three Crafts. <span className="text-gradient-purple-cyan">One Aesthetic Vision.</span>
            </h2>
          </div>
          <p className="text-white-dim text-xs sm:text-sm max-w-md mt-3 md:mt-0 font-normal">
            Creative capabilities engineered to capture cultural attention and convert audience curiosity into loyal advocates.
          </p>
        </div>

        {/* 3 Interactive Creative Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {(services || []).map((service, idx) => {
            const creative = serviceCreatives[service.id] || serviceCreatives["01"];
            const isSelected = activeTab === service.id;

            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onMouseEnter={() => {
                  setActiveTab(service.id);
                  setCursor("hover", "EXPLORE");
                  playSynthSound("hover");
                }}
                onMouseLeave={() => setCursor("default")}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 bg-dark-900/90 flex flex-col justify-between relative group transition-all duration-300 overflow-hidden hover:border-white/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
              >
                {/* Ambient Top Glow Layer */}
                <div 
                  className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${creative.gradient} rounded-full blur-3xl opacity-40 group-hover:opacity-90 transition-opacity pointer-events-none`} 
                />

                <div>
                  {/* Top Bar: Service ID Number & Creative Pill */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-white/25 group-hover:text-white/50 transition-colors">
                      {service.id}
                    </span>
                    <span 
                      className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border backdrop-blur-md"
                      style={{
                        color: creative.accent,
                        borderColor: `${creative.accent}50`,
                        backgroundColor: `${creative.accent}15`
                      }}
                    >
                      {creative.badgeText}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white-pure mb-1 group-hover:text-white-pure transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-cute-pink mb-4 font-semibold tracking-wide">
                    {service.subtitle}
                  </p>

                  {/* Visual Creative Showcase Widget (Visual Instead of Text) */}
                  <div className="my-4 p-3.5 rounded-xl bg-dark-950/70 border border-white/10 space-y-3">
                    
                    {/* Live Metric Stats Mini Bar */}
                    <div className="grid grid-cols-3 gap-2 text-center py-1 border-b border-white/5">
                      <div>
                        <div className="font-mono font-black text-xs sm:text-sm text-white-pure" style={{ color: creative.accent }}>
                          {creative.metric1.val}
                        </div>
                        <div className="text-[9px] text-white-dim uppercase font-mono tracking-tight mt-0.5">
                          {creative.metric1.label}
                        </div>
                      </div>
                      <div className="border-x border-white/10 px-1">
                        <div className="font-mono font-black text-xs sm:text-sm text-white-pure">
                          {creative.metric2.val}
                        </div>
                        <div className="text-[9px] text-white-dim uppercase font-mono tracking-tight mt-0.5">
                          {creative.metric2.label}
                        </div>
                      </div>
                      <div>
                        <div className="font-mono font-black text-xs sm:text-sm text-emerald-400">
                          {creative.metric3.val}
                        </div>
                        <div className="text-[9px] text-white-dim uppercase font-mono tracking-tight mt-0.5">
                          {creative.metric3.label}
                        </div>
                      </div>
                    </div>

                    {/* Creative Tags Grid */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {creative.interactivePills.map((pill, pIdx) => (
                        <span 
                          key={pIdx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-white-crisp hover:bg-white/[0.08] transition-colors"
                        >
                          ✦ {pill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core Deliverables Scope */}
                  <div className="space-y-2 mb-6 pt-2">
                    {creative.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-white-crisp font-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: creative.accent }} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-white-dim font-mono">
                    ✦ High Retention
                  </span>
                  <MagneticButton
                    href="#contact"
                    onClick={() => playSynthSound("click")}
                    variant="outline"
                    className="text-xs px-3.5 py-1.5 font-medium rounded-lg"
                  >
                    <span>Collaborate</span>
                    <ArrowRight className="w-3 h-3" />
                  </MagneticButton>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

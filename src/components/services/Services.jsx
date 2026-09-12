import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, PenTool, Film, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { MagneticButton } from "../common/MagneticButton";
import { useCursor } from "../../context/CursorContext";

export const Services = ({ services, soundState }) => {
  const { playSynthSound } = soundState;
  const { setCursor } = useCursor();
  const [expandedService, setExpandedService] = useState(null);

  const iconMap = {
    Sparkles: Sparkles,
    PenTool: PenTool,
    Film: Film,
  };

  const serviceAccents = {
    "01": {
      gradient: "from-purple-deep/30 via-purple-electric/20 to-transparent",
      badge: "border-purple-glow/40 text-purple-soft bg-purple-deep/20",
      accent: "#A855F7",
      hoverBorder: "hover:border-purple-glow",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
    },
    "02": {
      gradient: "from-cute-pink/25 via-purple-deep/20 to-transparent",
      badge: "border-cute-pink/40 text-cute-pink bg-cute-pink/20",
      accent: "#F472B6",
      hoverBorder: "hover:border-cute-pink",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80"
    },
    "03": {
      gradient: "from-cyan-deep/30 via-cyan-neon/20 to-transparent",
      badge: "border-cyan-neon/40 text-cyan-neon bg-cyan-deep/20",
      accent: "#00E5FF",
      hoverBorder: "hover:border-cyan-neon",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
    }
  };

  return (
    <section id="services" className="relative py-28 bg-dark-950 overflow-hidden">

      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[500px] rounded-full bg-purple-glow/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-purple-deep/20 border border-purple-glow/30 text-purple-soft text-xs font-mono font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-glow" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white-pure tracking-tight">
              Three Disciplines. <span className="text-gradient-purple-cyan">One Vision.</span>
            </h2>
          </div>
          <p className="text-white-dim text-sm max-w-md mt-4 md:mt-0 font-normal">
            Specialized creative services designed to elevate brand authority, capture cultural attention, and convert audience curiosity into tangible revenue.
          </p>
        </div>

        {/* 3 Pillars Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Sparkles;
            const accent = serviceAccents[service.id] || serviceAccents["01"];
            const isExpanded = expandedService === service.id;

            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onMouseEnter={() => {
                  setCursor("hover", "EXPLORE");
                  playSynthSound("hover");
                }}
                onMouseLeave={() => setCursor("default")}
                className={`glass-panel p-6 sm:p-7 rounded-[5px] border border-white/15 bg-dark-900/90 flex flex-col justify-between relative group transition-all duration-500 overflow-hidden ${accent.hoverBorder}`}
              >
                {/* Background Card Ambient Glow */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${accent.gradient} rounded-full blur-3xl opacity-30 group-hover:opacity-80 transition-opacity pointer-events-none`} />

                <div>
                  {/* Top Bar: Number & Service Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl sm:text-4xl font-black text-white/20 group-hover:text-white/40 transition-colors">
                      {service.id}
                    </span>
                    <div className={`w-11 h-11 rounded-[5px] flex items-center justify-center border transition-all duration-300 group-hover:scale-110 ${accent.badge}`}>
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white-pure mb-1.5 group-hover:text-purple-mist transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-cute-pink mb-4 font-semibold tracking-wide">
                    {service.subtitle}
                  </p>

                  <p className="text-white-dim text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-white/10">
                    <span className="text-[11px] uppercase tracking-wider text-purple-mist font-bold block mb-3">
                      ✦ Key Deliverables & Scope
                    </span>
                    {service.deliverables.map((del, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-white-crisp font-normal leading-snug">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent.accent }} />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Stat & Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white-muted font-medium">
                    {service.stats}
                  </span>
                  <MagneticButton
                    href="#contact"
                    onClick={() => playSynthSound("click")}
                    variant="outline"
                    className="text-xs px-3.5 py-1.5 font-medium"
                  >
                    <span>Inquire</span>
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

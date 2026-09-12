import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star, Quote, CheckCircle2 } from "lucide-react";
import { useCursor } from "../../context/CursorContext";

export const TestimonialsSection = ({ testimonials, soundState }) => {
  const { playSynthSound } = soundState;
  const { setCursor } = useCursor();

  return (
    <section className="relative py-24 bg-dark-950/80 overflow-hidden border-t border-b border-white/5">
      
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-cyan-neon/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-purple-glow/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-purple-deep/20 border border-purple-glow/30 text-purple-soft text-xs font-mono font-medium mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>CLIENT EXPERIENCES</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white-pure tracking-tight mb-3">
            Trusted by Modern Brands & Creators
          </h2>
          <p className="text-white-dim text-sm font-normal">
            Direct feedback from founders, creative directors, and growth leads who transformed their content with Shally.
          </p>
        </div>

        {/* Testimonials 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              whileHover={{ y: -6 }}
              onMouseEnter={() => {
                setCursor("hover");
                playSynthSound("hover");
              }}
              onMouseLeave={() => setCursor("default")}
              className="glass-panel p-6 sm:p-7 rounded-[5px] border border-white/15 bg-dark-900/90 flex flex-col justify-between group hover:border-purple-glow/50 transition-all shadow-xl"
            >
              <div>
                {/* Star Rating & Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-[3px] bg-purple-deep/30 text-purple-mist border border-purple-glow/20">
                    {t.tag}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-white-crisp text-sm sm:text-base leading-relaxed italic mb-6 font-body">
                  “{t.quote}”
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-purple-glow/40"
                />
                <div>
                  <h4 className="font-heading text-sm font-bold text-white-pure">{t.name}</h4>
                  <p className="font-mono text-[11px] text-white-muted">
                    {t.role} • <span className="text-cute-pink">{t.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

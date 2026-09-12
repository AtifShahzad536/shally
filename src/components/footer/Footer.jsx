import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, Heart, Clock } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTiktok, FaBehance } from "react-icons/fa6";
import { useCursor } from "../../context/CursorContext";

export const Footer = ({ soundState }) => {
  const { playSynthSound } = soundState;
  const { setCursor } = useCursor();
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com", handle: "@shally.creates" },
    { name: "TikTok", href: "https://tiktok.com", handle: "@shallytok" },
    { name: "LinkedIn", href: "https://linkedin.com", handle: "in/shally-creative" },
    { name: "Behance", href: "https://behance.net", handle: "shally-portfolio" }
  ];

  return (
    <footer className="relative bg-dark-950 pt-24 pb-12 overflow-hidden border-t border-white/10">
      
      {/* Background Big Typography Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] h-[300px] bg-gradient-to-t from-purple-deep/20 via-cyan-neon/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Massive Bold Visual Statement */}
        <div className="mb-20">
          <p className="font-mono text-xs uppercase tracking-widest text-purple-mist mb-4 font-bold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cute-pink" />
            <span>FINAL CREATIVE STATEMENT</span>
          </p>

          <h2 className="font-heading font-black text-5xl sm:text-7xl md:text-8.5xl lg:text-9xl text-white-pure tracking-tighter leading-[0.9] select-none">
            LET'S CREATE
            <br />
            <span className="text-gradient-purple-cyan">SOMETHING</span>
            <br />
            <span className="text-gradient-cute">GOOD.</span>
          </h2>
        </div>

        {/* Footer Middle Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10 text-sm">
          
          {/* Col 1: Shally Brand (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-[4px] bg-gradient-to-br from-purple-electric to-cyan-neon flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-dark-950" />
              </div>
              <span className="font-heading font-black text-xl text-white-pure tracking-wider">
                SHALLY
              </span>
            </div>
            <p className="text-white-dim text-xs sm:text-sm max-w-sm leading-relaxed">
              Elevating brand narratives through high-converting copy, viral short-form video cutting, and strategic social growth.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-white-muted pt-2">
              <Clock className="w-3.5 h-3.5 text-cyan-neon" />
              <span>STUDIO LOCAL TIME: <strong className="text-cyan-neon font-bold">{localTime || "12:00:00"}</strong></span>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 Cols) */}
          <div className="md:col-span-3 space-y-2.5 font-mono text-xs">
            <span className="font-bold text-white-pure uppercase tracking-wider block mb-3">
              // DIRECTORY
            </span>
            {["Home", "Services", "Video Studio", "Social Hub", "Content", "Work", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="block text-white-dim hover:text-cyan-neon transition-colors"
              >
                → {item}
              </a>
            ))}
          </div>

          {/* Col 3: Social Links (4 Cols) */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="font-bold text-white-pure uppercase tracking-wider block mb-3">
              // CONNECT GLOBALLY
            </span>
            <div className="space-y-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => {
                    setCursor("hover");
                    playSynthSound("hover");
                  }}
                  onMouseLeave={() => setCursor("default")}
                  className="group flex items-center justify-between p-2.5 rounded-[4px] bg-dark-900 border border-white/10 hover:border-purple-glow transition-all"
                >
                  <span className="text-white-crisp group-hover:text-purple-soft font-bold">
                    {s.name}
                  </span>
                  <span className="text-white-muted text-[11px] flex items-center gap-1 group-hover:text-cyan-neon">
                    {s.handle}
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Copyright & Signoff */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white-muted">
          <div>
            © {new Date().getFullYear()} SHALLY. All creative rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-purple-mist">
            Crafted with <Heart className="w-3.5 h-3.5 text-cute-pink fill-cute-pink inline" /> for fearless brands.
          </div>
        </div>

      </div>
    </footer>
  );
};

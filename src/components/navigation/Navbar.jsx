import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, VolumeX, Menu, X, ArrowUpRight, Send } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import { MagneticButton } from "../common/MagneticButton";
import { useCursor } from "../../context/CursorContext";

export const Navbar = ({ soundState, onNavigate, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursor } = useCursor();
  const { muted, toggleMute, playSynthSound } = soundState;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "Video Studio", href: "#video-studio" },
    { name: "Social Hub", href: "#social-hub" },
    { name: "Content", href: "#content-writing" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    playSynthSound("click");
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-dark-950/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            onMouseEnter={() => {
              setCursor("hover");
              playSynthSound("hover");
            }}
            onMouseLeave={() => setCursor("default")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-[5px] bg-gradient-to-br from-purple-electric to-cyan-neon flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-dark-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-extrabold tracking-wider text-white-pure flex items-center gap-1.5">
                SHALLY
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-neon animate-pulse" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-purple-soft/80 -mt-1">
                Creative Studio
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-dark-900/60 p-1.5 rounded-[5px] border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  onMouseEnter={() => {
                    setCursor("hover");
                    playSynthSound("hover");
                  }}
                  onMouseLeave={() => setCursor("default")}
                  className={`relative px-3.5 py-1.5 text-xs font-heading font-medium tracking-wide transition-all rounded-[5px] ${
                    isActive
                      ? "text-white-pure bg-purple-deep/40 border border-purple-glow/40 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                      : "text-white-dim/80 hover:text-white-pure hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                toggleMute();
                playSynthSound("click");
              }}
              onMouseEnter={() => {
                setCursor("hover");
                playSynthSound("hover");
              }}
              onMouseLeave={() => setCursor("default")}
              className={`p-2.5 rounded-[5px] border transition-all ${
                !muted
                  ? "bg-purple-deep/20 border-purple-glow/40 text-purple-soft shadow-[0_0_12px_rgba(168,85,247,0.2)]"
                  : "bg-dark-800/80 border-white/10 text-white-muted hover:text-white-crisp"
              }`}
              title={muted ? "Unmute Sound FX" : "Mute Sound FX"}
              aria-label="Toggle Sound Effects"
            >
              {!muted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Let's Talk CTA */}
            <div className="hidden sm:block">
              <MagneticButton
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                variant="primary"
                className="text-xs px-4 py-2"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                playSynthSound("click");
              }}
              className="md:hidden p-2.5 rounded-[5px] bg-dark-800 border border-white/15 text-white-pure"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Creative Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-dark-950/98 backdrop-blur-2xl md:hidden flex flex-col justify-between px-6 pt-24 pb-8 overflow-y-auto"
          >
            {/* Ambient Blobs */}
            <div className="absolute top-1/4 -right-1/4 w-72 h-72 rounded-full bg-purple-glow/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -left-1/4 w-72 h-72 rounded-full bg-cyan-neon/15 blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-3 z-10">
              <p className="font-mono text-[10px] tracking-widest text-purple-soft/70 uppercase mb-2">
                // NAVIGATION
              </p>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  className="group flex items-center justify-between py-3 border-b border-white/5 text-lg font-heading font-bold text-white-crisp hover:text-cyan-neon transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-purple-glow">0{idx + 1}</span>
                    {link.name}
                  </span>
                  <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </motion.a>
              ))}
            </div>

            <div className="pt-8 z-10 flex flex-col gap-4">
              <MagneticButton
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                variant="cyan"
                className="w-full py-3.5 text-sm"
              >
                <span>Book a Discovery Call</span>
                <Send className="w-4 h-4" />
              </MagneticButton>

              <div className="flex items-center justify-between text-xs font-mono text-white-muted pt-3 border-t border-white/10">
                <span>SHALLY CREATIVE © 2026</span>
                <div className="flex items-center gap-3">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white-crisp hover:text-purple-glow">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white-crisp hover:text-cyan-neon">
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

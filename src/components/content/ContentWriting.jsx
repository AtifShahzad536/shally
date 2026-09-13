import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { PenTool, Copy, Check, Sparkles, BookOpen, Quote, ArrowRight, Gauge, FileText, Scroll, Compass } from "lucide-react";
import { ThreeDTiltCard } from "../3d/ThreeDTiltCard";
import { useCursor } from "../../context/CursorContext";

export const ContentWriting = ({ soundState, contentData = {} }) => {
  const { playSynthSound } = soundState;
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);

  // =========================================================================
  // 3D DEEP IMMERSION ZOOM-IN DIVE WARP MECHANISM (Direct Zero-Lag Binding)
  // =========================================================================
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Deep Spatial Camera Dive transformations
  const worldScale = useTransform(scrollYProgress, [0.05, 0.4, 0.7, 0.95], [0.65, 1, 1, 0.9]);
  const worldZ = useTransform(scrollYProgress, [0.05, 0.4, 0.7, 0.95], [-650, 0, 0, -200]);
  const worldRotateX = useTransform(scrollYProgress, [0.05, 0.4], [35, 0]);
  const worldOpacity = useTransform(scrollYProgress, [0.02, 0.25], [0.2, 1]);

  // Expanding Cyber Warp Depth Tunnel Rings
  const tunnelRingScale = useTransform(scrollYProgress, [0.1, 0.6], [0.3, 2.2]);
  const tunnelRingOpacity = useTransform(scrollYProgress, [0.1, 0.45, 0.8], [0.1, 0.4, 0]);

  // 3D Origami Manuscript Unfolding
  const bookRotateX = useTransform(scrollYProgress, [0.2, 0.5], [40, 0]);
  const bookRotateY = useTransform(scrollYProgress, [0.2, 0.5], [-25, 0]);
  const bookZ = useTransform(scrollYProgress, [0.2, 0.5], [-200, 30]);

  // Floating Cyber Quote Runes
  const quote1Y = useTransform(scrollYProgress, [0.1, 0.9], [-80, 120]);
  const quote2Y = useTransform(scrollYProgress, [0.1, 0.9], [100, -110]);

  const [activeCategory, setActiveCategory] = useState("brand-manifesto");
  const [copied, setCopied] = useState(false);

  const data = {
    badgeText: contentData.badgeText || "3D DEEP IMMERSION // EDITORIAL LAB",
    headlineQuote: contentData.headlineQuote || "“Words that make people stop scrolling & start caring.”",
    description: contentData.description || "Whether it's poetic brand storytelling, high-retention video scripts, or conversion-driven website copy, every syllable is engineered to captivate attention and drive decisive action.",
    manifestoTitle: contentData.manifestoTitle || "The modern luxury of intentional stillness.",
    manifestoSub: contentData.manifestoSub || "Crafted for a high-end botanical fragrance house in Milan.",
    manifestoBody: contentData.manifestoBody || `In an era of endless noise and hyper-stimulation, true luxury is the quiet confidence of knowing exactly who you are. We don't bottle scents to mask reality; we distill moments of profound clarity. When the world races at 120 frames per second, we create the permission to breathe, linger, and remember.`,
    hooksTitle: contentData.hooksTitle || "3 uncomfortable truths about building in public in 2026.",
    hooksSub: contentData.hooksSub || "Designed for a tech founder's LinkedIn & Twitter personal brand.",
    hooksBody: contentData.hooksBody || `Most creators obsess over vanity views while their bank accounts starve. Here is the framework we used to turn 1,200 engaged followers into a $42,000 monthly consulting engine: 1. Kill the corporate fluff. 2. Post the messy WIP, not just the polished highlight reel. 3. Treat your comment section like a VIP cocktail party.`
  };

  const writingSnippets = {
    "brand-manifesto": {
      category: "Brand Manifesto & Narrative",
      headline: data.manifestoTitle,
      subtext: data.manifestoSub,
      hookScore: "98% Emotional Resonance",
      readingTime: "45 sec read",
      wordsCount: 142,
      body: data.manifestoBody
    },
    "viral-hooks": {
      category: "High-Retention Social Captions",
      headline: data.hooksTitle,
      subtext: data.hooksSub,
      hookScore: "96% Scroll-Stop Rate",
      readingTime: "30 sec read",
      wordsCount: 98,
      body: data.hooksBody
    },
    "website-copy": {
      category: "High-Converting SaaS Landing Page",
      headline: "Software so intuitive, your team will actually want to use it.",
      subtext: "Hero section & micro-copy for an AI productivity suite in San Francisco.",
      hookScore: "99% Clarity & Conversion",
      readingTime: "25 sec read",
      wordsCount: 84,
      body: `Ditch the clunky dashboards and 40-step onboarding manuals. Nexus streamlines your entire creative pipeline in 3 clicks. Built for designers who hate busywork and demand effortless velocity. Get started free in 60 seconds—no credit card required.`
    },
    "seo-longform": {
      category: "Editorial SEO Article",
      headline: "The Architecture of Viral Short-Form Video: A 2026 Field Guide.",
      subtext: "Deep-dive thought leadership essay featured on Substack & Medium.",
      hookScore: "94% Avg Depth Time (5m 20s)",
      readingTime: "5 min read",
      wordsCount: 1250,
      body: `Why do some 15-second clips rack up 4 million views while identical topics collect digital dust? The secret lies in cognitive tension. In this essay, we break down the neuro-chemistry of the 3-second hook, dopamine micro-rewards in visual pacing, and why audio waveforms dictate watch-through completion.`
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    playSynthSound("success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      ref={sectionRef}
      id="content-writing" 
      className="relative min-h-[130vh] py-32 bg-dark-950 overflow-hidden select-none"
      style={{ perspective: "2000px" }}
    >
      {/* Expanding 3D Cyber Depth Warp Tunnel Rings */}
      <motion.div
        style={{
          scale: tunnelRingScale,
          opacity: tunnelRingOpacity,
          transform: "translate(-50%, -50%) rotateX(60deg)"
        }}
        className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] rounded-full border-2 border-dashed border-cute-pink/40 pointer-events-none z-0"
      />
      <motion.div
        style={{
          scale: tunnelRingScale,
          opacity: tunnelRingOpacity,
          transform: "translate(-50%, -50%) rotateX(60deg) scale(0.7)"
        }}
        className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full border-2 border-cyan-neon/30 pointer-events-none z-0"
      />

      {/* Background Lighting */}
      <div className="absolute top-1/3 -right-[15%] w-[55vw] h-[55vw] rounded-full bg-cute-pink/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-[10%] w-[45vw] h-[45vw] rounded-full bg-purple-glow/15 blur-[150px] pointer-events-none" />

      {/* Floating 3D Ink Quills / Quote Runes */}
      <motion.div 
        style={{ y: quote1Y }} 
        className="hidden xl:flex absolute top-40 right-10 z-20 glass-panel p-4 rounded-[8px] border border-cute-pink/40 shadow-glow-pink/30 bg-dark-900/90 text-xs font-mono text-cute-pink flex items-center gap-2 pointer-events-none"
      >
        <Quote className="w-4 h-4 text-cute-pink" />
        <span>“Clarity Beats Cleverness. Every single time.”</span>
      </motion.div>

      <motion.div 
        style={{ y: quote2Y }} 
        className="hidden xl:flex absolute bottom-40 left-10 z-20 glass-panel p-4 rounded-[8px] border border-cyan-neon/40 shadow-glow-cyan/30 bg-dark-900/90 text-xs font-mono text-cyan-ice flex items-center gap-2 pointer-events-none"
      >
        <Sparkles className="w-4 h-4 text-cyan-neon" />
        <span>✦ 0% AI Fluff • 100% Neural Rhythm</span>
      </motion.div>

      {/* ========================================================================= */}
      {/* 3D DEEP IMMERSION WRAPPER (Zooms from deep space directly into viewport) */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          scale: worldScale,
          z: worldZ,
          rotateX: worldRotateX,
          opacity: worldOpacity,
          transformStyle: "preserve-3d"
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-cute-pink/15 border border-cute-pink/40 text-cute-pink text-xs font-mono font-medium mb-4 shadow-glow-pink/20">
            <Scroll className="w-3.5 h-3.5" />
            <span>{data.badgeText}</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white-pure tracking-tight max-w-4xl leading-[1.1] mb-4">
            {data.headlineQuote}
          </h2>
          <p className="text-white-dim text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* ============================================================ */}
        {/* 3D ORIGAMI UNFOLDING WORKBENCH */}
        {/* ============================================================ */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          style={{ transformStyle: "preserve-3d" }}
        >
          
          {/* Left: Category Nav Pills */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <p className="text-[11px] uppercase tracking-wider text-purple-mist mb-1 font-bold">
              ✦ Select Writing Discipline
            </p>

            {Object.entries({
              "brand-manifesto": { title: "Brand Story & Manifesto", desc: "Soulful, luxurious narrative positioning" },
              "viral-hooks": { title: "Viral Social Captions", desc: "Short, punchy, high-retention hooks" },
              "website-copy": { title: "High-Converting Website Copy", desc: "Clean, magnetic SaaS & landing pages" },
              "seo-longform": { title: "Editorial SEO Articles", desc: "Thought leadership & viral essays" },
            }).map(([key, item]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveCategory(key);
                  playSynthSound("click");
                }}
                className={`p-4 rounded-[8px] border text-left transition-all ${
                  activeCategory === key
                    ? "bg-purple-deep/40 border-cute-pink text-white-pure shadow-[0_0_25px_rgba(244,114,182,0.3)] scale-[1.02]"
                    : "bg-dark-900/60 border-white/10 text-white-muted hover:border-white/25 hover:text-white-crisp"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-heading text-sm font-bold">{item.title}</span>
                  {activeCategory === key && (
                    <span className="w-2.5 h-2.5 rounded-full bg-cute-pink shadow-glow-pink animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-white-dim leading-snug font-normal">{item.desc}</p>
              </button>
            ))}

            <ThreeDTiltCard maxTilt={8}>
              <div className="glass-panel p-4 rounded-[8px] border border-white/15 bg-dark-900/90 mt-2 shadow-xl">
                <div className="flex items-center gap-2 mb-2 text-xs text-purple-soft font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-neon" />
                  <span>3D RIGOR STANDARDS</span>
                </div>
                <div className="space-y-2 text-xs text-white-dim font-medium">
                  <div className="flex justify-between">
                    <span>Zero AI Clichés / Fluff:</span>
                    <span className="text-emerald-400 font-bold">100% Guaranteed</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flesch-Kincaid Readability:</span>
                    <span className="text-cyan-neon font-bold">Grade 7-8 (Universal)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emotional Velocity:</span>
                    <span className="text-cute-pink font-bold">Maximum Impact</span>
                  </div>
                </div>
              </div>
            </ThreeDTiltCard>
          </div>

          {/* Right: 3D Origami Unfolding Manuscript Reader */}
          <motion.div 
            style={{
              z: bookZ,
              rotateX: bookRotateX,
              rotateY: bookRotateY,
              transformStyle: "preserve-3d"
            }}
            className="lg:col-span-8"
          >
            <AnimatePresence mode="wait">
              <ThreeDTiltCard maxTilt={8} scale={1.01} className="w-full">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="glass-panel p-6 sm:p-10 rounded-[10px] border-2 border-white/20 bg-dark-900/95 shadow-[0_25px_70px_rgba(0,0,0,0.9)] relative"
                >
                  {/* Top Deck Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-[4px] bg-cute-pink/20 text-cute-pink font-bold border border-cute-pink/30 font-mono">
                        {writingSnippets[activeCategory].category}
                      </span>
                      <span className="text-white-muted">•</span>
                      <span className="text-purple-mist font-medium font-mono">{writingSnippets[activeCategory].readingTime}</span>
                    </div>

                    {/* Copy to Clipboard Trigger */}
                    <button
                      onClick={() => handleCopy(writingSnippets[activeCategory].body)}
                      onMouseEnter={() => setCursor("hover")}
                      onMouseLeave={() => setCursor("default")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-dark-800 border border-white/15 text-white-dim hover:text-white-pure hover:border-purple-glow transition-all font-medium text-xs"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied Snippet!" : "Copy Excerpt"}</span>
                    </button>
                  </div>

                  {/* Editorial Headline */}
                  <div className="mb-6">
                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white-pure leading-tight mb-2">
                      {writingSnippets[activeCategory].headline}
                    </h3>
                    <p className="text-xs text-purple-soft/90 italic font-medium">
                      {writingSnippets[activeCategory].subtext}
                    </p>
                  </div>

                  {/* Manuscript Body Text with Typewriter Cursor */}
                  <div className="p-6 rounded-[6px] bg-dark-950/95 border border-white/10 mb-6 font-body text-white-crisp text-base sm:text-lg leading-relaxed shadow-inner">
                    <p className="whitespace-pre-line">
                      {writingSnippets[activeCategory].body}
                      <span className="inline-block w-2.5 h-4 ml-1 bg-cute-pink animate-pulse" />
                    </p>
                  </div>

                  {/* Bottom Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-4 text-white-muted font-medium">
                      <span>LENGTH: <strong className="text-white-crisp">{writingSnippets[activeCategory].wordsCount} words</strong></span>
                      <span>TONE: <strong className="text-cute-pink">Electric & Magnetic</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5 text-cyan-neon font-bold">
                      <Sparkles className="w-4 h-4 text-cyan-neon" />
                      <span>HOOK SCORE: {writingSnippets[activeCategory].hookScore}</span>
                    </div>
                  </div>
                </motion.div>
              </ThreeDTiltCard>
            </AnimatePresence>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
};

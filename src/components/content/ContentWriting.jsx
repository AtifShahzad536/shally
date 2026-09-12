import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, Copy, Check, Sparkles, BookOpen, Quote, ArrowRight, Gauge } from "lucide-react";
import { useCursor } from "../../context/CursorContext";

export const ContentWriting = ({ soundState }) => {
  const { playSynthSound } = soundState;
  const { setCursor } = useCursor();

  const [activeCategory, setActiveCategory] = useState("brand-manifesto");
  const [copied, setCopied] = useState(false);

  const writingSnippets = {
    "brand-manifesto": {
      category: "Brand Manifesto & Narrative",
      headline: "The modern luxury of intentional stillness.",
      subtext: "Crafted for a high-end botanical fragrance house in Milan.",
      hookScore: "98% Emotional Resonance",
      readingTime: "45 sec read",
      wordsCount: 142,
      body: `In an era of endless noise and hyper-stimulation, true luxury is the quiet confidence of knowing exactly who you are. We don't bottle scents to mask reality; we distill moments of profound clarity. When the world races at 120 frames per second, we create the permission to breathe, linger, and remember.`
    },
    "viral-hooks": {
      category: "High-Retention Social Captions",
      headline: "3 uncomfortable truths about building in public in 2026.",
      subtext: "Designed for a tech founder's LinkedIn & Twitter personal brand.",
      hookScore: "96% Scroll-Stop Rate",
      readingTime: "30 sec read",
      wordsCount: 98,
      body: `Most creators obsess over vanity views while their bank accounts starve. Here is the framework we used to turn 1,200 engaged followers into a $42,000 monthly consulting engine: 1. Kill the corporate fluff. 2. Post the messy WIP, not just the polished highlight reel. 3. Treat your comment section like a VIP cocktail party.`
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
    <section id="content-writing" className="relative py-28 bg-dark-950/95 overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-1/3 -right-[15%] w-[50vw] h-[50vw] rounded-full bg-cute-pink/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-glow/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Giant Editorial Statement */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-cute-pink/15 border border-cute-pink/30 text-cute-pink text-xs font-mono font-medium mb-4">
            <PenTool className="w-3.5 h-3.5" />
            <span>EDITORIAL CONTENT LAB</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white-pure tracking-tight max-w-4xl leading-[1.1] mb-4">
            “Words that make people <span className="text-gradient-cute">stop scrolling</span> & start caring.”
          </h2>
          <p className="text-white-dim text-sm sm:text-base max-w-2xl font-normal">
            Whether it's poetic brand storytelling, high-retention video scripts, or conversion-driven website copy, every syllable is engineered to captivate attention and drive decisive action.
          </p>
        </div>

        {/* ============================================================ */}
        {/* INTERACTIVE EDITORIAL WORKBENCH */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Category Nav Pills (4 Cols) */}
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
                className={`p-4 rounded-[5px] border text-left transition-all ${
                  activeCategory === key
                    ? "bg-purple-deep/30 border-cute-pink/60 text-white-pure shadow-[0_0_20px_rgba(244,114,182,0.2)]"
                    : "bg-dark-900/60 border-white/10 text-white-muted hover:border-white/25 hover:text-white-crisp"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-heading text-sm font-bold">{item.title}</span>
                  {activeCategory === key && (
                    <span className="w-2 h-2 rounded-full bg-cute-pink shadow-glow-pink animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-white-dim leading-snug font-normal">{item.desc}</p>
              </button>
            ))}

            {/* Micro Gauge: Editorial Quality Standards */}
            <div className="glass-panel p-4 rounded-[5px] border border-white/10 bg-dark-900/80 mt-2">
              <div className="flex items-center gap-2 mb-2 text-xs text-purple-soft font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COPYWRITING RIGOR</span>
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
          </div>

          {/* Right: Live Interactive Editorial Manuscript Reader (8 Cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="glass-panel p-6 sm:p-8 rounded-[5px] border border-white/15 bg-dark-900/95 shadow-2xl relative"
              >
                {/* Manuscript Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-[3px] bg-cute-pink/20 text-cute-pink font-semibold border border-cute-pink/30">
                      {writingSnippets[activeCategory].category}
                    </span>
                    <span className="text-white-muted">•</span>
                    <span className="text-purple-mist font-medium">{writingSnippets[activeCategory].readingTime}</span>
                  </div>

                  {/* Copy to Clipboard Trigger */}
                  <button
                    onClick={() => handleCopy(writingSnippets[activeCategory].body)}
                    onMouseEnter={() => setCursor("hover")}
                    onMouseLeave={() => setCursor("default")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-dark-800 border border-white/15 text-white-dim hover:text-white-pure hover:border-purple-glow transition-all font-medium"
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

                {/* Manuscript Body Text with Typewriter Aesthetics */}
                <div className="p-5 rounded-[4px] bg-dark-950/90 border border-white/10 mb-6 font-body text-white-crisp text-base sm:text-lg leading-relaxed shadow-inner">
                  <p className="whitespace-pre-line">
                    {writingSnippets[activeCategory].body}
                    <span className="inline-block w-2 h-4 ml-1 bg-cute-pink animate-pulse" />
                  </p>
                </div>

                {/* Bottom Manuscript Metadata Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
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
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

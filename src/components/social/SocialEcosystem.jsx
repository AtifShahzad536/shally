import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart, MessageCircle, Share2, Bookmark, TrendingUp, 
  Calendar, Sparkles, Eye, Users, Zap, CheckCircle, ArrowUpRight, BarChart3
} from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { useCursor } from "../../context/CursorContext";

export const SocialEcosystem = ({ soundState }) => {
  const { playSynthSound } = soundState;
  const { setCursor } = useCursor();
  
  const [activeTab, setActiveTab] = useState("reels");
  const [likes, setLikes] = useState({ 1: 42300, 2: 89100, 3: 124500 });
  const [likedPosts, setLikedPosts] = useState({});

  const togglePostLike = (id) => {
    setLikedPosts(prev => {
      const isLiked = prev[id];
      setLikes(l => ({ ...l, [id]: isLiked ? l[id] - 1 : l[id] + 1 }));
      return { ...prev, [id]: !isLiked };
    });
    playSynthSound("click");
  };

  const socialReels = [
    {
      id: 1,
      tag: "#OrganicSkincare",
      views: "1.4M",
      comments: "1,240",
      caption: "POV: You finally found the 3-step routine that fixes dull barrier damage in 7 days ✨🧴",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
      hookScore: "98% High Retention"
    },
    {
      id: 2,
      tag: "#FashionAesthetics",
      views: "2.8M",
      comments: "3,480",
      caption: "How to style vintage leather jackets for aesthetic night outs in NYC 🖤⚡",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
      hookScore: "96% Viral Trajectory"
    },
    {
      id: 3,
      tag: "#MatchaRituals",
      views: "3.2M",
      comments: "4,120",
      caption: "The sound of ceremonial matcha on a rainy Sunday morning in Tokyo 🍵🌧️",
      image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80",
      hookScore: "99% Sound Save Rate"
    }
  ];

  const contentSchedule = [
    { day: "MON", title: "ASMR Aesthetic Hook Reel", channel: "TikTok & Reels", status: "Published", stat: "240k Views" },
    { day: "WED", title: "Educational Carousel: 5 Mistakes", channel: "Instagram Grid", status: "Scheduled", stat: "Top Save Rate" },
    { day: "FRI", title: "Behind The Scenes Story Drop", channel: "IG Stories", status: "Live", stat: "82% Tap-Through" },
    { day: "SUN", title: "Weekly Newsletter + Roundup", channel: "Substack / Email", status: "Ready", stat: "46% Open Rate" }
  ];

  return (
    <section id="social-hub" className="relative py-28 bg-dark-950 overflow-hidden">
      
      {/* Glow Orbs */}
      <div className="absolute top-1/2 -left-[10%] w-[45vw] h-[45vw] rounded-full bg-cute-pink/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/4 -right-[10%] w-[45vw] h-[45vw] rounded-full bg-purple-glow/15 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-purple-deep/20 border border-purple-glow/30 text-purple-soft text-xs font-mono font-medium mb-3">
              <FaInstagram className="w-3.5 h-3.5 text-purple-glow" />
              <span>SOCIAL MEDIA ECOSYSTEM</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white-pure tracking-tight">
              Strategy + Aesthetics + <span className="text-gradient-cute">Viral Growth</span>
            </h2>
          </div>
          <p className="text-white-dim text-sm max-w-md mt-4 md:mt-0 font-normal">
            We don't post random content. Every piece is engineered with psychological 3-second hooks, aesthetic curation, and strategic CTA funnels that build loyal brand cults.
          </p>
        </div>

        {/* ============================================================ */}
        {/* MAIN SOCIAL ECOSYSTEM GRID (Interactive 9:16 Reels + Growth Dashboard) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 3x Interactive 9:16 Aesthetic Reels Mockups (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {socialReels.map((reel) => {
              const isLiked = likedPosts[reel.id];
              return (
                <motion.div
                  key={reel.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel p-2.5 rounded-[5px] border border-white/15 bg-dark-900/90 flex flex-col justify-between group shadow-xl hover:border-purple-glow/50 transition-all"
                >
                  {/* Reel Media Frame (9:16 Aspect Ratio) */}
                  <div className="relative aspect-[9/16] rounded-[4px] overflow-hidden bg-black mb-2.5">
                    <img
                      src={reel.image}
                      alt={reel.tag}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-90" />
                    
                    {/* Top Overlay Badge */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="text-[10px] bg-dark-950/80 px-2 py-0.5 rounded-[3px] text-purple-mist border border-white/10 font-medium">
                        {reel.tag}
                      </span>
                      <span className="text-[10px] bg-cyan-deep/80 text-cyan-ice px-1.5 py-0.5 rounded-[3px] font-bold">
                        REEL
                      </span>
                    </div>

                    {/* Bottom Content & Metrics */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <div className="mb-2">
                        <span className="text-[9px] uppercase tracking-wider text-cyan-neon font-bold block mb-1">
                          ⚡ {reel.hookScore}
                        </span>
                        <p className="text-[11px] font-heading font-medium text-white-crisp line-clamp-2 leading-tight">
                          {reel.caption}
                        </p>
                      </div>

                      {/* Social Action Bar */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/15 text-white-muted text-[11px] font-medium">
                        <button
                          onClick={() => togglePostLike(reel.id)}
                          className="flex items-center gap-1 hover:text-cute-pink transition-colors"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-cute-pink text-cute-pink" : ""}`} />
                          <span>{(likes[reel.id] / 1000).toFixed(1)}k</span>
                        </button>
                        
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{reel.comments}</span>
                        </div>

                        <div className="flex items-center gap-1 text-cyan-neon">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{reel.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Creator Signature Tag */}
                  <div className="flex items-center justify-between px-1 text-[11px] text-white-muted font-medium">
                    <span className="text-white-crisp font-semibold">@shally.curates</span>
                    <span className="text-purple-soft font-bold">VIRAL</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Growth Analytics & Content Engine Hub (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Campaign Growth Metrics Card */}
            <div className="glass-panel p-5 rounded-[5px] border border-cyan-neon/30 shadow-glow-cyan/15 bg-dark-900/90">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-[4px] bg-cyan-deep/30 flex items-center justify-center border border-cyan-neon/40 text-cyan-neon">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-white-pure uppercase tracking-wider">
                      Organic Growth Engine
                    </h4>
                    <p className="font-mono text-[9px] text-purple-mist">90-Day Campaign Benchmark</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-[3px] border border-emerald-500/30">
                  +340% LIFT
                </span>
              </div>

              {/* Mini Sparkline Chart */}
              <div className="h-28 w-full relative flex items-end gap-2 pt-4 pb-1 px-2 bg-dark-950/80 rounded-[4px] border border-white/10 mb-4">
                {[35, 42, 58, 50, 68, 75, 82, 94, 110, 135].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(val / 135) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className="w-full rounded-[2px] bg-gradient-to-t from-purple-deep via-purple-glow to-cyan-neon hover:brightness-125 transition-all shadow-[0_0_8px_rgba(0,229,255,0.3)]"
                    />
                  </div>
                ))}
              </div>

              {/* 4-Box Quick KPI Matrix */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-dark-950 p-2.5 rounded-[4px] border border-white/10">
                  <span className="font-mono text-[9px] text-white-muted uppercase block">Total Impressions</span>
                  <span className="font-heading text-base font-bold text-gradient-purple-cyan">18.4M+</span>
                </div>
                <div className="bg-dark-950 p-2.5 rounded-[4px] border border-white/10">
                  <span className="font-mono text-[9px] text-white-muted uppercase block">Avg Engagement</span>
                  <span className="font-heading text-base font-bold text-cute-pink">8.9%</span>
                </div>
                <div className="bg-dark-950 p-2.5 rounded-[4px] border border-white/10">
                  <span className="font-mono text-[9px] text-white-muted uppercase block">Follower Conversion</span>
                  <span className="font-heading text-base font-bold text-cyan-neon">+84.2K</span>
                </div>
                <div className="bg-dark-950 p-2.5 rounded-[4px] border border-white/10">
                  <span className="font-mono text-[9px] text-white-muted uppercase block">Direct Store ROI</span>
                  <span className="font-heading text-base font-bold text-emerald-400">4.8x</span>
                </div>
              </div>
            </div>

            {/* Weekly Content Calendar Drop Engine */}
            <div className="glass-panel p-5 rounded-[5px] border border-white/15 bg-dark-900/90">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-glow" />
                  <span className="font-heading text-xs font-bold text-white-crisp uppercase tracking-wider">
                    Omnichannel Content Matrix
                  </span>
                </div>
                <span className="text-[9px] font-mono text-cyan-neon">Active Sprint</span>
              </div>

              <div className="space-y-2.5">
                {contentSchedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-[4px] bg-dark-950/70 border border-white/5 hover:border-purple-glow/30 transition-colors text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-[3px] bg-purple-deep/40 text-purple-soft border border-purple-glow/20">
                        {item.day}
                      </span>
                      <div>
                        <p className="font-heading font-medium text-white-crisp text-[11px] leading-tight">{item.title}</p>
                        <p className="font-mono text-[9px] text-white-muted">{item.channel}</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-cyan-neon font-bold">
                      {item.stat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

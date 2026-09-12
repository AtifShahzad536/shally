import React, { useState, useEffect } from "react";
import { 
  Settings, Save, Sparkles, Film, Globe, Mail, CheckCircle2, 
  Shield, UploadCloud, Eye, Image as ImageIcon, Sliders, Play, Layers,
  User, MessageSquare, PenTool, Share2, Phone, MapPin
} from "lucide-react";
import { fetchSettingsApi, updateSettingsApi, uploadFileToCloudinary } from "../../services/api";
import toast from "react-hot-toast";

export const SiteSettingsManager = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);

  const [formData, setFormData] = useState({
    siteTitle: "SHALLY ✨ Creative Content & Digital Experiences",
    tagline: "Social Media Marketing • Content Writing • Video Editing",
    email: "hello@shallycreates.com",
    phone: "+1 (555) 234-5678",
    location: "Worldwide Remote / EST Orbit",

    // 1. Hero
    hero: {
      availabilityText: "Available for Select Brand Collaborations & Retainers",
      isAvailable: true,
      titleGreeting: "Hi, I'm",
      titleName: "Shally",
      titleLine2: "Creative Content &",
      titleLine3: "Digital Experiences",
      description: "Blending magnetic Social Media Marketing, conversion-focused Editorial Copywriting, and high-energy Cinematic Video Editing to make modern brands impossible to ignore.",
      chip1: "Social Media Growth",
      chip2: "Editorial Copywriting",
      chip3: "Short-Form Video Production",
      previewImage: "/shally.png",
      motto: "Design for emotion. Edit for rhythm. Write for conversion.",
      stat1Val: "18M+",
      stat1Label: "Organic Video Views",
      stat2Val: "+340%",
      stat2Label: "Avg Client Social Lift",
      stat3Val: "46.2%",
      stat3Label: "Email Open Rate Record",
      stat4Val: "99.8%",
      stat4Label: "Client Satisfaction"
    },

    // 2. Video Studio
    videoWorkspace: {
      badgeText: "NLE TIMELINE WORKSPACE",
      headlinePrefix: "Crafting",
      headlineHighlight: "Hypnotic Edits",
      headlineSuffix: "Frame by Frame",
      description: "Short-form video editing isn't just cutting clips—it's psychological pacing, rhythmic sound design, speed ramps, and retention engineering.",
      videoPreviewUrl: "/shally.png",
      subtitleHookText: "“STOP LOSING 70% OF SCROLLERS IN THE FIRST 3 SECONDS.”",
      trackV2Label: "[3s HOOK TITLE]",
      trackV1Label: "HOOK_CLIP_A.mp4",
      trackA1Label: "WHOOSH_01",
      trackA2Label: "VIRAL_TIKTOK_AUDIO_TREND.wav (128 BPM)"
    },

    // 3. About
    about: {
      badgeText: "BEHIND THE CREATIVE VISION",
      headlinePrefix: "Meet",
      headlineName: "Shally",
      headlineSuffix: "— Digital Creator & Strategist",
      bioParagraph1: "I live at the intersection of visual psychology, high-retention video cutting, and hypnotic editorial copy.",
      bioParagraph2: "Over the past 5+ years, I've helped boutique luxury brands, disruptive tech founders, and ambitious lifestyle creators break through algorithm fatigue. My philosophy is simple: attention isn't given; it is engineered with artistic taste and rhythm.",
      portraitImage: "/shally.png",
      statusBadge: "Based in Digital Nomad Orbit",
      timezone: "EST / GMT",
      hobbyTitle: "Fueled By Iced Matcha",
      hobbySub: "& 90s Cyberpunk Soundtracks",
      pillar1Title: "Rhythmic Storytelling",
      pillar1Desc: "Every edit, paragraph, and reel is scored like music with intentional cadence, tension, and release.",
      pillar2Title: "Psychological Hooks",
      pillar2Desc: "Capturing attention in the first 3 seconds through visual curiosity, bold statements, and pattern interrupts.",
      pillar3Title: "Dark-Luxe Aesthetics",
      pillar3Desc: "Elevated, editorial visuals that stand apart from generic templates and cheap commercial noise.",
      stat1: "5+ Years Active Production",
      stat2: "45+ Campaigns Shipped",
      stat3: "100% On-Time Track Record"
    },

    // 4. Social Ecosystem
    socialEcosystem: {
      badgeText: "SOCIAL MEDIA ECOSYSTEM",
      headlinePrefix: "Strategy + Aesthetics +",
      headlineHighlight: "Viral Growth",
      description: "We don't post random content. Every piece is engineered with psychological 3-second hooks, aesthetic curation, and strategic CTA funnels that build loyal brand cults.",
      reel1Tag: "#OrganicSkincare",
      reel1Views: "1.4M",
      reel1Caption: "POV: You finally found the 3-step routine that fixes dull barrier damage in 7 days ✨🧴",
      reel1Image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
      reel2Tag: "#FashionAesthetics",
      reel2Views: "2.8M",
      reel2Caption: "How to style vintage leather jackets for aesthetic night outs in NYC 🖤⚡",
      reel2Image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
      reel3Tag: "#MatchaRituals",
      reel3Views: "3.2M",
      reel3Caption: "The sound of ceremonial matcha on a rainy Sunday morning in Tokyo 🍵🌧️",
      reel3Image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80"
    },

    // 5. Content Writing
    contentWriting: {
      badgeText: "EDITORIAL CONTENT LAB",
      headlineQuote: "Words that make people stop scrolling & start caring.",
      description: "Whether it's poetic brand storytelling, high-retention video scripts, or conversion-driven website copy, every syllable is engineered to captivate attention and drive decisive action.",
      manifestoTitle: "The modern luxury of intentional stillness.",
      manifestoSub: "Crafted for a high-end botanical fragrance house in Milan.",
      manifestoBody: "In an era of endless noise and hyper-stimulation, true luxury is the quiet confidence of knowing exactly who you are. We don't bottle scents to mask reality; we distill moments of profound clarity.",
      hooksTitle: "3 uncomfortable truths about building in public in 2026.",
      hooksSub: "Designed for a tech founder's LinkedIn & Twitter personal brand.",
      hooksBody: "Most creators obsess over vanity views while their bank accounts starve. Here is the framework we used to turn 1,200 engaged followers into a $42,000 monthly consulting engine."
    },

    // 6. Contact
    contact: {
      badgeText: "PROJECT INITIATION & BOOKING",
      headlinePrefix: "Let's Build Something",
      headlineHighlight: "Iconic Together.",
      description: "Currently accepting select brand collaborations, high-impact retainer partnerships, and creative strategy sprints.",
      availabilityStatus: "Accepting Q1/Q2 Retainers"
    },

    // 7. Social Links
    socialLinks: {
      whatsapp: "https://wa.me/15552345678",
      facebook: "https://facebook.com/shally.creates",
      instagram: "https://instagram.com/shally.creates",
      tiktok: "https://tiktok.com/@shallytok",
      linkedin: "https://linkedin.com/in/shally-creative",
      behance: "https://behance.net/shally-portfolio"
    },

    // 8. SEO
    seo: {
      metaTitle: "Shally — Creative Portfolio & Studio",
      metaDescription: "Premium portfolio of Shally: Social Media, Copywriting & Video Editing.",
      keywords: "social media, video editing, copywriting, portfolio, creative director"
    }
  });

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      try {
        // Fast instant render from cache if available
        try {
          const cached = localStorage.getItem("shally_site_settings");
          if (cached) {
            const parsed = JSON.parse(cached);
            setFormData(prev => ({ ...prev, ...parsed }));
          }
        } catch (e) {}

        const res = await fetchSettingsApi();
        if (res.success && res.data) {
          setFormData(prev => ({
            ...prev,
            ...res.data,
            hero: { ...prev.hero, ...(res.data.hero || {}) },
            videoWorkspace: { ...prev.videoWorkspace, ...(res.data.videoWorkspace || {}) },
            about: { ...prev.about, ...(res.data.about || {}) },
            socialEcosystem: { ...prev.socialEcosystem, ...(res.data.socialEcosystem || {}) },
            contentWriting: { ...prev.contentWriting, ...(res.data.contentWriting || {}) },
            contact: { ...prev.contact, ...(res.data.contact || {}) },
            socialLinks: { ...prev.socialLinks, ...(res.data.socialLinks || {}) },
            seo: { ...prev.seo, ...(res.data.seo || {}) }
          }));
          try {
            localStorage.setItem("shally_site_settings", JSON.stringify(res.data));
          } catch (e) {}
        }
      } catch (err) {
        toast.error("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleFileUpload = async (e, pathKey) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(pathKey);
    const toastId = toast.loading(`Uploading to Cloudinary & converting to WebP...`);
    try {
      const res = await uploadFileToCloudinary(file);
      if (res.success && res.data?.url) {
        const url = res.data.url;
        
        let updated = { ...formData };
        if (pathKey === "hero.previewImage") {
          updated = { ...updated, hero: { ...updated.hero, previewImage: url } };
        } else if (pathKey === "videoWorkspace.videoPreviewUrl") {
          updated = { ...updated, videoWorkspace: { ...updated.videoWorkspace, videoPreviewUrl: url } };
        } else if (pathKey === "about.portraitImage") {
          updated = { ...updated, about: { ...updated.about, portraitImage: url } };
        } else if (pathKey === "socialEcosystem.reel1Image") {
          updated = { ...updated, socialEcosystem: { ...updated.socialEcosystem, reel1Image: url } };
        } else if (pathKey === "socialEcosystem.reel2Image") {
          updated = { ...updated, socialEcosystem: { ...updated.socialEcosystem, reel2Image: url } };
        } else if (pathKey === "socialEcosystem.reel3Image") {
          updated = { ...updated, socialEcosystem: { ...updated.socialEcosystem, reel3Image: url } };
        }
        
        setFormData(updated);

        // Auto-save immediately so reload / navigation never loses the image
        try {
          localStorage.setItem("shally_site_settings", JSON.stringify(updated));
          await updateSettingsApi(updated);
          toast.success(`Image uploaded & auto-saved to database! ✨`, { id: toastId });
        } catch (saveErr) {
          toast.success(`WebP Uploaded (${(res.data.bytes / 1024).toFixed(1)} KB) - click Save to sync`, { id: toastId });
        }
      } else {
        toast.error(res.message || "Upload failed", { id: toastId });
      }
    } catch (err) {
      toast.error("Upload error", { id: toastId });
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    const toastId = toast.loading("Saving configuration...");
    try {
      localStorage.setItem("shally_site_settings", JSON.stringify(formData));
      const res = await updateSettingsApi(formData);
      if (res.success) {
        toast.success("All section changes saved & live on site! ✨", { id: toastId });
      } else {
        toast.error(res.message || "Failed to save", { id: toastId });
      }
    } catch (err) {
      toast.error("Server connection error.", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center font-mono text-xs text-purple-mist flex flex-col items-center gap-2">
        <span className="w-6 h-6 border-2 border-purple-glow border-t-transparent rounded-full animate-spin" />
        <span>Loading CMS Configuration...</span>
      </div>
    );
  }

  const tabs = [
    { id: "hero", label: "🎨 Hero Section", icon: Sparkles },
    { id: "video", label: "🎬 Video Studio", icon: Film },
    { id: "about", label: "👤 About & Story", icon: User },
    { id: "social", label: "📱 Social Hub", icon: Share2 },
    { id: "content", label: "✍️ Content Lab", icon: PenTool },
    { id: "contact", label: "📬 Contact & Footer", icon: Mail },
    { id: "socialLinks", label: "🌐 Floating & Social URLs", icon: Globe },
    { id: "seo", label: "🛡️ SEO & Meta", icon: Shield }
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl text-white-pure flex items-center gap-2">
            <Settings className="w-6 h-6 text-purple-glow" />
            <span>Site Master CMS & Section Editor</span>
          </h2>
          <p className="font-mono text-xs text-white-dim mt-0.5">
            Full control over Hero, Video Studio, About, Social Hub, Editorial Lab, Contact, and Social Links.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-[5px] bg-gradient-to-r from-purple-deep via-purple-electric to-purple-soft text-white-pure font-heading font-bold text-xs shadow-glow-purple flex items-center gap-2 w-fit hover:brightness-110 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save All Changes"}</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 bg-dark-900/90 p-1.5 rounded-[5px] border border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-[4px] text-xs font-heading font-bold transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-purple-deep text-white-pure shadow-glow-purple/40 border border-purple-glow/50"
                : "text-white-dim hover:text-white-pure hover:bg-white/5"
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* ============================================================ */}
        {/* TAB 1: HERO SECTION CMS */}
        {/* ============================================================ */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4">
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-neon" />
                  Availability Status Pill
                </span>
                <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-white-dim">
                  <input
                    type="checkbox"
                    checked={formData.hero.isAvailable}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, isAvailable: e.target.checked }
                    })}
                    className="accent-cyan-neon w-4 h-4 rounded cursor-pointer"
                  />
                  <span>Active Glowing Pill</span>
                </label>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">
                  Availability Text
                </label>
                <input
                  type="text"
                  value={formData.hero.availabilityText}
                  onChange={(e) => setFormData({
                    ...formData,
                    hero: { ...formData.hero, availabilityText: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs font-mono"
                />
              </div>
            </div>

            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-glow" />
                  Headline & Bio Composition
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Greeting Text</label>
                  <input
                    type="text"
                    value={formData.hero.titleGreeting}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, titleGreeting: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Hero Name (Gradient)</label>
                  <input
                    type="text"
                    value={formData.hero.titleName}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, titleName: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Headline Sub Line 1</label>
                  <input
                    type="text"
                    value={formData.hero.titleLine2}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, titleLine2: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Headline Sub Line 2 (Pink Gradient)</label>
                  <input
                    type="text"
                    value={formData.hero.titleLine3}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, titleLine3: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Main Hero Bio Description</label>
                <textarea
                  rows={3}
                  value={formData.hero.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    hero: { ...formData.hero, description: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs resize-none"
                />
              </div>
            </div>

            {/* Hero Image Cloudinary Upload */}
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4">
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-cyan-neon" />
                  Hero Portrait Image (Transparent PNG / WebP)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-28 rounded-lg overflow-hidden bg-dark-950 border border-white/15 flex items-center justify-center relative shrink-0">
                  {formData.hero.previewImage ? (
                    <img src={formData.hero.previewImage} alt="Hero Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-white-dim" />
                  )}
                </div>

                <div className="flex-1 space-y-3 w-full">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Image URL</label>
                    <input
                      type="text"
                      value={formData.hero.previewImage}
                      onChange={(e) => setFormData({
                        ...formData,
                        hero: { ...formData.hero, previewImage: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs font-mono"
                    />
                  </div>

                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded bg-purple-deep/30 border border-purple-glow/40 text-purple-mist text-xs font-mono font-medium hover:bg-purple-deep/50 cursor-pointer transition-all">
                    <UploadCloud className="w-4 h-4 text-purple-glow" />
                    <span>{uploadingField === "hero.previewImage" ? "Converting & Uploading..." : "Upload New Image (WebP Auto-Convert)"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "hero.previewImage")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: VIDEO STUDIO WORKSPACE CMS */}
        {/* ============================================================ */}
        {activeTab === "video" && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <Film className="w-4 h-4 text-cyan-neon" />
                  Video Studio Headline & Description
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Headline Prefix</label>
                  <input
                    type="text"
                    value={formData.videoWorkspace.headlinePrefix}
                    onChange={(e) => setFormData({
                      ...formData,
                      videoWorkspace: { ...formData.videoWorkspace, headlinePrefix: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Headline Highlight (Cyan)</label>
                  <input
                    type="text"
                    value={formData.videoWorkspace.headlineHighlight}
                    onChange={(e) => setFormData({
                      ...formData,
                      videoWorkspace: { ...formData.videoWorkspace, headlineHighlight: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Headline Suffix</label>
                  <input
                    type="text"
                    value={formData.videoWorkspace.headlineSuffix}
                    onChange={(e) => setFormData({
                      ...formData,
                      videoWorkspace: { ...formData.videoWorkspace, headlineSuffix: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Section Description</label>
                <textarea
                  rows={2}
                  value={formData.videoWorkspace.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    videoWorkspace: { ...formData.videoWorkspace, description: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs resize-none"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-cute-pink block mb-1">Subtitle Hook Overlay Quote</label>
                <input
                  type="text"
                  value={formData.videoWorkspace.subtitleHookText}
                  onChange={(e) => setFormData({
                    ...formData,
                    videoWorkspace: { ...formData.videoWorkspace, subtitleHookText: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-cute-pink/40 text-cute-pink text-xs"
                />
              </div>
            </div>

            {/* Timeline Multi-Tracks Custom Labels */}
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4 font-mono text-xs">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cute-pink" />
                  Timeline Multi-Tracks Custom Labels
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-purple-soft uppercase block mb-1">Track V2 (Motion FX / Hook Clip)</label>
                  <input
                    type="text"
                    value={formData.videoWorkspace.trackV2Label}
                    onChange={(e) => setFormData({
                      ...formData,
                      videoWorkspace: { ...formData.videoWorkspace, trackV2Label: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded bg-dark-950 border border-purple-glow/30 text-purple-mist text-xs"
                  />
                </div>
                <div>
                  <label className="text-cyan-neon uppercase block mb-1">Track V1 (4K Footage Clip)</label>
                  <input
                    type="text"
                    value={formData.videoWorkspace.trackV1Label}
                    onChange={(e) => setFormData({
                      ...formData,
                      videoWorkspace: { ...formData.videoWorkspace, trackV1Label: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded bg-dark-950 border border-cyan-neon/30 text-cyan-ice text-xs"
                  />
                </div>
                <div>
                  <label className="text-amber-300 uppercase block mb-1">Track A1 (Foley SFX Sound)</label>
                  <input
                    type="text"
                    value={formData.videoWorkspace.trackA1Label}
                    onChange={(e) => setFormData({
                      ...formData,
                      videoWorkspace: { ...formData.videoWorkspace, trackA1Label: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded bg-dark-950 border border-amber-400/30 text-amber-200 text-xs"
                  />
                </div>
                <div>
                  <label className="text-emerald-400 uppercase block mb-1">Track A2 (Trending Music Audio)</label>
                  <input
                    type="text"
                    value={formData.videoWorkspace.trackA2Label}
                    onChange={(e) => setFormData({
                      ...formData,
                      videoWorkspace: { ...formData.videoWorkspace, trackA2Label: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded bg-dark-950 border border-emerald-500/30 text-emerald-300 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: ABOUT & CREATIVE STORY CMS */}
        {/* ============================================================ */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-glow" />
                  About Section Headline & Bio Story
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Prefix</label>
                  <input
                    type="text"
                    value={formData.about?.headlinePrefix || "Meet"}
                    onChange={(e) => setFormData({
                      ...formData,
                      about: { ...formData.about, headlinePrefix: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Name Highlight</label>
                  <input
                    type="text"
                    value={formData.about?.headlineName || "Shally"}
                    onChange={(e) => setFormData({
                      ...formData,
                      about: { ...formData.about, headlineName: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Suffix Title</label>
                  <input
                    type="text"
                    value={formData.about?.headlineSuffix || "— Digital Creator & Strategist"}
                    onChange={(e) => setFormData({
                      ...formData,
                      about: { ...formData.about, headlineSuffix: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Bio Story Paragraph 1</label>
                <textarea
                  rows={2}
                  value={formData.about?.bioParagraph1 || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    about: { ...formData.about, bioParagraph1: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs resize-none"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Bio Story Paragraph 2</label>
                <textarea
                  rows={3}
                  value={formData.about?.bioParagraph2 || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    about: { ...formData.about, bioParagraph2: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs resize-none"
                />
              </div>
            </div>

            {/* About Portrait & Location Badge */}
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-cute-pink" />
                  About Portrait Image & Personality Badges
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-28 rounded-lg overflow-hidden bg-dark-950 border border-white/15 shrink-0">
                  {formData.about?.portraitImage ? (
                    <img src={formData.about.portraitImage} alt="About" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 m-auto text-white-dim" />
                  )}
                </div>

                <div className="flex-1 space-y-3 w-full">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Portrait Image URL</label>
                    <input
                      type="text"
                      value={formData.about?.portraitImage || ""}
                      onChange={(e) => setFormData({
                        ...formData,
                        about: { ...formData.about, portraitImage: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs font-mono"
                    />
                  </div>

                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded bg-purple-deep/30 border border-purple-glow/40 text-purple-mist text-xs font-mono font-medium hover:bg-purple-deep/50 cursor-pointer transition-all">
                    <UploadCloud className="w-4 h-4 text-purple-glow" />
                    <span>{uploadingField === "about.portraitImage" ? "Converting..." : "Upload Portrait Image (WebP)"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "about.portraitImage")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Location Status Tag</label>
                  <input
                    type="text"
                    value={formData.about?.statusBadge || "Based in Digital Nomad Orbit"}
                    onChange={(e) => setFormData({
                      ...formData,
                      about: { ...formData.about, statusBadge: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Timezone Orbit</label>
                  <input
                    type="text"
                    value={formData.about?.timezone || "EST / GMT"}
                    onChange={(e) => setFormData({
                      ...formData,
                      about: { ...formData.about, timezone: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 3 Creative Pillars */}
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-neon" />
                  Three Creative Pillars
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="font-mono text-xs text-cyan-neon font-bold block">Pillar 01 Title</label>
                  <input
                    type="text"
                    value={formData.about?.pillar1Title || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      about: { ...formData.about, pillar1Title: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                  <textarea
                    rows={3}
                    value={formData.about?.pillar1Desc || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      about: { ...formData.about, pillar1Desc: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded bg-dark-950 border border-white/15 text-white-dim text-xs resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs text-purple-glow font-bold block">Pillar 02 Title</label>
                  <input
                    type="text"
                    value={formData.about?.pillar2Title || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      about: { ...formData.about, pillar2Title: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                  <textarea
                    rows={3}
                    value={formData.about?.pillar2Desc || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      about: { ...formData.about, pillar2Desc: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded bg-dark-950 border border-white/15 text-white-dim text-xs resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs text-cute-pink font-bold block">Pillar 03 Title</label>
                  <input
                    type="text"
                    value={formData.about?.pillar3Title || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      about: { ...formData.about, pillar3Title: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                  <textarea
                    rows={3}
                    value={formData.about?.pillar3Desc || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      about: { ...formData.about, pillar3Desc: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded bg-dark-950 border border-white/15 text-white-dim text-xs resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: SOCIAL HUB & REELS CMS */}
        {/* ============================================================ */}
        {activeTab === "social" && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-purple-glow" />
                  Social Hub Header & Headline
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Headline Prefix</label>
                  <input
                    type="text"
                    value={formData.socialEcosystem?.headlinePrefix || "Strategy + Aesthetics +"}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialEcosystem: { ...formData.socialEcosystem, headlinePrefix: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Headline Highlight (Pink)</label>
                  <input
                    type="text"
                    value={formData.socialEcosystem?.headlineHighlight || "Viral Growth"}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialEcosystem: { ...formData.socialEcosystem, headlineHighlight: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Section Description</label>
                <textarea
                  rows={2}
                  value={formData.socialEcosystem?.description || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialEcosystem: { ...formData.socialEcosystem, description: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs resize-none"
                />
              </div>
            </div>

            {/* 3x Reels Mockup Customization */}
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <Film className="w-4 h-4 text-cyan-neon" />
                  3x Interactive 9:16 Reels Cards
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Reel 1 */}
                <div className="p-3.5 rounded bg-dark-950 border border-white/10 space-y-2">
                  <span className="text-xs font-mono font-bold text-purple-mist block">Reel #1</span>
                  <input
                    type="text"
                    placeholder="Tag (e.g. #OrganicSkincare)"
                    value={formData.socialEcosystem?.reel1Tag || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialEcosystem: { ...formData.socialEcosystem, reel1Tag: e.target.value }
                    })}
                    className="w-full px-2.5 py-1 rounded bg-dark-900 border border-white/10 text-xs text-white-crisp"
                  />
                  <input
                    type="text"
                    placeholder="Views (e.g. 1.4M)"
                    value={formData.socialEcosystem?.reel1Views || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialEcosystem: { ...formData.socialEcosystem, reel1Views: e.target.value }
                    })}
                    className="w-full px-2.5 py-1 rounded bg-dark-900 border border-white/10 text-xs text-white-crisp"
                  />
                  <textarea
                    rows={2}
                    placeholder="Caption"
                    value={formData.socialEcosystem?.reel1Caption || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialEcosystem: { ...formData.socialEcosystem, reel1Caption: e.target.value }
                    })}
                    className="w-full px-2.5 py-1 rounded bg-dark-900 border border-white/10 text-xs text-white-dim resize-none"
                  />
                </div>

                {/* Reel 2 */}
                <div className="p-3.5 rounded bg-dark-950 border border-white/10 space-y-2">
                  <span className="text-xs font-mono font-bold text-cute-pink block">Reel #2</span>
                  <input
                    type="text"
                    placeholder="Tag"
                    value={formData.socialEcosystem?.reel2Tag || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialEcosystem: { ...formData.socialEcosystem, reel2Tag: e.target.value }
                    })}
                    className="w-full px-2.5 py-1 rounded bg-dark-900 border border-white/10 text-xs text-white-crisp"
                  />
                  <input
                    type="text"
                    placeholder="Views"
                    value={formData.socialEcosystem?.reel2Views || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialEcosystem: { ...formData.socialEcosystem, reel2Views: e.target.value }
                    })}
                    className="w-full px-2.5 py-1 rounded bg-dark-900 border border-white/10 text-xs text-white-crisp"
                  />
                  <textarea
                    rows={2}
                    placeholder="Caption"
                    value={formData.socialEcosystem?.reel2Caption || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialEcosystem: { ...formData.socialEcosystem, reel2Caption: e.target.value }
                    })}
                    className="w-full px-2.5 py-1 rounded bg-dark-900 border border-white/10 text-xs text-white-dim resize-none"
                  />
                </div>

                {/* Reel 3 */}
                <div className="p-3.5 rounded bg-dark-950 border border-white/10 space-y-2">
                  <span className="text-xs font-mono font-bold text-cyan-neon block">Reel #3</span>
                  <input
                    type="text"
                    placeholder="Tag"
                    value={formData.socialEcosystem?.reel3Tag || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialEcosystem: { ...formData.socialEcosystem, reel3Tag: e.target.value }
                    })}
                    className="w-full px-2.5 py-1 rounded bg-dark-900 border border-white/10 text-xs text-white-crisp"
                  />
                  <input
                    type="text"
                    placeholder="Views"
                    value={formData.socialEcosystem?.reel3Views || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialEcosystem: { ...formData.socialEcosystem, reel3Views: e.target.value }
                    })}
                    className="w-full px-2.5 py-1 rounded bg-dark-900 border border-white/10 text-xs text-white-crisp"
                  />
                  <textarea
                    rows={2}
                    placeholder="Caption"
                    value={formData.socialEcosystem?.reel3Caption || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialEcosystem: { ...formData.socialEcosystem, reel3Caption: e.target.value }
                    })}
                    className="w-full px-2.5 py-1 rounded bg-dark-900 border border-white/10 text-xs text-white-dim resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: EDITORIAL CONTENT LAB CMS */}
        {/* ============================================================ */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-cute-pink" />
                  Editorial Content Lab Statement
                </span>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Headline Quote</label>
                <input
                  type="text"
                  value={formData.contentWriting?.headlineQuote || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    contentWriting: { ...formData.contentWriting, headlineQuote: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1">Section Description</label>
                <textarea
                  rows={2}
                  value={formData.contentWriting?.description || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    contentWriting: { ...formData.contentWriting, description: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs resize-none"
                />
              </div>
            </div>

            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-glow" />
                  Sample Writing Showcases
                </span>
              </div>

              {/* Brand Manifesto */}
              <div className="space-y-2 p-3.5 rounded bg-dark-950 border border-white/10">
                <span className="text-xs font-mono font-bold text-purple-mist block">Brand Manifesto Snippet</span>
                <input
                  type="text"
                  placeholder="Headline"
                  value={formData.contentWriting?.manifestoTitle || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    contentWriting: { ...formData.contentWriting, manifestoTitle: e.target.value }
                  })}
                  className="w-full px-2.5 py-1.5 rounded bg-dark-900 border border-white/10 text-xs text-white-crisp"
                />
                <textarea
                  rows={3}
                  placeholder="Manifesto Body Copy"
                  value={formData.contentWriting?.manifestoBody || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    contentWriting: { ...formData.contentWriting, manifestoBody: e.target.value }
                  })}
                  className="w-full px-2.5 py-1.5 rounded bg-dark-900 border border-white/10 text-xs text-white-dim resize-none"
                />
              </div>

              {/* Viral Hooks */}
              <div className="space-y-2 p-3.5 rounded bg-dark-950 border border-white/10">
                <span className="text-xs font-mono font-bold text-cyan-neon block">Viral Social Hooks Snippet</span>
                <input
                  type="text"
                  placeholder="Headline"
                  value={formData.contentWriting?.hooksTitle || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    contentWriting: { ...formData.contentWriting, hooksTitle: e.target.value }
                  })}
                  className="w-full px-2.5 py-1.5 rounded bg-dark-900 border border-white/10 text-xs text-white-crisp"
                />
                <textarea
                  rows={3}
                  placeholder="Hooks Body Copy"
                  value={formData.contentWriting?.hooksBody || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    contentWriting: { ...formData.contentWriting, hooksBody: e.target.value }
                  })}
                  className="w-full px-2.5 py-1.5 rounded bg-dark-900 border border-white/10 text-xs text-white-dim resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 6: CONTACT & FOOTER INFO */}
        {/* ============================================================ */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4 font-mono text-xs">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-neon" />
                  Contact Section Headline & Info
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white-muted uppercase block mb-1">Headline Prefix</label>
                  <input
                    type="text"
                    value={formData.contact?.headlinePrefix || "Let's Build Something"}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, headlinePrefix: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
                <div>
                  <label className="text-white-muted uppercase block mb-1">Headline Highlight</label>
                  <input
                    type="text"
                    value={formData.contact?.headlineHighlight || "Iconic Together."}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact: { ...formData.contact, headlineHighlight: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Public Inquiry Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                />
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Location / Timezone</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                />
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Booking Availability Status</label>
                <input
                  type="text"
                  value={formData.contact?.availabilityStatus || "Accepting Q1/Q2 Retainers"}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact: { ...formData.contact, availabilityStatus: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 7: FLOATING SOCIAL BAR & URLS */}
        {/* ============================================================ */}
        {activeTab === "socialLinks" && (
          <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4 font-mono text-xs">
            <div className="pb-3 border-b border-white/10">
              <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-glow" />
                Floating Social Dock & External URLs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-emerald-400 uppercase block mb-1">WhatsApp Chat URL (wa.me link)</label>
                <input
                  type="url"
                  value={formData.socialLinks?.whatsapp || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, whatsapp: e.target.value }
                  })}
                  placeholder="https://wa.me/15552345678"
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-emerald-500/40 text-emerald-300 text-xs"
                />
              </div>

              <div>
                <label className="text-blue-400 uppercase block mb-1">Facebook Page / Profile URL</label>
                <input
                  type="url"
                  value={formData.socialLinks?.facebook || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                  })}
                  placeholder="https://facebook.com/shally.creates"
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-blue-500/40 text-blue-300 text-xs"
                />
              </div>

              <div>
                <label className="text-pink-400 uppercase block mb-1">Instagram URL</label>
                <input
                  type="url"
                  value={formData.socialLinks?.instagram || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-pink-500/30 text-pink-300 text-xs"
                />
              </div>

              <div>
                <label className="text-cyan-400 uppercase block mb-1">TikTok URL</label>
                <input
                  type="url"
                  value={formData.socialLinks?.tiktok || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, tiktok: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-cyan-400/30 text-cyan-300 text-xs"
                />
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.socialLinks?.linkedin || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                />
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Behance URL</label>
                <input
                  type="url"
                  value={formData.socialLinks?.behance || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, behance: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 8: SEO METADATA */}
        {/* ============================================================ */}
        {activeTab === "seo" && (
          <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4 font-mono text-xs">
            <div className="pb-3 border-b border-white/10">
              <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                SEO Search Engine Meta Configuration
              </span>
            </div>

            <div>
              <label className="text-white-muted uppercase block mb-1">Meta Title Tag</label>
              <input
                type="text"
                value={formData.seo?.metaTitle || ""}
                onChange={(e) => setFormData({
                  ...formData,
                  seo: { ...formData.seo, metaTitle: e.target.value }
                })}
                className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
              />
            </div>

            <div>
              <label className="text-white-muted uppercase block mb-1">Meta Description</label>
              <textarea
                rows={3}
                value={formData.seo?.metaDescription || ""}
                onChange={(e) => setFormData({
                  ...formData,
                  seo: { ...formData.seo, metaDescription: e.target.value }
                })}
                className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs font-body resize-none"
              />
            </div>

            <div>
              <label className="text-white-muted uppercase block mb-1">Target Keywords</label>
              <input
                type="text"
                value={formData.seo?.keywords || ""}
                onChange={(e) => setFormData({
                  ...formData,
                  seo: { ...formData.seo, keywords: e.target.value }
                })}
                className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
              />
            </div>
          </div>
        )}

        {/* Bottom Save Action Button */}
        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-[5px] bg-gradient-to-r from-purple-deep via-purple-electric to-purple-soft text-white-pure font-heading font-bold text-sm shadow-glow-purple hover:brightness-110 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Publishing Changes..." : "Save & Publish Configuration"}</span>
          </button>
        </div>

      </form>

    </div>
  );
};

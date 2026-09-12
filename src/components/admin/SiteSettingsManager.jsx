import React, { useState, useEffect } from "react";
import { 
  Settings, Save, Sparkles, Film, Globe, Mail, CheckCircle2, 
  Shield, UploadCloud, Eye, Image as ImageIcon, Sliders, Play, Layers
} from "lucide-react";
import { fetchSettingsApi, updateSettingsApi, uploadFileToCloudinary } from "../../services/api";
import toast from "react-hot-toast";

export const SiteSettingsManager = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    siteTitle: "SHALLY ✨ Creative Content & Digital Experiences",
    tagline: "Social Media Marketing • Content Writing • Video Editing",
    email: "hello@shallycreates.com",
    phone: "+1 (555) 234-5678",
    location: "Worldwide Remote / EST Orbit",

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
      previewImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
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

    videoWorkspace: {
      badgeText: "NLE TIMELINE WORKSPACE",
      headlinePrefix: "Crafting",
      headlineHighlight: "Hypnotic Edits",
      headlineSuffix: "Frame by Frame",
      description: "Short-form video editing isn't just cutting clips—it's psychological pacing, rhythmic sound design, speed ramps, and retention engineering.",
      videoPreviewUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      subtitleHookText: "“STOP LOSING 70% OF SCROLLERS IN THE FIRST 3 SECONDS.”",
      trackV2Label: "[3s HOOK TITLE]",
      trackV1Label: "HOOK_CLIP_A.mp4",
      trackA1Label: "WHOOSH_01",
      trackA2Label: "VIRAL_TIKTOK_AUDIO_TREND.wav (128 BPM)"
    },

    socialLinks: {
      whatsapp: "https://wa.me/15552345678",
      facebook: "https://facebook.com/shally.creates",
      instagram: "https://instagram.com/shally.creates",
      tiktok: "https://tiktok.com/@shallytok",
      linkedin: "https://linkedin.com/in/shally-creative",
      behance: "https://behance.net/shally-portfolio"
    },
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
        const res = await fetchSettingsApi();
        if (res.success && res.data) {
          setFormData(prev => ({
            ...prev,
            ...res.data,
            hero: { ...prev.hero, ...(res.data.hero || {}) },
            videoWorkspace: { ...prev.videoWorkspace, ...(res.data.videoWorkspace || {}) },
            socialLinks: { ...prev.socialLinks, ...(res.data.socialLinks || {}) },
            seo: { ...prev.seo, ...(res.data.seo || {}) }
          }));
        }
      } catch (err) {
        toast.error("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleFileUpload = async (e, targetField) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const toastId = toast.loading(`Uploading to Cloudinary & converting to WebP...`);
    try {
      const res = await uploadFileToCloudinary(file);
      if (res.success && res.data?.url) {
        if (targetField === "heroImage") {
          setFormData(prev => ({
            ...prev,
            hero: { ...prev.hero, previewImage: res.data.url }
          }));
        } else if (targetField === "videoPreview") {
          setFormData(prev => ({
            ...prev,
            videoWorkspace: { ...prev.videoWorkspace, videoPreviewUrl: res.data.url }
          }));
        }
        toast.success(`Converted & Uploaded to WebP (${(res.data.bytes / 1024).toFixed(1)} KB)`, { id: toastId });
      } else {
        toast.error(res.message || "Upload failed", { id: toastId });
      }
    } catch (err) {
      toast.error("Upload error", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const toastId = toast.loading("Saving configuration...");
    try {
      const res = await updateSettingsApi(formData);
      if (res.success) {
        toast.success("All CMS settings saved & updated on live site! ✨", { id: toastId });
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
    { id: "video", label: "🎬 Video Workspace", icon: Film },
    { id: "general", label: "🌐 General & Social", icon: Globe },
    { id: "seo", label: "🛡️ SEO & Meta", icon: Shield }
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl text-white-pure flex items-center gap-2">
            <Settings className="w-6 h-6 text-purple-glow" />
            <span>Site CMS & Visual Manager</span>
          </h2>
          <p className="font-mono text-xs text-white-dim mt-0.5">
            Full control over Hero composition, Video Workspace timeline, copy, and Cloudinary media assets.
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
            className={`px-4 py-2 rounded-[4px] text-xs font-heading font-bold transition-all flex items-center gap-2 ${
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
            
            {/* Availability Badge */}
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

            {/* Hero Main Typography Headlines */}
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4 font-mono text-xs">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure">
                  Hero Headline Composition
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white-muted uppercase block mb-1">Greeting Text</label>
                  <input
                    type="text"
                    value={formData.hero.titleGreeting}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, titleGreeting: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs font-heading"
                  />
                </div>

                <div>
                  <label className="text-white-muted uppercase block mb-1">Name (Highlighted in Gradient)</label>
                  <input
                    type="text"
                    value={formData.hero.titleName}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, titleName: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-purple-mist text-xs font-heading font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white-muted uppercase block mb-1">Headline Line 2</label>
                  <input
                    type="text"
                    value={formData.hero.titleLine2}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, titleLine2: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs font-heading"
                  />
                </div>

                <div>
                  <label className="text-white-muted uppercase block mb-1">Headline Line 3 (Cute Gradient)</label>
                  <input
                    type="text"
                    value={formData.hero.titleLine3}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, titleLine3: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-cute-pink text-xs font-heading font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Hero Bio Description</label>
                <textarea
                  rows={3}
                  value={formData.hero.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    hero: { ...formData.hero, description: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs font-body leading-relaxed resize-none"
                />
              </div>

              {/* 3 Discipline Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-purple-soft uppercase block mb-1">Specialty Chip 1</label>
                  <input
                    type="text"
                    value={formData.hero.chip1}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, chip1: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded bg-dark-950 border border-purple-glow/30 text-purple-mist text-xs"
                  />
                </div>

                <div>
                  <label className="text-cute-pink uppercase block mb-1">Specialty Chip 2</label>
                  <input
                    type="text"
                    value={formData.hero.chip2}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, chip2: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded bg-dark-950 border border-cute-pink/30 text-cute-pink text-xs"
                  />
                </div>

                <div>
                  <label className="text-cyan-neon uppercase block mb-1">Specialty Chip 3</label>
                  <input
                    type="text"
                    value={formData.hero.chip3}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, chip3: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded bg-dark-950 border border-cyan-neon/30 text-cyan-ice text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Hero Floating Visual Asset & Cloudinary WebP Upload */}
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4 font-mono text-xs">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-cyan-neon" />
                  Hero Floating Video Preview & Motto
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={formData.hero.previewImage}
                  onChange={(e) => setFormData({
                    ...formData,
                    hero: { ...formData.hero, previewImage: e.target.value }
                  })}
                  placeholder="Paste URL or upload image below..."
                  className="flex-1 w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                />

                <label className="cursor-pointer px-4 py-2 rounded bg-cyan-deep/30 border border-cyan-neon/40 text-cyan-ice text-xs font-bold transition-all flex items-center gap-1.5 shrink-0">
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>{uploading ? "Converting..." : "Upload Hero WebP"}</span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    disabled={uploading}
                    onChange={(e) => handleFileUpload(e, "heroImage")}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Cute Motto Sticky Note Text</label>
                <input
                  type="text"
                  value={formData.hero.motto}
                  onChange={(e) => setFormData({
                    ...formData,
                    hero: { ...formData.hero, motto: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-cute-pink text-xs font-heading italic"
                />
              </div>
            </div>

            {/* Hero 4 Impact Metric KPI Banners */}
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4 font-mono text-xs">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure">
                  Hero KPI Statistics Bar
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-dark-950 rounded border border-purple-glow/30">
                  <label className="text-purple-mist uppercase block mb-1">KPI 1 Value</label>
                  <input
                    type="text"
                    value={formData.hero.stat1Val}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, stat1Val: e.target.value }
                    })}
                    className="w-full px-2 py-1 rounded bg-dark-900 border border-white/10 text-white-pure font-bold mb-1.5"
                  />
                  <input
                    type="text"
                    value={formData.hero.stat1Label}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, stat1Label: e.target.value }
                    })}
                    className="w-full px-2 py-1 rounded bg-dark-900 border border-white/10 text-[10px] text-white-muted"
                  />
                </div>

                <div className="p-3 bg-dark-950 rounded border border-cyan-neon/30">
                  <label className="text-cyan-ice uppercase block mb-1">KPI 2 Value</label>
                  <input
                    type="text"
                    value={formData.hero.stat2Val}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, stat2Val: e.target.value }
                    })}
                    className="w-full px-2 py-1 rounded bg-dark-900 border border-white/10 text-cyan-neon font-bold mb-1.5"
                  />
                  <input
                    type="text"
                    value={formData.hero.stat2Label}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, stat2Label: e.target.value }
                    })}
                    className="w-full px-2 py-1 rounded bg-dark-900 border border-white/10 text-[10px] text-white-muted"
                  />
                </div>

                <div className="p-3 bg-dark-950 rounded border border-cute-pink/30">
                  <label className="text-cute-pink uppercase block mb-1">KPI 3 Value</label>
                  <input
                    type="text"
                    value={formData.hero.stat3Val}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, stat3Val: e.target.value }
                    })}
                    className="w-full px-2 py-1 rounded bg-dark-900 border border-white/10 text-cute-pink font-bold mb-1.5"
                  />
                  <input
                    type="text"
                    value={formData.hero.stat3Label}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, stat3Label: e.target.value }
                    })}
                    className="w-full px-2 py-1 rounded bg-dark-900 border border-white/10 text-[10px] text-white-muted"
                  />
                </div>

                <div className="p-3 bg-dark-950 rounded border border-emerald-500/30">
                  <label className="text-emerald-400 uppercase block mb-1">KPI 4 Value</label>
                  <input
                    type="text"
                    value={formData.hero.stat4Val}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, stat4Val: e.target.value }
                    })}
                    className="w-full px-2 py-1 rounded bg-dark-900 border border-white/10 text-emerald-400 font-bold mb-1.5"
                  />
                  <input
                    type="text"
                    value={formData.hero.stat4Label}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, stat4Label: e.target.value }
                    })}
                    className="w-full px-2 py-1 rounded bg-dark-900 border border-white/10 text-[10px] text-white-muted"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: VIDEO EDITING WORKSPACE CMS */}
        {/* ============================================================ */}
        {activeTab === "video" && (
          <div className="space-y-6">
            
            {/* Video Section Header Headlines */}
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4 font-mono text-xs">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <Film className="w-4 h-4 text-cyan-neon" />
                  Video Workspace Headline & Copy
                </span>
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Badge Label</label>
                <input
                  type="text"
                  value={formData.videoWorkspace.badgeText}
                  onChange={(e) => setFormData({
                    ...formData,
                    videoWorkspace: { ...formData.videoWorkspace, badgeText: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-cyan-neon text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-white-muted uppercase block mb-1">Headline Prefix</label>
                  <input
                    type="text"
                    value={formData.videoWorkspace.headlinePrefix}
                    onChange={(e) => setFormData({
                      ...formData,
                      videoWorkspace: { ...formData.videoWorkspace, headlinePrefix: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs font-heading font-bold"
                  />
                </div>

                <div>
                  <label className="text-cyan-neon uppercase block mb-1">Headline Gradient Focus</label>
                  <input
                    type="text"
                    value={formData.videoWorkspace.headlineHighlight}
                    onChange={(e) => setFormData({
                      ...formData,
                      videoWorkspace: { ...formData.videoWorkspace, headlineHighlight: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-cyan-neon/40 text-cyan-ice text-xs font-heading font-bold"
                  />
                </div>

                <div>
                  <label className="text-white-muted uppercase block mb-1">Headline Suffix</label>
                  <input
                    type="text"
                    value={formData.videoWorkspace.headlineSuffix}
                    onChange={(e) => setFormData({
                      ...formData,
                      videoWorkspace: { ...formData.videoWorkspace, headlineSuffix: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs font-heading font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Section Subtext</label>
                <textarea
                  rows={2}
                  value={formData.videoWorkspace.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    videoWorkspace: { ...formData.videoWorkspace, description: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs font-body resize-none"
                />
              </div>
            </div>

            {/* Video Preview Asset & Subtitles */}
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4 font-mono text-xs">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <Play className="w-4 h-4 text-purple-glow" />
                  Monitor Media Asset & Subtitle Hook
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={formData.videoWorkspace.videoPreviewUrl}
                  onChange={(e) => setFormData({
                    ...formData,
                    videoWorkspace: { ...formData.videoWorkspace, videoPreviewUrl: e.target.value }
                  })}
                  placeholder="Paste video/image URL or upload below..."
                  className="flex-1 w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                />

                <label className="cursor-pointer px-4 py-2 rounded bg-purple-deep/30 border border-purple-glow/40 text-purple-mist text-xs font-bold transition-all flex items-center gap-1.5 shrink-0">
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>{uploading ? "Converting..." : "Upload Video WebP"}</span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    disabled={uploading}
                    onChange={(e) => handleFileUpload(e, "videoPreview")}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Live Lower-Third Hook Subtitle Text</label>
                <input
                  type="text"
                  value={formData.videoWorkspace.subtitleHookText}
                  onChange={(e) => setFormData({
                    ...formData,
                    videoWorkspace: { ...formData.videoWorkspace, subtitleHookText: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-cyan-neon/30 text-white-pure text-xs font-heading font-bold"
                />
              </div>
            </div>

            {/* Timeline Tracks Custom Labels */}
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
        {/* TAB 3: GENERAL & SOCIAL CHANNELS */}
        {/* ============================================================ */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4 font-mono text-xs">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cute-pink" />
                  Direct Contact Information
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <label className="text-white-muted uppercase block mb-1">Location / Timezone Orbit</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 space-y-4 font-mono text-xs">
              <div className="pb-3 border-b border-white/10">
                <span className="font-heading font-bold text-sm text-white-pure flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-glow" />
                  Social Media Links
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white-muted uppercase block mb-1">WhatsApp Chat Link (e.g. https://wa.me/...)</label>
                  <input
                    type="url"
                    value={formData.socialLinks?.whatsapp || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, whatsapp: e.target.value }
                    })}
                    placeholder="https://wa.me/15552345678"
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-emerald-500/40 text-emerald-300 text-xs placeholder:text-white-dim/40"
                  />
                </div>

                <div>
                  <label className="text-white-muted uppercase block mb-1">Facebook Page / Profile URL</label>
                  <input
                    type="url"
                    value={formData.socialLinks?.facebook || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                    })}
                    placeholder="https://facebook.com/shally.creates"
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-blue-500/40 text-blue-300 text-xs placeholder:text-white-dim/40"
                  />
                </div>

                <div>
                  <label className="text-white-muted uppercase block mb-1">Instagram URL</label>
                  <input
                    type="url"
                    value={formData.socialLinks?.instagram || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>

                <div>
                  <label className="text-white-muted uppercase block mb-1">TikTok URL</label>
                  <input
                    type="url"
                    value={formData.socialLinks?.tiktok || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, tiktok: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp text-xs"
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
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: SEO METADATA */}
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

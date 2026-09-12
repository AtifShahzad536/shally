import React, { useState, useEffect } from "react";
import { 
  FolderKanban, Plus, Edit2, Trash2, Search, Sparkles, 
  UploadCloud, CheckCircle2, X, Eye, ExternalLink, Image as ImageIcon
} from "lucide-react";
import { 
  fetchProjects, createProjectApi, updateProjectApi, deleteProjectApi, uploadFileToCloudinary 
} from "../../services/api";
import toast from "react-hot-toast";

export const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Social Media",
    client: "",
    year: "2026",
    role: "Lead Content & Creative Director",
    coverImage: "",
    mockupType: "instagram",
    featured: false,
    accentColor: "#A855F7",
    shortDescription: "",
    fullDescription: "",
    deliverables: "",
    tags: "",
    tools: "",
    metric1Label: "Organic Views",
    metric1Val: "2.4M+",
    metric2Label: "Engagement Rate",
    metric2Val: "8.6%"
  });

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
      setFilteredProjects(data);
    } catch (err) {
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    let list = [...projects];
    if (categoryFilter !== "All") {
      list = list.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
    }
    if (search.trim()) {
      list = list.filter(p => 
        p.title.toLowerCase().includes(search.toLowerCase()) || 
        p.client.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredProjects(list);
  }, [search, categoryFilter, projects]);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      category: "Social Media",
      client: "",
      year: "2026",
      role: "Lead Creative Specialist",
      coverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
      mockupType: "instagram",
      featured: false,
      accentColor: "#A855F7",
      shortDescription: "",
      fullDescription: "",
      deliverables: "Viral Reels Production\nContent Calendar & Grid Curation\nHigh-Converting Hook Scripts",
      tags: "Reels Strategy, Viral Hook, UGC Direction",
      tools: "CapCut Pro, Adobe Premiere Pro, Canva, Notion",
      metric1Label: "Organic Reach",
      metric1Val: "3.8M+",
      metric2Label: "Engagement Lift",
      metric2Val: "+320%"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      slug: project.slug || "",
      category: project.category || "Social Media",
      client: project.client || "",
      year: project.year || "2026",
      role: project.role || "",
      coverImage: project.coverImage || "",
      mockupType: project.mockupType || "instagram",
      featured: project.featured || false,
      accentColor: project.accentColor || "#A855F7",
      shortDescription: project.shortDescription || "",
      fullDescription: project.fullDescription || "",
      deliverables: Array.isArray(project.deliverables) ? project.deliverables.join("\n") : (project.deliverables || ""),
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : (project.tags || ""),
      tools: Array.isArray(project.tools) ? project.tools.join(", ") : (project.tools || ""),
      metric1Label: project.metrics?.[0]?.label || "Metric 1",
      metric1Val: project.metrics?.[0]?.value || "100k",
      metric2Label: project.metrics?.[1]?.label || "Metric 2",
      metric2Val: project.metrics?.[1]?.value || "8.5%"
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const toastId = toast.loading("Uploading to Cloudinary & converting to WebP...");
    try {
      const res = await uploadFileToCloudinary(file);
      if (res.success && res.data?.url) {
        setFormData(prev => ({ ...prev, coverImage: res.data.url }));
        toast.success(`Uploaded & Converted to WebP format (${(res.data.bytes / 1024).toFixed(1)} KB)`, { id: toastId });
      } else {
        toast.error(res.message || "Upload failed", { id: toastId });
      }
    } catch (err) {
      toast.error("Upload error.", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.client) {
      toast.error("Please fill in project title and client.");
      return;
    }

    const payload = {
      ...formData,
      metrics: [
        { label: formData.metric1Label, value: formData.metric1Val },
        { label: formData.metric2Label, value: formData.metric2Val }
      ]
    };

    const toastId = toast.loading(editingProject ? "Updating case study..." : "Creating case study...");
    try {
      if (editingProject) {
        const res = await updateProjectApi(editingProject.id || editingProject._id, payload);
        if (res.success) {
          toast.success("Project updated successfully! ✨", { id: toastId });
          setIsModalOpen(false);
          loadProjects();
        } else {
          toast.error(res.message || "Failed to update", { id: toastId });
        }
      } else {
        const res = await createProjectApi(payload);
        if (res.success) {
          toast.success("New Project created successfully! 🚀", { id: toastId });
          setIsModalOpen(false);
          loadProjects();
        } else {
          toast.error(res.message || "Failed to create", { id: toastId });
        }
      }
    } catch (err) {
      toast.error("Server connection error.", { id: toastId });
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    const toastId = toast.loading("Deleting project...");
    try {
      const res = await deleteProjectApi(id);
      if (res.success) {
        toast.success("Project deleted successfully.", { id: toastId });
        loadProjects();
      } else {
        toast.error(res.message || "Delete failed", { id: toastId });
      }
    } catch (err) {
      toast.error("Error deleting project", { id: toastId });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & New Project CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl text-white-pure flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-purple-glow" />
            <span>Case Studies & Projects</span>
          </h2>
          <p className="font-mono text-xs text-white-dim mt-0.5">
            Manage your portfolio case studies, deliverables, metrics, and media.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-[5px] bg-gradient-to-r from-purple-deep via-purple-electric to-purple-soft text-white-pure font-heading font-bold text-xs shadow-glow-purple hover:brightness-110 transition-all flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-dark-900/80 p-3 rounded-[5px] border border-white/10">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-white-muted absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by project title or client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-[4px] bg-dark-950 border border-white/10 text-xs font-mono text-white-crisp placeholder:text-white-muted/40 focus:outline-none focus:border-purple-glow"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["All", "Social Media", "Video Editing", "Content Writing"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-[3px] text-xs font-mono font-medium transition-all ${
                categoryFilter === cat
                  ? "bg-purple-deep text-white-pure border border-purple-glow/40 shadow-glow-purple/20"
                  : "bg-dark-950 text-white-muted hover:text-white-crisp border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid List */}
      {loading ? (
        <div className="py-16 text-center font-mono text-xs text-purple-mist">
          Loading case studies...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-16 text-center glass-panel rounded-[5px] border border-white/10 p-8">
          <p className="font-mono text-sm text-white-muted">No projects found matching query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id || p._id}
              className="glass-panel rounded-[5px] border border-white/15 bg-dark-900/90 overflow-hidden flex flex-col justify-between group hover:border-purple-glow/50 transition-all shadow-xl"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <img
                  src={p.coverImage}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-[3px] bg-dark-950/90 text-purple-mist border border-white/15 uppercase font-bold">
                    {p.category}
                  </span>
                  {p.featured && (
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-[3px] bg-cyan-deep text-cyan-ice font-bold">
                      ★ FEATURED
                    </span>
                  )}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-sm text-white-pure mb-1 line-clamp-1">
                    {p.title}
                  </h3>
                  <p className="font-mono text-[11px] text-cute-pink mb-2">
                    Client: {p.client} ({p.year})
                  </p>
                  <p className="text-white-dim text-xs line-clamp-2 leading-relaxed">
                    {p.shortDescription}
                  </p>
                </div>

                {/* Metrics Pill & Action Buttons */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-cyan-neon font-bold">
                    {p.metrics?.[0]?.value || "1.2M+"}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 rounded-[3px] bg-dark-800 border border-white/15 text-white-dim hover:text-white-pure hover:border-purple-glow transition-all"
                      title="Edit Project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id || p._id, p.title)}
                      className="p-1.5 rounded-[3px] bg-dark-800 border border-white/15 text-white-dim hover:text-rose-400 hover:border-rose-500/40 transition-all"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================================================ */}
      {/* CREATE / EDIT PROJECT MODAL (5px Radius Standards) */}
      {/* ============================================================ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div 
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-dark-950/80 backdrop-blur-md"
          />

          <div className="relative w-full max-w-3xl bg-dark-900 border border-white/20 rounded-[5px] shadow-2xl z-10 my-auto flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-dark-950 px-6 py-4 border-b border-white/10 flex items-center justify-between sticky top-0 z-20">
              <span className="font-heading font-bold text-base text-white-pure">
                {editingProject ? `Edit Case Study: ${editingProject.title}` : "Create New Case Study"}
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-[4px] bg-dark-850 text-white-dim hover:text-white-pure"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSaveProject} className="p-6 overflow-y-auto space-y-4 text-xs font-mono">
              
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white-muted uppercase block mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. LUMINA GLOW — Skincare Viral Launch"
                    className="w-full px-3 py-2 rounded-[4px] bg-dark-950 border border-white/15 text-white-crisp text-xs focus:outline-none focus:border-purple-glow font-body"
                  />
                </div>

                <div>
                  <label className="text-white-muted uppercase block mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. lumina-glow-skincare"
                    className="w-full px-3 py-2 rounded-[4px] bg-dark-950 border border-white/15 text-white-crisp text-xs focus:outline-none focus:border-cyan-neon font-body"
                  />
                </div>
              </div>

              {/* Category, Client, Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-white-muted uppercase block mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-[4px] bg-dark-950 border border-white/15 text-white-crisp text-xs focus:outline-none focus:border-purple-glow font-body"
                  >
                    <option value="Social Media">Social Media</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Content Writing">Content Writing</option>
                  </select>
                </div>

                <div>
                  <label className="text-white-muted uppercase block mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Lumina Beauty Paris"
                    className="w-full px-3 py-2 rounded-[4px] bg-dark-950 border border-white/15 text-white-crisp text-xs focus:outline-none focus:border-purple-glow font-body"
                  />
                </div>

                <div>
                  <label className="text-white-muted uppercase block mb-1">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-[4px] bg-dark-950 border border-white/15 text-white-crisp text-xs focus:outline-none focus:border-purple-glow font-body"
                  />
                </div>
              </div>

              {/* Cloudinary File & WebP Image Upload Section */}
              <div className="p-4 rounded-[5px] bg-dark-950 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white-pure flex items-center gap-1.5">
                    <UploadCloud className="w-4 h-4 text-cyan-neon" />
                    Cover Image / Video (Cloudinary + WebP Auto Convert)
                  </span>
                  <span className="text-[10px] text-purple-mist">Format: WebP / MP4</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="Paste image/video URL or upload below..."
                    className="flex-1 w-full px-3 py-2 rounded-[4px] bg-dark-900 border border-white/15 text-white-crisp text-xs focus:outline-none focus:border-cyan-neon"
                  />

                  <label className="cursor-pointer px-4 py-2 rounded-[4px] bg-cyan-deep/30 border border-cyan-neon/40 text-cyan-ice hover:bg-cyan-deep/50 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>{uploading ? "Converting to WebP..." : "Upload File"}</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>

                {formData.coverImage && (
                  <div className="h-28 w-44 rounded-[4px] overflow-hidden border border-white/20 bg-black relative">
                    <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 bg-dark-950/80 px-1.5 py-0.5 rounded text-[8px] text-emerald-400">
                      WEBP READY
                    </span>
                  </div>
                )}
              </div>

              {/* Short & Full Description */}
              <div>
                <label className="text-white-muted uppercase block mb-1">Short Description (Cards Preview) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="30-day viral TikTok & IG Reels campaign generating over 4.2M views..."
                  className="w-full px-3 py-2 rounded-[4px] bg-dark-950 border border-white/15 text-white-crisp text-xs focus:outline-none focus:border-purple-glow font-body resize-none"
                />
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Full Detailed Case Study Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Deep dive explanation of challenge, creative execution, and results..."
                  className="w-full px-3 py-2 rounded-[4px] bg-dark-950 border border-white/15 text-white-crisp text-xs focus:outline-none focus:border-purple-glow font-body resize-none"
                />
              </div>

              {/* Deliverables & Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white-muted uppercase block mb-1">Deliverables (One per line)</label>
                  <textarea
                    rows={3}
                    value={formData.deliverables}
                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                    placeholder="Viral Reels Production&#10;Aesthetic Grid Curation&#10;Influencer Kit"
                    className="w-full px-3 py-2 rounded-[4px] bg-dark-950 border border-white/15 text-white-crisp text-xs focus:outline-none focus:border-cute-pink font-mono resize-none"
                  />
                </div>

                <div>
                  <label className="text-white-muted uppercase block mb-1">Tools (Comma separated)</label>
                  <textarea
                    rows={3}
                    value={formData.tools}
                    onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                    placeholder="Adobe Premiere Pro, CapCut, Canva, Notion"
                    className="w-full px-3 py-2 rounded-[4px] bg-dark-950 border border-white/15 text-white-crisp text-xs focus:outline-none focus:border-cyan-neon font-mono resize-none"
                  />
                </div>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-white-muted uppercase block mb-1">Metric 1 Value</label>
                  <input
                    type="text"
                    value={formData.metric1Val}
                    onChange={(e) => setFormData({ ...formData, metric1Val: e.target.value })}
                    placeholder="4.2M+"
                    className="w-full px-3 py-1.5 rounded-[4px] bg-dark-950 border border-white/15 text-white-crisp text-xs font-bold text-cyan-neon"
                  />
                </div>
                <div>
                  <label className="text-white-muted uppercase block mb-1">Metric 1 Label</label>
                  <input
                    type="text"
                    value={formData.metric1Label}
                    onChange={(e) => setFormData({ ...formData, metric1Label: e.target.value })}
                    placeholder="Organic Reach"
                    className="w-full px-3 py-1.5 rounded-[4px] bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
                <div>
                  <label className="text-white-muted uppercase block mb-1">Metric 2 Value</label>
                  <input
                    type="text"
                    value={formData.metric2Val}
                    onChange={(e) => setFormData({ ...formData, metric2Val: e.target.value })}
                    placeholder="+340%"
                    className="w-full px-3 py-1.5 rounded-[4px] bg-dark-950 border border-white/15 text-white-crisp text-xs font-bold text-cute-pink"
                  />
                </div>
                <div>
                  <label className="text-white-muted uppercase block mb-1">Metric 2 Label</label>
                  <input
                    type="text"
                    value={formData.metric2Label}
                    onChange={(e) => setFormData({ ...formData, metric2Label: e.target.value })}
                    placeholder="Follower Lift"
                    className="w-full px-3 py-1.5 rounded-[4px] bg-dark-950 border border-white/15 text-white-crisp text-xs"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-[4px] bg-dark-800 border border-white/15 text-white-muted hover:text-white-crisp text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-[4px] bg-gradient-to-r from-purple-deep to-purple-soft text-white-pure font-heading font-bold text-xs shadow-glow-purple hover:brightness-110 transition-all"
                >
                  {editingProject ? "Save Changes" : "Publish Project"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

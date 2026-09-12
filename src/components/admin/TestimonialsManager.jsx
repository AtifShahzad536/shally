import React, { useState, useEffect } from "react";
import { MessageSquareQuote, Plus, Edit2, Trash2, Star, X, UploadCloud } from "lucide-react";
import { fetchTestimonials, createTestimonialApi, updateTestimonialApi, deleteTestimonialApi, uploadFileToCloudinary } from "../../services/api";
import toast from "react-hot-toast";

export const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    quote: "",
    rating: 5,
    tag: "Social Media & Reels"
  });

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const data = await fetchTestimonials();
      setTestimonials(data);
    } catch (err) {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      role: "Creative Director",
      company: "Studio Brand",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: "",
      rating: 5,
      tag: "Social Media & Reels"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingItem(t);
    setFormData({
      name: t.name || "",
      role: t.role || "",
      company: t.company || "",
      avatar: t.avatar || "",
      quote: t.quote || "",
      rating: t.rating || 5,
      tag: t.tag || "Review"
    });
    setIsModalOpen(true);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const toastId = toast.loading("Uploading avatar to Cloudinary (WebP)...");
    try {
      const res = await uploadFileToCloudinary(file);
      if (res.success && res.data?.url) {
        setFormData(prev => ({ ...prev, avatar: res.data.url }));
        toast.success("Avatar converted to WebP successfully!", { id: toastId });
      } else {
        toast.error("Upload failed", { id: toastId });
      }
    } catch (err) {
      toast.error("Upload error", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(editingItem ? "Updating testimonial..." : "Adding testimonial...");
    try {
      if (editingItem) {
        const res = await updateTestimonialApi(editingItem.id || editingItem._id, formData);
        if (res.success) {
          toast.success("Testimonial updated!", { id: toastId });
          setIsModalOpen(false);
          loadTestimonials();
        } else {
          toast.error(res.message, { id: toastId });
        }
      } else {
        const res = await createTestimonialApi(formData);
        if (res.success) {
          toast.success("Testimonial added!", { id: toastId });
          setIsModalOpen(false);
          loadTestimonials();
        } else {
          toast.error(res.message, { id: toastId });
        }
      }
    } catch (err) {
      toast.error("Server error", { id: toastId });
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete review from "${name}"?`)) return;
    const toastId = toast.loading("Deleting review...");
    try {
      const res = await deleteTestimonialApi(id);
      if (res.success) {
        toast.success("Review deleted.", { id: toastId });
        loadTestimonials();
      }
    } catch (err) {
      toast.error("Error deleting", { id: toastId });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl text-white-pure flex items-center gap-2">
            <MessageSquareQuote className="w-6 h-6 text-purple-glow" />
            <span>Client Testimonials</span>
          </h2>
          <p className="font-mono text-xs text-white-dim mt-0.5">
            Manage client reviews, ratings, avatars, and endorsements.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-[5px] bg-gradient-to-r from-purple-deep to-purple-soft text-white-pure font-heading font-bold text-xs shadow-glow-purple flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center font-mono text-xs text-purple-mist">Loading testimonials...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id || t._id}
              className="glass-panel p-6 rounded-[5px] border border-white/15 bg-dark-900/90 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => handleOpenEdit(t)} className="p-1 rounded bg-dark-800 text-white-dim hover:text-white-crisp">
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button onClick={() => handleDelete(t.id || t._id, t.name)} className="p-1 rounded bg-dark-800 text-white-dim hover:text-rose-400">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <p className="text-white-crisp text-xs italic leading-relaxed mb-4">
                  “{t.quote}”
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover border border-purple-glow/40" />
                <div>
                  <p className="font-heading text-xs font-bold text-white-pure">{t.name}</p>
                  <p className="font-mono text-[10px] text-white-muted">{t.role} • <span className="text-cute-pink">{t.company}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-dark-950/80 backdrop-blur-md" />
          <div className="relative w-full max-w-lg bg-dark-900 border border-white/20 rounded-[5px] p-6 z-10 shadow-2xl">
            <h3 className="font-heading font-bold text-base text-white-pure mb-4">
              {editingItem ? "Edit Testimonial" : "Add Testimonial"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white-muted uppercase block mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp font-body"
                  />
                </div>
                <div>
                  <label className="text-white-muted uppercase block mb-1">Company / Brand</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp font-body"
                  />
                </div>
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Founder & Creative Director"
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp font-body"
                />
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Avatar Image (Cloudinary WebP)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    className="flex-1 px-3 py-1.5 rounded bg-dark-950 border border-white/15 text-white-crisp"
                  />
                  <label className="cursor-pointer px-3 py-1.5 rounded bg-cyan-deep/30 border border-cyan-neon/40 text-cyan-ice text-xs flex items-center gap-1 shrink-0">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Review Quote</label>
                <textarea
                  rows={3}
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp font-body"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 bg-dark-800 rounded text-white-muted">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-1.5 bg-purple-deep rounded text-white-pure font-bold">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

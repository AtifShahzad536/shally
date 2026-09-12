import React, { useState, useEffect } from "react";
import { Sparkles, Plus, Edit2, Trash2, CheckCircle2, X } from "lucide-react";
import { fetchServices, createServiceApi, updateServiceApi, deleteServiceApi } from "../../services/api";
import toast from "react-hot-toast";

export const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    id: "01",
    title: "",
    subtitle: "",
    tagline: "",
    description: "",
    deliverables: "",
    stats: "",
    accent: "#A855F7"
  });

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await fetchServices();
      setServices(data);
    } catch (err) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenCreate = () => {
    setEditingService(null);
    setFormData({
      id: "0" + (services.length + 1),
      title: "",
      subtitle: "",
      tagline: "",
      description: "",
      deliverables: "Deliverable 1\nDeliverable 2\nDeliverable 3",
      stats: "Average client growth: +300%",
      accent: "#A855F7"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv) => {
    setEditingService(srv);
    setFormData({
      id: srv.id || "01",
      title: srv.title || "",
      subtitle: srv.subtitle || "",
      tagline: srv.tagline || "",
      description: srv.description || "",
      deliverables: Array.isArray(srv.deliverables) ? srv.deliverables.join("\n") : (srv.deliverables || ""),
      stats: srv.stats || "",
      accent: srv.accent || "#A855F7"
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(editingService ? "Updating service..." : "Creating service...");
    try {
      if (editingService) {
        const res = await updateServiceApi(editingService.id || editingService._id, formData);
        if (res.success) {
          toast.success("Service updated!", { id: toastId });
          setIsModalOpen(false);
          loadServices();
        } else {
          toast.error(res.message || "Failed to update", { id: toastId });
        }
      } else {
        const res = await createServiceApi(formData);
        if (res.success) {
          toast.success("Service created!", { id: toastId });
          setIsModalOpen(false);
          loadServices();
        } else {
          toast.error(res.message || "Failed to create", { id: toastId });
        }
      }
    } catch (err) {
      toast.error("Server error", { id: toastId });
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete service "${title}"?`)) return;
    const toastId = toast.loading("Deleting service...");
    try {
      const res = await deleteServiceApi(id);
      if (res.success) {
        toast.success("Service deleted.", { id: toastId });
        loadServices();
      } else {
        toast.error(res.message || "Failed to delete", { id: toastId });
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
            <Sparkles className="w-6 h-6 text-purple-glow" />
            <span>Service Capabilities</span>
          </h2>
          <p className="font-mono text-xs text-white-dim mt-0.5">
            Configure core service cards, deliverables, and rates.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-[5px] bg-gradient-to-r from-purple-deep to-purple-soft text-white-pure font-heading font-bold text-xs shadow-glow-purple flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center font-mono text-xs text-purple-mist">Loading services...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id || srv._id}
              className="glass-panel p-6 rounded-[5px] border border-white/15 bg-dark-900/90 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-white/30">{srv.id}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(srv)}
                      className="p-1.5 rounded-[3px] bg-dark-800 border border-white/10 text-white-dim hover:text-white-crisp"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(srv.id || srv._id, srv.title)}
                      className="p-1.5 rounded-[3px] bg-dark-800 border border-white/10 text-white-dim hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-white-pure mb-1">{srv.title}</h3>
                <p className="font-mono text-xs text-cute-pink mb-3">{srv.subtitle}</p>
                <p className="text-white-dim text-xs leading-relaxed mb-4">{srv.description}</p>

                <div className="space-y-1.5 text-xs font-mono text-white-crisp pt-3 border-t border-white/10">
                  {srv.deliverables?.map((del, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-glow" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[10px] text-cyan-neon">
                {srv.stats}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-dark-950/80 backdrop-blur-md" />
          <div className="relative w-full max-w-xl bg-dark-900 border border-white/20 rounded-[5px] p-6 z-10 shadow-2xl">
            <h3 className="font-heading font-bold text-base text-white-pure mb-4">
              {editingService ? "Edit Service" : "Add Service"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-white-muted uppercase block mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Social Media Marketing"
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp font-body"
                />
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Subtitle / Specialty</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Organic Growth & High-Retention Strategy"
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp font-body"
                />
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp font-body"
                />
              </div>

              <div>
                <label className="text-white-muted uppercase block mb-1">Deliverables (One per line)</label>
                <textarea
                  rows={3}
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-dark-950 border border-white/15 text-white-crisp"
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

import React, { useState, useEffect } from "react";
import { Inbox, Trash2, Mail, CheckCircle2, Clock, DollarSign, Send, RefreshCw } from "lucide-react";
import { fetchInquiriesApi, updateInquiryStatusApi, deleteInquiryApi } from "../../services/api";
import toast from "react-hot-toast";

export const InquiriesManager = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetchInquiriesApi();
      if (res.success && res.data) {
        setInquiries(res.data);
      }
    } catch (err) {
      toast.error("Failed to load inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const toastId = toast.loading("Updating status...");
    try {
      const res = await updateInquiryStatusApi(id, newStatus);
      if (res.success) {
        toast.success(`Inquiry marked as ${newStatus}`, { id: toastId });
        loadInquiries();
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Status update error", { id: toastId });
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete inquiry from "${name}"?`)) return;
    const toastId = toast.loading("Deleting inquiry...");
    try {
      const res = await deleteInquiryApi(id);
      if (res.success) {
        toast.success("Inquiry deleted.", { id: toastId });
        loadInquiries();
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Delete error", { id: toastId });
    }
  };

  const filteredList = filter === "All"
    ? inquiries
    : inquiries.filter(i => i.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl text-white-pure flex items-center gap-2">
            <Inbox className="w-6 h-6 text-cute-pink" />
            <span>Client Inquiry Inbox</span>
          </h2>
          <p className="font-mono text-xs text-white-dim mt-0.5">
            Incoming brand collaborations, retainer requests, and budget scopes.
          </p>
        </div>

        <button
          onClick={loadInquiries}
          className="px-3 py-1.5 rounded-[4px] bg-dark-800 border border-white/10 text-white-muted hover:text-white-crisp text-xs font-mono flex items-center gap-1.5 w-fit"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 bg-dark-900/80 p-2 rounded-[5px] border border-white/10 w-fit">
        {["All", "New", "Contacted", "Closed"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded-[3px] text-xs font-mono transition-all ${
              filter === s
                ? "bg-purple-deep text-white-pure font-bold shadow-glow-purple/20"
                : "text-white-dim hover:text-white-pure"
            }`}
          >
            {s} {s === "New" && `(${inquiries.filter(i => i.status === "New").length})`}
          </button>
        ))}
      </div>

      {/* Inquiry Cards List */}
      {loading ? (
        <div className="py-16 text-center font-mono text-xs text-purple-mist">Loading inquiries...</div>
      ) : filteredList.length === 0 ? (
        <div className="py-16 text-center glass-panel rounded-[5px] border border-white/10 p-8 font-mono text-sm text-white-muted">
          No inquiries found for this status.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredList.map((inq) => (
            <div
              key={inq.id || inq._id}
              className={`glass-panel p-6 rounded-[5px] border transition-all bg-dark-900/90 ${
                inq.status === "New"
                  ? "border-cute-pink/40 shadow-glow-pink/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-bold text-base text-white-pure">{inq.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      inq.status === "New"
                        ? "bg-cute-pink/20 text-cute-pink border border-cute-pink/30"
                        : inq.status === "Contacted"
                        ? "bg-cyan-deep/20 text-cyan-ice border border-cyan-neon/30"
                        : "bg-dark-800 text-white-muted"
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <a href={`mailto:${inq.email}`} className="font-mono text-xs text-purple-soft hover:underline">
                    {inq.email}
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded bg-dark-950 text-cyan-neon border border-cyan-neon/30 font-bold">
                    Budget: {inq.budget}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-dark-950 text-purple-mist border border-white/10">
                    Service: {inq.service}
                  </span>
                </div>
              </div>

              {/* Message Body */}
              <div className="py-4 text-xs font-body text-white-crisp leading-relaxed bg-dark-950/60 p-4 rounded-[4px] my-3 border border-white/5">
                {inq.message}
              </div>

              {/* Bottom Action Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono pt-2">
                <span className="text-white-muted text-[11px]">
                  Submitted: {new Date(inq.createdAt).toLocaleString()}
                </span>

                <div className="flex items-center gap-2">
                  <select
                    value={inq.status}
                    onChange={(e) => handleStatusChange(inq.id || inq._id, e.target.value)}
                    className="px-2.5 py-1 rounded bg-dark-800 border border-white/15 text-white-crisp text-xs focus:outline-none"
                  >
                    <option value="New">Mark: New</option>
                    <option value="Contacted">Mark: Contacted</option>
                    <option value="Closed">Mark: Closed</option>
                  </select>

                  <a
                    href={`mailto:${inq.email}?subject=Re: Your Creative Collaboration Inquiry with Shally`}
                    className="px-3 py-1 rounded bg-purple-deep/40 text-purple-soft border border-purple-glow/40 hover:bg-purple-deep hover:text-white-pure transition-all flex items-center gap-1 font-bold"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </a>

                  <button
                    onClick={() => handleDelete(inq.id || inq._id, inq.name)}
                    className="p-1.5 rounded bg-dark-800 text-white-muted hover:text-rose-400 border border-white/10"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

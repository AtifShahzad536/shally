import React, { useState } from "react";
import { UploadCloud, Check, Copy, Film, Image as ImageIcon, Sparkles, ExternalLink, Trash2 } from "lucide-react";
import { uploadFileToCloudinary } from "../../services/api";
import toast from "react-hot-toast";

export const MediaUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
      name: "skincare_campaign_hero.webp",
      format: "webp",
      size: "142 KB",
      type: "image"
    },
    {
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      name: "fashion_commercial_4k_cut.webp",
      format: "webp",
      size: "210 KB",
      type: "image"
    },
    {
      url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
      name: "editorial_manuscript_cover.webp",
      format: "webp",
      size: "98 KB",
      type: "image"
    }
  ]);

  const [copiedUrl, setCopiedUrl] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const toastId = toast.loading(`Uploading ${file.name} to Cloudinary & converting to WebP...`);

    try {
      const res = await uploadFileToCloudinary(file);
      if (res.success && res.data) {
        const newEntry = {
          url: res.data.url,
          name: file.name.replace(/\.[^/.]+$/, "") + ".webp",
          format: res.data.format || "webp",
          size: `${(res.data.bytes / 1024).toFixed(1)} KB`,
          type: res.data.resource_type || "image"
        };
        setUploadedFiles(prev => [newEntry, ...prev]);
        toast.success(`Success! Converted & Uploaded as WebP (${newEntry.size}) ✨`, { id: toastId });
      } else {
        toast.error(res.message || "Upload failed.", { id: toastId });
      }
    } catch (err) {
      toast.error("Upload error.", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success("WebP Media URL copied to clipboard!");
    setTimeout(() => setCopiedUrl(""), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="font-heading font-black text-2xl text-white-pure flex items-center gap-2">
          <UploadCloud className="w-6 h-6 text-cyan-neon" />
          <span>Cloudinary Media Manager</span>
        </h2>
        <p className="font-mono text-xs text-white-dim mt-0.5">
          High-performance media vault. All uploaded image assets are automatically converted to optimized <strong>WebP</strong> format.
        </p>
      </div>

      {/* Cloudinary Drag & Drop Box */}
      <div className="glass-panel p-8 sm:p-12 rounded-[5px] border-2 border-dashed border-purple-glow/40 hover:border-cyan-neon/60 bg-dark-900/80 transition-all text-center flex flex-col items-center justify-center relative group">
        <div className="w-16 h-16 rounded-[5px] bg-purple-deep/30 border border-purple-glow text-purple-soft flex items-center justify-center mb-4 shadow-glow-purple group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8 text-cyan-neon" />
        </div>

        <h3 className="font-heading font-bold text-lg text-white-pure mb-1">
          {uploading ? "Processing & Converting to WebP..." : "Drop Media Files Here or Browse"}
        </h3>
        <p className="font-mono text-xs text-white-muted max-w-sm mb-6">
          Supports PNG, JPG, GIF, MP4, MOV. Automatic WebP optimization & CDN hosting via Cloudinary.
        </p>

        <label className="cursor-pointer px-6 py-2.5 rounded-[5px] bg-gradient-to-r from-purple-deep to-cyan-deep text-white-pure font-heading font-bold text-xs shadow-glow-purple hover:brightness-110 transition-all">
          <span>{uploading ? "Converting..." : "Select File to Upload"}</span>
          <input
            type="file"
            accept="image/*,video/*"
            disabled={uploading}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Media Library Vault */}
      <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-glow" />
            <h3 className="font-heading font-bold text-base text-white-pure">
              Uploaded WebP Media Assets ({uploadedFiles.length})
            </h3>
          </div>
          <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            WebP Auto-Compression Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploadedFiles.map((file, idx) => (
            <div
              key={idx}
              className="glass-panel p-3 rounded-[5px] border border-white/15 bg-dark-950 flex flex-col justify-between group hover:border-cyan-neon/40 transition-all"
            >
              {/* Media Preview Frame */}
              <div className="relative aspect-video rounded-[3px] overflow-hidden bg-black mb-3">
                <img src={file.url} alt={file.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-dark-950/80 font-mono text-[9px] text-cyan-neon font-bold border border-cyan-neon/30">
                  {file.format.toUpperCase()}
                </div>
              </div>

              {/* File Info */}
              <div className="space-y-1 mb-3">
                <p className="font-mono text-xs font-bold text-white-crisp truncate">{file.name}</p>
                <p className="font-mono text-[10px] text-white-muted">Size: {file.size}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-purple-mist hover:text-white-crisp flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View</span>
                </a>

                <button
                  onClick={() => copyToClipboard(file.url)}
                  className="px-2.5 py-1 rounded bg-dark-850 border border-white/10 text-white-dim hover:text-white-crisp text-xs font-mono flex items-center gap-1 hover:border-purple-glow transition-all"
                >
                  {copiedUrl === file.url ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedUrl === file.url ? "Copied!" : "Copy URL"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

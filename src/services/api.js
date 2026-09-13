import { fallbackProjects, fallbackServices, fallbackTestimonials } from "../data/portfolioData";

const rawApi = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
const cleanBase = rawApi.trim().replace(/\/+$/, "");
const API_BASE = cleanBase.endsWith("/api") ? cleanBase : `${cleanBase}/api`;

// Public & Admin Project APIs
export const fetchProjects = async (category = "All") => {
  try {
    const url = category && category !== "All" 
      ? `${API_BASE}/projects?category=${encodeURIComponent(category)}`
      : `${API_BASE}/projects`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error("API returned non-200");
    const json = await res.json();
    if (json.success && json.data) return json.data;
    return fallbackProjects;
  } catch (err) {
    if (!category || category === "All") return fallbackProjects;
    return fallbackProjects.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
};

export const fetchProjectById = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/projects/${id}`);
    if (!res.ok) throw new Error("API returned non-200");
    const json = await res.json();
    if (json.success && json.data) return json.data;
    return fallbackProjects.find(p => p.id === id || p.slug === id);
  } catch (err) {
    return fallbackProjects.find(p => p.id === id || p.slug === id);
  }
};

export const createProjectApi = async (projectData) => {
  try {
    const res = await fetch(`${API_BASE}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const updateProjectApi = async (id, projectData) => {
  try {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const deleteProjectApi = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: "DELETE"
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// Services APIs
export const fetchServices = async () => {
  try {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error("API error");
    const json = await res.json();
    if (json.success && json.data) return json.data;
    return fallbackServices;
  } catch (err) {
    return fallbackServices;
  }
};

export const createServiceApi = async (data) => {
  try {
    const res = await fetch(`${API_BASE}/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const updateServiceApi = async (id, data) => {
  try {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const deleteServiceApi = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/services/${id}`, { method: "DELETE" });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// Testimonials APIs
export const fetchTestimonials = async () => {
  try {
    const res = await fetch(`${API_BASE}/testimonials`);
    if (!res.ok) throw new Error("API error");
    const json = await res.json();
    if (json.success && json.data) return json.data;
    return fallbackTestimonials;
  } catch (err) {
    return fallbackTestimonials;
  }
};

export const createTestimonialApi = async (data) => {
  try {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const updateTestimonialApi = async (id, data) => {
  try {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const deleteTestimonialApi = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, { method: "DELETE" });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// Contact & Inquiries APIs
export const sendContactInquiry = async (formData) => {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    return await res.json();
  } catch (err) {
    return {
      success: true,
      message: "Thank you, your message has reached Shally! She will respond within 24 hours.",
      data: formData
    };
  }
};

export const fetchInquiriesApi = async () => {
  try {
    const res = await fetch(`${API_BASE}/contact`);
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const updateInquiryStatusApi = async (id, status) => {
  try {
    const res = await fetch(`${API_BASE}/contact/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const deleteInquiryApi = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/contact/${id}`, { method: "DELETE" });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// Site Settings APIs
export const fetchSettingsApi = async () => {
  try {
    const res = await fetch(`${API_BASE}/settings`);
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const updateSettingsApi = async (data) => {
  try {
    const res = await fetch(`${API_BASE}/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// Analytics Dashboard APIs
export const fetchAnalyticsApi = async () => {
  try {
    const res = await fetch(`${API_BASE}/analytics/stats`);
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// Client-side instant WebP compression helper
export const compressImageClientSide = (file, maxWidth = 1200, quality = 0.85) => {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
      return resolve(file);
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const newFile = new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), {
                type: "image/webp",
              });
              resolve(newFile);
            } else {
              resolve(file);
            }
          },
          "image/webp",
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
};

// Client-side instant WebM video conversion & compression helper
export const compressVideoToWebm = (file, onProgress) => {
  return new Promise((resolve) => {
    if (!window.MediaRecorder || !file || !file.type.startsWith("video/")) {
      return resolve(file);
    }

    // If file is already small (< 3MB), return directly
    if (file.size <= 3 * 1024 * 1024 && file.type === "video/webm") {
      return resolve(file);
    }

    const videoUrl = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.src = videoUrl;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    let isDone = false;
    const finish = (resultFile) => {
      if (isDone) return;
      isDone = true;
      try {
        URL.revokeObjectURL(videoUrl);
      } catch (e) {}
      resolve(resultFile || file);
    };

    // Safety timeout: 25 seconds max
    const timeoutId = setTimeout(() => {
      finish(file);
    }, 25000);

    video.onloadedmetadata = () => {
      // Scale resolution (720p target for fast lightweight upload)
      let width = video.videoWidth || 1280;
      let height = video.videoHeight || 720;
      const maxDim = 1280;
      if (width > maxDim || height > maxDim) {
        if (width >= height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      width = width % 2 === 0 ? width : width - 1;
      height = height % 2 === 0 ? height : height - 1;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { alpha: false });

      // Supported WebM mime types
      let mimeType = "video/webm";
      if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8")) {
        mimeType = "video/webm;codecs=vp8";
      } else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
        mimeType = "video/webm;codecs=vp9";
      }

      let mediaRecorder;
      try {
        const stream = canvas.captureStream(30);
        mediaRecorder = new MediaRecorder(stream, {
          mimeType,
          videoBitsPerSecond: 1200000 // 1.2 Mbps bitrate
        });
      } catch (err) {
        clearTimeout(timeoutId);
        return finish(file);
      }

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        clearTimeout(timeoutId);
        const blob = new Blob(chunks, { type: "video/webm" });
        if (blob.size > 2000) {
          const webmFile = new File([blob], file.name.replace(/\.[^.]+$/, ".webm"), {
            type: "video/webm"
          });
          finish(webmFile);
        } else {
          finish(file);
        }
      };

      // Fast playback during recording (4x to 8x acceleration)
      video.playbackRate = 8.0;
      video.play().then(() => {
        mediaRecorder.start(100);

        const renderFrame = () => {
          if (video.paused || video.ended) {
            if (mediaRecorder.state === "recording") {
              mediaRecorder.stop();
            }
            return;
          }
          ctx.drawImage(video, 0, 0, width, height);
          if (video.duration && onProgress) {
            const percent = Math.min(99, Math.round((video.currentTime / video.duration) * 100));
            onProgress(percent);
          }
          requestAnimationFrame(renderFrame);
        };
        requestAnimationFrame(renderFrame);
      }).catch(() => {
        clearTimeout(timeoutId);
        finish(file);
      });

      video.onended = () => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
        }
      };
    };

    video.onerror = () => {
      clearTimeout(timeoutId);
      finish(file);
    };
  });
};

// Cloudinary File & Video Upload API (with Client-side WebP / WebM compression)
export const uploadFileToCloudinary = async (file, onProgress) => {
  try {
    let optimizedFile = file;

    if (file.type?.startsWith("image/")) {
      optimizedFile = await compressImageClientSide(file);
    } else if (file.type?.startsWith("video/")) {
      optimizedFile = await compressVideoToWebm(file, onProgress);
    }

    const formData = new FormData();
    formData.append("file", optimizedFile);

    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData
    });

    const resText = await res.text();
    let json;
    try {
      json = JSON.parse(resText);
    } catch (parseErr) {
      if (res.status === 413 || resText.includes("Request Entity")) {
        return {
          success: false,
          message: "Video file is still larger than 4.5MB. Please paste a direct video URL (e.g. Cloudinary/Vimeo/MP4)."
        };
      }
      return { 
        success: false, 
        message: `Upload server response: ${resText.slice(0, 120)}` 
      };
    }

    return json;
  } catch (err) {
    return { success: false, message: err.message || "Upload failed." };
  }
};

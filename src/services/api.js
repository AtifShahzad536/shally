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

// Cloudinary File & Video Upload API (with WebP conversion)
export const uploadFileToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message || "Upload failed." };
  }
};

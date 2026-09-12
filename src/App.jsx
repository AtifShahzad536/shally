import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "react-hot-toast";

import { CursorProvider } from "./context/CursorContext";
import { CustomCursor } from "./components/common/CustomCursor";
import { NoiseTexture } from "./components/common/NoiseTexture";
import { FloatingSocialDock } from "./components/common/FloatingSocialDock";
import { Navbar } from "./components/navigation/Navbar";
import { HomePage } from "./pages/HomePage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";

// Admin Panel Components
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminLogin } from "./components/admin/AdminLogin";
import { DashboardOverview } from "./components/admin/DashboardOverview";
import { ProjectsManager } from "./components/admin/ProjectsManager";
import { ServicesManager } from "./components/admin/ServicesManager";
import { TestimonialsManager } from "./components/admin/TestimonialsManager";
import { InquiriesManager } from "./components/admin/InquiriesManager";
import { MediaUploader } from "./components/admin/MediaUploader";
import { SiteSettingsManager } from "./components/admin/SiteSettingsManager";

import { useSoundEffects } from "./hooks/useSoundEffects";
import { fetchProjects, fetchServices, fetchTestimonials, fetchSettingsApi } from "./services/api";
import { fallbackProjects, fallbackServices, fallbackTestimonials } from "./data/portfolioData";

function AppContent() {
  const location = useLocation();
  const soundState = useSoundEffects();
  const [projects, setProjects] = useState(fallbackProjects);
  const [services, setServices] = useState(fallbackServices);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("shally_site_settings");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [activeSection, setActiveSection] = useState("hero");

  const isAdminRoute = location.pathname.startsWith("/admin");

  // Lenis Smooth Scroll (Public pages only)
  useEffect(() => {
    if (isAdminRoute) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, [isAdminRoute]);

  // Load Initial Portfolio Data & CMS Settings
  useEffect(() => {
    const loadData = async () => {
      try {
        const [projData, srvData, testData, settingsRes] = await Promise.all([
          fetchProjects(),
          fetchServices(),
          fetchTestimonials(),
          fetchSettingsApi(),
        ]);
        if (projData && projData.length > 0) setProjects(projData);
        if (srvData && srvData.length > 0) setServices(srvData);
        if (testData && testData.length > 0) setTestimonials(testData);
        if (settingsRes && settingsRes.success && settingsRes.data) {
          setSettings(settingsRes.data);
          try {
            localStorage.setItem("shally_site_settings", JSON.stringify(settingsRes.data));
          } catch (e) {}
        }
      } catch (err) {
        console.warn("Using fallback local data");
      }
    };
    loadData();
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-950 text-white-crisp selection:bg-purple-deep/40 selection:text-white-pure">
      
      {/* Toast Notification Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0E0B1C",
            color: "#F8FAFC",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            borderRadius: "5px",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: "13px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.8)"
          },
          success: {
            iconTheme: {
              primary: "#00E5FF",
              secondary: "#06040B",
            },
          },
          error: {
            iconTheme: {
              primary: "#FB7185",
              secondary: "#06040B",
            },
          }
        }}
      />

      {/* Desktop Custom Cursor */}
      {!isAdminRoute && <CustomCursor />}

      {/* Ambient Noise Background */}
      <NoiseTexture />

      {/* Public Navbar & Floating Social Bar (Hidden on Admin Routes) */}
      {!isAdminRoute && (
        <>
          <Navbar soundState={soundState} activeSection={activeSection} />
          <FloatingSocialDock socialLinks={settings?.socialLinks} soundState={soundState} />
        </>
      )}

      {/* Routes Routing Engine */}
      <Routes>
        {/* Public Portfolio Route */}
        <Route
          path="/"
          element={
            <HomePage
              projects={projects}
              services={services}
              testimonials={testimonials}
              settings={settings}
              soundState={soundState}
            />
          }
        />

        {/* Dedicated Case Study Route */}
        <Route
          path="/project/:id"
          element={<ProjectDetailPage soundState={soundState} />}
        />

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* CMS Admin Panel Nested Routes */}
        <Route path="/admin" element={<AdminLayout title="Studio Overview" />}>
          <Route index element={<DashboardOverview />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="inquiries" element={<InquiriesManager />} />
          <Route path="media" element={<MediaUploader />} />
          <Route path="settings" element={<SiteSettingsManager />} />
        </Route>
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <CursorProvider>
        <AppContent />
      </CursorProvider>
    </Router>
  );
}

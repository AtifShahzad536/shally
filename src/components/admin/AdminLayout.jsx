import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

export const AdminLayout = ({ title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Simple admin auth guard for safety
  useEffect(() => {
    const isAuth = localStorage.getItem("shally_admin_auth");
    if (!isAuth) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-dark-950 text-white-crisp flex">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Admin Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader setSidebarOpen={setSidebarOpen} title={title} />
        
        <main className="p-4 sm:p-8 flex-1 bg-dark-950/70 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

import React from "react";
import { Menu, Bell, Sparkles, LogOut, User, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AdminHeader = ({ setSidebarOpen, title = "Admin Dashboard" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("shally_admin_auth");
    toast.success("Logged out of Studio Admin!");
    navigate("/admin/login");
  };

  return (
    <header className="h-16 bg-dark-950/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left Title & Mobile Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-[5px] bg-dark-850 border border-white/10 text-white-crisp lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-heading font-bold text-base sm:text-lg text-white-pure">{title}</h1>
          <p className="font-mono text-[10px] text-purple-mist hidden sm:block">Shally Creative Portfolio CMS</p>
        </div>
      </div>

      {/* Right User & Actions */}
      <div className="flex items-center gap-3">
        {/* Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-dark-900 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Cloud Sync Active</span>
        </div>

        {/* Shally Profile Card */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-white/10">
          <div className="w-8 h-8 rounded-full border border-purple-glow/50 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Shally Admin"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:block text-left">
            <p className="font-heading text-xs font-bold text-white-pure">Shally</p>
            <p className="font-mono text-[9px] text-cute-pink">Super Admin</p>
          </div>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 rounded-[5px] bg-dark-900 border border-white/10 text-white-muted hover:text-rose-400 hover:border-rose-500/40 transition-colors ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

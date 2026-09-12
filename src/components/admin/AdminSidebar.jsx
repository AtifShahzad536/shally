import React from "react";
import { NavLink, Link } from "react-router-dom";
import { 
  LayoutDashboard, FolderKanban, Sparkles, MessageSquareQuote, 
  Inbox, UploadCloud, Settings, ArrowLeft, ExternalLink, ShieldCheck, X
} from "lucide-react";

export const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navItems = [
    { name: "Overview", path: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Projects", path: "/admin/projects", icon: FolderKanban },
    { name: "Services", path: "/admin/services", icon: Sparkles },
    { name: "Testimonials", path: "/admin/testimonials", icon: MessageSquareQuote },
    { name: "Inquiries", path: "/admin/inquiries", icon: Inbox },
    { name: "Media & Cloudinary", path: "/admin/media", icon: UploadCloud },
    { name: "Site Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-dark-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-dark-950/95 border-r border-white/10 flex flex-col justify-between p-4 transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div>
          {/* Brand & Studio Tag */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[5px] bg-gradient-to-tr from-purple-deep to-cyan-neon flex items-center justify-center text-dark-950 font-black shadow-glow-purple">
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-base tracking-wider text-white-pure block">
                  SHALLY <span className="text-cyan-neon text-xs font-mono">ADMIN</span>
                </span>
                <span className="font-mono text-[9px] text-purple-mist uppercase">Studio Control Center</span>
              </div>
            </Link>

            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-[4px] bg-dark-850 text-white-dim hover:text-white-crisp lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white-muted px-3 mb-2">
              // MANAGEMENT
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-[5px] text-xs font-heading font-semibold transition-all ${
                      isActive
                        ? "bg-purple-deep/30 border border-purple-glow/40 text-white-pure shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                        : "text-white-dim hover:text-white-pure hover:bg-white/5 border border-transparent"
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-purple-soft" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Quick Return to Website */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between p-2.5 rounded-[5px] bg-dark-900 border border-white/10 hover:border-cyan-neon/40 text-xs font-mono text-white-crisp transition-all group"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-neon group-hover:-translate-x-1 transition-transform" />
              <span>Live Website</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-white-muted group-hover:text-cyan-neon" />
          </Link>

          <div className="px-3 py-2 bg-dark-900/60 rounded-[4px] text-[10px] font-mono text-white-muted flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              API Server
            </span>
            <span className="text-emerald-400 font-bold">PORT 5001</span>
          </div>
        </div>
      </aside>
    </>
  );
};

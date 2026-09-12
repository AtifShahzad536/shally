import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Lock, Mail, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export const AdminLogin = () => {
  const [email, setEmail] = useState("shally@creates.com");
  const [password, setPassword] = useState("shally2026");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (email && password) {
        localStorage.setItem("shally_admin_auth", "true");
        toast.success("Welcome back, Shally! ✨ Access Granted.");
        navigate("/admin");
      } else {
        toast.error("Please enter email and password.");
      }
      setLoading(false);
    }, 600);
  };

  const handleQuickDemo = () => {
    localStorage.setItem("shally_admin_auth", "true");
    toast.success("Welcome to Shally Admin Dashboard!");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full bg-purple-glow/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full bg-cyan-neon/15 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md glass-panel p-8 sm:p-10 rounded-[5px] border border-white/20 bg-dark-900/95 shadow-2xl z-10">
        
        {/* Header Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-[5px] bg-gradient-to-tr from-purple-deep to-cyan-neon flex items-center justify-center mx-auto mb-3 shadow-glow-purple">
            <ShieldCheck className="w-6 h-6 text-dark-950 stroke-[2.5]" />
          </div>
          <h2 className="font-heading font-black text-2xl text-white-pure">Studio CMS Login</h2>
          <p className="font-mono text-xs text-purple-mist mt-1">Shally Creative Portfolio Management</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-purple-soft absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-[5px] bg-dark-950 border border-white/15 text-white-crisp text-sm focus:outline-none focus:border-purple-glow"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-cyan-neon absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-[5px] bg-dark-950 border border-white/15 text-white-crisp text-sm focus:outline-none focus:border-cyan-neon"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-[5px] bg-gradient-to-r from-purple-deep to-purple-soft text-white-pure font-heading font-bold text-sm shadow-glow-purple hover:brightness-110 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? "Authenticating..." : "Sign In to Admin"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Access Button */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2.5 rounded-[5px] bg-dark-800 border border-cyan-neon/30 text-cyan-ice hover:bg-cyan-950/40 text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-neon" />
            <span>One-Click Instant Admin Access</span>
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-white-muted hover:text-white-crisp mt-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

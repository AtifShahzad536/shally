import React, { useState, useEffect } from "react";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid 
} from "recharts";
import { 
  TrendingUp, Users, FolderKanban, MessageSquareQuote, 
  Inbox, Eye, Sparkles, ArrowUpRight, ArrowDownRight, Clock, Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import { fetchAnalyticsApi, fetchInquiriesApi } from "../../services/api";
import toast from "react-hot-toast";

export const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [analyticsRes, inqRes] = await Promise.all([
          fetchAnalyticsApi(),
          fetchInquiriesApi()
        ]);
        if (analyticsRes.success) setStats(analyticsRes.data);
        if (inqRes.success && inqRes.data) setInquiries(inqRes.data.slice(0, 5));
      } catch (err) {
        toast.error("Failed to load dashboard metrics.");
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center font-mono text-sm text-purple-mist flex flex-col items-center gap-3">
        <span className="w-8 h-8 rounded-full border-2 border-purple-glow border-t-transparent animate-spin" />
        <span>Loading Studio Analytics & Charts...</span>
      </div>
    );
  }

  const totals = stats?.totals || {
    projects: 6,
    services: 3,
    testimonials: 3,
    inquiries: 14,
    newInquiries: 3,
    totalReach: "18.4M+",
    conversionRate: "8.6%"
  };

  const trafficData = stats?.trafficChart || [
    { day: "Mon", visitors: 3400, pageViews: 8900, inquiries: 4 },
    { day: "Tue", visitors: 4200, pageViews: 11200, inquiries: 6 },
    { day: "Wed", visitors: 3800, pageViews: 9800, inquiries: 3 },
    { day: "Thu", visitors: 5600, pageViews: 14500, inquiries: 9 },
    { day: "Fri", visitors: 6800, pageViews: 18200, inquiries: 12 },
    { day: "Sat", visitors: 7400, pageViews: 19800, inquiries: 15 },
    { day: "Sun", visitors: 6100, pageViews: 16400, inquiries: 8 },
  ];

  const categoryData = stats?.categoryDistribution || [
    { name: "Social Media", value: 45, color: "#A855F7" },
    { name: "Video Editing", value: 35, color: "#00E5FF" },
    { name: "Content Writing", value: 20, color: "#F472B6" }
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-dark-900/90 border border-white/10 p-6 rounded-[5px]">
        <div>
          <h2 className="font-heading font-black text-xl sm:text-2xl text-white-pure">
            Welcome back, <span className="text-gradient-cute">Shally</span> ✨
          </h2>
          <p className="font-mono text-xs text-white-dim mt-1">
            Your studio portfolio has <strong className="text-cyan-neon font-bold">{totals.newInquiries} new pending inquiries</strong> to review today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="px-4 py-2 rounded-[5px] bg-gradient-to-r from-purple-deep to-purple-soft text-white-pure text-xs font-heading font-bold shadow-glow-purple hover:brightness-110 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Case Study</span>
          </Link>

          <Link
            to="/admin/media"
            className="px-4 py-2 rounded-[5px] bg-dark-800 border border-white/15 text-white-crisp text-xs font-mono hover:border-cyan-neon transition-all flex items-center gap-1.5"
          >
            <span>Upload Media</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Reach */}
        <div className="glass-panel p-5 rounded-[5px] border border-purple-glow/30 bg-dark-900/90 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-white-muted mb-2">
            <span>TOTAL CAMPAIGN REACH</span>
            <Eye className="w-4 h-4 text-purple-glow" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-heading font-black text-2xl sm:text-3xl text-gradient-purple-cyan">
              {totals.totalReach}
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +24%
            </span>
          </div>
          <span className="text-[10px] font-mono text-purple-mist mt-2">Across TikTok, Reels & Web</span>
        </div>

        {/* Card 2: Active Case Studies */}
        <div className="glass-panel p-5 rounded-[5px] border border-cyan-neon/30 bg-dark-900/90 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-white-muted mb-2">
            <span>PORTFOLIO PROJECTS</span>
            <FolderKanban className="w-4 h-4 text-cyan-neon" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-heading font-black text-2xl sm:text-3xl text-cyan-neon">
              {totals.projects}
            </span>
            <span className="text-xs font-mono text-cyan-ice">Active Live</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-ice/70 mt-2">3 Disciplines Featured</span>
        </div>

        {/* Card 3: Lead Inquiries */}
        <div className="glass-panel p-5 rounded-[5px] border border-cute-pink/30 bg-dark-900/90 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-white-muted mb-2">
            <span>CLIENT INQUIRIES</span>
            <Inbox className="w-4 h-4 text-cute-pink" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-heading font-black text-2xl sm:text-3xl text-cute-pink">
              {totals.inquiries}
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-[3px]">
              {totals.newInquiries} New
            </span>
          </div>
          <span className="text-[10px] font-mono text-white-muted mt-2">Avg Deal Size: $2.4k</span>
        </div>

        {/* Card 4: Conversion Rate */}
        <div className="glass-panel p-5 rounded-[5px] border border-emerald-500/30 bg-dark-900/90 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-white-muted mb-2">
            <span>CONVERSION RATE</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-heading font-black text-2xl sm:text-3xl text-emerald-400">
              {totals.conversionRate}
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +3.2%
            </span>
          </div>
          <span className="text-[10px] font-mono text-white-muted mt-2">Top 5% Industry Benchmark</span>
        </div>

      </div>

      {/* ============================================================ */}
      {/* ANALYTICS CHARTS & GRAPHS SECTION */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Weekly Traffic & Inquiry Velocity Area Chart (8 Cols) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div>
              <h3 className="font-heading font-bold text-base text-white-pure">
                Weekly Engagement & Inquiries Velocity
              </h3>
              <p className="font-mono text-xs text-white-muted">Unique Visitors vs Total Page Impressions</p>
            </div>
            <span className="font-mono text-xs text-cyan-neon font-bold bg-cyan-deep/20 px-2 py-1 rounded-[3px] border border-cyan-neon/30">
              Live Real-Time
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#94A3B8" fontSize={11} fontFamily="monospace" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D0B16",
                    borderColor: "rgba(168,85,247,0.4)",
                    borderRadius: "5px",
                    fontFamily: "monospace",
                    fontSize: "12px"
                  }}
                />
                <Area type="monotone" dataKey="pageViews" name="Page Views" stroke="#00E5FF" strokeWidth={2} fillOpacity={1} fill="url(#cyanGrad)" />
                <Area type="monotone" dataKey="visitors" name="Unique Visitors" stroke="#A855F7" strokeWidth={2} fillOpacity={1} fill="url(#purpleGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Service Category Breakdown Pie Chart (4 Cols) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90 flex flex-col justify-between">
          <div className="pb-4 border-b border-white/10 mb-4">
            <h3 className="font-heading font-bold text-base text-white-pure">
              Service Inquiries Breakdown
            </h3>
            <p className="font-mono text-xs text-white-muted">Demand per discipline</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D0B16",
                    borderColor: "rgba(255,255,255,0.15)",
                    borderRadius: "5px",
                    fontFamily: "monospace"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: cat.color }} />
                  <span className="text-white-dim">{cat.name}</span>
                </span>
                <span className="font-bold text-white-crisp">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* RECENT INQUIRIES QUICK TABLE */}
      {/* ============================================================ */}
      <div className="glass-panel p-6 rounded-[5px] border border-white/10 bg-dark-900/90">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <Inbox className="w-4 h-4 text-cute-pink" />
            <h3 className="font-heading font-bold text-base text-white-pure">
              Recent Client Inquiries
            </h3>
          </div>
          <Link
            to="/admin/inquiries"
            className="font-mono text-xs text-purple-soft hover:text-cyan-neon transition-colors flex items-center gap-1"
          >
            <span>View All ({inquiries.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-white-muted uppercase">
                <th className="pb-3 font-semibold">Client Name</th>
                <th className="pb-3 font-semibold">Service Needed</th>
                <th className="pb-3 font-semibold">Budget</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {inquiries.map((inq) => (
                <tr key={inq.id || inq._id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-medium text-white-crisp">
                    {inq.name}
                    <span className="block text-[10px] text-white-muted">{inq.email}</span>
                  </td>
                  <td className="py-3 text-purple-mist">{inq.service}</td>
                  <td className="py-3 text-cyan-neon font-bold">{inq.budget}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-[3px] text-[10px] font-bold ${
                      inq.status === "New"
                        ? "bg-cute-pink/20 text-cute-pink border border-cute-pink/30"
                        : inq.status === "Contacted"
                        ? "bg-cyan-deep/20 text-cyan-ice border border-cyan-neon/30"
                        : "bg-dark-800 text-white-muted border border-white/10"
                    }`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      to="/admin/inquiries"
                      className="px-2.5 py-1 rounded-[3px] bg-dark-800 border border-white/15 text-white-dim hover:text-white-pure hover:border-purple-glow transition-all"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

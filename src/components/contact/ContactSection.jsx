import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, CheckCircle2, Mail, MessageSquare, Clock, ArrowUpRight, DollarSign } from "lucide-react";
import confetti from "canvas-confetti";
import { sendContactInquiry } from "../../services/api";
import { MagneticButton } from "../common/MagneticButton";
import { useCursor } from "../../context/CursorContext";

export const ContactSection = ({ soundState }) => {
  const { playSynthSound } = soundState;
  const { setCursor } = useCursor();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Social Media Growth & Management",
    budget: "",
    timeline: "Within 2-4 Weeks",
    message: ""
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const serviceOptions = [
    "Social Media Growth & Management",
    "Short-Form Video Editing (Reels/TikTok)",
    "Editorial Content & Copywriting",
    "All-In-One Creative Retainer"
  ];

  const timelineOptions = [
    "Immediately (< 2 Weeks)",
    "Within 2-4 Weeks",
    "Next Quarter",
    "Ongoing Monthly Partnership"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, error: "Please provide your name, email, and project details." });
      return;
    }

    setStatus({ loading: true, success: false, error: "" });
    playSynthSound("click");

    try {
      const response = await sendContactInquiry(formData);
      if (response.success) {
        setStatus({ loading: false, success: true, error: "" });
        playSynthSound("success");
        
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#A855F7", "#00E5FF", "#F472B6", "#FFFFFF"]
        });

        // Reset form after delay
        setFormData({
          name: "",
          email: "",
          service: "Social Media Growth & Management",
          budget: "",
          timeline: "Within 2-4 Weeks",
          message: ""
        });
      } else {
        setStatus({ loading: false, success: false, error: response.message || "Something went wrong." });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: "Connection error. Please try again." });
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-dark-950 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[500px] rounded-full bg-purple-glow/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-cute-pink/20 border border-cute-pink/40 text-cute-pink text-xs font-mono font-medium mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>START A COLLABORATION</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white-pure tracking-tight mb-4">
            Let's Build Something <span className="text-gradient-purple-cyan">Extraordinary.</span>
          </h2>
          <p className="text-white-dim text-sm sm:text-base font-normal">
            Have an upcoming campaign, product launch, or monthly content retainer in mind? Fill in the details below or reach out directly.
          </p>
        </div>

        {/* ============================================================ */}
        {/* INTERACTIVE FORM & DIRECT REACHOUT GRID */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Info & Quick Reach Out (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Quick Pitch Box */}
            <div className="glass-panel p-6 rounded-[5px] border border-white/15 bg-dark-900/90">
              <span className="font-mono text-xs uppercase tracking-widest text-purple-mist font-bold block mb-2">
                // DIRECT INBOX
              </span>
              <p className="text-white-dim text-xs sm:text-sm leading-relaxed mb-4">
                I respond to all project inquiries within <strong className="text-white-crisp">24 hours</strong> with tailored creative ideas and availability.
              </p>
              
              <a
                href="mailto:hello@shallycreates.com"
                onMouseEnter={() => setCursor("hover")}
                onMouseLeave={() => setCursor("default")}
                className="group flex items-center justify-between p-3 rounded-[4px] bg-dark-950 border border-white/10 hover:border-purple-glow transition-all text-xs font-mono text-white-crisp"
              >
                <span>hello@shallycreates.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-purple-glow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Quick Facts Card */}
            <div className="glass-panel p-6 rounded-[5px] border border-white/15 bg-dark-900/90 space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-cyan-neon shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-white-crisp text-sm">Response Time</p>
                  <p className="text-white-muted">&lt; 24 Hours Guaranteed</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-white-crisp text-sm">Pricing Structure</p>
                  <p className="text-white-muted">Fixed Project Rates & Monthly Retainers</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-cute-pink shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-white-crisp text-sm">Location & Timezone</p>
                  <p className="text-white-muted">Worldwide Remote (EST / GMT Overlap)</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Interactive Inquiry Form (8 Cols) */}
          <div className="lg:col-span-8">
            <div className="glass-panel p-6 sm:p-10 rounded-[5px] border border-white/20 bg-dark-900/95 shadow-2xl relative">
              
              {status.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-[5px] bg-purple-deep/40 border border-purple-glow text-purple-soft flex items-center justify-center shadow-glow-purple">
                    <CheckCircle2 className="w-8 h-8 text-cyan-neon" />
                  </div>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white-pure">
                    Inquiry Received with Success! ✨
                  </h3>
                  <p className="text-white-dim text-sm max-w-md font-normal">
                    Thank you! Your project details have landed on Shally's desk. She will review your scope and get back to you with custom ideas within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus({ loading: false, success: false, error: "" })}
                    className="mt-4 px-6 py-2.5 rounded-[5px] bg-dark-800 border border-white/15 text-xs font-mono text-white-crisp hover:bg-dark-700"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Service Selector Chips */}
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-purple-mist font-bold block mb-2.5">
                      1. Select Your Primary Need
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {serviceOptions.map((srv) => (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, service: srv });
                            playSynthSound("click");
                          }}
                          className={`p-3 rounded-[5px] border text-left text-xs font-heading font-medium transition-all ${
                            formData.service === srv
                              ? "bg-purple-deep/40 border-purple-glow text-white-pure shadow-glow-purple/30 font-bold"
                              : "bg-dark-950/70 border-white/10 text-white-muted hover:border-white/25 hover:text-white-crisp"
                          }`}
                        >
                          {srv}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Budget Input */}
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-cyan-ice font-bold block mb-1.5 flex items-center justify-between">
                      <span>2. Your Custom Project Budget / Rate (USD) *</span>
                      <span className="text-[10px] text-purple-mist font-normal">e.g. $2,500 or $4k / month</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 text-cyan-neon absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="Enter your custom budget (e.g. $2,500, $5k / mo, Flexible)"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-[5px] bg-dark-950 border border-white/15 text-white-crisp placeholder:text-white-muted/40 focus:outline-none focus:border-cyan-neon transition-colors text-sm font-mono"
                      />
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Elena Rostova"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-[5px] bg-dark-950 border border-white/15 text-white-crisp placeholder:text-white-muted/40 focus:outline-none focus:border-purple-glow transition-colors text-sm font-body"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="elena@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-[5px] bg-dark-950 border border-white/15 text-white-crisp placeholder:text-white-muted/40 focus:outline-none focus:border-cyan-neon transition-colors text-sm font-body"
                      />
                    </div>
                  </div>

                  {/* Project Details Message */}
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-white-muted block mb-1.5">
                      Tell Me About Your Goals & Vision *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share details about your brand, current challenges, timeline, or links to existing social channels..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-[5px] bg-dark-950 border border-white/15 text-white-crisp placeholder:text-white-muted/40 focus:outline-none focus:border-cute-pink transition-colors text-sm font-body resize-none"
                    />
                  </div>

                  {/* Error Notification */}
                  {status.error && (
                    <p className="text-xs font-mono text-rose-400 bg-rose-950/40 p-2.5 rounded-[4px] border border-rose-500/30">
                      {status.error}
                    </p>
                  )}

                  {/* Submit CTA */}
                  <MagneticButton
                    type="submit"
                    disabled={status.loading}
                    variant="primary"
                    className="w-full py-4 text-sm tracking-wide"
                  >
                    <span>{status.loading ? "Transmitting Proposal..." : "Send Project Inquiry"}</span>
                    <Send className="w-4 h-4 ml-1" />
                  </MagneticButton>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

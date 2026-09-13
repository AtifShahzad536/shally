import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, CheckCircle2, Mail, Clock, ArrowUpRight, DollarSign, Globe, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { sendContactInquiry } from "../../services/api";
import { MagneticButton } from "../common/MagneticButton";

export const ContactSection = ({ soundState, contactData = {}, email = "hello@shallycreates.com" }) => {
  const { playSynthSound } = soundState || { playSynthSound: () => {} };

  const data = {
    badgeText: contactData.badgeText || "Get In Touch",
    headlinePrefix: contactData.headlinePrefix || "Let's Start a",
    headlineHighlight: contactData.headlineHighlight || "Project Together",
    description: contactData.description || "Looking for high-impact video editing, social media strategy, or creative content? Send a message and let's discuss your vision.",
    emailDirect: email || "hello@shallycreates.com"
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Video Editing",
    budget: "",
    message: ""
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const serviceOptions = [
    "🎬 Video Editing",
    "🚀 Social Media Growth",
    "✍️ Content Writing",
    "👑 Full Retainer"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, error: "Please enter your name, email, and message." });
      return;
    }

    setStatus({ loading: true, success: false, error: "" });
    playSynthSound?.("click");

    try {
      const response = await sendContactInquiry(formData);
      if (response.success) {
        setStatus({ loading: false, success: true, error: "" });
        playSynthSound?.("success");
        
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#A855F7", "#00E5FF", "#F472B6", "#FFFFFF"]
        });

        setFormData({
          name: "",
          email: "",
          service: "🎬 Video Editing",
          budget: "",
          message: ""
        });
      } else {
        setStatus({ loading: false, success: false, error: response.message || "Something went wrong. Please try again." });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: "Connection error. Please try again." });
    }
  };

  return (
    <section 
      id="contact" 
      className="relative py-20 sm:py-28 bg-dark-950 overflow-hidden"
    >
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-purple-glow/10 blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Clean Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-soft text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-glow" />
            <span>{data.badgeText}</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white-pure tracking-tight mb-3">
            {data.headlinePrefix} <span className="text-gradient-purple-cyan">{data.headlineHighlight}</span>
          </h2>
          <p className="text-white-dim text-sm sm:text-base leading-relaxed font-normal">
            {data.description}
          </p>
        </div>

        {/* Clean Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          
          {/* Left Column: Direct Info (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Email Contact Card */}
            <div className="p-6 rounded-[12px] bg-dark-900 border border-white/10 shadow-md">
              <span className="text-xs font-semibold text-white-muted uppercase tracking-wider block mb-1">
                Direct Contact
              </span>
              <h3 className="font-heading font-semibold text-lg text-white-pure mb-2">
                Have a quick question?
              </h3>
              <p className="text-white-dim text-xs leading-relaxed mb-5">
                Feel free to email directly. I usually reply within a few hours.
              </p>

              <a
                href={`mailto:${data.emailDirect}`}
                className="group flex items-center justify-between p-3 rounded-[8px] bg-dark-950 border border-white/15 hover:border-cyan-neon/60 hover:bg-cyan-neon/5 transition-all text-xs text-white-crisp font-medium"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Mail className="w-4 h-4 text-cyan-neon shrink-0" />
                  <span className="truncate">{data.emailDirect}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-cyan-neon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>
            </div>

            {/* Response Info */}
            <div className="p-5 rounded-[12px] bg-dark-900 border border-white/10 space-y-3.5 text-xs shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-neon/10 border border-cyan-neon/20 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-cyan-neon" />
                </div>
                <div>
                  <div className="font-medium text-white-crisp">Fast Turnaround</div>
                  <div className="text-white-muted text-[11px]">Replies within 24 hours</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-glow/10 border border-purple-glow/20 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 text-purple-glow" />
                </div>
                <div>
                  <div className="font-medium text-white-crisp">Global Availability</div>
                  <div className="text-white-muted text-[11px]">Available worldwide (Remote)</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Clean, Streamlined Form (8 Cols) */}
          <div className="lg:col-span-8">
            <div className="p-6 sm:p-8 rounded-[12px] bg-dark-900 border border-white/15 shadow-xl">
              
              {status.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center flex flex-col items-center justify-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-cyan-deep/30 border border-cyan-neon text-cyan-neon flex items-center justify-center shadow-glow-cyan">
                    <CheckCircle2 className="w-6 h-6 text-cyan-neon" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white-pure">
                    Message Sent Successfully! ✨
                  </h3>
                  <p className="text-white-dim text-xs sm:text-sm max-w-sm font-normal leading-relaxed">
                    Thank you! Your message has been received. I'll review it and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus({ loading: false, success: false, error: "" })}
                    className="mt-3 px-4 py-2 rounded-[6px] bg-dark-800 border border-white/20 text-xs font-medium text-white-crisp hover:bg-dark-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Select Service Chips */}
                  <div>
                    <label className="text-xs font-semibold text-white-muted block mb-2">
                      Select Service
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {serviceOptions.map((srv) => {
                        const isSelected = formData.service === srv;
                        return (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, service: srv });
                              playSynthSound?.("click");
                            }}
                            className={`px-3 py-2.5 rounded-[8px] border text-center text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                              isSelected
                                ? "bg-purple-600/30 border-purple-glow text-white-pure shadow-sm font-semibold"
                                : "bg-dark-950/70 border-white/10 text-white-dim hover:border-white/25 hover:text-white-crisp"
                            }`}
                          >
                            <span>{srv}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-cyan-neon shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Field */}
                  <div>
                    <label className="text-xs font-semibold text-white-muted block mb-1.5">
                      Estimated Budget <span className="text-white-muted/60 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 text-purple-glow absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="e.g. $1,000 – $3,000 / Flexible"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-[8px] bg-dark-950 border border-white/10 text-white-crisp placeholder:text-white-muted/40 focus:outline-none focus:border-purple-glow transition-colors text-xs sm:text-sm font-sans"
                      />
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-semibold text-white-muted block mb-1.5">
                        Your Name <span className="text-purple-soft">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[8px] bg-dark-950 border border-white/10 text-white-crisp placeholder:text-white-muted/40 focus:outline-none focus:border-purple-glow transition-colors text-xs sm:text-sm font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-white-muted block mb-1.5">
                        Email Address <span className="text-cyan-neon">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[8px] bg-dark-950 border border-white/10 text-white-crisp placeholder:text-white-muted/40 focus:outline-none focus:border-cyan-neon transition-colors text-xs sm:text-sm font-sans"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="text-xs font-semibold text-white-muted block mb-1.5">
                      Your Message <span className="text-purple-soft">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell me about your project, goals, or timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[8px] bg-dark-950 border border-white/10 text-white-crisp placeholder:text-white-muted/40 focus:outline-none focus:border-purple-glow transition-colors text-xs sm:text-sm font-sans resize-none"
                    />
                  </div>

                  {/* Error Notification */}
                  {status.error && (
                    <p className="text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded-[6px] border border-rose-500/30 font-medium">
                      {status.error}
                    </p>
                  )}

                  {/* Submit CTA */}
                  <div className="pt-1">
                    <MagneticButton
                      type="submit"
                      disabled={status.loading}
                      variant="primary"
                      className="w-full py-3 text-xs sm:text-sm font-semibold tracking-wide shadow-glow-purple"
                    >
                      <span>{status.loading ? "Sending..." : "Send Message"}</span>
                      <Send className="w-3.5 h-3.5 ml-1.5" />
                    </MagneticButton>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

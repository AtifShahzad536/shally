import React, { useState } from "react";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";

export const FloatingSocialDock = ({ socialLinks = {}, soundState }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const channels = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      label: "Chat on WhatsApp",
      url: socialLinks?.whatsapp || "https://wa.me/15552345678",
      icon: FaWhatsapp,
      brandColor: "#25D366",
      bgHover: "hover:bg-[#25D366]/20",
      borderHover: "hover:border-[#25D366]/60",
      textHover: "group-hover:text-[#25D366]",
      glowHover: "hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]",
    },
    {
      id: "facebook",
      name: "Facebook",
      label: "Follow on Facebook",
      url: socialLinks?.facebook || "https://facebook.com/shally.creates",
      icon: FaFacebookF,
      brandColor: "#1877F2",
      bgHover: "hover:bg-[#1877F2]/20",
      borderHover: "hover:border-[#1877F2]/60",
      textHover: "group-hover:text-[#1877F2]",
      glowHover: "hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]",
    },
    {
      id: "instagram",
      name: "Instagram",
      label: "Instagram Reels",
      url: socialLinks?.instagram || "https://instagram.com/shally.creates",
      icon: FaInstagram,
      brandColor: "#E1306C",
      bgHover: "hover:bg-[#E1306C]/20",
      borderHover: "hover:border-[#E1306C]/60",
      textHover: "group-hover:text-[#E1306C]",
      glowHover: "hover:shadow-[0_0_20px_rgba(225,48,108,0.4)]",
    },
    {
      id: "tiktok",
      name: "TikTok",
      label: "TikTok Creations",
      url: socialLinks?.tiktok || "https://tiktok.com/@shallytok",
      icon: FaTiktok,
      brandColor: "#00F2FE",
      bgHover: "hover:bg-[#00F2FE]/20",
      borderHover: "hover:border-[#00F2FE]/60",
      textHover: "group-hover:text-[#00F2FE]",
      glowHover: "hover:shadow-[0_0_20px_rgba(0,242,254,0.4)]",
    },
  ];

  const handleMouseEnter = (id) => {
    setHoveredId(id);
    if (soundState?.soundEnabled && soundState?.playSynthSound) {
      soundState.playSynthSound("hover");
    }
  };

  const handleClick = () => {
    if (soundState?.soundEnabled && soundState?.playSynthSound) {
      soundState.playSynthSound("click");
    }
  };

  return (
    <aside
      aria-label="Floating Social Media Quick Connect"
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center select-none"
    >
      {/* Decorative vertical connection line pulse */}
      <div className="absolute -top-6 w-[1px] h-5 bg-gradient-to-t from-purple-glow/40 to-transparent pointer-events-none" />
      <div className="absolute -bottom-6 w-[1px] h-5 bg-gradient-to-b from-purple-glow/40 to-transparent pointer-events-none" />

      {/* Main Glass Dock */}
      <div className="flex flex-col items-center gap-2.5 p-1.5 sm:p-2 rounded-2xl bg-dark-950/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.7)]">
        {channels.map((ch) => {
          const Icon = ch.icon;
          const isHovered = hoveredId === ch.id;

          return (
            <div key={ch.id} className="relative flex items-center group">
              {/* Tooltip on hover (slides out to the left) */}
              <div
                className={`absolute right-full mr-3 pointer-events-none transition-all duration-200 ease-out whitespace-nowrap z-50 ${
                  isHovered
                    ? "opacity-100 translate-x-0 scale-100"
                    : "opacity-0 translate-x-2 scale-95"
                }`}
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-900/95 border border-white/15 text-white-pure text-xs font-mono font-medium shadow-xl backdrop-blur-md">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: ch.brandColor }}
                  />
                  <span>{ch.label}</span>
                </div>
              </div>

              {/* Icon Action Button */}
              <a
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ch.label}
                onMouseEnter={() => handleMouseEnter(ch.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={handleClick}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/10 text-white-dim transition-all duration-300 transform active:scale-90 hover:scale-110 ${ch.bgHover} ${ch.borderHover} ${ch.textHover} ${ch.glowHover}`}
              >
                <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#06040B",
          900: "#0A0714",
          850: "#0E0B1C",
          800: "#131024",
          700: "#1D1836",
          600: "#2B2450",
        },
        purple: {
          glow: "#A855F7",
          electric: "#8B5CF6",
          deep: "#7C3AED",
          soft: "#C084FC",
          mist: "#E9D5FF",
        },
        cyan: {
          neon: "#00E5FF",
          electric: "#38BDF8",
          deep: "#0284C7",
          ice: "#BAE6FD",
        },
        cute: {
          pink: "#F472B6",
          rose: "#FB7185",
          lilac: "#DDD6FE",
        },
        white: {
          pure: "#FFFFFF",
          crisp: "#F8FAFC",
          dim: "#E2E8F0",
          muted: "#94A3B8",
        }
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'Plus Jakarta Sans'", "sans-serif"], // replaced robotic monospace with human-readable Plus Jakarta Sans
        accent: ["'Outfit'", "sans-serif"],
      },
      borderRadius: {
        // Enforce 5px standard
        DEFAULT: "5px",
        sm: "3px",
        md: "5px",
        lg: "5px",
        xl: "5px",
        "2xl": "5px",
        "3xl": "5px",
        full: "9999px", // Only for circular avatar/badges
      },
      boxShadow: {
        'glow-purple': '0 0 35px -5px rgba(168, 85, 247, 0.35)',
        'glow-cyan': '0 0 35px -5px rgba(0, 229, 255, 0.35)',
        'glow-pink': '0 0 35px -5px rgba(244, 114, 182, 0.35)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.07)',
        'card-glow': '0 0 25px rgba(168, 85, 247, 0.15), inset 0 0 15px rgba(168, 85, 247, 0.05)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marqueeReverse 25s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      }
    },
  },
  plugins: [],
}

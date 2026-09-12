import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "../../context/CursorContext";

export const MagneticButton = ({
  children,
  onClick,
  className = "",
  variant = "primary", // 'primary', 'secondary', 'cyan', 'outline', 'ghost'
  href,
  target,
  rel,
  cursorText = "",
  ...props
}) => {
  const ref = useRef(null);
  const { setCursor } = useCursor();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 200, mass: 0.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) * 0.35;
    const deltaY = (e.clientY - centerY) * 0.35;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setCursor("default");
  };

  const handleMouseEnter = () => {
    if (cursorText) {
      setCursor("hover", cursorText);
    } else {
      setCursor("hover");
    }
  };

  const baseStyles = "relative inline-flex items-center justify-center font-heading font-semibold text-sm px-6 py-3 rounded-[5px] transition-all duration-300 select-none group overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-deep via-purple-electric to-purple-soft text-white-pure shadow-glow-purple hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] border border-purple-soft/40",
    cyan: "bg-gradient-to-r from-cyan-deep via-cyan-electric to-cyan-neon text-dark-950 font-bold shadow-glow-cyan hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] border border-cyan-neon/40",
    secondary: "bg-dark-800/90 text-white-crisp hover:text-purple-mist border border-white-crisp/15 hover:border-purple-glow/50 backdrop-blur-md hover:bg-dark-700/90",
    outline: "bg-transparent text-white-crisp hover:text-white-pure border border-white-crisp/25 hover:border-purple-glow",
    ghost: "bg-transparent text-white-dim hover:text-white-pure hover:bg-white/5",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {/* Shimmer Light Sweep */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </Component>
  );
};

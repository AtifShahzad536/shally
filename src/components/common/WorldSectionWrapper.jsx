import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const WorldSectionWrapper = ({ 
  children, 
  id, 
  className = "", 
  ambientColor = "rgba(168, 85, 247, 0.12)" 
}) => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth cinematic world entry physics (scale elevation + gentle reveal)
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.95, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.4, 1, 1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [40, 0, 0, -40]);

  return (
    <motion.div
      ref={sectionRef}
      id={id}
      style={{ scale, opacity, y }}
      className={`relative w-full ${className}`}
    >
      {/* Subtle World Ambient Core Lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[550px] rounded-full blur-[160px] pointer-events-none -z-10"
        style={{ background: ambientColor }}
      />
      {children}
    </motion.div>
  );
};

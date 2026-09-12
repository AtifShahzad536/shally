import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useCursor } from "../../context/CursorContext";

export const CustomCursor = () => {
  const { cursorType, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Snappy, silky-smooth spring physics
  const springConfig = { damping: 30, stiffness: 450, mass: 0.3 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch devices
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  const isHovered = cursorType !== "default";
  const hasText = !!cursorText;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Sleek Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.15 : 1,
          width: hasText ? 68 : isHovered ? 32 : 20,
          height: hasText ? 22 : isHovered ? 32 : 20,
          borderRadius: hasText ? "12px" : "50%",
          backgroundColor: hasText
            ? "rgba(168, 85, 247, 0.85)"
            : cursorType === "play"
            ? "rgba(0, 229, 255, 0.25)"
            : isHovered
            ? "rgba(168, 85, 247, 0.15)"
            : "rgba(255, 255, 255, 0.04)",
          borderColor: hasText
            ? "rgba(255, 255, 255, 0.4)"
            : cursorType === "play"
            ? "#00E5FF"
            : isHovered
            ? "rgba(168, 85, 247, 0.6)"
            : "rgba(255, 255, 255, 0.25)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
        className="flex items-center justify-center border backdrop-blur-[2px] transition-colors shadow-sm"
      >
        {hasText && (
          <span className="font-mono text-[9px] font-bold tracking-wider text-white-pure uppercase px-1.5 text-center select-none leading-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Pinpoint Center Precision Dot */}
      {!hasText && (
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isHovered ? 0.75 : 1,
            backgroundColor: cursorType === "play" ? "#00E5FF" : "#A855F7",
          }}
          transition={{ duration: 0.12 }}
          className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#A855F7]"
        />
      )}
    </div>
  );
};

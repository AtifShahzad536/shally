import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useCursor } from "../../context/CursorContext";

export const CustomCursor = () => {
  const { cursorType, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
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

  const isExpanded = cursorType !== "default";
  const hasText = !!cursorText;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Ring / Tag */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isExpanded ? 1.4 : 1,
          width: hasText ? 120 : isExpanded ? 50 : 28,
          height: hasText ? 36 : isExpanded ? 50 : 28,
          backgroundColor: hasText
            ? "rgba(168, 85, 247, 0.9)"
            : cursorType === "play"
            ? "rgba(0, 229, 255, 0.85)"
            : isExpanded
            ? "rgba(168, 85, 247, 0.2)"
            : "rgba(255, 255, 255, 0.05)",
          borderColor: hasText
            ? "rgba(255, 255, 255, 0.6)"
            : cursorType === "play"
            ? "#00E5FF"
            : isExpanded
            ? "#A855F7"
            : "rgba(255, 255, 255, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="flex items-center justify-center rounded-[5px] border backdrop-blur-[2px] transition-colors"
      >
        {hasText && (
          <span className="font-heading text-[10px] font-bold tracking-wider text-white-pure uppercase px-2 text-center select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Dot */}
      {!hasText && (
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isExpanded ? 0 : 1,
            backgroundColor: cursorType === "play" ? "#00E5FF" : "#A855F7",
          }}
          transition={{ duration: 0.15 }}
          className="w-1.5 h-1.5 rounded-[2px] shadow-[0_0_8px_#A855F7]"
        />
      )}
    </div>
  );
};

import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export const AnimatedCounter = ({ 
  value = "18M+", 
  duration = 2.0, 
  className = "" 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  // Parse prefix, number, decimals, and suffix from string
  // Examples: "18M+", "+340%", "46.2%", "99.8%", "2.5M"
  const match = value.match(/^([+~]?)\s*([\d.]+)\s*(.*)$/);
  
  const prefix = match ? match[1] : "";
  const targetNum = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : "";
  const hasDecimals = match && match[2].includes(".");
  const decimalPlaces = hasDecimals ? match[2].split(".")[1].length : 0;

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 80,
    duration: duration * 1000
  });

  const spanRef = useRef(null);

  useEffect(() => {
    if (isInView) {
      motionValue.set(0);
      const timer = setTimeout(() => {
        motionValue.set(targetNum);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      motionValue.set(0);
    }
  }, [isInView, targetNum, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (spanRef.current) {
        const formattedNumber = hasDecimals
          ? latest.toFixed(decimalPlaces)
          : Math.floor(latest).toString();
        spanRef.current.textContent = `${prefix}${formattedNumber}${suffix}`;
      }
    });
    return () => unsubscribe();
  }, [springValue, prefix, suffix, hasDecimals, decimalPlaces]);

  return (
    <span ref={ref} className={`inline-block tabular-nums select-none ${className}`}>
      <span ref={spanRef}>
        {prefix}0{hasDecimals ? `.${"0".repeat(decimalPlaces)}` : ""}{suffix}
      </span>
    </span>
  );
};

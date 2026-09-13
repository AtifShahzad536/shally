import React, { useRef, useState } from "react";

export const ThreeDTiltCard = ({
  children,
  className = "",
  maxTilt = 14,
  perspective = 1000,
  scale = 1.025,
  glare = true,
  onClick
}) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse position relative to center of card (-1 to 1)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);

    // Calculate 3D rotations (invert Y for natural tilt)
    const rotateX = -mouseY * maxTilt;
    const rotateY = mouseX * maxTilt;

    setTransformStyle(
      `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale}) translateZ(20px)`
    );

    if (glare) {
      // Calculate light angle & distance for dynamic specular glare
      const glareX = ((e.clientX - rect.left) / width) * 100;
      const glareY = ((e.clientY - rect.top) / height) * 100;
      setGlareStyle({
        opacity: 0.45,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(0, 229, 255, 0.35) 0%, rgba(168, 85, 247, 0.2) 40%, rgba(0, 0, 0, 0) 75%)`
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle(
      `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)`
    );
    setGlareStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle || `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`,
        transformStyle: "preserve-3d",
        transition: isHovered
          ? "transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease"
          : "transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.65s ease"
      }}
      className={`relative will-change-transform ${className}`}
    >
      {/* 3D Specular Light Glare Layer */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-30 transition-opacity duration-300"
          style={{
            ...glareStyle,
            mixBlendMode: "screen"
          }}
        />
      )}

      {/* 3D Content Container */}
      <div
        className="w-full h-full relative rounded-[inherit]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
};

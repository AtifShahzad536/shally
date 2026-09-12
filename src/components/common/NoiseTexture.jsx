import React from "react";

export const NoiseTexture = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Lightweight SVG Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-30" />

      {/* High-Performance Radial Gradient Glows (GPU Accelerated, Zero CPU Blur Calculation) */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[50vw] h-[50vw] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(124, 58, 237, 0.1) 50%, transparent 70%)"
        }}
      />
      
      <div 
        className="absolute top-[35%] -right-[15%] w-[45vw] h-[45vw] rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.4) 0%, rgba(2, 132, 199, 0.1) 50%, transparent 70%)"
        }}
      />

      <div 
        className="absolute bottom-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(244, 114, 182, 0.3) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 70%)"
        }}
      />
      
      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />
    </div>
  );
};

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

export const Hero3DStage = ({ previewImage = "/shally.png", soundState }) => {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth subtle mouse parallax
  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // =========================================================================
  // Three.js 3D Subtle Stardust & Rings Background
  // =========================================================================
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const width = canvas.clientWidth || 600;
    const height = canvas.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 26;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // 1. Gentle Ambient Gyro Rings
    const gyroGroup = new THREE.Group();

    const ringMat1 = new THREE.MeshBasicMaterial({ 
      color: 0x00E5FF, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.35 
    });
    const ringMat2 = new THREE.MeshBasicMaterial({ 
      color: 0xA855F7, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.3 
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(10.5, 0.03, 16, 90), ringMat1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(13.2, 0.03, 16, 90), ringMat2);

    ring1.rotation.x = Math.PI / 3.5;
    ring2.rotation.y = Math.PI / 2.7;

    gyroGroup.add(ring1, ring2);
    scene.add(gyroGroup);

    // 2. Stardust Particles
    const pCount = 280;
    const pPositions = new Float32Array(pCount * 3);
    const pColors = new Float32Array(pCount * 3);
    const cCyan = new THREE.Color(0x00E5FF);
    const cPurple = new THREE.Color(0xA855F7);
    const cPink = new THREE.Color(0xF472B6);

    for (let i = 0; i < pCount * 3; i += 3) {
      const rad = 7.0 + Math.random() * 9.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      pPositions[i] = rad * Math.cos(theta) * Math.cos(phi);
      pPositions[i + 1] = rad * Math.sin(phi);
      pPositions[i + 2] = rad * Math.sin(theta) * Math.cos(phi);

      const r = Math.random();
      const c = r < 0.45 ? cCyan : r < 0.78 ? cPurple : cPink;
      pColors[i] = c.r;
      pColors[i + 1] = c.g;
      pColors[i + 2] = c.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let reqId;
    const clock = new THREE.Clock();
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    if (stageRef.current) observer.observe(stageRef.current);

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      
      ring1.rotation.z = t * 0.15;
      ring2.rotation.x = t * 0.12;
      
      particles.rotation.y = t * 0.08;
      particles.rotation.z = Math.sin(t * 0.1) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      if (observer) observer.disconnect();
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      gyroGroup.clear();
      if (pGeo) pGeo.dispose();
      if (pMat) pMat.dispose();
      if (ringMat1) ringMat1.dispose();
      if (ringMat2) ringMat2.dispose();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[520px] aspect-[1/1] flex items-center justify-center select-none mx-auto"
      style={{ perspective: "1400px" }}
    >
      {/* 3D WebGL Background Simulation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70"
      />

      {/* Atmospheric Soft Ambient Glow behind Picture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[400px] h-[340px] sm:h-[400px] rounded-full bg-gradient-to-tr from-purple-glow/35 via-cyan-neon/20 to-cute-pink/25 blur-[100px] pointer-events-none" />

      {/* Clean Photo Container with Soft Ambient Shadow (No box/card, purely photo + soft depth) */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${-mousePos.y * 0.6}deg) rotateY(${mousePos.x * 0.6}deg)`,
          transition: isHovered ? "transform 0.08s ease-out" : "transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)"
        }}
      >
        <div className="relative group">
          {/* Soft multi-layered glow & shadow underneath the portrait */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-glow/30 to-cyan-neon/30 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
          
          {/* Shally's Simple, Beautiful Portrait Image */}
          <img
            src={previewImage || "/shally.png"}
            alt="Shally"
            className="relative z-10 w-[260px] sm:w-[320px] md:w-[360px] h-auto max-h-[440px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] drop-shadow-[0_0_35px_rgba(168,85,247,0.35)] transition-transform duration-500 group-hover:scale-[1.02] pointer-events-none"
          />
        </div>
      </motion.div>

    </div>
  );
};

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Sparkles, Film, TrendingUp, PenTool } from "lucide-react";

export const HeroAncientTree = ({ previewImage = "/shally.png", soundState }) => {
  const { playSynthSound } = soundState || { playSynthSound: () => { } };
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse parallax
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

  // Three.js Drifting Petals & Sacred Fireflies Layer
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const width = canvas.clientWidth || 900;
    const height = canvas.clientHeight || 650;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // --- 1. Drifting Bioluminescent Sakura Petals (250 particles) ---
    const petalCount = 260;
    const petalPositions = new Float32Array(petalCount * 3);
    const petalColors = new Float32Array(petalCount * 3);
    const petalSpeeds = [];

    const cPink = new THREE.Color(0xf472b6);
    const cCyan = new THREE.Color(0x00e5ff);
    const cPurple = new THREE.Color(0xc084fc);

    for (let i = 0; i < petalCount; i++) {
      const i3 = i * 3;
      petalPositions[i3] = (Math.random() - 0.5) * 36;
      petalPositions[i3 + 1] = (Math.random() - 0.5) * 28;
      petalPositions[i3 + 2] = (Math.random() - 0.5) * 16;

      petalSpeeds.push({
        vx: -0.02 - Math.random() * 0.04,
        vy: -0.03 - Math.random() * 0.05,
        rot: Math.random() * Math.PI,
        rotSpeed: 0.01 + Math.random() * 0.02
      });

      const r = Math.random();
      const col = r < 0.5 ? cPink : r < 0.8 ? cCyan : cPurple;
      petalColors[i3] = col.r;
      petalColors[i3 + 1] = col.g;
      petalColors[i3 + 2] = col.b;
    }

    const petalGeo = new THREE.BufferGeometry();
    petalGeo.setAttribute("position", new THREE.BufferAttribute(petalPositions, 3));
    petalGeo.setAttribute("color", new THREE.BufferAttribute(petalColors, 3));

    const petalMat = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const petalSystem = new THREE.Points(petalGeo, petalMat);
    scene.add(petalSystem);

    // --- 2. Rising Fireflies from Roots (120 particles) ---
    const fireflyCount = 120;
    const fireflyPositions = new Float32Array(fireflyCount * 3);
    for (let i = 0; i < fireflyCount * 3; i += 3) {
      fireflyPositions[i] = (Math.random() - 0.5) * 26;
      fireflyPositions[i + 1] = -14 + Math.random() * 24;
      fireflyPositions[i + 2] = (Math.random() - 0.5) * 14;
    }

    const fireflyGeo = new THREE.BufferGeometry();
    fireflyGeo.setAttribute("position", new THREE.BufferAttribute(fireflyPositions, 3));

    const fireflyMat = new THREE.PointsMaterial({
      size: 0.3,
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const fireflies = new THREE.Points(fireflyGeo, fireflyMat);
    scene.add(fireflies);

    // Animation Loop
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

      // Drift petals
      const pArr = petalGeo.attributes.position.array;
      for (let i = 0; i < petalCount; i++) {
        const i3 = i * 3;
        const s = petalSpeeds[i];
        pArr[i3] += s.vx + Math.sin(t + i) * 0.015;
        pArr[i3 + 1] += s.vy;

        // Reset if drifted offscreen
        if (pArr[i3 + 1] < -14) pArr[i3 + 1] = 14;
        if (pArr[i3] < -18) pArr[i3] = 18;
      }
      petalGeo.attributes.position.needsUpdate = true;

      // Float fireflies
      const fArr = fireflyGeo.attributes.position.array;
      for (let i = 1; i < fireflyCount * 3; i += 3) {
        fArr[i] += 0.025;
        if (fArr[i] > 14) fArr[i] = -14;
      }
      fireflyGeo.attributes.position.needsUpdate = true;

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
      petalGeo.dispose();
      petalMat.dispose();
      fireflyGeo.dispose();
      fireflyMat.dispose();
    };
  }, []);

  const branchTags = [
    {
      title: "🎬 4K Cinema Vision",
      pos: "top-12 left-2 sm:left-14",
      glow: "text-cyan-neon"
    },
    {
      title: "🌸 18M+ Viral Growth",
      pos: "top-10 right-2 sm:right-14",
      glow: "text-cute-pink"
    },
    {
      title: "✍️ Cult Copywriting",
      pos: "bottom-14 left-4 sm:left-20",
      glow: "text-purple-mist"
    }
  ];

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-4xl min-h-[500px] sm:min-h-[560px] flex items-center justify-center select-none mx-auto py-2"
      style={{ perspective: "1500px" }}
    >
      {/* 3D Falling Petals & Fireflies Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20 opacity-90"
      />

      {/* Atmospheric Mystical Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[480px] rounded-full bg-gradient-to-tr from-purple-glow/30 via-cyan-neon/20 to-cute-pink/25 blur-[120px] pointer-events-none" />

      {/* Main 3D Parallax Tree Container (NO boxes, NO square cards!) */}
      <motion.div
        className="relative z-10 w-full flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${-mousePos.y * 0.4}deg) rotateY(${mousePos.x * 0.4}deg)`,
          transition: isHovered ? "transform 0.08s ease-out" : "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)"
        }}
      >
        {/* Ancient Sacred Tree Image with Thick Gnarled Trunk & Glowing Sakura Leaves */}
        <div className="relative w-[340px] sm:w-[480px] md:w-[560px] aspect-[1/1] flex items-center justify-center">

          {/* Real Ancient Tree Graphic with Ambient Drop Shadows */}
          <img
            src="/ancient-tree.jpg"
            alt="Ancient Tree of Life"
            className="w-full h-full object-contain rounded-full mask-radial drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] drop-shadow-[0_0_60px_rgba(168,85,247,0.35)] transition-transform duration-700 pointer-events-none"
            style={{
              maskImage: "radial-gradient(circle at 50% 50%, black 65%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 65%, transparent 95%)"
            }}
          />

          {/* Shally's Natural Portrait Seamlessly Embedded with Organic Circular Blend in Center */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group cursor-pointer"
            style={{ transform: "translate(-50%, -50%) translateZ(35px)" }}
            onClick={() => playSynthSound?.("click")}
          >
            {/* Soft Glowing Ring around Shally's portrait */}
            <div className="relative w-28 sm:w-36 md:w-40 aspect-square rounded-full p-1 bg-gradient-to-tr from-purple-glow via-cyan-neon to-cute-pink shadow-[0_0_35px_rgba(0,229,255,0.5)]">
              <img
                src={previewImage || "/shally.png"}
                alt="Shally"
                className="w-full h-full object-cover rounded-full pointer-events-none brightness-105 contrast-105"
              />
            </div>

            {/* Glowing Name Tag */}
            <div className="mt-2.5 px-3 py-1 rounded-full bg-dark-950/90 border border-cyan-neon/50 text-white-pure text-[11px] font-heading font-extrabold tracking-wider shadow-glow-cyan/40 backdrop-blur-md">
              Shally Shah ✨
            </div>
          </div>

        </div>
      </motion.div>

      {/* Floating Organic Branch Nodes (Pure text & glowing badges, NO square boxes/cards) */}
      {branchTags.map((b, idx) => (
        <motion.div
          key={idx}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4 + idx * 0.8, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }}
          className={`absolute ${b.pos} z-30 pointer-events-auto cursor-pointer group`}
          onClick={() => playSynthSound?.("click")}
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-950/80 border border-white/15 backdrop-blur-md hover:border-cyan-neon transition-all shadow-lg hover:shadow-glow-cyan/30">
            <span className="w-2 h-2 rounded-full bg-purple-glow animate-pulse" />
            <span className={`text-xs font-heading font-bold ${b.glow}`}>
              {b.title}
            </span>
          </div>
        </motion.div>
      ))}

    </div>
  );
};

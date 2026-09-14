import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const ThreeGlobalWorld = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene, Camera & Renderer Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06040b, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 100);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- 2. Dynamic 3D Lights ---
    const ambientLight = new THREE.AmbientLight(0x381e72, 1.2);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 3.5, 300);
    cyanLight.position.set(50, 40, 80);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 4.5, 350);
    purpleLight.position.set(-60, -30, 90);
    scene.add(purpleLight);

    // --- 3. 3D Particle Galaxy & Cosmic Dust ---
    const particleCount = 1400;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0xa855f7),
      new THREE.Color(0x00e5ff),
      new THREE.Color(0xf472b6),
      new THREE.Color(0xffffff)
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 350;
      particlePositions[i3 + 1] = Math.random() * 400 - 600;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 300;

      const col = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i3] = col.r;
      particleColors[i3 + 1] = col.g;
      particleColors[i3 + 2] = col.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- 4. 3D Geometric Space Landmarks ---
    const landmarksGroup = new THREE.Group();
    scene.add(landmarksGroup);

    // [A] HERO LANDMARK: Torus Knot
    const torusKnotGeo = new THREE.TorusKnotGeometry(16, 3.5, 64, 16, 2, 3);
    const torusKnotMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const heroTorusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    heroTorusKnot.position.set(45, 5, -20);
    landmarksGroup.add(heroTorusKnot);

    // [B] WORK LANDMARK: Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(18, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const workIco = new THREE.Mesh(icoGeo, icoMat);
    workIco.position.set(55, -190, -15);
    landmarksGroup.add(workIco);

    // [C] CONTACT LANDMARK: Vortex Singularity
    const vortexGeo = new THREE.TorusKnotGeometry(15, 2.5, 48, 12, 3, 5);
    const vortexMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const contactVortex = new THREE.Mesh(vortexGeo, vortexMat);
    contactVortex.position.set(0, -490, -10);
    landmarksGroup.add(contactVortex);

    // --- 5. Mouse & Scroll Physics Engine ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- 6. Resize Handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };
    window.addEventListener("resize", handleResize);

    // --- 7. GPU Zero-Lag Render Loop ---
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Direct zero-lag scroll tracking synced with Lenis / window scroll
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollProgress = window.scrollY / maxScroll;

      const currentCameraY = -scrollProgress * 490;
      camera.position.y = currentCameraY + mouseY * 6;
      camera.position.x = mouseX * 10;
      camera.position.z = 100 - Math.sin(scrollProgress * Math.PI) * 10;

      // Smooth mesh rotations
      heroTorusKnot.rotation.x = elapsedTime * 0.2;
      heroTorusKnot.rotation.y = elapsedTime * 0.25;
      workIco.rotation.x = elapsedTime * 0.25;
      workIco.rotation.y = elapsedTime * 0.35;
      contactVortex.rotation.x = elapsedTime * 0.35;

      // Pure GPU particle rotation
      particles.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="three-global-canvas-container"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.9 }}
    />
  );
};

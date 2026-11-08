"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Compass, Sparkles } from 'lucide-react';

interface CloudCity360Props {
  className?: string;
  height?: string | number;
  autoRotateSpeed?: number;
  interactive?: boolean;
}

export const CloudCity360: React.FC<CloudCity360Props> = ({
  className = '',
  height = '620px',
  autoRotateSpeed = 0.003,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cityGroupRef = useRef<THREE.Group | null>(null);
  const floatingCubesRef = useRef<THREE.Mesh[]>([]);

  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // References for smooth rotation math
  const stateRef = useRef({
    targetRotY: 0.4,
    targetRotX: 0.22,
    currentRotY: 0.4,
    currentRotX: 0.22,
    targetDistance: 52,
    currentDistance: 52,
    isInteracting: false,
    autoRotate: true,
    lastMouseX: 0,
    lastMouseY: 0,
  });

  useEffect(() => {
    stateRef.current.autoRotate = isAutoRotating;
  }, [isAutoRotating]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Fog Setup (Night sky atmospheric fog in deep violet-navy)
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x080417);
    scene.fog = new THREE.FogExp2(0x0c0724, 0.016);

    // 2. Camera Setup
    const width = container.clientWidth || 800;
    const heightPx = container.clientHeight || 620;
    const camera = new THREE.PerspectiveCamera(42, width / heightPx, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 18, 52);
    camera.lookAt(0, 6, 0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 4. City Container Group for full 360 rotation
    const cityGroup = new THREE.Group();
    cityGroupRef.current = cityGroup;
    scene.add(cityGroup);

    // 5. Lighting Setup (Dramatic Night Sky with Purple & Blue hues)
    // Ambient light - deep royal indigo
    const ambientLight = new THREE.AmbientLight(0x281654, 2.2);
    scene.add(ambientLight);

    // Moon / Key light - cool ice-blue moonlight
    const moonLight = new THREE.DirectionalLight(0xa5c4ff, 3.2);
    moonLight.position.set(30, 60, 40);
    scene.add(moonLight);

    // Cyber Rim light - vibrant violet
    const rimLight = new THREE.DirectionalLight(0xc084fc, 2.8);
    rimLight.position.set(-40, 25, -35);
    scene.add(rimLight);

    // Point lights for city glow
    const corePurpleLight = new THREE.PointLight(0xa855f7, 4.5, 45, 1.2);
    corePurpleLight.position.set(0, 14, 0);
    cityGroup.add(corePurpleLight);

    const coreBlueLight = new THREE.PointLight(0x38bdf8, 3.5, 50, 1.2);
    coreBlueLight.position.set(0, 4, 12);
    cityGroup.add(coreBlueLight);

    const underCloudLight = new THREE.PointLight(0x7c3aed, 5.0, 60, 1.4);
    underCloudLight.position.set(0, -4, 0);
    cityGroup.add(underCloudLight);

    // 6. Night Sky Starfield
    const starCount = 1400;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const starColorPalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xc4b5fd), // soft violet
      new THREE.Color(0x93c5fd), // soft blue
      new THREE.Color(0xe9d5ff), // lavender
      new THREE.Color(0x38bdf8), // cyan spark
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = 180 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 1.8 - 0.9);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = Math.abs(radius * Math.cos(phi)) + 5; // keep in upper sky
      starPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const color = starColorPalette[Math.floor(Math.random() * starColorPalette.length)];
      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 7. Procedural Futuristic Skyscraper Materials (Purple & Blue Aesthetics)
    const facadeMaterialA = new THREE.MeshStandardMaterial({
      color: 0x1b133d,
      roughness: 0.25,
      metalness: 0.85,
    });

    const facadeMaterialB = new THREE.MeshStandardMaterial({
      color: 0x141a38,
      roughness: 0.2,
      metalness: 0.9,
    });

    const glassTowerMaterial = new THREE.MeshStandardMaterial({
      color: 0x241d52,
      roughness: 0.1,
      metalness: 0.95,
      transparent: true,
      opacity: 0.92,
    });

    const glowingWindowMaterialPurple = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
    });

    const glowingWindowMaterialCyan = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    const spireMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.15,
    });

    const beaconLightMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
    });

    // 8. Generate Cloud City Skyscraper Clusters matching Reference Image 3
    // Central Mega-Spires and Secondary High-rises
    interface TowerConfig {
      x: number;
      z: number;
      width: number;
      depth: number;
      height: number;
      hasSpire?: boolean;
      spireHeight?: number;
      tiers?: number;
      accentColor?: 'purple' | 'cyan';
      shape?: 'box' | 'cylinder' | 'stepped';
    }

    const towers: TowerConfig[] = [
      // Central iconic towering needle spire (matching Image 3 center)
      { x: 0, z: 0, width: 3.4, depth: 3.4, height: 26, hasSpire: true, spireHeight: 11, tiers: 4, accentColor: 'cyan', shape: 'stepped' },
      { x: -2.8, z: 2.2, width: 2.8, depth: 2.8, height: 20, hasSpire: true, spireHeight: 7, tiers: 3, accentColor: 'purple', shape: 'stepped' },
      { x: 2.6, z: -1.8, width: 3.0, depth: 3.0, height: 22, hasSpire: true, spireHeight: 8, tiers: 3, accentColor: 'cyan', shape: 'stepped' },
      { x: -3.2, z: -2.6, width: 2.6, depth: 2.6, height: 18, hasSpire: false, tiers: 2, accentColor: 'purple' },
      { x: 3.5, z: 2.8, width: 2.5, depth: 2.5, height: 17, hasSpire: true, spireHeight: 5, accentColor: 'cyan' },

      // Mid-ring high rises
      { x: -5.8, z: 0.5, width: 2.6, depth: 2.4, height: 15, hasSpire: true, spireHeight: 5, accentColor: 'purple' },
      { x: 5.5, z: -0.6, width: 2.4, depth: 2.6, height: 16, hasSpire: true, spireHeight: 6, accentColor: 'cyan' },
      { x: -0.8, z: 5.2, width: 2.5, depth: 2.5, height: 14, hasSpire: false, tiers: 2, accentColor: 'purple' },
      { x: 0.6, z: -5.4, width: 2.7, depth: 2.7, height: 15, hasSpire: true, spireHeight: 4, accentColor: 'cyan' },

      // Outer cluster towers forming the dense city skyline
      { x: -4.5, z: 4.8, width: 2.2, depth: 2.2, height: 12, accentColor: 'purple' },
      { x: 4.8, z: 4.5, width: 2.1, depth: 2.1, height: 13, accentColor: 'cyan' },
      { x: -5.2, z: -4.8, width: 2.3, depth: 2.3, height: 11, accentColor: 'purple' },
      { x: 5.2, z: -4.5, width: 2.0, depth: 2.4, height: 12, accentColor: 'cyan' },

      // Perimeter city buildings emerging through clouds
      { x: -8.0, z: -2.0, width: 2.0, depth: 2.0, height: 8, accentColor: 'purple' },
      { x: 8.0, z: 2.0, width: 2.0, depth: 2.0, height: 9, accentColor: 'cyan' },
      { x: -2.0, z: 8.0, width: 2.2, depth: 1.8, height: 8.5, accentColor: 'purple' },
      { x: 2.0, z: -8.0, width: 1.9, depth: 2.2, height: 9.5, accentColor: 'cyan' },
      { x: -7.2, z: 3.5, width: 1.8, depth: 1.8, height: 7, accentColor: 'purple' },
      { x: 7.2, z: -3.2, width: 1.8, depth: 1.8, height: 7.5, accentColor: 'cyan' },
      { x: -3.5, z: -7.5, width: 1.9, depth: 1.9, height: 8, accentColor: 'purple' },
      { x: 3.8, z: 7.2, width: 1.7, depth: 1.7, height: 7.8, accentColor: 'cyan' },
    ];

    towers.forEach((cfg, idx) => {
      const towerGroup = new THREE.Group();
      towerGroup.position.set(cfg.x, 0, cfg.z);

      const baseMat = idx % 2 === 0 ? facadeMaterialA : facadeMaterialB;
      const mat = idx % 3 === 0 ? glassTowerMaterial : baseMat;

      if (cfg.tiers && cfg.tiers > 1) {
        // Multi-tier stepped architectural tower
        let currentY = 0;
        let currentW = cfg.width;
        let currentD = cfg.depth;
        const tierHeight = cfg.height / cfg.tiers;

        for (let t = 0; t < cfg.tiers; t++) {
          const tierGeo = new THREE.BoxGeometry(currentW, tierHeight, currentD);
          const tierMesh = new THREE.Mesh(tierGeo, mat);
          tierMesh.position.y = currentY + tierHeight / 2;
          towerGroup.add(tierMesh);

          // Add glowing vertical window strips
          const stripGeo = new THREE.BoxGeometry(currentW * 0.18, tierHeight * 0.85, currentD * 1.02);
          const winMat = cfg.accentColor === 'cyan' ? glowingWindowMaterialCyan : glowingWindowMaterialPurple;
          const stripMesh = new THREE.Mesh(stripGeo, winMat);
          stripMesh.position.y = currentY + tierHeight / 2;
          towerGroup.add(stripMesh);

          currentY += tierHeight;
          currentW *= 0.82;
          currentD *= 0.82;
        }

        // Spire atop tiered tower
        if (cfg.hasSpire) {
          const sH = cfg.spireHeight || 6;
          const spireGeo = new THREE.ConeGeometry(0.35, sH, 8);
          const spireMesh = new THREE.Mesh(spireGeo, spireMaterial);
          spireMesh.position.y = currentY + sH / 2;
          towerGroup.add(spireMesh);

          // Glowing tip beacon
          const beaconGeo = new THREE.SphereGeometry(0.3, 12, 12);
          const beaconMesh = new THREE.Mesh(beaconGeo, beaconLightMaterial);
          beaconMesh.position.y = currentY + sH;
          towerGroup.add(beaconMesh);
        }
      } else {
        // Single block skyscraper
        const geo = new THREE.BoxGeometry(cfg.width, cfg.height, cfg.depth);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.y = cfg.height / 2;
        towerGroup.add(mesh);

        // Vertical glowing channel
        const channelGeo = new THREE.BoxGeometry(cfg.width * 0.22, cfg.height * 0.88, cfg.depth * 1.02);
        const winMat = cfg.accentColor === 'cyan' ? glowingWindowMaterialCyan : glowingWindowMaterialPurple;
        const channelMesh = new THREE.Mesh(channelGeo, winMat);
        channelMesh.position.y = cfg.height / 2;
        towerGroup.add(channelMesh);

        // Rooftop antenna or spire
        if (cfg.hasSpire) {
          const sH = cfg.spireHeight || 4;
          const spireGeo = new THREE.CylinderGeometry(0.08, 0.2, sH, 8);
          const spireMesh = new THREE.Mesh(spireGeo, spireMaterial);
          spireMesh.position.y = cfg.height + sH / 2;
          towerGroup.add(spireMesh);

          const beaconGeo = new THREE.SphereGeometry(0.25, 8, 8);
          const beaconMesh = new THREE.Mesh(beaconGeo, beaconLightMaterial);
          beaconMesh.position.y = cfg.height + sH;
          towerGroup.add(beaconMesh);
        }
      }

      cityGroup.add(towerGroup);
    });

    // 9. Floating Crystalline Tech Cubes in Zero-G (Explicitly shown in Reference Image 3!)
    const floatingCubes: THREE.Mesh[] = [];
    const cubeCount = 28;
    const cubeMatCyan = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.88,
    });

    const cubeMatPurple = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.88,
    });

    for (let c = 0; c < cubeCount; c++) {
      const size = 0.6 + Math.random() * 1.1;
      const cubeGeo = new THREE.BoxGeometry(size, size, size);
      const isCyan = c % 2 === 0;
      const cubeMesh = new THREE.Mesh(cubeGeo, isCyan ? cubeMatCyan : cubeMatPurple);

      // Distribute in a spherical cloud around the city towers
      const angle = Math.random() * Math.PI * 2;
      const dist = 6 + Math.random() * 14;
      const elevation = 10 + Math.random() * 20;

      cubeMesh.position.set(
        Math.cos(angle) * dist,
        elevation,
        Math.sin(angle) * dist
      );

      cubeMesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      // Store animation properties in userData
      cubeMesh.userData = {
        baseY: elevation,
        speed: 0.008 + Math.random() * 0.015,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        phase: Math.random() * Math.PI * 2,
      };

      cityGroup.add(cubeMesh);
      floatingCubes.push(cubeMesh);
    }
    floatingCubesRef.current = floatingCubes;

    // 10. Glowing Volumetric Purple & Violet Clouds at City Base (Reference Image 3 Cloud Sea)
    const cloudClusterGroup = new THREE.Group();
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.35,
      roughness: 0.9,
      metalness: 0.1,
      transparent: true,
      opacity: 0.72,
    });

    const cloudPuffCount = 38;
    for (let p = 0; p < cloudPuffCount; p++) {
      const radius = 3.5 + Math.random() * 5.5;
      const puffGeo = new THREE.SphereGeometry(radius, 12, 10);
      const puff = new THREE.Mesh(puffGeo, cloudMat);

      const angle = (p / cloudPuffCount) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
      const dist = 7 + Math.random() * 14;
      const y = -1.5 + Math.sin(p * 1.5) * 2.2;

      puff.position.set(Math.cos(angle) * dist, y, Math.sin(angle) * dist);
      puff.scale.set(1.5, 0.65, 1.3);
      cloudClusterGroup.add(puff);
    }
    cityGroup.add(cloudClusterGroup);

    // 11. Reflective Cloud Platform Rim
    const platformGeo = new THREE.CylinderGeometry(20, 22, 1.2, 32);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x180f3d,
      roughness: 0.3,
      metalness: 0.85,
      transparent: true,
      opacity: 0.6,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -2;
    cityGroup.add(platform);

    // 12. Mouse & Cursor 360-Degree Interaction Logic (Sample Globe mechanics expanded to 3D)
    let isUserInteracting = false;
    let startPointerX = 0;
    let startPointerY = 0;
    let startRotY = 0;
    let startRotX = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isUserInteracting = true;
      stateRef.current.isInteracting = true;
      setIsDragging(true);

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      startPointerX = clientX;
      startPointerY = clientY;
      startRotY = stateRef.current.targetRotY;
      startRotX = stateRef.current.targetRotX;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isUserInteracting) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - startPointerX;
      const deltaY = clientY - startPointerY;

      // Sensitivity factor
      const sensitivity = 0.006;
      stateRef.current.targetRotY = startRotY + deltaX * sensitivity;

      // Clamp vertical pitch to maintain picturesque angle (-10 deg to 65 deg)
      const newRotX = startRotX + deltaY * sensitivity;
      stateRef.current.targetRotX = Math.max(-0.1, Math.min(1.1, newRotX));
    };

    const handlePointerUp = () => {
      isUserInteracting = false;
      setIsDragging(false);
      // Resume auto-rotation smoothly after 1.5 seconds if enabled
      setTimeout(() => {
        stateRef.current.isInteracting = false;
      }, 1500);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.035;
      const newDist = Math.max(26, Math.min(85, stateRef.current.targetDistance + zoomDelta));
      stateRef.current.targetDistance = newDist;
      setZoomLevel(Number(((85 - newDist) / 59 + 0.5).toFixed(2)));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domElement.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    domElement.addEventListener('wheel', handleWheel, { passive: false });

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 13. Animation Loop with Smooth Damping & Auto-Rotation
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Auto-rotation when not interacting
      if (stateRef.current.autoRotate && !stateRef.current.isInteracting) {
        stateRef.current.targetRotY += autoRotateSpeed;
      }

      // Smooth damping interpolation (lerp)
      stateRef.current.currentRotY += (stateRef.current.targetRotY - stateRef.current.currentRotY) * 0.08;
      stateRef.current.currentRotX += (stateRef.current.targetRotX - stateRef.current.currentRotX) * 0.08;
      stateRef.current.currentDistance += (stateRef.current.targetDistance - stateRef.current.currentDistance) * 0.1;

      // Update City Group Rotation (Full 360 degrees)
      if (cityGroupRef.current) {
        cityGroupRef.current.rotation.y = stateRef.current.currentRotY;
      }

      // Update Camera based on pitch and zoom distance
      const distance = stateRef.current.currentDistance;
      const pitch = stateRef.current.currentRotX;
      camera.position.x = 0;
      camera.position.y = distance * Math.sin(pitch) + 4;
      camera.position.z = distance * Math.cos(pitch);
      camera.lookAt(0, 7, 0);

      // Animate floating crystalline cubes (bobbing and spinning)
      floatingCubesRef.current.forEach((cube) => {
        const ud = cube.userData;
        cube.position.y = ud.baseY + Math.sin(elapsedTime * 1.5 + ud.phase) * 1.2;
        cube.rotation.x += ud.rotSpeedX;
        cube.rotation.y += ud.rotSpeedY;
      });

      // Subtle pulse for purple point light
      corePurpleLight.intensity = 4.2 + Math.sin(elapsedTime * 2.2) * 1.2;
      coreBlueLight.intensity = 3.2 + Math.cos(elapsedTime * 1.8) * 0.9;

      // Slow drift for clouds
      cloudClusterGroup.rotation.y += 0.0008;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domElement.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      domElement.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      renderer.dispose();
    };
  }, [autoRotateSpeed, interactive]);

  // Interactive control actions
  const handleToggleAutoRotate = useCallback(() => {
    setIsAutoRotating((prev) => !prev);
  }, []);

  const handleResetView = useCallback(() => {
    stateRef.current.targetRotY = 0.4;
    stateRef.current.targetRotX = 0.22;
    stateRef.current.targetDistance = 52;
    setZoomLevel(1);
  }, []);

  const handleZoomIn = useCallback(() => {
    const newDist = Math.max(26, stateRef.current.targetDistance - 8);
    stateRef.current.targetDistance = newDist;
    setZoomLevel(Number(((85 - newDist) / 59 + 0.5).toFixed(2)));
  }, []);

  const handleZoomOut = useCallback(() => {
    const newDist = Math.min(85, stateRef.current.targetDistance + 8);
    stateRef.current.targetDistance = newDist;
    setZoomLevel(Number(((85 - newDist) / 59 + 0.5).toFixed(2)));
  }, []);

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden select-none border border-purple-500/30 bg-[#080417] shadow-[0_20px_60px_-15px_rgba(139,92,246,0.3)] ${className}`}
      style={{ height }}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
        style={{ touchAction: 'none' }}
      />

      {/* Top Left Badge - 360 Night Sky Cloud City */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#110A2E]/85 backdrop-blur-md border border-purple-500/40 text-xs font-semibold text-purple-200 shadow-lg pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span className="font-bold text-white tracking-wide">360° Cloud City</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        <span className="text-[11px] text-purple-300 font-mono">Night Sky</span>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-4 inset-x-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Interaction Hint */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0F0828]/90 backdrop-blur-md border border-purple-500/30 text-xs text-purple-200 shadow-md">
          <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Drag with cursor to rotate 360° • Scroll to zoom</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Zoom Buttons */}
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            aria-label="Zoom in on 360 Cloud City"
            className="p-2 rounded-xl bg-[#130B33]/90 hover:bg-purple-600/40 border border-purple-500/40 text-white hover:text-cyan-300 transition-all shadow-md cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            aria-label="Zoom out of 360 Cloud City"
            className="p-2 rounded-xl bg-[#130B33]/90 hover:bg-purple-600/40 border border-purple-500/40 text-white hover:text-cyan-300 transition-all shadow-md cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Reset Angle Button */}
          <button
            onClick={handleResetView}
            title="Reset 360 View"
            aria-label="Reset Cloud City angle"
            className="px-2.5 py-1.5 rounded-xl bg-[#130B33]/90 hover:bg-purple-600/40 border border-purple-500/40 text-xs font-semibold text-purple-200 hover:text-white transition-all shadow-md cursor-pointer"
          >
            Reset
          </button>

          {/* Auto-Rotate Toggle Button */}
          <button
            onClick={handleToggleAutoRotate}
            title={isAutoRotating ? 'Pause Auto-Rotate' : 'Resume Auto-Rotate'}
            aria-label="Toggle Auto-Rotation"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-md cursor-pointer ${
              isAutoRotating
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-[#130B33]/90 border-purple-500/40 text-purple-300 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            <span>{isAutoRotating ? 'Rotating' : 'Paused'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

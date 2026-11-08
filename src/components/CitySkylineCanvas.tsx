import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  color: string;
}

interface NebulaCloud {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  phase: number;
}

export const CitySkylineCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
      initNebula();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // 1. Generate Starfield
    let stars: Star[] = [];
    const starPalette = ['#FFFFFF', '#C4B5FD', '#A78BFA', '#93C5FD', '#38BDF8', '#E9D5FF'];

    const initStars = () => {
      stars = [];
      const count = Math.floor((width * height) / 3200);
      for (let i = 0; i < count; i++) {
        const baseAlpha = 0.2 + Math.random() * 0.7;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 0.7 + Math.random() * 1.8,
          alpha: baseAlpha,
          baseAlpha,
          twinkleSpeed: 0.02 + Math.random() * 0.05,
          color: starPalette[Math.floor(Math.random() * starPalette.length)],
        });
      }
    };

    // 2. Generate Ethereal Nebula Clouds in Purple & Blue
    let nebulas: NebulaCloud[] = [];
    const initNebula = () => {
      nebulas = [
        { x: width * 0.2, y: height * 0.25, radius: width * 0.35, color: 'rgba(124, 58, 237, 0.12)', vx: 0.08, phase: 0 },
        { x: width * 0.8, y: height * 0.35, radius: width * 0.4, color: 'rgba(99, 102, 241, 0.10)', vx: -0.06, phase: 2 },
        { x: width * 0.5, y: height * 0.7, radius: width * 0.45, color: 'rgba(168, 85, 247, 0.09)', vx: 0.05, phase: 4 },
        { x: width * 0.15, y: height * 0.85, radius: width * 0.3, color: 'rgba(56, 189, 248, 0.08)', vx: -0.04, phase: 1.5 },
      ];
    };

    initStars();
    initNebula();

    let frame = 0;

    const render = () => {
      frame++;
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      const parallaxX = (mouseX / width - 0.5) * 20;
      const parallaxY = (mouseY / height - 0.5) * 15;

      ctx.clearRect(0, 0, width, height);

      // Deep Night Sky Gradient (Reference Image 3 deep night palette)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#060312'); // Deep space
      skyGrad.addColorStop(0.35, '#0C0724'); // Cosmic indigo
      skyGrad.addColorStop(0.7, '#140D36'); // Midnight violet
      skyGrad.addColorStop(1, '#080518');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Soft Drifting Cosmic Nebula Orbs
      nebulas.forEach((n) => {
        n.x += n.vx;
        if (n.x - n.radius > width) n.x = -n.radius;
        if (n.x + n.radius < 0) n.x = width + n.radius;

        const pulse = Math.sin(frame * 0.01 + n.phase) * 25;
        const grad = ctx.createRadialGradient(
          n.x + parallaxX * 0.5,
          n.y + parallaxY * 0.5,
          10,
          n.x + parallaxX * 0.5,
          n.y + parallaxY * 0.5,
          n.radius + pulse
        );
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, 'rgba(6, 3, 18, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x + parallaxX * 0.5, n.y + parallaxY * 0.5, n.radius + pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Twinkling Night Stars
      stars.forEach((star) => {
        const starX = star.x + parallaxX * 0.2;
        const starY = star.y + parallaxY * 0.2;

        star.alpha = star.baseAlpha + Math.sin(frame * star.twinkleSpeed) * 0.3;
        const clampedAlpha = Math.max(0.1, Math.min(1, star.alpha));

        ctx.save();
        ctx.globalAlpha = clampedAlpha;
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(starX, starY, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Subtle shooting star every ~280 frames
      if (frame % 280 < 35) {
        const t = (frame % 280) / 35;
        const sx = width * 0.7 - t * 240;
        const sy = height * 0.15 + t * 140;

        ctx.save();
        ctx.strokeStyle = 'rgba(196, 181, 253, 0.75)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + 35, sy - 20);
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Seamless cosmic dark overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#070415]/30 to-[#070415]/70 pointer-events-none" />
    </div>
  );
};

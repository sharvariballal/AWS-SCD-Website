import React, { useEffect, useRef } from 'react';

interface Building {
  x: number;
  width: number;
  height: number;
  layer: number; // 0: background, 1: mid (server racks)
  rackSlots: number;
  leds: {
    slot: number;
    col: number;
    color: string;
    blinkSpeed: number;
    phase: number;
    isAlwaysOn: boolean;
  }[];
  hasAntenna: boolean;
  hasCircuit: boolean;
}

interface Cloud {
  x: number;
  y: number;
  width: number;
  speed: number;
  opacity: number;
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
      initBuildings();
      initClouds();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let buildings: Building[] = [];
    const initBuildings = () => {
      buildings = [];
      const numBuildings = Math.max(12, Math.floor(width / 80));
      const step = (width + 120) / numBuildings;

      // Layer 0: Far silhouette
      for (let i = 0; i < numBuildings; i++) {
        const bWidth = 60 + Math.random() * 40;
        const bHeight = height * (0.32 + Math.random() * 0.2);
        buildings.push({
          x: i * step - 40 + (Math.random() * 20 - 10),
          width: bWidth,
          height: bHeight,
          layer: 0,
          rackSlots: 5,
          leds: [],
          hasAntenna: Math.random() > 0.4,
          hasCircuit: false,
        });
      }

      // Layer 1: Mid server rack towers with glowing yellow windows & circuit lines
      for (let i = 0; i < numBuildings - 1; i++) {
        const bWidth = 70 + Math.random() * 50;
        const bHeight = height * (0.24 + Math.random() * 0.22);
        const rackSlots = Math.floor(bHeight / 22);
        const leds: Building['leds'] = [];

        for (let slot = 0; slot < rackSlots; slot++) {
          const numCols = Math.floor(bWidth / 15);
          for (let c = 0; c < numCols; c++) {
            if (Math.random() > 0.3) {
              const isGold = Math.random() > 0.35;
              leds.push({
                slot,
                col: c,
                color: isGold ? '#FFB703' : '#FF9900',
                blinkSpeed: 0.02 + Math.random() * 0.04,
                phase: Math.random() * Math.PI * 2,
                isAlwaysOn: Math.random() > 0.65,
              });
            }
          }
        }

        buildings.push({
          x: i * step + step * 0.35 + (Math.random() * 15 - 7),
          width: bWidth,
          height: bHeight,
          layer: 1,
          rackSlots,
          leds,
          hasAntenna: Math.random() > 0.5,
          hasCircuit: Math.random() > 0.35,
        });
      }
    };

    let clouds: Cloud[] = [];
    const initClouds = () => {
      clouds = [
        { x: width * 0.08, y: height * 0.12, width: 200, speed: 0.22, opacity: 0.4 },
        { x: width * 0.42, y: height * 0.08, width: 300, speed: 0.16, opacity: 0.35 },
        { x: width * 0.75, y: height * 0.18, width: 240, speed: 0.2, opacity: 0.45 },
        { x: width * 0.22, y: height * 0.24, width: 170, speed: 0.25, opacity: 0.3 },
      ];
    };

    initBuildings();
    initClouds();

    let frame = 0;

    const render = () => {
      frame++;
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      const parallaxFactorX = (mouseX / width - 0.5) * 18;

      ctx.clearRect(0, 0, width, height);

      // 1. Sky Gradient: Deep tech night purple/navy in hero
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#080E1B'); // Midnight navy
      skyGrad.addColorStop(0.35, '#0E172C'); // Deep Tech Navy
      skyGrad.addColorStop(0.75, '#161B33'); // Violet-navy
      skyGrad.addColorStop(1, '#1A213D');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Horizon Warm Glow Accent
      const horizonGrad = ctx.createRadialGradient(
        width * 0.5 + parallaxFactorX * 1.5,
        height * 0.72,
        20,
        width * 0.5,
        height * 0.72,
        width * 0.65
      );
      horizonGrad.addColorStop(0, 'rgba(255, 153, 0, 0.25)');
      horizonGrad.addColorStop(0.4, 'rgba(108, 92, 231, 0.2)');
      horizonGrad.addColorStop(1, 'rgba(14, 23, 44, 0)');
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Floating Clouds with soft neon outline
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed;
        if (cloud.x - cloud.width > width) cloud.x = -cloud.width;

        ctx.save();
        ctx.fillStyle = `rgba(139, 92, 246, ${cloud.opacity * 0.45})`;
        ctx.strokeStyle = `rgba(192, 132, 252, ${cloud.opacity * 0.6})`;
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        const cx = cloud.x;
        const cy = cloud.y;
        const w = cloud.width;
        const h = w * 0.35;
        ctx.ellipse(cx, cy, w * 0.42, h * 0.42, 0, 0, Math.PI * 2);
        ctx.ellipse(cx - w * 0.2, cy + h * 0.05, w * 0.22, h * 0.32, 0, 0, Math.PI * 2);
        ctx.ellipse(cx + w * 0.2, cy + h * 0.08, w * 0.25, h * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // 3. Floating SBG Purple Castellated Chip in Sky (matching reference Image 2)
      ctx.save();
      const sbgX = width * 0.88 + parallaxFactorX * 0.5;
      const sbgY = height * 0.12 + Math.sin(frame * 0.03) * 6;
      ctx.fillStyle = 'rgba(168, 85, 247, 0.35)';
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.7)';
      ctx.lineWidth = 2;
      ctx.strokeRect(sbgX - 16, sbgY - 16, 32, 32);
      ctx.fillRect(sbgX - 16, sbgY - 16, 32, 32);
      // Small decorative pin ticks
      ctx.fillStyle = 'rgba(216, 180, 254, 0.7)';
      ctx.fillRect(sbgX - 10, sbgY - 22, 4, 6);
      ctx.fillRect(sbgX + 6, sbgY - 22, 4, 6);
      ctx.fillRect(sbgX - 10, sbgY + 16, 4, 6);
      ctx.fillRect(sbgX + 6, sbgY + 16, 4, 6);
      ctx.fillRect(sbgX - 22, sbgY - 10, 6, 4);
      ctx.fillRect(sbgX - 22, sbgY + 6, 6, 4);
      ctx.fillRect(sbgX + 16, sbgY - 10, 6, 4);
      ctx.fillRect(sbgX + 16, sbgY + 6, 6, 4);
      ctx.restore();

      // 4. Background Towers (Layer 0)
      buildings
        .filter((b) => b.layer === 0)
        .forEach((b) => {
          const drawX = b.x + parallaxFactorX * 0.3;
          const drawY = height - b.height;

          const grad = ctx.createLinearGradient(drawX, drawY, drawX, height);
          grad.addColorStop(0, '#1E2548');
          grad.addColorStop(1, '#0D1429');
          ctx.fillStyle = grad;
          ctx.fillRect(drawX, drawY, b.width, b.height);

          ctx.fillStyle = 'rgba(148, 163, 184, 0.3)';
          ctx.fillRect(drawX, drawY, b.width, 2);

          if (b.hasAntenna) {
            ctx.beginPath();
            ctx.moveTo(drawX + b.width / 2, drawY);
            ctx.lineTo(drawX + b.width / 2, drawY - 28);
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            const beaconAlpha = 0.4 + 0.6 * Math.sin(frame * 0.08);
            ctx.fillStyle = `rgba(255, 153, 0, ${beaconAlpha})`;
            ctx.beginPath();
            ctx.arc(drawX + b.width / 2, drawY - 28, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        });

      // 5. Midground Server Rack Towers (Layer 1)
      buildings
        .filter((b) => b.layer === 1)
        .forEach((b) => {
          const drawX = b.x + parallaxFactorX * 0.6;
          const drawY = height - b.height;

          const grad = ctx.createLinearGradient(drawX, drawY, drawX, height);
          grad.addColorStop(0, '#131A33');
          grad.addColorStop(0.5, '#0E162D');
          grad.addColorStop(1, '#080E1C');
          ctx.fillStyle = grad;
          ctx.fillRect(drawX, drawY, b.width, b.height);

          ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(drawX, drawY, b.width, b.height);

          // Horizontal server rack shelves
          const slotHeight = b.height / b.rackSlots;
          ctx.strokeStyle = 'rgba(71, 85, 105, 0.35)';
          ctx.lineWidth = 1;
          for (let s = 1; s < b.rackSlots; s++) {
            const slotY = drawY + s * slotHeight;
            ctx.beginPath();
            ctx.moveTo(drawX + 3, slotY);
            ctx.lineTo(drawX + b.width - 3, slotY);
            ctx.stroke();
          }

          // Antenna & Wifi waves
          if (b.hasAntenna) {
            const antX = drawX + b.width * 0.5;
            ctx.beginPath();
            ctx.moveTo(antX, drawY);
            ctx.lineTo(antX, drawY - 32);
            ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Wifi broadcast arcs
            const pulse = (frame % 40) / 40;
            ctx.strokeStyle = `rgba(192, 132, 252, ${1 - pulse})`;
            ctx.beginPath();
            ctx.arc(antX, drawY - 32, 8 + pulse * 14, Math.PI * 1.2, Math.PI * 1.8);
            ctx.stroke();
          }

          // Circuit lines on tower facade (matching reference Image 2)
          if (b.hasCircuit) {
            ctx.save();
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(drawX + b.width * 0.3, drawY + b.height);
            ctx.lineTo(drawX + b.width * 0.3, drawY + b.height * 0.4);
            ctx.lineTo(drawX + b.width * 0.6, drawY + b.height * 0.25);
            ctx.stroke();

            ctx.fillStyle = '#A855F7';
            ctx.beginPath();
            ctx.arc(drawX + b.width * 0.6, drawY + b.height * 0.25, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          // Glowing Warm Yellow Window Lights
          b.leds.forEach((led) => {
            const ledX = drawX + 7 + led.col * 14;
            const ledY = drawY + 6 + led.slot * slotHeight;

            let alpha = 0.85;
            if (!led.isAlwaysOn) {
              alpha = 0.35 + 0.65 * Math.abs(Math.sin(frame * led.blinkSpeed + led.phase));
            }

            ctx.save();
            ctx.fillStyle = led.color;
            ctx.globalAlpha = alpha;
            ctx.shadowColor = led.color;
            ctx.shadowBlur = 8;
            ctx.fillRect(ledX, ledY, 6, 4);
            ctx.restore();
          });
        });

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
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Soft gradient mask blending seamlessly into lower content */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-50 via-slate-50/70 to-transparent pointer-events-none" />
    </div>
  );
};

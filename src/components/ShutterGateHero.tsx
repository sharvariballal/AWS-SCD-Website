import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronDown, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface ShutterGateHeroProps {
  isUnlocked: boolean;
  onUnlock: () => void;
  onReplay?: () => void;
}

export const ShutterGateHero: React.FC<ShutterGateHeroProps> = ({
  isUnlocked,
  onUnlock,
}) => {
  // Virtual progress tracking (0.0 = Closed, 1.0 = Fully Opened)
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const updateProgressRef = useRef<() => void>(() => {});

  const [progress, setProgress] = useState(0);
  const [isOpeningAutomatically, setIsOpeningAutomatically] = useState(false);

  // Main 60fps smooth spring/lerp loop
  const updateProgress = useCallback(() => {
    const diff = targetProgressRef.current - currentProgressRef.current;
    
    // Smooth responsive interpolation
    currentProgressRef.current += diff * (isOpeningAutomatically ? 0.08 : 0.12);
    const p = Math.min(Math.max(currentProgressRef.current, 0), 1.0);
    setProgress(p);

    // When almost fully opened, trigger seamless unlock
    if (p >= 0.985 && !isUnlocked) {
      onUnlock();
      return;
    }

    if (!isUnlocked) {
      rafIdRef.current = requestAnimationFrame(() => updateProgressRef.current());
    }
  }, [isUnlocked, isOpeningAutomatically, onUnlock]);

  useEffect(() => {
    updateProgressRef.current = updateProgress;
  });

  useEffect(() => {
    if (!isUnlocked) {
      targetProgressRef.current = 0;
      currentProgressRef.current = 0;
      window.scrollTo({ top: 0, behavior: 'instant' });
      rafIdRef.current = requestAnimationFrame(() => {
        setIsOpeningAutomatically(false);
        updateProgressRef.current();
      });
      return () => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      };
    }
  }, [isUnlocked]);

  // Touch & Scroll Delta Handler
  useEffect(() => {
    if (isUnlocked) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const sensitivity = 0.0012;
      const next = targetProgressRef.current + e.deltaY * sensitivity;
      targetProgressRef.current = Math.min(Math.max(next, 0), 1.0);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const diff = touchStartY - currentY;
      touchStartY = currentY;

      const touchSensitivity = 0.0035;
      const next = targetProgressRef.current + diff * touchSensitivity;
      targetProgressRef.current = Math.min(Math.max(next, 0), 1.0);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        targetProgressRef.current = Math.min(targetProgressRef.current + 0.15, 1.0);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        targetProgressRef.current = Math.max(targetProgressRef.current - 0.15, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUnlocked]);

  // Instant trigger to slide open smoothly
  const handleAutoEnter = () => {
    setIsOpeningAutomatically(true);
    targetProgressRef.current = 1.0;
  };

  if (isUnlocked) return null;

  // Door translation calculations
  const leftDoorX = -progress * 105; // 0% to -105%
  const rightDoorX = progress * 105; // 0% to +105%
  const centerLockOpacity = Math.max(0, 1 - progress * 2.2);
  const centerLockScale = 1 + progress * 0.4;
  const centerLockRotate = progress * 90;
  const overlayMistOpacity = Math.min(progress * 1.5, 1);

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-[#0A0314] select-none pointer-events-auto">
      
      {/* 1. Underlying Horizon / Light Portal that reveals as doors part */}
      <div 
        style={{ opacity: overlayMistOpacity }}
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#1E0938] via-[#2F1054] to-[#F5EFFE] transition-opacity duration-300"
      >
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-500/30 via-amber-400/30 to-purple-400/30 blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-300/20 via-purple-600/10 to-transparent" />
      </div>

      {/* 2. Left Hydraulic Shutter Blast Door */}
      <div
        style={{
          transform: `translate3d(${leftDoorX}%, 0, 0)`,
          willChange: 'transform',
        }}
        className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#0D041A] via-[#1A0933] to-[#250C48] border-r-2 border-amber-400/40 shadow-[20px_0_60px_rgba(0,0,0,0.9)] flex items-center justify-end overflow-hidden"
      >
        {/* Precision Laser-Etched Blueprint Circuit Paths */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C4B5FD_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <svg className="absolute inset-0 w-full h-full opacity-30 stroke-purple-400" xmlns="http://www.w3.org/2000/svg">
          <line x1="20%" y1="0" x2="20%" y2="100%" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="60%" y1="0" x2="60%" y2="100%" strokeWidth="1" />
          <line x1="0" y1="35%" x2="100%" y2="35%" strokeWidth="1" />
          <line x1="0" y1="65%" x2="100%" y2="65%" strokeWidth="1" />
          <circle cx="60%" cy="35%" r="6" fill="#FBBF24" />
          <circle cx="60%" cy="65%" r="6" fill="#FBBF24" />
        </svg>

        {/* Hydraulic Seam Accents */}
        <div className="absolute right-3 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-amber-400 to-transparent opacity-60" />
      </div>

      {/* 3. Right Hydraulic Shutter Blast Door */}
      <div
        style={{
          transform: `translate3d(${rightDoorX}%, 0, 0)`,
          willChange: 'transform',
        }}
        className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#0D041A] via-[#1A0933] to-[#250C48] border-l-2 border-amber-400/40 shadow-[-20px_0_60px_rgba(0,0,0,0.9)] flex items-center justify-start overflow-hidden"
      >
        {/* Precision Laser-Etched Blueprint Circuit Paths */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C4B5FD_1px,transparent_1px)] [background-size:24px_24px]" />

        <svg className="absolute inset-0 w-full h-full opacity-30 stroke-purple-400" xmlns="http://www.w3.org/2000/svg">
          <line x1="80%" y1="0" x2="80%" y2="100%" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="40%" y1="0" x2="40%" y2="100%" strokeWidth="1" />
          <line x1="0" y1="35%" x2="100%" y2="35%" strokeWidth="1" />
          <line x1="0" y1="65%" x2="100%" y2="65%" strokeWidth="1" />
          <circle cx="40%" cy="35%" r="6" fill="#FBBF24" />
          <circle cx="40%" cy="65%" r="6" fill="#FBBF24" />
        </svg>

        {/* Hydraulic Seam Accents */}
        <div className="absolute left-3 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-amber-400 to-transparent opacity-60" />
      </div>

      {/* 4. Central Mechanical Iris & Typography (Fades out as doors open) */}
      <div
        style={{
          opacity: centerLockOpacity,
          transform: `scale(${centerLockScale})`,
          pointerEvents: centerLockOpacity > 0.1 ? 'auto' : 'none',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-30 transition-opacity duration-150"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Rotating Geometric Iris Emblem */}
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            {/* Outer Rotating Gear Ring */}
            <div 
              style={{ transform: `rotate(${centerLockRotate}deg)` }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/80 animate-[spin_30s_linear_infinite]"
            />
            {/* Middle Conduit Ring */}
            <div className="absolute inset-2 rounded-full border border-purple-400/60" />
            {/* Center Core Emblem with Official Club Crest on Black Background */}
            <div className="w-16 h-16 rounded-2xl bg-black border-2 border-amber-400 p-2 flex items-center justify-center shadow-[0_0_35px_rgba(251,191,36,0.6)]">
              <img
                src="/brand/sbg-emblem-black.png"
                alt="AWS Student Builder Group"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Summit Title Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/90 border border-purple-300/40 text-purple-200 text-xs font-mono tracking-[0.25em] uppercase shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AWS Student Community Day 2027</span>
          </div>

          {/* Grand Header - Solid High Contrast Typography */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            Welcome to <span className="text-amber-300">Cloud City</span>
          </h1>

          <p className="text-xs sm:text-sm font-mono text-purple-200/90 tracking-widest uppercase">
            Sunday, 07 February 2027 • Pune
          </p>

          {/* Single Dominant Ingress Action (No Ticket Price Reveal on Gates) */}
          <div className="pt-2 flex items-center justify-center">
            <button
              onClick={handleAutoEnter}
              className="px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-sm shadow-xl shadow-amber-400/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <span>Enter Cloud City</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Verified Ingress Status */}
          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] font-mono text-purple-300/80">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>AWS Student Builder Group • PICT Pune Chapter</span>
          </div>

        </div>
      </div>

      {/* 5. Scroll Prompt at Bottom */}
      <div
        style={{
          opacity: centerLockOpacity,
          pointerEvents: centerLockOpacity > 0.1 ? 'auto' : 'none',
        }}
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center z-30 transition-opacity duration-150"
      >
        <button
          onClick={handleAutoEnter}
          className="group flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0 outline-none p-2"
        >
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-purple-300/80 group-hover:text-amber-300 transition-colors">
            Scroll down or click to open gates
          </span>
          <div className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-400/40 flex items-center justify-center text-amber-300 shadow-lg group-hover:bg-amber-400 group-hover:text-purple-950 transition-all animate-bounce">
            <ChevronDown className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Top Right Quick Skip Button */}
      <div className="absolute top-6 right-6 z-40">
        <button
          onClick={handleAutoEnter}
          className="px-4 py-1.5 rounded-full bg-purple-950/80 hover:bg-purple-900 border border-purple-400/40 text-purple-200 hover:text-amber-300 text-xs font-mono tracking-wider cursor-pointer backdrop-blur-md transition-all shadow-md inline-flex items-center gap-1.5"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-950/60 z-40 pointer-events-none">
        <div
          style={{ width: `${progress * 100}%` }}
          className="h-full bg-gradient-to-r from-amber-400 via-purple-400 to-amber-300 transition-all duration-75"
        />
      </div>

    </div>
  );
};

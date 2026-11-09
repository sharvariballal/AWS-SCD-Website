import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronDown, Sparkles, Loader2 } from 'lucide-react';
import { playSound } from '../utils/audio';

interface ShutterGateHeroProps {
  isUnlocked: boolean;
  onUnlock: () => void;
  onReplay?: () => void;
}

export const ShutterGateHero: React.FC<ShutterGateHeroProps> = ({
  isUnlocked,
  onUnlock,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Virtual progress tracking (0.0 to 1.0)
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // React state for reactive rendering
  const [displayProgress, setDisplayProgress] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [portalOpacity, setPortalOpacity] = useState(1);
  const [portalScale, setPortalScale] = useState(1);

  // Check video readiness
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      video.pause();
      video.currentTime = 0;
      setIsVideoLoaded(true);
    };

    if (video.readyState >= 1) {
      onLoaded();
    } else {
      video.addEventListener('loadedmetadata', onLoaded);
      return () => video.removeEventListener('loadedmetadata', onLoaded);
    }
  }, []);

  // Main animation / scrub loop
  const updateScrub = useCallback(() => {
    // Smooth lerp interpolation
    const diff = targetProgressRef.current - currentProgressRef.current;
    currentProgressRef.current += diff * 0.14;

    const p = Math.min(Math.max(currentProgressRef.current, 0), 1);
    setDisplayProgress(p);

    // 1. Text Opacity: Fade out "Welcome to Cloud City" smoothly during first 20% (0.0 to 0.2)
    if (p <= 0.2) {
      setTextOpacity(1 - p / 0.2);
    } else {
      setTextOpacity(0);
    }

    // 2. Video Scrubbing: Map scroll progress (0.0 to 0.8) directly to video currentTime
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      const videoProgress = Math.min(Math.max(p / 0.8, 0), 1);
      const targetTime = videoProgress * video.duration;

      // Update currentTime if delta is meaningful
      if (Math.abs(video.currentTime - targetTime) > 0.02) {
        video.currentTime = targetTime;
      }
    }

    // 3. Transition to Homepage (0.8 to 1.0):
    // Once doors are fully open and cloud mist fills screen, fade out & scale portal
    if (p >= 0.8) {
      const transProgress = (p - 0.8) / 0.2; // 0 to 1
      setPortalOpacity(Math.max(0, 1 - transProgress));
      setPortalScale(1 + transProgress * 0.12);
    } else {
      setPortalOpacity(1);
      setPortalScale(1);
    }

    // 4. Release lock when reached >= 0.985
    if (p >= 0.985 && !isUnlocked) {
      onUnlock();
      return;
    }

    // Continue loop if not settled
    if (!isUnlocked) {
      rafIdRef.current = requestAnimationFrame(updateScrub);
    }
  }, [isUnlocked, onUnlock]);

  // Start / restart RAF loop
  useEffect(() => {
    if (!isUnlocked) {
      rafIdRef.current = requestAnimationFrame(updateScrub);
      return () => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      };
    }
  }, [isUnlocked, updateScrub]);

  // Event Listeners: Wheel & Touch delta interception
  useEffect(() => {
    if (isUnlocked) return;

    // Prevent body scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 1. Mouse Wheel Delta
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const sensitivity = 0.0009; // Tuned for silky feel on both mice & trackpads
      const next = targetProgressRef.current + e.deltaY * sensitivity;
      targetProgressRef.current = Math.min(Math.max(next, 0), 1.0);
    };

    // 2. Touch Gestures for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const diff = touchStartY - currentY;
      touchStartY = currentY;

      const touchSensitivity = 0.0028;
      const next = targetProgressRef.current + diff * touchSensitivity;
      targetProgressRef.current = Math.min(Math.max(next, 0), 1.0);
    };

    // 3. Keyboard Arrow Keys
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        targetProgressRef.current = Math.min(targetProgressRef.current + 0.06, 1.0);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        targetProgressRef.current = Math.max(targetProgressRef.current - 0.06, 0);
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

  // Auto-scrub trigger on click
  const handleAutoEnter = () => {
    playSound('click');
    targetProgressRef.current = 1.0;
  };

  // If already fully unlocked, unmount portal to restore 100% performance
  if (isUnlocked) {
    return null;
  }

  return (
    <div
      style={{
        opacity: portalOpacity,
        transform: `scale(${portalScale})`,
      }}
      className="fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-black select-none pointer-events-auto transition-transform duration-75"
    >
      {/* 2. HTML5 Scrub-to-Scroll Video Element */}
      {!videoError ? (
        <video
          ref={videoRef}
          src="/video_1.mp4"
          playsInline
          muted
          preload="auto"
          autoPlay={false}
          controls={false}
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover pointer-events-none"
          style={{ opacity: isVideoLoaded ? 1 : 0.3 }}
        />
      ) : (
        /* Fallback background if video fails */
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('/posters/gate-portal-sky.jpg')` }}
        />
      )}

      {/* Loading state indicator */}
      {!isVideoLoaded && !videoError && (
        <div className="absolute inset-0 bg-[#160628] flex flex-col items-center justify-center text-purple-200 gap-3 z-0">
          <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
          <span className="text-xs font-mono uppercase tracking-[0.25em]">
            Connecting to Portal...
          </span>
        </div>
      )}

      {/* Ambient ethereal tints & vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 via-transparent to-purple-950/60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-purple-950/20 to-purple-950/70 pointer-events-none" />

      {/* 1. Minimalist Initial View (Scroll Progress 0.0 to 0.20): Centered Ethereal Typography */}
      <div
        style={{
          opacity: textOpacity,
          pointerEvents: textOpacity > 0.05 ? 'auto' : 'none',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-20 transition-opacity duration-150"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/60 backdrop-blur-md border border-purple-300/30 text-purple-200 text-xs font-mono tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AWS Student Community Day • Pune</span>
          </div>

          {/* Centered Ethereal Typography */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] leading-tight">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-300 drop-shadow-[0_0_40px_rgba(216,180,254,0.5)]">
              Cloud City
            </span>
          </h1>

          <p className="text-sm sm:text-base font-light text-purple-200/80 tracking-widest uppercase">
            Sunday, 07 February 2027 • Dakkhan Banquet Hall
          </p>
        </div>
      </div>

      {/* 1. Subtle Animated Scroll Prompt at the Bottom ("Scroll down to enter") */}
      <div
        style={{
          opacity: textOpacity,
          pointerEvents: textOpacity > 0.05 ? 'auto' : 'none',
        }}
        className="absolute bottom-10 left-0 right-0 flex flex-col items-center justify-center z-20 transition-opacity duration-150"
      >
        <button
          onClick={handleAutoEnter}
          className="group flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0 outline-none p-2"
        >
          <span className="text-xs sm:text-sm font-mono font-medium tracking-[0.25em] uppercase text-purple-200 group-hover:text-amber-300 transition-colors">
            Scroll down to enter
          </span>

          <div className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-400/40 flex items-center justify-center text-amber-300 shadow-lg group-hover:bg-amber-400 group-hover:text-purple-950 transition-all animate-bounce">
            <ChevronDown className="w-4 h-4" />
          </div>
        </button>

        <span className="text-[10px] font-mono text-purple-300/50 mt-1">
          (or click to enter directly)
        </span>
      </div>

      {/* Top Right Quick Skip Button */}
      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={handleAutoEnter}
          className="px-3.5 py-1.5 rounded-full bg-purple-950/60 hover:bg-purple-900/80 border border-purple-400/30 text-purple-200 hover:text-amber-300 text-xs font-mono tracking-wider cursor-pointer backdrop-blur-sm transition-all"
        >
          Skip Intro ➔
        </button>
      </div>

      {/* Subtle Progress Bar along Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-950/40 z-30 pointer-events-none">
        <div
          style={{ width: `${displayProgress * 100}%` }}
          className="h-full bg-gradient-to-r from-purple-400 via-amber-400 to-purple-300 transition-all duration-75"
        />
      </div>
    </div>
  );
};

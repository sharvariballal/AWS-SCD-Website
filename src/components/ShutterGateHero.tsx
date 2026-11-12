import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronDown, Sparkles, Loader2, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { playSound } from '../utils/audio';

interface ShutterGateHeroProps {
  isUnlocked: boolean;
  onUnlock: () => void;
  onReplay?: () => void;
}

const TOTAL_FRAMES = 141;

export const ShutterGateHero: React.FC<ShutterGateHeroProps> = ({
  isUnlocked,
  onUnlock,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFramesRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Virtual progress tracking (0.0 to 1.0)
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const currentFrameIdxRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // React state for reactive UI elements
  const [displayProgress, setDisplayProgress] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [portalOpacity, setPortalOpacity] = useState(1);
  const [portalScale, setPortalScale] = useState(1);

  // Helper to draw an image onto the canvas with high-quality cover scaling
  const renderFrameToCanvas = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Pick target image, or fallback to closest loaded image
    let img: HTMLImageElement | undefined = imagesRef.current[frameIdx];
    if (!img || !img.complete || !loadedFramesRef.current[frameIdx]) {
      // Find nearest loaded frame
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const left = frameIdx - offset;
        const right = frameIdx + offset;
        if (left >= 0 && loadedFramesRef.current[left] && imagesRef.current[left]?.complete) {
          img = imagesRef.current[left];
          break;
        }
        if (right < TOTAL_FRAMES && loadedFramesRef.current[right] && imagesRef.current[right]?.complete) {
          img = imagesRef.current[right];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawW = cw;
    let drawH = ch;
    let drawX = 0;
    let drawY = 0;

    if (canvasRatio > imgRatio) {
      drawH = cw / imgRatio;
      drawY = (ch - drawH) / 2;
    } else {
      drawW = ch * imgRatio;
      drawX = (cw - drawW) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Resize canvas to window inner dimensions with high-DPI scaling
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    renderFrameToCanvas(currentFrameIdxRef.current);
  }, [renderFrameToCanvas]);

  // Preload frames sequentially / in parallel
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const checkLoaded = (idx: number) => {
      if (isCancelled) return;
      loadedFramesRef.current[idx] = true;
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));

      if (idx === 0) {
        setIsFirstFrameLoaded(true);
        handleResize();
      }
    };

    // 1. Prioritize loading frame 0 immediately
    const f0 = new Image();
    f0.src = '/assets/gate-frames/frame_000.webp';
    f0.onload = () => checkLoaded(0);
    images[0] = f0;

    // 2. Load remaining frames in batches
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/assets/gate-frames/frame_${i.toString().padStart(3, '0')}.webp`;
      img.onload = () => checkLoaded(i);
      images[i] = img;
    }

    imagesRef.current = images;

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      isCancelled = true;
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const updateScrubRef = useRef<() => void>(() => {});

  // Main animation / scrub loop
  const updateScrub = useCallback(() => {
    // Silky lerp interpolation for 60fps responsiveness
    const diff = targetProgressRef.current - currentProgressRef.current;
    currentProgressRef.current += diff * 0.14;

    const p = Math.min(Math.max(currentProgressRef.current, 0), 1);
    setDisplayProgress(p);

    // 1. Text Opacity: Fade out "Welcome to Cloud City" during initial scroll (0.0 to 0.18)
    if (p <= 0.18) {
      setTextOpacity(Math.max(0, 1 - p / 0.18));
    } else {
      setTextOpacity(0);
    }

    // 2. Gate Frame Sequencing:
    // From 0.0 to 0.86, smoothly cycle through all 141 frames so the doors open 100% all the way
    let targetFrame = 0;
    if (p <= 0.86) {
      targetFrame = Math.min(Math.floor((p / 0.86) * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
    } else {
      // Gates are fully parted off-screen, hold on final frame
      targetFrame = TOTAL_FRAMES - 1;
    }

    if (targetFrame !== currentFrameIdxRef.current) {
      currentFrameIdxRef.current = targetFrame;
      renderFrameToCanvas(targetFrame);
    }

    // 3. Seamless Dissolve to Homepage (0.86 to 1.0):
    // Smooth camera scale and dissolve as user flies through the open portal
    if (p >= 0.86) {
      const transProgress = (p - 0.86) / 0.14; // 0 to 1
      setPortalOpacity(Math.max(0, 1 - transProgress));
      setPortalScale(1 + transProgress * 0.15);
    } else {
      setPortalOpacity(1);
      setPortalScale(1);
    }

    // 4. Complete entrance when fully through
    if (p >= 0.985 && !isUnlocked) {
      onUnlock();
      return;
    }

    // Continue loop if not settled
    if (!isUnlocked) {
      rafIdRef.current = requestAnimationFrame(() => updateScrubRef.current());
    }
  }, [isUnlocked, onUnlock, renderFrameToCanvas]);

  useEffect(() => {
    updateScrubRef.current = updateScrub;
  });

  // Start / restart RAF loop
  useEffect(() => {
    if (!isUnlocked) {
      targetProgressRef.current = 0;
      currentProgressRef.current = 0;
      currentFrameIdxRef.current = 0;
      window.scrollTo({ top: 0, behavior: 'instant' });
      rafIdRef.current = requestAnimationFrame(updateScrub);
      return () => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      };
    }
  }, [isUnlocked, updateScrub]);

  // Event Listeners: Wheel, Touch & Key delta interception
  useEffect(() => {
    if (isUnlocked) return;

    // Prevent body scrolling while gate is closed
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 1. Mouse Wheel Delta
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const sensitivity = 0.0012; // Natural, responsive feel
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

      const touchSensitivity = 0.0035;
      const next = targetProgressRef.current + diff * touchSensitivity;
      targetProgressRef.current = Math.min(Math.max(next, 0), 1.0);
    };

    // 3. Keyboard Arrow Keys
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        targetProgressRef.current = Math.min(targetProgressRef.current + 0.12, 1.0);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        targetProgressRef.current = Math.max(targetProgressRef.current - 0.12, 0);
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

  // Auto-enter trigger on click / button press
  const handleAutoEnter = () => {
    playSound('click');
    targetProgressRef.current = 1.0;
  };

  // Instant skip
  const handleDirectSkip = () => {
    playSound('click');
    onUnlock();
  };

  if (isUnlocked) {
    return null;
  }

  return (
    <div
      style={{
        opacity: portalOpacity,
        transform: `scale(${portalScale})`,
      }}
      className="fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-[#0A0314] select-none pointer-events-auto transition-transform duration-75"
    >
      {/* 1. Canvas Frame Scrub Player (True 60fps Hardware-Accelerated) */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover pointer-events-none"
      />

      {/* Loading state indicator before first frame renders */}
      {!isFirstFrameLoaded && (
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

      {/* Directional Door Chevrons (matching user screenshot) */}
      <div 
        style={{ opacity: textOpacity }}
        className="absolute inset-y-0 left-4 sm:left-10 flex items-center pointer-events-none z-20 text-white/40 sm:text-white/60"
      >
        <ChevronLeft className="w-10 h-10 sm:w-16 sm:h-16 stroke-[1.5] animate-pulse" />
      </div>

      <div 
        style={{ opacity: textOpacity }}
        className="absolute inset-y-0 right-4 sm:right-10 flex items-center pointer-events-none z-20 text-white/40 sm:text-white/60"
      >
        <ChevronRight className="w-10 h-10 sm:w-16 sm:h-16 stroke-[1.5] animate-pulse" />
      </div>

      {/* 2. Centered Ethereal Portal Typography (matching user screenshot) */}
      <div
        style={{
          opacity: textOpacity,
          pointerEvents: textOpacity > 0.05 ? 'auto' : 'none',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-20 transition-opacity duration-150"
      >
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          
          {/* Summit Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-purple-950/80 backdrop-blur-md border border-purple-300/30 text-purple-200 text-[10px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>AWS Student Community Day • Pune</span>
          </div>

          {/* Large Bold Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] leading-tight">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-300 drop-shadow-[0_0_40px_rgba(216,180,254,0.6)]">
              Cloud City
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base font-semibold text-purple-200/90 tracking-[0.15em] sm:tracking-widest uppercase drop-shadow-md">
            Sunday, 07 February 2027 • Dakkhan Banquet Hall
          </p>

        </div>
      </div>

      {/* 3. Animated Scroll Prompt at Bottom */}
      <div
        style={{
          opacity: textOpacity,
          pointerEvents: textOpacity > 0.05 ? 'auto' : 'none',
        }}
        className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex flex-col items-center justify-center z-20 transition-opacity duration-150"
      >
        <button
          onClick={handleAutoEnter}
          className="group flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0 outline-none p-2"
        >
          <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-purple-200 group-hover:text-amber-300 transition-colors drop-shadow">
            Scroll down to enter
          </span>

          <div className="w-8 h-8 rounded-full bg-purple-900/70 border border-purple-400/40 flex items-center justify-center text-amber-300 shadow-lg group-hover:bg-amber-400 group-hover:text-purple-950 transition-all animate-bounce">
            <ChevronDown className="w-4 h-4" />
          </div>
        </button>

        <span className="text-[10px] font-mono text-purple-300/60 mt-0.5">
          (or click to enter directly)
        </span>
      </div>

      {/* 4. Top Right Quick Skip Button */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30">
        <button
          onClick={handleDirectSkip}
          className="px-3.5 sm:px-4 py-1.5 rounded-full bg-purple-950/70 hover:bg-purple-900/90 border border-purple-400/30 text-purple-200 hover:text-amber-300 text-xs font-mono tracking-wider cursor-pointer backdrop-blur-md transition-all shadow-md inline-flex items-center gap-1.5"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5. Subtle Progress Bar along Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-950/40 z-30 pointer-events-none">
        <div
          style={{ width: `${displayProgress * 100}%` }}
          className="h-full bg-gradient-to-r from-purple-400 via-amber-400 to-purple-300 transition-all duration-75"
        />
      </div>

      {/* Background Frame Preload Tracker (subtle, non-intrusive) */}
      {loadProgress < 100 && (
        <div className="absolute bottom-1.5 right-4 z-30 pointer-events-none text-[9px] font-mono text-purple-400/40 tracking-wider">
          STREAMING PORTAL: {loadProgress}%
        </div>
      )}

    </div>
  );
};

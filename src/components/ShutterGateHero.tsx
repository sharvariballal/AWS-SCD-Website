import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { 
  Sparkles, 
  ArrowDown, 
  Calendar, 
  MapPin, 
  Ticket, 
  ArrowRight, 
  Compass, 
  Loader2
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface ShutterGateHeroProps {
  onRegisterClick: (passType?: string) => void;
}

export const ShutterGateHero: React.FC<ShutterGateHeroProps> = ({ onRegisterClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const targetTimeRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // 1. Sticky Scroll Container: 300vh runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Check video readiness even if loaded from disk cache
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      video.pause();
      setIsVideoLoaded(true);
    };

    if (video.readyState >= 1) {
      onLoaded();
    } else {
      video.addEventListener('loadedmetadata', onLoaded);
      return () => video.removeEventListener('loadedmetadata', onLoaded);
    }
  }, []);

  // 2. Scroll-Driven Video Scrubbing Mechanics (Framer Motion + useRef)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;

    // Map scroll progress (0 to 1) directly to HTML5 video element's currentTime property (0 to duration)
    const clampedProgress = Math.min(Math.max(latest, 0), 1);
    targetTimeRef.current = clampedProgress * video.duration;

    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(() => {
        if (videoRef.current && !isNaN(targetTimeRef.current)) {
          // Setting currentTime scrubs through the video frames frame-by-frame
          videoRef.current.currentTime = targetTimeRef.current;
        }
        rafIdRef.current = null;
      });
    }
  });

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoLoaded(true);
    }
  };

  const handleVideoError = () => {
    console.warn('Scrub video failed to load, falling back to static poster.');
    setVideoError(true);
  };

  // 3. Overlay Elements & Typography
  // Initial State (Scroll 0% to 30%): Centered elegant title + bouncing scroll prompt ("Scroll down ⇡")
  const initialTitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const initialTitleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.92]);
  const initialPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.28 ? 'none' : 'auto'));

  // Final State (Scroll 80% to 100%): Main website hero content / navigation fades in seamlessly
  const finalHeroOpacity = useTransform(scrollYProgress, [0.8, 1.0], [0, 1]);
  const finalHeroScale = useTransform(scrollYProgress, [0.8, 1.0], [0.92, 1]);
  const finalHeroY = useTransform(scrollYProgress, [0.8, 1.0], [30, 0]);
  const finalPointerEvents = useTransform(scrollYProgress, (v) => (v < 0.78 ? 'none' : 'auto'));

  // Countdown timer to event
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = new Date('2027-02-07T09:00:00+05:30').getTime();
    const tick = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Quick skip button: scrolls directly to the end of the 300vh runway into the homepage
  const handleSkipToHome = () => {
    playSound('click');
    if (containerRef.current) {
      const targetY = containerRef.current.offsetTop + containerRef.current.offsetHeight - window.innerHeight + 10;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero-gate-journey"
      className="relative w-full h-[300vh] bg-[#18082A]"
    >
      {/* 1. Fullscreen Viewport Sticky Locked Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none bg-black flex items-center justify-center">
        
        {/* 4. HTML5 Scrub-to-Scroll Video Element with playsInline, muted, and preload="auto" */}
        {!videoError ? (
          <video
            ref={videoRef}
            src="/video_1.mp4"
            playsInline
            muted
            preload="auto"
            autoPlay={false}
            controls={false}
            onLoadedMetadata={handleLoadedMetadata}
            onError={handleVideoError}
            className="w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: isVideoLoaded ? 1 : 0.4 }}
          />
        ) : (
          /* Fallback image if video fails */
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('/posters/gate-portal-sky.jpg')` }}
          />
        )}

        {/* Fallback state while video is buffering / loading */}
        {!isVideoLoaded && !videoError && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#210D3A] via-[#2F1057] to-[#1A0730] flex flex-col items-center justify-center text-purple-200 gap-3 z-0">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
            <span className="text-xs font-mono tracking-widest uppercase">Initializing Portal Feed...</span>
          </div>
        )}

        {/* Ambient Pastel Purple & Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C0733]/70 via-transparent to-[#1C0733]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-purple-950/20 to-purple-950/60 pointer-events-none" />

        {/* 3. Initial State (Scroll 0% to 30%): Over closed gates, centered title + bouncing scroll prompt ("Scroll down ⇡") */}
        <motion.div
          style={{
            opacity: initialTitleOpacity,
            scale: initialTitleScale,
            pointerEvents: initialPointerEvents as any,
          }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center pointer-events-auto"
        >
          {/* Subtle soft backdrop for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-purple-950/25 to-purple-950/60 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/80 backdrop-blur-md border border-purple-300/40 text-purple-200 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase shadow-xl">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AWS Student Community Day 2027</span>
            </div>

            {/* Initial Hero Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              Ready for your grand adventure through{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-amber-200 to-purple-300">
                Cloud City?
              </span>
            </h1>

            <p className="text-purple-200/90 text-sm sm:text-lg max-w-xl mx-auto font-medium drop-shadow-md">
              A high-altitude tech festival where collegiate builders unlock cloud architecture, hands-on masterclasses, and community glory.
            </p>

            {/* Bouncing Prompt Indicator: "Scroll down ⇡" */}
            <div className="pt-4 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 text-purple-950 font-black text-xs sm:text-sm font-mono tracking-wider shadow-[0_0_25px_rgba(251,191,36,0.6)] border border-amber-300 animate-bounce">
                <span>Scroll down ⇡</span>
                <ArrowDown className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-xs font-mono text-purple-300/70">
                (Gates open frame-by-frame with your scroll)
              </span>
            </div>

            {/* Skip Option */}
            <div>
              <button
                onClick={handleSkipToHome}
                className="text-xs font-mono text-purple-300/80 hover:text-amber-300 underline underline-offset-4 cursor-pointer transition-colors"
              >
                Skip Gate Entrance ⇣
              </button>
            </div>

          </div>
        </motion.div>

        {/* 3. Final State (Scroll 80% to 100%): Once doors are fully open and cloud mist fills the screen */}
        <motion.div
          style={{
            opacity: finalHeroOpacity,
            scale: finalHeroScale,
            y: finalHeroY,
            pointerEvents: finalPointerEvents as any,
          }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 sm:px-6 text-center text-white pointer-events-auto"
        >
          {/* Subtle mist overlay behind the revealed billboard */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C0733]/90 via-purple-950/50 to-[#18082A]/80 pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto space-y-6">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/80 backdrop-blur-md border border-purple-300/40 text-purple-200 text-xs sm:text-sm font-mono font-bold tracking-wide shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>AWS STUDENT BUILDER GROUP PICT PRESENTS</span>
            </div>

            {/* Grand Main Website Headline */}
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] leading-[1.08]">
              AWS STUDENT <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-amber-200 to-purple-300">
                COMMUNITY DAY
              </span>{' '}
              <span className="text-amber-400">PUNE</span>
            </h2>

            {/* Date & Location Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base font-mono font-bold text-purple-100">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-purple-950/70 border border-purple-400/30 backdrop-blur-sm">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 font-black">07 FEB</span>
                <span className="text-purple-300 text-xs">SAVE THE DATE</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-purple-950/70 border border-purple-400/30 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-purple-300" />
                <span>DAKKHAN BANQUET HALL, PUNE</span>
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="max-w-md mx-auto p-3 rounded-2xl bg-purple-950/70 backdrop-blur-md border border-purple-400/30 shadow-2xl">
              <div className="text-[11px] font-mono text-purple-300 uppercase tracking-widest text-center mb-1.5 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Gate Opened • Entering Cloud City
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { label: 'DAYS', val: timeLeft.days },
                  { label: 'HOURS', val: timeLeft.hours },
                  { label: 'MINS', val: timeLeft.minutes },
                  { label: 'SECS', val: timeLeft.seconds },
                ].map((item, idx) => (
                  <div key={idx} className="bg-purple-900/60 rounded-xl py-1.5 border border-purple-500/20">
                    <span className="block text-xl sm:text-2xl font-black font-mono text-amber-300">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-mono text-purple-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
              <button
                onClick={() => {
                  playSound('click');
                  onRegisterClick('Early Bird Pass (₹299)');
                }}
                className="px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-purple-950 font-black text-sm sm:text-base flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all hover:scale-105"
              >
                <Ticket className="w-5 h-5 text-purple-950" />
                <span>Book Early Bird Pass — ₹299</span>
                <ArrowRight className="w-4 h-4 text-purple-950" />
              </button>

              <a
                href="#city-interactive-map"
                onClick={() => playSound('click')}
                className="px-5 sm:px-6 py-3.5 rounded-2xl bg-purple-950/80 hover:bg-purple-900/90 text-purple-100 border border-purple-400/40 font-bold text-sm sm:text-base flex items-center gap-2 cursor-pointer backdrop-blur-md transition-all hover:scale-105"
              >
                <Compass className="w-4 h-4 text-purple-300" />
                <span>Explore City Map</span>
              </a>
            </div>

            {/* Transition prompt into the rest of the homepage */}
            <div className="pt-3">
              <span className="text-xs font-mono text-purple-300/80 animate-pulse">
                ⇣ Continue scrolling down to explore the full festival homepage ⇣
              </span>
            </div>

          </div>
        </motion.div>

        {/* Scroll Progress Bar at the bottom of the sticky viewport */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-950/50 z-40">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
            className="h-full bg-gradient-to-r from-purple-400 via-amber-400 to-purple-300"
          />
        </div>

      </div>
    </div>
  );
};

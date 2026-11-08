import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  ArrowDown, 
  Calendar, 
  MapPin, 
  Ticket, 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  Flame
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface ShutterGateHeroProps {
  onRegisterClick: (passType?: string) => void;
}

export const ShutterGateHero: React.FC<ShutterGateHeroProps> = ({ onRegisterClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Bind scroll progress directly to this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Phase 1: 0% to 50% scroll: Gate panels slide left and right
  const gateLeftX = useTransform(scrollYProgress, [0, 0.5], ['0%', '-105%']);
  const gateRightX = useTransform(scrollYProgress, [0, 0.5], ['0%', '105%']);
  
  // Initial prompt & title fade out quickly as scroll begins
  const promptOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const promptScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.92]);
  const promptPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.1 ? 'none' : 'auto'));

  // Golden crevice beam transforms: bursts bright then dissipates as gates part
  const creviceGlowOpacity = useTransform(scrollYProgress, [0, 0.08, 0.35, 0.5], [0.95, 1, 0.4, 0]);
  const creviceScaleX = useTransform(scrollYProgress, [0, 0.12, 0.4], [1, 6, 0.2]);

  // Phase 2: 30% to 80% scroll: dense cloud mist layer scale up (1 to 1.5) and fade out (1 to 0)
  const cloudScale = useTransform(scrollYProgress, [0.3, 0.8], [1, 1.5]);
  const cloudOpacity = useTransform(scrollYProgress, [0.3, 0.7, 0.82], [1, 0.6, 0]);
  const cloudPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.75 ? 'none' : 'auto'));

  // Revealed city hero backdrop & main banner
  const heroRevealOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const heroRevealScale = useTransform(scrollYProgress, [0.15, 0.55], [0.88, 1]);
  const heroRevealY = useTransform(scrollYProgress, [0.15, 0.55], [40, 0]);

  // Live countdown to summit
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

  const handleSkip = () => {
    playSound('click');
    if (containerRef.current) {
      const targetY = containerRef.current.offsetTop + containerRef.current.offsetHeight - window.innerHeight;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero-gate-journey"
      className="relative w-full h-[280vh] bg-gradient-to-b from-[#1E0B36] via-[#2A114B] to-[#F5EFFE]"
    >
      {/* 1. Fullscreen Viewport Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none">
        
        {/* Background Revealed View: Cloud City Panorama */}
        <motion.div 
          style={{ opacity: heroRevealOpacity, scale: heroRevealScale, y: heroRevealY }}
          className="absolute inset-0 w-full h-full z-0 flex items-center justify-center overflow-hidden"
        >
          {/* Panoramic background illustration overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url('/posters/poster-hero.jpg')`,
              filter: 'brightness(0.92) contrast(1.05)',
            }}
          />
          {/* Lavender and soft purple ambient gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A0E4E]/85 via-purple-950/40 to-[#1A0730]/75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,132,252,0.18)_0%,transparent_70%)]" />

          {/* Interactive Revealed Summit Billboard */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white pt-12 sm:pt-6">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/80 backdrop-blur-md border border-purple-300/40 text-purple-200 text-xs sm:text-sm font-mono font-bold tracking-wide mb-4 shadow-lg shadow-purple-950/40">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>AWS STUDENT BUILDER GROUP PICT PRESENTS</span>
            </div>

            {/* Poster Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(42,14,78,0.8)] leading-[1.08] mb-3">
              AWS STUDENT <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-amber-200 to-purple-300">
                COMMUNITY DAY
              </span>{' '}
              <span className="text-amber-400">PUNE</span>
            </h1>

            {/* Date & Location Badges matching poster #1 */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base font-mono font-bold text-purple-100 mb-6">
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

            {/* Countdown Clock (Glassmorphic) */}
            <div className="max-w-md mx-auto mb-7 p-3 rounded-2xl bg-purple-950/60 backdrop-blur-md border border-purple-400/30 shadow-2xl">
              <div className="text-[11px] font-mono text-purple-300 uppercase tracking-widest text-center mb-1.5 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Gate Unlocked • Summit Ticker
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { label: 'DAYS', val: timeLeft.days },
                  { label: 'HOURS', val: timeLeft.hours },
                  { label: 'MINS', val: timeLeft.minutes },
                  { label: 'SECS', val: timeLeft.seconds },
                ].map((item, idx) => (
                  <div key={idx} className="bg-purple-900/50 rounded-xl py-1.5 border border-purple-500/20">
                    <span className="block text-xl sm:text-2xl font-black font-mono text-amber-300">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-mono text-purple-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
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
          </div>
        </motion.div>

        {/* Phase 2: Dense Cloud Mist Layer (Scale: 1 to 1.5, Opacity: 1 to 0) */}
        <motion.div
          style={{
            scale: cloudScale,
            opacity: cloudOpacity,
            pointerEvents: cloudPointerEvents as any,
          }}
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden"
        >
          {/* Fluffy swirling cloud SVG overlays & gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-purple-300/25 to-indigo-950/50 backdrop-blur-[2px]" />
          
          {/* Ambient cloud clusters */}
          <div className="absolute -top-20 -left-20 w-[60vw] h-[60vw] rounded-full bg-purple-200/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-[60vw] h-[60vw] rounded-full bg-indigo-300/25 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] rounded-full bg-purple-100/15 blur-2xl" />
        </motion.div>

        {/* 2. Sci-Fi Gate Elements: Futuristic Archway & Sliding Left/Right Door Panels */}
        <div className="absolute inset-0 z-30 flex pointer-events-none overflow-hidden">
          
          {/* Left Door Panel */}
          <motion.div
            style={{ x: gateLeftX }}
            className="w-1/2 h-full relative pointer-events-auto bg-gradient-to-r from-[#210D3A] via-[#35155D] to-[#49227A] border-r-2 border-purple-400/40 shadow-[10px_0_40px_rgba(0,0,0,0.6)] flex items-center justify-end overflow-hidden"
          >
            {/* Metallic Lavender Bevels & Architectural Panels */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(196,181,253,0.18)_0%,transparent_60%)]" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-purple-300/20 to-transparent border-r-4 border-amber-300/60" />

            {/* Left Archway Gothic Curve Accents */}
            <div className="absolute top-0 right-0 w-[80%] h-48 border-b-2 border-l-2 border-purple-400/30 rounded-bl-[120px] bg-purple-900/20" />
            <div className="absolute bottom-0 right-0 w-[85%] h-56 border-t-2 border-l-2 border-purple-400/30 rounded-tl-[140px] bg-purple-900/20" />

            {/* Mechanical Inset Ribs & Grooves */}
            <div className="absolute right-12 top-1/4 bottom-1/4 w-8 border-r-2 border-l-2 border-purple-400/30 bg-purple-950/40 rounded-lg flex flex-col justify-around py-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-1 mx-1 bg-purple-400/40 rounded-full" />
              ))}
            </div>

            {/* Directional Chevrons */}
            <div className="absolute right-24 top-1/2 -translate-y-1/2 flex items-center text-purple-300/50 font-mono text-2xl font-black">
              &lt;&lt;&lt;
            </div>

            {/* Left Half of Center Runic Glyph Disc */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 rounded-full border-4 border-amber-300/70 bg-purple-950/80 shadow-[0_0_30px_rgba(251,191,36,0.35)] flex items-center justify-center overflow-hidden">
              <div className="w-36 sm:w-48 h-36 sm:h-48 rounded-full border-2 border-dashed border-amber-200/50 animate-spin" style={{ animationDuration: '30s' }} />
              <div className="absolute w-24 sm:w-32 h-24 sm:h-32 rounded-full border border-purple-300/40" />
              <div className="absolute text-[9px] font-mono font-bold text-amber-200 tracking-widest uppercase">
                PORTAL • ALPHA
              </div>
            </div>

            {/* Vertical Caution / Warning Markings */}
            <div className="absolute right-4 bottom-24 tracking-[0.3em] font-mono text-[10px] text-purple-300/60 uppercase [writing-mode:vertical-rl] rotate-180">
              STAND CLEAR • INGRESS ARCHWAY
            </div>

            {/* Left Telemetry Console */}
            <div className="hidden md:flex absolute left-8 bottom-12 p-3 rounded-xl bg-purple-950/80 border border-purple-400/30 text-[10px] font-mono text-purple-300 space-y-1 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                GATE LOCK: SYNCHRONIZED
              </div>
              <div className="text-purple-400">SECTOR: 01 // PICT SKY DOCK</div>
              <div className="text-purple-400">FREQUENCY: 5.4 GHz AWS-MESH</div>
            </div>
          </motion.div>

          {/* Right Door Panel */}
          <motion.div
            style={{ x: gateRightX }}
            className="w-1/2 h-full relative pointer-events-auto bg-gradient-to-l from-[#210D3A] via-[#35155D] to-[#49227A] border-l-2 border-purple-400/40 shadow-[-10px_0_40px_rgba(0,0,0,0.6)] flex items-center justify-start overflow-hidden"
          >
            {/* Metallic Lavender Bevels & Architectural Panels */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,181,253,0.18)_0%,transparent_60%)]" />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-purple-300/20 to-transparent border-l-4 border-amber-300/60" />

            {/* Right Archway Gothic Curve Accents */}
            <div className="absolute top-0 left-0 w-[80%] h-48 border-b-2 border-r-2 border-purple-400/30 rounded-br-[120px] bg-purple-900/20" />
            <div className="absolute bottom-0 left-0 w-[85%] h-56 border-t-2 border-r-2 border-purple-400/30 rounded-tr-[140px] bg-purple-900/20" />

            {/* Mechanical Inset Ribs & Grooves */}
            <div className="absolute left-12 top-1/4 bottom-1/4 w-8 border-r-2 border-l-2 border-purple-400/30 bg-purple-950/40 rounded-lg flex flex-col justify-around py-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-1 mx-1 bg-purple-400/40 rounded-full" />
              ))}
            </div>

            {/* Directional Chevrons */}
            <div className="absolute left-24 top-1/2 -translate-y-1/2 flex items-center text-purple-300/50 font-mono text-2xl font-black">
              &gt;&gt;&gt;
            </div>

            {/* Right Half of Center Runic Glyph Disc */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 rounded-full border-4 border-amber-300/70 bg-purple-950/80 shadow-[0_0_30px_rgba(251,191,36,0.35)] flex items-center justify-center overflow-hidden">
              <div className="w-36 sm:w-48 h-36 sm:h-48 rounded-full border-2 border-dashed border-amber-200/50 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
              <div className="absolute w-24 sm:w-32 h-24 sm:h-32 rounded-full border border-purple-300/40" />
              <div className="absolute text-[9px] font-mono font-bold text-amber-200 tracking-widest uppercase">
                ENIGMA • CORE
              </div>
            </div>

            {/* Vertical Caution / Warning Markings */}
            <div className="absolute left-4 bottom-24 tracking-[0.3em] font-mono text-[10px] text-purple-300/60 uppercase [writing-mode:vertical-rl]">
              STAND CLEAR • INGRESS ARCHWAY
            </div>

            {/* Right Telemetry Console */}
            <div className="hidden md:flex absolute right-8 bottom-12 p-3 rounded-xl bg-purple-950/80 border border-purple-400/30 text-[10px] font-mono text-purple-300 space-y-1 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                DESTINATION: CLOUD CITY
              </div>
              <div className="text-purple-400">ATMOSPHERIC PRESSURE: OPTIMAL</div>
              <div className="text-purple-400">LATENCY: &lt; 1.2ms FAST-TRACK</div>
            </div>
          </motion.div>

          {/* Central Crevice: Radiant Golden Solar Beam */}
          <motion.div
            style={{
              opacity: creviceGlowOpacity,
              scaleX: creviceScaleX,
            }}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 z-40 pointer-events-none flex flex-col items-center justify-center"
          >
            {/* Core bright light seam */}
            <div className="w-1.5 h-full bg-gradient-to-b from-amber-100 via-amber-300 to-amber-100 shadow-[0_0_30px_#FDE047,0_0_60px_#F59E0B]" />
            {/* Ambient diffuse golden aura */}
            <div className="absolute inset-y-0 -left-12 -right-12 bg-amber-400/30 blur-xl" />
          </motion.div>

          {/* Bottom Destination Seal / Gold Emblem (from Poster Image 4 & 5) */}
          <motion.div
            style={{ opacity: creviceGlowOpacity }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
          >
            <div className="px-5 py-2 rounded-full bg-amber-400/90 text-purple-950 font-black text-xs font-mono uppercase tracking-widest border-2 border-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.6)] flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-purple-950 fill-purple-950" />
              <span>DESTINATION: ENIGMA CORE</span>
            </div>
          </motion.div>
        </div>

        {/* 1. Initial Hero Screen State Prompt (Centered Elegant Hero Heading) */}
        <motion.div
          style={{
            opacity: promptOpacity,
            scale: promptScale,
            pointerEvents: promptPointerEvents as any,
          }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center px-4 text-center pointer-events-auto"
        >
          {/* Subtle dark backdrop overlay to guarantee sharp readability over gate */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/70 via-purple-950/40 to-purple-950/80 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            {/* Event Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-300/20 backdrop-blur-md border border-purple-300/30 text-purple-200 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AWS Student Community Day 2027</span>
            </div>

            {/* Centered Elegant Hero Heading */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              Ready for your grand adventure through{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-purple-200 to-amber-300">
                Cloud City?
              </span>
            </h2>

            <p className="text-purple-200/90 text-sm sm:text-lg max-w-xl mx-auto font-medium drop-shadow-md">
              A high-altitude tech festival where collegiate builders unlock cloud architecture, hands-on masterclasses, and community glory.
            </p>

            {/* Bouncing Prompt Indicator: "Scroll down ⇡" */}
            <div className="pt-4 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-400 text-purple-950 font-black text-xs sm:text-sm font-mono tracking-wider shadow-[0_0_20px_rgba(251,191,36,0.5)] border border-amber-300 animate-bounce">
                <span>Scroll down to open gate</span>
                <ArrowDown className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-xs font-mono text-purple-300/70">
                (or click below to enter directly)
              </span>
            </div>

            {/* Quick Skip button */}
            <div>
              <button
                onClick={handleSkip}
                className="text-xs font-mono text-purple-300 hover:text-amber-300 underline underline-offset-4 cursor-pointer transition-colors"
              >
                Skip Gate Animation ⇣
              </button>
            </div>
          </div>
        </motion.div>

        {/* Scroll Progress Bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-950/40 z-50">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
            className="h-full bg-gradient-to-r from-purple-400 via-amber-400 to-purple-300"
          />
        </div>

      </div>
    </div>
  );
};

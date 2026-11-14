import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Layers, 
  Ticket,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface InteractiveHeroStudioProps {
  onRegisterClick: (passType?: string) => void;
}

export const InteractiveHeroStudio: React.FC<InteractiveHeroStudioProps> = ({ onRegisterClick }) => {
  // Live Countdown to 7 Feb 2027
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

  return (
    <section id="hero-studio" className="relative pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-purple-500/20">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Date & Location Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-200 text-xs font-mono mb-6 backdrop-blur-md">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-bold text-white">Sunday, 07 February 2027</span>
          <span className="text-purple-400">•</span>
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>Dakkhan Banquet Hall, Pune</span>
        </div>

        {/* Hero Grid: Clean 7:5 Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Bold Headline & Punchy Action */}
          <div className="lg:col-span-7 space-y-6">
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.06]">
              STEP INTO{' '}
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                CLOUD CITY.
              </span>
              <br />
              BUILD REAL SKILLS.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              Western India’s premier student cloud summit. 1,000+ builders, AWS Community Heroes, and hands-on production labs under one roof.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onRegisterClick('Early Bird Pass (₹299)')}
                className="px-6 py-3.5 rounded-2xl text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 cursor-pointer bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-[0_0_25px_rgba(255,153,0,0.45)] hover:shadow-[0_0_35px_rgba(255,153,0,0.65)] hover:scale-105 active:scale-95 transition-all"
              >
                <Ticket className="w-4 h-4 text-slate-950" />
                <span>Claim Early Bird Pass — ₹299</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <a
                href="#city-interactive-map"
                className="px-6 py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-purple-400/50 backdrop-blur-md transition-all hover:scale-105"
              >
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Explore City Map</span>
              </a>
            </div>

            {/* Inclusions Highlights */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-950/50 border border-purple-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Full Day Summit Access</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-950/50 border border-purple-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Buffet Lunch &amp; High-Tea</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-950/50 border border-purple-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Official Swag Kit &amp; Certificate</span>
              </span>
            </div>

          </div>

          {/* Right Column: Unified Glassmorphic Pass & Countdown Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#0D1B2A]/90 border border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden">
              
              {/* Subtle accent line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-purple-500 to-cyan-400" />

              {/* Pass Tier Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block">
                    ACTIVE TIER • PHASE 1
                  </span>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    Early Bird Pass
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Price Details */}
              <div className="flex items-baseline gap-2.5 mb-5">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">₹299</span>
                <span className="text-sm line-through text-slate-500 font-mono">₹499</span>
                <span className="px-2 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold uppercase border border-amber-400/30">
                  SAVE 40%
                </span>
              </div>

              {/* Summit Countdown Grid */}
              <div className="mb-5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Summit Starts In</span>
                  <span className="text-amber-400">08:30 AM IST</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { val: timeLeft.days, unit: 'DAYS' },
                    { val: timeLeft.hours, unit: 'HOURS' },
                    { val: timeLeft.minutes, unit: 'MINS' },
                    { val: timeLeft.seconds, unit: 'SECS' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <div className="text-xl sm:text-2xl font-black text-white font-mono">
                        {String(item.val).padStart(2, '0')}
                      </div>
                      <div className="text-[9px] font-mono font-bold text-slate-400 mt-0.5">
                        {item.unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Action */}
              <button
                onClick={() => onRegisterClick('Early Bird Pass (₹299)')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,153,0,0.35)] transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Book Early Bird (₹299)</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

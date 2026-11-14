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
    <section id="hero-studio" className="relative pt-24 sm:pt-28 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/5">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Sleek Minimal Meta Strip (Replaces the clunky rounded box) */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-slate-300 mb-6">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
            <Calendar className="w-3.5 h-3.5" />
            <span>Sunday, 07 February 2027</span>
          </div>
          <span className="text-white/20 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>Dakkhan Banquet Hall, Pune</span>
          </div>
          <span className="text-white/20 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 text-purple-300">
            <span className="text-slate-500">//</span>
            <span>Western India Cloud Summit</span>
          </div>
        </div>

        {/* Hero Grid: 7:5 Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5">
            
            <h1 className="font-anton text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[1.0]">
              STEP INTO{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                CLOUD CITY.
              </span>
              <br />
              BUILD{' '}
              <span className="text-cyan-400">REAL</span>{' '}
              SKILLS.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
              Western India's premier student cloud summit. 1,000+ builders, AWS Community Heroes, and hands-on production labs under one roof.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onRegisterClick('Early Bird Pass (₹299)')}
                className="px-6 py-3.5 rounded-2xl text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 cursor-pointer bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.45)] hover:shadow-[0_0_35px_rgba(56,189,248,0.65)] hover:scale-105 active:scale-95 transition-all"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Ticket className="w-4 h-4 text-slate-950" />
                <span>Claim Early Bird Pass — ₹299</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <a
                href="#city-interactive-map"
                className="px-6 py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-cyan-400/50 backdrop-blur-md transition-all hover:scale-105"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Explore City Map</span>
              </a>
            </div>

            {/* Inclusions Highlights */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              {[
                { icon: CheckCircle2, color: 'text-emerald-400', label: 'Full Day Summit Access' },
                { icon: CheckCircle2, color: 'text-cyan-400', label: 'Buffet Lunch & High-Tea' },
                { icon: CheckCircle2, color: 'text-purple-400', label: 'Official Swag Kit & Certificate' },
              ].map(({ icon: Icon, color, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                  <span>{label}</span>
                </span>
              ))}
            </div>

          </div>

          {/* Right Column: Pass & Countdown Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#0D1B2A]/90 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden hover:border-cyan-500/40 transition-all duration-500">
              
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-400" />

              {/* Pass Tier Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                    CURRENT ACTIVE TIER
                  </span>
                  <h3 className="font-anton text-2xl text-white uppercase tracking-tight">
                    Early Bird Pass
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE NOW
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 mb-5">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">₹299</span>
                <span className="text-sm line-through text-slate-500 font-mono">₹499</span>
                <span className="px-2 py-0.5 rounded-lg bg-cyan-400/20 text-cyan-300 text-[10px] font-mono font-bold uppercase border border-cyan-400/30">
                  SAVE 40%
                </span>
              </div>

              {/* Countdown Grid */}
              <div className="mb-5 p-3.5 rounded-2xl bg-black/30 border border-white/5">
                <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span>Summit Starts In</span>
                  <span className="text-cyan-400">08:30 AM IST</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { val: timeLeft.days, unit: 'DAYS' },
                    { val: timeLeft.hours, unit: 'HRS' },
                    { val: timeLeft.minutes, unit: 'MINS' },
                    { val: timeLeft.seconds, unit: 'SECS' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-white/5 border border-white/5">
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

              {/* CTA */}
              <button
                onClick={() => onRegisterClick('Early Bird Pass (₹299)')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-mono font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all hover:scale-[1.02] cursor-pointer"
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

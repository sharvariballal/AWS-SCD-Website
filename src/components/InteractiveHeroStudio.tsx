import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Layers, 
  Flame,
  Ticket
} from 'lucide-react';
import { playSound } from '../utils/audio';

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
    <section id="hero-studio" className="relative pt-8 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F5EFFE] via-[#FAF7FF] to-[#F5EFFE] overflow-hidden border-b-2 border-purple-900/10">
      
      {/* 1. Live Ticket Status Marquee Ticker */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white/90 border border-purple-200 shadow-sm flex items-center gap-3 overflow-hidden">
          <div className="px-2.5 py-1 rounded-xl bg-purple-950 text-amber-300 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider shrink-0 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE TICKETING STATUS
          </div>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-marquee inline-block text-xs sm:text-sm font-black text-purple-950 font-mono">
              🔥 EARLY BIRD PASSES ARE OFFICIALLY LIVE AT ₹299! • LIMITED SLOTS FOR PHASE 1 • REGULAR &amp; GROUP DISCOUNT PASSES COMING IN NEXT PHASES • 07 FEB 2027 @ DAKKHAN BANQUET HALL, PUNE • SINGLE LARGE HALL IMMERSIVE CLOUD CITY EXPERIENCE • 
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Header Pill Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-purple-200">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900 text-amber-300 text-xs font-mono font-bold uppercase shadow-sm">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              CLOUD CITY 2027
            </span>
            <span className="text-xs font-mono font-bold text-purple-800 hidden sm:inline">
              AWS Student Community Day • Pune Institute of Computer Technology
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold text-purple-800">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-purple-600" /> 07 Feb 2027
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-purple-600" /> Dakkhan Banquet Hall, Pune
            </span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Bold Headline & Advert Value Proposition (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#260B49] tracking-tight leading-[1.04]">
              STEP INTO{' '}
              <span className="inline-block bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 px-3 py-0.5 rounded-xl border border-amber-300 shadow-md -rotate-1 mt-1">
                CLOUD CITY.
              </span>{' '}
              BUILD REAL SKILLS.
            </h1>

            <p className="text-base sm:text-lg text-purple-950/80 leading-relaxed max-w-2xl font-medium">
              A living, breathing tech metropolis engineered by the AWS Student Builder Group at PICT. Transform theoretical cloud knowledge into hands-on mastery across interactive urban districts. 1,000+ student builders, AWS Community Heroes, and recruiters under one roof.
            </p>

            {/* Countdown Ticker Box */}
            <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-md rounded-3xl border-2 border-purple-200 shadow-[0_10px_30px_rgba(76,29,149,0.08)] max-w-xl">
              <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold text-purple-800 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  Summit Day Countdown
                </span>
                <span className="text-amber-600 font-bold">07 Feb 2027 • 08:30 AM IST</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { val: timeLeft.days, unit: 'DAYS' },
                  { val: timeLeft.hours, unit: 'HOURS' },
                  { val: timeLeft.minutes, unit: 'MINS' },
                  { val: timeLeft.seconds, unit: 'SECS' },
                ].map((item, idx) => (
                  <div key={idx} className="p-2 sm:p-3 rounded-2xl bg-purple-50/70 border border-purple-200">
                    <div className="text-2xl sm:text-3xl font-black text-[#260B49] font-mono">
                      {String(item.val).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-mono font-bold text-purple-600 mt-0.5">
                      {item.unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => {
                  playSound('click');
                  onRegisterClick('Early Bird Pass (₹299)');
                }}
                className="px-7 py-3.5 rounded-2xl text-base font-black flex items-center gap-2 cursor-pointer bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-purple-950 shadow-lg shadow-amber-400/30 transition-transform hover:scale-105"
              >
                <Ticket className="w-5 h-5 text-purple-950" />
                <span>Book Early Bird Pass — ₹299</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#city-interactive-map"
                onClick={() => playSound('click')}
                className="bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 px-6 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-transform hover:scale-105"
              >
                <Layers className="w-4 h-4 text-purple-600" />
                <span>Explore City Districts Map</span>
              </a>
            </div>

            {/* Event Highlights Snapshot */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-xl bg-purple-100 border border-purple-300 text-purple-900 text-xs font-mono font-bold">
                ✓ Full Access Across All Tickets
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-100 border border-amber-300 text-purple-950 text-xs font-mono font-bold">
                ✓ Full Buffet Lunch &amp; High-Tea Included
              </span>
              <span className="px-3 py-1 rounded-xl bg-purple-100 border border-purple-300 text-purple-900 text-xs font-mono font-bold">
                ✓ Official AWS SBG PICT Certificate
              </span>
            </div>

          </div>

          {/* Right Column: Early Bird Advert Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-500 text-purple-950 border-2 border-amber-300 shadow-[0_16px_40px_rgba(245,158,11,0.25)] relative overflow-hidden">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-purple-950/20">
                <div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider text-purple-950/70 block">
                    CURRENT ACTIVE TIER
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tight">
                    Early Bird Pass
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-950 text-amber-300 font-mono text-xs font-black uppercase shadow-md animate-pulse">
                  ● LIVE NOW
                </span>
              </div>

              {/* Price & Value Details */}
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black font-mono">₹299</span>
                  <span className="text-sm line-through text-purple-950/60 font-mono font-bold">₹499</span>
                  <span className="px-2 py-0.5 rounded-lg bg-purple-950 text-amber-300 text-[10px] font-mono font-black uppercase">
                    SAVE 40%
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  Phase 1 limited inventory. Grants 100% full admission to all keynotes, hands-on lab workstations, buffet lunch, and official swag kit.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      playSound('click');
                      onRegisterClick('Early Bird Pass (₹299)');
                    }}
                    className="w-full py-3.5 rounded-2xl bg-purple-950 hover:bg-purple-900 text-amber-300 font-mono font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    <Ticket className="w-4 h-4 text-amber-300" />
                    <span>Claim Early Bird (₹299)</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

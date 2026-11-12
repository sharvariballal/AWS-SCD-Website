import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Layers, 
  Flame,
  Ticket,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { SBGLogo } from './SBGLogo';
import { CityMascotGuide } from './CityMascotGuide';

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
    <section id="hero-studio" className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 bg-blueprint-grid overflow-hidden border-b-2 border-purple-900/10">
      
      {/* 1. Live Ticket Status Marquee Ticker */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white border border-purple-200 shadow-sm flex items-center gap-3 overflow-hidden">
          <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xl bg-purple-950 text-amber-300 text-[9px] sm:text-xs font-mono font-black uppercase tracking-wider shrink-0 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE TICKETING
          </div>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-marquee inline-block text-xs sm:text-sm font-bold text-purple-950 font-mono">
              Phase 1 Status: Early Bird Passes Live at ₹299 • Universal Full Access Across All Passes • Limited Allocation Available • 
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Header Pill Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-purple-200">
          <div className="flex items-center gap-2.5">
            <SBGLogo variant="emblem" size="sm" />
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-900 text-amber-300 text-[11px] font-mono font-bold uppercase shadow-sm">
                  <Flame className="w-3 h-3 text-amber-300" />
                  CLOUD CITY 2027
                </span>
                <span className="text-xs font-mono font-bold text-purple-900">
                  PICT Pune
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold text-purple-800">
            <span className="flex items-center gap-1.5 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
              <Calendar className="w-3.5 h-3.5 text-purple-600" /> Sunday, 07 February 2027
            </span>
            <span className="hidden md:flex items-center gap-1.5 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
              <MapPin className="w-3.5 h-3.5 text-purple-600" /> Pune
            </span>
          </div>
        </div>

        {/* Hero Main Grid: Perfectly Balanced 7:5 Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Bold Headline & Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-[#260B49] tracking-tight leading-[1.08]">
              STEP INTO{' '}
              <span className="inline-block bg-amber-400 text-purple-950 px-2.5 sm:px-3.5 py-0.5 rounded-xl border-2 border-amber-500 shadow-md -rotate-1 mt-1">
                CLOUD CITY.
              </span>{' '}
              BUILD REAL SKILLS.
            </h1>

            <p className="text-sm sm:text-lg text-purple-950/80 leading-relaxed max-w-2xl font-medium">
              A living, breathing tech metropolis engineered for student builders. Transform theoretical cloud knowledge into hands-on mastery across interactive urban districts. 1,000+ attendees, AWS Community Heroes, and industry mentors under one roof.
            </p>

            {/* Mascot Guide Callout */}
            <div>
              <CityMascotGuide zone="hero" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={() => {
                  onRegisterClick('Early Bird Pass (₹299)');
                }}
                className="w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base font-black flex items-center justify-center gap-2 cursor-pointer bg-amber-400 hover:bg-amber-300 active:scale-95 text-purple-950 shadow-lg shadow-amber-400/30 transition-transform hover:scale-105"
              >
                <Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-purple-950" />
                <span>Book Early Bird Pass — ₹299</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#city-interactive-map"
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer bg-white hover:bg-purple-50 active:scale-95 text-purple-900 border border-purple-200 shadow-sm transition-transform hover:scale-105"
              >
                <Layers className="w-4 h-4 text-purple-600" />
                <span>Explore City Districts Map</span>
              </a>
            </div>

            {/* Event Highlights Snapshot */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-xl bg-purple-100 border border-purple-300 text-purple-900 text-xs font-mono font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-700" />
                <span>Full Access Across All Tickets</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-100 border border-amber-300 text-purple-950 text-xs font-mono font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                <span>Full Buffet Lunch &amp; High-Tea Included</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-purple-100 border border-purple-300 text-purple-950 text-xs font-mono font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-700" />
                <span>Official Summit Credential</span>
              </span>
            </div>

          </div>

          {/* Right Column: Balanced Cards Stack (Early Bird Pass + Summit Countdown) (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Top: Early Bird Advert Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-amber-400 text-purple-950 border-3 border-purple-950 shadow-[0_16px_40px_rgba(245,158,11,0.25)] relative overflow-hidden">
              
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
                <span className="px-3 py-1 rounded-full bg-purple-950 text-amber-300 font-mono text-xs font-black uppercase shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE NOW
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
                  Phase 1 limited inventory. Grants 100% full admission to all keynotes, technical workshops, buffet lunch, and official swag kit.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      onRegisterClick('Early Bird Pass (₹299)');
                    }}
                    className="w-full py-3.5 rounded-2xl bg-purple-950 hover:bg-purple-900 text-amber-300 font-mono font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Claim Early Bird (₹299)</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom: Countdown Ticker Box (Balances the right side!) */}
            <div className="p-5 bg-white rounded-3xl border-2 border-purple-200 shadow-[0_10px_30px_rgba(76,29,149,0.08)]">
              <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold text-purple-800 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  Summit Countdown
                </span>
                <span className="text-amber-600 font-bold">08:30 AM IST</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { val: timeLeft.days, unit: 'DAYS' },
                  { val: timeLeft.hours, unit: 'HOURS' },
                  { val: timeLeft.minutes, unit: 'MINS' },
                  { val: timeLeft.seconds, unit: 'SECS' },
                ].map((item, idx) => (
                  <div key={idx} className="p-2 sm:p-2.5 rounded-2xl bg-purple-50/70 border border-purple-200">
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

          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Layers, 
  Flame,
  Check,
  ShieldCheck,
  Ticket
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
    <section id="hero-studio" className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 bg-blueprint-grid overflow-hidden border-b-2 border-slate-900">
      
      {/* 1. Live Ticket Status Marquee Ticker */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="p-2 sm:p-2.5 rounded-2xl bg-amber-400 border-2 border-slate-900 shadow-[3px_3px_0px_#0F172A] flex items-center gap-3 overflow-hidden">
          <div className="px-2.5 py-1 rounded-xl bg-slate-950 text-amber-400 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider shrink-0 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE TICKETING STATUS
          </div>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-marquee inline-block text-xs sm:text-sm font-black text-slate-950 font-mono">
              🔥 EARLY BIRD PASSES ARE OFFICIALLY LIVE AT ₹299! • LIMITED SLOTS FOR PHASE 1 • REGULAR &amp; GROUP DISCOUNT PASSES COMING IN NEXT PHASES • 07 FEB 2027 @ DAKKHAN BANQUET HALL, PUNE • SINGLE LARGE HALL IMMERSIVE CLOUD CITY EXPERIENCE • 
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Header Pill Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-300">
          <div className="flex items-center gap-2">
            <span className="neo-pill bg-slate-950 text-amber-400">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              CLOUD CITY 2027
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 hidden sm:inline">
              AWS Student Community Day • Pune Institute of Computer Technology
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold text-slate-700">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-600" /> 07 Feb 2027
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-600" /> Dakkhan Banquet Hall, Pune
            </span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Bold Headline & Advert Value Proposition (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.04]">
              STEP INTO{' '}
              <span className="inline-block bg-amber-400 px-3 py-0.5 border-2 border-slate-900 shadow-[4px_4px_0px_#0F172A] -rotate-1 mt-1">
                CLOUD CITY.
              </span>{' '}
              BUILD REAL SKILLS.
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-medium">
              A living, breathing tech metropolis engineered by the AWS Student Builder Group at PICT. Transform theoretical cloud knowledge into hands-on mastery across interactive urban districts. 1,000+ student builders, AWS Community Heroes, and recruiters under one roof.
            </p>

            {/* Countdown Ticker Box */}
            <div className="neo-card p-4 sm:p-5 bg-white max-w-xl">
              <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">
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
                  <div key={idx} className="p-2 sm:p-3 rounded-xl bg-slate-50 border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A]">
                    <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">
                      {String(item.val).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-mono font-bold text-slate-500 mt-0.5">
                      {item.unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => onRegisterClick('Early Bird Pass (₹299)')}
                className="neo-btn neo-btn-primary px-7 py-3.5 rounded-2xl text-base font-black flex items-center gap-2 cursor-pointer shadow-[4px_4px_0px_#0F172A]"
              >
                <Ticket className="w-5 h-5 text-slate-950" />
                <span>Book Early Bird Pass — ₹299</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#cloud-city-map"
                className="neo-btn bg-white hover:bg-slate-100 text-slate-900 px-6 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2 cursor-pointer shadow-[4px_4px_0px_#0F172A]"
              >
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Explore City Districts Map</span>
              </a>
            </div>

            {/* Event Highlights Snapshot */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-lg bg-emerald-100 border border-emerald-500 text-emerald-800 text-xs font-mono font-bold">
                ✓ Same Full Access Across All Tickets
              </span>
              <span className="px-3 py-1 rounded-lg bg-amber-100 border border-amber-500 text-amber-800 text-xs font-mono font-bold">
                ✓ Full Lunch &amp; High-Tea Included
              </span>
              <span className="px-3 py-1 rounded-lg bg-purple-100 border border-purple-500 text-purple-800 text-xs font-mono font-bold">
                ✓ Official AWS SBG PICT Certificate
              </span>
            </div>

          </div>

          {/* Right Column: High-Converting Early Bird Advert Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div className="neo-card p-6 sm:p-7 bg-amber-400 text-slate-950 border-3 border-slate-950 shadow-[8px_8px_0px_#0F172A] relative overflow-hidden">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-slate-950">
                <div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-900 block">
                    CURRENT ACTIVE TIER
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tight">
                    Early Bird Pass
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-950 text-amber-400 font-mono text-xs font-black uppercase border border-slate-950 animate-pulse">
                  ● LIVE NOW
                </span>
              </div>

              {/* Price Banner */}
              <div className="p-4 bg-white rounded-2xl border-2 border-slate-950 shadow-[3px_3px_0px_#0F172A] mb-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                    ADMISSION PRICE
                  </span>
                  <div className="text-4xl font-black text-slate-950 font-mono">
                    ₹299
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 inline-block">
                    ● PHASE 1 PRICING
                  </span>
                  <div className="text-[11px] font-mono font-semibold text-slate-500 mt-1">
                    No hidden charges
                  </div>
                </div>
              </div>

              {/* Universal Access Checklist */}
              <div className="space-y-2.5 mb-6 text-xs sm:text-sm font-bold text-slate-900">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Full Day All-District Access (08:30 AM – 06:00 PM)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Keynote Arena &amp; Expert Architect Panels</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>In-Person Hands-on Technical Cloud Workshop</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Compute Café Hot Buffet Lunch &amp; Specialty Coffee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Official Event Swag Kit &amp; Verifiable Credential</span>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <button
                type="button"
                onClick={() => onRegisterClick('Early Bird Pass (₹299)')}
                className="w-full neo-btn bg-slate-950 hover:bg-slate-900 text-amber-400 py-3.5 rounded-2xl text-sm font-black flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_#FFFFFF]"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Reserve Early Bird Seat (₹299) →</span>
              </button>

              <div className="mt-4 pt-3 border-t-2 border-dashed border-slate-950/40 flex items-center justify-between text-[10px] font-mono font-bold text-slate-800">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-950" /> Instant Ticket Confirmation
                </span>
                <span>DAKKHAN BANQUET HALL, PUNE</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

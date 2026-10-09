import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  ExternalLink 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  onRegisterClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRegisterClick }) => {
  // Real Countdown calculation to 31st January 2027
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2027-01-31T09:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRegister = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF9900', '#FFC72C', '#6C5CE7', '#0D1B2A'],
      });
    } catch {
      // ignore
    }

    if (onRegisterClick) {
      onRegisterClick();
    } else {
      window.open('https://registration-link.com', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] pt-36 pb-20 flex flex-col justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        
        {/* AWS Emblem Top Badge matching Reference Image */}
        <div className="flex flex-col items-center justify-center mb-5">
          <div className="flex items-center gap-2 mb-2">
            <svg className="h-8 w-auto text-white fill-current" viewBox="0 0 100 60">
              <path d="M43.8 28.5c0 3.8-1.1 6.8-3.3 9-2.2 2.2-5.3 3.3-9.2 3.3-4.1 0-7.3-1.1-9.5-3.4-2.2-2.3-3.3-5.3-3.3-9.1 0-3.9 1.1-7 3.3-9.2 2.2-2.3 5.4-3.4 9.5-3.4 3.9 0 7 1.1 9.2 3.3 2.2 2.3 3.3 5.4 3.3 9.5zm-6.6 0c0-2.3-.5-4.1-1.6-5.4-1.1-1.3-2.6-1.9-4.7-1.9-2 0-3.6.6-4.7 1.9-1.1 1.3-1.6 3.1-1.6 5.4 0 2.2.5 4 1.6 5.3 1.1 1.3 2.7 2 4.7 2 2.1 0 3.6-.7 4.7-2 1.1-1.3 1.6-3.1 1.6-5.3zm29.8-12.4l-7.8 24.3h-6.2l-5.6-18.4-5.6 18.4h-6.2l-7.8-24.3h6.6l4.4 15.6 5.5-15.6h6.2l5.5 15.6 4.5-15.6h6.5zm19.4 6.8c-1.4-1.6-3.4-2.4-6-2.4-2.4 0-4.3.7-5.6 2-1.3 1.4-2 3.1-2 5.1 0 1.9.6 3.4 1.9 4.6 1.3 1.1 3.2 2.1 5.7 2.8 2.6.7 4.5 1.4 5.6 2.1 1.1.7 1.7 1.8 1.7 3.2 0 1.6-.7 2.8-2 3.8-1.3 1-3.2 1.4-5.6 1.4-2.2 0-4.2-.5-5.9-1.6-1.7-1-2.8-2.6-3.2-4.6l-5.9 1.3c.7 3.4 2.4 6 5.1 7.8 2.7 1.8 6.1 2.7 10.1 2.7 4.3 0 7.7-1 10.2-2.9 2.5-1.9 3.8-4.6 3.8-8 0-2.2-.7-4-2.1-5.4-1.4-1.4-3.5-2.5-6.3-3.3-2.5-.7-4.2-1.4-5.1-2-.9-.7-1.4-1.5-1.4-2.6 0-1.2.5-2.2 1.6-2.9 1.1-.8 2.6-1.1 4.5-1.1 1.8 0 3.3.4 4.5 1.1 1.2.8 2 2 2.4 3.6l5.7-1.4c-.7-2.7-2.1-4.9-4.2-6.5z" />
              <path d="M12.4 47.2c16.5 7.9 36.9 8.2 55.4.7 2.8-1.1 5.9.9 5.3 3.9-.9 4.3-5 5.9-8.4 7.2-18.7 7.2-41.2 5.3-57.5-6.4-1.8-1.3-.2-3.8 2-3.8 1.1 0 2.2-.8 3.2-1.6z" fill="#FF9900" />
              <path d="M72.2 46.5l3.8 6.9-7.8-.3 4-6.6z" fill="#FF9900" />
            </svg>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-amber-400/80" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-amber-400 uppercase">
              STUDENT BUILDER GROUP PICT PRESENTS
            </span>
            <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-amber-400/80" />
          </div>
        </div>

        {/* Clean, Bold Main Headline matching reference */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] mb-3">
          <span className="block text-slate-100 drop-shadow-sm">
            COMMUNITY DAY
          </span>
          <span className="inline-block bg-gradient-to-r from-[#FF9900] via-[#FFB703] to-[#FFC72C] bg-clip-text text-transparent tracking-tight mt-1">
            CLOUD CITY 2027
          </span>
        </h1>

        <p className="text-sm sm:text-base font-semibold text-slate-300 tracking-wide max-w-2xl mx-auto mb-6">
          Organized by AWS Student Builder Group • Pune Institute of Computer Technology
        </p>

        {/* Date & Venue Pill matching reference */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-xs sm:text-sm font-semibold text-slate-200 mb-10 shadow-lg">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Calendar className="w-4 h-4" />
            <span>Jan 31, 2027</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-4 h-4 text-violet-400" />
            <span>Dakkhan Banquet Hall | Ambegoan | Katraj | Nahre, Pune</span>
          </div>
        </div>

        {/* Countdown Timer matching reference */}
        <div className="max-w-md mx-auto mb-10">
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Minutes', val: timeLeft.minutes },
              { label: 'Seconds', val: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 backdrop-blur-md rounded-2xl py-3.5 px-2 text-white border border-slate-700/80 shadow-[0_8px_20px_rgba(0,0,0,0.5)] relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-300 block">
                  {String(item.val).padStart(2, '0')}
                </span>
                <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Call to Action */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleRegister}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-black text-base text-slate-950 bg-gradient-to-r from-[#FF9900] via-[#FFB703] to-[#FFC72C] shadow-[0_10px_35px_rgba(255,153,0,0.55)] hover:shadow-[0_15px_45px_rgba(255,153,0,0.75)] hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-300/80 cursor-pointer overflow-hidden"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Register Now</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            <ExternalLink className="w-3.5 h-3.5 text-slate-950/70" />
          </button>
        </div>

        {/* Simple Footer Tags matching reference (no speaker count, no clutter) */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            1-Day Flagship Summit
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Pune, Maharashtra
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Hands-on Learning
          </span>
        </div>
      </div>
    </section>
  );
};

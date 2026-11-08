import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  ExternalLink 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CloudCity360 } from './CloudCity360';

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
        colors: ['#8B5CF6', '#3B82F6', '#38BDF8', '#C084FC', '#FFFFFF'],
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
    <section id="home" className="relative min-h-[90vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        
        {/* SBG Emblem Top Badge (AWS arrow logo removed as requested) */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300" />
              <img
                src="/sbg-logo.png"
                alt="Student Builder Group Logo"
                className="relative w-12 h-12 object-contain rounded-xl p-1 bg-[#0F0828] border border-purple-400/50 shadow-lg"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-purple-400/80" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-cyan-300 uppercase">
              STUDENT BUILDER GROUP PICT PRESENTS
            </span>
            <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-purple-400/80" />
          </div>
        </div>

        {/* Clean, Bold Main Headline in Purple & Blue Palette */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] mb-3">
          <span className="block text-slate-100 drop-shadow-sm">
            COMMUNITY DAY
          </span>
          <span className="inline-block bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent tracking-tight mt-1">
            CLOUD CITY 2027
          </span>
        </h1>

        <p className="text-sm sm:text-base font-semibold text-purple-200/90 tracking-wide max-w-2xl mx-auto mb-6">
          Organized by Student Builder Group • Pune Institute of Computer Technology
        </p>

        {/* Date & Venue Pill in Purple & Blue styling */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-5 py-2.5 rounded-full bg-[#120B30]/90 backdrop-blur-md border border-purple-500/40 text-xs sm:text-sm font-semibold text-purple-100 mb-8 shadow-lg">
          <div className="flex items-center gap-1.5 text-cyan-300">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Jan 31, 2027</span>
          </div>
          <span className="text-purple-400/60 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-purple-200">
            <MapPin className="w-4 h-4 text-purple-400" />
            <span>Dakkhan Banquet Hall | Ambegoan | Katraj | Nahre, Pune</span>
          </div>
        </div>

        {/* 360 Interactive Cloud City Viewer (Cursor controlled 360° rotation in Night Sky!) */}
        <div className="my-8 max-w-5xl mx-auto">
          <CloudCity360 height="520px" />
        </div>

        {/* Countdown Timer in Night Purple/Blue Palette */}
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
                className="bg-[#120A30]/85 backdrop-blur-md rounded-2xl py-3.5 px-2 text-white border border-purple-500/40 shadow-[0_8px_25px_rgba(139,92,246,0.25)] relative overflow-hidden group hover:border-purple-400/70 transition-colors"
              >
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400" />
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-200 block">
                  {String(item.val).padStart(2, '0')}
                </span>
                <span className="block text-[10px] uppercase font-bold text-purple-300/80 tracking-wider mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Call to Action in Glowing Purple/Blue */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleRegister}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-black text-base text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-[0_10px_35px_rgba(139,92,246,0.5)] hover:shadow-[0_15px_45px_rgba(139,92,246,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 border border-purple-400/50 cursor-pointer overflow-hidden"
          >
            <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
            <span>Register Now</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            <ExternalLink className="w-3.5 h-3.5 text-purple-200" />
          </button>
        </div>

        {/* Simple Footer Tags */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-purple-300/70">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            1-Day Flagship Summit
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Pune, Maharashtra
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Hands-on Learning
          </span>
        </div>
      </div>
    </section>
  );
};

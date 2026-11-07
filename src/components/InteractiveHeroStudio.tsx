import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  QrCode, 
  Cpu, 
  Check, 
  Layers, 
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

interface InteractiveHeroStudioProps {
  onRegisterClick: () => void;
}

export const InteractiveHeroStudio: React.FC<InteractiveHeroStudioProps> = ({ onRegisterClick }) => {
  // Live Countdown to 7 Feb 2027
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Interactive Badge State
  const [badgeName, setBadgeName] = useState('Alex Rivera');
  const [badgeRole, setBadgeRole] = useState('Serverless Sorcerer');
  const [badgeCollege, setBadgeCollege] = useState('PICT Pune');
  const [badgeTheme, setBadgeTheme] = useState<'orange' | 'purple' | 'emerald'>('orange');

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

  const handlePrintBadge = () => {
    playSound('deploy');
    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF9900', '#10B981', '#6366F1', '#F59E0B'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="hero-studio" className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-blueprint-grid overflow-hidden border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Ticker Notification */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-3 border-b border-slate-300">
          <div className="flex items-center gap-2">
            <span className="neo-pill bg-amber-400 text-slate-950">
              <Flame className="w-3.5 h-3.5" />
              SCD 2027 EDITION
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 hidden sm:inline">
              Pune Institute of Computer Technology • AWS Student Builder Group
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold text-slate-700">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-600" /> 07 Feb 2027
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-600" /> Dakkhan Hall, Pune
            </span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bold Neo-Brutalist Statement & Countdown (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.04]">
              ARCHITECT THE CLOUD.{' '}
              <span className="inline-block bg-amber-400 px-3 py-0.5 border-2 border-slate-900 shadow-[4px_4px_0px_#0F172A] -rotate-1 mt-1">
                BUILD YOUR
              </span>{' '}
              LEGACY.
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-medium">
              Step into Western India&apos;s most energetic student cloud conference. Join 1,000+ passionate collegiate builders, AWS Community Heroes, and engineers for real serverless architectures, autonomous Bedrock AI agents, and a live ₹50K+ hackathon.
            </p>

            {/* Countdown Ticker Box */}
            <div className="neo-card p-5 bg-white max-w-xl">
              <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  Live Event Countdown
                </span>
                <span className="text-amber-600 font-bold">Doors open 08:30 AM IST</span>
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
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  playSound('coin');
                  onRegisterClick();
                }}
                className="neo-btn neo-btn-primary px-7 py-3.5 rounded-2xl text-base font-black flex items-center gap-2 cursor-pointer shadow-[4px_4px_0px_#0F172A]"
              >
                <Sparkles className="w-5 h-5" />
                <span>Book Pass — From ₹199</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#agenda-matrix"
                onClick={() => playSound('click')}
                className="neo-btn bg-white hover:bg-slate-100 text-slate-900 px-6 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2 cursor-pointer shadow-[4px_4px_0px_#0F172A]"
              >
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Explore Agenda Matrix</span>
              </a>
            </div>

            {/* Fun Sticker Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-lg bg-emerald-100 border border-emerald-500 text-emerald-800 text-xs font-mono font-bold">
                ✓ 100% Student Subsidized
              </span>
              <span className="px-3 py-1 rounded-lg bg-purple-100 border border-purple-500 text-purple-800 text-xs font-mono font-bold">
                ✓ Official AWS SBG Cert
              </span>
              <span className="px-3 py-1 rounded-lg bg-amber-100 border border-amber-500 text-amber-800 text-xs font-mono font-bold">
                ✓ Lunch &amp; High-Tea
              </span>
              <span className="px-3 py-1 rounded-lg bg-blue-100 border border-blue-500 text-blue-800 text-xs font-mono font-bold">
                ✓ 1Gbps Fiber Wi-Fi
              </span>
            </div>

          </div>

          {/* Right Column: Interactive 3D Lanyard Student ID Pass Studio (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Lanyard Strap Header */}
            <div className="w-24 h-10 bg-slate-900 border-2 border-slate-900 rounded-t-xl flex items-center justify-center shadow-md relative">
              <div className="w-12 h-2.5 bg-amber-400 rounded-full" />
              <div className="absolute -bottom-2 w-6 h-4 bg-slate-400 rounded-b-md border-2 border-slate-900" />
            </div>

            {/* The Badge Card */}
            <div
              className={`w-full max-w-sm rounded-3xl border-3 border-slate-900 shadow-[8px_8px_0px_#0F172A] p-6 text-slate-900 relative overflow-hidden transition-all duration-300 ${
                badgeTheme === 'orange'
                  ? 'bg-gradient-to-b from-amber-50 via-white to-amber-100/50'
                  : badgeTheme === 'purple'
                  ? 'bg-gradient-to-b from-purple-50 via-white to-purple-100/50'
                  : 'bg-gradient-to-b from-emerald-50 via-white to-emerald-100/50'
              }`}
            >
              {/* Holographic Clip Hole */}
              <div className="w-12 h-3 mx-auto mb-4 bg-slate-200 border-2 border-slate-900 rounded-full" />

              {/* Badge Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-slate-900">
                <div>
                  <div className="text-[10px] font-mono font-black text-amber-600 uppercase tracking-widest">
                    AWS SBG PICT • PUNE
                  </div>
                  <div className="text-xs font-black text-slate-950 uppercase">
                    OFFICIAL ATTENDEE PASS
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-950 text-amber-400 flex items-center justify-center font-black text-xs border border-slate-900">
                  AWS
                </div>
              </div>

              {/* Badge Avatar & Info */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-2xl border-2 border-slate-900 shadow-[3px_3px_0px_#FF9900] shrink-0">
                  {badgeName.slice(0, 2).toUpperCase() || 'SB'}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xl font-black text-slate-950 truncate">
                    {badgeName || 'Your Name'}
                  </div>
                  <div className="text-xs font-bold text-amber-600 font-mono flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>{badgeRole}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium truncate">
                    {badgeCollege || 'PICT Pune'}
                  </div>
                </div>
              </div>

              {/* Barcode & Hologram Band */}
              <div className="p-3 bg-white rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] flex items-center justify-between gap-3 mb-4">
                <div className="space-y-1">
                  <div className="text-[9px] font-mono text-slate-400">CREDENTIAL ID:</div>
                  <div className="text-xs font-mono font-black text-slate-900 tracking-wider">
                    SCD27-PICT-842
                  </div>
                </div>
                <div className="w-10 h-10 bg-slate-50 p-1 rounded-lg border border-slate-300 flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-slate-900" />
                </div>
              </div>

              {/* Badge Footer */}
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 pt-2 border-t border-slate-200">
                <span>07 FEB 2027 • DAKKHAN HALL</span>
                <span className="text-emerald-600 flex items-center gap-1">
                  <Check className="w-3 h-3" /> VERIFIED
                </span>
              </div>
            </div>

            {/* Live Badge Customizer Controls */}
            <div className="w-full max-w-sm mt-4 p-4 rounded-2xl bg-white border-2 border-slate-900 shadow-[4px_4px_0px_#0F172A] space-y-3">
              <div className="text-xs font-mono font-bold text-slate-700 uppercase flex items-center justify-between">
                <span>Customize Your Pass</span>
                <span className="text-amber-600 text-[10px]">Live Preview</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={badgeName}
                  onChange={(e) => setBadgeName(e.target.value)}
                  placeholder="Your Name..."
                  maxLength={24}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border-2 border-slate-900 bg-slate-50 text-slate-900 outline-none"
                />
                <input
                  type="text"
                  value={badgeCollege}
                  onChange={(e) => setBadgeCollege(e.target.value)}
                  placeholder="Your College..."
                  maxLength={24}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border-2 border-slate-900 bg-slate-50 text-slate-900 outline-none"
                />
              </div>

              {/* Theme color toggles */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                  Accent:
                </span>
                {(['orange', 'purple', 'emerald'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setBadgeTheme(t);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border cursor-pointer ${
                      badgeTheme === t
                        ? 'bg-slate-950 text-white border-slate-950'
                        : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  'Serverless Sorcerer',
                  'Bedrock AI Hacker',
                  'DevOps Commander',
                  'Cloud Architect',
                ].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setBadgeRole(role);
                    }}
                    className={`px-2 py-1 text-[11px] font-bold rounded-lg border transition-all text-left truncate cursor-pointer ${
                      badgeRole === role
                        ? 'bg-amber-400 border-slate-900 text-slate-950 font-black'
                        : 'bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handlePrintBadge}
                className="w-full neo-btn bg-slate-900 text-white hover:bg-slate-800 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Stamp &amp; Celebrate Pass</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

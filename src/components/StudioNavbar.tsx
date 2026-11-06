import React, { useState } from 'react';
import { Menu, X, Sparkles, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { setSoundEnabled, playSound } from '../utils/audio';

interface StudioNavbarProps {
  onRegisterClick: () => void;
}

export const StudioNavbar: React.FC<StudioNavbarProps> = ({ onRegisterClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playSound('coin');
  };

  const handleRegister = () => {
    playSound('coin');
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.15 },
        colors: ['#FF9900', '#10B981', '#4F46E5', '#F59E0B'],
      });
    } catch {
      // ignore
    }
    onRegisterClick();
  };

  const navLinks = [
    { label: 'Lab Station', href: '#hero-studio' },
    { label: 'Circuit Jammer', href: '#circuit-jammer' },
    { label: 'Agenda Matrix', href: '#agenda-matrix' },
    { label: 'Speakers', href: '#speakers-studio' },
    { label: 'Loot Box', href: '#loot-box' },
    { label: 'Passes', href: '#ticket-dispenser' },
    { label: 'Student Crew', href: '#student-crew' },
    { label: 'Venue', href: '#venue-blueprint' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F8F9FA]/90 backdrop-blur-md border-b-2 border-slate-900 px-4 sm:px-6 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Region Indicator */}
        <div className="flex items-center gap-3">
          <a
            href="#hero-studio"
            onClick={() => playSound('click')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            {/* Custom AWS SBG Chip Emblem */}
            <div className="w-10 h-10 rounded-xl bg-slate-900 border-2 border-slate-900 text-amber-400 flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_#FF9900] group-hover:scale-105 transition-transform">
              <span className="text-white">AWS</span>
            </div>

            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-slate-900 uppercase tracking-tight">
                  SCD 2027
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 border border-slate-900 uppercase">
                  PICT
                </span>
              </div>
              <span className="text-[11px] font-mono font-semibold text-slate-500">
                Student Builder Group
              </span>
            </div>
          </a>

          {/* Region Status Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-400 text-emerald-800 text-[11px] font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ap-south-1 (Pune)</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-white p-1 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => playSound('click')}
              className="px-3.5 py-1 rounded-full text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Controls & CTA */}
        <div className="flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundOn ? 'Mute builder sound effects' : 'Enable builder sound effects'}
            className={`px-3 py-1.5 rounded-xl border-2 border-slate-900 text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              soundOn
                ? 'bg-amber-400 text-slate-950 shadow-[2px_2px_0px_#0F172A]'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{soundOn ? 'SFX ON' : 'SFX OFF'}</span>
          </button>

          {/* Primary Neo-CTA */}
          <button
            onClick={handleRegister}
            className="neo-btn neo-btn-primary px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer font-black tracking-tight"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get Pass • ₹199</span>
            <ArrowUpRight className="w-3.5 h-3.5 hidden sm:inline" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
            className="xl:hidden p-2 rounded-xl border-2 border-slate-900 bg-white text-slate-900 hover:bg-slate-100 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden mt-3 p-4 bg-white rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_#0F172A] space-y-2 animate-in fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                playSound('click');
                setIsMobileMenuOpen(false);
              }}
              className="block px-3 py-2 rounded-xl font-bold text-sm text-slate-800 hover:bg-amber-50 hover:text-amber-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleRegister();
              }}
              className="w-full neo-btn neo-btn-primary py-2.5 rounded-xl text-sm font-black flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Claim Builder Pass (From ₹199)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

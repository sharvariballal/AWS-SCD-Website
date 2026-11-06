import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SBGLogo } from './SBGLogo';
import { setSoundEnabled, playSound } from '../utils/audio';

interface NavbarProps {
  onRegisterClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegisterClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      playSound('coin');
    }
  };

  const handleRegisterAction = () => {
    playSound('coin');
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.15 },
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

  const handleLogoClick = () => {
    playSound('powerup');
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { x: 0.1, y: 0.1 },
        colors: ['#FF9900', '#FFC72C'],
      });
    } catch {
      // ignore
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Playground', href: '#builder-playground' },
    { name: 'Agenda', href: '#agenda' },
    { name: 'Loot & Swag', href: '#swag' },
    { name: 'Tickets', href: '#tickets' },
    { name: 'Team', href: '#team' },
    { name: 'Venue', href: '#venue' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#0D1B2A]/90 backdrop-blur-xl border-b border-slate-800 shadow-[0_4px_25px_rgba(0,0,0,0.4)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand with AWS SBG PICT */}
          <a
            href="#home"
            onClick={handleLogoClick}
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl p-1"
          >
            <SBGLogo />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => playSound('click')}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA & Controls */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle Pill */}
            <button
              onClick={toggleSound}
              title={soundOn ? 'Mute builder sound effects' : 'Enable builder sound effects'}
              className={`p-2 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                soundOn
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_12px_rgba(255,153,0,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 border-slate-700/80 hover:text-white hover:border-slate-600'
              }`}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline text-[11px] uppercase font-mono tracking-wider">
                {soundOn ? 'SFX ON' : 'SFX OFF'}
              </span>
            </button>

            {/* Primary Glowing CTA */}
            <button
              onClick={handleRegisterAction}
              className="relative group hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#FF9900] via-[#FFB703] to-[#FFC72C] shadow-[0_0_20px_rgba(255,153,0,0.45)] hover:shadow-[0_0_30px_rgba(255,153,0,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-300/60 cursor-pointer overflow-hidden"
            >
              <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
              <span>Register Now</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-950/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="xl:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-800 bg-[#0D1B2A]/98 backdrop-blur-2xl shadow-2xl transition-all duration-300">
          <div className="px-5 pt-3 pb-6 space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  playSound('click');
                  setIsMobileMenuOpen(false);
                }}
                className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-800/60 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleRegisterAction();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-500 to-amber-400 shadow-[0_0_20px_rgba(255,153,0,0.4)] cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Register Now</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <div className="flex justify-center items-center gap-4 pt-2 text-xs text-slate-400 font-medium">
                <span>📍 Pune</span>
                <span>•</span>
                <span>📅 31st Jan 2027</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

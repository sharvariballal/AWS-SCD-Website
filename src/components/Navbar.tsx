import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ExternalLink, MapPin, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SBGLogo } from './SBGLogo';
import { TICKETING_CONFIG } from '../config/ticketing';

interface NavbarProps {
  onRegisterClick?: () => void;
  onReplayGate?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegisterClick, onReplayGate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegisterAction = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.15 },
        colors: ['#00F0FF', '#38BDF8', '#8B5CF6', '#3B82F6'],
      });
    } catch {
      // ignore
    }

    if (onRegisterClick) {
      onRegisterClick();
    } else if (TICKETING_CONFIG.provider === 'konfhub' && TICKETING_CONFIG.konfhubEventUrl) {
      window.open(TICKETING_CONFIG.konfhubEventUrl, '_blank');
    }
  };

  const handleLogoClick = () => {
    if (onReplayGate) {
      onReplayGate();
    }
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { x: 0.1, y: 0.1 },
        colors: ['#00F0FF', '#38BDF8', '#8B5CF6'],
      });
    } catch {
      // ignore
    }
  };

  const navLinks = [
    { name: 'City Map', href: '#city-interactive-map' },
    { name: 'Stage & Agenda', href: '#stage-program' },
    { name: 'Passes', href: '#ticket-dispenser' },
    { name: 'Memories', href: '#community-memories' },
    { name: 'Sponsors', href: '#sponsors-showcase' },
    { name: 'Venue', href: '#venue-blueprint' },
    { name: 'FAQ', href: '#faq-studio' },
  ];

  return (
    <>
      {/* Fixed Mobile Hamburger — icon only, transparent bg, always visible */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
        className="xl:hidden fixed top-3.5 right-4 z-[70] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] hover:text-cyan-400 transition-colors focus:outline-none p-1.5 cursor-pointer"
      >
        {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#070415]/75 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.4)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo & Brand with Clear Identity */}
            <a
              href="#hero-studio"
              onClick={handleLogoClick}
              title="Click to return to city gates"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-2xl p-1"
            >
              <SBGLogo size="md" />
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-anton text-lg sm:text-xl tracking-wide text-white uppercase group-hover:text-cyan-300 transition-colors">
                  CLOUD CITY
                </span>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-cyan-400">
                  AWS SBG PICT
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links — Larger & Clearly Legible */}
            <nav className="hidden xl:flex items-center gap-1.5 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-[14px] font-semibold text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* CTA & Controls (SFX Removed) */}
            <div className="flex items-center gap-3 mr-12 xl:mr-0">
              {/* Primary Glowing CTA — Larger & Prominent */}
              <button
                onClick={handleRegisterAction}
                className="relative group hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_20px_rgba(56,189,248,0.45)] hover:shadow-[0_0_30px_rgba(56,189,248,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 border border-cyan-300/60 cursor-pointer overflow-hidden"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
                <span>Register Now</span>
                <ExternalLink className="w-4 h-4 text-slate-950/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer Menu — Larger Touch Targets */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-b border-white/10 bg-[#070415]/95 backdrop-blur-2xl shadow-2xl transition-all duration-300">
            <div className="px-5 pt-14 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleRegisterAction();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-base text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_20px_rgba(56,189,248,0.4)] cursor-pointer"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Register Now</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                <div className="flex justify-center items-center gap-4 pt-2 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> Pune</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-cyan-400" /> 7th Feb 2027</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

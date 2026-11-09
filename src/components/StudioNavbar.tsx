import React, { useState } from 'react';
import { Menu, X, Sparkles, ArrowUpRight, Compass } from 'lucide-react';

interface StudioNavbarProps {
  onRegisterClick: () => void;
  onReplayGate?: () => void;
}

export const StudioNavbar: React.FC<StudioNavbarProps> = ({ onRegisterClick, onReplayGate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleRegister = () => {
    onRegisterClick();
  };

  const navLinks = [
    { label: 'Overview', href: '#storytelling' },
    { label: 'City Map', href: '#city-interactive-map' },
    { label: 'Flashback', href: '#flashback-gallery' },
    { label: 'Arcade', href: '#circuit-jammer' },
    { label: 'Speakers', href: '#speakers-studio' },
    { label: 'Passes', href: '#ticket-dispenser' },
    { label: 'Venue', href: '#venue-blueprint' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7FF]/95 backdrop-blur-md border-b-2 border-purple-200/90 px-4 sm:px-6 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Region Indicator */}
        <div className="flex items-center gap-3">
          <a
            href="#hero-studio"
            onClick={() => {
              if (onReplayGate) onReplayGate();
            }}
            title="Click to replay gate entrance"
            className="flex items-center gap-2 group cursor-pointer"
          >
            {/* Custom AWS SBG Chip Emblem */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#250C47] to-[#4A1D88] border-2 border-purple-400/50 text-amber-300 flex items-center justify-center font-black text-sm shadow-[0_4px_12px_rgba(76,29,149,0.25)] group-hover:scale-105 transition-transform">
              <span className="text-white">AWS</span>
            </div>

            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-[#260B49] uppercase tracking-tight">
                  SCD 2027
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300">
                  PUNE
                </span>
              </div>
              <span className="text-[11px] font-mono text-purple-700 font-semibold block">
                AWS Student Builder Group PICT
              </span>
            </div>
          </a>

          {/* Region Status Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100 border border-purple-300 text-purple-900 text-[11px] font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ap-south-1 (Pune)</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-full border border-purple-200 shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1 rounded-full text-xs font-bold text-purple-900 hover:text-purple-950 hover:bg-purple-100/70 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Controls & CTA */}
        <div className="flex items-center gap-2.5">
          {/* Replay Gate Button */}
          {onReplayGate && (
            <button
              onClick={() => {
                onReplayGate();
              }}
              title="Replay Gate Opening"
              className="hidden sm:flex px-2.5 py-1.5 rounded-xl border border-purple-300 text-xs font-mono font-bold text-purple-700 bg-white hover:bg-purple-50 items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
            >
              <Compass className="w-3.5 h-3.5 text-purple-600" />
              <span>Portal Intro</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={handleRegister}
            className="px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer font-black tracking-tight bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-purple-950 shadow-md shadow-amber-400/25 border border-amber-300 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get Pass • ₹299</span>
            <ArrowUpRight className="w-3.5 h-3.5 hidden sm:inline" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
            className="xl:hidden p-2 rounded-xl border border-purple-300 bg-white text-purple-900 hover:bg-purple-50 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden mt-3 p-4 bg-white/98 backdrop-blur-xl rounded-2xl border-2 border-purple-200 shadow-xl space-y-2 animate-in fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="block px-3 py-2 rounded-xl font-bold text-sm text-purple-950 hover:bg-purple-50 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-purple-100">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleRegister();
              }}
              className="w-full py-2.5 rounded-xl text-sm font-black flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Claim Early Bird Pass (₹299)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

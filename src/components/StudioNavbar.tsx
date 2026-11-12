import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, DoorClosed } from 'lucide-react';
import { SBGLogo } from './SBGLogo';

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
    { label: 'City Map', href: '#city-interactive-map' },
    { label: 'Stage & Agenda', href: '#stage-program' },
    { label: 'Passes & Swag', href: '#ticket-dispenser' },
    { label: 'Memories', href: '#community-memories' },
    { label: 'Venue', href: '#venue-blueprint' },
    { label: 'FAQ', href: '#faq-studio' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7FF]/95 backdrop-blur-md border-b-2 border-purple-200/90 px-4 sm:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand: Official SBG Club Emblem on Black + AWS SCD Identity */}
        <div className="flex items-center gap-3">
          <a
            href="#hero-studio"
            onClick={() => {
              if (onReplayGate) onReplayGate();
            }}
            title="Click to return to city gates"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            {/* Official Black Emblem Badge */}
            <SBGLogo variant="emblem" size="md" />

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
                PICT Pune Chapter
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
        <nav className="hidden lg:flex items-center gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-full border border-purple-200 shadow-sm">
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
          {/* Go Back to Closed Gates Button */}
          {onReplayGate && (
            <button
              onClick={() => {
                onReplayGate();
              }}
              title="Return to Closed City Gates"
              className="hidden sm:flex px-3 py-1.5 rounded-xl border border-purple-300 text-xs font-mono font-bold text-purple-700 bg-white hover:bg-purple-50 items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
            >
              <DoorClosed className="w-3.5 h-3.5 text-purple-600" />
              <span>City Gates</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={handleRegister}
            className="px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 cursor-pointer font-black tracking-tight bg-amber-400 hover:bg-amber-300 text-purple-950 shadow-md shadow-amber-400/25 border border-amber-300 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Claim Pass</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-950" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-purple-300 bg-white text-purple-900 hover:bg-purple-50 cursor-pointer"
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-purple-200/80 bg-white rounded-2xl p-4 shadow-lg flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-bold text-purple-950 hover:bg-purple-50"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-purple-100 flex items-center justify-between">
            {onReplayGate && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onReplayGate();
                }}
                className="text-xs font-mono font-bold text-purple-700 flex items-center gap-1.5"
              >
                <DoorClosed className="w-3.5 h-3.5" />
                <span>Return to City Gates</span>
              </button>
            )}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleRegister();
              }}
              className="px-4 py-2 rounded-xl text-xs font-black bg-amber-400 text-purple-950 shadow-sm"
            >
              Reserve Pass
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

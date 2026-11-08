import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SBGLogo } from './SBGLogo';

interface NavbarProps {
  onRegisterClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegisterClick }) => {
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

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Agenda', href: '#agenda' },
    { name: 'Tickets', href: '#tickets' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Venue', href: '#venue' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#080419]/90 backdrop-blur-xl border-b border-purple-500/25 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand with SBG PICT (AWS logo removed) */}
          <a
            href="#home"
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-xl p-1"
          >
            <SBGLogo />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#120B33]/70 p-1.5 rounded-full border border-purple-500/30 backdrop-blur-md shadow-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-sm font-semibold text-purple-200 hover:text-white hover:bg-purple-600/30 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Primary Glowing Purple/Blue CTA */}
            <button
              onClick={handleRegisterAction}
              className="relative group hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-[0_0_20px_rgba(139,92,246,0.45)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 border border-purple-400/50 cursor-pointer overflow-hidden"
            >
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span>Register Now</span>
              <ExternalLink className="w-3.5 h-3.5 text-purple-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2.5 rounded-xl bg-[#130B36] border border-purple-500/40 text-white hover:bg-purple-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-purple-500/30 bg-[#0A0520]/98 backdrop-blur-2xl shadow-2xl transition-all duration-300">
          <div className="px-5 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-semibold text-purple-200 hover:text-white hover:bg-purple-600/30 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 border-t border-purple-500/20 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleRegisterAction();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Register Now</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <div className="flex justify-center items-center gap-4 pt-2 text-xs text-purple-300 font-medium">
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

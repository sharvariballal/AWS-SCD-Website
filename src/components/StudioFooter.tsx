import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { LinkedInIcon, InstagramIcon, TwitterXIcon, DiscordIcon, GitHubIcon } from './BrandIcons';
import { playSound } from '../utils/audio';
import { SBGLogo } from './SBGLogo';

interface StudioFooterProps {
  onOpenCodeOfConduct: () => void;
}

export const StudioFooter: React.FC<StudioFooterProps> = ({ onOpenCodeOfConduct }) => {
  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#120424] text-white pt-14 pb-12 px-4 sm:px-6 lg:px-8 border-t-2 border-purple-800/40 overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-purple-600/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-purple-900/60">
          
          {/* Column 1: CLOUD CITY brand + Official SBG Logo (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-purple-900 border border-purple-400/40 p-1.5 flex items-center justify-center shrink-0 shadow-sm">
                <SBGLogo variant="emblem" size="md" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight leading-tight">
                  CLOUD CITY 2027
                </h3>
                <p className="text-xs font-bold text-amber-300">
                  AWS Student Community Day Pune
                </p>
                <p className="text-[10px] font-mono text-purple-300 uppercase tracking-wider">
                  AWS Student Builder Group • PICT Chapter
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-purple-200/70 max-w-sm leading-relaxed font-normal">
              A flagship student-powered technology summit bridging classroom theory and production innovation for builders across Maharashtra.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { icon: LinkedInIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
                { icon: TwitterXIcon, href: 'https://x.com', label: 'Twitter' },
                { icon: DiscordIcon, href: 'https://discord.gg', label: 'Discord' },
                { icon: GitHubIcon, href: 'https://github.com', label: 'GitHub' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="w-9 h-9 rounded-xl bg-purple-950/80 hover:bg-amber-400 hover:text-purple-950 border border-purple-400/30 text-purple-200 flex items-center justify-center transition-all shadow-sm"
                  >
                    <Icon className="w-4 h-4 fill-current" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Venue & Location Summary (3 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-black text-amber-300 uppercase tracking-widest">
              Event Details
            </h4>
            <div className="space-y-2 text-xs text-purple-200/80 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>08:30 AM – 06:00 PM IST</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Dakkhan Banquet Hall, Pune</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Early Bird Pass Live on KonfHub</span>
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Community Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-black text-amber-300 uppercase tracking-widest">
              Community Inquiries
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="mailto:aws.sbg.pict@gmail.com"
                className="flex items-center gap-2 text-purple-200/80 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>aws.sbg.pict@gmail.com</span>
              </a>
              <div>
                <button
                  onClick={onOpenCodeOfConduct}
                  className="text-xs text-purple-300 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Code of Conduct
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-purple-400/80">
          <div>
            &copy; 2027 AWS Student Community Day Pune • Built by AWS Student Builder Group PICT
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-400/30 text-purple-200 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to Top</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

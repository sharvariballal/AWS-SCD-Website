import React from 'react';
import { Mail, ArrowUp, Sparkles, Send } from 'lucide-react';
import { LinkedInIcon, InstagramIcon, TwitterXIcon, DiscordIcon, GitHubIcon } from './BrandIcons';
import { playSound } from '../utils/audio';

interface StudioFooterProps {
  onOpenCodeOfConduct: () => void;
}

export const StudioFooter: React.FC<StudioFooterProps> = ({ onOpenCodeOfConduct }) => {
  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#1C0733] via-[#160429] to-[#0E021B] text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t-2 border-purple-800/40 overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-purple-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Pre-Footer Hero Banner (Directly Matching Poster #3!) */}
        <div className="relative rounded-3xl bg-gradient-to-r from-purple-900/60 via-purple-950/80 to-indigo-950/70 border-2 border-purple-400/30 p-8 sm:p-14 mb-16 text-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-300/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>THE EXPEDITION CONTINUES</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              YOUR NEXT CHAPTER <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-amber-200 to-purple-300">
                STARTS HERE
              </span>
            </h2>

            <p className="text-sm sm:text-lg text-purple-200/90 font-medium max-w-xl mx-auto">
              Bring your curiosity. We'll meet you in Cloud City.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#ticket-dispenser"
                onClick={() => playSound('click')}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-purple-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-amber-400/30 transition-transform hover:scale-105"
              >
                <span>Get Event Passes & Updates</span>
                <Send className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs font-mono text-purple-300/70 tracking-widest uppercase pt-2">
              REGISTRATION DETAILS & EARLY BIRD LIVE NOW • 07 FEB
            </p>
          </div>

          {/* Background image preview from poster */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
            style={{
              backgroundImage: `url('/posters/poster-footer.jpg')`,
            }}
          />
        </div>

        {/* 3-Column Footer Grid matching Poster #3 footer bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-purple-900/60">
          
          {/* Column 1: CLOUD CITY brand */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                CLOUD CITY
              </h3>
              <p className="text-sm font-bold text-amber-300 mt-0.5">
                AWS Student Community Day Pune
              </p>
              <p className="text-xs font-mono text-purple-300 mt-1 uppercase tracking-wider">
                Build. Connect. Explore.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-purple-200/70 max-w-sm leading-relaxed font-normal">
              A flagship collegiate technology summit brought to life by the AWS Student Builder Group at Pune Institute of Computer Technology.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
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
                    className="w-9 h-9 rounded-xl bg-purple-950/80 border border-purple-700/50 hover:border-amber-400 hover:text-amber-300 text-purple-300 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4 fill-current" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-black text-purple-300 uppercase tracking-widest">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-sm text-purple-200/80 font-medium">
              <li>
                <a href="#hero-gate-journey" className="hover:text-amber-300 transition-colors">
                  About Cloud City
                </a>
              </li>
              <li>
                <a href="#city-interactive-map" className="hover:text-amber-300 transition-colors">
                  Districts & Venue
                </a>
              </li>
              <li>
                <a href="#speakers-studio" className="hover:text-amber-300 transition-colors">
                  Speakers & CFP
                </a>
              </li>
              <li>
                <a href="#flashback-gallery" className="hover:text-amber-300 transition-colors">
                  Flashback Gallery
                </a>
              </li>
              <li>
                <a href="#ticket-dispenser" className="hover:text-amber-300 transition-colors">
                  Passes & Tickets
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenCodeOfConduct}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Code of Conduct
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: COMMUNITY & PICT */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-black text-purple-300 uppercase tracking-widest">
              COMMUNITY
            </h4>
            <div className="text-xs sm:text-sm text-purple-200/80 space-y-2 font-medium">
              <p className="font-bold text-white">
                AWS Student Builder Group • PICT
              </p>
              <p>Pune Institute of Computer Technology</p>
              <p className="text-purple-300">
                Survey No. 27, Near Trimurti Chowk, Dhankawadi, Pune, Maharashtra 411043
              </p>
              <div className="pt-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <a
                  href="mailto:awscloudclubpict@gmail.com"
                  className="text-amber-300 hover:underline font-mono text-xs"
                >
                  awscloudclubpict@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-purple-400">
          <div>
            © 2027 AWS Student Community Day Pune • All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/80 border border-purple-700/50 hover:border-amber-400 hover:text-amber-300 text-purple-200 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

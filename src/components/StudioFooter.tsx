import React from 'react';
import { Mail, ArrowUp, FileText } from 'lucide-react';
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
    <footer className="bg-slate-950 text-white border-t-4 border-slate-900 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-amber-400 border-2 border-white text-slate-950 flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_#FFFFFF]">
                AWS
              </div>
              <div className="leading-tight">
                <span className="text-base font-black text-white block uppercase tracking-tight">
                  AWS Student Community Day 2027
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  PICT Pune Chapter
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm font-medium leading-relaxed">
              Organized with passion by AWS Student Builder Group at Pune Institute of Computer Technology. Empowering collegiate builders with real cloud engineering competencies.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
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
                    className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 hover:text-amber-400 text-slate-300 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Nav Col */}
          <div>
            <h4 className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest mb-4">
              Summit Map
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-400">
              <li><a href="#hero-studio" className="hover:text-white transition-colors">Lab Station</a></li>
              <li><a href="#circuit-jammer" className="hover:text-white transition-colors">Circuit Jammer</a></li>
              <li><a href="#agenda-matrix" className="hover:text-white transition-colors">Schedule Matrix</a></li>
              <li><a href="#speakers-studio" className="hover:text-white transition-colors">Featured Speakers</a></li>
              <li><a href="#loot-box" className="hover:text-white transition-colors">Attendee Loot</a></li>
              <li><a href="#ticket-dispenser" className="hover:text-white transition-colors">Pass Dispensary</a></li>
            </ul>
          </div>

          {/* Event Telemetry Col */}
          <div>
            <h4 className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest mb-4">
              Summit Telemetry
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 font-mono">
              <li>📅 31 January 2027</li>
              <li>📍 Dakkhan Banquet Hall, Pune</li>
              <li>👥 1,000+ Builder Capacity</li>
              <li>⚡ ap-south-1 Deployment</li>
              <li>🍕 Lunch &amp; Chai Included</li>
            </ul>
          </div>

          {/* Contact & Conduct Col */}
          <div>
            <h4 className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <a
                href="mailto:team@awssbgpict.org"
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-mono"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>team@awssbgpict.org</span>
              </a>

              <button
                type="button"
                onClick={onOpenCodeOfConduct}
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-mono cursor-pointer text-left"
              >
                <FileText className="w-4 h-4 text-purple-400" />
                <span>Code of Conduct</span>
              </button>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 leading-relaxed">
                Emergency desk active on summit day: <strong>+91 98220 XXXXX</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="max-w-3xl text-center md:text-left leading-relaxed">
            <p className="mb-1 text-slate-400 font-bold">
              © 2027 AWS Student Builder Group PICT. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-600">
              Disclaimer: AWS Student Builder Group PICT is an independent student club at Pune Institute of Computer Technology. Amazon Web Services, AWS, and the AWS logo are trademarks of Amazon.com, Inc. or its affiliates.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="neo-btn bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer border border-slate-700 shrink-0"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

      </div>
    </footer>
  );
};

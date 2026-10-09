import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  ArrowUp, 
  Check, 
  Shield 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  LinkedInIcon, 
  InstagramIcon, 
  TwitterXIcon, 
  DiscordIcon, 
  GitHubIcon 
} from './BrandIcons';
import { SBGLogo } from './SBGLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.9 },
        colors: ['#FF9900', '#FFC72C', '#6C5CE7'],
      });
    } catch {
      // ignore
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D1B2A] text-slate-300 relative border-t border-slate-800 overflow-hidden">
      {/* Decorative top gold line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

      {/* Subtle background ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <SBGLogo />

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              AWS Student Builder Group at Pune Institute of Computer Technology (PICT).
              Bridging classroom theory with hands-on cloud innovation and real-world architectures.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: LinkedInIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
                { icon: TwitterXIcon, href: 'https://x.com', label: 'Twitter / X' },
                { icon: DiscordIcon, href: 'https://discord.gg', label: 'Discord' },
                { icon: GitHubIcon, href: 'https://github.com', label: 'GitHub' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all duration-200 border border-slate-700/60 hover:shadow-[0_0_12px_rgba(255,153,0,0.6)]"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Summit Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors">
                  Home &amp; Countdown
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  About Cloud City
                </a>
              </li>
              <li>
                <a href="#agenda" className="hover:text-amber-400 transition-colors">
                  Teaser Schedule
                </a>
              </li>
              <li>
                <a href="#tickets" className="hover:text-amber-400 transition-colors">
                  Book Tickets
                </a>
              </li>
              <li>
                <a href="#speakers" className="hover:text-amber-400 transition-colors">
                  Speakers Lineup
                </a>
              </li>
              <li>
                <a href="#sponsors" className="hover:text-amber-400 transition-colors">
                  Sponsors &amp; Partners
                </a>
              </li>
              <li>
                <a href="#venue" className="hover:text-amber-400 transition-colors">
                  Venue Location
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Event Details
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-slate-400">
                📅 31st January 2027
              </li>
              <li className="text-slate-400">
                📍 Dakkhan Banquet Hall, Pune
              </li>
              <li>
                <a
                  href="mailto:contact@awssbgpict.org"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  team@awssbgpict.org
                </a>
              </li>
              <li>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-400" /> PICT Community Chapter
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Get schedule releases and summit announcements directly to your inbox.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="builder@domain.com"
                    required
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="max-w-2xl text-center md:text-left">
            <p className="mb-1">
              © 2027 AWS Student Builder Group PICT — Cloud City. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-600">
              Disclaimer: AWS Student Builder Group at PICT is a student-led technical community.
              Amazon Web Services, AWS, and the AWS logo are trademarks of Amazon.com, Inc. or its affiliates.
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/80"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};

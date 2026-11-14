import React, { useState } from 'react';
import {
  Mail,
  Send,
  ArrowUp,
  Check,
  ShieldCheck,
  FileText,
  Calendar,
  MapPin
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
import { playSound } from '../utils/audio';

interface FooterProps {
  onOpenCodeOfConduct?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCodeOfConduct }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    playSound('coin');
    setSubscribed(true);
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.9 },
        colors: ['#00F0FF', '#38BDF8', '#8B5CF6'],
      });
    } catch {
      // ignore
    }
  };

  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D1B2A] text-slate-300 relative border-t border-slate-800 overflow-hidden">
      {/* Decorative top cyan line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      {/* Subtle background ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <SBGLogo />

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              AWS Student Builder Group at Pune Institute of Computer Technology (PICT).
              Bridging classroom theory with hands-on cloud innovation, serverless architectures, and real-world builder opportunities.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: LinkedInIcon, href: 'https://linkedin.com/company/aws-cloud-club', label: 'LinkedIn' },
                { icon: InstagramIcon, href: 'https://instagram.com/awscloudclub', label: 'Instagram' },
                { icon: TwitterXIcon, href: 'https://x.com/awscloudclub', label: 'Twitter / X' },
                { icon: DiscordIcon, href: 'https://discord.gg/awscloudclub', label: 'Discord' },
                { icon: GitHubIcon, href: 'https://github.com/aws-cloud-clubs', label: 'GitHub' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all duration-200 border border-slate-700/60 hover:shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                  >
                    <Icon className="w-4 h-4 fill-current" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Summit Exploration
            </h4>
            <ul className="space-y-2.5 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              <li>
                <a href="#hero-studio" className="hover:text-cyan-400 transition-colors">
                  Home &amp; Countdown
                </a>
              </li>
              <li>
                <a href="#city-interactive-map" className="hover:text-cyan-400 transition-colors">
                  City Metropolis Map
                </a>
              </li>
              <li>
                <a href="#stage-program" className="hover:text-cyan-400 transition-colors">
                  Stage &amp; Agenda
                </a>
              </li>
              <li>
                <a href="#ticket-dispenser" className="hover:text-cyan-400 transition-colors">
                  Passes &amp; Tickets
                </a>
              </li>
              <li>
                <a href="#community-memories" className="hover:text-cyan-400 transition-colors">
                  Community Memories
                </a>
              </li>
              <li>
                <a href="#sponsors-showcase" className="hover:text-cyan-400 transition-colors">
                  Sponsors &amp; Partners
                </a>
              </li>
              <li>
                <a href="#venue-blueprint" className="hover:text-cyan-400 transition-colors">
                  Venue &amp; Accessibility
                </a>
              </li>
              <li>
                <a href="#faq-studio" className="hover:text-cyan-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Event Logistics
            </h4>
            <ul className="space-y-2.5 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              <li className="text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Sunday, 7th February 2027</span>
              </li>
              <li className="text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Dakkhan Banquet Hall, Pune</span>
              </li>
              <li>
                <a
                  href="mailto:support@aws-sbg-pict.in"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  support@aws-sbg-pict.in
                </a>
              </li>
              {onOpenCodeOfConduct && (
                <li>
                  <button
                    onClick={onOpenCodeOfConduct}
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-slate-300 text-left cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    Code of Conduct
                  </button>
                </li>
              )}
              <li>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> PICT Student Chapter
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Stay Updated
            </h4>
            <p className="text-xs text-slate-400 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Get schedule releases, speaker drops, and hackathon prompts sent to your inbox.
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
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors cursor-pointer flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.4)]"
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
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Disclaimer: AWS Student Builder Group at PICT is an independent student-run university club.
              Amazon Web Services, AWS, and the AWS smile logo are trademarks of Amazon.com, Inc. or its affiliates.
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/80"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

      </div>
    </footer>
  );
};

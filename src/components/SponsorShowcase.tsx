import React from 'react';
import { Download, ArrowUpRight, HeartHandshake, Lock, Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SponsorShowcaseProps {
  onOpenSponsorModal: () => void;
}

export const SponsorShowcase: React.FC<SponsorShowcaseProps> = ({ onOpenSponsorModal }) => {
  const headerRef = useScrollReveal();
  const cardsRef = useScrollReveal();

  const tiers = [
    {
      tier: 'TITLE PARTNER',
      status: 'PHASE 2 REVEAL',
      isLocked: true,
      desc: 'Exclusive headline branding across main stage, attendee smart badging, and welcome gate.',
      tagColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    },
    {
      tier: 'PLATINUM & CLOUD',
      status: 'PHASE 2 REVEAL',
      isLocked: true,
      desc: 'Dedicated booth inside Arcade Alley, main stage tech session, and student developer recruitment.',
      tagColor: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
    },
    {
      tier: 'COMMUNITY PARTNERS',
      status: 'OPEN NOW',
      isLocked: false,
      desc: 'Collaborating student developer clubs, regional college chapters, and campus outreach teams.',
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
  ];

  return (
    <section id="sponsors-showcase" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div ref={headerRef} className="sr-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 mb-2 uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              <span className="text-slate-500">//</span>
              <span>Sponsors &amp; Ecosystem</span>
            </div>
            <h2 className="font-anton text-3xl sm:text-5xl text-white tracking-tight">
              BACKED BY <span className="text-cyan-400">COMMUNITY</span> &amp; INDUSTRY
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
              Empowering student cloud builders through industry collaboration.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playSound('click');
                onOpenSponsorModal();
              }}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-transform hover:scale-105"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Become a Sponsor</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="/brochure-placeholder.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => playSound('click')}
              className="hidden sm:flex px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-xs sm:text-sm font-bold items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Sponsor Deck</span>
            </a>
          </div>
        </div>

        {/* Clean 3-Tier Grid */}
        <div ref={cardsRef} className="sr-reveal grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-[#0D1B2A]/80 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] transition-all duration-300 backdrop-blur-md"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border inline-flex items-center gap-1.5 ${item.tagColor}`}>
                    {item.isLocked ? <Lock className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                    <span>{item.status}</span>
                  </span>
                </div>

                <h3 className="font-anton text-xl sm:text-2xl text-white mb-2 tracking-tight">
                  {item.tier}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>AWS SCD 2027</span>
                <button
                  onClick={onOpenSponsorModal}
                  className="font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer"
                >
                  Inquire Now →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

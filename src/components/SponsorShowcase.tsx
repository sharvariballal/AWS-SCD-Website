import React from 'react';
import { Award, Download, ArrowUpRight, HeartHandshake, Lock, Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SponsorShowcaseProps {
  onOpenSponsorModal: () => void;
}

export const SponsorShowcase: React.FC<SponsorShowcaseProps> = ({ onOpenSponsorModal }) => {
  const tiers = [
    {
      tier: 'TITLE PARTNER',
      status: 'ANNOUNCING IN PHASE 2',
      isLocked: true,
      desc: 'Headline branding across main stage, attendee badging, and welcome gate.',
      badgeColor: 'bg-amber-400 text-purple-950',
    },
    {
      tier: 'PLATINUM & CLOUD PARTNERS',
      status: 'ANNOUNCING IN PHASE 2',
      isLocked: true,
      desc: 'Exclusive booth inside Arcade Alley, stage tech presentation, and recruitment rights.',
      badgeColor: 'bg-purple-200 text-purple-950',
    },
    {
      tier: 'COMMUNITY & STUDENT PARTNERS',
      status: 'OPEN FOR PARTNERSHIPS',
      isLocked: false,
      desc: 'Collaborating student developer clubs, hackathon tracks, and campus outreach.',
      badgeColor: 'bg-emerald-100 text-emerald-950',
    },
  ];

  return (
    <section id="sponsors-showcase" className="py-20 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b-2 border-purple-900/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Solid Non-Gradient Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-300 bg-purple-100 text-purple-900 text-xs font-mono font-black uppercase mb-3 shadow-sm">
              <Award className="w-3.5 h-3.5 text-purple-700" />
              <span>Sponsors &amp; Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#260B49] tracking-tight">
              Backed by Community &amp; Industry
            </h2>
            <p className="text-sm sm:text-base text-purple-950/75 mt-2 max-w-xl font-medium">
              Powered by AWS Student Builder Group PICT with leading cloud technology and developer ecosystems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playSound('click');
                onOpenSponsorModal();
              }}
              className="bg-amber-400 hover:bg-amber-300 text-purple-950 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-md shadow-amber-400/25 transition-transform hover:scale-105"
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
              className="hidden sm:flex px-4 py-2.5 rounded-2xl border border-purple-300 bg-white hover:bg-purple-50 text-purple-900 text-xs sm:text-sm font-bold items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Sponsor Deck</span>
            </a>
          </div>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-purple-200 shadow-[0_10px_30px_rgba(76,29,149,0.08)] flex flex-col justify-between hover:shadow-[0_16px_40px_rgba(76,29,149,0.15)] hover:-translate-y-1 transition-all"
            >
              <div>
                <span className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-full ${item.badgeColor} border border-purple-300/40 inline-flex items-center gap-1.5 mb-3`}>
                  {item.isLocked ? <Lock className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                  <span>{item.status}</span>
                </span>
                <h3 className="text-xl font-black text-[#260B49] mb-2">{item.tier}</h3>
                <p className="text-xs sm:text-sm text-purple-950/75 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-purple-100 flex items-center justify-between text-xs font-mono text-purple-700">
                <span className="font-bold">AWS SCD 2027</span>
                <span className="font-black text-amber-600">INQUIRE NOW</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

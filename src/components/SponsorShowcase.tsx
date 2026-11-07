import React from 'react';
import { Award, Download, ArrowUpRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SponsorShowcaseProps {
  onOpenSponsorModal: () => void;
}

export const SponsorShowcase: React.FC<SponsorShowcaseProps> = ({ onOpenSponsorModal }) => {
  const tiers = [
    {
      tier: 'TITLE PARTNER',
      status: '🔒 ANNOUNCING IN PHASE 2',
      desc: 'Headline branding across main stage, attendee badging, and welcome gate.',
      badgeColor: 'bg-amber-400 text-slate-950',
    },
    {
      tier: 'PLATINUM & CLOUD PARTNERS',
      status: '🔒 ANNOUNCING IN PHASE 2',
      desc: 'Exclusive booth inside Arcade Alley, stage tech presentation, and recruitment rights.',
      badgeColor: 'bg-purple-300 text-slate-950',
    },
    {
      tier: 'COMMUNITY & STUDENT PARTNERS',
      status: '⚡ OPEN FOR PARTNERSHIPS',
      desc: 'Collaborating student developer clubs, hackathon tracks, and campus outreach.',
      badgeColor: 'bg-emerald-300 text-slate-950',
    },
  ];

  return (
    <section id="sponsors-showcase" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-slate-900 bg-amber-400 text-slate-950 text-xs font-mono font-black uppercase mb-3 shadow-[2px_2px_0px_#0F172A]">
              <Award className="w-3.5 h-3.5" />
              <span>Sponsors &amp; Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Backed by Community &amp; Industry
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl font-medium">
              Powered by AWS Student Builder Group PICT with leading cloud technology and developer ecosystems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playSound('click');
                onOpenSponsorModal();
              }}
              className="neo-btn neo-btn-primary px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_#0F172A]"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Become a Sponsor</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Core Organizing & Community Backing */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white border-3 border-slate-950 shadow-[6px_6px_0px_#0F172A]">
          <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded bg-slate-950 text-amber-400 uppercase">
            ORGANIZED &amp; HOSTED BY
          </span>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="p-5 rounded-2xl bg-amber-50/60 border-2 border-slate-900 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center text-slate-950 font-black text-xl shadow-[2px_2px_0px_#0F172A] shrink-0">
                AWS
              </div>
              <div>
                <h4 className="text-base font-black text-slate-950">AWS Student Builder Group</h4>
                <p className="text-xs text-slate-600 font-medium">Pune Institute of Computer Technology (PICT)</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-bold mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Official Student Community Chapter
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/60 border-2 border-slate-900 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-indigo-500 border-2 border-slate-900 flex items-center justify-center text-white font-black text-xl shadow-[2px_2px_0px_#0F172A] shrink-0">
                UG
              </div>
              <div>
                <h4 className="text-base font-black text-slate-950">AWS User Group Pune</h4>
                <p className="text-xs text-slate-600 font-medium">Regional Developer &amp; Architect Community Network</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-indigo-700 font-bold mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Community Mentor Network
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sponsor Tier Teasers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {tiers.map((item, idx) => (
            <div key={idx} className="neo-card p-6 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded border border-slate-900 ${item.badgeColor}`}>
                    {item.tier}
                  </span>
                </div>

                <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-center my-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 border border-slate-400 mx-auto mb-2 flex items-center justify-center text-slate-500 font-black">
                    ?
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {item.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                <span>SLOTS OPEN</span>
                <button
                  onClick={() => {
                    playSound('click');
                    onOpenSponsorModal();
                  }}
                  className="text-amber-600 hover:text-amber-700 underline font-black cursor-pointer"
                >
                  Inquire Now →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sponsor Callout Banner */}
        <div className="p-8 rounded-3xl bg-slate-950 text-white border-3 border-slate-950 shadow-[6px_6px_0px_#FF9900] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
              JOIN AS A BRAND PARTNER
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Put Your Brand in Front of 1,000+ Future Cloud Builders
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
              Custom booth allocations in Arcade Alley, stage keynotes, hackathon tracks, and brand inclusion in all attendee swag boxes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                playSound('click');
                onOpenSponsorModal();
              }}
              className="neo-btn bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_#FFFFFF]"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Sponsor Registration</span>
            </button>

            <a
              href="/brochure.pdf"
              target="_blank"
              rel="noreferrer"
              className="neo-btn bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Sponsor Deck (.PDF)</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

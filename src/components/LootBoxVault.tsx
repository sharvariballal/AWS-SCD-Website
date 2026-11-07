import React from 'react';
import { Gift } from 'lucide-react';

export const LootBoxVault: React.FC = () => {
  const perks = [
    {
      emoji: '🎁',
      title: 'Official Cloud City Swag Box',
      tag: 'CLASSIFIED UNBOXING',
      desc: 'Exclusive custom event merchandise curated by AWS Student Builder Group PICT. Handed out physically at the Welcome Gate upon entry.',
      accent: 'bg-amber-100 border-amber-400',
    },
    {
      emoji: '🍕',
      title: 'Full Buffet Lunch & High-Tea',
      tag: 'ALL-DAY CATERING',
      desc: 'Hot breakfast, lavish afternoon Indian buffet lunch, evening tea, and specialty coffee to keep your builder energy high.',
      accent: 'bg-rose-100 border-rose-400',
    },
    {
      emoji: '📜',
      title: 'Verifiable Digital Credential',
      tag: 'OFFICIAL RECOGNITION',
      desc: 'Recognized digital certificate of participation issued by AWS Student Builder Group PICT, verifiable directly on LinkedIn.',
      accent: 'bg-purple-100 border-purple-400',
    },
    {
      emoji: '🕹️',
      title: 'Arcade Alley Carnival Access',
      tag: 'GAMES & BOUNTIES',
      desc: 'Tokens for interactive DIY carnival challenges, cloud trivia games, and hands-on fun throughout the conference hall.',
      accent: 'bg-cyan-100 border-cyan-400',
    },
  ];

  return (
    <section id="loot-box" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-slate-900 bg-emerald-400 text-slate-950 text-xs font-mono font-black uppercase mb-3 shadow-[2px_2px_0px_#0F172A]">
              <Gift className="w-3.5 h-3.5" />
              <span>Attendee Perks</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              What Every Ticket Unlocks
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl font-medium">
              Every pass holder receives 100% full access to the entire summit experience, meals, and the official mystery swag box.
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 bg-slate-50 border-2 border-slate-900 rounded-2xl shadow-[3px_3px_0px_#0F172A] self-start md:self-auto">
            <span className="text-xl">✨</span>
            <div className="text-xs font-mono font-bold text-slate-900">
              INCLUDED IN <span className="text-amber-600">ALL PASS TIERS</span>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((item, idx) => (
            <div
              key={idx}
              className={`neo-card p-6 ${item.accent} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-900 text-2xl flex items-center justify-center shadow-[2px_2px_0px_#0F172A]">
                    {item.emoji}
                  </div>
                  <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-slate-950 text-white uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-950 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t-2 border-slate-900/30 flex items-center justify-between text-xs font-mono font-black text-slate-900">
                <span>GUARANTEED</span>
                <span className="text-emerald-700">✓ INCLUDED</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

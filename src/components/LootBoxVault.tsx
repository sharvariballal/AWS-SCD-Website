import React from 'react';
import { Gift, Sparkles } from 'lucide-react';

export const LootBoxVault: React.FC = () => {
  const perks = [
    {
      emoji: '🎁',
      title: 'Official Cloud City Swag Box',
      tag: 'CLASSIFIED UNBOXING',
      desc: 'Exclusive custom event merchandise curated by AWS Student Builder Group PICT. Handed out physically at the Welcome Gate upon entry.',
      accent: 'bg-purple-50 border-purple-200',
    },
    {
      emoji: '🍕',
      title: 'Full Buffet Lunch & High-Tea',
      tag: 'ALL-DAY CATERING',
      desc: 'Hot breakfast, lavish afternoon Indian buffet lunch, evening tea, and specialty coffee to keep your builder energy high.',
      accent: 'bg-amber-50 border-amber-200',
    },
    {
      emoji: '📜',
      title: 'Verifiable Digital Credential',
      tag: 'OFFICIAL RECOGNITION',
      desc: 'Recognized digital certificate of participation issued by AWS Student Builder Group PICT, verifiable directly on LinkedIn.',
      accent: 'bg-purple-50 border-purple-200',
    },
    {
      emoji: '🕹️',
      title: 'Arcade Alley Carnival Access',
      tag: 'GAMES & BOUNTIES',
      desc: 'Tokens for interactive DIY carnival challenges, cloud trivia games, and hands-on fun throughout the conference hall.',
      accent: 'bg-indigo-50 border-indigo-200',
    },
  ];

  return (
    <section id="loot-box" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7FF] via-[#F5EFFE] to-[#FAF7FF] border-b-2 border-purple-900/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-300 bg-purple-100 text-purple-900 text-xs font-mono font-black uppercase mb-3 shadow-sm">
              <Gift className="w-3.5 h-3.5 text-purple-700" />
              <span>Attendee Perks</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#260B49] tracking-tight">
              What Every Ticket Unlocks
            </h2>
            <p className="text-sm sm:text-base text-purple-950/75 mt-2 max-w-xl font-medium">
              Every pass holder receives 100% full access to the entire summit experience, meals, and the official mystery swag box.
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 bg-white/90 border border-purple-200 rounded-2xl shadow-sm self-start md:self-auto">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <div className="text-xs font-mono font-bold text-purple-950">
              INCLUDED IN <span className="text-purple-700">ALL PASS TIERS</span>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border-2 ${perk.accent} bg-white shadow-[0_10px_30px_rgba(76,29,149,0.08)] flex flex-col justify-between hover:shadow-[0_16px_40px_rgba(76,29,149,0.16)] hover:-translate-y-1 transition-all`}
            >
              <div>
                <div className="text-4xl mb-4">{perk.emoji}</div>
                <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 mb-3 inline-block">
                  {perk.tag}
                </span>
                <h3 className="text-lg font-black text-[#260B49] mb-2">
                  {perk.title}
                </h3>
                <p className="text-xs sm:text-sm text-purple-900/75 font-normal leading-relaxed">
                  {perk.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-purple-100 flex items-center justify-between text-[11px] font-mono text-purple-600 font-bold">
                <span>GUARANTEED</span>
                <span>PASS PERK</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

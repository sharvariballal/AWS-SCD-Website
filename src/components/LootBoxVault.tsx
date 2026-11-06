import React from 'react';
import { Gift } from 'lucide-react';
import { playSound } from '../utils/audio';

interface LootItem {
  emoji: string;
  title: string;
  tag: string;
  desc: string;
  color: string;
}

const lootItems: LootItem[] = [
  {
    emoji: '👕',
    title: 'Cloud City 2027 Builder Tee',
    tag: 'LIMITED RUN',
    desc: '100% combed cotton, 240 GSM heavyweight oversized streetwear-inspired tech tee with screen-printed AWS SBG PICT graphics.',
    color: 'bg-amber-100 border-amber-400',
  },
  {
    emoji: '✨',
    title: 'Holographic Die-Cut Sticker Pack',
    tag: 'LAPTOP ARMOR',
    desc: 'Set of 8 high-gloss waterproof vinyl stickers including Bedrock AI, Lambda serverless, DynamoDB, and cute cloud memes.',
    color: 'bg-purple-100 border-purple-400',
  },
  {
    emoji: '💳',
    title: '$100 AWS Skill Builder Credits',
    tag: 'SKILL ACCELERATOR',
    desc: 'Hands-on practice vouchers valid for AWS certification exam preparation and serverless cloud sandbox labs.',
    color: 'bg-blue-100 border-blue-400',
  },
  {
    emoji: '🏷️',
    title: 'NFC Smart Attendee Badge',
    tag: 'TAP TO CONNECT',
    desc: 'Custom-printed smart badge that lets you tap phones with fellow builders and recruiters to instantly share LinkedIn / GitHub.',
    color: 'bg-emerald-100 border-emerald-400',
  },
  {
    emoji: '🍕',
    title: 'Full Buffet Lunch & High-Tea',
    tag: 'UNLIMITED FUEL',
    desc: 'Hot breakfast, lavish Indian buffet lunch, evening artisanal snacks, and continuous Masala Chai throughout the summit.',
    color: 'bg-rose-100 border-rose-400',
  },
  {
    emoji: '📜',
    title: 'Verifiable Digital Certificate',
    tag: 'LINKEDIN READY',
    desc: 'Official recognized participation credential issued by AWS Student Builder Group PICT, verifiable with unique blockchain ID.',
    color: 'bg-amber-100 border-amber-400',
  },
];

export const LootBoxVault: React.FC = () => {
  return (
    <section id="loot-box" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-slate-900 bg-emerald-400 text-slate-950 text-xs font-mono font-black uppercase mb-3 shadow-[2px_2px_0px_#0F172A]">
              <Gift className="w-3.5 h-3.5" />
              <span>Attendee Loot Bag</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              What&apos;s Inside the Builder Box?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl font-medium">
              Every single ticket holder receives the complete official swag loot box at check-in. No raffles, no lucky draws — 100% guaranteed.
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 bg-slate-50 border-2 border-slate-900 rounded-2xl shadow-[3px_3px_0px_#0F172A] self-start md:self-auto">
            <span className="text-xl">🎒</span>
            <div className="text-xs font-mono font-bold text-slate-900">
              ESTIMATED VALUE: <span className="text-amber-600">₹3,500+</span>
            </div>
          </div>
        </div>

        {/* 6 Loot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lootItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => playSound('coin')}
              className={`neo-card p-6 ${item.color} flex flex-col justify-between cursor-pointer group`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-900 text-3xl flex items-center justify-center shadow-[3px_3px_0px_#0F172A] group-hover:scale-105 transition-transform">
                    {item.emoji}
                  </div>
                  <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded bg-slate-950 text-white uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-950 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t-2 border-slate-900/30 flex items-center justify-between text-xs font-mono font-black text-slate-900">
                <span>INCLUDED FOR ALL</span>
                <span className="text-emerald-700">✓ GUARANTEED</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

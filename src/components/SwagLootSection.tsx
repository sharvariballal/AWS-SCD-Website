import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SwagItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  accent: string;
  emoji: string;
}

const swagItems: SwagItem[] = [
  {
    id: 'tee',
    title: 'Cloud City 2027 Builder Tee',
    tag: 'Limited Edition',
    description: '100% combed cotton, 240 GSM premium oversized event t-shirt featuring bespoke AWS SBG typography.',
    accent: 'from-amber-500 to-orange-500',
    emoji: '👕',
  },
  {
    id: 'stickers',
    title: 'Holographic Die-Cut Sticker Pack',
    tag: 'Developer Pride',
    description: 'Set of 8 waterproof laptop stickers including Bedrock AI, Lambda serverless, DynamoDB, and cute cloud memes.',
    accent: 'from-purple-500 to-violet-600',
    emoji: '✨',
  },
  {
    id: 'credits',
    title: '$100 AWS Skill Builder Credits',
    tag: 'Skill Boost',
    description: 'Hands-on practice credit code redeemable for AWS cloud labs, certification prep, and compute workloads.',
    accent: 'from-blue-500 to-cyan-500',
    emoji: '💳',
  },
  {
    id: 'badge',
    title: 'NFC Attendee Smart Badge',
    tag: 'Smart Pass',
    description: 'Custom lanyard + tap-to-connect attendee smart badge for instant LinkedIn & GitHub networking at booths.',
    accent: 'from-emerald-500 to-teal-600',
    emoji: '🏷️',
  },
  {
    id: 'catering',
    title: 'Gourmet Lunch & Cloud Cafe High Tea',
    tag: 'All Day Fuel',
    description: 'Full buffet lunch, continuous hot coffee, Masala Chai, and evening artisanal snacks at Dakkhan Banquet Hall.',
    accent: 'from-rose-500 to-amber-500',
    emoji: '🍕',
  },
  {
    id: 'certificate',
    title: 'Official Verifiable Certificate',
    tag: 'Credly-Ready',
    description: 'Recognized digital credential issued by AWS Student Builder Group PICT, verifiable directly on LinkedIn.',
    accent: 'from-amber-400 to-yellow-500',
    emoji: '📜',
  },
];

export const SwagLootSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    playSound('coin');
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <section id="swag" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background subtle glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Gift className="w-3.5 h-3.5 text-amber-600" />
            <span>Attendee Goodies &amp; Perks</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Official Builder{' '}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-violet-600 bg-clip-text text-transparent">
              Swag &amp; Loot Kit
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            Every registered attendee receives the full Cloud City 2027 loot package at check-in. No lucky draws — 100% guaranteed!
          </p>
        </div>

        {/* 6 Swag Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {swagItems.map((item) => {
            const isSelected = activeItem === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-amber-400 shadow-[0_15px_35px_rgba(255,153,0,0.25)] scale-[1.02]'
                    : 'bg-slate-50/80 hover:bg-white text-slate-900 border-slate-200/90 hover:border-amber-300 hover:shadow-xl'
                }`}
              >
                {/* Top Glowing Bar */}
                <div
                  className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${item.accent}`}
                />

                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.accent} flex items-center justify-center text-white shadow-md text-xl`}
                  >
                    <span>{item.emoji}</span>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      isSelected
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>

                <h3
                  className={`text-lg font-black mb-2 transition-colors ${
                    isSelected ? 'text-white' : 'text-slate-900 group-hover:text-amber-600'
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    isSelected ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {item.description}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-amber-300' : 'text-slate-500'}>
                    Included in All Passes
                  </span>
                  <span className="text-amber-500 font-bold">● Guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fun bottom banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-purple-50 border border-amber-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
              🎁
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Bonus Secret Swag Drops During Keynote
              </h4>
              <p className="text-xs text-slate-600">
                Participate in stage trivia quizzes and AWS game day to win special edition AWS Cloud hoodies!
              </p>
            </div>
          </div>
          <a
            href="#tickets"
            className="px-5 py-2.5 rounded-xl bg-slate-950 text-white hover:bg-slate-800 text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
          >
            Claim Your Pass &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};

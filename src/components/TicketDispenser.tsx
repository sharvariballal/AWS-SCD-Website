import React from 'react';
import {
  Sparkles,
  Check,
  ShieldCheck,
  Package,
  Utensils,
  Award,
  ArrowRight,
  Lock
} from 'lucide-react';
import { TICKETING_CONFIG } from '../config/ticketing';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface TicketDispenserProps {
  onRegisterClick: (passType: string) => void;
}

export const TicketDispenser: React.FC<TicketDispenserProps> = ({ onRegisterClick }) => {
  const headerRef = useScrollReveal();
  const cardsRef = useScrollReveal();

  const handleBook = (tier: string, isLive: boolean) => {
    if (!isLive) {
      alert('This tier launches in Phase 2! Please claim the active Early Bird pass (₹299).');
      return;
    }
    if (TICKETING_CONFIG.provider === 'konfhub' && TICKETING_CONFIG.konfhubEventUrl) {
      window.open(TICKETING_CONFIG.konfhubEventUrl, '_blank');
      return;
    }
    onRegisterClick(tier);
  };

  const passTiers = [
    {
      id: 'early-bird',
      name: 'Early Bird Pass',
      tag: 'ACTIVE // PHASE 1',
      price: '₹299',
      originalPrice: '₹499',
      status: 'LIVE NOW',
      isLive: true,
      featured: true,
      perks: [
        'Full Day All-District Summit Access',
        'Multi-Course Banquet Buffet & Breakfast',
        'Official Cloud City Builder Swag Kit',
        'Verifiable Digital Certificate of Attendance',
      ],
    },
    {
      id: 'regular',
      name: 'Regular Pass',
      tag: 'PHASE 2',
      price: '₹369',
      originalPrice: '₹549',
      status: 'OPENS SOON',
      isLive: false,
      featured: false,
      perks: [
        'Full Day All-District Summit Access',
        'Multi-Course Banquet Buffet & Breakfast',
        'Official Cloud City Builder Swag Kit',
        'Verifiable Digital Certificate of Attendance',
      ],
    },
    {
      id: 'group',
      name: 'Group Pass',
      tag: 'SQUAD // 3+ BUILDERS',
      price: '₹330',
      originalPrice: '₹499',
      status: 'OPENS SOON',
      isLive: false,
      featured: false,
      perks: [
        'Discounted Team Admission (3+ Members)',
        'Multi-Course Banquet Buffet & Breakfast',
        'Official Cloud City Builder Swag Kit',
        'Verifiable Digital Certificate of Attendance',
      ],
    },
  ];

  return (
    <section id="ticket-dispenser" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="sr-reveal text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-cyan-400 mb-2 uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <span className="text-slate-500">//</span>
            <span>Summit Admissions</span>
          </div>

          <h2 className="font-anton text-3xl sm:text-5xl text-white tracking-tight">
            CLAIM YOUR <span className="text-cyan-400">SUMMIT</span> PASS
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Subsidized student admission. Every pass includes full masterclasses, hot meals, and official swag.
          </p>
        </div>

        {/* Clean 3-Card Pass Layout */}
        <div ref={cardsRef} className="sr-reveal grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-8">
          {passTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl ${tier.featured
                ? 'bg-[#0D1B2A]/95 border-2 border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.2)] md:-translate-y-2'
                : 'bg-[#0D1B2A]/70 border border-white/10 hover:border-white/20'
                }`}
            >
              {/* Featured Badge */}
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-mono text-[10px] font-black uppercase tracking-wider shadow-md">
                  RECOMMENDED
                </div>
              )}

              <div>
                {/* Tier Meta */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400">
                    {tier.tag}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${tier.isLive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/5 text-slate-400 border border-white/10'
                    }`}>
                    {tier.status}
                  </span>
                </div>

                <h3 className="font-anton text-2xl text-white tracking-tight mb-2">
                  {tier.name}
                </h3>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-cyan-400">
                    {tier.price}
                  </span>
                  <span className="font-mono text-sm text-slate-500 line-through">
                    {tier.originalPrice}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">/ attendee</span>
                </div>

                {/* Inclusions List */}
                <div className="space-y-2.5 mb-6">
                  {tier.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => handleBook(`${tier.name} (${tier.price})`, tier.isLive)}
                  className={`w-full py-3.5 rounded-xl font-mono text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${tier.isLive
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-[1.02]'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                    }`}
                >
                  {tier.isLive ? (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Book Early Bird — {tier.price}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Phase 2 Release</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Inclusions Strip (Spacious & Clean) */}
        <div className="p-4 rounded-2xl bg-[#0D1B2A]/60 border border-white/5 backdrop-blur-md">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { icon: Award, label: 'All-Day Pass & Workshops' },
              { icon: Utensils, label: 'Breakfast & Full Buffet Lunch' },
              { icon: Package, label: 'Official Swag Kit & Badge' },
              { icon: ShieldCheck, label: 'Verifiable Digital Certificate' },
            ].map(({ icon: Icon, label }, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-slate-300">
                <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                <span style={{ fontFamily: "'Inter', sans-serif" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

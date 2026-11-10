import React, { useState } from 'react';
import { 
  Ticket, 
  Sparkles, 
  Check, 
  ShieldCheck,
  Lock,
  Info,
  Package,
  Utensils,
  Award,
  ArrowRight
} from 'lucide-react';
import { TICKETING_CONFIG } from '../config/ticketing';
import { SBGLogo } from './SBGLogo';
import { CityMascotGuide } from './CityMascotGuide';

interface TicketDispenserProps {
  onRegisterClick: (passType: string) => void;
}

export const TicketDispenser: React.FC<TicketDispenserProps> = ({ onRegisterClick }) => {
  const [selectedTier, setSelectedTier] = useState<number>(0);

  const passes = [
    {
      id: 'early_bird',
      title: 'Early Bird Pass',
      tag: 'ACTIVE TIER',
      basePrice: 299,
      isLive: true,
      displayPrice: '₹299',
      subtitle: 'Phase 1 official live quota • Limited seats',
      badge: 'LIVE NOW',
    },
    {
      id: 'regular',
      title: 'Regular Pass',
      tag: 'PHASE 2',
      basePrice: 369,
      isLive: false,
      displayPrice: 'Revealing Soon',
      subtitle: 'Launches after Early Bird phase concludes',
      badge: 'COMING SOON',
    },
    {
      id: 'group',
      title: 'Group Discount Pass',
      tag: 'TEAMS OF 3+',
      basePrice: 330,
      isLive: false,
      displayPrice: 'Revealing Soon',
      subtitle: 'Discounted squad booking for teams of 3 or more',
      badge: 'COMING SOON',
    },
  ];

  const currentPass = passes[selectedTier];
  const finalPrice = currentPass.basePrice;

  const handleDispenseTicket = () => {
    if (!currentPass.isLive) {
      alert('This tier launches in the next phase! Please book the active Early Bird pass (₹299).');
      return;
    }
    if (TICKETING_CONFIG.provider === 'konfhub' && TICKETING_CONFIG.konfhubEventUrl) {
      window.open(TICKETING_CONFIG.konfhubEventUrl, '_blank');
      return;
    }
    onRegisterClick(`${currentPass.title} (₹${finalPrice})`);
  };

  const universalPerks = [
    {
      title: 'Full Day Summit Admission',
      desc: 'All keynotes, stage deep-dives, and technical panels with zero schedule clashes.',
      icon: Award,
    },
    {
      title: 'Hot Breakfast & Buffet Lunch',
      desc: 'South Indian morning breakfast, multi-course buffet lunch, and artisanal high-tea coffee.',
      icon: Utensils,
    },
    {
      title: 'Official Builder Swag Kit',
      desc: 'Heavyweight event t-shirt, holographic badge, stickers, and lanyard.',
      icon: Package,
    },
    {
      title: 'Digital Credential Certificate',
      desc: 'Verifiable proof of participation issued by AWS Student Builder Group PICT.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="ticket-dispenser" className="py-20 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b-2 border-purple-900/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-300 bg-purple-100 text-purple-900 text-xs font-mono font-bold uppercase mb-3 shadow-sm">
            <Ticket className="w-3.5 h-3.5 text-purple-700" />
            <span>Pass Dispensary &amp; Inclusions</span>
          </div>

          {/* Solid Non-Gradient Heading */}
          <h2 className="text-3xl sm:text-5xl font-black text-[#260B49] tracking-tight">
            Claim Your Cloud City Pass
          </h2>

          <p className="text-sm sm:text-base text-purple-950/75 mt-2 font-medium">
            Subsidized student admission for verified student builders and developers. Valid college PRN or ID required.
          </p>
        </div>

        {/* Mascot Tip */}
        <div className="flex justify-center mb-8">
          <CityMascotGuide zone="tickets" />
        </div>

        {/* 100% Universal Access Notice Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-white border border-purple-200 shadow-sm flex items-center gap-3 max-w-4xl mx-auto">
          <Info className="w-5 h-5 text-purple-700 shrink-0" />
          <p className="text-xs sm:text-sm font-semibold text-purple-950">
            <strong>Universal Full-Access Guarantee:</strong> There is zero difference in access between ticket categories. Every pass grants 100% full admission to all keynotes, technical sessions, buffet lunch, specialty coffee, and the official swag kit. Only the booking phase price differs.
          </p>
        </div>

        {/* The Machine Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pass Tier Selector + Integrated All Perks Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="text-xs font-mono font-bold text-purple-900 uppercase flex items-center justify-between">
              <span>Step 1: Choose Your Pass Tier</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Phase 1 Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {passes.map((tier, idx) => {
                const isSelected = selectedTier === idx;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setSelectedTier(idx);
                    }}
                    className={`p-5 rounded-2xl border-2 transition-all text-left relative overflow-hidden cursor-pointer ${
                      isSelected
                        ? 'border-purple-900 bg-white shadow-md ring-2 ring-purple-900/15'
                        : 'border-purple-200 bg-white/70 hover:bg-white hover:border-purple-400'
                    }`}
                  >
                    <div className="h-6 flex items-center justify-between mb-3">
                      <span className="inline-flex items-center h-6 px-2.5 rounded-lg text-[10px] font-mono font-black uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-200">
                        {tier.tag}
                      </span>
                      <div className="h-6 flex items-center">
                        {tier.isLive ? (
                          <span className="inline-flex items-center gap-1.5 h-6 px-2 rounded-lg text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            LIVE
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 h-6 px-2 rounded-lg text-[10px] font-mono font-bold text-purple-400 bg-purple-50 border border-purple-100">
                            <Lock className="w-3 h-3 text-purple-400" />
                            <span>LOCKED</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-black text-purple-950 mb-1">
                      {tier.title}
                    </h3>

                    <p className="text-xs text-purple-700/80 mb-3 min-h-[32px]">
                      {tier.subtitle}
                    </p>

                    <div className="pt-2.5 border-t border-purple-100 flex items-center justify-between min-h-[42px]">
                      <span className="text-lg sm:text-xl font-black text-purple-950 font-mono tracking-tight">
                        {tier.displayPrice}
                      </span>
                      <span className="text-[10px] font-mono text-purple-500 font-bold uppercase tracking-wider shrink-0">
                        {tier.isLive ? 'INR NET' : 'PHASE 2'}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-0 right-0 w-3 h-3 bg-purple-900 rounded-bl-lg" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* INTEGRATED: What Every Ticket Unlocks (Formerly LootBoxVault) */}
            <div className="p-6 rounded-3xl bg-white border-2 border-purple-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-purple-100">
                <span className="text-xs font-mono font-black text-purple-950 uppercase tracking-wider flex items-center gap-2">
                  <Package className="w-4 h-4 text-purple-700" />
                  <span>Everything Included In Every Ticket</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Zero Hidden Fees
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {universalPerks.map((perk, idx) => {
                  const Icon = perk.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-purple-950 mb-0.5">{perk.title}</h4>
                        <p className="text-[11px] text-purple-800/80 leading-relaxed font-normal">{perk.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Physical Perforated Tear-off Ticket Stub (5 cols) */}
          <div className="lg:col-span-5">
            <div className="text-xs font-mono font-bold text-purple-900 uppercase mb-2">
              Generated Pass Preview
            </div>

            <div className="p-6 rounded-3xl bg-amber-400 text-slate-950 border-3 border-purple-950 shadow-[0_16px_40px_rgba(245,158,11,0.25)] relative overflow-hidden">
              
              {/* Ticket Top Header: Official Club Emblem */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-purple-950/20">
                <div>
                  <div className="text-[10px] font-mono font-black uppercase tracking-wider text-purple-950/80">
                    ADMIT ONE • COMMUNITY PASS
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight text-purple-950">
                    {currentPass.title}
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-950 p-1 flex items-center justify-center border border-purple-900 shadow-sm">
                  <SBGLogo variant="emblem" size="sm" />
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-3.5 bg-white rounded-2xl border-2 border-purple-950/20 shadow-sm mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-purple-700 uppercase block">
                    TOTAL INVESTMENT
                  </span>
                  <div className="text-3xl font-black text-purple-950 font-mono">
                    {currentPass.isLive ? `₹${finalPrice}` : 'Phase 2 Launch'}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 inline-block">
                    ALL MEALS &amp; SWAG INCLUDED
                  </span>
                  <div className="text-[11px] font-mono font-semibold text-purple-800 mt-1">
                    Community Pass • Pune
                  </div>
                </div>
              </div>

              {/* Universal access guarantee list */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-purple-950 block">
                  ALL PASSES INCLUDE:
                </span>
                <div className="flex items-center gap-2 text-xs font-bold text-purple-950">
                  <Check className="w-4 h-4 text-purple-950 shrink-0" />
                  <span>Full Day All-District Summit Access</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-purple-950">
                  <Check className="w-4 h-4 text-purple-950 shrink-0" />
                  <span>Keynote District &amp; In-Person Cloud Workshops</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-purple-950">
                  <Check className="w-4 h-4 text-purple-950 shrink-0" />
                  <span>Compute Café Full Buffet Lunch &amp; Coffee</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-purple-950">
                  <Check className="w-4 h-4 text-purple-950 shrink-0" />
                  <span>Official Builder Swag Kit &amp; Certificate</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={handleDispenseTicket}
                className="w-full py-4 rounded-2xl bg-purple-950 hover:bg-purple-900 text-amber-300 font-mono font-black text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border border-purple-800"
              >
                <Sparkles className="w-4 h-4" />
                <span>Dispense &amp; Reserve Pass Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Barcode Graphic */}
              <div className="pt-4 mt-4 border-t-2 border-dashed border-purple-950/20 flex items-center justify-between text-[10px] font-mono text-purple-950/70">
                <div className="flex items-center gap-2">
                  <svg className="w-32 h-6" viewBox="0 0 120 24" fill="currentColor">
                    <rect x="0" y="0" width="3" height="24" />
                    <rect x="5" y="0" width="1" height="24" />
                    <rect x="8" y="0" width="4" height="24" />
                    <rect x="15" y="0" width="2" height="24" />
                    <rect x="20" y="0" width="5" height="24" />
                    <rect x="28" y="0" width="2" height="24" />
                    <rect x="33" y="0" width="1" height="24" />
                    <rect x="36" y="0" width="3" height="24" />
                    <rect x="42" y="0" width="6" height="24" />
                    <rect x="51" y="0" width="2" height="24" />
                    <rect x="56" y="0" width="4" height="24" />
                    <rect x="63" y="0" width="1" height="24" />
                    <rect x="67" y="0" width="3" height="24" />
                    <rect x="73" y="0" width="5" height="24" />
                    <rect x="81" y="0" width="2" height="24" />
                    <rect x="86" y="0" width="4" height="24" />
                    <rect x="93" y="0" width="2" height="24" />
                    <rect x="98" y="0" width="5" height="24" />
                    <rect x="106" y="0" width="2" height="24" />
                    <rect x="111" y="0" width="4" height="24" />
                  </svg>
                </div>
                <span className="font-bold">PICT PUNE CHAPTER</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

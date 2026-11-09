import React, { useState } from 'react';
import { 
  Ticket, 
  Sparkles, 
  Check, 
  ShieldCheck,
  Lock,
  Info
} from 'lucide-react';
import { TICKETING_CONFIG } from '../config/ticketing';

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
      accentColor: 'bg-amber-400',
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
      accentColor: 'bg-slate-200',
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
      accentColor: 'bg-emerald-100',
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

  return (
    <section id="ticket-dispenser" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F5EFFE] via-[#EFE6FD] to-[#F8F5FF] border-b-2 border-purple-900/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-300 bg-purple-100 text-purple-900 text-xs font-mono font-bold uppercase mb-3 shadow-sm">
            <Ticket className="w-3.5 h-3.5 text-purple-700" />
            <span>Pass Dispensary</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#260B49] tracking-tight">
            Claim Your Cloud City Pass
          </h2>

          <p className="text-sm sm:text-base text-purple-950/75 mt-2 font-medium">
            Subsidized student admission for Sunday, 7th February 2027 at Dakkhan Banquet Hall, Pune. Valid college PRN or ID required.
          </p>
        </div>

        {/* 100% Universal Access Notice Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-white border border-purple-200 shadow-sm flex items-center gap-3 max-w-4xl mx-auto">
          <Info className="w-5 h-5 text-purple-700 shrink-0" />
          <p className="text-xs sm:text-sm font-semibold text-purple-950">
            <strong>Universal Full-Access Guarantee:</strong> There is zero difference in access between ticket categories. Every pass grants 100% full admission to all keynotes, technical workshops, buffet lunch, specialty coffee, and the official swag kit. Only the booking phase price differs.
          </p>
        </div>

        {/* The Machine Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pass Tier Selector (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="text-xs font-mono font-bold text-purple-900 uppercase flex items-center justify-between">
              <span>Choose Your Pass Tier</span>
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
                        ? 'border-purple-900 bg-white shadow-md scale-[1.02]'
                        : 'border-purple-200 bg-white/70 hover:bg-white hover:border-purple-400'
                    }`}
                  >
                    {/* Top Tag & Status */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-200">
                        {tier.tag}
                      </span>
                      {tier.isLive ? (
                        <span className="text-[10px] font-mono font-bold text-emerald-700 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          LIVE
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-purple-400 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-black text-purple-950 mb-1">
                      {tier.title}
                    </h3>

                    <p className="text-xs text-purple-700/80 mb-3 min-h-[32px]">
                      {tier.subtitle}
                    </p>

                    <div className="pt-2 border-t border-purple-100 flex items-baseline justify-between">
                      <span className="text-2xl font-black text-purple-950 font-mono">
                        {tier.displayPrice}
                      </span>
                      <span className="text-[10px] font-mono text-purple-500 font-bold">
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

            {/* Clean Promo Code Advisory (No Dummy Input) */}
            <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h5 className="text-xs font-mono font-bold text-purple-950 uppercase">
                  Student Club &amp; Community Promo Codes
                </h5>
                <p className="text-xs text-purple-800/80 mt-1 leading-relaxed">
                  Have an institutional or partner discount code from your college club? You can enter it directly on the KonfHub checkout screen to claim your instant registration concession.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Physical Perforated Tear-off Ticket Stub (5 cols) */}
          <div className="lg:col-span-5">
            <div className="text-xs font-mono font-bold text-purple-900 uppercase mb-2">
              Generated Pass Preview
            </div>

            <div className="p-6 rounded-3xl bg-amber-400 text-slate-950 border-3 border-purple-950 shadow-[0_16px_40px_rgba(245,158,11,0.25)] relative overflow-hidden">
              
              {/* Ticket Top Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-purple-950/20">
                <div>
                  <div className="text-[10px] font-mono font-black uppercase tracking-wider text-purple-950/80">
                    ADMIT ONE • COMMUNITY PASS
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight text-purple-950">
                    {currentPass.title}
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-950 text-amber-300 flex items-center justify-center font-black text-sm border border-purple-900">
                  AWS
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
                    ● ALL MEALS &amp; SWAG INCLUDED
                  </span>
                  <div className="text-[11px] font-mono font-semibold text-purple-800 mt-1">
                    07 Feb 2027 • Pune
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

              {/* Dispense CTA Button */}
              {currentPass.isLive ? (
                <>
                  <button
                    type="button"
                    onClick={handleDispenseTicket}
                    className="w-full py-3.5 rounded-2xl text-sm font-black flex items-center justify-center gap-2 cursor-pointer bg-purple-950 hover:bg-purple-900 text-amber-300 shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Book Early Bird Pass (₹{finalPrice}) →</span>
                  </button>
                  <div className="text-[10px] font-mono text-center text-purple-950/80 font-bold mt-2 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Instant reservation via KonfHub secure gateway</span>
                  </div>
                </>
              ) : (
                <div className="w-full p-3.5 rounded-2xl bg-purple-950 text-purple-200 text-xs font-mono font-bold text-center border border-purple-800 flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>This tier unlocks in the next phase!</span>
                </div>
              )}

              {/* Clean SVG Barcode Graphic */}
              <div className="mt-4 pt-3 border-t-2 border-dashed border-purple-950/30 flex items-center justify-between text-[10px] font-mono font-bold text-purple-950">
                <div className="flex items-center gap-1 opacity-80" title="Pass Barcode">
                  <span className="inline-block w-0.5 h-5 bg-purple-950" />
                  <span className="inline-block w-1.5 h-5 bg-purple-950" />
                  <span className="inline-block w-0.5 h-5 bg-purple-950" />
                  <span className="inline-block w-1 h-5 bg-purple-950" />
                  <span className="inline-block w-2 h-5 bg-purple-950" />
                  <span className="inline-block w-0.5 h-5 bg-purple-950" />
                  <span className="inline-block w-1 h-5 bg-purple-950" />
                  <span className="inline-block w-0.5 h-5 bg-purple-950" />
                  <span className="inline-block w-1.5 h-5 bg-purple-950" />
                  <span className="inline-block w-0.5 h-5 bg-purple-950" />
                  <span className="inline-block w-1 h-5 bg-purple-950" />
                </div>
                <span>PICT PUNE CHAPTER • SCD 2027</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-2xl bg-white border border-purple-200 text-xs text-purple-800/80 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Passes are fully transferable up to 48 hours before the event date.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

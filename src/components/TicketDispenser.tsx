import React, { useState } from 'react';
import { 
  Ticket, 
  Sparkles, 
  Check, 
  ShieldCheck,
  Lock,
  Info
} from 'lucide-react';
import { playSound } from '../utils/audio';
import { TICKETING_CONFIG } from '../config/ticketing';

interface TicketDispenserProps {
  onRegisterClick: (passType: string) => void;
}

export const TicketDispenser: React.FC<TicketDispenserProps> = ({ onRegisterClick }) => {
  const [selectedTier, setSelectedTier] = useState<number>(0);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponStatus, setCouponStatus] = useState<{ text: string; isError: boolean } | null>(null);

  const passes = [
    {
      id: 'early_bird',
      title: 'Early Bird Pass',
      tag: 'ACTIVE TIER',
      basePrice: 299,
      isLive: true,
      displayPrice: '₹299',
      subtitle: 'Phase 1 official live quota • Limited seats',
      badge: '● LIVE NOW',
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
      badge: '🔒 COMING SOON',
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
      badge: '🔒 COMING SOON',
      accentColor: 'bg-emerald-100',
    },
  ];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (!clean) return;

    if (clean === 'PICTBUILDER') {
      setDiscountPercent(15);
      setCouponStatus({ text: '🎉 15% PICT Student Builder Discount Applied!', isError: false });
      playSound('click');
    } else if (clean === 'AWSSBG2027') {
      setDiscountPercent(20);
      setCouponStatus({ text: '🚀 20% AWS Community Special Discount Applied!', isError: false });
      playSound('click');
    } else {
      setDiscountPercent(0);
      setCouponStatus({ text: '❌ Invalid coupon. Try "PICTBUILDER" or "AWSSBG2027"', isError: true });
    }
  };

  const currentPass = passes[selectedTier];
  const finalPrice = discountPercent > 0 && currentPass.isLive
    ? Math.round(currentPass.basePrice * (1 - discountPercent / 100)) 
    : currentPass.basePrice;

  const handleDispenseTicket = () => {
    playSound('click');
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-300 bg-purple-100 text-purple-900 text-xs font-mono font-black uppercase mb-3 shadow-[2px_2px_0px_#0F172A]">
            <Ticket className="w-3.5 h-3.5" />
            <span>Pass Dispensary</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#260B49] tracking-tight">
            Claim Your Cloud City Pass
          </h2>

          <p className="text-sm sm:text-base text-purple-950/75 mt-2 font-medium">
            Subsidized student admission for Sunday, 7th February 2027 at Dakkhan Banquet Hall, Pune. Valid college PRN required.
          </p>
        </div>

        {/* 100% Universal Access Notice Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border-2 border-slate-900 shadow-[3px_3px_0px_#0F172A] flex items-center gap-3 max-w-4xl mx-auto">
          <Info className="w-5 h-5 text-amber-700 shrink-0" />
          <p className="text-xs sm:text-sm font-bold text-slate-900">
            <strong>Universal Full-Access Guarantee:</strong> There is zero difference in access between ticket categories! Every pass grants 100% full admission to all keynotes, technical workshops, buffet lunch, specialty coffee, and official swag kit. Only the booking phase price differs.
          </p>
        </div>

        {/* The Machine Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pass Tier Selector (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
              <span>Choose Your Pass Tier</span>
              <span className="text-emerald-600 font-bold">● Phase 1 Active</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {passes.map((pass, pIdx) => {
                const isSelected = selectedTier === pIdx;
                const pFinal = discountPercent > 0 && pass.isLive
                  ? Math.round(pass.basePrice * (1 - discountPercent / 100)) 
                  : pass.basePrice;

                return (
                  <button
                    key={pass.id}
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setSelectedTier(pIdx);
                    }}
                    className={`neo-card p-5 text-left relative overflow-hidden transition-all cursor-pointer ${
                      isSelected
                        ? 'border-3 border-slate-950 bg-amber-50 shadow-[6px_6px_0px_#0F172A]'
                        : 'bg-white opacity-90 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded ${
                        pass.isLive ? 'bg-slate-950 text-amber-400' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {pass.badge}
                      </span>
                      {isSelected && pass.isLive && (
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-950 mb-1">
                      {pass.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mb-3 font-medium leading-tight">
                      {pass.subtitle}
                    </p>

                    <div className="flex items-baseline gap-1.5">
                      {pass.isLive ? (
                        <>
                          <span className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">
                            ₹{pFinal}
                          </span>
                          {discountPercent > 0 && (
                            <span className="text-xs line-through text-slate-400 font-mono font-bold">
                              ₹{pass.basePrice}
                            </span>
                          )}
                          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                            NET
                          </span>
                        </>
                      ) : (
                        <div className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-300">
                          🔒 Next Phase
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Coupon Code Tool */}
            <div className="neo-card p-4 bg-white">
              <span className="text-xs font-mono font-bold text-slate-600 uppercase block mb-2">
                Have a Student Club or Community Coupon?
              </span>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon (e.g. PICTBUILDER)"
                    className="w-full px-3 py-2 text-xs font-mono font-bold uppercase rounded-xl border-2 border-slate-900 bg-slate-50 text-slate-900 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="neo-btn bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {couponStatus && (
                <div
                  className={`mt-2 p-2 rounded-lg text-xs font-mono font-bold text-center ${
                    couponStatus.isError
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {couponStatus.text}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Physical Perforated Tear-off Ticket Stub (5 cols) */}
          <div className="lg:col-span-5">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase mb-2">
              Generated Pass Preview
            </div>

            <div className="neo-card p-6 bg-amber-400 text-slate-950 border-3 border-slate-950 shadow-[8px_8px_0px_#0F172A] relative overflow-hidden">
              
              {/* Ticket Top Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-slate-950">
                <div>
                  <div className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-900">
                    ADMIT ONE • COMMUNITY PASS
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight">
                    {currentPass.title}
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-black text-sm border-2 border-slate-950">
                  AWS
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-3.5 bg-white rounded-xl border-2 border-slate-950 shadow-[3px_3px_0px_#0F172A] mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                    TOTAL INVESTMENT
                  </span>
                  <div className="text-3xl font-black text-slate-950 font-mono">
                    {currentPass.isLive ? `₹${finalPrice}` : 'Phase 2 Launch'}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 inline-block">
                    ● ALL MEALS &amp; SWAG INCLUDED
                  </span>
                  <div className="text-[11px] font-mono font-semibold text-slate-500 mt-1">
                    07 Feb 2027 • Pune
                  </div>
                </div>
              </div>

              {/* Universal access guarantee list */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-900 block">
                  ALL PASSES INCLUDE:
                </span>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Check className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Full Day All-District Summit Access</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Check className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Keynote District &amp; In-Person Cloud Workshops</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Check className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Compute Café Full Buffet Lunch &amp; Coffee</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Check className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Official Builder Swag Kit &amp; Certificate</span>
                </div>
              </div>

              {/* Dispense CTA Button */}
              {currentPass.isLive ? (
                <>
                  <button
                    type="button"
                    onClick={handleDispenseTicket}
                    className="w-full neo-btn bg-slate-950 hover:bg-slate-900 text-amber-400 py-3.5 rounded-2xl text-sm font-black flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_#FFFFFF]"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Book Early Bird Pass (₹{finalPrice}) →</span>
                  </button>
                  <div className="text-[10px] font-mono text-center text-slate-800 font-bold mt-2">
                    🔒 Instant reservation via KonfHub gateway
                  </div>
                </>
              ) : (
                <div className="w-full p-3.5 rounded-2xl bg-slate-900 text-slate-300 text-xs font-mono font-bold text-center border-2 border-slate-950 flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>This tier unlocks in the next phase!</span>
                </div>
              )}

              {/* Barcode Strip */}
              <div className="mt-4 pt-3 border-t-2 border-dashed border-slate-950/40 flex items-center justify-between text-[10px] font-mono font-bold text-slate-800">
                <span>BARCODE: ||||| | |||| ||| ||||</span>
                <span>PICT PUNE CHAPTER</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Passes are fully transferable within 48 hours of event date.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


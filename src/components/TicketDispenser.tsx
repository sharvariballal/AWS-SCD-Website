import React, { useState } from 'react';
import { 
  Ticket, 
  Sparkles, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

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
      id: 'super_early',
      title: 'Super Early Bird',
      tag: 'Fastest Fingers',
      basePrice: 199,
      subtitle: 'Strictly limited to first 150 builders',
      perks: [
        'Full Day All-Track Summit Access',
        'Hands-on GenAI Lab & Hackathon Entry',
        'Limited Edition Heavyweight Event Tee',
        'Hot South Indian Breakfast + Buffet Lunch',
        'Verifiable Digital Credential Certificate',
      ],
      badge: 'BEST VALUE',
      accentColor: 'bg-amber-400',
    },
    {
      id: 'early_bird',
      title: 'Early Bird Pass',
      tag: 'Most Popular',
      basePrice: 299,
      subtitle: 'Limited availability quota',
      perks: [
        'Full Day All-Track Summit Access',
        'Hands-on GenAI Lab & Hackathon Entry',
        'Limited Edition Heavyweight Event Tee',
        'Hot South Indian Breakfast + Buffet Lunch',
        'Verifiable Digital Credential Certificate',
      ],
      badge: 'TRENDING',
      accentColor: 'bg-purple-400',
    },
    {
      id: 'general',
      title: 'General Admission',
      tag: 'Standard Pass',
      basePrice: 399,
      subtitle: 'Full access regular attendee ticket',
      perks: [
        'Full Day All-Track Summit Access',
        'Hands-on GenAI Lab & Hackathon Entry',
        'Limited Edition Heavyweight Event Tee',
        'Hot South Indian Breakfast + Buffet Lunch',
        'Verifiable Digital Credential Certificate',
      ],
      badge: 'STANDARD',
      accentColor: 'bg-slate-200',
    },
    {
      id: 'squad',
      title: 'Builder Squad Pass',
      tag: 'Teams of 3+',
      basePrice: 249,
      subtitle: 'Price per person for team registration',
      perks: [
        'Full Summit Access for 3+ Team Members',
        'Guaranteed Reserved Hackathon Workstation',
        'Full Swag Kit & Tee for Every Member',
        'All Meals, Coffee & High-Tea for All',
        'Team Recognition on Community Hall of Fame',
      ],
      badge: 'SQUAD DISCOUNT',
      accentColor: 'bg-emerald-400',
    },
  ];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (!clean) return;

    if (clean === 'PICTBUILDER') {
      setDiscountPercent(15);
      setCouponStatus({ text: '🎉 15% PICT Student Builder Discount Applied!', isError: false });
      playSound('success');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF9900', '#10B981', '#6366F1'],
        });
      } catch {
        // ignore
      }
    } else if (clean === 'AWSSBG2027') {
      setDiscountPercent(20);
      setCouponStatus({ text: '🚀 20% AWS Community Special Discount Applied!', isError: false });
      playSound('powerup');
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF9900', '#10B981', '#6366F1', '#EC4899'],
        });
      } catch {
        // ignore
      }
    } else {
      setDiscountPercent(0);
      setCouponStatus({ text: '❌ Invalid coupon. Try "PICTBUILDER" or "AWSSBG2027"', isError: true });
      playSound('beep');
    }
  };

  const currentPass = passes[selectedTier];
  const finalPrice = discountPercent > 0 
    ? Math.round(currentPass.basePrice * (1 - discountPercent / 100)) 
    : currentPass.basePrice;

  const handleDispenseTicket = () => {
    playSound('coin');
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FF9900', '#10B981', '#6366F1'],
      });
    } catch {
      // ignore
    }
    onRegisterClick(`${currentPass.title} (₹${finalPrice})`);
  };

  return (
    <section id="ticket-dispenser" className="py-20 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-slate-900 bg-amber-400 text-slate-950 text-xs font-mono font-black uppercase mb-3 shadow-[2px_2px_0px_#0F172A]">
            <Ticket className="w-3.5 h-3.5" />
            <span>Pass Dispensary</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Claim Your Builder Pass
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
            Subsidized student admission for Sunday, 7th February 2027 at Dakkhan Banquet Hall, Pune. Valid college PRN required.
          </p>
        </div>

        {/* The Machine Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pass Tier Selector (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
              <span>Step 1: Choose Your Pass Tier</span>
              <span className="text-emerald-600 font-bold">● Seats Available</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {passes.map((pass, pIdx) => {
                const isSelected = selectedTier === pIdx;
                const pFinal = discountPercent > 0 
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
                        : 'bg-white opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-slate-900 text-amber-400">
                        {pass.badge}
                      </span>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      )}
                    </div>

                    <h3 className="text-lg font-black text-slate-950 mb-1">
                      {pass.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3 font-medium">
                      {pass.subtitle}
                    </p>

                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-950 font-mono">
                        ₹{pFinal}
                      </span>
                      {discountPercent > 0 && (
                        <span className="text-sm line-through text-slate-400 font-mono font-bold">
                          ₹{pass.basePrice}
                        </span>
                      )}
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                        INR NET
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Coupon Code Tool */}
            <div className="neo-card p-4 bg-white">
              <span className="text-xs font-mono font-bold text-slate-600 uppercase block mb-2">
                Step 2: Have a Student Club or Community Coupon?
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
              <div className="p-3 bg-white rounded-xl border-2 border-slate-950 shadow-[3px_3px_0px_#0F172A] mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                    TOTAL INVESTMENT
                  </span>
                  <div className="text-3xl font-black text-slate-950 font-mono">
                    ₹{finalPrice}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 inline-block">
                    ● ALL MEALS INCLUDED
                  </span>
                  <div className="text-[11px] font-mono font-semibold text-slate-500 mt-1">
                    07 Feb 2027 • Pune
                  </div>
                </div>
              </div>

              {/* What's Packed in this pass */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-900 block">
                  INCLUDED PERKS &amp; SWAG:
                </span>
                {currentPass.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Check className="w-4 h-4 text-slate-950 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Dispense CTA Button */}
              <button
                type="button"
                onClick={handleDispenseTicket}
                className="w-full neo-btn bg-slate-950 hover:bg-slate-900 text-amber-400 py-3.5 rounded-2xl text-sm font-black flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_#FFFFFF]"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Dispense &amp; Reserve Pass Now →</span>
              </button>

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

import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Ticket, 
  Check, 
  Tag, 
  ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

interface TicketPassesSectionProps {
  onRegisterClick?: (passType?: string) => void;
}

export const TicketPassesSection: React.FC<TicketPassesSectionProps> = ({ onRegisterClick }) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();

    if (!clean) return;

    if (clean === 'PICTBUILDER') {
      setDiscountPercent(15);
      setCouponMessage({ text: '🎉 15% PICT Student Builder Discount Applied!', isError: false });
      playSound('success');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF9900', '#FFC72C', '#10B981'],
        });
      } catch {
        // ignore
      }
    } else if (clean === 'AWSSBG2027') {
      setDiscountPercent(20);
      setCouponMessage({ text: '🚀 20% AWS Community Special Discount Applied!', isError: false });
      playSound('powerup');
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF9900', '#FFC72C', '#6C5CE7', '#10B981'],
        });
      } catch {
        // ignore
      }
    } else if (clean === 'FREESWAG') {
      setDiscountPercent(10);
      setCouponMessage({ text: '✨ 10% Discount + Bonus Sticker Pack Reserved!', isError: false });
      playSound('coin');
    } else {
      setDiscountPercent(0);
      setCouponMessage({ text: '❌ Invalid coupon. Try "PICTBUILDER" or "AWSSBG2027"', isError: true });
      playSound('beep');
    }
  };

  const handleRegister = (passName: string) => {
    playSound('coin');
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#FF9900', '#FFC72C', '#6C5CE7', '#10B981'],
      });
    } catch {
      // ignore
    }

    if (onRegisterClick) {
      onRegisterClick(passName);
    } else {
      window.open('https://registration-link.com', '_blank', 'noopener,noreferrer');
    }
  };

  const getCalculatedPrice = (basePrice: number) => {
    if (discountPercent === 0) return basePrice;
    return Math.round(basePrice * (1 - discountPercent / 100));
  };

  const passes = [
    {
      id: 'super_early',
      name: 'Super Early Bird',
      tag: 'Fastest Fingers',
      basePrice: 199,
      period: 'Strictly First 150 Seats',
      badge: 'Best Value',
      isPopular: false,
      features: [
        'Full Day Summit & Keynote Access',
        'Hands-on Lab & Hackathon Eligibility',
        'Full Attendee Swag Loot Bag',
        'Gourmet Lunch & Cloud Cafe High Tea',
        'Official Participation Certificate',
      ],
      ctaText: 'Book Super Early Bird',
      accent: 'border-slate-200 bg-white/95 shadow-sm',
    },
    {
      id: 'early_bird',
      name: 'Early Bird Pass',
      tag: 'Trending',
      basePrice: 299,
      period: 'Limited Period',
      badge: 'Most Popular',
      isPopular: true,
      features: [
        'Full Day Summit & Keynote Access',
        'Hands-on Lab & Hackathon Eligibility',
        'Full Attendee Swag Loot Bag',
        'Gourmet Lunch & Cloud Cafe High Tea',
        'Official Participation Certificate',
      ],
      ctaText: 'Book Early Bird Pass',
      accent: 'border-amber-400 bg-white shadow-[0_15px_40px_rgba(255,153,0,0.22)]',
    },
    {
      id: 'general',
      name: 'General Admission',
      tag: 'Standard Tier',
      basePrice: 399,
      period: 'Standard Entry',
      badge: 'Regular',
      isPopular: false,
      features: [
        'Full Day Summit & Keynote Access',
        'Hands-on Lab & Hackathon Eligibility',
        'Full Attendee Swag Loot Bag',
        'Gourmet Lunch & Cloud Cafe High Tea',
        'Official Participation Certificate',
      ],
      ctaText: 'Book General Pass',
      accent: 'border-slate-200 bg-white/95 shadow-sm',
    },
    {
      id: 'group',
      name: 'Builder Squad Pass',
      tag: 'Teams of 3+',
      basePrice: 249,
      period: 'Per Person in Group',
      badge: 'Squad Saver',
      isPopular: false,
      features: [
        'Group Discount for 3+ Builders',
        'Guaranteed Hackathon Table Reserved',
        'Full Swag Loot Bag for Each Member',
        'Gourmet Lunch & High Tea for All',
        'Squad Networking Photo at Booth',
      ],
      ctaText: 'Book Squad Pass',
      accent: 'border-purple-300 bg-white/95 shadow-sm',
    },
  ];

  return (
    <section id="tickets" className="py-24 bg-slate-100/70 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Ticket className="w-3.5 h-3.5 text-amber-500" />
            <span>Registration &amp; Passes</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Book Your Cloud City{' '}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-violet-600 bg-clip-text text-transparent">
              Pass
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            Secure your seat for 31st January 2027 at Dakkhan Banquet Hall, Pune. Subsidized student pricing open to all colleges.
          </p>
        </div>

        {/* Interactive Coupon Code Bar */}
        <div className="max-w-md mx-auto mb-12 p-2 rounded-2xl bg-white border border-slate-200/90 shadow-md">
          <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
            <div className="pl-3 text-slate-400">
              <Tag className="w-4 h-4 text-amber-500" />
            </div>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code (try PICTBUILDER)"
              className="flex-1 bg-transparent py-2 text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none uppercase font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-slate-950 text-white hover:bg-slate-800 font-bold text-xs transition-colors cursor-pointer"
            >
              Apply
            </button>
          </form>

          {couponMessage && (
            <div
              className={`mt-2 p-2 rounded-xl text-xs font-semibold text-center ${
                couponMessage.isError
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              {couponMessage.text}
            </div>
          )}
        </div>

        {/* 4 Blocks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {passes.map((pass, index) => {
            const finalPrice = getCalculatedPrice(pass.basePrice);

            return (
              <div
                key={index}
                className={`rounded-3xl p-6 transition-all duration-300 relative flex flex-col justify-between border ${pass.accent} ${
                  pass.isPopular ? 'scale-[1.02] ring-2 ring-amber-400' : 'hover:-translate-y-1'
                }`}
              >
                {/* Popular Badge */}
                {pass.badge && (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                        pass.isPopular
                          ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-sm border border-amber-300'
                          : 'bg-slate-900 text-white'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      {pass.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-black text-slate-900">{pass.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {pass.tag}
                    </span>
                  </div>

                  <div className="my-5 pb-5 border-b border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        ₹{finalPrice}
                      </span>
                      {discountPercent > 0 && (
                        <span className="text-sm line-through text-slate-400 font-semibold">
                          ₹{pass.basePrice}
                        </span>
                      )}
                      <span className="text-[10px] font-bold text-amber-600 uppercase">
                        {pass.period}
                      </span>
                    </div>
                    {discountPercent > 0 && (
                      <span className="text-[11px] font-bold text-emerald-600 block mt-1">
                        🎉 {discountPercent}% discount active!
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5 mb-6">
                    {pass.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-emerald-700" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handleRegister(pass.name)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                      pass.isPopular
                        ? 'bg-gradient-to-r from-[#FF9900] via-[#FFB703] to-[#FFC72C] text-slate-950 shadow-[0_0_15px_rgba(255,153,0,0.5)] hover:scale-105'
                        : 'bg-slate-950 text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>{pass.ctaText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Student Trust Guarantee */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                100% Student Fair Pricing Guarantee
              </h4>
              <p className="text-xs text-slate-600">
                Ticket fees directly subsidize attendee kits, venue catering, high tea, and serverless lab compute vouchers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-700 shrink-0">
            <span>✓ Instant Ticket Invoice</span>
            <span>✓ Transferable Pass</span>
          </div>
        </div>

      </div>
    </section>
  );
};

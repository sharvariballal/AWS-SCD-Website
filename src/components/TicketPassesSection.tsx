import React from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Ticket, 
  Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TicketPassesSectionProps {
  onRegisterClick?: () => void;
}

export const TicketPassesSection: React.FC<TicketPassesSectionProps> = ({ onRegisterClick }) => {
  const handleRegister = () => {
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
      onRegisterClick();
    } else {
      window.open('https://registration-link.com', '_blank', 'noopener,noreferrer');
    }
  };

  const passes = [
    {
      name: 'Super Early Bird',
      tag: 'Limited Seats',
      price: '₹199',
      period: 'Fastest Fingers First',
      badge: 'Best Value',
      isPopular: false,
      features: [
        'Full Day Summit Access',
        'Keynotes & Hands-on Labs',
        'Official Event Swag Kit',
        'Certificate of Participation',
      ],
      ctaText: 'Book Super Early Bird',
      accent: 'border-slate-200 bg-white/90 shadow-sm',
    },
    {
      name: 'Early Bird',
      tag: 'Popular',
      price: '₹299',
      period: 'Limited Period',
      badge: 'Trending',
      isPopular: true,
      features: [
        'Full Day Summit Access',
        'Keynotes & Hands-on Labs',
        'Official Event Swag Kit',
        'Certificate of Participation',
      ],
      ctaText: 'Book Early Bird',
      accent: 'border-amber-400 bg-white shadow-[0_15px_40px_rgba(255,153,0,0.22)]',
    },
    {
      name: 'General',
      tag: 'Standard Pass',
      price: '₹399',
      period: 'Regular Admission',
      badge: 'Standard',
      isPopular: false,
      features: [
        'Full Day Summit Access',
        'Keynotes & Hands-on Labs',
        'Official Event Swag Kit',
        'Certificate of Participation',
      ],
      ctaText: 'Book General Pass',
      accent: 'border-slate-200 bg-white/90 shadow-sm',
    },
    {
      name: 'Group Discount',
      tag: 'Teams of 3+',
      price: '₹249',
      period: 'Per Person in Group',
      badge: 'Builder Squad',
      isPopular: false,
      features: [
        'Discount for Groups (3+ Members)',
        'Full Day Summit Access for All',
        'Official Event Swag Kits',
        'Certificates of Participation',
      ],
      ctaText: 'Book Group Pass',
      accent: 'border-slate-200 bg-white/90 shadow-sm',
    },
  ];

  return (
    <section id="tickets" className="py-24 bg-slate-100/70 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Ticket className="w-3.5 h-3.5 text-amber-500" />
            <span>Registration &amp; Tickets</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Book Your Cloud City Pass
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            Secure your seat for 31st January 2027 at Dakkhan Banquet Hall, Pune.
          </p>
        </div>

        {/* 4 Blocks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {passes.map((pass, index) => (
            <div
              key={index}
              className={`rounded-3xl p-6 transition-all duration-300 relative flex flex-col justify-between border ${pass.accent} ${
                pass.isPopular ? 'scale-[1.02] ring-2 ring-amber-400' : 'hover:-translate-y-1'
              }`}
            >
              {/* Popular Badge */}
              {pass.isPopular && (
                <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-sm border border-amber-300">
                    <Sparkles className="w-3 h-3" />
                    {pass.badge}
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-extrabold text-slate-900">{pass.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {pass.tag}
                  </span>
                </div>

                <div className="my-5 pb-5 border-b border-slate-100">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      {pass.price}
                    </span>
                    <span className="text-[11px] font-bold text-amber-600 uppercase">
                      {pass.period}
                    </span>
                  </div>
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
                  onClick={handleRegister}
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
          ))}
        </div>
      </div>
    </section>
  );
};

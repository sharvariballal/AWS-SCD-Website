import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  ExternalLink, 
  Ticket, 
  ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [ticketType, setTicketType] = useState<string>('super_early');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FF9900', '#FFC72C', '#6C5CE7', '#10B981'],
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open('https://registration-link.com', '_blank', 'noopener,noreferrer');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close registration modal"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">You&apos;re All Set!</h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              We&apos;ve initiated your registration pass for Cloud City 2027. The official registration
              portal has opened in a new tab to complete your payment and credentials.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://registration-link.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue on Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl font-bold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Cloud City 2027 • 31st Jan
            </div>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              Book Your Summit Pass
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Dakkhan Banquet Hall | Ambegoan | Katraj | Nahre, Pune
            </p>

            {/* 4 pass options in INR */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                { id: 'super_early', label: 'Super Early Bird', price: '₹199' },
                { id: 'early', label: 'Early Bird', price: '₹299' },
                { id: 'general', label: 'General Pass', price: '₹399' },
                { id: 'group', label: 'Group Discount', price: '₹249' },
              ].map((p) => {
                const active = ticketType === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setTicketType(p.id)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      active
                        ? 'border-amber-400 bg-amber-50/80 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className={`text-xs font-bold ${active ? 'text-slate-950' : 'text-slate-700'}`}>
                        {p.label}
                      </div>
                      <div className="text-[11px] font-extrabold text-amber-600">{p.price}</div>
                    </div>
                    <Ticket className={`w-4 h-4 ${active ? 'text-amber-600' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com or name@pict.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-black text-sm bg-gradient-to-r from-[#FF9900] via-[#FFB703] to-[#FFC72C] text-slate-950 shadow-[0_0_20px_rgba(255,153,0,0.4)] hover:shadow-[0_0_28px_rgba(255,153,0,0.6)] hover:scale-[1.02] active:scale-98 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Securing Pass...</span>
                  ) : (
                    <>
                      <span>Proceed to Ticket Booking</span>
                      <ExternalLink className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Redirects to https://registration-link.com in new tab</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

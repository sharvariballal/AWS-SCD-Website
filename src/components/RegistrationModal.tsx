import React, { useState } from 'react';
import { 
  X, 
  Check, 
  QrCode 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPass?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ 
  isOpen, 
  onClose,
  selectedPass 
}) => {
  const [ticketType, setTicketType] = useState<string>(selectedPass || 'Early Bird Pass (₹299)');
  const [prevPass, setPrevPass] = useState(selectedPass);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [prn, setPrn] = useState('');
  const [gradYear, setGradYear] = useState('2027');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (selectedPass !== prevPass) {
    setPrevPass(selectedPass);
    if (selectedPass) {
      setTicketType(selectedPass);
    }
  }

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
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />

        {/* Close Button */}
        <button
          onClick={handleReset}
          aria-label="Close registration modal"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">
                STUDENT BUILDER REGISTRATION
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-1">
              Join Cloud City 2027
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Complete your verification details to secure your student subsidized pass for Feb 7, 2027.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pass Tier Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Selected Pass Tier
                </label>
                <select
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-xs sm:text-sm focus:border-amber-400 focus:bg-white focus:outline-none transition-colors"
                >
                  <option value="Early Bird Pass (₹299)">Early Bird Pass — ₹299 (Active)</option>
                  <option value="Regular Pass (Phase 2)">Regular Pass — (Phase 2)</option>
                  <option value="Group Discount Pass (Teams of 3+)">Group Discount Pass (Teams of 3+)</option>
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name (For Certificate &amp; Smart Badge) *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aditi Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs sm:text-sm focus:border-amber-400 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address (For Ticket QR &amp; ICS) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aditi@college.edu or personal email"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs sm:text-sm focus:border-amber-400 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              {/* College & PRN Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    College / University *
                  </label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. PICT Pune / COEP / MIT"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:border-amber-400 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Student ID / PRN *
                  </label>
                  <input
                    type="text"
                    required
                    value={prn}
                    onChange={(e) => setPrn(e.target.value)}
                    placeholder="e.g. 32178 or PRN"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:border-amber-400 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Graduation Year */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Graduation Year
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['2026', '2027', '2028', '2029'].map((yr) => (
                    <button
                      type="button"
                      key={yr}
                      onClick={() => setGradYear(yr)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                        gradYear === yr
                          ? 'bg-amber-400 border-amber-500 text-slate-950'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms note */}
              <p className="text-[11px] text-slate-500 leading-tight">
                By registering, you agree to the AWS Student Community Day Code of Conduct and student ID verification at the entry gates.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 shadow-lg hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Confirming Credentials...' : 'Proceed to Reserve Seat →'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Instant Mock Pass Card Display */
          <div className="text-center py-4 animate-in fade-in">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Check className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-1">
              Seat Reserved, Builder!
            </h3>
            <p className="text-xs text-slate-600 mb-5">
              Your registration slot has been held for AWS Student Community Day 2027 at PICT Pune.
            </p>

            {/* Mock Digital Badge */}
            <div className="p-4 rounded-2xl bg-gradient-to-tr from-[#0D1B2A] to-slate-800 text-white text-left relative overflow-hidden mb-6 shadow-xl border border-amber-400/30">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-3">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
                    AWS SBG PICT • CLOUD CITY 2027
                  </span>
                  <div className="text-base font-black text-white">{fullName || 'Student Builder'}</div>
                  <div className="text-xs text-slate-300">{college || 'PICT Pune'} • Class of {gradYear}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shrink-0">
                  <QrCode className="w-10 h-10 text-slate-950" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>PASS: {ticketType.split('—')[0]}</span>
                <span className="text-emerald-400 font-bold">STATUS: CONFIRMED</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

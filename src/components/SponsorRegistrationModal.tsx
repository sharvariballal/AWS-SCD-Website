import React, { useState } from 'react';
import { X, Award, Check, ArrowRight, Download } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SponsorRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SponsorRegistrationModal: React.FC<SponsorRegistrationModalProps> = ({ isOpen, onClose }) => {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tierInterest, setTierInterest] = useState('gold');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('deploy');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-3 border-slate-950 relative overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-indigo-500" />

        {/* Close Button */}
        <button
          onClick={handleReset}
          aria-label="Close sponsor inquiry modal"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-slate-900 text-amber-800 flex items-center justify-center mx-auto shadow-[3px_3px_0px_#0F172A]">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-950">
              Sponsorship Inquiry Sent!
            </h3>

            <p className="text-sm text-slate-600 max-w-sm mx-auto font-medium">
              Thank you, <strong>{contactName}</strong> from <strong>{companyName}</strong>. Our partnership lead from AWS Student Builder Group PICT will share the sponsorship deck and connect with you shortly.
            </p>

            <button
              onClick={handleReset}
              className="neo-btn bg-slate-950 text-white px-6 py-2.5 rounded-xl text-xs font-black cursor-pointer shadow-[2px_2px_0px_#0F172A]"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[11px] font-black uppercase">
                Partner With Us
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-950 tracking-tight mb-1">
              Become a Cloud City Sponsor
            </h3>
            <p className="text-xs text-slate-500 font-medium mb-6">
              Connect your brand, developer tools, or recruitment pipeline with 1,000+ enthusiastic student builders.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Cloud Inc."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Official Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@acme.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                  Tier of Interest
                </label>
                <select
                  value={tierInterest}
                  onChange={(e) => setTierInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                >
                  <option value="title">Title Partner (Main Event Headliner)</option>
                  <option value="platinum">Platinum Partner (Booth & Keynote Slot)</option>
                  <option value="gold">Gold Partner (Swag Box & Coffee Kiosk Sponsor)</option>
                  <option value="community">Community / Student Tech Club Partner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                  Message / Specific Goals (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your developer hiring, product demo, or branding objectives..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full neo-btn bg-slate-950 text-amber-400 hover:bg-slate-900 py-3 rounded-2xl text-sm font-black flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#FF9900] mt-2"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Submit Sponsorship Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <a
                  href="/brochure.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-700 hover:text-slate-950 font-bold underline"
                >
                  <Download className="w-3.5 h-3.5 text-amber-600" />
                  <span>Download SCD 2027 Sponsorship Deck (.PDF)</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

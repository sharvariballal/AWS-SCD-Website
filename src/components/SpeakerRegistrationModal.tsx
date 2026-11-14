import React, { useState } from 'react';
import { X, Mic2, Check, ArrowRight, Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SpeakerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpeakerRegistrationModal: React.FC<SpeakerRegistrationModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [talkTitle, setTalkTitle] = useState('');
  const [track, setTrack] = useState('cloud_systems');
  const [abstract, setAbstract] = useState('');
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
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-purple-500 via-cyan-400 to-indigo-500" />

        {/* Close Button */}
        <button
          onClick={handleReset}
          aria-label="Close CFP modal"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 border-2 border-slate-900 text-purple-700 flex items-center justify-center mx-auto shadow-[3px_3px_0px_#0F172A]">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-950">
              CFP Proposal Received!
            </h3>

            <p className="text-sm text-slate-600 max-w-sm mx-auto font-medium">
              Thank you, <strong>{fullName}</strong>. The AWS Student Builder Group review committee will evaluate your talk: <em>&ldquo;{talkTitle}&rdquo;</em> and get back to you via email.
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
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 font-mono text-[11px] font-black uppercase">
                Call for Speakers (CFP)
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-950 tracking-tight mb-1">
              Apply to Speak at Cloud City
            </h3>
            <p className="text-xs text-slate-500 font-medium mb-6">
              Present your cloud architecture, serverless systems, or AI agents to 1,000+ student builders.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Chen"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Current Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Solutions Architect / Student"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                  Company / College / Organization *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PICT / AWS Hero / Tech Startup"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                  Proposed Talk Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scaling Resilient Serverless Workflows on AWS"
                  value={talkTitle}
                  onChange={(e) => setTalkTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                  Track Category
                </label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                >
                  <option value="cloud_systems">Track A • Cloud Systems & Architecture</option>
                  <option value="genai_agents">Track B • Generative AI & Autonomous Agents</option>
                  <option value="devops_scale">Track C • DevOps, Containers & Platform Engineering</option>
                  <option value="student_showcase">Student Builder Showcase & Lightning Talk</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                  Short Abstract / Outline (2-3 sentences) *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Briefly describe what attendees will learn from your session..."
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <button
                type="submit"
                className="w-full neo-btn bg-slate-950 text-white hover:bg-slate-900 py-3 rounded-2xl text-sm font-black flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#A855F7] mt-2"
              >
                <Mic2 className="w-4 h-4 text-purple-400" />
                <span>Submit Talk Proposal (CFP)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <a
                  href="https://forms.gle/aws-sbg-cfp"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-mono text-purple-700 hover:underline flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Prefer Google Forms? Click here to submit via external form</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { X, ShieldCheck, Heart, Mail } from 'lucide-react';

interface CodeOfConductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeOfConductModal: React.FC<CodeOfConductModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[85vh] overflow-y-auto">
        {/* Top Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close Code of Conduct"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Community Code of Conduct
            </h3>
            <span className="text-xs text-slate-500">
              AWS Student Community Day 2027 • PICT Pune
            </span>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            AWS Student Builder Group PICT is dedicated to providing a respectful, harassment-free, and inclusive conference experience for everyone, regardless of gender, sexual orientation, disability, physical appearance, body size, race, ethnicity, or religion.
          </p>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80">
            <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-1 text-sm">
              <Heart className="w-4 h-4 text-amber-600" />
              Our Core Builder Values
            </h4>
            <ul className="list-disc list-inside space-y-1 text-xs text-amber-800">
              <li><strong>Be Welcoming:</strong> Welcome beginners and cloud learners of all backgrounds.</li>
              <li><strong>Be Respectful:</strong> Value differing viewpoints and constructive technical discussions.</li>
              <li><strong>Support Fellow Builders:</strong> Share knowledge generously during workshops and hackathons.</li>
            </ul>
          </div>

          <h4 className="font-bold text-slate-900 text-sm">Unacceptable Behavior</h4>
          <p className="text-xs text-slate-600">
            Harassment in any form, including offensive comments, intimidation, stalking, unauthorized photography or recording, sustained disruption of talks, inappropriate physical contact, or unwelcome sexual attention will not be tolerated. Participants asked to stop any harassing behavior are expected to comply immediately.
          </p>

          <h4 className="font-bold text-slate-900 text-sm">Reporting &amp; Enforcement</h4>
          <p className="text-xs text-slate-600">
            If you are being harassed, notice that someone else is being harassed, or have any other concerns, please contact an organizer immediately. Event staff can be identified by their special &quot;AWS SBG Core Team&quot; badges and lanyards.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Emergency / Direct Report Email: <strong>conduct@awssbgpict.in</strong></span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            I Understand &amp; Agree
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Calendar, 
  Mic2, 
  Clock, 
  Lock, 
  Sparkles, 
  ArrowRight,
  Radio
} from 'lucide-react';

interface StageProgramSectionProps {
  onOpenCFPModal?: () => void;
}

export const StageProgramSection: React.FC<StageProgramSectionProps> = ({ onOpenCFPModal }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'speakers'>('schedule');

  const handleOpenCFP = () => {
    if (onOpenCFPModal) {
      onOpenCFPModal();
    } else {
      window.open('https://forms.gle/aws-sbg-cfp', '_blank');
    }
  };

  return (
    <section id="stage-program" className="py-20 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b-2 border-purple-900/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-300 bg-purple-100 text-purple-900 text-xs font-mono font-bold uppercase mb-3 shadow-sm">
              <Radio className="w-3.5 h-3.5 text-purple-700" />
              <span>Grand Auditorium &amp; Stage</span>
            </div>
            {/* Solid Non-Gradient Typography */}
            <h2 className="text-3xl sm:text-5xl font-black text-[#260B49] tracking-tight">
              Summit Agenda &amp; Speakers
            </h2>
            <p className="text-sm sm:text-base text-purple-950/75 mt-2 max-w-2xl font-medium">
              A curated masterclass program featuring industry keynotes, live system architecture demos, and panels.
            </p>
          </div>

          {/* Mode Switcher Pills */}
          <div className="grid grid-cols-2 sm:flex items-center gap-2 bg-purple-100/80 p-1.5 rounded-2xl border border-purple-200 w-full sm:w-auto self-stretch sm:self-auto">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 text-center ${
                activeTab === 'schedule'
                  ? 'bg-purple-950 text-amber-300 shadow-md shadow-purple-950/20'
                  : 'text-purple-900 hover:text-purple-950'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agenda Timeline</span>
            </button>

            <button
              onClick={() => setActiveTab('speakers')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 text-center ${
                activeTab === 'speakers'
                  ? 'bg-purple-950 text-amber-300 shadow-md shadow-purple-950/20'
                  : 'text-purple-900 hover:text-purple-950'
              }`}
            >
              <Mic2 className="w-3.5 h-3.5" />
              <span>Speaker Roster &amp; CFP</span>
            </button>
          </div>
        </div>

        {/* Unified 2-Column Content Layout (Or Tabbed on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* =========================================================================
              Column A: Schedule & Tracks (6 cols)
              ========================================================================= */}
          <div className={`lg:col-span-6 flex flex-col justify-between ${activeTab === 'schedule' ? 'block' : 'hidden lg:flex'}`}>
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-purple-200 shadow-[0_16px_40px_rgba(76,29,149,0.08)] h-full flex flex-col justify-between relative overflow-hidden">
              
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-purple-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-700" />
                    <span className="text-xs font-mono font-bold text-purple-900 uppercase">
                      Master Summit Schedule
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                    PHASE 2 REVEAL
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#260B49] mb-2">
                  Curated Sequential Program
                </h3>
                <p className="text-xs sm:text-sm text-purple-800/80 leading-relaxed font-normal mb-6">
                  Keynotes, deep-dive system design sessions, and hands-on workshops run sequentially in the central hall.
                </p>

                {/* Blank Clean Skeleton Cards (No Fake Text) */}
                <div className="space-y-3 blur-[4px] opacity-30 select-none pointer-events-none mb-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 flex items-center justify-between"
                    >
                      <div className="space-y-2 w-3/4">
                        <div className="w-24 h-3 rounded-full bg-purple-300" />
                        <div className="w-3/5 h-4 rounded-md bg-purple-900/30" />
                      </div>
                      <div className="w-16 h-5 rounded-md bg-purple-200" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Note & Calendar Button */}
              <div className="pt-4 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs font-mono text-purple-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  <span>08:30 AM – 06:00 PM IST • Sunday</span>
                </div>

                <button
                  disabled
                  title="Calendar sync unlocks with final agenda drop"
                  className="px-4 py-2 rounded-xl text-xs font-bold font-mono border border-purple-200 bg-purple-50 text-purple-400 cursor-not-allowed flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3" />
                  <span>Calendar (.ICS) Locked</span>
                </button>
              </div>

            </div>
          </div>

          {/* =========================================================================
              Column B: Speakers District & CFP (6 cols)
              ========================================================================= */}
          <div className={`lg:col-span-6 flex flex-col justify-between ${activeTab === 'speakers' ? 'block' : 'hidden lg:flex'}`}>
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1E0938] border-2 border-purple-500/40 shadow-[0_20px_50px_rgba(76,29,149,0.2)] text-white h-full flex flex-col justify-between relative overflow-hidden">
              
              {/* Background ambient texture */}
              <div className="absolute inset-0 bg-[radial-gradient(#C4B5FD_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-purple-800/60">
                  <div className="flex items-center gap-2">
                    <Mic2 className="w-4 h-4 text-amber-300" />
                    <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                      Speakers &amp; Mentors
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-900 border border-purple-400/40 text-purple-200">
                    CALL FOR SPEAKERS OPEN
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white mb-2">
                  Industry Leaders &amp; Community Heroes
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed font-normal mb-6">
                  Our review committee is finalizing keynotes from AWS Community Heroes, Solutions Architects, and pioneering student founders.
                </p>

                {/* Blank Clean Skeleton Cards (No Fake Text) */}
                <div className="grid grid-cols-3 gap-2.5 blur-[2px] opacity-40 select-none pointer-events-none mb-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-400/20 flex flex-col justify-between space-y-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-800/60 animate-pulse" />
                      <div className="space-y-1.5">
                        <div className="w-3/4 h-3 rounded bg-purple-700/50" />
                        <div className="w-1/2 h-2.5 rounded bg-purple-800/30" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CFP Ingress Button */}
              <div className="relative z-10 pt-4 border-t border-purple-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-purple-200">
                  <span className="block font-bold text-white">Have a talk or architecture story?</span>
                  <span className="text-[11px] text-purple-300">Open for students and professionals.</span>
                </div>

                <button
                  onClick={handleOpenCFP}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-xs sm:text-sm font-mono flex items-center gap-1.5 shadow-md shadow-amber-400/20 transition-transform hover:scale-105 cursor-pointer shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Submit Talk (CFP)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

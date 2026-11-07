import React from 'react';
import { Mic2, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SpeakerShowcaseProps {
  onOpenCFPModal?: () => void;
}

export const SpeakerShowcase: React.FC<SpeakerShowcaseProps> = ({ onOpenCFPModal }) => {
  const teaserSpeakers = [
    {
      role: 'AWS Community Hero',
      specialty: 'Autonomous Multi-Agent Grids & Serverless',
      badge: 'KEYNOTE',
      avatarColor: 'bg-amber-400 text-slate-950',
    },
    {
      role: 'Principal Solutions Architect',
      specialty: 'Petabyte-Scale Data Lakes & Bedrock AI',
      badge: 'ARCHITECT PANEL',
      avatarColor: 'bg-indigo-400 text-white',
    },
    {
      role: 'Staff Platform Engineer',
      specialty: 'EKS Clusters & Zero-Cold-Start Strategies',
      badge: 'TECH DEEP-DIVE',
      avatarColor: 'bg-emerald-400 text-slate-950',
    },
  ];

  const handleOpenCFP = () => {
    playSound('click');
    if (onOpenCFPModal) {
      onOpenCFPModal();
    } else {
      window.open('https://forms.gle/aws-sbg-cfp', '_blank');
    }
  };

  return (
    <section id="speakers-studio" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-slate-900 bg-amber-400 text-slate-950 text-xs font-mono font-black uppercase mb-3 shadow-[2px_2px_0px_#0F172A]">
              <Mic2 className="w-3.5 h-3.5" />
              <span>Industry Heavyweights</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Featured Speakers &amp; Mentors
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl font-medium">
              Learn directly from AWS Community Heroes, principal architects, and engineering leaders on the main stage.
            </p>
          </div>

          <button
            onClick={handleOpenCFP}
            className="neo-btn bg-slate-950 hover:bg-slate-900 text-amber-400 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer self-start md:self-auto shadow-[3px_3px_0px_#FF9900]"
          >
            <Mic2 className="w-4 h-4 text-amber-400" />
            <span>Apply to Speak (CFP Open)</span>
          </button>
        </div>

        {/* Master Cohesive Teaser Block */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border-3 border-slate-950 shadow-[8px_8px_0px_#0F172A] text-white relative overflow-hidden">
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-mono font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>🔒 SPEAKERS REVEALING IN PHASE 2</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Curated Industry Lineup Under Final Review
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto">
              Our review committee is finalizing keynotes from prominent AWS Community Heroes, AWS User Group mentors, and pioneering student founders. All sessions will be held sequentially on the grand stage inside Dakkhan Hall.
            </p>

            {/* Silhouette Teaser Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {teaserSpeakers.map((sp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 backdrop-blur-sm text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-9 h-9 rounded-xl ${sp.avatarColor} border border-slate-900 flex items-center justify-center font-black text-sm`}>
                        <Mic2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                        {sp.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-white">{sp.role}</h4>
                    <p className="text-xs text-slate-400 mt-1 font-medium">{sp.specialty}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Confirmed Roster</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CFP Callout & Button */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-xs text-slate-300 text-center sm:text-left">
                <strong className="text-white block font-sans">Have a cloud story or architecture lesson to share?</strong>
                <span>Our Call for Speakers is officially open for students and professionals.</span>
              </div>

              <button
                onClick={handleOpenCFP}
                className="neo-btn bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_#FFFFFF] shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit Talk to CFP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

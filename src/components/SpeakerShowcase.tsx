import React from 'react';
import { Mic2, Sparkles, ArrowRight } from 'lucide-react';

interface SpeakerShowcaseProps {
  onOpenCFPModal?: () => void;
}

export const SpeakerShowcase: React.FC<SpeakerShowcaseProps> = ({ onOpenCFPModal }) => {
  const handleOpenCFP = () => {
    if (onOpenCFPModal) {
      onOpenCFPModal();
    } else {
      window.open('https://forms.gle/aws-sbg-cfp', '_blank');
    }
  };

  return (
    <section id="speakers-studio" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7FF] via-[#F5EFFE] to-[#FAF7FF] border-b-2 border-purple-900/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-300 bg-purple-100 text-purple-900 text-xs font-mono font-black uppercase mb-3 shadow-sm">
              <Mic2 className="w-3.5 h-3.5 text-purple-700" />
              <span>Industry Heavyweights</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#260B49] tracking-tight">
              Featured Speakers &amp; Mentors
            </h2>
            <p className="text-sm sm:text-base text-purple-950/75 mt-2 max-w-xl font-medium">
              Learn directly from AWS Community Heroes, principal architects, and engineering leaders on the main stage.
            </p>
          </div>

          <button
            onClick={handleOpenCFP}
            className="bg-purple-950 hover:bg-purple-900 text-amber-300 border border-purple-400/40 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer self-start md:self-auto shadow-md transition-all hover:scale-105"
          >
            <Mic2 className="w-4 h-4 text-amber-300" />
            <span>Apply to Speak (CFP Open)</span>
          </button>
        </div>

        {/* Master Cohesive Teaser Block */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-tr from-[#250C48] via-[#351564] to-[#1F0A3B] border-2 border-purple-400/30 shadow-[0_20px_50px_rgba(76,29,149,0.25)] text-white relative overflow-hidden">
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#C4B5FD_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/80 border border-purple-400/40 text-amber-300 text-xs font-mono font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>SPEAKERS REVEALING IN PHASE 2</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Curated Industry Lineup Under Final Review
            </h3>

            <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed font-normal max-w-2xl mx-auto">
              Our review committee is finalizing keynotes from prominent AWS Community Heroes, AWS User Group mentors, and student builders. All sessions will be held sequentially on the grand stage inside Dakkhan Hall.
            </p>

            {/* Blank Card Silhouettes (No Text) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 opacity-50 blur-[0.5px]">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-purple-950/60 border border-purple-400/20 backdrop-blur-sm text-left flex flex-col justify-between space-y-4 shadow-inner"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-purple-800/60 animate-pulse" />
                    <div className="w-16 h-4 rounded-md bg-purple-800/40" />
                  </div>
                  <div className="space-y-2 pt-1">
                    <div className="w-3/4 h-4 rounded bg-purple-700/50" />
                    <div className="w-full h-3 rounded bg-purple-800/30" />
                  </div>
                  <div className="w-1/2 h-3 rounded bg-purple-800/20 pt-2" />
                </div>
              ))}
            </div>

            {/* CFP Callout & Button */}
            <div className="pt-6 border-t border-purple-800/60 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-xs text-purple-200 text-center sm:text-left">
                <strong className="text-white block font-sans">Have a cloud story or architecture lesson to share?</strong>
                <span>Our Call for Speakers is officially open for students and professionals.</span>
              </div>

              <button
                onClick={handleOpenCFP}
                className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-purple-950 px-6 py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-400/30 shrink-0 transition-transform hover:scale-105"
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

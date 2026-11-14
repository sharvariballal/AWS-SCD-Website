import React, { useState } from 'react';
import {
  Calendar,
  Mic2,
  Sparkles,
  ArrowRight,
  Coffee,
  Terminal,
  Award,
  Zap,
  Users
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface StageProgramSectionProps {
  onOpenCFPModal?: () => void;
}

export const StageProgramSection: React.FC<StageProgramSectionProps> = ({ onOpenCFPModal }) => {
  const [activeTrack, setActiveTrack] = useState<'main' | 'cfp'>('main');
  const headerRef = useScrollReveal();
  const timelineRef = useScrollReveal();

  const handleOpenCFP = () => {
    if (onOpenCFPModal) {
      onOpenCFPModal();
    } else {
      window.open('https://forms.gle/aws-sbg-cfp', '_blank');
    }
  };

  const timelineEvents = [
    {
      time: '08:30 AM',
      title: 'Ingress, Smart Badging & Breakfast',
      desc: 'Check-in at Dakkhan Banquet Hall, claim physical builder swag kit, and morning South Indian breakfast & filter coffee.',
      icon: Coffee,
      tag: 'CHECK-IN',
    },
    {
      time: '09:30 AM',
      title: 'Opening Keynote: Cloud City 2027',
      desc: 'Architecting next-gen scalable systems with AWS Community Heroes, Solutions Architects, and pioneering student founders.',
      icon: Zap,
      tag: 'KEYNOTE',
    },
    {
      time: '11:30 AM',
      title: 'Production Deep-Dives & GenAI Masterclass',
      desc: 'Live architecture demonstrations, autonomous multimodal agents with Amazon Bedrock, and serverless optimization.',
      icon: Terminal,
      tag: 'MASTERCLASS',
    },
    {
      time: '01:00 PM',
      title: 'Compute Café Full Buffet Lunch',
      desc: 'Lavish multi-course banquet lunch included with every pass, hallway track discussions, and mentor roundtables.',
      icon: Users,
      tag: 'NETWORKING',
    },
    {
      time: '02:30 PM',
      title: 'Arcade Alley & Architecture Challenge',
      desc: 'Competitive architectural debugging sprint, challenge tracks with direct mentorship from Solutions Architects.',
      icon: Terminal,
      tag: 'HANDS-ON',
    },
    {
      time: '05:00 PM',
      title: 'Awards, Swag Drops & Closing Keynote',
      desc: 'Announcing challenge bounties, cloud credits, digital certificates of attendance, and community celebration.',
      icon: Award,
      tag: 'AWARDS',
    },
  ];

  return (
    <section id="stage-program" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b border-white/5">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div ref={headerRef} className="sr-reveal flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 mb-2 uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              <span className="text-slate-500">//</span>
              <span>Summit Schedule &amp; CFP</span>
            </div>
            <h2 className="font-anton text-3xl sm:text-5xl text-white tracking-tight">
              SUMMIT <span className="text-cyan-400">AGENDA</span> &amp; TIMELINE
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
              A curated single-track masterclass program engineered with zero scheduling conflicts.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTrack('main')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${activeTrack === 'main'
                ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                : 'text-slate-300 hover:text-white'
                }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Full Schedule</span>
            </button>

            <button
              onClick={() => setActiveTrack('cfp')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${activeTrack === 'cfp'
                ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                : 'text-slate-300 hover:text-white'
                }`}
            >
              <Mic2 className="w-3.5 h-3.5" />
              <span>Call For Speakers</span>
            </button>
          </div>
        </div>

        {/* Content Body: Timeline View vs CFP View */}
        {activeTrack === 'main' ? (
          <div ref={timelineRef} className="sr-reveal space-y-3">
            {timelineEvents.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-4 sm:p-5 rounded-2xl bg-[#0D1B2A]/80 hover:bg-[#0D1B2A] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Left: Time & Icon */}
                  <div className="flex items-center gap-3.5 sm:w-56 shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.3)] transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-mono text-sm font-black text-cyan-400 tracking-tight">
                        {item.time}
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Title & 1-line Description */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-anton text-lg sm:text-xl text-white tracking-tight mb-1 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Sleek CFP Card */
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0D1B2A]/90 border border-cyan-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-400" />

            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                STAGE SPEAKER ROSTER // PHASE 2
              </span>
              <h3 className="font-anton text-3xl sm:text-4xl text-white tracking-tight">
                HAVE A CLOUD ARCHITECTURE STORY TO SHARE?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                We welcome lightning talks, architectural teardowns, and live production demos from students, AWS Community Heroes, and industry architects.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={handleOpenCFP}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm font-mono flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.4)] cursor-pointer transition-all hover:scale-105"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Talk Proposal (CFP)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTrack('main')}
                  className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 font-mono text-xs font-bold transition-all text-center"
                >
                  Back to Timeline
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

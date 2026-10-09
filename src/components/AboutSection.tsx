import React from 'react';
import { Sparkles, Terminal, Users, Cpu, Rocket } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white">
      {/* Decorative background subtle glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Pill Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>About The Summit</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
            Where Cloud Infrastructure Meets{' '}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-violet-600 bg-clip-text text-transparent">
              Urban Architectural Scale
            </span>
          </h2>

          {/* User Requested Custom Copy in a rich glassmorphic container */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50/90 border border-slate-200/90 shadow-sm text-left relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-violet-500" />

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-6">
              Fellow cloud citizens! Step into an immersive tech metropolis where cloud comes to life.
              Designed to bridge the gap between classroom theory and real-world innovation, this event
              transforms learning into an interactive urban experience.
            </p>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-8">
              Whether you are exploring expert-led sessions, tackling interactive challenges, or
              connecting with fellow builders and industry peers, every corner is engineered to help you
              learn, build, and grow. Connect with fellow builders and discover real skills, real
              conversations, and real opportunities.
            </p>

            {/* 4 Interactive Pillars: Learn, Build, Grow, Connect */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Learn</div>
                  <div className="text-[11px] text-slate-500">Real Skills</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Build</div>
                  <div className="text-[11px] text-slate-500">Real Projects</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Rocket className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Grow</div>
                  <div className="text-[11px] text-slate-500">Career Paths</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Connect</div>
                  <div className="text-[11px] text-slate-500">Fellow Peers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

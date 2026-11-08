import React from 'react';
import { Sparkles, Terminal, Users, Cpu, Rocket } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      {/* Decorative background subtle glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Pill Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>About The Summit</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-8">
            Where Cloud Infrastructure Meets{' '}
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
              Urban Architectural Scale
            </span>
          </h2>

          {/* User Requested Custom Copy in a rich glassmorphic container */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0F0A2A]/85 backdrop-blur-xl border border-purple-500/30 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.6)] text-left relative overflow-hidden group hover:border-purple-400/50 transition-colors">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400" />

            <p className="text-base sm:text-lg text-purple-100/90 leading-relaxed font-normal mb-6">
              Fellow cloud citizens! Step into an immersive tech metropolis where cloud comes to life.
              Designed to bridge the gap between classroom theory and real-world innovation, this event
              transforms learning into an interactive urban experience.
            </p>

            <p className="text-base sm:text-lg text-purple-200/80 leading-relaxed font-normal mb-8">
              Whether you are exploring expert-led sessions, tackling interactive challenges, or
              connecting with fellow builders and industry peers, every corner is engineered to help you
              learn, build, and grow. Connect with fellow builders and discover real skills, real
              conversations, and real opportunities.
            </p>

            {/* 4 Interactive Pillars: Learn, Build, Grow, Connect */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-purple-500/20">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#150E36]/90 border border-purple-500/30 shadow-sm hover:border-purple-400/60 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 border border-purple-500/30">
                  <Terminal className="w-4 h-4 text-purple-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Learn</div>
                  <div className="text-[11px] text-purple-300/70">Real Skills</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#150E36]/90 border border-purple-500/30 shadow-sm hover:border-purple-400/60 transition-all">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 border border-indigo-500/30">
                  <Cpu className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Build</div>
                  <div className="text-[11px] text-purple-300/70">Real Projects</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#150E36]/90 border border-purple-500/30 shadow-sm hover:border-purple-400/60 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 border border-blue-500/30">
                  <Rocket className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Grow</div>
                  <div className="text-[11px] text-purple-300/70">Career Paths</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#150E36]/90 border border-purple-500/30 shadow-sm hover:border-purple-400/60 transition-all">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 border border-cyan-500/30">
                  <Users className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Connect</div>
                  <div className="text-[11px] text-purple-300/70">Fellow Peers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

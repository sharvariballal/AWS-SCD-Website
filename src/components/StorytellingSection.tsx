import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mic, Presentation, Clock, Sparkles, Star, ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { playSound } from '../utils/audio';

export const StorytellingSection: React.FC = () => {
  const stats = [
    {
      num: '500+',
      label: 'Students',
      sub: 'Builders across 30+ colleges',
      icon: Users,
      color: 'from-purple-600 to-indigo-600',
    },
    {
      num: '10+',
      label: 'Speakers',
      sub: 'AWS Heroes & Industry Leads',
      icon: Mic,
      color: 'from-amber-500 to-rose-500',
    },
    {
      num: '10+',
      label: 'Sessions',
      sub: 'Keynotes, Deep-Dives & Panels',
      icon: Presentation,
      color: 'from-indigo-600 to-purple-600',
    },
    {
      num: '1',
      label: 'Full Day',
      sub: 'Packed with Swag & Architecture',
      icon: Clock,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F5EFFE] via-[#EFE5FD] to-[#F8F5FF] overflow-hidden border-b-2 border-purple-900/10">
      
      {/* Background Soft Floating Clouds & Pastel Accents */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-purple-300/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] rounded-full bg-indigo-300/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Storytelling Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          
          <ScrollReveal delay={0.1} yOffset={20}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-purple-900 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>PREVIOUS EDITION AT A GLANCE</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} yOffset={24}>
            <h2 className="text-4xl sm:text-6xl font-black text-[#260B49] tracking-tight leading-[1.08] mb-6">
              BIG IDEAS.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800">
                BIGGER COMMUNITY.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3} yOffset={20}>
            <p className="text-base sm:text-lg text-purple-950/75 leading-relaxed font-medium">
              From the highest terraces of Pune Institute of Computer Technology to the sprawling cloud ecosystem, AWS Student Community Day brings builders together to explore, discover, and pioneer real-world cloud architectures.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Majestic Architectural Pillars (Matching Poster #2) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.15 * idx, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-purple-200/80 shadow-[0_8px_30px_rgba(109,40,217,0.08)] hover:shadow-[0_16px_40px_rgba(109,40,217,0.18)] transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Pillar Arch Top Decoration */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-400 group-hover:h-2 transition-all" />

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 mb-5 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2A0E4E] font-mono tracking-tight mb-2">
                    {stat.num}
                  </div>

                  <div className="text-base sm:text-lg font-bold text-purple-900 mb-1">
                    {stat.label}
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-purple-800/70 font-medium pt-3 border-t border-purple-100">
                  {stat.sub}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Narrative Callout Card with Poster Art */}
        <ScrollReveal delay={0.35} yOffset={25}>
          <div className="relative rounded-3xl bg-gradient-to-r from-[#2F1057] via-[#3E1674] to-[#250A47] text-white p-8 sm:p-12 overflow-hidden shadow-2xl border border-purple-400/20">
            {/* Ambient glows */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
            <div className="absolute left-1/3 top-0 w-60 h-60 rounded-full bg-purple-400/15 blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-800/80 border border-purple-400/30 text-amber-300 text-xs font-mono font-bold uppercase">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  THE CLOUD CITY CHRONICLE
                </div>

                <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white">
                  Engineered by Students. Backed by AWS Pioneers. Built for Pune.
                </h3>

                <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed font-normal">
                  In 2026, we proved that collegiate builders do not just write code for assignments — they architect fault-tolerant distributed systems, deploy serverless workflows, and build lasting professional networks. In 2027, Cloud City expands with higher-fidelity labs, bigger stages, and deeper industry mentorship.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#ticket-dispenser"
                    onClick={() => playSound('click')}
                    className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-400/30 transition-transform hover:scale-105"
                  >
                    <span>Secure Your Place In Cloud City</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#speakers-studio"
                    onClick={() => playSound('click')}
                    className="px-6 py-3 rounded-2xl bg-purple-900/60 hover:bg-purple-900/80 border border-purple-400/40 text-purple-200 font-bold text-sm flex items-center gap-2 transition-transform hover:scale-105"
                  >
                    <span>View Lineup</span>
                  </a>
                </div>
              </div>

              {/* Poster Snapshot Preview */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative group rounded-2xl overflow-hidden border-2 border-purple-300/40 shadow-2xl max-w-xs transition-transform duration-500 group-hover:scale-105">
                  <img
                    src="/posters/poster-stats.jpg"
                    alt="AWS Student Community Day Poster 2"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-mono text-purple-200 font-bold">
                      PICT SCD Edition Archive
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

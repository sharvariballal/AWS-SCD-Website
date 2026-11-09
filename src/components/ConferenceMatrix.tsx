import React, { useState } from 'react';
import { 
  Clock, 
  Lock,
  Calendar
} from 'lucide-react';

export const ConferenceMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'trackA' | 'trackB' | 'trackC'>('all');

  return (
    <section id="agenda-matrix" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7FF] via-[#F5EFFE] to-[#FAF7FF] border-b-2 border-purple-900/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-300 bg-purple-100 text-purple-900 text-xs font-mono font-bold uppercase mb-3 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-purple-700" />
              <span>Summit Schedule</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#260B49] tracking-tight">
              Event Schedule &amp; Tracks
            </h2>
            <p className="text-sm sm:text-base text-purple-950/75 mt-2 max-w-xl font-medium">
              A single-track grand auditorium experience featuring system design, generative AI agent workshops, and student architecture builds.
            </p>
          </div>

          <button
            disabled
            title="Calendar sync will be enabled once the full agenda is revealed"
            className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 self-start md:self-auto border border-purple-200 bg-white/70 text-purple-400 cursor-not-allowed opacity-80 shadow-sm"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Add to Calendar (.ICS) • Locked</span>
          </button>
        </div>

        {/* Track Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {[
            { id: 'all', label: 'All Sessions' },
            { id: 'trackA', label: 'Systems & Keynotes' },
            { id: 'trackB', label: 'Bedrock & Hands-on Labs' },
            { id: 'trackC', label: 'Hackathon Arena' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all border cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-950 text-amber-300 border-purple-950 shadow-md shadow-purple-950/20'
                  : 'bg-white/80 text-purple-900 border-purple-200 hover:bg-white shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Schedule Matrix Container with Frosted Teaser Lock Overlay */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-purple-200 shadow-[0_20px_50px_rgba(76,29,149,0.12)] bg-white/90">
          
          {/* Blank Silhouette Skeleton Cards (No Fake Text) */}
          <div className="p-6 sm:p-8 blur-[6px] opacity-25 pointer-events-none select-none space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-purple-200 bg-purple-50/60 flex items-center justify-between"
              >
                <div className="space-y-2.5 w-3/4">
                  <div className="w-28 h-3.5 rounded-full bg-purple-300" />
                  <div className="w-3/5 h-5 rounded-lg bg-purple-900/30" />
                  <div className="w-4/5 h-3 rounded-md bg-purple-200" />
                </div>
                <div className="w-20 h-6 rounded-lg bg-purple-300/40" />
              </div>
            ))}
          </div>

          {/* Central Frosted Teaser Badge */}
          <div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-purple-950/20 backdrop-blur-[6px]">
            <div className="max-w-md w-full p-8 rounded-3xl bg-white border-2 border-purple-200 shadow-[0_20px_50px_rgba(76,29,149,0.2)] text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 border border-amber-500 text-purple-950 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Clock className="w-8 h-8 text-purple-950 animate-pulse" />
              </div>

              <span className="px-3 py-1 rounded-full bg-purple-950 text-amber-300 font-mono text-[11px] font-black uppercase tracking-wider inline-block mb-3">
                AGENDA REVEALING SOON
              </span>

              <h3 className="text-2xl font-black text-[#260B49] mb-2">
                Curated Lineup Under Wraps
              </h3>

              <p className="text-xs sm:text-sm text-purple-900/80 leading-relaxed font-normal mb-4">
                Our committee and AWS architects are fine-tuning the sequential session rundown. All keynotes, panels, and workshops will run sequentially inside the grand hall.
              </p>

              <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-[11px] font-mono font-bold text-purple-900">
                Full schedule dropping in Phase 2 for registered builders
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

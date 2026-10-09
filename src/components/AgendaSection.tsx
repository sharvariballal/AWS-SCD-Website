import React from 'react';
import { 
  Lock, 
  Calendar, 
  Clock, 
  Sparkles, 
  MapPin, 
  Coffee, 
  Cpu, 
  Terminal 
} from 'lucide-react';

interface ScheduleSlot {
  time: string;
  title: string;
  track: string;
  room: string;
  speaker: string;
  type: 'keynote' | 'workshop' | 'panel' | 'networking';
}

const teaserSchedule: ScheduleSlot[] = [
  {
    time: '09:00 AM - 10:00 AM',
    title: 'Grand Keynote: Welcome to Cloud City — Building Resilient Digital Cities',
    track: 'Main Stage',
    room: 'Auditorium 1',
    speaker: 'AWS Community Hero & Cloud Leader',
    type: 'keynote',
  },
  {
    time: '10:15 AM - 11:30 AM',
    title: 'Deploying Autonomous AI Agents on Amazon Bedrock & AWS Lambda',
    track: 'GenAI & Machine Learning',
    room: 'Lab A',
    speaker: 'Principal AI Specialist',
    type: 'workshop',
  },
  {
    time: '11:45 AM - 12:45 PM',
    title: 'Multi-Region High Availability & Zero-Trust Architecture',
    track: 'Cloud Infrastructure',
    room: 'Hall 2',
    speaker: 'Senior Solutions Architect',
    type: 'workshop',
  },
  {
    time: '12:45 PM - 02:00 PM',
    title: 'Cloud Cafe Networking & Sponsor Career Fair Lunch',
    track: 'Networking',
    room: 'Central Atrium',
    speaker: 'Community & Recruiters',
    type: 'networking',
  },
  {
    time: '02:00 PM - 03:30 PM',
    title: 'Panel Discussion: From Student Builder to Cloud Staff Engineer',
    track: 'Career & Industry',
    room: 'Auditorium 1',
    speaker: 'AWS Leaders & Startup CTOs',
    type: 'panel',
  },
  {
    time: '03:45 PM - 05:30 PM',
    title: 'Cloud City Live Hackathon Finale & Trophy Ceremony',
    track: 'Competition',
    room: 'Innovation Stage',
    speaker: 'Judges & Hackathon Teams',
    type: 'workshop',
  },
];

export const AgendaSection: React.FC = () => {
  return (
    <section id="agenda" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-500/10 via-violet-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5 text-violet-500" />
            <span>Summit Roadmap</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Event Schedule &amp; Tracks
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            A power-packed schedule of hands-on workshops, keynotes, and technical sessions at PICT.
          </p>
        </div>

        {/* Schedule Wrapper with Teaser Frosted Glass Effect */}
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-white/60 min-h-[460px]">
          {/* Blurred Background Schedule */}
          <div className="p-6 sm:p-10 blur-[9px] opacity-40 pointer-events-none select-none">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
              <span className="px-5 py-2 rounded-xl bg-slate-950 text-white text-xs font-bold">
                Day 1 • Architecture &amp; Keynotes
              </span>
            </div>

            <div className="space-y-4">
              {teaserSchedule.map((slot, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-white/90 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                      {slot.type === 'keynote' && <Sparkles className="w-5 h-5" />}
                      {slot.type === 'workshop' && <Terminal className="w-5 h-5" />}
                      {slot.type === 'panel' && <Cpu className="w-5 h-5" />}
                      {slot.type === 'networking' && <Coffee className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-amber-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {slot.time}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {slot.track}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{slot.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span>🎙️ {slot.speaker}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" /> {slot.room}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frosted Glass Overlay with Centered Modal Badge (No email input, No sneak peek toggle) */}
          <div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-slate-900/30 backdrop-blur-[10px]">
            <div className="pulse-badge max-w-md w-full p-8 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-2xl border-2 border-amber-400 shadow-[0_20px_60px_rgba(255,153,0,0.35)] text-center relative overflow-hidden">
              {/* Decorative top amber bar */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

              {/* Animated Lock Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0D1B2A] to-slate-800 text-amber-400 flex items-center justify-center mx-auto mb-5 shadow-lg border border-amber-400/40">
                <Lock className="w-8 h-8 animate-pulse" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black tracking-wider uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Summit Roadmap
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                🔒 Agenda Coming Soon — Stay Tuned!
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                The speaker schedule, breakout session tracks, and hands-on lab timings will be announced shortly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

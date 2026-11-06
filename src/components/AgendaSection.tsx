import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  MapPin, 
  Coffee, 
  Cpu, 
  Terminal, 
  Download, 
  Users, 
  ChevronDown 
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface ScheduleSlot {
  id: string;
  time: string;
  title: string;
  track: 'keynote' | 'workshop' | 'panel' | 'networking' | 'hackathon';
  trackName: string;
  room: string;
  speaker: string;
  company: string;
  description: string;
}

const fullSchedule: ScheduleSlot[] = [
  {
    id: 's1',
    time: '08:30 AM - 09:30 AM',
    title: 'Registration, Breakfast & Swag Bag Distribution',
    track: 'networking',
    trackName: 'Check-in & Fuel',
    room: 'Main Atrium, Ground Floor',
    speaker: 'AWS SBG PICT Volunteer Core',
    company: 'AWS Student Builder Group',
    description: 'Check-in with your QR pass, pick up the official Cloud City 2027 backpack, tee, NFC badge, and enjoy hot South Indian breakfast with filter coffee.',
  },
  {
    id: 's2',
    time: '09:30 AM - 10:30 AM',
    title: 'Grand Keynote: Welcome to Cloud City — Building Resilient Digital Cities',
    track: 'keynote',
    trackName: 'Main Stage',
    room: 'Dakkhan Grand Auditorium',
    speaker: 'Sarah Chen & AWS Community Leaders',
    company: 'AWS Community Hero & Cloud Leader',
    description: 'Opening keynote setting the vision for student cloud builders in India. Live architectures, multi-region resilience, and autonomous AI agents.',
  },
  {
    id: 's3',
    time: '10:45 AM - 12:00 PM',
    title: 'Hands-on Lab: Deploying Autonomous AI Agents with Amazon Bedrock & AWS Lambda',
    track: 'workshop',
    trackName: 'GenAI & Serverless',
    room: 'Lab Alpha (Bring Laptops)',
    speaker: 'Devon Vance',
    company: 'Cognitive Cloud Labs',
    description: 'Build an end-to-end multi-agent workflow using Amazon Bedrock, Claude 3.7 Sonnet, and event-driven AWS Lambda microservices from scratch.',
  },
  {
    id: 's4',
    time: '10:45 AM - 12:00 PM',
    title: 'Masterclass: Zero-Cold-Start High-Throughput APIs with DynamoDB & CloudFront',
    track: 'workshop',
    trackName: 'Architecture',
    room: 'Hall 2',
    speaker: 'Priya Sharma',
    company: 'Serverless Global',
    description: 'Optimize p99 latency under heavy concurrent loads. Real production telemetry patterns and edge caching tactics.',
  },
  {
    id: 's5',
    time: '12:00 PM - 01:15 PM',
    title: 'Executive Panel: From College Campus to Cloud Staff Engineer & Founder',
    track: 'panel',
    trackName: 'Career & Growth',
    room: 'Dakkhan Grand Auditorium',
    speaker: 'Alex Rivera, Marcus Brody & Student Founders',
    company: 'CloudShield Guard & Nexacore',
    description: 'Unfiltered advice on landing cloud engineering roles, contributing to open source, building SaaS startups in college, and passing AWS certifications.',
  },
  {
    id: 's6',
    time: '01:15 PM - 02:15 PM',
    title: 'Cloud Cafe Networking Lunch & Sponsor Career Fair',
    track: 'networking',
    trackName: 'Networking',
    room: 'Lawn & Dining Hall',
    speaker: 'All Attendees & Recruiters',
    company: 'Open Floor',
    description: 'Sumptuous buffet lunch. Connect with hiring managers at AWS partner booths, resume reviews, and photo booth moments.',
  },
  {
    id: 's7',
    time: '02:15 PM - 04:15 PM',
    title: 'Live 2-Hour Builder Hackathon Showdown & AWS GameDay Challenge',
    track: 'hackathon',
    trackName: 'Competition',
    room: 'Hack Arena (Lab Alpha + Beta)',
    speaker: 'Hackathon Mentors & AWS Solutions Architects',
    company: 'AWS Community',
    description: 'Compete in teams of 2-4 to solve a real-world disaster recovery and traffic spike architecture challenge. ₹50,000+ in bounties & credits!',
  },
  {
    id: 's8',
    time: '04:30 PM - 05:30 PM',
    title: 'Hackathon Finale Demos, Awards & Closing Ceremony',
    track: 'keynote',
    trackName: 'Grand Finale',
    room: 'Dakkhan Grand Auditorium',
    speaker: 'Judging Panel & PICT Faculty Mentors',
    company: 'AWS SBG PICT',
    description: 'Top 5 hackathon teams present live on the main stage. Trophy distribution, secret swag raffle, and group photo.',
  },
];

export const AgendaSection: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<string>('all');
  const [expandedSlot, setExpandedSlot] = useState<string | null>(null);

  const filterTracks = [
    { id: 'all', label: 'All Sessions' },
    { id: 'keynote', label: 'Keynotes & Panels' },
    { id: 'workshop', label: 'Hands-on Labs' },
    { id: 'hackathon', label: 'GameDay Hackathon' },
    { id: 'networking', label: 'Networking & Lunch' },
  ];

  const filteredSchedule = fullSchedule.filter((slot) => {
    if (activeTrack === 'all') return true;
    if (activeTrack === 'keynote') return slot.track === 'keynote' || slot.track === 'panel';
    return slot.track === activeTrack;
  });

  const toggleSlot = (id: string) => {
    playSound('click');
    setExpandedSlot(expandedSlot === id ? null : id);
  };

  const handleDownloadICS = () => {
    playSound('coin');
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AWS Student Builder Group PICT//Cloud City 2027//EN
BEGIN:VEVENT
SUMMARY:AWS Student Community Day 2027 - Cloud City
DESCRIPTION:Western India's premier student cloud conference organized by AWS Student Builder Group PICT.
LOCATION:Dakkhan Banquet Hall, Ambegoan | Katraj | Nahre, Pune
DTSTART:20270131T033000Z
DTEND:20270131T123000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'AWS_SCD_2027_CloudCity.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="agenda" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-500/10 via-violet-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5 text-violet-500" />
            <span>Summit Roadmap</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Event Schedule &amp;{' '}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-amber-600 bg-clip-text text-transparent">
              Tracks
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mb-6">
            A power-packed single-day schedule of hands-on workshops, keynotes, and live competitive hackathons at Dakkhan Banquet Hall, Pune.
          </p>

          {/* Action button: Add to Calendar */}
          <button
            onClick={handleDownloadICS}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 hover:text-amber-600 hover:border-amber-400 font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-500" />
            <span>Add Event to Calendar (.ics)</span>
          </button>
        </div>

        {/* Track Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterTracks.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playSound('click');
                setActiveTrack(tab.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTrack === tab.id
                  ? 'bg-slate-950 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Schedule Timeline List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredSchedule.map((slot) => {
            const isExpanded = expandedSlot === slot.id;

            return (
              <div
                key={slot.id}
                onClick={() => toggleSlot(slot.id)}
                className={`p-5 sm:p-6 rounded-3xl border transition-all duration-200 cursor-pointer relative overflow-hidden ${
                  isExpanded
                    ? 'bg-white border-amber-400 shadow-xl ring-1 ring-amber-400/40'
                    : 'bg-white/80 hover:bg-white border-slate-200/90 hover:border-amber-300 shadow-sm'
                }`}
              >
                {/* Accent bar for slot */}
                <div
                  className={`absolute top-0 inset-y-0 left-0 w-1.5 ${
                    slot.track === 'keynote'
                      ? 'bg-amber-500'
                      : slot.track === 'workshop'
                      ? 'bg-violet-500'
                      : slot.track === 'hackathon'
                      ? 'bg-rose-500'
                      : 'bg-emerald-500'
                  }`}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                        slot.track === 'keynote'
                          ? 'bg-amber-100 text-amber-700'
                          : slot.track === 'workshop'
                          ? 'bg-violet-100 text-violet-700'
                          : slot.track === 'hackathon'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {slot.track === 'keynote' && <Sparkles className="w-5 h-5" />}
                      {slot.track === 'workshop' && <Terminal className="w-5 h-5" />}
                      {slot.track === 'hackathon' && <Cpu className="w-5 h-5" />}
                      {slot.track === 'networking' && <Coffee className="w-5 h-5" />}
                      {slot.track === 'panel' && <Users className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-mono font-bold text-amber-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {slot.time}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {slot.trackName}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" /> {slot.room}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-amber-600">
                        {slot.title}
                      </h3>

                      <div className="text-xs text-slate-600 mt-1 flex items-center gap-2">
                        <span className="font-semibold text-slate-800">🎙️ {slot.speaker}</span>
                        <span>•</span>
                        <span className="text-slate-500">{slot.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
                      {isExpanded ? 'Hide Details' : 'View Details'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-amber-500' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Collapsible Abstract & Takeaways */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in">
                    <p className="mb-3">{slot.description}</p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/50">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Bring your laptop for interactive code snippets &amp; live architecture diagrams.</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Download, 
  Terminal, 
  Sparkles, 
  Coffee, 
  Trophy, 
  Users 
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface SessionItem {
  id: string;
  time: string;
  title: string;
  trackId: 'trackA' | 'trackB' | 'trackC' | 'all';
  trackName: string;
  room: string;
  speaker: string;
  role: string;
  tag: string;
  summary: string;
}

const matrixSchedule: SessionItem[] = [
  {
    id: 'm1',
    time: '08:30 AM - 09:30 AM',
    title: 'Doors Open, Welcome Breakfast & Swag Pack Distribution',
    trackId: 'all',
    trackName: 'Registration & Fuel',
    room: 'Main Atrium, Ground Floor',
    speaker: 'AWS SBG PICT Volunteer Core',
    role: 'Student Builder Group',
    tag: 'FREE BREAKFAST',
    summary: 'Check in with your student PRN / pass, receive the limited-edition Cloud City 2027 backpack, tee, and enjoy hot South Indian breakfast with chai.',
  },
  {
    id: 'm2',
    time: '09:30 AM - 10:30 AM',
    title: 'Grand Keynote: Architecting Resilient Cloud Metropolises in the Age of AI',
    trackId: 'trackA',
    trackName: 'Track A • Main Stage',
    room: 'Grand Auditorium',
    speaker: 'Sarah Chen & AWS Community Leaders',
    role: 'AWS Community Hero',
    tag: 'KEYNOTE',
    summary: 'The inaugural address exploring autonomous self-healing multi-region microservices, edge caching, and student cloud engineering career paths in India.',
  },
  {
    id: 'm3',
    time: '10:45 AM - 12:15 PM',
    title: 'Deep Dive Workshop: Building Multi-Agent Autonomous Systems with Amazon Bedrock',
    trackId: 'trackB',
    trackName: 'Track B • GenAI Lab',
    room: 'Lab Alpha (Bring Laptop)',
    speaker: 'Devon Vance',
    role: 'Staff AI Engineer, Cognitive Labs',
    tag: 'HANDS-ON LAB',
    summary: 'Live coding session: orchestrate LangGraph, Claude 3.7 Sonnet on Amazon Bedrock, and AWS Lambda functions to build self-executing dev agents.',
  },
  {
    id: 'm4',
    time: '10:45 AM - 12:15 PM',
    title: 'Zero-Cold-Start High-Throughput APIs with DynamoDB & CloudFront',
    trackId: 'trackA',
    trackName: 'Track A • Architecture',
    room: 'Hall 2',
    speaker: 'Priya Sharma',
    role: 'Head of DevRel, Serverless Global',
    tag: 'SYSTEM DESIGN',
    summary: 'Mastering p99 latency optimization, connection pooling with RDS Proxy, and resilient DynamoDB single-table design under extreme traffic spikes.',
  },
  {
    id: 'm5',
    time: '12:15 PM - 01:15 PM',
    title: 'Executive Panel: From College Campus to Cloud Staff Engineer & Founder',
    trackId: 'trackA',
    trackName: 'Track A • Career & Growth',
    room: 'Grand Auditorium',
    speaker: 'Alex Rivera, Marcus Brody & Student Founders',
    role: 'CloudShield Guard & Nexacore',
    tag: 'CAREER FORUM',
    summary: 'Candid advice on cracking AWS certifications, landing top-tier cloud internships, open-source contributions, and launching SaaS startups in university.',
  },
  {
    id: 'm6',
    time: '01:15 PM - 02:15 PM',
    title: 'Cloud Cafe Networking Buffet Lunch & Partner Career Fair',
    trackId: 'all',
    trackName: 'Community Networking',
    room: 'Lawn & Dining Hall',
    speaker: 'All Attendees, Recruiters & Mentors',
    role: 'Open Networking',
    tag: 'BUFFET LUNCH',
    summary: 'Enjoy a lavish hot buffet meal. Connect directly with hiring managers, resume drop counters, and take photos at the AWS SBG booth.',
  },
  {
    id: 'm7',
    time: '02:15 PM - 04:30 PM',
    title: 'Cloud GameDay: Live 2-Hour Student Hackathon & Architecture Showdown',
    trackId: 'trackC',
    trackName: 'Track C • Hackathon Arena',
    room: 'Hack Arena (Lab Alpha + Beta)',
    speaker: 'AWS Solutions Architects & Hackathon Mentors',
    role: 'Technical Jury',
    tag: '₹50K+ BOUNTIES',
    summary: 'Teams of 2-4 compete in a simulated production crisis. Scale architectures, fix broken microservices under live chaos monkey tests, and win cash prizes!',
  },
  {
    id: 'm8',
    time: '04:45 PM - 05:45 PM',
    title: 'Hackathon Demos, Trophy Ceremony & Community Grand Finale',
    trackId: 'all',
    trackName: 'Grand Finale',
    room: 'Grand Auditorium',
    speaker: 'Judging Panel & PICT Faculty Mentors',
    role: 'AWS Student Builder Group PICT',
    tag: 'AWARDS CEREMONY',
    summary: 'Top finalist pitches, trophy presentation, secret swag raffle, verified credential release, and the official community group photo.',
  },
];

export const ConferenceMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'trackA' | 'trackB' | 'trackC'>('all');

  const filteredSessions = matrixSchedule.filter((item) => {
    if (activeTab === 'all') return true;
    return item.trackId === activeTab || item.trackId === 'all';
  });

  const handleDownloadICS = () => {
    playSound('coin');
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AWS Student Builder Group PICT//Cloud City 2027//EN
BEGIN:VEVENT
SUMMARY:AWS Student Community Day 2027 - Pune
DESCRIPTION:Premier student cloud conference by AWS Student Builder Group PICT.
LOCATION:Dakkhan Banquet Hall, Ambegoan | Katraj | Nahre, Pune
DTSTART:20270131T030000Z
DTEND:20270131T123000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'AWS_SCD_2027_Pune.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="agenda-matrix" className="py-20 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-slate-900 bg-purple-300 text-slate-950 text-xs font-mono font-black uppercase mb-3 shadow-[2px_2px_0px_#0F172A]">
              <span>Summit Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Event Schedule &amp; Tracks
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl font-medium">
              3 high-octane tracks covering system design, generative AI agent labs, and a competitive live-fire hackathon.
            </p>
          </div>

          <button
            onClick={handleDownloadICS}
            className="neo-btn bg-white hover:bg-slate-100 text-slate-900 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer self-start md:self-auto shadow-[3px_3px_0px_#0F172A]"
          >
            <Download className="w-4 h-4 text-amber-600" />
            <span>Add to Calendar (.ICS)</span>
          </button>
        </div>

        {/* Track Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {[
            { id: 'all', label: 'All Sessions' },
            { id: 'trackA', label: 'Track A • Systems & Keynotes' },
            { id: 'trackB', label: 'Track B • Bedrock & Hands-on Labs' },
            { id: 'trackC', label: 'Track C • Hackathon Arena' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playSound('click');
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all border-2 border-slate-900 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-slate-950 text-white shadow-[3px_3px_0px_#FF9900]'
                  : 'bg-white text-slate-700 hover:bg-slate-100 shadow-[2px_2px_0px_#0F172A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline Matrix Cards */}
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="neo-card p-5 sm:p-6 bg-white hover:border-amber-500 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl border-2 border-slate-900 bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#0F172A]">
                    {session.tag.includes('KEYNOTE') ? (
                      <Sparkles className="w-6 h-6" />
                    ) : session.tag.includes('LAB') ? (
                      <Terminal className="w-6 h-6" />
                    ) : session.tag.includes('HACKATHON') || session.tag.includes('BOUNTIES') ? (
                      <Trophy className="w-6 h-6" />
                    ) : session.tag.includes('BREAKFAST') || session.tag.includes('LUNCH') ? (
                      <Coffee className="w-6 h-6" />
                    ) : (
                      <Users className="w-6 h-6" />
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {session.time}
                      </span>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-700">
                        {session.trackName}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {session.room}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-950">
                      {session.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                      {session.summary}
                    </p>
                  </div>
                </div>

                <div className="self-start lg:self-center shrink-0 text-left lg:text-right pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-slate-900 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                    {session.tag}
                  </span>
                  <div className="text-xs font-bold text-slate-900 mt-1">
                    🎙️ {session.speaker}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {session.role}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

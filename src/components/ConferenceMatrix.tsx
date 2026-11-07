import React, { useState } from 'react';
import { 
  Clock, 
  Lock 
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
            disabled
            title="Calendar sync will be enabled once the full agenda is revealed"
            className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 self-start md:self-auto border-2 border-slate-300 bg-slate-100 text-slate-400 cursor-not-allowed opacity-80 shadow-[2px_2px_0px_#CBD5E1]"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Add to Calendar (.ICS) • Locked</span>
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

        {/* Schedule Matrix Container with Frosted Teaser Lock Overlay */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-slate-900 shadow-[6px_6px_0px_#0F172A] bg-white">
          
          {/* Blurred Background Schedule */}
          <div className="p-6 sm:p-8 blur-[7px] opacity-30 pointer-events-none select-none space-y-4">
            {filteredSessions.slice(0, 4).map((session) => (
              <div
                key={session.id}
                className="p-5 rounded-2xl border-2 border-slate-900 bg-slate-50 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-amber-600">{session.time}</span>
                  <h4 className="text-base font-black text-slate-900">{session.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{session.summary}</p>
                </div>
                <span className="text-xs font-mono px-2 py-1 bg-slate-900 text-white rounded">
                  {session.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Central Frosted Teaser Badge */}
          <div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-slate-950/25 backdrop-blur-[6px]">
            <div className="max-w-md w-full p-8 rounded-3xl bg-white border-3 border-slate-950 shadow-[8px_8px_0px_#0F172A] text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 border-2 border-slate-950 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_#0F172A]">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>

              <span className="px-3 py-1 rounded-full bg-slate-950 text-amber-400 font-mono text-[11px] font-black uppercase tracking-wider inline-block mb-3">
                🔒 AGENDA REVEALING SOON
              </span>

              <h3 className="text-2xl font-black text-slate-950 mb-2">
                Curated Lineup Under Wraps
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-4">
                Our student committee and AWS architects are fine-tuning the sequential session rundown. All keynotes, panels, and workshops will run sequentially inside the grand hall.
              </p>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-[11px] font-mono font-bold text-amber-900">
                ⚡ Full schedule dropping shortly for registered builders
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

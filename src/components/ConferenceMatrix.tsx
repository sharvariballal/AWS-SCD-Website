import React, { useState } from 'react';
import { 
  Clock, 
  Lock,
  Sparkles
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
    title: 'Zero-Cold-Start Strategies for Serverless Enterprise Architectures',
    trackId: 'trackA',
    trackName: 'Track A • Systems Architecture',
    room: 'Grand Auditorium',
    speaker: 'Alex Rivera',
    role: 'Staff Platform Engineer',
    tag: 'SYSTEMS DEEP DIVE',
    summary: 'Real-world benchmarks reducing latency across 500M+ monthly invocations using SnapStart, provisioned concurrency, and Rust on AWS Lambda.',
  },
  {
    id: 'm5',
    time: '12:30 PM - 01:15 PM',
    title: 'Panel Discussion: From Campus Code to Cloud Solutions Architect at AWS',
    trackId: 'all',
    trackName: 'All Tracks • Career Forum',
    room: 'Grand Auditorium',
    speaker: 'AWS Student Alumni Panel',
    role: 'Industry Leaders & AWS SA Alumni',
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
    <section id="agenda-matrix" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F5EFFE] via-[#EFE6FD] to-[#FAF7FF] border-b-2 border-purple-900/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-300 bg-purple-100 text-purple-900 text-xs font-mono font-black uppercase mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <span>Summit Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#260B49] tracking-tight">
              Event Schedule &amp; Tracks
            </h2>
            <p className="text-sm sm:text-base text-purple-950/75 mt-2 max-w-xl font-medium">
              3 high-octane tracks covering system design, generative AI agent labs, and a competitive live-fire hackathon.
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
          
          {/* Blurred Background Schedule */}
          <div className="p-6 sm:p-8 blur-[7px] opacity-25 pointer-events-none select-none space-y-4">
            {filteredSessions.slice(0, 4).map((session) => (
              <div
                key={session.id}
                className="p-5 rounded-2xl border border-purple-200 bg-purple-50/50 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-amber-600">{session.time}</span>
                  <h4 className="text-base font-black text-purple-950">{session.title}</h4>
                  <p className="text-xs text-purple-600 mt-1">{session.summary}</p>
                </div>
                <span className="text-xs font-mono px-2 py-1 bg-purple-950 text-amber-300 rounded">
                  {session.tag}
                </span>
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
                🔒 AGENDA REVEALING SOON
              </span>

              <h3 className="text-2xl font-black text-[#260B49] mb-2">
                Curated Lineup Under Wraps
              </h3>

              <p className="text-xs sm:text-sm text-purple-900/80 leading-relaxed font-normal mb-4">
                Our student committee and AWS architects are fine-tuning the sequential session rundown. All keynotes, panels, and workshops will run sequentially inside the grand hall.
              </p>

              <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-[11px] font-mono font-bold text-purple-900">
                ⚡ Full schedule dropping shortly for registered builders
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

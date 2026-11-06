import React from 'react';
import { Users, Sparkles } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from './BrandIcons';
import { playSound } from '../utils/audio';

interface CrewMember {
  name: string;
  role: string;
  sbgTitle: string;
  avatarBg: string;
  initials: string;
  quirk: string;
  year: string;
}

const crew: CrewMember[] = [
  {
    name: 'Aarav Patel',
    role: 'Lead Cloud Evangelist',
    sbgTitle: 'President, AWS SBG PICT',
    avatarBg: 'bg-amber-400 text-slate-950',
    initials: 'AP',
    quirk: 'Deployed his first Lambda at 3:00 AM before a midsem calculus paper. It didn’t crash.',
    year: 'Class of 2026',
  },
  {
    name: 'Ananya Deshmukh',
    role: 'Head of Technical Architecture',
    sbgTitle: 'GenAI & Serverless Lead',
    avatarBg: 'bg-indigo-400 text-white',
    initials: 'AD',
    quirk: 'Programmed an autonomous Bedrock agent to automatically track class attendance.',
    year: 'Class of 2027',
  },
  {
    name: 'Rohan Kulkarni',
    role: 'Head of Operations & Logistics',
    sbgTitle: 'Summit Experience Lead',
    avatarBg: 'bg-emerald-400 text-slate-950',
    initials: 'RK',
    quirk: 'Maintained 0% packet loss and 100% coffee uptime across 4 collegiate hackathons.',
    year: 'Class of 2026',
  },
  {
    name: 'Isha Joshi',
    role: 'Community & Partnerships Lead',
    sbgTitle: 'Sponsorship Director',
    avatarBg: 'bg-purple-400 text-white',
    initials: 'IJ',
    quirk: 'Turned a cold LinkedIn message into our Tier-1 Cloud Titan sponsor in under 48 hours.',
    year: 'Class of 2027',
  },
  {
    name: 'Tanmay Shinde',
    role: 'Design & Visual Identity Lead',
    sbgTitle: 'Creative Director',
    avatarBg: 'bg-rose-400 text-white',
    initials: 'TS',
    quirk: 'Created 38 sticker iterations until the holographic AWS smile gradient was mathematically flawless.',
    year: 'Class of 2027',
  },
  {
    name: 'Siddhi Ghadge',
    role: 'Hackathon & Hands-on Labs Lead',
    sbgTitle: 'GameDay Coordinator',
    avatarBg: 'bg-cyan-400 text-slate-950',
    initials: 'SG',
    quirk: 'Holds the PICT campus speedrun record for provisioning a resilient multi-AZ VPC in 3 minutes 42 seconds.',
    year: 'Class of 2026',
  },
];

export const StudentCrew: React.FC = () => {
  return (
    <section id="student-crew" className="py-20 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-slate-900 bg-amber-400 text-slate-950 text-xs font-mono font-black uppercase mb-3 shadow-[2px_2px_0px_#0F172A]">
              <Users className="w-3.5 h-3.5" />
              <span>Student Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Meet the Student Builder Crew
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl font-medium">
              The passionate student engineers, cloud hobbyists, and organizers from PICT Pune driving this community day.
            </p>
          </div>

          <a
            href="https://forms.gle/aws-sbg-volunteer"
            target="_blank"
            rel="noreferrer"
            onClick={() => playSound('click')}
            className="neo-btn bg-white hover:bg-slate-100 text-slate-900 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer self-start md:self-auto shadow-[3px_3px_0px_#0F172A]"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Join Volunteer Crew</span>
          </a>
        </div>

        {/* 6 Crew Polaroids Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {crew.map((member, idx) => (
            <div
              key={idx}
              className="neo-card p-6 bg-white relative overflow-hidden group hover:border-slate-950"
            >
              {/* Washi Tape */}
              <div className="washi-tape" />

              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl border-2 border-slate-900 ${member.avatarBg} flex items-center justify-center font-black text-xl shadow-[3px_3px_0px_#0F172A] shrink-0`}
                >
                  {member.initials}
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-950 group-hover:text-amber-600 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs font-bold text-amber-600 font-mono">
                    {member.role}
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold">
                    {member.sbgTitle} • {member.year}
                  </div>
                </div>
              </div>

              {/* Quirk Quote Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-900 text-xs text-slate-700 italic leading-relaxed mb-4 shadow-[2px_2px_0px_#0F172A]">
                &ldquo;{member.quirk}&rdquo;
              </div>

              <div className="pt-3 border-t-2 border-slate-900 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[10px] font-bold text-slate-400">
                  PICT PUNE CHAPTER
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="p-1.5 rounded-lg border border-slate-900 bg-white hover:bg-slate-100 text-slate-800 transition-colors shadow-[1px_1px_0px_#0F172A]"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5 fill-current" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} GitHub`}
                    className="p-1.5 rounded-lg border border-slate-900 bg-white hover:bg-slate-100 text-slate-800 transition-colors shadow-[1px_1px_0px_#0F172A]"
                  >
                    <GitHubIcon className="w-3.5 h-3.5 fill-current" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

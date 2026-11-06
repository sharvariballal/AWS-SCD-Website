import React from 'react';
import { Users, ExternalLink } from 'lucide-react';
import { LinkedInIcon, TwitterXIcon } from './BrandIcons';

interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  avatarBg: string;
  initials: string;
  funFact: string;
  linkedin?: string;
  github?: string;
}

const coreTeam: TeamMember[] = [
  {
    name: 'Aarav Patel',
    role: 'Lead Cloud Evangelist',
    specialty: 'AWS SBG PICT President',
    avatarBg: 'from-amber-500 to-orange-600',
    initials: 'AP',
    funFact: 'Deployed his first Lambda function at 3:00 AM before a calculus exam.',
  },
  {
    name: 'Ananya Deshmukh',
    role: 'Head of Technical Architecture',
    specialty: 'Serverless & GenAI Lead',
    avatarBg: 'from-purple-500 to-violet-700',
    initials: 'AD',
    funFact: 'Wrote an autonomous Bedrock agent to automatically register for college classes.',
  },
  {
    name: 'Rohan Kulkarni',
    role: 'Head of Operations & Logistics',
    specialty: 'Venue & Experience Lead',
    avatarBg: 'from-blue-500 to-indigo-600',
    initials: 'RK',
    funFact: 'Ensured 0% packet loss and 100% coffee uptime across 5 college hackathons.',
  },
  {
    name: 'Isha Joshi',
    role: 'Community & Sponsorships Lead',
    specialty: 'Partnerships & Outreach',
    avatarBg: 'from-emerald-500 to-teal-700',
    initials: 'IJ',
    funFact: 'Turned a cold DM into our first Tier-1 Cloud Titan sponsor.',
  },
  {
    name: 'Tanmay Shinde',
    role: 'Creative & UI/UX Director',
    specialty: 'Brand & Visual Identity',
    avatarBg: 'from-pink-500 to-rose-600',
    initials: 'TS',
    funFact: 'Designed 40+ sticker iterations before agreeing on the perfect AWS smile gradient.',
  },
  {
    name: 'Siddhi Ghadge',
    role: 'Hackathon & Hands-on Labs Lead',
    specialty: 'Competitive Cloud Tracks',
    avatarBg: 'from-amber-400 to-yellow-600',
    initials: 'SG',
    funFact: 'Holds the campus speedrun record for deploying a multi-tier VPC in 4 minutes.',
  },
];

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5 text-blue-500" />
            <span>The Builders Behind The Summit</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Meet the AWS SBG{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-600 bg-clip-text text-transparent">
              Core Team
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            Passionate student leaders, cloud practitioners, and community volunteers from Pune Institute of Computer Technology (PICT) driving Cloud City 2027.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreTeam.map((member, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${member.avatarBg} text-white flex items-center justify-center font-black text-lg shadow-md shrink-0`}
                >
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-amber-600">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {member.specialty}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 italic leading-relaxed">
                &ldquo;{member.funFact}&rdquo;
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  PICT Pune Chapter
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <LinkedInIcon className="w-4 h-4 fill-current" />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} Twitter`}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    <TwitterXIcon className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join as volunteer CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600 mb-3">
            Want to get hands-on experience organizing Western India&apos;s biggest student cloud summit?
          </p>
          <a
            href="https://forms.gle/volunteer-aws-sbg-pict"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <span>Apply as Student Volunteer / Campus Ambassador</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Mic2 } from 'lucide-react';
import { LinkedInIcon, TwitterXIcon } from './BrandIcons';

interface SpeakerCard {
  name: string;
  role: string;
  company: string;
  topic: string;
  superpower: string;
  stack: string[];
  avatarColor: string;
  initials: string;
}

const speakers: SpeakerCard[] = [
  {
    name: 'Sarah Chen',
    role: 'Principal Cloud Architect',
    company: 'AWS Community Hero',
    topic: 'Architecting Resilient Multi-Region Serverless Grids',
    superpower: '10,000+ Cold Starts Slain',
    stack: ['AWS Lambda', 'DynamoDB', 'Rust', 'EventBridge'],
    avatarColor: 'bg-amber-400 text-slate-950',
    initials: 'SC',
  },
  {
    name: 'Devon Vance',
    role: 'Senior Staff AI Engineer',
    company: 'Cognitive Cloud Labs',
    topic: 'Production GenAI Agents with Amazon Bedrock',
    superpower: 'Prompt & Multi-Agent Sorcerer',
    stack: ['Bedrock', 'Claude 3.7', 'Python', 'LangGraph'],
    avatarColor: 'bg-indigo-400 text-white',
    initials: 'DV',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Developer Relations',
    company: 'Serverless Global',
    topic: 'Zero-Cold-Start Strategies for High-Throughput APIs',
    superpower: 'Sub-10ms P99 Latency Guru',
    stack: ['CloudFront', 'API Gateway', 'Go', 'X-Ray'],
    avatarColor: 'bg-emerald-400 text-slate-950',
    initials: 'PS',
  },
  {
    name: 'Alex Rivera',
    role: 'Security & Compliance Lead',
    company: 'CloudShield Guard',
    topic: 'Automated IAM Governance & Cloud Incident Response',
    superpower: 'Zero-Trust Shield Master',
    stack: ['IAM', 'GuardDuty', 'SecurityHub', 'Terraform'],
    avatarColor: 'bg-rose-400 text-white',
    initials: 'AR',
  },
  {
    name: 'Elena Rostova',
    role: 'Staff Kubernetes Engineer',
    company: 'InfraScale Systems',
    topic: 'EKS at Extreme Scale: Multi-Cluster Autoscaling',
    superpower: 'Cluster Orchestra Conductor',
    stack: ['Amazon EKS', 'Karpenter', 'Kubernetes', 'Prometheus'],
    avatarColor: 'bg-cyan-400 text-slate-950',
    initials: 'ER',
  },
  {
    name: 'Marcus Brody',
    role: 'Cloud Architect & Founder',
    company: 'Nexacore Cloud',
    topic: 'Scaling Cloud SaaS from University Project to 1M Users',
    superpower: 'Campus Hacker to VC-Backed CTO',
    stack: ['AWS CDK', 'PostgreSQL', 'Next.js', 'Bedrock'],
    avatarColor: 'bg-amber-300 text-slate-950',
    initials: 'MB',
  },
];

export const SpeakerShowcase: React.FC = () => {
  return (
    <section id="speakers-studio" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-slate-900 bg-amber-400 text-slate-950 text-xs font-mono font-black uppercase mb-3 shadow-[2px_2px_0px_#0F172A]">
              <span>Industry Heavyweights</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Featured Speakers &amp; Mentors
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl font-medium">
              Learn directly from AWS Community Heroes, principal architects, and engineers pushing production limits.
            </p>
          </div>

          <a
            href="https://forms.gle/aws-sbg-cfp"
            target="_blank"
            rel="noreferrer"
            className="neo-btn bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer self-start md:self-auto shadow-[3px_3px_0px_#FF9900]"
          >
            <Mic2 className="w-4 h-4 text-amber-400" />
            <span>Apply to Speak (CFP Open)</span>
          </a>
        </div>

        {/* 6 Trading Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((sp, idx) => (
            <div
              key={idx}
              className="neo-card p-6 bg-white flex flex-col justify-between relative overflow-hidden group hover:border-slate-950"
            >
              {/* Tape Accent */}
              <div className="washi-tape" />

              <div>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl border-2 border-slate-900 ${sp.avatarColor} flex items-center justify-center font-black text-xl shadow-[3px_3px_0px_#0F172A]`}
                  >
                    {sp.initials}
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-700">
                    KEYNOTE/LAB
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-950 group-hover:text-amber-600 transition-colors">
                  {sp.name}
                </h3>

                <div className="text-xs font-bold text-amber-600 font-mono">
                  {sp.role}
                </div>
                <div className="text-xs text-slate-500 font-semibold mb-3">
                  {sp.company}
                </div>

                {/* Talk Topic Box */}
                <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] mb-4">
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                    TALK TOPIC:
                  </div>
                  <div className="text-xs font-bold text-slate-900 leading-snug mt-0.5">
                    &ldquo;{sp.topic}&rdquo;
                  </div>
                </div>

                {/* Superpower tag */}
                <div className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300 inline-block mb-4">
                  ⚡ {sp.superpower}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {sp.stack.map((stk, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {stk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Connect Bottom Bar */}
              <div className="pt-3 border-t-2 border-slate-900 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[11px] font-semibold">STAGE 1</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${sp.name} LinkedIn`}
                    className="p-1.5 rounded-lg border border-slate-900 bg-white hover:bg-slate-100 text-slate-800 transition-colors shadow-[1px_1px_0px_#0F172A]"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5 fill-current" />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${sp.name} Twitter`}
                    className="p-1.5 rounded-lg border border-slate-900 bg-white hover:bg-slate-100 text-slate-800 transition-colors shadow-[1px_1px_0px_#0F172A]"
                  >
                    <TwitterXIcon className="w-3.5 h-3.5 fill-current" />
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

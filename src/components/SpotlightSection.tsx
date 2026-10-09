import React, { useState } from 'react';
import { 
  Mic2, 
  Building2, 
  Download, 
  Check, 
  ArrowRight,
  Award
} from 'lucide-react';
import { LinkedInIcon, TwitterXIcon } from './BrandIcons';

interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  topic: string;
  badge: string;
  avatarBg: string;
  initials: string;
}

const speakersList: Speaker[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Principal Cloud Architect',
    company: 'AWS Community Hero',
    topic: 'Architecting Resilient Multi-Region Serverless Grids',
    badge: 'Keynote Speaker',
    avatarBg: 'from-amber-500 to-orange-600',
    initials: 'SC',
  },
  {
    id: '2',
    name: 'Devon Vance',
    role: 'Senior Staff AI Engineer',
    company: 'Cognitive Cloud Labs',
    topic: 'Production GenAI Agents with Bedrock & LangGraph',
    badge: 'AI Special',
    avatarBg: 'from-violet-600 to-purple-800',
    initials: 'DV',
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'Head of Developer Relations',
    company: 'Serverless Global',
    topic: 'Zero-Cold-Start Strategies for High-Throughput APIs',
    badge: 'Workshop Lead',
    avatarBg: 'from-blue-600 to-indigo-800',
    initials: 'PS',
  },
  {
    id: '4',
    name: 'Alex Rivera',
    role: 'Security & Compliance Lead',
    company: 'CloudShield Guard',
    topic: 'Automated IAM Governance & Cloud Incident Response',
    badge: 'SecOps',
    avatarBg: 'from-emerald-600 to-teal-800',
    initials: 'AR',
  },
  {
    id: '5',
    name: 'Elena Rostova',
    role: 'Staff Kubernetes Engineer',
    company: 'InfraScale Systems',
    topic: 'EKS at Extreme Scale: Multi-Cluster Autoscaling',
    badge: 'DevOps Track',
    avatarBg: 'from-rose-500 to-pink-700',
    initials: 'ER',
  },
  {
    id: '6',
    name: 'Marcus Brody',
    role: 'Cloud Architect & Founder',
    company: 'Nexacore Cloud',
    topic: 'Scaling Cloud SaaS from University to Enterprise',
    badge: 'Founder Story',
    avatarBg: 'from-amber-400 to-yellow-600',
    initials: 'MB',
  },
];

interface SponsorTier {
  name: string;
  badgeColor: string;
  logos: { name: string; tag: string; tech: string }[];
}

const sponsorTiers: SponsorTier[] = [
  {
    name: 'Cloud Titan (Tier 1)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    logos: [
      { name: 'Amazon Web Services', tag: 'Official Ecosystem Host', tech: 'Cloud Provider' },
      { name: 'CloudScale Titan', tag: 'Lead Enterprise Partner', tech: 'Compute & Observability' },
      { name: 'Nexus DataMesh', tag: 'Core AI Infrastructure', tech: 'Vector DB & GenAI' },
    ],
  },
  {
    name: 'Cloud Architect (Tier 2)',
    badgeColor: 'bg-violet-100 text-violet-800 border-violet-300',
    logos: [
      { name: 'DevSecGuard', tag: 'Security Sponsor', tech: 'Zero-Trust SecOps' },
      { name: 'FlowServerless', tag: 'Developer Tooling', tech: 'CI/CD Pipelines' },
      { name: 'SynapseDB', tag: 'Database Sponsor', tech: 'Distributed Storage' },
      { name: 'PulseTelemetry', tag: 'Monitoring Partner', tech: 'Real-time Metrics' },
    ],
  },
  {
    name: 'Community & Academic Champions',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
    logos: [
      { name: 'PICT Student Chapters', tag: 'Host Chapter', tech: 'Student Hub' },
      { name: 'Cloud Builders Guild', tag: 'Developer Network', tech: 'Open Source' },
      { name: 'AWS User Group Pune', tag: 'Regional Chapter', tech: 'Community Guild' },
      { name: 'HackerNest Global', tag: 'Hackathon Partner', tech: 'Tech Hackathons' },
    ],
  },
];

export const SpotlightSection: React.FC = () => {
  const [showProspectusModal, setShowProspectusModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadProspectus = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setShowProspectusModal(false);
    }, 2500);
  };

  return (
    <section id="speakers" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= SPEAKERS SPOTLIGHT ================= */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Mic2 className="w-3.5 h-3.5 text-amber-500" />
            <span>Featured Speakers &amp; Mentors</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Speakers Lineup
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            Hear from AWS Community Heroes, principal architects, and engineering leaders shaping
            the future of autonomous cloud systems.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {speakersList.map((speaker) => (
            <div
              key={speaker.id}
              className="group p-6 rounded-3xl bg-slate-50/80 hover:bg-white border border-slate-200/90 shadow-xs hover:shadow-[0_15px_35px_rgba(255,153,0,0.18)] hover:border-amber-400/80 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-start gap-4 mb-4">
                {/* Stylized Avatar */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${speaker.avatarBg} text-white font-extrabold text-xl flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300 border-2 border-white`}
                >
                  {speaker.initials}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 mb-1">
                    {speaker.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors truncate">
                    {speaker.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 truncate">{speaker.role}</p>
                  <p className="text-xs font-bold text-violet-600">{speaker.company}</p>
                </div>
              </div>

              {/* Talk Topic Card */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 mb-4 group-hover:border-amber-200 transition-colors">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Session Topic:
                </span>
                <p className="text-xs font-bold text-slate-800 line-clamp-2">{speaker.topic}</p>
              </div>

              {/* Footer social icons */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
                <span className="font-medium text-slate-500">Cloud City Track</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors"
                    aria-label={`LinkedIn for ${speaker.name}`}
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors"
                    aria-label={`Twitter for ${speaker.name}`}
                  >
                    <TwitterXIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= SPONSOR SPOTLIGHT ================= */}
        <div id="sponsors" className="pt-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5 text-blue-500" />
              <span>Sponsor Ecosystem</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Supported By Cloud Pioneers
            </h2>

            <p className="text-base sm:text-lg text-slate-600">
              Organizations empowering student developers at PICT Pune and the regional cloud community.
            </p>
          </div>

          {/* Tiered Sponsor Grid */}
          <div className="space-y-12 mb-16">
            {sponsorTiers.map((tier, tierIdx) => (
              <div key={tierIdx} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${tier.badgeColor}`}
                  >
                    {tier.name}
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div
                  className={`grid gap-4 ${
                    tierIdx === 0
                      ? 'grid-cols-1 md:grid-cols-3'
                      : tierIdx === 1
                      ? 'grid-cols-2 md:grid-cols-4'
                      : 'grid-cols-2 sm:grid-cols-4'
                  }`}
                >
                  {tier.logos.map((logo, logoIdx) => (
                    <div
                      key={logoIdx}
                      className="group p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-[0_10px_25px_rgba(255,153,0,0.15)] hover:border-amber-400 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                          {logo.tech}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-amber-400 group-hover:shadow-[0_0_6px_#FF9900] transition-colors" />
                      </div>

                      <div className="py-2">
                        <div className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                          {logo.name}
                        </div>
                        <div className="text-xs font-medium text-slate-500 mt-1">{logo.tag}</div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-amber-600 font-semibold">
                        <span>Partner Profile</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Become a Sponsor Callout Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0D1B2A] to-slate-900 text-white shadow-2xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase mb-3 border border-amber-400/30">
                <Award className="w-3.5 h-3.5" />
                Partnership Opportunities 2027
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Showcase Your Brand at Cloud City
              </h3>
              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                Connect directly with passionate student builders and developers at PICT Pune, host dedicated
                demos, and champion cloud education.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => setShowProspectusModal(true)}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-[0_0_20px_rgba(255,153,0,0.45)] hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Get Sponsor Prospectus</span>
              </button>

              <a
                href="mailto:sponsors@awscloudclub.org"
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors flex items-center justify-center"
              >
                Contact Sponsorship Team
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsor Prospectus Modal */}
      {showProspectusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowProspectusModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
              <Download className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
              Cloud City 2027 Prospectus
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Download the official sponsorship deck containing attendee demographics, booth floor
              plans, and tier deliverables.
            </p>

            {downloadSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold">
                  Prospectus download started! Check your downloads folder.
                </span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Company Email</label>
                  <input
                    type="email"
                    placeholder="partner@yourcompany.com"
                    defaultValue="sponsor@partner.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleDownloadProspectus}
                  className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  Download PDF Package
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

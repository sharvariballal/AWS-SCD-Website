import React from 'react';
import { 
  LinkedInIcon, 
  InstagramIcon, 
  TwitterXIcon, 
  DiscordIcon, 
  GitHubIcon 
} from './BrandIcons';

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    icon: LinkedInIcon,
    url: 'https://linkedin.com/company/aws-cloud-club',
    color: '#0A66C2',
  },
  {
    name: 'Instagram',
    icon: InstagramIcon,
    url: 'https://instagram.com/awscloudclub',
    color: '#E4405F',
  },
  {
    name: 'Twitter / X',
    icon: TwitterXIcon,
    url: 'https://x.com/awscloudclub',
    color: '#000000',
  },
  {
    name: 'Discord',
    icon: DiscordIcon,
    url: 'https://discord.gg/awscloudclub',
    color: '#5865F2',
  },
  {
    name: 'GitHub',
    icon: GitHubIcon,
    url: 'https://github.com/aws-cloud-clubs',
    color: '#181717',
  },
];

export const SocialSidebar: React.FC = () => {
  return (
    <aside
      aria-label="Social media quick links"
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-3.5 p-2.5 rounded-2xl bg-[#0D1B2A]/85 backdrop-blur-xl border border-slate-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300"
    >
      {/* Decorative top micro LED */}
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE] animate-pulse" />

      {socialLinks.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit our ${item.name}`}
            className="group relative p-2.5 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_16px_rgba(34,211,238,0.55)] border border-transparent hover:border-cyan-400/40"
          >
            <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />

            {/* Micro tooltip label */}
            <span className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-[11px] font-mono whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl">
              {item.name}
            </span>
          </a>
        );
      })}

      {/* Decorative bottom micro LED */}
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38BDF8]" />
    </aside>
  );
};

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
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-3.5 p-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_30px_rgba(13,27,42,0.12)] transition-all duration-300"
    >
      {/* Decorative top micro LED */}
      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#FF9900] animate-pulse" />

      {socialLinks.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit our ${item.name}`}
            className="group relative p-2.5 rounded-xl text-slate-600 hover:text-amber-500 hover:bg-amber-500/10 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_16px_rgba(255,153,0,0.55)] border border-transparent hover:border-amber-400/40"
          >
            <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />

            {/* Floating tooltip */}
            <span className="pointer-events-none absolute right-full mr-3.5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900/95 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-amber-300 opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1 border border-amber-500/30">
              {item.name}
              <span className="absolute -right-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900/95" />
            </span>
          </a>
        );
      })}

      {/* Decorative bottom micro LED */}
      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#8B5CF6]" />
    </aside>
  );
};

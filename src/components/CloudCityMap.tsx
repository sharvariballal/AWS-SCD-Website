import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DoorOpen, 
  Mic2, 
  Coffee, 
  Gamepad2, 
  MapPin, 
  Clock, 
  Users, 
  Gift, 
  X, 
  Layers
} from 'lucide-react';
import { playSound } from '../utils/audio';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface DistrictData {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  codename: string;
  icon: React.FC<{ className?: string }>;
  x: number; // percentage in artwork canvas
  y: number; // percentage in artwork canvas
  timing: string;
  capacity: string;
  description: string;
  perks: string[];
  scheduleSnippet: string[];
  color: string;
}

const districts: DistrictData[] = [
  {
    id: 'district-keynote',
    name: 'Keynote & Main Auditorium',
    shortName: 'Grand Stage',
    tagline: 'Grand Hall • Keynotes, Architecture deep dives & Firesides',
    codename: 'ZONE A // KEYNOTE',
    icon: Mic2,
    x: 48,
    y: 35,
    timing: '09:30 AM - 06:00 PM IST',
    capacity: '1,000 Seated Builders',
    description:
      'The central arena of Cloud City featuring inspiring keynotes from AWS Heroes, Principal Solutions Architects, and pioneering student founders.',
    perks: [
      'Keynotes from AWS Community Heroes & SA Leaders',
      'Live generative AI & serverless demonstrations',
      'Exclusive Stage-Front Swag Drops & AMA sessions',
    ],
    scheduleSnippet: [
      '09:30 AM - Opening Keynote: Architecting Next-Gen Cloud',
      '11:30 AM - Serverless Resiliency at Enterprise Scale',
      '02:30 PM - GenAI Deep Dive: Multimodal Agents with Bedrock',
    ],
    color: '#818CF8',
  },
  {
    id: 'district-hackathon',
    name: 'Arcade Alley & Challenge Arena',
    shortName: 'Arcade Zone',
    tagline: 'Live Hackathon, Cloud Challenges & Hands-on Terminal Labs',
    codename: 'ZONE B // ARCADE',
    icon: Gamepad2,
    x: 78,
    y: 48,
    timing: '11:00 AM - 05:00 PM IST',
    capacity: '350 Active Builders',
    description:
      'The competitive heart of Cloud City where teams battle in live architectural rescue sprints, debugging gauntlets, and AWS Bedrock agent hackathons.',
    perks: [
      'Bounties, trophies, and AWS cloud credit rewards',
      'High-speed 1 Gbps wired & Wi-Fi builder tables',
      'On-floor mentorship from Solutions Architects',
    ],
    scheduleSnippet: [
      '11:00 AM - Hackathon Briefing & Problem Statement Release',
      '01:30 PM - Sprint Checkpoint 1 & Mentor Review',
      '04:30 PM - Final Demos & Winner Celebrations',
    ],
    color: '#38BDF8',
  },
  {
    id: 'district-welcome',
    name: 'Welcome Portal & Swag Dispensary',
    shortName: 'Check-In Gate',
    tagline: 'Registration, RFID Badge Ingress & Holographic Swag Vault',
    codename: 'ZONE C // CHECK-IN',
    icon: DoorOpen,
    x: 24,
    y: 68,
    timing: '08:30 AM - 10:30 AM IST',
    capacity: 'Continuous Flow',
    description:
      'The gateway to Cloud City. Scan your QR pass, claim your physical builder kit (heavyweight cotton tee, holographic sticker pack, smart badge).',
    perks: [
      'Zero-wait QR code check-in & badge dispensing',
      'Heavyweight cotton Cloud City 2027 tee & stickers',
      'Direct bag-drop cloakroom & helpdesk support',
    ],
    scheduleSnippet: [
      '08:30 AM - Gates & Welcome Lounge Open',
      '09:00 AM - Morning Breakfast & Builder Networking',
      '10:30 AM - Check-in Closes for Main Keynote',
    ],
    color: '#A855F7',
  },
  {
    id: 'district-cafe',
    name: 'Compute Café & Dining Concourse',
    shortName: 'Dining Hall',
    tagline: 'Multi-course Buffet Lunch, Artisanal High-Tea & Networking',
    codename: 'ZONE D // DINING',
    icon: Coffee,
    x: 62,
    y: 78,
    timing: '08:30 AM - 05:30 PM IST',
    capacity: 'Full Summit Catering',
    description:
      'All passes include complete summit hospitality: welcome South Indian breakfast, lavish buffet lunch at Dakkhan Banquet Hall, and high-tea coffee sessions.',
    perks: [
      'Hot South Indian morning breakfast spread',
      'Lavish multi-course banquet buffet lunch',
      'All-day artisanal coffee & Masala Chai breaks',
    ],
    scheduleSnippet: [
      '08:30 AM - Morning Welcome Breakfast & Filter Coffee',
      '01:00 PM - Multi-Course Banquet Buffet Lunch',
      '04:30 PM - High-Tea & Sundown Snack Concourse',
    ],
    color: '#FB7185',
  },
];

export const CloudCityMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(districts[1]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const headerRef = useScrollReveal();
  const mapRef = useScrollReveal();

  const handleSelectDistrict = (district: DistrictData) => {
    playSound('click');
    setSelectedDistrict(district);
    setIsDrawerOpen(true);
  };

  return (
    <section id="city-interactive-map" className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div ref={headerRef} className="sr-reveal flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 mb-2 uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              <span className="text-slate-500">//</span>
              <span>Metropolis Blueprint</span>
            </div>
            <h2 className="font-anton text-3xl sm:text-5xl text-white tracking-tight">
              CLOUD CITY <span className="text-cyan-400">DISTRICT</span> MAP
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
              Explore the four core districts of our tech metropolis. Tap any district to inspect agendas and venue details.
            </p>
          </div>
        </div>

        {/* Master Cityscape & Inspector Layout: Fills 100% Edge-to-Edge with Zero Letterbox */}
        <div ref={mapRef} className="sr-reveal relative w-full aspect-[1024/765] min-h-[460px] sm:min-h-[580px] lg:min-h-[700px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(76,29,149,0.25)] bg-gradient-to-b from-[#2A114B] to-[#120422] select-none hover:border-cyan-500/30 transition-all duration-300">
          
          {/* Cloud City Isometric Artwork: 100% Full-Bleed Edge-to-Edge Fill */}
          <img
            src="/posters/cloud-city-map.png"
            alt="Cloud City Metropolis Map"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />

          {/* Left-Side Sliding District Inspector Drawer */}
          <AnimatePresence>
            {isDrawerOpen && (
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="absolute top-0 left-0 bottom-0 z-40 w-full sm:w-[420px] bg-[#16082B]/95 backdrop-blur-xl border-r border-cyan-500/30 p-6 flex flex-col justify-between shadow-2xl text-white overflow-y-auto"
              >
                <div>
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <span 
                      style={{ color: selectedDistrict.color }}
                      className="text-xs font-mono font-black tracking-widest uppercase flex items-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      {selectedDistrict.codename}
                    </span>

                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-anton text-2xl text-white tracking-tight mb-1">
                    {selectedDistrict.name}
                  </h3>
                  <p className="text-xs font-medium text-cyan-300 mb-4 font-mono">
                    {selectedDistrict.tagline}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {selectedDistrict.description}
                  </p>

                  {/* Quick Specs Cards */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-1.5 text-cyan-400 mb-1 text-[10px] uppercase">
                        <Clock className="w-3 h-3" />
                        <span>Hours</span>
                      </div>
                      <div className="font-bold text-white text-[11px] leading-tight">
                        {selectedDistrict.timing}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-1.5 text-purple-400 mb-1 text-[10px] uppercase">
                        <Users className="w-3 h-3" />
                        <span>Format</span>
                      </div>
                      <div className="font-bold text-white text-[11px] leading-tight">
                        {selectedDistrict.capacity}
                      </div>
                    </div>
                  </div>

                  {/* District Highlights */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-cyan-400" />
                      <span>District Amenities &amp; Swag</span>
                    </h4>

                    <div className="space-y-2">
                      {selectedDistrict.perks.map((perk, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[10px] font-mono text-slate-400">
                    <MapPin className="w-3 h-3 inline mr-1 text-cyan-400" />
                    <span>Dakkhan Banquet Hall, Pune</span>
                  </div>
                  <a
                    href="#ticket-dispenser"
                    onClick={() => setIsDrawerOpen(false)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all"
                  >
                    <span>Reserve Pass</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Clickable Hotspot Pins with Labelled Buttons Locked to Coordinates */}
          {districts.map((district) => {
            const isSelected = selectedDistrict.id === district.id;
            const Icon = district.icon;

            return (
              <div
                key={district.id}
                style={{
                  left: `${district.x}%`,
                  top: `${district.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
              >
                {/* Subtle Pulsing Radar Beacon */}
                <div 
                  style={{ borderColor: district.color }}
                  className="absolute -inset-2.5 rounded-full border-2 border-dashed animate-ping pointer-events-none opacity-40" 
                />

                {/* Labelled District Button */}
                <button
                  onClick={() => handleSelectDistrict(district)}
                  aria-label={`Inspect ${district.name}`}
                  className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.5)] ${
                    isSelected
                      ? 'bg-cyan-400 text-slate-950 font-black shadow-[0_0_30px_rgba(34,211,238,0.7)] scale-105 sm:scale-110 z-30 ring-2 ring-white'
                      : 'bg-[#180933]/92 hover:bg-[#2A114B] text-white border border-purple-400/50 hover:border-cyan-400 hover:scale-105'
                  }`}
                >
                  {/* Circular Icon Pin */}
                  <div 
                    style={{ backgroundColor: isSelected ? '#003366' : district.color }}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm transition-colors"
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.2]" />
                  </div>

                  {/* District Label Text */}
                  <span className="text-[11px] sm:text-xs font-mono font-bold tracking-tight whitespace-nowrap drop-shadow-sm">
                    <span className="hidden sm:inline">{district.name}</span>
                    <span className="sm:hidden">{district.shortName}</span>
                  </span>
                </button>
              </div>
            );
          })}

          {/* Bottom Metadata Bar */}
          <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-purple-200/90 bg-[#070415]/85 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-white/10 pointer-events-none shadow-lg">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="truncate">Cloud City Metropolis Grid • 4 Active Districts</span>
            </span>
            <span className="hidden sm:inline text-slate-300">
              Interactive Metropolis Map
            </span>
          </div>

        </div>

        {/* Mobile Quick-Tap District Selector (Thumb-friendly on phones) */}
        <div className="sm:hidden grid grid-cols-2 gap-2 mt-4">
          {districts.map((district) => {
            const isSelected = selectedDistrict.id === district.id && isDrawerOpen;
            const Icon = district.icon;
            return (
              <button
                key={district.id}
                onClick={() => handleSelectDistrict(district)}
                className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-400 border-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)] font-black'
                    : 'bg-[#0D1B2A]/90 border-white/10 text-white hover:bg-[#0D1B2A] font-bold'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-slate-950 text-cyan-300' : 'bg-white/10 text-cyan-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="leading-tight overflow-hidden">
                  <div className="text-xs font-black truncate">{district.name}</div>
                  <div className={`text-[10px] font-mono ${isSelected ? 'text-slate-900/80' : 'text-slate-400'}`}>
                    Tap to inspect
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

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
  Compass,
  Layers
} from 'lucide-react';
import { playSound } from '../utils/audio';

export interface DistrictData {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  codename: string;
  icon: React.FC<{ className?: string }>;
  x: number; // percentage in artwork canvas
  y: number;
  venueDetail: string;
  timing: string;
  capacity: string;
  description: string;
  perks: string[];
  sessions: string[];
  color: string;
}

const districts: DistrictData[] = [
  {
    id: 'welcome-gate',
    name: 'The Welcome Gate',
    shortName: 'Welcome Gate',
    tagline: 'Main Ingress, Check-in & Badge Distribution',
    codename: 'ZONE 01 • METROPOLIS INGRESS',
    icon: DoorOpen,
    x: 50,
    y: 69,
    venueDetail: 'Ground Floor Grand Concourse, Dakkhan Hall',
    timing: '08:30 AM – 10:00 AM (Ongoing)',
    capacity: 'Rapid Throughput Check-In',
    description: 'The monumental entrance into Cloud City. Every attendee scans their KonfHub QR ticket, validates their student PRN or college ID, and receives their exclusive holographic Cloud City credential badge and welcome swag pouch.',
    perks: [
      'Official Cloud City Holographic Lanyard Badge',
      'AWS Builder Sticker Pack & Welcome Kit',
      'Fast-track Registration QR Scanners',
      'Volunteer Navigator Desk',
    ],
    sessions: [
      '08:30 AM - Gates Open & Badge Collection',
      '09:15 AM - Morning Concourse Gathering',
    ],
    color: '#F59E0B',
  },
  {
    id: 'speakers-district',
    name: 'Speakers District',
    shortName: 'Speakers Stage',
    tagline: 'Central Grand Stage & Keynote Epicenter',
    codename: 'ZONE 02 • MAIN AUDITORIUM',
    icon: Mic2,
    x: 50,
    y: 28,
    venueDetail: 'Grand Auditorium Stage with 4K LED Backdrop & Surround Sound',
    timing: '10:00 AM – 04:30 PM (Sequential)',
    capacity: '1,000+ Seated Attendees',
    description: 'The intellectual heart of the summit. Featuring a colossal ultra-wide LED stage where AWS Community Heroes, Principal Solutions Architects, and Industry Leaders present sequential deep-dives with zero conflicting schedules.',
    perks: [
      'Live Keynotes from AWS Heroes & Leaders',
      'Generative AI & Serverless Deep Dives',
      'Interactive Open-Mic Q&A with Speakers',
      'Live Stage Architecture Demonstrations',
    ],
    sessions: [
      '10:00 AM - Opening Keynote: Architecting Cloud Metropolises',
      '11:45 AM - Production Generative AI on Amazon Bedrock',
      '02:00 PM - Multi-Cluster Platform Engineering at Scale',
    ],
    color: '#A855F7',
  },
  {
    id: 'arcade-alley',
    name: 'Arcade Alley',
    shortName: 'Arcade Alley',
    tagline: 'Hands-on Builder Stations & Carnival Stalls',
    codename: 'ZONE 03 • INNOVATION EXPO',
    icon: Gamepad2,
    x: 71,
    y: 37,
    venueDetail: 'Interactive Innovation Arcade & Demo Concourse',
    timing: '10:30 AM – 05:00 PM (Continuous)',
    capacity: 'Interactive Booth Stalls',
    description: 'A vibrant gaming and innovation zone packed with DIY carnival stalls, AWS ecosystem sponsor tables, and architecture speed challenges. Collect challenge stamps to unlock rare ecosystem prizes and stickers.',
    perks: [
      'Ecosystem Sponsor Interactive Booths',
      'Hands-on Architecture Speed-Runs',
      'Community Project Demos & Prototypes',
      'Bonus Swag & Ecosystem Challenge Cards',
    ],
    sessions: [
      '11:00 AM - Challenge Booths Open',
      '03:00 PM - Cloud City Architecture Speed Runs',
    ],
    color: '#38BDF8',
  },
  {
    id: 'compute-cafe',
    name: 'Compute Cafe',
    shortName: 'Compute Cafe',
    tagline: 'All-Day Dining, Artisan Coffee & Refreshments',
    codename: 'ZONE 04 • REFUEL CONCOURSE',
    icon: Coffee,
    x: 83,
    y: 50,
    venueDetail: 'East Wing Dining Pavilion & Outdoor Terrace Lounge',
    timing: '08:30 AM – 05:30 PM (Continuous)',
    capacity: 'Continuous Buffet Service',
    description: 'A lavish culinary wing designed to fuel high-velocity thinking. Every registered builder enjoys a full hot South Indian breakfast, an elaborate multi-course buffet lunch, and afternoon high-tea with artisanal coffee included with their pass.',
    perks: [
      'Full Multi-Course Buffet Lunch Included',
      'Fresh Artisanal Filter Coffee & High-Tea Snacks',
      'Casual Discussion Counters & Charging Docks',
      'Speaker & Mentor Networking Corner',
    ],
    sessions: [
      '08:30 AM - Morning Breakfast & Coffee Station',
      '01:00 PM - Grand Buffet Lunch Service',
      '04:30 PM - High-Tea & Sundown Snack Concourse',
    ],
    color: '#FB7185',
  },
];

export const CloudCityMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(districts[1]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSelectDistrict = (district: DistrictData) => {
    playSound('click');
    setSelectedDistrict(district);
    setIsDrawerOpen(true);
  };

  return (
    <section id="city-interactive-map" className="py-20 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b-2 border-purple-900/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-300 bg-purple-100 text-purple-900 text-xs font-mono font-black uppercase mb-3 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-purple-700" />
              <span>Metropolis Blueprint</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#260B49] tracking-tight">
              Cloud City District Map
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl font-normal">
              Explore the four core districts of our tech metropolis. Tap any district to inspect agendas and venue details.
            </p>
          </div>
        </div>

        {/* Master Cityscape & Inspector Layout: Fills 100% Edge-to-Edge with Zero Letterbox */}
        <div className="relative w-full aspect-[1024/765] min-h-[460px] sm:min-h-[580px] lg:min-h-[700px] rounded-3xl overflow-hidden border-2 border-purple-900/20 shadow-[0_25px_60px_rgba(76,29,149,0.18)] bg-gradient-to-b from-[#2A114B] to-[#120422] select-none">
          
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
                className="absolute top-0 left-0 bottom-0 z-40 w-full sm:w-[420px] bg-[#16082B]/95 backdrop-blur-xl border-r-2 border-purple-500/30 p-6 flex flex-col justify-between shadow-2xl text-white overflow-y-auto"
              >
                <div>
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-purple-800/60 mb-5">
                    <span 
                      style={{ color: selectedDistrict.color }}
                      className="text-xs font-mono font-black tracking-widest uppercase flex items-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      {selectedDistrict.codename}
                    </span>

                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-200 hover:text-white hover:bg-purple-800 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-black text-white tracking-tight mb-1">
                    {selectedDistrict.name}
                  </h3>
                  <p className="text-xs font-medium text-amber-300/90 mb-4 font-mono">
                    {selectedDistrict.tagline}
                  </p>

                  <p className="text-xs text-purple-200/90 leading-relaxed mb-6 font-normal">
                    {selectedDistrict.description}
                  </p>

                  {/* Quick Specs Cards */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/60">
                      <div className="flex items-center gap-1.5 text-purple-400 mb-1 text-[10px] uppercase">
                        <Clock className="w-3 h-3" />
                        <span>Hours</span>
                      </div>
                      <div className="font-bold text-white text-[11px] leading-tight">
                        {selectedDistrict.timing}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/60">
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
                    <h4 className="text-[11px] font-mono font-black text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-amber-400" />
                      <span>District Amenities &amp; Swag</span>
                    </h4>

                    <div className="space-y-2">
                      {selectedDistrict.perks.map((perk, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-900/30 border border-purple-700/30 text-xs text-purple-100"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-purple-800/60 flex items-center justify-between">
                  <div className="text-[10px] font-mono text-purple-400">
                    <MapPin className="w-3 h-3 inline mr-1 text-purple-400" />
                    <span>Dakkhan Banquet Hall, Pune</span>
                  </div>
                  <a
                    href="#ticket-dispenser"
                    onClick={() => setIsDrawerOpen(false)}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-md"
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
                      ? 'bg-amber-400 text-purple-950 font-black shadow-[0_0_30px_rgba(251,191,36,0.7)] scale-105 sm:scale-110 z-30 ring-2 ring-white'
                      : 'bg-[#180933]/92 hover:bg-[#2A114B] text-white border border-purple-400/50 hover:border-amber-400 hover:scale-105'
                  }`}
                >
                  {/* Circular Icon Pin */}
                  <div 
                    style={{ backgroundColor: isSelected ? '#3B1578' : district.color }}
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
          <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-purple-200/90 bg-purple-950/80 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-purple-500/30 pointer-events-none shadow-lg">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate">Cloud City Metropolis Grid • 4 Active Districts</span>
            </span>
            <span className="hidden sm:inline text-purple-200">
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
                    ? 'bg-amber-400 border-amber-500 text-purple-950 shadow-md font-black'
                    : 'bg-white border-purple-200 text-purple-950 hover:bg-purple-50 font-bold'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-purple-950 text-amber-300' : 'bg-purple-100 text-purple-700'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="leading-tight overflow-hidden">
                  <div className="text-xs font-black truncate">{district.name}</div>
                  <div className={`text-[10px] font-mono ${isSelected ? 'text-purple-950/75' : 'text-purple-600'}`}>
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

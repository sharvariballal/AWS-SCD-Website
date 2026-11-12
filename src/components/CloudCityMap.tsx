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
import { CityMascotGuide } from './CityMascotGuide';

export interface DistrictData {
  id: string;
  name: string;
  tagline: string;
  codename: string;
  icon: React.FC<{ className?: string }>;
  x: number; // percentage in canvas
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
    tagline: 'Main Ingress, Check-in & Badge Distribution',
    codename: 'ZONE 01 • METROPOLIS INGRESS',
    icon: DoorOpen,
    x: 50,
    y: 84,
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
    tagline: 'Central Grand Stage & Keynote Epicenter',
    codename: 'ZONE 02 • MAIN AUDITORIUM',
    icon: Mic2,
    x: 50,
    y: 22,
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
    id: 'compute-cafe',
    name: 'Compute Café & Coffee Lounge',
    tagline: 'All-Day Dining, Artisan Coffee & Refreshments',
    codename: 'ZONE 03 • REFUEL CONCOURSE',
    icon: Coffee,
    x: 82,
    y: 52,
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
  {
    id: 'arcade-alley',
    name: 'Arcade Alley & Expo Pods',
    tagline: 'Hands-on Builder Stations & Carnival Stalls',
    codename: 'ZONE 04 • INNOVATION EXPO',
    icon: Gamepad2,
    x: 18,
    y: 52,
    venueDetail: 'West Wing Interactive Expo & Demo Concourse',
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
];

export const CloudCityMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(districts[1]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasCustomIllustration, setHasCustomIllustration] = useState(false);

  const handleSelectDistrict = (district: DistrictData) => {
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
            {/* Solid Non-Gradient Heading */}
            <h2 className="text-3xl sm:text-5xl font-black text-[#260B49] tracking-tight">
              Cloud City District Map
            </h2>
            <p className="text-sm sm:text-base text-purple-950/75 mt-2 max-w-2xl font-medium">
              Explore the four core districts of our student-powered tech metropolis, featuring keynotes, workshops, dining, and gaming pavilions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <CityMascotGuide zone="map" />
          </div>
        </div>

        {/* Master Cityscape & Inspector Layout */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-purple-900/20 shadow-[0_25px_60px_rgba(76,29,149,0.18)] bg-[#0C0418] min-h-[580px] sm:min-h-[660px]">
          
          {/* Subtle Ambient City Grid Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.18),transparent_70%)] pointer-events-none" />

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

          {/* Full Vector Isometric Metropolis Cityscape / Custom Artist Illustration Slot */}
          <div className="w-full h-[580px] sm:h-[660px] relative overflow-hidden flex items-center justify-center p-2 sm:p-6 select-none">
            
            {/* Custom Artist Illustration: When uploaded as /posters/cloud-city-map.png, it displays seamlessly */}
            <img
              src="/posters/cloud-city-map.png"
              alt="Cloud City Metropolis Map"
              onLoad={() => setHasCustomIllustration(true)}
              onError={() => setHasCustomIllustration(false)}
              className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-300 z-10 ${
                hasCustomIllustration ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            />

            {!hasCustomIllustration && (
            <svg
              viewBox="0 0 1000 760"
              className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Night Sky Gradient */}
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0B0318" />
                  <stop offset="50%" stopColor="#14062E" />
                  <stop offset="100%" stopColor="#1B0938" />
                </linearGradient>

                {/* Ground Platform Gradient */}
                <linearGradient id="groundGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#120626" />
                  <stop offset="50%" stopColor="#1C093B" />
                  <stop offset="100%" stopColor="#0E0420" />
                </linearGradient>

                {/* Road Pavement Gradient */}
                <linearGradient id="roadGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#250E4C" />
                  <stop offset="50%" stopColor="#3B1578" />
                  <stop offset="100%" stopColor="#250E4C" />
                </linearGradient>

                {/* Building Shading */}
                <linearGradient id="wallLeft" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#311068" />
                  <stop offset="100%" stopColor="#1E0743" />
                </linearGradient>
                <linearGradient id="wallRight" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4A1998" />
                  <stop offset="100%" stopColor="#2B0A5E" />
                </linearGradient>
                <linearGradient id="roofGlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#4C1D95" />
                </linearGradient>

                {/* Zone Roof Colors */}
                <linearGradient id="roofSpeakers" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#6D28D9" />
                </linearGradient>
                <linearGradient id="roofGate" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <linearGradient id="roofCafe" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FB7185" />
                  <stop offset="100%" stopColor="#BE123C" />
                </linearGradient>
                <linearGradient id="roofArcade" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#0369A1" />
                </linearGradient>

                {/* Neon Window Glow Pattern */}
                <pattern id="windowGrid" width="12" height="12" patternUnits="userSpaceOnUse">
                  <rect x="2" y="2" width="8" height="8" rx="1.5" fill="#FBBF24" opacity="0.6" />
                </pattern>
                <pattern id="windowGridCyan" width="12" height="12" patternUnits="userSpaceOnUse">
                  <rect x="2" y="2" width="8" height="8" rx="1.5" fill="#38BDF8" opacity="0.65" />
                </pattern>
              </defs>

              {/* 1. Backdrop Skyline Silhouettes */}
              <g opacity="0.4">
                {/* Far distant towers */}
                <rect x="180" y="40" width="40" height="150" fill="#200B44" rx="2" />
                <rect x="230" y="70" width="55" height="120" fill="#1C093B" rx="2" />
                <rect x="710" y="50" width="60" height="140" fill="#240C4C" rx="2" />
                <rect x="780" y="80" width="45" height="110" fill="#1A0737" rx="2" />
                {/* Spire Antennas */}
                <line x1="200" y1="40" x2="200" y2="10" stroke="#FBBF24" strokeWidth="2" />
                <circle cx="200" cy="10" r="2.5" fill="#FBBF24" />
                <line x1="740" y1="50" x2="740" y2="20" stroke="#38BDF8" strokeWidth="2" />
                <circle cx="740" cy="20" r="2.5" fill="#38BDF8" />
              </g>

              {/* 2. Main Metropolis Isometric Base Slab */}
              <polygon
                points="500,100 940,340 500,680 60,340"
                fill="url(#groundGrad)"
                stroke="#4C1D95"
                strokeWidth="2"
              />

              {/* Base Platform Extrusion Depth */}
              <polygon points="60,340 500,680 500,720 60,380" fill="#100522" stroke="#2D0B58" strokeWidth="1" />
              <polygon points="500,680 940,340 940,380 500,720" fill="#0A0317" stroke="#2D0B58" strokeWidth="1" />

              {/* 3. Isometric City Boulevards & Highway Lanes */}
              {/* Main South-to-North Avenue (Cloudway Blvd) */}
              <polygon points="460,140 540,140 540,660 460,660" fill="url(#roadGrad)" opacity="0.9" />
              {/* Dashed Centerline Glow */}
              <line x1="500" y1="150" x2="500" y2="650" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="10,14" opacity="0.8" />

              {/* West-to-East Cross Boulevard (Lambda Expressway) */}
              <polygon points="120,320 880,320 880,380 120,380" fill="url(#roadGrad)" opacity="0.9" />
              <line x1="130" y1="350" x2="870" y2="350" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="10,14" opacity="0.8" />

              {/* Elevated Monorail Skyway Ring */}
              <path
                d="M 220 280 Q 500 160 780 280 T 500 480 Z"
                fill="none"
                stroke="#A78BFA"
                strokeWidth="2"
                strokeDasharray="6,8"
                opacity="0.45"
              />
              {/* Monorail Train Unit */}
              <rect x="620" y="220" width="30" height="8" rx="3" fill="#38BDF8" opacity="0.9" />
              <rect x="655" y="220" width="30" height="8" rx="3" fill="#38BDF8" opacity="0.9" />

              {/* 4. Central Metropolis Green Quadrangle & Park Plaza */}
              <g>
                <polygon points="500,290 560,330 500,370 440,330" fill="#064E3B" stroke="#059669" strokeWidth="1.5" />
                {/* Geometric Isometric Trees */}
                <circle cx="480" cy="320" r="5" fill="#10B981" />
                <circle cx="520" cy="320" r="6" fill="#10B981" />
                <circle cx="480" cy="340" r="6" fill="#059669" />
                <circle cx="520" cy="340" r="5" fill="#10B981" />
                {/* Central Fount / Node */}
                <circle cx="500" cy="330" r="4" fill="#38BDF8" opacity="0.8" />
              </g>

              {/* 5. Surrounding Commercial Skyscrapers (Context Towers) */}
              {/* Northwest Office Complex */}
              <g>
                <polygon points="260,200 320,230 320,130 260,100" fill="url(#wallLeft)" stroke="#5B21B6" strokeWidth="1" />
                <polygon points="320,230 380,200 380,100 320,130" fill="url(#wallRight)" stroke="#5B21B6" strokeWidth="1" />
                <polygon points="320,100 380,70 320,40 260,70" fill="url(#roofGlow)" stroke="#7C3AED" strokeWidth="1" />
                {/* Windows */}
                <rect x="330" y="115" width="40" height="90" fill="url(#windowGrid)" opacity="0.4" />
              </g>

              {/* Northeast Cloud Architecture Tower */}
              <g>
                <polygon points="620,200 680,230 680,110 620,80" fill="url(#wallLeft)" stroke="#5B21B6" strokeWidth="1" />
                <polygon points="680,230 740,200 740,80 680,110" fill="url(#wallRight)" stroke="#5B21B6" strokeWidth="1" />
                <polygon points="680,80 740,50 680,20 620,50" fill="url(#roofGlow)" stroke="#7C3AED" strokeWidth="1" />
                {/* Windows */}
                <rect x="630" y="95" width="40" height="100" fill="url(#windowGridCyan)" opacity="0.4" />
              </g>

              {/* =========================================================================
                  ZONE 02: SPEAKERS DISTRICT (Grand Geodesic Stage & Broadcast Spire)
                  ========================================================================= */}
              <g 
                onClick={() => handleSelectDistrict(districts[1])}
                className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              >
                {/* Base Tier */}
                <polygon points="400,200 500,250 500,190 400,140" fill="url(#wallLeft)" stroke="#8B5CF6" strokeWidth="1.5" />
                <polygon points="500,250 600,200 600,140 500,190" fill="url(#wallRight)" stroke="#8B5CF6" strokeWidth="1.5" />
                <polygon points="500,140 600,90 500,40 400,90" fill="url(#roofSpeakers)" stroke="#C4B5FD" strokeWidth="2" />

                {/* Main Amphitheater Geodesic Dome */}
                <path
                  d="M 440,110 Q 500,40 560,110 Z"
                  fill="url(#roofSpeakers)"
                  stroke="#E9D5FF"
                  strokeWidth="2"
                  opacity="0.9"
                />

                {/* Colossal Broadcast Needle Antenna */}
                <line x1="500" y1="50" x2="500" y2="0" stroke="#FBBF24" strokeWidth="3" />
                <circle cx="500" cy="0" r="4.5" fill="#FBBF24" className="animate-pulse" />
                {/* Radio Wave Ripples */}
                <ellipse cx="500" cy="0" rx="16" ry="6" fill="none" stroke="#FBBF24" strokeWidth="1.2" opacity="0.6" />
                <ellipse cx="500" cy="0" rx="26" ry="10" fill="none" stroke="#FBBF24" strokeWidth="0.8" opacity="0.3" />

                {/* Stage Sign Text */}
                <text x="500" y="170" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontFamily="sans-serif" fontWeight="900" letterSpacing="1">
                  SPEAKERS DISTRICT
                </text>
                <text x="500" y="185" textAnchor="middle" fill="#E9D5FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  [ 1,000-SEAT MAIN AUDITORIUM ]
                </text>
              </g>

              {/* =========================================================================
                  ZONE 04: ARCADE ALLEY & EXPO PODS (West Innovation Concourse)
                  ========================================================================= */}
              <g 
                onClick={() => handleSelectDistrict(districts[3])}
                className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              >
                {/* Cyber Arcade Structure */}
                <polygon points="120,420 240,480 240,400 120,340" fill="url(#wallLeft)" stroke="#38BDF8" strokeWidth="1.5" />
                <polygon points="240,480 320,440 320,360 240,400" fill="url(#wallRight)" stroke="#38BDF8" strokeWidth="1.5" />
                <polygon points="220,340 320,390 220,440 120,390" fill="url(#roofArcade)" stroke="#7DD3FC" strokeWidth="2" />

                {/* Illuminated Arcade Marquee Roof Signs */}
                <rect x="150" y="370" width="70" height="24" rx="4" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1.5" />
                <text x="185" y="386" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="900">
                  ARCADE ALLEY
                </text>

                {/* Tech Pod Stalls Along the Boulevard */}
                <polygon points="260,450 290,465 290,445 260,430" fill="#0284C7" stroke="#38BDF8" strokeWidth="1" />
                <polygon points="290,465 315,450 315,430 290,445" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />
                <polygon points="280,425 305,438 280,450 255,438" fill="#38BDF8" opacity="0.8" />
              </g>

              {/* =========================================================================
                  ZONE 03: COMPUTE CAFÉ & COFFEE LOUNGE (East Dining Concourse)
                  ========================================================================= */}
              <g 
                onClick={() => handleSelectDistrict(districts[2])}
                className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              >
                {/* Main Dining Pavilion Facades */}
                <polygon points="680,440 780,490 780,410 680,360" fill="url(#wallLeft)" stroke="#FB7185" strokeWidth="1.5" />
                <polygon points="780,490 880,440 880,360 780,410" fill="url(#wallRight)" stroke="#FB7185" strokeWidth="1.5" />
                <polygon points="780,360 880,410 780,460 680,410" fill="url(#roofCafe)" stroke="#FDA4AF" strokeWidth="2" />

                {/* Glowing Café Sign & Steam */}
                <text x="780" y="420" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontFamily="sans-serif" fontWeight="900">
                  COMPUTE CAFÉ
                </text>
                <text x="780" y="435" textAnchor="middle" fill="#FFE4E6" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  [ BUFFET &amp; SPECIALTY COFFEE ]
                </text>

                {/* Cantilevered Glass Sun Terrace & Parasols */}
                <polygon points="730,470 770,490 770,475 730,455" fill="#F43F5E" opacity="0.6" />
                <circle cx="750" cy="460" r="5" fill="#FBBF24" />
                <circle cx="765" cy="470" r="5" fill="#FBBF24" />
              </g>

              {/* =========================================================================
                  ZONE 01: THE WELCOME GATE (Grand South Metropolis Portal)
                  ========================================================================= */}
              <g 
                onClick={() => handleSelectDistrict(districts[0])}
                className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              >
                {/* Twin Pylon Gate Towers */}
                {/* Left Arch Tower */}
                <polygon points="380,630 440,660 440,580 380,550" fill="url(#wallLeft)" stroke="#F59E0B" strokeWidth="1.5" />
                <polygon points="440,660 470,645 470,565 440,580" fill="url(#wallRight)" stroke="#F59E0B" strokeWidth="1.5" />

                {/* Right Arch Tower */}
                <polygon points="530,645 560,660 560,580 530,565" fill="url(#wallLeft)" stroke="#F59E0B" strokeWidth="1.5" />
                <polygon points="560,660 620,630 620,550 560,580" fill="url(#wallRight)" stroke="#F59E0B" strokeWidth="1.5" />

                {/* Grand Suspension Portal Arch Overhead */}
                <polygon points="500,530 620,585 500,640 380,585" fill="url(#roofGate)" stroke="#FDE68A" strokeWidth="2" />

                {/* Glowing Ingress Walkway & Scanner Concourse */}
                <polygon points="500,650 540,675 500,700 460,675" fill="#FBBF24" opacity="0.4" stroke="#FBBF24" strokeWidth="1.5" />

                <text x="500" y="585" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontFamily="sans-serif" fontWeight="900" letterSpacing="1">
                  THE WELCOME GATE
                </text>
                <text x="500" y="600" textAnchor="middle" fill="#FEF3C7" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  [ CHECK-IN &amp; BADGE INGRESS ]
                </text>
              </g>

            </svg>
            )}

            {/* Clickable Hotspot Pins Overlay for High-Precision Interaction */}
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
                  {/* Subtle Radar Ring */}
                  <div 
                    style={{ borderColor: district.color }}
                    className="absolute -inset-2 rounded-full border border-dashed animate-ping pointer-events-none opacity-40" 
                  />

                  {/* Pin Button */}
                  <button
                    onClick={() => handleSelectDistrict(district)}
                    className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-amber-400 text-purple-950 font-black shadow-lg scale-105 sm:scale-110 z-30 ring-2 ring-white'
                        : 'bg-[#180933]/90 hover:bg-[#250C48] text-purple-100 border border-purple-400/50 hover:border-amber-400'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[10px] sm:text-xs font-mono font-bold whitespace-nowrap hidden sm:inline">
                      {district.name}
                    </span>
                    <span className="text-[10px] font-mono font-bold whitespace-nowrap sm:hidden">
                      {district.id === 'welcome-gate' ? 'Gate' : district.id === 'speakers-district' ? 'Stage' : district.id === 'compute-cafe' ? 'Café' : 'Arcade'}
                    </span>
                  </button>
                </div>
              );
            })}

            {/* Bottom Clean CAD Metadata Bar (No Tacky Instructions) */}
            <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-purple-300/80 bg-purple-950/70 backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-purple-800/60 pointer-events-none">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="truncate">Cloud City Metropolis Grid • 4 Zones</span>
              </span>
              <span className="hidden sm:inline text-purple-300">
                Interactive District Index
              </span>
            </div>

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

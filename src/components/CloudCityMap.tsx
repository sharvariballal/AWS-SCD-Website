import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DoorOpen, 
  Mic2, 
  Coffee, 
  Gamepad2, 
  MapPin, 
  Sparkles, 
  Clock, 
  Users, 
  Gift, 
  X, 
  ArrowRight,
  Compass
} from 'lucide-react';
import { playSound } from '../utils/audio';
import { ScrollReveal } from './ScrollReveal';

export interface DistrictData {
  id: string;
  name: string;
  tagline: string;
  codename: string;
  icon: React.FC<{ className?: string }>;
  // Coordinates relative to map container in percentage
  x: number; 
  y: number;
  venueDetail: string;
  timing: string;
  capacity: string;
  description: string;
  perks: string[];
  sessions: string[];
  badgeColor: string;
}

const districts: DistrictData[] = [
  {
    id: 'welcome-gate',
    name: 'The Welcome Gate',
    tagline: 'Main Ingress, Check-in & Badge Distribution',
    codename: 'ZONE 01 • FOYER PORTAL',
    icon: DoorOpen,
    x: 50,
    y: 72,
    venueDetail: 'Ground Floor Grand Foyer, Dakkhan Banquet Hall, Pune',
    timing: '08:30 AM – 10:00 AM (Ongoing)',
    capacity: 'Rapid Throughput Check-In',
    description: 'The monumental entrance into Cloud City. Every attendee scans their KonfHub QR ticket, validates their student PRN or college ID, and receives their exclusive holographic Cloud City credential badge and welcome swag pouch.',
    perks: [
      'Official Cloud City Holographic Lanyard Badge',
      'AWS Builder Sticker Pack & Welcome Kit',
      'Fast-track Registration QR Scanners',
      'Volunteer Guide Desk & Venue Navigator',
    ],
    sessions: [
      '08:30 AM - Doors Open & Badge Collection',
      '09:15 AM - Morning Networking Foyer Gathering',
    ],
    badgeColor: 'bg-purple-600 text-white',
  },
  {
    id: 'speakers-district',
    name: 'Speakers District',
    tagline: 'Central Grand Stage & Keynote Epicenter',
    codename: 'ZONE 02 • MAIN AUDITORIUM',
    icon: Mic2,
    x: 52,
    y: 28,
    venueDetail: 'Central Auditorium Hall with 4K LED Backdrop & Surround Acoustics',
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
      '10:00 AM - Opening Keynote: State of Cloud in 2027',
      '11:15 AM - Architecting Resilient Serverless Workflows',
      '02:00 PM - GenAI on AWS Bedrock: From Concept to Prod',
      '03:45 PM - Career Panel: Breaking into Cloud Engineering',
    ],
    badgeColor: 'bg-amber-500 text-purple-950',
  },
  {
    id: 'compute-cafe',
    name: 'Compute Café',
    tagline: 'Gourmet Catering & Networking Refuel Lounge',
    codename: 'ZONE 03 • REFUEL WING',
    icon: Coffee,
    x: 21,
    y: 40,
    venueDetail: 'Dedicated Dining Hall Wing, Dakkhan Banquet Hall',
    timing: '08:30 AM – 05:00 PM (All-Day)',
    capacity: 'Continuous Catering Wing',
    description: 'A lavish culinary wing designed to fuel high-velocity thinking. Every registered builder enjoys a full hot South Indian breakfast, an elaborate multi-course buffet lunch, and afternoon high-tea with artisanal coffee included with their pass.',
    perks: [
      'Full Multi-Course Buffet Lunch Included',
      'Fresh Artisanal Filter Coffee & High-Tea Snacks',
      'High-Top Networking Cocktail Tables',
      'Continuous Hydration Stations',
    ],
    sessions: [
      '08:30 AM - Morning South Indian Breakfast & Coffee',
      '01:00 PM - Grand Multi-Course Networking Lunch',
      '04:30 PM - High-Tea, Cookies & Farewell Chit-Chat',
    ],
    badgeColor: 'bg-rose-500 text-white',
  },
  {
    id: 'arcade-alley',
    name: 'Arcade Alley',
    tagline: 'DIY Tech Carnival & Partner Experience Labs',
    codename: 'ZONE 04 • INNOVATION EXPO',
    icon: Gamepad2,
    x: 71,
    y: 36,
    venueDetail: 'East Wing Promenade & Stalls Terrace',
    timing: '11:00 AM – 04:30 PM (Interactive)',
    capacity: 'Interactive Walk-Through Gallery',
    description: 'A bustling interactive district filled with low-cost DIY cardboard tech installations, cloud trivia buzzers, student demo pods, and sponsor tech booths. Test your skills in the Service Circuit Jammer and collect badges!',
    perks: [
      'Hands-On Service Circuit Jammer Simulator',
      'AWS Swag Vault & Mystery Box Giveaways',
      'Resume Review & Mock Tech Interviews',
      'Student Cloud Project Exhibition Pods',
    ],
    sessions: [
      '11:30 AM - Circuit Jammer Serverless Speed Challenge',
      '02:30 PM - Cloud Trivia Showdown & Goodie Drops',
      '03:30 PM - Lightning Demos by Student Builders',
    ],
    badgeColor: 'bg-indigo-600 text-white',
  },
];

export const CloudCityMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(districts[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleSelectDistrict = (district: DistrictData) => {
    playSound('click');
    setSelectedDistrict(district);
    setIsDrawerOpen(true);
  };

  return (
    <section 
      id="city-interactive-map"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8F5FF] via-[#EFE6FD] to-[#F5EFFE] overflow-hidden border-b-2 border-purple-900/10"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-purple-300/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-indigo-300/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-purple-900 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Compass className="w-4 h-4 text-purple-700" />
              <span>ISOMETRIC DISTRICT EXPLORER</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#260B49] tracking-tight leading-tight mb-4">
              Explore the Districts of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-900">
                Cloud City
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-sm sm:text-base text-purple-950/75 max-w-2xl mx-auto font-medium">
              Click on any hotspot pin across the pastel cityscape to inspect district facilities, schedule details, and exclusive attendee perks.
            </p>
          </ScrollReveal>
        </div>

        {/* Quick District Selector Pills (Mobile & Tablet Friendly) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          {districts.map((district) => {
            const isSelected = selectedDistrict.id === district.id;
            const Icon = district.icon;
            return (
              <button
                key={district.id}
                onClick={() => handleSelectDistrict(district)}
                className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-900 text-amber-300 shadow-md shadow-purple-950/20 scale-105 border-2 border-purple-700'
                    : 'bg-white/80 hover:bg-white text-purple-900 border border-purple-200/80 shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-purple-600'}`} />
                <span>{district.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Map & Sliding Drawer Canvas Container */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-purple-300/80 shadow-[0_20px_50px_rgba(76,29,149,0.15)] bg-[#E9DEFA] min-h-[580px] lg:h-[720px] flex flex-col lg:flex-row">
          
          {/* 3. Smooth Left-Side Info Drawer / Card */}
          <div className="relative z-30 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[420px] p-4 sm:p-6 flex flex-col pointer-events-auto">
            <AnimatePresence mode="wait">
              {isDrawerOpen && selectedDistrict && (
                <motion.div
                  key={selectedDistrict.id}
                  initial={{ opacity: 0, x: -40, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border-2 border-purple-200 shadow-[0_12px_40px_rgba(76,29,149,0.18)] flex-1 flex flex-col justify-between overflow-y-auto max-h-[85vh] lg:max-h-full"
                >
                  <div>
                    {/* Drawer Header */}
                    <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-purple-100">
                      <div>
                        <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                          {selectedDistrict.codename}
                        </span>
                        <h3 className="text-2xl font-black text-[#260B49] mt-2">
                          {selectedDistrict.name}
                        </h3>
                        <p className="text-xs text-purple-700 font-semibold mt-0.5">
                          {selectedDistrict.tagline}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center shadow-sm">
                          <selectedDistrict.icon className="w-5 h-5" />
                        </div>
                        <button
                          onClick={() => setIsDrawerOpen(false)}
                          className="p-1 rounded-xl text-purple-500 hover:text-purple-900 hover:bg-purple-100 cursor-pointer lg:hidden"
                          aria-label="Close drawer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Venue & Timing Metadata */}
                    <div className="space-y-2 mb-4 text-xs font-mono">
                      <div className="flex items-start gap-2 text-purple-900 bg-purple-50/80 p-2.5 rounded-xl border border-purple-100">
                        <MapPin className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <span>{selectedDistrict.venueDetail}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-1.5 text-purple-800 bg-purple-50/80 p-2 rounded-xl border border-purple-100">
                          <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                          <span className="truncate">{selectedDistrict.timing}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-purple-800 bg-purple-50/80 p-2 rounded-xl border border-purple-100">
                          <Users className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                          <span className="truncate">{selectedDistrict.capacity}</span>
                        </div>
                      </div>
                    </div>

                    {/* District Narrative Description */}
                    <p className="text-xs sm:text-sm text-purple-950/80 leading-relaxed font-normal mb-5">
                      {selectedDistrict.description}
                    </p>

                    {/* Attendee Perks */}
                    <div className="mb-5">
                      <h4 className="text-xs font-mono font-black text-purple-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Gift className="w-3.5 h-3.5 text-amber-500" />
                        District Perks & Highlights
                      </h4>
                      <ul className="space-y-1.5">
                        {selectedDistrict.perks.map((perk, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-purple-900/90 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Sessions */}
                    <div>
                      <h4 className="text-xs font-mono font-black text-purple-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        Key Activities
                      </h4>
                      <div className="space-y-1.5">
                        {selectedDistrict.sessions.map((sess, i) => (
                          <div key={i} className="text-[11px] font-mono text-purple-900 bg-purple-100/50 p-2 rounded-lg border border-purple-200/60">
                            {sess}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Drawer Footer CTA */}
                  <div className="pt-5 mt-4 border-t border-purple-100 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-purple-600 font-bold">
                      AWS SCD 2027 Pune
                    </span>
                    <a
                      href="#ticket-dispenser"
                      onClick={() => playSound('click')}
                      className="px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-800 text-amber-300 font-black text-xs flex items-center gap-1.5 shadow-md shadow-purple-950/20 transition-transform hover:scale-105"
                    >
                      <span>Join District</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Illustrated Isometric Map Canvas (Matching User's Uploaded Map!) */}
          <div className="relative flex-1 w-full h-[450px] lg:h-full overflow-hidden select-none">
            
            {/* The Pastel Isometric City Background Image */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: `url('/posters/city-map-districts.jpg')`,
              }}
            />

            {/* Soft Ambient Pastel Purple Tint & Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/20 via-transparent to-purple-900/10 pointer-events-none" />
            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(76,29,149,0.2)] pointer-events-none" />

            {/* Overlay Clickable Hotspot Pins across the 4 Districts */}
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
                  {/* Subtle Pulsing Beacon Ring */}
                  <div className="absolute -inset-3 rounded-full bg-purple-400/40 animate-ping pointer-events-none opacity-60" />

                  {/* Clickable Pin Button */}
                  <motion.button
                    onClick={() => handleSelectDistrict(district)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'bg-purple-950 text-amber-300 border-2 border-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.7)] scale-110 z-30'
                        : 'bg-white/90 hover:bg-white text-purple-950 border-2 border-purple-400 shadow-[0_4px_16px_rgba(76,29,149,0.25)] hover:border-purple-600'
                    }`}
                  >
                    {/* Pin Icon with Glow */}
                    <div className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-amber-400 text-purple-950 font-black' : 'bg-purple-100 text-purple-800'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <span className="text-xs sm:text-sm font-black tracking-tight whitespace-nowrap">
                      {district.name}
                    </span>

                    {/* Active Indicator Beacon */}
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
                    )}
                  </motion.button>
                </div>
              );
            })}

            {/* Instruction Badge at bottom right of the map */}
            <div className="absolute bottom-4 right-4 z-20 pointer-events-none hidden sm:block">
              <div className="px-3.5 py-1.5 rounded-xl bg-purple-950/80 backdrop-blur-md border border-purple-400/30 text-purple-200 text-xs font-mono flex items-center gap-2 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Click any pin to inspect district</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

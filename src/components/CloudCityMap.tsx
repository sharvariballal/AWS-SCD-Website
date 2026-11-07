import React, { useState } from 'react';
import { 
  Sparkles, 
  Mic2, 
  Coffee, 
  Gamepad2, 
  Trees, 
  DoorOpen, 
  Layers, 
  Info,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface DistrictZone {
  id: string;
  name: string;
  codename: string;
  gridArea: string;
  icon: React.FC<{ className?: string }>;
  accentColor: string;
  borderColor: string;
  tagColor: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  capacity: string;
}

const cityDistricts: DistrictZone[] = [
  {
    id: 'welcome-gate',
    name: 'The Welcome Gate',
    codename: 'ZONE 01 • CENTRAL ATRIUM',
    gridArea: 'welcome',
    icon: DoorOpen,
    accentColor: 'bg-amber-100/90 text-amber-950',
    borderColor: 'border-amber-500',
    tagColor: 'bg-amber-400 text-slate-950',
    shortDesc: 'Main entry archway, student PRN verification, and badge distribution.',
    fullDesc: 'The primary ingress portal for Cloud City inside Dakkhan Banquet Hall. Attendees scan their KonfHub QR ticket, present college PRN / ID, receive their custom event lanyard badge, and get oriented with the volunteer builder team.',
    highlights: ['QR Pass Scan & PRN Verification', 'Official Cloud City Badge Collection', 'Information & Volunteer Helpdesk'],
    capacity: 'Rapid Throughput Ingress',
  },
  {
    id: 'speakers-district',
    name: "Speaker's District",
    codename: 'ZONE 02 • MAIN STAGE',
    gridArea: 'stage',
    icon: Mic2,
    accentColor: 'bg-purple-100/90 text-purple-950',
    borderColor: 'border-purple-500',
    tagColor: 'bg-purple-400 text-slate-950',
    shortDesc: 'Central auditorium stage for keynotes, tech panels, and sequential deep dives.',
    fullDesc: 'The intellectual epicenter of Cloud City. Equipped with a high-definition LED backdrop and surround sound, this single grand stage hosts all keynote addresses, architecture panels, and live coding demos sequentially with no clashing schedules.',
    highlights: ['AWS Community Heroes & Architect Keynotes', 'Interactive Live Coding & Stage Demos', 'Career Panels & Q&A Open Mic'],
    capacity: '1,000+ Seated Capacity',
  },
  {
    id: 'compute-cafe',
    name: 'Compute Café',
    codename: 'ZONE 03 • REFUEL LOUNGE',
    gridArea: 'cafe',
    icon: Coffee,
    accentColor: 'bg-rose-100/90 text-rose-950',
    borderColor: 'border-rose-500',
    tagColor: 'bg-rose-400 text-slate-950',
    shortDesc: 'Spacious dining hall for hot breakfast, lavish buffet lunch, and evening tea.',
    fullDesc: 'Dedicated dining wing within the hall designed to keep builder minds energized. Features hot South Indian morning breakfast, a lavish multi-course afternoon buffet lunch, and evening high tea with snacks included with every pass.',
    highlights: ['All-Day Catering Included in Every Pass', 'Hot Buffet Lunch & Evening High-Tea', 'Standing Networking Cocktail Tables'],
    capacity: 'Continuous Buffet Service',
  },
  {
    id: 'coffee-kiosk',
    name: 'Coffee Kiosk',
    codename: 'ZONE 04 • CAFFEINE NODE',
    gridArea: 'coffee',
    icon: Sparkles,
    accentColor: 'bg-amber-100/90 text-amber-950',
    borderColor: 'border-amber-500',
    tagColor: 'bg-amber-400 text-slate-950',
    shortDesc: 'Specialty coffee & tea brewing bar powered by community partners.',
    fullDesc: 'A dedicated artisanal espresso and filter coffee counter positioned right next to the networking corridor. Builders can grab freshly brewed hot beverages throughout the event between keynote intervals.',
    highlights: ['Artisan Filter Coffee & Fresh Espresso', 'Quick Refreshment Grab & Go', 'Community Partner Meetup Spot'],
    capacity: 'Zero-Latency Fuel Bar',
  },
  {
    id: 'arcade-alley',
    name: 'Arcade Alley',
    codename: 'ZONE 05 • DIY TECH CARNIVAL',
    gridArea: 'arcade',
    icon: Gamepad2,
    accentColor: 'bg-cyan-100/90 text-cyan-950',
    borderColor: 'border-cyan-500',
    tagColor: 'bg-cyan-400 text-slate-950',
    shortDesc: 'Interactive DIY carnival games, architecture challenges, and tech stalls.',
    fullDesc: 'A vibrant district crafted with low-cost DIY materials, cardboard tech installations, and hands-on gaming stalls. Test your cloud knowledge with trivia buzzers, solve rapid serverless puzzles, and win community goodies.',
    highlights: ['DIY Cardboard Carnival & Cloud Trivia', 'Interactive Architecture Challenge Stalls', 'Student Project Display Pods'],
    capacity: 'Interactive Walk-Through',
  },
  {
    id: 'community-park',
    name: 'Community Park',
    codename: 'ZONE 06 • GREEN COMMONS',
    gridArea: 'park',
    icon: Trees,
    accentColor: 'bg-emerald-100/90 text-emerald-950',
    borderColor: 'border-emerald-500',
    tagColor: 'bg-emerald-400 text-slate-950',
    shortDesc: 'Relaxed green lawn space for peer networking, 1-on-1s, and mentor chats.',
    fullDesc: 'A quiet, low-decibel green zone inside the banquet hall furnished with comfortable beanbags and grass-carpeted seating. Ideal for meeting attendees from other colleges, reviewing resumes, or discussing startup ideas.',
    highlights: ['1-on-1 Mentorship & Resume Reviews', 'Chill Out Lounge with Beanbags', 'Cross-College Networking Circle'],
    capacity: 'Open Casual Seating',
  },
];

export const CloudCityMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('speakers-district');

  const activeZone = cityDistricts.find((d) => d.id === selectedDistrict) || cityDistricts[1];
  const ActiveIcon = activeZone.icon;

  const handleSelectDistrict = (id: string) => {
    playSound('click');
    setSelectedDistrict(id);
  };

  return (
    <section id="cloud-city-map" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-slate-900 bg-amber-400 text-slate-950 text-xs font-mono font-black uppercase mb-3 shadow-[2px_2px_0px_#0F172A]">
              <Layers className="w-3.5 h-3.5" />
              <span>Architectural Floorplan</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Cloud City District Map
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl font-medium">
              Dakkhan Banquet Hall is partitioned into 6 distinct urban tech districts. Tap any district on the floorplan to explore what is included.
            </p>
          </div>

          <div className="p-3 rounded-2xl border-2 border-slate-900 bg-slate-50 shadow-[3px_3px_0px_#0F172A] self-start md:self-auto flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>UNIFIED SINGLE-HALL VENUE • NO CLASHING TRACKS</span>
          </div>
        </div>

        {/* Floorplan Map Container: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stylized Architectural Floorplan Map Illustration (7 cols) */}
          <div className="lg:col-span-7">
            <div className="neo-card p-4 sm:p-6 bg-slate-900 border-3 border-slate-950 shadow-[6px_6px_0px_#0F172A] relative overflow-hidden">
              
              {/* Map Blueprint Controls & Title */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-amber-400">DAKKHAN HALL METROPOLIS BLUEPRINT</span>
                </div>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                  TOP-DOWN ARCHITECTURAL VIEW
                </span>
              </div>

              {/* The Actual Visual Map Floorplan Grid */}
              <div className="relative bg-slate-950 rounded-2xl p-3 sm:p-5 border-2 border-slate-800 shadow-inner">
                {/* Subtle blueprint grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none rounded-2xl" />

                {/* Spatial Floorplan Layout */}
                <div className="relative z-10 space-y-3.5">
                  
                  {/* TOP ROW: SPEAKER'S DISTRICT (Full Width North Stage) */}
                  <div
                    onClick={() => handleSelectDistrict('speakers-district')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                      selectedDistrict === 'speakers-district'
                        ? 'border-purple-400 bg-purple-950/70 shadow-[0_0_20px_rgba(168,85,247,0.35)] scale-[1.01]'
                        : 'border-slate-700 bg-slate-900/80 hover:border-purple-500/60 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-300 shrink-0">
                          <Mic2 className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-purple-400 tracking-wider uppercase">
                            ZONE 02 • NORTH WING
                          </span>
                          <h4 className="text-base font-black text-white">Speaker&apos;s District (Grand Keynote Stage)</h4>
                          <span className="text-xs text-slate-400 font-mono">Sequential Keynotes • Architect Panels • 1,000 Seats</span>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase shrink-0 hidden sm:inline-block ${
                        selectedDistrict === 'speakers-district' ? 'bg-purple-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {selectedDistrict === 'speakers-district' ? 'ACTIVE' : 'INSPECT'}
                      </span>
                    </div>

                    {/* Stage Visual Indicator */}
                    <div className="mt-3 pt-2.5 border-t border-purple-500/20 flex items-center justify-center gap-1.5 text-[10px] font-mono text-purple-300">
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                      <span>[ HIGH-DEF LED MAIN SCREEN &amp; AUDIO PODIUM ]</span>
                    </div>
                  </div>

                  {/* CENTRAL MAIN WALKWAY & MIDDLE CORRIDOR */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* LEFT MIDDLE: ARCADE ALLEY */}
                    <div
                      onClick={() => handleSelectDistrict('arcade-alley')}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${
                        selectedDistrict === 'arcade-alley'
                          ? 'border-cyan-400 bg-cyan-950/70 shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-[1.01]'
                          : 'border-slate-700 bg-slate-900/80 hover:border-cyan-500/60 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0">
                          <Gamepad2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                            ZONE 05 • WEST BAY
                          </span>
                          <h4 className="text-sm font-black text-white">Arcade Alley</h4>
                          <p className="text-xs text-slate-400 mt-0.5">DIY Carnival Stalls &amp; Architecture Challenge Pods</p>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT MIDDLE: COMPUTE CAFÉ & COFFEE KIOSK */}
                    <div className="space-y-2">
                      <div
                        onClick={() => handleSelectDistrict('compute-cafe')}
                        className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedDistrict === 'compute-cafe'
                            ? 'border-rose-400 bg-rose-950/70 shadow-[0_0_20px_rgba(244,63,94,0.35)] scale-[1.01]'
                            : 'border-slate-700 bg-slate-900/80 hover:border-rose-500/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Coffee className="w-4 h-4 text-rose-400 shrink-0" />
                          <div className="truncate">
                            <span className="text-[9px] font-mono text-rose-400 block">ZONE 03 • EAST WING</span>
                            <span className="text-xs font-bold text-white">Compute Café (Buffet Lunch)</span>
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={() => handleSelectDistrict('coffee-kiosk')}
                        className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedDistrict === 'coffee-kiosk'
                            ? 'border-amber-400 bg-amber-950/70 shadow-[0_0_20px_rgba(251,191,36,0.35)] scale-[1.01]'
                            : 'border-slate-700 bg-slate-900/80 hover:border-amber-500/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                          <div className="truncate">
                            <span className="text-[9px] font-mono text-amber-400 block">ZONE 04 • REFUEL NODE</span>
                            <span className="text-xs font-bold text-white">Coffee Kiosk (Espresso Bar)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* BOTTOM ROW: COMMUNITY PARK & WELCOME GATE */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                    
                    {/* SOUTH-WEST: COMMUNITY PARK */}
                    <div
                      onClick={() => handleSelectDistrict('community-park')}
                      className={`sm:col-span-6 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedDistrict === 'community-park'
                          ? 'border-emerald-400 bg-emerald-950/70 shadow-[0_0_20px_rgba(16,185,129,0.35)] scale-[1.01]'
                          : 'border-slate-700 bg-slate-900/80 hover:border-emerald-500/60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shrink-0">
                          <Trees className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                            ZONE 06 • SOUTH-WEST
                          </span>
                          <h4 className="text-sm font-black text-white">Community Park</h4>
                          <p className="text-xs text-slate-400 mt-0.5">Green Lawn Lounge &amp; Peer 1-on-1s</p>
                        </div>
                      </div>
                    </div>

                    {/* SOUTH ENTRY: THE WELCOME GATE */}
                    <div
                      onClick={() => handleSelectDistrict('welcome-gate')}
                      className={`sm:col-span-6 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedDistrict === 'welcome-gate'
                          ? 'border-amber-400 bg-amber-950/70 shadow-[0_0_20px_rgba(251,191,36,0.35)] scale-[1.01]'
                          : 'border-slate-700 bg-slate-900/80 hover:border-amber-500/60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shrink-0">
                          <DoorOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                            ZONE 01 • MAIN ENTRY
                          </span>
                          <h4 className="text-sm font-black text-white">The Welcome Gate</h4>
                          <p className="text-xs text-slate-400 mt-0.5">Check-in, PRN Scan &amp; Badge Pickup</p>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Bottom Map Footnote */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>📍 Dakkhan Banquet Hall Floorplan</span>
                  <span className="text-amber-400">Interactive Map Preview</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Detailed District Inspector Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="neo-card p-6 sm:p-7 bg-white border-3 border-slate-950 shadow-[6px_6px_0px_#0F172A]">
              
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-mono font-black px-2.5 py-1 rounded border border-slate-900 uppercase ${activeZone.tagColor}`}>
                  {activeZone.codename}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Full Access Included</span>
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center text-slate-950 shadow-[2px_2px_0px_#0F172A] shrink-0">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                    {activeZone.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-500 font-bold">
                    Capacity: {activeZone.capacity}
                  </span>
                </div>
              </div>

              {/* Full Description */}
              <p className="text-sm text-slate-700 leading-relaxed font-medium mb-6">
                {activeZone.fullDesc}
              </p>

              {/* District Highlights Breakdown */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  What is Located in this District
                </h4>
                {activeZone.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border-2 border-slate-900 flex items-center gap-2.5 text-xs font-bold text-slate-800"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Universal Pass Notice */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 flex items-center gap-2 text-xs font-mono font-bold text-amber-950">
                <Info className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Every pass tier grants unlimited free access to all 6 districts.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

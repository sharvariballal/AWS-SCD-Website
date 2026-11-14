import React from 'react';
import { 
  Navigation, 
  Bus, 
  Train, 
  Plane, 
  Wifi, 
  Building2, 
  Car, 
  ShieldCheck, 
  Clock, 
  Calendar
} from 'lucide-react';
import { playSound } from '../utils/audio';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const VenueBlueprint: React.FC = () => {
  const headerRef = useScrollReveal();
  const venueRef = useScrollReveal();

  const transitOptions = [
    { title: 'Swargate Bus Station', time: '~15-20 Mins', icon: Bus },
    { title: 'Pune Railway Station', time: '~30-40 Mins', icon: Train },
    { title: 'Pune Airport (PNQ)', time: '~45-55 Mins', icon: Plane },
  ];

  const specs = [
    { label: '1,000 Mbps High-Speed Wi-Fi', icon: Wifi },
    { label: '1,000+ Seated Main Hall', icon: Building2 },
    { label: 'Free 2 & 4-Wheeler Parking', icon: Car },
    { label: 'Secured Baggage Cloakroom', icon: ShieldCheck },
  ];

  return (
    <section id="venue-blueprint" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div ref={headerRef} className="sr-reveal text-center max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-cyan-400 mb-2 uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <span className="text-slate-500">//</span>
            <span>Summit Location &amp; Travel</span>
          </div>

          <h2 className="font-anton text-3xl sm:text-5xl text-white tracking-tight">
            VENUE &amp; <span className="text-cyan-400">ACCESSIBILITY</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Located on the southern bypass highway with rapid access across Pune transit corridors.
          </p>
        </div>

        {/* Unified Venue & Map Grid */}
        <div ref={venueRef} className="sr-reveal grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
          
          {/* Left Column: Venue Details (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#0D1B2A]/90 border border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.4)] backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 uppercase">
                OFFICIAL DESTINATION
              </span>
              <h3 className="font-anton text-2xl sm:text-3xl text-white mt-3">
                Dakkhan Banquet Hall
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                Ambegaon | Katraj Corridor, Pune, Maharashtra
              </p>

              {/* Date & Time Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono pt-4 mt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Sunday, 07 Feb 2027</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>08:30 AM – 06:00 PM</span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {specs.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="text-[11px] text-slate-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Directions Button */}
            <div className="pt-6 mt-6 border-t border-white/10">
              <a
                href="https://maps.google.com/?q=Dakkhan+Banquet+Hall+Katraj+Pune"
                target="_blank"
                rel="noreferrer"
                onClick={() => playSound('click')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.35)] cursor-pointer transition-transform hover:scale-[1.01]"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed (6 cols) */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.4)] bg-[#0D1B2A]/90 min-h-[340px]">
            <iframe
              title="Dakkhan Banquet Hall Location"
              src="https://maps.google.com/maps?q=Dakkhan+Banquet+Hall+Katraj+Ambegaon+Pune&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[0.2] contrast-[1.05]"
            />
          </div>

        </div>

        {/* Minimal Transit Benchmarks Row (Zero Clutter) */}
        <div className="p-4 rounded-2xl bg-[#0D1B2A]/60 border border-white/5 backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {transitOptions.map((opt, idx) => {
              const Icon = opt.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-semibold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {opt.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/30">
                    {opt.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

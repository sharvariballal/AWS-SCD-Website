import React from 'react';
import { 
  MapPin, 
  Navigation, 
  Bus, 
  Train, 
  Plane, 
  Wifi, 
  Zap, 
  Car, 
  ShieldCheck, 
  Clock, 
  Calendar 
} from 'lucide-react';
import { playSound } from '../utils/audio';

export const VenueBlueprint: React.FC = () => {
  const transitOptions = [
    {
      title: 'Swargate Bus Station',
      time: '~15-20 Mins',
      desc: 'Frequent direct PMPML buses to Katraj Depot or direct auto-rickshaws (₹80 - ₹120).',
      icon: Bus,
    },
    {
      title: 'Pune Railway Station',
      time: '~30-40 Mins',
      desc: 'Ola / Uber cab or direct PMPML Katraj buses via Satara Road / NH-4 bypass corridor.',
      icon: Train,
    },
    {
      title: 'Pune Airport (PNQ)',
      time: '~45-55 Mins',
      desc: 'Direct highway cab via Katraj-Dehu Road bypass directly to Dakkhan Banquet Hall.',
      icon: Plane,
    },
  ];

  const specs = [
    { label: '1,000 Mbps High-Speed Wi-Fi', icon: Wifi },
    { label: 'Power Sockets at Every Lab Desk', icon: Zap },
    { label: 'Free 2 & 4-Wheeler Parking', icon: Car },
    { label: 'Secured Baggage Cloakroom', icon: ShieldCheck },
  ];

  return (
    <section id="venue-blueprint" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7FF] via-[#F5EFFE] to-[#FAF7FF] border-b-2 border-purple-900/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-300 bg-purple-100 text-purple-900 text-xs font-mono font-black uppercase mb-3 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-purple-700" />
            <span>Summit Location &amp; Travel</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#260B49] tracking-tight">
            Venue &amp; Accessibility
          </h2>

          <p className="text-sm sm:text-base text-purple-950/75 mt-2 font-medium">
            Conveniently situated on the southern bypass highway with rapid access from all major Pune transit nodes.
          </p>
        </div>

        {/* 2-Column Venue Map & Travel Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Venue Details & Transit (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Venue Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-purple-200 shadow-[0_12px_35px_rgba(76,29,149,0.1)]">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 uppercase">
                    OFFICIAL DESTINATION
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#260B49] mt-2">
                    Dakkhan Banquet Hall
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-700 font-semibold">
                    Ambegoan | Katraj | Nahre Corridor, Pune
                  </p>
                </div>

                <a
                  href="https://maps.google.com/?q=Dakkhan+Banquet+Hall+Katraj+Pune"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playSound('click')}
                  className="px-4 py-2 rounded-xl bg-purple-950 hover:bg-purple-900 text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-950/20 cursor-pointer shrink-0 transition-transform hover:scale-105"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open Maps</span>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-4 border-t border-purple-100">
                <div className="flex items-center gap-2 text-purple-900 bg-purple-50 p-2.5 rounded-xl border border-purple-100">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>Sunday, 07 February 2027</span>
                </div>
                <div className="flex items-center gap-2 text-purple-900 bg-purple-50 p-2.5 rounded-xl border border-purple-100">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>08:30 AM – 06:00 PM IST</span>
                </div>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
                {specs.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 text-center flex flex-col items-center justify-center gap-1"
                    >
                      <Icon className="w-4 h-4 text-purple-700" />
                      <span className="text-[10px] font-bold text-purple-900 leading-tight">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Transit Options */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-black text-purple-900 uppercase tracking-widest">
                Transit &amp; Distance Benchmarks
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {transitOptions.map((opt, idx) => {
                  const Icon = opt.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border-2 border-purple-100 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-amber-600">
                            {opt.time}
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-purple-950 mb-1">{opt.title}</h5>
                        <p className="text-[11px] text-purple-800/70 leading-relaxed font-normal">
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Embed (5 cols) */}
          <div className="lg:col-span-5 h-full">
            <div className="relative rounded-3xl overflow-hidden border-2 border-purple-200 shadow-[0_12px_35px_rgba(76,29,149,0.12)] bg-white h-[420px] lg:h-[480px]">
              <iframe
                title="Dakkhan Banquet Hall Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.5772378906936!2d73.8447883!3d18.4574928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2953841a106f3%3A0xe54e3cbcc12e557!2sDakkhan%20Banquet%20Hall!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[0.2] contrast-[1.05]"
              />

              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="px-3 py-1.5 rounded-xl bg-purple-950/85 backdrop-blur-md text-amber-300 text-xs font-mono font-black border border-purple-400/30 shadow-md">
                  📍 Dakkhan Hall • Pune
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

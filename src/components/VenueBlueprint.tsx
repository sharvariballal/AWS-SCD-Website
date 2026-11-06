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
    <section id="venue-blueprint" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-slate-900 bg-amber-400 text-slate-950 text-xs font-mono font-black uppercase mb-3 shadow-[2px_2px_0px_#0F172A]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Summit Location &amp; Travel</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Venue &amp; Accessibility
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
            Join us in person on Sunday, 31st January 2027 in Southern Pune.
          </p>
        </div>

        {/* Venue Master Card */}
        <div className="neo-card p-6 sm:p-8 bg-slate-50 border-3 border-slate-950 shadow-[6px_6px_0px_#0F172A] mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded bg-amber-400 text-slate-950 uppercase border border-slate-900">
                OFFICIAL SUMMIT HALL
              </span>

              <h3 className="text-2xl sm:text-4xl font-black text-slate-950">
                Dakkhan Banquet Hall
              </h3>

              <p className="text-sm sm:text-base font-semibold text-slate-700 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Ambegoan | Katraj | Nahre, Pune, Maharashtra 411046</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono font-bold text-slate-700">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A]">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>Sunday, 31 January 2027</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A]">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>08:30 AM – 06:00 PM IST</span>
                </div>
              </div>

              {/* Hardware Specs Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {specs.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <div className="w-6 h-6 rounded-lg bg-amber-200 border border-slate-900 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-slate-900" />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3">
                <a
                  href="https://maps.google.com/?q=Dakkhan+Banquet+Hall+Katraj+Pune"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playSound('click')}
                  className="neo-btn bg-slate-950 text-white hover:bg-slate-800 px-6 py-3 rounded-2xl text-xs sm:text-sm font-black inline-flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_#FF9900]"
                >
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>Open Directions in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Schematic Graphic / Coordinates Box */}
            <div className="lg:col-span-5 h-72 rounded-2xl bg-slate-900 border-2 border-slate-900 p-6 flex flex-col justify-between text-white shadow-[4px_4px_0px_#0F172A] relative overflow-hidden">
              <div className="flex items-center justify-between font-mono text-xs text-amber-400 font-bold">
                <span>📍 PUNE METRO ZONE</span>
                <span className="text-emerald-400">● GATE ACCESS ACTIVE</span>
              </div>

              <div className="text-center my-auto">
                <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 border-2 border-white flex items-center justify-center mx-auto mb-2 shadow-[0_0_20px_rgba(255,153,0,0.4)]">
                  <MapPin className="w-8 h-8" />
                </div>
                <div className="text-xl font-black text-white">Dakkhan Banquet Hall</div>
                <div className="text-xs font-mono text-slate-300 mt-1">18.4485° N, 73.8588° E</div>
              </div>

              <div className="text-xs font-mono text-slate-400 text-center bg-slate-800/80 p-2 rounded-xl border border-slate-700">
                10 mins from PICT Pune campus • Next to NH-4 Highway
              </div>
            </div>

          </div>
        </div>

        {/* 3 Transit Guides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transitOptions.map((opt, idx) => {
            const Icon = opt.icon;
            return (
              <div key={idx} className="neo-card p-5 bg-white">
                <div className="w-10 h-10 rounded-xl bg-purple-100 border-2 border-slate-900 flex items-center justify-center text-purple-700 mb-3 shadow-[2px_2px_0px_#0F172A]">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-slate-950">{opt.title}</h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900">
                    {opt.time}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1">
                  {opt.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

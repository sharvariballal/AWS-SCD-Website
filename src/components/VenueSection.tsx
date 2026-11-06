import React from 'react';
import { 
  MapPin, 
  Navigation, 
  Calendar, 
  Clock, 
  Bus, 
  Train, 
  Plane, 
  Wifi, 
  Zap, 
  Shield, 
  Car 
} from 'lucide-react';

export const VenueSection: React.FC = () => {
  const transitOptions = [
    {
      title: 'From Swargate Bus Station',
      time: '~15-20 Mins',
      desc: 'Take direct PMPML bus to Katraj Depot or direct auto-rickshaw (approx. ₹80-₹120).',
      icon: Bus,
    },
    {
      title: 'From Pune Railway Station',
      time: '~30-40 Mins',
      desc: 'Ola / Uber cab or direct PMPML Katraj bus via Satara Road / NH-4 bypass.',
      icon: Train,
    },
    {
      title: 'From Pune Airport (PNQ)',
      time: '~45-55 Mins',
      desc: 'Direct cab via Katraj-Dehu Road bypass highway to Dakkhan Hall Ambegoan.',
      icon: Plane,
    },
  ];

  const venuePerks = [
    { title: '1 Gbps Dedicated Fiber Wi-Fi', icon: Wifi },
    { title: 'Power Strips at Every Lab Table', icon: Zap },
    { title: 'Free 2 & 4-Wheeler Campus Parking', icon: Car },
    { title: 'Secure Cloakroom for Travel Bags', icon: Shield },
  ];

  return (
    <section id="venue" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-700 text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5 text-violet-500" />
            <span>Summit Location &amp; Travel</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Venue &amp; Accessibility
          </h2>

          <p className="text-base text-slate-600">
            Conveniently situated in Southern Pune with seamless highway connectivity from Mumbai, Bangalore, and across Maharashtra.
          </p>
        </div>

        {/* Main Venue Card */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200/90 shadow-lg p-8 sm:p-10 relative overflow-hidden mb-12">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-violet-500 to-amber-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase mb-3">
                Official Summit Hall
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                Dakkhan Banquet Hall
              </h3>
              <p className="text-base font-semibold text-slate-700 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <span>Ambegoan | Katraj | Nahre, Pune, Maharashtra 411046</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm text-slate-600">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200/70">
                  <Calendar className="w-4 h-4 text-violet-500" />
                  <span className="font-semibold text-xs text-slate-800">Sunday, 31st January 2027</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200/70">
                  <Clock className="w-4 h-4 text-violet-500" />
                  <span className="font-semibold text-xs text-slate-800">08:30 AM – 06:00 PM IST</span>
                </div>
              </div>

              {/* Amenities Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-8">
                {venuePerks.map((perk, pIdx) => {
                  const IconC = perk.icon;
                  return (
                    <div key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <IconC className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{perk.title}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://maps.google.com/?q=Dakkhan+Banquet+Hall+Katraj+Pune"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-950 text-white hover:bg-slate-800 font-bold text-xs sm:text-sm transition-colors shadow-sm"
                >
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>Navigate in Google Maps</span>
                </a>
                <span className="text-xs text-slate-500 italic">
                  Near PICT Campus &amp; Katraj Snake Park
                </span>
              </div>
            </div>

            {/* Visual map preview card */}
            <div className="lg:col-span-5 h-72 rounded-2xl bg-gradient-to-tr from-[#0D1B2A] to-slate-800 p-6 flex flex-col justify-between border border-slate-700 relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF9900_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  📍 PUNE METRO ZONE • NH-4
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="relative z-10 my-auto text-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-2 border border-amber-400/40 shadow-[0_0_20px_rgba(255,153,0,0.35)]">
                  <MapPin className="w-7 h-7" />
                </div>
                <div className="text-white font-black text-lg">Dakkhan Banquet Hall</div>
                <div className="text-xs text-amber-300 font-mono mt-0.5">18.4485° N, 73.8588° E</div>
              </div>

              <div className="relative z-10 text-[11px] text-slate-300 text-center font-medium bg-slate-900/80 py-1.5 px-3 rounded-lg border border-slate-700">
                10 mins from PICT Pune campus
              </div>
            </div>

          </div>
        </div>

        {/* Transit Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transitOptions.map((opt, idx) => {
            const IconComp = opt.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-xs hover:border-amber-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center mb-3">
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-slate-900">{opt.title}</h4>
                  <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {opt.time}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
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

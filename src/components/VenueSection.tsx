import React from 'react';
import { MapPin, Navigation, Calendar, Clock, Sparkles } from 'lucide-react';

export const VenueSection: React.FC = () => {
  return (
    <section id="venue" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-700 text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5 text-violet-500" />
            <span>Summit Location</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Venue &amp; Accessibility
          </h2>

          <p className="text-base text-slate-600">
            Join us in person on 31st January 2027 in Pune, Maharashtra.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-50 border border-slate-200/90 shadow-md p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-violet-500 to-amber-500" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase mb-3">
                Official Summit Hall
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Dakkhan Banquet Hall
              </h3>
              <p className="text-base font-semibold text-slate-700 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <span>Ambegoan | Katraj | Nahre, Pune, Maharashtra</span>
              </p>

              <div className="space-y-3 mb-6 text-sm text-slate-600">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-violet-500" />
                  <span>Sunday, 31st January 2027</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-violet-500" />
                  <span>09:00 AM – 06:00 PM IST</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Air-Conditioned Hall &amp; Parking Available</span>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Dakkhan+Banquet+Hall+Katraj+Pune"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-950 text-white hover:bg-slate-800 font-bold text-sm transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            {/* Visual map preview card */}
            <div className="h-64 rounded-2xl bg-gradient-to-tr from-[#0D1B2A] to-slate-800 p-6 flex flex-col justify-between border border-slate-700 relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF9900_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  📍 PUNE METRO ZONE
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="relative z-10 my-auto text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-2 border border-amber-400/40 shadow-[0_0_15px_rgba(255,153,0,0.3)]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-white font-extrabold text-base">Dakkhan Banquet Hall</div>
                <div className="text-xs text-slate-300 mt-0.5">Ambegoan • Katraj • Nahre</div>
              </div>

              <div className="relative z-10 text-[11px] text-slate-400 text-center font-mono">
                Easy connectivity from Katraj Bus Depot &amp; NH-4 Highway
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

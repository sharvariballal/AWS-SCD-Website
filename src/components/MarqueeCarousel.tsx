import React from 'react';
import { Camera } from 'lucide-react';

interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  tag: string;
}

const eventPhotos: PhotoItem[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    caption: '1,000+ Students Packed Main Stage Keynote',
    tag: 'SCD 2026 AUDITORIUM',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    caption: 'Live Architecture Jamming & Team Builds',
    tag: 'HANDS-ON LABS',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    caption: 'AWS Solutions Architects Mentoring Students',
    tag: 'MENTORSHIP',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    caption: 'AWS Community Heroes Stage Session',
    tag: 'EXPERT TALKS',
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    caption: 'Hackathon Finalists Pitching on Stage',
    tag: 'COMPETITION',
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    caption: 'Live Serverless & Bedrock Demonstrations',
    tag: 'STAGE DEMOS',
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    caption: 'Swag Kit Distribution & Happy Attendees',
    tag: 'COMMUNITY SPIRIT',
  },
];

export const MarqueeCarousel: React.FC = () => {
  const duplicatedPhotos = [...eventPhotos, ...eventPhotos];

  return (
    <section className="py-16 bg-slate-100 border-b-2 border-slate-900 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        {/* Flashback Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-slate-900 bg-amber-400 text-slate-950 text-xs font-mono font-black uppercase tracking-wider mb-3 shadow-[2px_2px_0px_#0F172A]">
          <Camera className="w-3.5 h-3.5" />
          <span>Real Community Proof</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-2">
          Flashback: AWS Student Community Day 2026
        </h2>
        <p className="text-sm sm:text-base font-medium text-slate-600 max-w-2xl mx-auto">
          Here is the authentic energy, packed halls, hands-on building, and mentorship from our previous edition at PICT.
        </p>
      </div>

      {/* Infinite Rolling Track */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge blur gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-100 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-5 py-4">
          {duplicatedPhotos.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              className="w-72 sm:w-80 h-52 shrink-0 group rounded-2xl overflow-hidden border-2 border-slate-900 shadow-[4px_4px_0px_#0F172A] relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[6px_6px_0px_#0F172A] bg-white"
            >
              {/* Image */}
              <img
                src={photo.url}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Tag Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-900 shadow-sm">
                  {photo.tag}
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent flex items-end p-3.5">
                <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors drop-shadow-sm truncate">
                  {photo.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

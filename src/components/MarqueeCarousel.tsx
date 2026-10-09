import React from 'react';

interface PhotoItem {
  id: string;
  url: string;
  caption: string;
}

const eventPhotos: PhotoItem[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    caption: 'Community Networking & Keynote',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    caption: 'Collaborative Team Builds',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    caption: 'Hands-on AWS Workshop',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    caption: 'Main Stage Keynote',
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    caption: 'Builder Hackathon Teams',
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    caption: 'Interactive Stage Demos',
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    caption: 'Swag Distributions & Moments',
  },
];

export const MarqueeCarousel: React.FC = () => {
  // Duplicate array for seamless infinite rolling loop
  const duplicatedPhotos = [...eventPhotos, ...eventPhotos];

  return (
    <section className="py-16 bg-[#0D1B2A]/90 border-y border-slate-800 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        {/* Flashback Pill matching Image 4 */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
          <span>Flashback</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          Moments in the Cloud
        </h2>
        <p className="text-sm font-medium text-slate-400 max-w-xl mx-auto">
          Glimpse the energy, collaborative builds, and community spirit from our previous editions.
        </p>
      </div>

      {/* Infinite Rolling Track with PURE PHOTOS ONLY */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge blur gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#0D1B2A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#0D1B2A] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-5 py-4">
          {duplicatedPhotos.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              className="w-72 sm:w-80 h-52 shrink-0 group rounded-2xl overflow-hidden border border-slate-700/80 shadow-lg relative cursor-pointer transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:shadow-[0_0_25px_rgba(255,153,0,0.35)]"
            >
              {/* Pure High-Quality Image */}
              <img
                src={photo.url}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Sleek bottom gradient overlay with subtle clean caption */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-end p-3.5">
                <span className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition-colors drop-shadow-sm truncate">
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

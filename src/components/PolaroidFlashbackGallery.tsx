import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { playSound } from '../utils/audio';
import { useScrollReveal } from '../hooks/useScrollReveal';

export interface FlashbackPhoto {
  id: string;
  title: string;
  caption: string;
  tag: string;
  date: string;
  url: string;
  stat: string;
}

const flashbackPhotos: FlashbackPhoto[] = [
  {
    id: 'photo-1',
    title: '1,000+ Students Packed Main Stage',
    caption: 'Opening keynote kick-off with AWS community leaders and student builders across Maharashtra.',
    tag: 'KEYNOTE ARENA',
    date: '07 Feb 2026',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
    stat: '1,000+ Builders',
  },
  {
    id: 'photo-2',
    title: 'Live Architecture & Bedrock Sprint',
    caption: 'Students deployed real production generative AI pipelines on AWS in under 90 minutes.',
    tag: 'HANDS-ON WORKSHOPS',
    date: '07 Feb 2026',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1400&q=80',
    stat: '100% Hands-on',
  },
  {
    id: 'photo-3',
    title: 'AWS Solutions Architects Mentorship',
    caption: '1-on-1 architecture reviews and career guidance from principal engineers and community heroes.',
    tag: 'MENTORSHIP',
    date: '07 Feb 2026',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80',
    stat: '20+ Mentors',
  },
  {
    id: 'photo-4',
    title: 'Swag Kits & Community Celebrations',
    caption: 'Official heavyweight event tees, stickers, breakfast, and buffet lunch for all attendees.',
    tag: 'BUILDER SWAG',
    date: '07 Feb 2026',
    url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=80',
    stat: '100% Meals & Kits',
  },
];

export const PolaroidFlashbackGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const headerRef = useScrollReveal();
  const galleryRef = useScrollReveal();

  const handleNextPhoto = () => {
    playSound('click');
    setCurrentIndex((prev) => (prev + 1) % flashbackPhotos.length);
  };

  const handlePrevPhoto = () => {
    playSound('click');
    setCurrentIndex((prev) => (prev - 1 + flashbackPhotos.length) % flashbackPhotos.length);
  };

  const activePhoto = flashbackPhotos[currentIndex];

  return (
    <section id="community-memories" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b border-white/5">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div ref={headerRef} className="sr-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 mb-2 uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              <span className="text-slate-500">//</span>
              <span>SCD Archive</span>
            </div>
            <h2 className="font-anton text-3xl sm:text-5xl text-white tracking-tight">
              COMMUNITY SCALE &amp; <span className="text-cyan-400">MEMORIES</span>
            </h2>
          </div>

          <div className="text-xs font-mono text-slate-400">
            {currentIndex + 1} of {flashbackPhotos.length}
          </div>
        </div>

        {/* Clean Modern Cinematic Photo Card */}
        <div ref={galleryRef} className="sr-reveal relative rounded-3xl overflow-hidden bg-[#0D1B2A]/90 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">

          {/* Main Visual */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-black">
            <AnimatePresence mode="wait">
              <motion.img
                key={activePhoto.id}
                src={activePhoto.url}
                alt={activePhoto.title}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-transparent to-black/30 pointer-events-none" />

            {/* Top Stat Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 rounded-full bg-[#070415]/80 backdrop-blur-md border border-cyan-400/30 text-cyan-400 font-mono text-xs font-bold shadow-lg">
                {activePhoto.stat}
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="max-w-xl">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1 block">
                  {activePhoto.tag}
                </span>
                <h3 className="font-anton text-xl sm:text-3xl text-white tracking-tight leading-tight">
                  {activePhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-1 sm:line-clamp-none" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {activePhoto.caption}
                </p>
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  aria-label="Previous photo"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNextPhoto}
                  aria-label="Next photo"
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.4)] active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

          {/* Dot Indicators */}
          <div className="p-3 bg-[#070415]/80 border-t border-white/5 flex items-center justify-center gap-2">
            {flashbackPhotos.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  playSound('click');
                  setCurrentIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${currentIndex === i ? 'w-6 bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

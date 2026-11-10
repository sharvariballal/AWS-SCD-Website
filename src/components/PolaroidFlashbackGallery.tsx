import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronRight, ChevronLeft, Battery } from 'lucide-react';
import { playSound } from '../utils/audio';

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
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    stat: '1,000+ Attendees',
  },
  {
    id: 'photo-2',
    title: 'Live Architecture & Bedrock Sprint',
    caption: 'Students deployed real production generative AI pipelines on AWS in under 90 minutes.',
    tag: 'HANDS-ON WORKSHOPS',
    date: '07 Feb 2026',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    stat: '100% Hands-on',
  },
  {
    id: 'photo-3',
    title: 'AWS Solutions Architects Mentorship',
    caption: '1-on-1 architecture reviews and career guidance from principal engineers and heroes.',
    tag: 'MENTORSHIP',
    date: '07 Feb 2026',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    stat: '20+ Mentors',
  },
  {
    id: 'photo-4',
    title: 'Swag Kits & Community Celebrations',
    caption: 'Official heavyweight event tees, stickers, breakfast, and buffet lunch for all attendees.',
    tag: 'BUILDER SWAG',
    date: '07 Feb 2026',
    url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    stat: '100% Meals & Kits',
  },
];

export const PolaroidFlashbackGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScreenFlashing, setIsScreenFlashing] = useState(false);

  const handleNextPhoto = () => {
    playSound('click');
    setIsScreenFlashing(true);
    setTimeout(() => setIsScreenFlashing(false), 140);
    setCurrentIndex((prev) => (prev + 1) % flashbackPhotos.length);
  };

  const handlePrevPhoto = () => {
    playSound('click');
    setIsScreenFlashing(true);
    setTimeout(() => setIsScreenFlashing(false), 140);
    setCurrentIndex((prev) => (prev - 1 + flashbackPhotos.length) % flashbackPhotos.length);
  };

  const activePhoto = flashbackPhotos[currentIndex];

  return (
    <section id="flashback-gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b-2 border-purple-900/10">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-300 bg-purple-100 text-purple-900 text-xs font-mono font-black uppercase mb-2">
              <Camera className="w-3.5 h-3.5 text-purple-700" />
              <span>SCD 2026 Archive • Digital Camera Review</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#260B49] tracking-tight">
              Community Scale &amp; Memories
            </h2>
          </div>

          <div className="text-xs font-mono font-bold text-purple-900 px-3.5 py-1.5 rounded-xl bg-purple-100 border border-purple-200">
            Playback Mode • Photo {currentIndex + 1} of {flashbackPhotos.length}
          </div>
        </div>

        {/* Realistic Digital Camera Chassis Body */}
        <div className="p-4 sm:p-7 rounded-3xl bg-[#16062A] border-3 border-purple-900/80 shadow-[0_25px_60px_rgba(76,29,149,0.22)] text-white">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Camera LCD Viewfinder Screen (9 cols) */}
            <div className="lg:col-span-9 relative rounded-2xl overflow-hidden bg-black border-2 border-neutral-800 shadow-inner">
              
              {/* LCD Top Status Bar HUD */}
              <div className="absolute top-0 left-0 right-0 z-20 px-4 py-2.5 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between text-[11px] font-mono text-purple-200 pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-amber-300">PLAYBACK</span>
                  <span className="text-neutral-400">|</span>
                  <span>RAW+JPEG</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-purple-300">ISO 400 • F/2.8</span>
                  <div className="flex items-center gap-1 font-bold text-emerald-400">
                    <Battery className="w-3.5 h-3.5" />
                    <span>94%</span>
                  </div>
                </div>
              </div>

              {/* LCD Display Photo */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden flex items-center justify-center bg-neutral-950">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePhoto.id}
                    src={activePhoto.url}
                    alt={activePhoto.title}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Shutter Screen Flash */}
                <AnimatePresence>
                  {isScreenFlashing && (
                    <motion.div
                      initial={{ opacity: 0.9 }}
                      animate={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.14 }}
                      className="absolute inset-0 bg-white pointer-events-none z-30"
                    />
                  )}
                </AnimatePresence>

                {/* Bottom LCD Photo Caption HUD */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-purple-950/80 border border-purple-400/40 inline-block mb-1">
                        {activePhoto.tag}
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                        {activePhoto.title}
                      </h4>
                      <p className="text-xs text-purple-200/90 leading-snug mt-0.5 line-clamp-1 sm:line-clamp-none">
                        {activePhoto.caption}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-black text-emerald-400 bg-neutral-900/90 px-2.5 py-1 rounded-md border border-neutral-700 block">
                        {activePhoto.stat}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Digital Camera Hardware Control Pad (3 cols) */}
            <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-4">
              
              {/* Camera Model Badge */}
              <div className="text-center pb-2 border-b border-purple-800/60">
                <span className="text-[10px] font-mono font-black text-amber-300 tracking-widest uppercase">
                  PICT DIGITAL REVIEW
                </span>
                <div className="text-xs text-purple-300 font-mono">
                  SCD MEMORY REEL
                </div>
              </div>

              {/* The Physical Hardware Navigation Controls */}
              <div className="flex flex-col items-center justify-center space-y-3 py-2">
                
                {/* Hardware Navigation Row */}
                <div className="grid grid-cols-2 gap-2.5 w-full">
                  <button
                    type="button"
                    onClick={handlePrevPhoto}
                    className="py-3 px-4 rounded-2xl bg-purple-950 hover:bg-purple-900 active:scale-95 border border-purple-500/40 text-purple-200 text-xs sm:text-sm font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-md"
                    title="Previous photo"
                  >
                    <ChevronLeft className="w-4 h-4 text-amber-300" />
                    <span>PREV</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    className="py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-purple-950 text-xs sm:text-sm font-mono font-black flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-md border border-amber-300"
                    title="Next photo"
                  >
                    <span>NEXT</span>
                    <ChevronRight className="w-4 h-4 text-purple-950" />
                  </button>
                </div>

              </div>

              {/* Filmstrip Frame Counter */}
              <div className="pt-2 border-t border-purple-800/60 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  {flashbackPhotos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        playSound('click');
                        setCurrentIndex(i);
                      }}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        currentIndex === i ? 'w-6 bg-amber-400' : 'w-2 bg-purple-700 hover:bg-purple-500'
                      }`}
                      title={`Go to photo ${i + 1}`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-purple-400 uppercase">
                  Click Next to View Archive
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

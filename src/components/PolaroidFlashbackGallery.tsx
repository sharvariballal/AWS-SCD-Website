import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Camera, Sparkles, ChevronRight, ChevronLeft, RefreshCw } from 'lucide-react';
import { playSound } from '../utils/audio';
import { ScrollReveal } from './ScrollReveal';

export interface FlashbackPhoto {
  id: string;
  title: string;
  caption: string;
  tag: string;
  date: string;
  url: string;
  color: string;
}

const flashbackPhotos: FlashbackPhoto[] = [
  {
    id: 'photo-1',
    title: 'Auditorium Keynote',
    caption: '1,000+ Students Packed Main Stage Opening',
    tag: 'SCD AUDITORIUM',
    date: '07 Feb 2026',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
    color: 'from-purple-500/20 to-indigo-500/20',
  },
  {
    id: 'photo-2',
    title: 'Hands-on Labs',
    caption: 'Live Serverless & Cloud Architecture Sprint',
    tag: 'HANDS-ON LABS',
    date: '07 Feb 2026',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80',
    color: 'from-amber-500/20 to-purple-500/20',
  },
  {
    id: 'photo-3',
    title: 'Industry Mentorship',
    caption: 'AWS Solutions Architects Reviewing Student Projects',
    tag: 'MENTORSHIP',
    date: '07 Feb 2026',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
    color: 'from-indigo-500/20 to-cyan-500/20',
  },
  {
    id: 'photo-4',
    title: 'Community Heroes Panel',
    caption: 'Breaking Into Cloud Engineering & AWS Certifications',
    tag: 'EXPERT TALKS',
    date: '07 Feb 2026',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
    color: 'from-purple-500/20 to-rose-500/20',
  },
  {
    id: 'photo-5',
    title: 'Project Pitching',
    caption: 'Student Builders Demonstrating Production Workflows',
    tag: 'HACKATHON',
    date: '07 Feb 2026',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    color: 'from-cyan-500/20 to-purple-500/20',
  },
  {
    id: 'photo-6',
    title: 'Swag & Celebrations',
    caption: 'Goodies, Cloud City Lanyards, & Happy Faces',
    tag: 'COMMUNITY SPIRIT',
    date: '07 Feb 2026',
    url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80',
    color: 'from-amber-500/20 to-indigo-500/20',
  },
];

export const PolaroidFlashbackGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [ejectionKey, setEjectionKey] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 260,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 260,
    damping: 24,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const triggerSnap = (newIndex: number) => {
    playSound('click');
    setIsFlashing(true);
    setCurrentIndex(newIndex);
    setEjectionKey((prev) => prev + 1);

    setTimeout(() => {
      setIsFlashing(false);
    }, 200);
  };

  const handleNext = () => {
    const next = (currentIndex + 1) % flashbackPhotos.length;
    triggerSnap(next);
  };

  const handlePrev = () => {
    const prev = (currentIndex - 1 + flashbackPhotos.length) % flashbackPhotos.length;
    triggerSnap(prev);
  };

  const currentPhoto = flashbackPhotos[currentIndex];

  return (
    <section 
      id="flashback-gallery"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F5EFFE] via-[#EFE6FD] to-[#F8F5FF] overflow-hidden border-b-2 border-purple-900/10"
    >
      {/* 2. Camera Flash Overlay Keyframe Effect (0.2s duration) */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Background Soft Blobs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-purple-300/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-300/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-purple-900 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Camera className="w-4 h-4 text-purple-700" />
              <span>TACTILE PHOTO DECK</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#260B49] tracking-tight leading-tight mb-4">
              Flashback:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-900">
                AWS Student Community Day
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-sm sm:text-base text-purple-950/75 max-w-2xl mx-auto font-medium">
              Snap the shutter on our vintage Cloud City Polaroid to eject genuine moments, keynote stages, and builder memories from PICT.
            </p>
          </ScrollReveal>
        </div>

        {/* Main Interactive Stage: Camera on Left, Ejected Polaroid Deck on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* 1. Interactive Camera Trigger (Left Side, 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Vintage Polaroid Camera Vector Container */}
            <motion.div
              whileHover={{ rotate: 3, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative w-72 sm:w-80 p-6 rounded-[36px] bg-gradient-to-b from-[#E9DCFC] via-[#DDD0F8] to-[#C9B6EE] border-4 border-[#2D1152] shadow-[0_20px_45px_rgba(45,17,82,0.25)] select-none cursor-pointer"
            >
              {/* Camera Top Bar / Viewfinder / Flash Unit */}
              <div className="flex items-center justify-between mb-5 px-2">
                
                {/* Viewfinder Glass */}
                <div className="w-12 h-9 rounded-xl bg-purple-950 border-2 border-[#2D1152] p-1 flex items-center justify-center shadow-inner">
                  <div className="w-8 h-5 rounded-lg bg-indigo-900 border border-purple-400/40" />
                </div>

                {/* Flash Unit Lens */}
                <div className="relative w-16 h-10 rounded-2xl bg-gradient-to-br from-amber-100 via-white to-amber-200 border-2 border-[#2D1152] shadow-inner flex items-center justify-center overflow-hidden">
                  <div className="w-10 h-6 rounded-lg bg-amber-200/50 border border-amber-300/60 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  </div>
                </div>

                {/* Shutter Button with Pulse Ring */}
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-purple-500/40 animate-ping" />
                  <button
                    onClick={() => handleNext()}
                    title="Click to Snap Flashback"
                    className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 border-2 border-[#2D1152] shadow-[0_4px_10px_rgba(245,158,11,0.5)] flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-400 border border-amber-600/30" />
                  </button>
                </div>
              </div>

              {/* Decorative Lilac Stripes across Camera Face */}
              <div className="flex h-3 w-full rounded-full overflow-hidden mb-6 border border-[#2D1152]/30 shadow-sm">
                <div className="flex-1 bg-purple-400" />
                <div className="flex-1 bg-indigo-400" />
                <div className="flex-1 bg-pink-400" />
                <div className="flex-1 bg-amber-400" />
              </div>

              {/* Central Camera Lens Vector */}
              <div className="relative w-40 h-40 mx-auto rounded-full bg-gradient-to-tr from-[#250C47] to-[#431B78] border-4 border-[#2D1152] shadow-[inset_0_4px_15px_rgba(0,0,0,0.6),0_8px_20px_rgba(76,29,149,0.3)] flex items-center justify-center">
                {/* Outer Glass Ring */}
                <div className="w-32 h-32 rounded-full border-2 border-purple-400/40 bg-purple-950/60 flex items-center justify-center">
                  {/* Aperture Iris */}
                  <div className="w-24 h-24 rounded-full border-4 border-amber-400/60 bg-gradient-to-tr from-purple-950 to-indigo-950 flex items-center justify-center shadow-inner">
                    {/* Glass Reflection Accent */}
                    <div className="w-14 h-14 rounded-full bg-radial from-purple-300/40 to-transparent flex items-center justify-center">
                      <Camera className="w-7 h-7 text-amber-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Camera Model Label */}
              <div className="text-center mt-5 mb-4">
                <span className="font-mono text-xs font-black text-purple-950 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-200/80 border border-purple-400/50">
                  PICT CLOUD-MATIC 2027
                </span>
              </div>

              {/* Photo Ejection Slot at the Bottom */}
              <div className="relative w-52 mx-auto h-3.5 rounded-full bg-[#1A0730] border-2 border-[#2D1152] shadow-inner overflow-hidden">
                <div className="w-full h-1 bg-purple-400/30" />
              </div>
            </motion.div>

            {/* Shutter Callout Label Button below camera */}
            <div className="mt-5 text-center">
              <button
                onClick={() => handleNext()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-purple-900 hover:bg-purple-800 text-amber-300 font-mono text-xs sm:text-sm font-black border-2 border-purple-950 shadow-md shadow-purple-950/20 cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                <span>Click to Snap Flashback 📸</span>
              </button>
              <div className="text-[11px] font-mono text-purple-700 mt-1 font-semibold">
                Photo {currentIndex + 1} of {flashbackPhotos.length}
              </div>
            </div>

          </div>

          {/* 2 & 3. Polaroid Ejection & 3D Tilt Deck (Right Side, 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start">
            
            {/* 3D Tilt Interaction Workspace */}
            <div 
              style={{ perspective: 1000 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-md sm:max-w-lg cursor-grab active:cursor-grabbing py-4"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={ejectionKey}
                  ref={cardRef}
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  /* Framer Motion spring physics for realistic paper ejection */
                  initial={{ y: -80, scale: 0.85, opacity: 0.3, rotateZ: -6 }}
                  animate={{ y: 0, scale: 1, opacity: 1, rotateZ: 1.5 }}
                  exit={{ y: 60, scale: 0.9, opacity: 0, rotateZ: 8 }}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 18,
                  }}
                  className="relative bg-white rounded-3xl p-4 sm:p-5 pb-8 sm:pb-9 border-2 border-purple-200/90 shadow-[0_20px_50px_rgba(76,29,149,0.22)] select-none transition-shadow hover:shadow-[0_28px_65px_rgba(76,29,149,0.3)]"
                >
                  {/* Glossy Photo Frame Border */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-purple-950 border border-slate-200 shadow-inner">
                    {/* The Moment Photo */}
                    <img
                      src={currentPhoto.url}
                      alt={currentPhoto.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />

                    {/* Gloss Light Reflection Across Surface */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

                    {/* Tag Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-lg bg-purple-950/85 backdrop-blur-md text-amber-300 border border-purple-400/40 shadow-sm">
                        {currentPhoto.tag}
                      </span>
                    </div>

                    {/* Date Watermark */}
                    <div className="absolute bottom-3 right-3 z-10">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
                        {currentPhoto.date}
                      </span>
                    </div>
                  </div>

                  {/* Classic Polaroid Bottom Caption Area */}
                  <div className="pt-5 px-2 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-[#260B49] tracking-tight">
                        {currentPhoto.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-purple-900/80 font-medium mt-1">
                        {currentPhoto.caption}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-[10px] font-mono text-purple-600 block">AUTHENTIC PROOF</span>
                      <span className="text-xs font-mono font-black text-purple-950">PICT PUNE</span>
                    </div>
                  </div>

                  {/* Tactile Holographic Stamp in bottom corner */}
                  <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-gradient-to-tr from-amber-300 via-pink-400 to-indigo-400 opacity-60" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 3. Photo Gallery Deck Mechanics & Thumbnail Selector */}
            <div className="w-full max-w-md sm:max-w-lg mt-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-900">
                <span>SELECT SNAPSHOT TO EJECT</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 rounded-lg bg-white hover:bg-purple-100 text-purple-900 border border-purple-200 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-1.5 rounded-lg bg-white hover:bg-purple-100 text-purple-900 border border-purple-200 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-6 gap-2">
                {flashbackPhotos.map((photo, index) => {
                  const isSelected = currentIndex === index;
                  return (
                    <button
                      key={photo.id}
                      onClick={() => triggerSnap(index)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-purple-800 scale-105 shadow-md shadow-purple-900/20 ring-2 ring-purple-400/50'
                          : 'border-purple-200 opacity-70 hover:opacity-100 hover:border-purple-400'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-purple-900/20" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick Eject Next Button */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-2xl bg-white hover:bg-purple-50 text-purple-900 font-mono text-xs font-black border border-purple-300 flex items-center gap-2 shadow-sm cursor-pointer transition-all hover:scale-105"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-purple-600" />
                  <span>Next Snapshot</span>
                </button>

                <a
                  href="#ticket-dispenser"
                  onClick={() => playSound('click')}
                  className="text-xs font-mono font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 transition-colors"
                >
                  <span>Experience SCD 2027 In Person</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

interface CityMascotGuideProps {
  zone?: 'hero' | 'map' | 'tickets' | 'floating';
  customMessage?: string;
}

export const CityMascotGuide: React.FC<CityMascotGuideProps> = ({
  zone = 'floating',
  customMessage,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const defaultMessages: Record<string, { title: string; hint: string }> = {
    hero: {
      title: 'Hi Builder! I’m Your City Guide',
      hint: 'Welcome to Cloud City! Check out the 4 districts or secure an Early Bird pass before Phase 2.',
    },
    map: {
      title: 'Metropolis Navigator',
      hint: 'Inspect the 4 major city districts below—from the Keynote Amphitheater to the Arcade Alley gaming zone.',
    },
    tickets: {
      title: 'Pass Dispensary Tip',
      hint: 'Early Bird (₹299) is currently live. Every pass grants identical 100% access to all keynotes, labs, meals, and swag.',
    },
    floating: {
      title: 'Cloud City Guide',
      hint: 'Welcome to Cloud City Pune! Need help navigating the districts or passes?',
    },
  };

  const activeMessage = customMessage || defaultMessages[zone]?.hint;
  const activeTitle = defaultMessages[zone]?.title;

  if (isDismissed) {
    return (
      <button
        onClick={() => setIsDismissed(false)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-black text-amber-300 border-2 border-purple-500 shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 text-xs font-mono font-bold cursor-pointer"
        title="Summon City Mascot Guide"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
        <span className="font-bold">Ask Guide</span>
      </button>
    );
  }

  return (
    <div className="relative inline-block my-2">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative flex items-center gap-4 p-4 pr-5 rounded-3xl bg-white border-2 border-purple-900 shadow-[0_16px_35px_rgba(76,29,149,0.18)] max-w-lg"
        >
          {/* Evident Peeking Mascot Character Figure (Breaks out of frame!) */}
          <motion.div
            animate={{
              y: isHovered ? [-2, -8, -2] : [0, -4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: isHovered ? 1.2 : 2.5,
              ease: 'easeInOut',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-16 h-16 sm:w-18 sm:h-18 -ml-2 -mt-6 shrink-0 cursor-pointer"
            title="Cloud City Mascot Guide"
          >
            {/* Mascot Character Avatar Shell */}
            <div className="w-full h-full rounded-2xl bg-black border-2 border-amber-400 p-1 flex items-center justify-center shadow-lg overflow-hidden relative">
              <img
                src="/brand/mascot.png"
                alt="Cloud City Mascot"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              {/* Fallback Expressive Vector Mascot: Cloud Builder Bot */}
              <div className="w-full h-full flex flex-col items-center justify-center text-amber-300">
                <svg
                  className="w-10 h-10"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Glowing Cloud Head */}
                  <path
                    d="M24 22H10C6.68629 22 4 19.3137 4 16C4 12.9 6.34 10.36 9.38 10.04C10.15 6.6 13.18 4 16.8 4C21.05 4 24.57 7.23 24.96 11.41C27.84 11.89 30 14.39 30 17.4C30 20.49 27.49 22 24 22Z"
                    fill="#7C3AED"
                    stroke="#FBBF24"
                    strokeWidth="1.8"
                  />
                  {/* High-Tech Goggles */}
                  <circle cx="12" cy="14" r="2.5" fill="#FBBF24" />
                  <circle cx="20" cy="14" r="2.5" fill="#FBBF24" />
                  <circle cx="12.8" cy="13.2" r="0.8" fill="#000000" />
                  <circle cx="20.8" cy="13.2" r="0.8" fill="#000000" />
                  {/* Smile */}
                  <path d="M14 18C15 19 17 19 18 18" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Antenna */}
                  <line x1="16.8" y1="4" x2="16.8" y2="1" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="16.8" cy="1" r="1.5" fill="#38BDF8" />
                </svg>
              </div>
            </div>

            {/* Online Status Beacon */}
            <span className="absolute -bottom-1 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white shadow-sm" />
          </motion.div>

          {/* Dialogue Balloon Body */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-200 text-[10px] font-mono font-black uppercase tracking-wider">
                {activeTitle}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-purple-950 leading-relaxed font-semibold">
              "{activeMessage}"
            </p>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-xl text-purple-400 hover:text-purple-950 hover:bg-purple-100 transition-colors shrink-0 self-start mt-0.5 cursor-pointer"
            title="Dismiss Guide"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

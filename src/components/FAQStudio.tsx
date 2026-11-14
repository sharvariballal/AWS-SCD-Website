import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { playSound } from '../utils/audio';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface FAQEntry {
  q: string;
  a: string;
  tag: string;
}

const faqs: FAQEntry[] = [
  {
    q: 'Who can attend AWS Student Community Day 2027?',
    a: 'Cloud City is open to all students, developers, and cloud enthusiasts! Whether you are a first-year student, final-year graduate, self-taught builder, or hackathon enthusiast from PICT or any college across India, you are warmly welcomed.',
    tag: 'ELIGIBILITY',
  },
  {
    q: 'Do I need prior AWS or cloud computing experience?',
    a: 'Not at all! Our agenda is specifically architected for student builders. We feature foundational workshops, live step-by-step code walkthroughs, and mentor-assisted sessions so you can deploy your first cloud architecture on the spot.',
    tag: 'PREREQUISITES',
  },
  {
    q: 'What hardware should I bring on summit day?',
    a: 'Bring your laptop, charger, and valid college ID or PRN proof. High-speed 1,000 Mbps Wi-Fi, power connectivity, and sandbox AWS credits are provided.',
    tag: 'LOGISTICS',
  },
  {
    q: 'Are food, refreshments, and lunch included in the pass?',
    a: 'Yes, 100%! Every ticket tier includes welcome morning breakfast with South Indian delicacies, hot filter coffee breaks, and a lavish multi-course buffet lunch at Dakkhan Banquet Hall.',
    tag: 'HOSPITALITY',
  },
  {
    q: 'How does the Live Hackathon & Challenge Arena work?',
    a: 'The Live Hackathon takes place in the afternoon inside Arcade Alley. You can compete in teams of 2–4 builders to solve realistic cloud crisis and optimization challenges. Top teams win trophies, bounties, and cloud credits.',
    tag: 'HACKATHON',
  },
  {
    q: 'When and how will certificates and swag be delivered?',
    a: 'Physical swag kits (heavyweight cotton tee, holographic sticker pack, smart badge) are handed to you in person at the morning check-in counter. Verifiable digital credentials are sent via AWS SBG PICT directly to your registered email.',
    tag: 'CREDENTIALS',
  },
];

export const FAQStudio: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);
  const headerRef = useScrollReveal();
  const faqsRef = useScrollReveal();

  const toggle = (idx: number) => {
    playSound('click');
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="faq-studio" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b border-white/5">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div ref={headerRef} className="sr-reveal text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-cyan-400 mb-2 uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <span className="text-slate-500">//</span>
            <span>Got Questions?</span>
          </div>

          <h2 className="font-anton text-3xl sm:text-5xl text-white tracking-tight">
            FREQUENTLY ASKED <span className="text-cyan-400">QUESTIONS</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Key details regarding passes, venue logistics, hackathons, and student admissions.
          </p>
        </div>

        {/* Clean Centered Accordion Stack (Spacious & Modern) */}
        <div ref={faqsRef} className="sr-reveal space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-[#0D1B2A]/80 overflow-hidden shadow-sm transition-all hover:border-cyan-400/30 backdrop-blur-md"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 uppercase inline-block mb-1.5">
                      {faq.tag}
                    </span>
                    <h3 className="font-anton text-base sm:text-lg text-white leading-snug">
                      {faq.q}
                    </h3>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-1 transition-all duration-200 ${
                      isOpen 
                        ? 'rotate-180 bg-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.5)]' 
                        : 'bg-white/5 text-slate-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div 
                    className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal border-t border-white/10 bg-white/5" 
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

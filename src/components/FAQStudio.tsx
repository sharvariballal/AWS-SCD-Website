import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { playSound } from '../utils/audio';

interface FAQEntry {
  q: string;
  a: string;
  tag: string;
}

const faqs: FAQEntry[] = [
  {
    q: 'Who can attend AWS Student Community Day 2027?',
    a: 'Cloud City is open to all students, developers, and cloud enthusiasts! Whether you are a first-year engineering student, final-year graduate, self-taught builder, or hackathon enthusiast from PICT or any college across Pune and India, you are warmly welcomed.',
    tag: 'ELIGIBILITY',
  },
  {
    q: 'Do I need prior AWS or cloud computing experience?',
    a: 'Not at all! Our agenda is specifically architected for student builders. We feature foundational workshops, live step-by-step code walkthroughs, and mentor-assisted sessions so you can deploy your first serverless microservice or AI agent on the spot.',
    tag: 'PREREQUISITES',
  },
  {
    q: 'What hardware should I bring on summit day?',
    a: 'Bring your laptop, charger, and valid college ID / PRN proof. We provide 1,000 Mbps high-speed Wi-Fi, power connectivity, and sandbox AWS credits.',
    tag: 'LOGISTICS',
  },
  {
    q: 'Are food, refreshments, and lunch included in the pass?',
    a: 'Yes, 100%! Every ticket tier includes welcome breakfast with South Indian delicacies, hot filter coffee and Masala Chai breaks, and a lavish full buffet lunch at Dakkhan Banquet Hall.',
    tag: 'CATERING',
  },
  {
    q: 'How does the Live Hackathon & Challenge Arena work?',
    a: 'The Live Hackathon takes place in the afternoon inside the Arcade Alley & Hackathon zone within the main hall. You can compete in teams of 2-4 builders to solve realistic cloud crisis and optimization challenges. Top teams take home certificates, bounties, trophies, and AWS cloud credits.',
    tag: 'HACKATHON',
  },
  {
    q: 'When and how will certificates and swag be delivered?',
    a: 'Physical swag kits (heavyweight cotton tee, holographic sticker pack, smart badge) are handed to you in person at the morning check-in counter. Verifiable digital credentials with unique verification IDs are issued via AWS SBG PICT directly to your registered email.',
    tag: 'CREDENTIALS',
  },
];

export const FAQStudio: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 3]);

  const toggle = (idx: number) => {
    playSound('click');
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const col1 = faqs.slice(0, 3);
  const col2 = faqs.slice(3, 6);

  const renderFAQCard = (faq: FAQEntry, idx: number) => {
    const isOpen = openIndices.includes(idx);
    return (
      <div
        key={idx}
        className="rounded-2xl border-2 border-purple-200 bg-white/95 overflow-hidden shadow-sm transition-all"
      >
        <button
          type="button"
          onClick={() => toggle(idx)}
          className="w-full p-5 text-left flex items-start justify-between gap-3 cursor-pointer hover:bg-purple-50/50 transition-colors"
        >
          <div>
            <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200 uppercase inline-block mb-1.5">
              {faq.tag}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#260B49] leading-snug">
              {faq.q}
            </h3>
          </div>

          <div
            className={`w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-200 ${
              isOpen ? 'rotate-180 bg-purple-900 text-amber-300' : ''
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </button>

        {isOpen && (
          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-purple-950/80 leading-relaxed font-normal border-t border-purple-100 bg-purple-50/30">
            {faq.a}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="faq-studio" className="py-20 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b-2 border-purple-900/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - Solid Non-Gradient Typography */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-300 bg-purple-100 text-purple-900 text-xs font-mono font-black uppercase mb-3 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-purple-700" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#260B49] tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-purple-950/75 mt-2 font-medium">
            Everything you need to know about passes, venue logistics, hackathon tracks, and student eligibility.
          </p>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="space-y-4">
            {col1.map((faq, i) => renderFAQCard(faq, i))}
          </div>
          <div className="space-y-4">
            {col2.map((faq, i) => renderFAQCard(faq, i + 3))}
          </div>
        </div>

      </div>
    </section>
  );
};

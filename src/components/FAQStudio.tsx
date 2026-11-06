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
    a: 'Not at all! Our agenda is specifically architected for student builders. We feature foundational workshops, live step-by-step code walkthroughs, and mentor-assisted labs so you can deploy your first serverless microservice or AI agent on the spot.',
    tag: 'PREREQUISITES',
  },
  {
    q: 'What hardware should I bring on summit day?',
    a: 'Bring your laptop, charger, and valid college ID / PRN proof. We provide 1,000 Mbps high-speed Wi-Fi, individual power socket strips at every lab workstation, and sandbox AWS credits.',
    tag: 'LOGISTICS',
  },
  {
    q: 'Are food, refreshments, and lunch included in the pass?',
    a: 'Yes, 100%! Every ticket tier includes welcome breakfast with South Indian delicacies, hot filter coffee and Masala Chai breaks, and a lavish full buffet lunch at Dakkhan Banquet Hall.',
    tag: 'CATERING',
  },
  {
    q: 'How does the Live Hackathon & GameDay work?',
    a: 'The 2-hour Live Hackathon takes place in the afternoon across Lab Alpha & Beta. You can compete in teams of 2-4 builders to solve realistic cloud crisis and optimization challenges. Top teams take home ₹50,000+ in bounties, trophies, and AWS cloud credits.',
    tag: 'HACKATHON',
  },
  {
    q: 'When and how will certificates and swag be delivered?',
    a: 'Physical swag kits (oversized cotton tee, holographic sticker pack, smart NFC badge) are handed to you in person at the morning check-in counter. Verifiable digital credentials with unique verification IDs are issued via AWS SBG PICT directly to your registered email.',
    tag: 'CREDENTIALS',
  },
];

export const FAQStudio: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    playSound('click');
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq-studio" className="py-20 px-4 sm:px-6 lg:px-8 bg-blueprint-grid border-b-2 border-slate-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-slate-900 bg-amber-400 text-slate-950 text-xs font-mono font-black uppercase mb-3 shadow-[2px_2px_0px_#0F172A]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
            Everything you need to know about passes, venue guidelines, and hands-on lab participation.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`neo-card transition-all overflow-hidden ${
                  isOpen ? 'bg-amber-50 border-3 border-slate-950 shadow-[4px_4px_0px_#0F172A]' : 'bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-slate-900 text-amber-400">
                      {faq.tag}
                    </span>
                    <span className="text-base sm:text-lg font-black text-slate-950">
                      {faq.q}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-xl border-2 border-slate-900 bg-white flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-amber-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-slate-950" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed border-t border-slate-200">
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

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
    a: 'Physical swag kits (oversized cotton tee, holographic sticker pack, smart badge) are handed to you in person at the morning check-in counter. Verifiable digital credentials with unique verification IDs are issued via AWS SBG PICT directly to your registered email.',
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
    <section id="faq-studio" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F5EFFE] via-[#EFE6FD] to-[#F8F5FF] border-b-2 border-purple-900/10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
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

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border-2 border-purple-200 bg-white/90 backdrop-blur-sm overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-purple-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200 shrink-0">
                      {faq.tag}
                    </span>
                    <span className="text-sm sm:text-base font-black text-[#260B49]">
                      {faq.q}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-purple-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-purple-950/80 leading-relaxed font-normal border-t border-purple-100">
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

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Workshops' | 'Sponsors & Careers';
}

const faqs: FAQItem[] = [
  {
    category: 'General',
    question: 'Who can attend AWS Cloud City 2027?',
    answer:
      'Cloud City is open to everyone! Engineering and college students, developers, cloud enthusiasts, and tech professionals from PICT and across Pune and India are warmly welcomed.',
  },
  {
    category: 'General',
    question: 'Do I need to be an AWS SBG member to buy tickets?',
    answer:
      'No! Tickets are open to all attendees regardless of whether you are an SBG member. Passes range from Super Early Bird, Early Bird, General, to Group Discounts for teams of 3+.',
  },
  {
    category: 'General',
    question: 'Where and when is the event taking place?',
    answer:
      'The summit takes place on Sunday, 31st January 2027 at Dakkhan Banquet Hall, Ambegoan | Katraj | Nahre, Pune, Maharashtra.',
  },
  {
    category: 'Workshops',
    question: 'What do I need to bring for the hands-on workshops?',
    answer:
      'Bring your laptop and charger. We will have fast Wi-Fi and interactive lab environments ready for you.',
  },
  {
    category: 'Workshops',
    question: 'Will certificates and swag be provided?',
    answer:
      'Yes, all verified attendees receive official event certificates of participation and summit swag kits.',
  },
  {
    category: 'Sponsors & Careers',
    question: 'How can companies sponsor or collaborate?',
    answer:
      'Sponsors and tech partners can download our prospectus or contact our team directly at team@awssbgpict.org for booth expo and partner opportunities.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-700 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-violet-500" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-base text-slate-600">
            Everything you need to know about tickets, venue, schedule, and participation.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-50/90 border-amber-400/80 shadow-md'
                    : 'bg-white border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-bold text-base sm:text-lg text-slate-900">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-amber-500 text-slate-950 rotate-180 shadow-[0_0_10px_rgba(255,153,0,0.5)]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-200/50 animate-in fade-in">
                    <p>{faq.answer}</p>
                    <div className="mt-3 inline-block text-[11px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      Tag: {faq.category}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Have a specific question?</div>
              <div className="text-xs text-slate-500">
                Join our Discord community or reach out to the PICT organizing team.
              </div>
            </div>
          </div>

          <a
            href="https://discord.gg/awscloudclub"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white transition-colors"
          >
            Ask on Discord
          </a>
        </div>
      </div>
    </section>
  );
};

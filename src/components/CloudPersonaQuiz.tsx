import React, { useState } from 'react';
import { 
  Sparkles, 
  Share2, 
  RotateCcw 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    personaKey: 'serverless' | 'ai' | 'devops' | 'freetier';
    badge: string;
  }[];
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'Your Lambda function throws a 500 error at 2:00 AM. What is your instant reflex?',
    options: [
      {
        text: 'Trace CloudWatch logs & X-Ray spans like a cyber detective',
        personaKey: 'devops',
        badge: 'Observability Hawk',
      },
      {
        text: 'Ask Amazon Bedrock AI agent to rewrite the failing handler',
        personaKey: 'ai',
        badge: 'Prompt Sorcery',
      },
      {
        text: 'Bump the memory from 128MB to 1024MB and redeploy in 3 seconds',
        personaKey: 'serverless',
        badge: 'Serverless Reflex',
      },
      {
        text: 'Check if my AWS Free Tier quota expired or if bill increased by ₹1',
        personaKey: 'freetier',
        badge: 'Budget Guardian',
      },
    ],
  },
  {
    id: 2,
    question: 'What is your primary mission at AWS Student Community Day 2027?',
    options: [
      {
        text: 'Dominate the hands-on hackathon and take home the trophy',
        personaKey: 'serverless',
        badge: 'Hackathon Champion',
      },
      {
        text: 'Learn how to deploy multi-modal LLM agents with Bedrock',
        personaKey: 'ai',
        badge: 'GenAI Pioneer',
      },
      {
        text: 'Network with AWS Community Heroes, Architects & recruiters',
        personaKey: 'devops',
        badge: 'Community Connector',
      },
      {
        text: 'Grab the exclusive backpack, stickers & $100 Skill Builder credits',
        personaKey: 'freetier',
        badge: 'Swag Connoisseur',
      },
    ],
  },
  {
    id: 3,
    question: 'Pick your ultimate AWS Cloud superpower:',
    options: [
      {
        text: 'Zero servers managed: Pure event-driven serverless architecture',
        personaKey: 'serverless',
        badge: '100% Serverless',
      },
      {
        text: 'Generative AI autonomy: Intelligent self-healing microservices',
        personaKey: 'ai',
        badge: 'Autonomous AI',
      },
      {
        text: '99.999% High Availability: Multi-region active-active resilience',
        personaKey: 'devops',
        badge: 'Five Nines',
      },
      {
        text: 'The Free Tier Alchemist: Hosting production apps for ₹0.00/month',
        personaKey: 'freetier',
        badge: 'Zero-Cost Wizard',
      },
    ],
  },
];

interface PersonaDetails {
  title: string;
  tagline: string;
  emoji: string;
  skills: string[];
  motto: string;
  color: string;
}

const personas: Record<string, PersonaDetails> = {
  serverless: {
    title: 'The Serverless Sorcerer',
    tagline: 'Events trigger your genius. Servers are a relic of the past.',
    emoji: '⚡',
    skills: ['AWS Lambda', 'DynamoDB', 'EventBridge', 'API Gateway'],
    motto: 'Why manage a server when code can execute in the ether?',
    color: 'from-amber-500 to-yellow-500',
  },
  ai: {
    title: 'The Bedrock AI Whisperer',
    tagline: 'Orchestrating autonomous foundation models while others write boilerplate.',
    emoji: '🧠',
    skills: ['Amazon Bedrock', 'SageMaker', 'LangGraph', 'Claude 3.7'],
    motto: 'Prompting the future of intelligent cloud agents.',
    color: 'from-purple-500 to-violet-600',
  },
  devops: {
    title: 'The High-Availability Overlord',
    tagline: 'Chaos monkey strikes, but your multi-region architecture never blinks.',
    emoji: '🛡️',
    skills: ['Route 53', 'CloudFront', 'Terraform', 'CloudWatch'],
    motto: 'Sleep soundly at night knowing the 99.999% SLA is guarded.',
    color: 'from-blue-600 to-indigo-700',
  },
  freetier: {
    title: 'The Free-Tier Alchemist',
    tagline: 'Scaling full-stack web applications on zero-dollar budgets like a legend.',
    emoji: '💎',
    skills: ['AWS Free Tier', 'S3 Static Hosting', 'Lambda Always-Free', 'Cognito'],
    motto: 'Why spend thousands when clever architecture costs ₹0?',
    color: 'from-emerald-500 to-teal-600',
  },
};

export const CloudPersonaQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultPersona, setResultPersona] = useState<PersonaDetails | null>(null);

  const handleSelectOption = (key: string) => {
    playSound('coin');
    const newAnswers = [...answers, key];
    setAnswers(newAnswers);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate persona winner
      const counts: Record<string, number> = { serverless: 0, ai: 0, devops: 0, freetier: 0 };
      newAnswers.forEach((k) => {
        counts[k] = (counts[k] || 0) + 1;
      });

      let bestKey = 'serverless';
      let maxCount = -1;
      Object.entries(counts).forEach(([k, c]) => {
        if (c > maxCount) {
          maxCount = c;
          bestKey = k;
        }
      });

      setResultPersona(personas[bestKey]);
      playSound('success');
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF9900', '#FFC72C', '#6C5CE7', '#10B981'],
        });
      } catch {
        // ignore
      }
    }
  };

  const handleReset = () => {
    playSound('beep');
    setCurrentStep(0);
    setAnswers([]);
    setResultPersona(null);
  };

  const handleShare = () => {
    playSound('click');
    if (!resultPersona) return;
    const text = `I just unlocked my official AWS Builder Persona: "${resultPersona.title} ${resultPersona.emoji}" for AWS Student Community Day 2027 at PICT Pune! Find your cloud tribe here:`;
    if (navigator.share) {
      navigator.share({
        title: 'AWS SCD 2027 Cloud Persona',
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      alert('Copied your persona share link to clipboard! Post it on LinkedIn or X.');
    }
  };

  return (
    <section id="persona-quiz" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Pill */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            <span>Interactive Fun Zone</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Which AWS Cloud Persona Are You?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Take this rapid 30-second builder quiz to find your cloud persona and generate your official Cloud City virtual badge!
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-violet-500 to-amber-500" />

          {!resultPersona ? (
            <div>
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                <span>Question {currentStep + 1} of {quizQuestions.length}</span>
                <span>{Math.round(((currentStep + 1) / quizQuestions.length) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-8">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-violet-500 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6 flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 text-sm font-black">
                  Q{currentStep + 1}
                </span>
                <span>{quizQuestions[currentStep].question}</span>
              </h3>

              {/* Options */}
              <div className="space-y-3.5">
                {quizQuestions[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.personaKey)}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-amber-400 bg-slate-50/50 hover:bg-amber-50/40 transition-all duration-200 group flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-slate-700 group-hover:text-slate-950">
                      {opt.text}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-500 group-hover:border-amber-300 group-hover:text-amber-700 font-mono shrink-0 ml-3">
                      {opt.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Badge View */
            <div className="text-center py-4 animate-in fade-in">
              <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-amber-400 via-violet-500 to-amber-500 mb-6 shadow-2xl">
                <div className="bg-[#0D1B2A] text-white rounded-[22px] p-6 sm:p-8 max-w-md w-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl font-black select-none">
                    AWS
                  </div>

                  <div className="text-5xl mb-3">{resultPersona.emoji}</div>
                  <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-bold block mb-1">
                    AWS STUDENT BUILDER GROUP PICT
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    {resultPersona.title}
                  </h4>
                  <p className="text-xs text-slate-300 mb-6 italic">
                    &ldquo;{resultPersona.tagline}&rdquo;
                  </p>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5 justify-center mb-6">
                    {resultPersona.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-amber-300 border border-slate-700 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Summit ID: SCD27-PICT</span>
                    <span className="text-emerald-400 font-bold">● Certified Pass Ready</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleShare}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-sm shadow-md hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share My Persona</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

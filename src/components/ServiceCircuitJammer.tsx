import React, { useState } from 'react';
import { 
  Zap, 
  BrainCircuit, 
  Database, 
  Server, 
  Globe, 
  Activity, 
  Play, 
  RotateCcw, 
  Trophy,
  CheckCircle2
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface PadService {
  id: string;
  name: string;
  category: string;
  desc: string;
  soundType: 'click' | 'beep' | 'powerup' | 'deploy' | 'coin';
  color: string;
  tag: string;
  icon: React.FC<{ className?: string }>;
}

const servicePads: PadService[] = [
  {
    id: 'lambda',
    name: 'AWS Lambda',
    category: 'Serverless Compute',
    desc: 'Event-driven execution with sub-15ms cold start optimization.',
    soundType: 'powerup',
    color: 'bg-amber-400 text-slate-950',
    tag: '⚡ 0s IDLE COST',
    icon: Zap,
  },
  {
    id: 'bedrock',
    name: 'Amazon Bedrock',
    category: 'Autonomous GenAI',
    desc: 'Orchestrating Claude 3.7 & multi-agent generative workflows.',
    soundType: 'deploy',
    color: 'bg-indigo-400 text-white',
    tag: '🧠 MULTI-AGENT',
    icon: BrainCircuit,
  },
  {
    id: 'dynamodb',
    name: 'Amazon DynamoDB',
    category: 'NoSQL Database',
    desc: 'Single-digit millisecond reads & writes at infinite scale.',
    soundType: 'coin',
    color: 'bg-blue-400 text-slate-950',
    tag: '🗄️ SINGLE DIGIT MS',
    icon: Database,
  },
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'Object Storage',
    desc: '11 9s (99.999999999%) durability for assets & training data.',
    soundType: 'beep',
    color: 'bg-emerald-400 text-slate-950',
    tag: '📦 11 NINES',
    icon: Server,
  },
  {
    id: 'cloudfront',
    name: 'CloudFront CDN',
    category: 'Edge Network',
    desc: 'Low-latency global edge caching with DDoS shield protection.',
    soundType: 'click',
    color: 'bg-cyan-400 text-slate-950',
    tag: '🌐 300+ EDGES',
    icon: Globe,
  },
  {
    id: 'cloudwatch',
    name: 'Amazon CloudWatch',
    category: 'Observability',
    desc: 'Real-time telemetry, synthetic alarms, and anomaly detection.',
    soundType: 'coin',
    color: 'bg-rose-400 text-slate-950',
    tag: '🛡️ ZERO DOWNTIME',
    icon: Activity,
  },
];

export const ServiceCircuitJammer: React.FC = () => {
  const [activePad, setActivePad] = useState<string | null>(null);
  const [invocationCount, setInvocationCount] = useState<number>(420);
  const [jamLogs, setJamLogs] = useState<string[]>([
    '⚡ Lab console online. Tap any service block to test live event triggers.',
  ]);
  const [allTriggered, setAllTriggered] = useState<string[]>([]);

  const handleTriggerPad = (pad: PadService) => {
    setActivePad(pad.id);
    playSound(pad.soundType);
    setInvocationCount((prev) => prev + 1);

    const latencyMs = (invocationCount % 16) + 4;
    const logEntry = `[ap-south-1] ${pad.name} executed: 200 OK (${latencyMs}ms)`;
    setJamLogs((prev) => [logEntry, ...prev.slice(0, 4)]);

    if (!allTriggered.includes(pad.id)) {
      const next = [...allTriggered, pad.id];
      setAllTriggered(next);
      if (next.length === servicePads.length) {
        playSound('powerup');
      }
    }

    setTimeout(() => {
      setActivePad(null);
    }, 250);
  };

  const handleReset = () => {
    playSound('beep');
    setInvocationCount(420);
    setAllTriggered([]);
    setJamLogs(['Circuit reset. Ready for builder test bursts.']);
  };

  return (
    <section id="circuit-jammer" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-slate-900 bg-amber-400 text-slate-950 text-xs font-mono font-black uppercase mb-3 shadow-[2px_2px_0px_#0F172A]">
              <span>Interactive Builder Lab</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Cloud Service Circuit Jammer
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl font-medium">
              Tap the tactile pads to trigger serverless events, execute AI agent prompts, and see simulated telemetry feedback.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl border-2 border-slate-900 bg-slate-50 font-mono text-xs">
              <span className="text-slate-500 block">Total Invocations</span>
              <span className="text-xl font-black text-slate-950">{invocationCount}</span>
            </div>
            <button
              onClick={handleReset}
              className="neo-btn bg-white hover:bg-slate-100 p-3 rounded-2xl text-xs font-bold text-slate-700 flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* 6 Tactile Service Pads Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {servicePads.map((pad) => {
            const Icon = pad.icon;
            const isFired = activePad === pad.id;
            const isUnlocked = allTriggered.includes(pad.id);

            return (
              <button
                key={pad.id}
                type="button"
                onClick={() => handleTriggerPad(pad)}
                className={`neo-card p-6 text-left relative overflow-hidden transition-all duration-150 cursor-pointer ${
                  isFired
                    ? 'translate-x-1 translate-y-1 shadow-none bg-amber-50'
                    : 'bg-white'
                }`}
              >
                {/* Active Indicator Strip */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl border-2 border-slate-900 ${pad.color} flex items-center justify-center shadow-[2px_2px_0px_#0F172A]`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-slate-900 bg-slate-100 text-slate-800">
                    {pad.tag}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-black text-slate-950">
                    {pad.name}
                  </h3>
                  {isUnlocked && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </div>

                <div className="text-xs font-mono font-bold text-slate-500 mb-2">
                  {pad.category}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {pad.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400">
                  <span>TAP TO INVOKE</span>
                  <Play className="w-3.5 h-3.5 text-slate-900 fill-current" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Telemetry Output Log */}
        <div className="neo-card p-4 bg-slate-950 text-emerald-400 font-mono text-xs shadow-[4px_4px_0px_#0F172A]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              LIVE TELEMETRY STREAM • AP-SOUTH-1
            </span>
            <span className="text-slate-500">
              {allTriggered.length} / {servicePads.length} Services Tested
            </span>
          </div>
          <div className="space-y-1">
            {jamLogs.map((log, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-amber-400">➜</span>
                <span className="text-slate-300">{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Master Builder Achievement Banner */}
        {allTriggered.length === servicePads.length && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-100 border-2 border-slate-900 shadow-[4px_4px_0px_#0F172A] flex items-center justify-between animate-bounce-subtle">
            <div className="flex items-center gap-3">
              <Trophy className="w-7 h-7 text-amber-700 shrink-0" />
              <div>
                <h4 className="text-sm font-black text-slate-950">
                  Circuit Jammer Champion Unlocked! 🏆
                </h4>
                <p className="text-xs text-slate-700">
                  You triggered all core services in the student cloud stack. Show your screen at the check-in booth for bonus holographic stickers!
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 bg-amber-400 border border-slate-900 rounded-lg text-slate-950">
              BONUS STICKERS +1
            </span>
          </div>
        )}

      </div>
    </section>
  );
};

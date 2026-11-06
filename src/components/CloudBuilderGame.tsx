import React, { useState } from 'react';
import { 
  Cpu, 
  Database, 
  Globe, 
  Zap, 
  Server, 
  Shield, 
  BrainCircuit, 
  Activity, 
  Sparkles, 
  RotateCcw, 
  Play, 
  CheckCircle2, 
  Trophy 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

interface CloudService {
  id: string;
  name: string;
  category: string;
  desc: string;
  icon: React.FC<{ className?: string }>;
  latencyImpact: number;
  rpsImpact: number;
  score: number;
  tag: string;
  color: string;
}

const availableServices: CloudService[] = [
  {
    id: 'route53',
    name: 'Amazon Route 53',
    category: 'Networking',
    desc: 'Ultra-low latency global DNS routing',
    icon: Globe,
    latencyImpact: -15,
    rpsImpact: 20000,
    score: 15,
    tag: 'DNS',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'cloudfront',
    name: 'Amazon CloudFront',
    category: 'Edge CDN',
    desc: '300+ Edge locations with sub-10ms cache hits',
    icon: Zap,
    latencyImpact: -35,
    rpsImpact: 50000,
    score: 20,
    tag: 'Edge CDN',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'apigw',
    name: 'Amazon API Gateway',
    category: 'App Integration',
    desc: 'Traffic management, throttling & auth validation',
    icon: Shield,
    latencyImpact: 5,
    rpsImpact: 10000,
    score: 15,
    tag: 'Gateway',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'lambda',
    name: 'AWS Lambda',
    category: 'Serverless Compute',
    desc: 'Zero-idle-cost microservices scaling automatically',
    icon: Cpu,
    latencyImpact: -5,
    rpsImpact: 15000,
    score: 25,
    tag: 'Compute',
    color: 'from-amber-400 to-yellow-500',
  },
  {
    id: 'dynamodb',
    name: 'Amazon DynamoDB',
    category: 'Database',
    desc: 'Single-digit millisecond NoSQL database with auto-sharding',
    icon: Database,
    latencyImpact: -10,
    rpsImpact: 25000,
    score: 20,
    tag: 'Storage',
    color: 'from-blue-600 to-cyan-500',
  },
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'Object Storage',
    desc: '99.999999999% (11 9s) durability static asset bucket',
    icon: Server,
    latencyImpact: -10,
    rpsImpact: 15000,
    score: 15,
    tag: 'Storage',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'bedrock',
    name: 'Amazon Bedrock',
    category: 'Generative AI',
    desc: 'Serverless Claude & Titan foundation models for autonomous agents',
    icon: BrainCircuit,
    latencyImpact: 20,
    rpsImpact: 5000,
    score: 30,
    tag: 'GenAI',
    color: 'from-purple-500 to-violet-700',
  },
  {
    id: 'cloudwatch',
    name: 'Amazon CloudWatch',
    category: 'Observability',
    desc: 'Real-time telemetry, alarm triggers & synthetic metrics',
    icon: Activity,
    latencyImpact: 0,
    rpsImpact: 5000,
    score: 15,
    tag: 'Metrics',
    color: 'from-rose-500 to-amber-600',
  },
];

export const CloudBuilderGame: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'cloudfront',
    'lambda',
    'dynamodb',
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [achievement, setAchievement] = useState<string | null>(null);

  const toggleService = (id: string) => {
    playSound('click');
    if (selectedServices.includes(id)) {
      if (selectedServices.length === 1) return; // Keep at least one
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Metrics calculation
  const baseLatency = 120;
  const latencyReduction = selectedServices.reduce((acc, id) => {
    const s = availableServices.find((item) => item.id === id);
    return acc + (s ? s.latencyImpact : 0);
  }, 0);
  const currentLatency = Math.max(12, baseLatency + latencyReduction);

  const totalRps = selectedServices.reduce((acc, id) => {
    const s = availableServices.find((item) => item.id === id);
    return acc + (s ? s.rpsImpact : 0);
  }, 10000);

  const totalScore = selectedServices.reduce((acc, id) => {
    const s = availableServices.find((item) => item.id === id);
    return acc + (s ? s.score : 0);
  }, 0);

  const hasAI = selectedServices.includes('bedrock');
  const hasServerless = selectedServices.includes('lambda') && selectedServices.includes('dynamodb');
  const hasFullStack = selectedServices.length >= 6;

  const handleSimulate = () => {
    playSound('powerup');
    setIsSimulating(true);
    setSimulationLogs(['Initializing simulated traffic burst: 100,000 requests/sec...']);

    setTimeout(() => {
      setSimulationLogs((prev) => [
        ...prev,
        '⚡ CloudFront edge cache hit ratio: 94.2%',
        '🚀 Serverless workers spawned: 240 concurrent Lambda instances',
      ]);
    }, 400);

    setTimeout(() => {
      setSimulationLogs((prev) => [
        ...prev,
        hasAI 
          ? '🧠 Bedrock agent executed intent classification in 180ms!'
          : '⚡ DynamoDB single-digit millisecond query resolved!',
        '✅ 0 dropped packets. Architecture auto-scaled flawlessly!',
      ]);
      playSound('deploy');

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF9900', '#FFC72C', '#6C5CE7', '#10B981'],
        });
      } catch {
        // confetti error fallback
      }

      if (hasAI && hasServerless) {
        setAchievement('🏆 Master Student Cloud Architect (S-Tier GenAI)');
      } else if (hasFullStack) {
        setAchievement('🌟 Well-Architected Cloud Champion');
      } else {
        setAchievement('⚡ Resilient Serverless Builder');
      }

      setIsSimulating(false);
    }, 1200);
  };

  const handleReset = () => {
    playSound('beep');
    setSelectedServices(['cloudfront', 'lambda', 'dynamodb']);
    setAchievement(null);
    setSimulationLogs([]);
  };

  return (
    <section id="builder-playground" className="py-24 bg-[#08111D] text-white relative overflow-hidden">
      {/* Background Tech Circuit Grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FF9900_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Fun Pill */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,153,0,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Interactive Student Sandbox</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Cloud Architecture{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              Simulator
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            Assemble your dream AWS student stack, test live simulated traffic, and see how low you can push latency!
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Service Selector (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-amber-400" />
                Select Cloud Building Blocks ({selectedServices.length}/8 active)
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Stack
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {availableServices.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                const IconComponent = service.icon;

                return (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`text-left p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden group cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900/90 border-amber-400/70 shadow-[0_0_20px_rgba(255,153,0,0.2)] ring-1 ring-amber-400/50'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* Active Indicator Top Glow */}
                    {isSelected && (
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-400" />
                    )}

                    <div className="flex items-start justify-between mb-2">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-md`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                          isSelected
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {service.tag}
                      </span>
                    </div>

                    <div className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                      {service.name}
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug line-clamp-2">
                      {service.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Telemetry & Simulation Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-purple-500 to-cyan-400" />

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-amber-400 animate-pulse" />
                    Architecture Telemetry
                  </h3>
                  <span className="text-xs text-slate-400">AWS Well-Architected Framework</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold">
                  ● Healthy
                </span>
              </div>

              {/* Live Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Edge Latency
                  </span>
                  <div className="text-2xl font-black text-amber-400 font-mono">
                    {currentLatency}
                    <span className="text-xs text-slate-400 font-normal ml-1">ms</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">⚡ 99.9th percentile</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Max Capacity
                  </span>
                  <div className="text-2xl font-black text-cyan-400 font-mono">
                    {(totalRps / 1000).toFixed(0)}k
                    <span className="text-xs text-slate-400 font-normal ml-1">req/s</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Auto-scalable tier</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Student Cloud Score
                  </span>
                  <div className="text-2xl font-black text-purple-400 font-mono">
                    {totalScore}
                    <span className="text-xs text-slate-400 font-normal ml-1">/ 160</span>
                  </div>
                  <span className="text-[10px] text-purple-300">
                    {totalScore > 100 ? '🔥 Legendary' : totalScore > 60 ? '⚡ Production-ready' : '🌱 Starter'}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Est. Monthly Cost
                  </span>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    ₹0.00
                  </div>
                  <span className="text-[10px] text-amber-300">AWS Free Tier + Credits</span>
                </div>
              </div>

              {/* Simulation CTA */}
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="w-full py-4 rounded-2xl font-black text-sm tracking-wide bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(255,153,0,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Play className={`w-4 h-4 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
                <span>{isSimulating ? 'Stressing Serverless Grid...' : 'Deploy & Test Simulated Load'}</span>
              </button>

              {/* Simulation Output Log Box */}
              {simulationLogs.length > 0 && (
                <div className="mt-4 p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 space-y-1.5 animate-in fade-in">
                  {simulationLogs.map((log, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-amber-400">➜</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Unlocked Achievement */}
              {achievement && (
                <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-emerald-500/20 border border-amber-400/40 text-center animate-bounce-subtle">
                  <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-sm">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <span>{achievement}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Badge unlocked! Show this at the registration desk for bonus builder stickers.
                  </p>
                </div>
              )}
            </div>

            {/* Fun Student Tip Card */}
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <p className="text-xs text-slate-300">
                <strong className="text-amber-400">Pro-Tip for SCD 2027:</strong> Bring your laptop! Our hands-on workshop track walks you through deploying this exact serverless stack live during the event.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

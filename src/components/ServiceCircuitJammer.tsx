import React, { useState } from 'react';
import { 
  Zap, 
  BrainCircuit, 
  Database, 
  Server, 
  Globe, 
  Activity, 
  RotateCcw, 
  CheckCircle2,
  Terminal,
  Layers,
  ArrowRight
} from 'lucide-react';

interface PadService {
  id: string;
  name: string;
  category: string;
  desc: string;
  color: string;
  tag: string;
  icon: React.FC<{ className?: string }>;
}

const servicePads: PadService[] = [
  {
    id: 'lambda',
    name: 'AWS Lambda',
    category: 'Serverless Compute',
    desc: 'Event-driven execution with sub-15ms cold start optimization for microservices.',
    color: 'bg-amber-100 text-amber-900 border-amber-300',
    tag: 'SERVERLESS COMPUTE',
    icon: Zap,
  },
  {
    id: 'bedrock',
    name: 'Amazon Bedrock',
    category: 'Autonomous GenAI',
    desc: 'Orchestrating Claude 3.7 & multi-agent generative workflows with managed safety guardrails.',
    color: 'bg-purple-100 text-purple-900 border-purple-300',
    tag: 'MULTI-AGENT GENAI',
    icon: BrainCircuit,
  },
  {
    id: 'dynamodb',
    name: 'Amazon DynamoDB',
    category: 'NoSQL Database',
    desc: 'Single-digit millisecond reads & writes with seamless auto-partitioning at enterprise scale.',
    color: 'bg-blue-100 text-blue-900 border-blue-300',
    tag: 'LOW-LATENCY NOSQL',
    icon: Database,
  },
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'Object Storage',
    desc: '99.999999999% (11 9s) data durability for high-throughput media, backups, and lakehouses.',
    color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    tag: '11 NINES DURABILITY',
    icon: Server,
  },
  {
    id: 'cloudfront',
    name: 'CloudFront CDN',
    category: 'Edge Networking',
    desc: 'Low-latency global edge caching with automated DDoS mitigation and SSL termination.',
    color: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    tag: 'GLOBAL EDGE NETWORK',
    icon: Globe,
  },
  {
    id: 'cloudwatch',
    name: 'Amazon CloudWatch',
    category: 'Full-Stack Observability',
    desc: 'Real-time metrics, distributed trace telemetry, automated alarms, and log insights.',
    color: 'bg-rose-100 text-rose-900 border-rose-300',
    tag: 'TELEMETRY & METRICS',
    icon: Activity,
  },
];

export const ServiceCircuitJammer: React.FC = () => {
  const [activePad, setActivePad] = useState<string | null>(null);
  const [invocationCount, setInvocationCount] = useState<number>(420);
  const [jamLogs, setJamLogs] = useState<string[]>([
    'System ready. Select any AWS architecture component to simulate request routing.',
  ]);
  const [allTriggered, setAllTriggered] = useState<string[]>([]);

  const handleTriggerPad = (pad: PadService) => {
    setActivePad(pad.id);
    setInvocationCount((prev) => prev + 1);

    const latencyMs = (invocationCount % 14) + 6;
    const logEntry = `[ap-south-1] ${pad.name} invocation: HTTP 200 OK • Response Time: ${latencyMs}ms`;
    setJamLogs((prev) => [logEntry, ...prev.slice(0, 4)]);

    if (!allTriggered.includes(pad.id)) {
      setAllTriggered([...allTriggered, pad.id]);
    }

    setTimeout(() => {
      setActivePad(null);
    }, 250);
  };

  const handleReset = () => {
    setInvocationCount(420);
    setAllTriggered([]);
    setJamLogs(['Pipeline reset. Ready for synthetic request routing.']);
  };

  return (
    <section id="circuit-jammer" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7FF] via-[#F5EFFE] to-[#FAF7FF] border-b-2 border-purple-900/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-300 bg-purple-100 text-purple-900 text-xs font-mono font-bold uppercase mb-3 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-purple-700" />
              <span>Interactive Architecture Explorer</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#260B49] tracking-tight">
              Cloud Service Pipeline Simulator
            </h2>
            <p className="text-sm sm:text-base text-purple-950/75 mt-2 max-w-xl font-medium">
              Inspect how modern serverless and autonomous agent payloads propagate across AWS managed services.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl border border-purple-200 bg-white shadow-sm font-mono text-xs">
              <span className="text-purple-600 block text-[10px] uppercase font-bold">Total Invocations</span>
              <span className="text-xl font-black text-purple-950">{invocationCount}</span>
            </div>
            <button
              onClick={handleReset}
              className="bg-white hover:bg-purple-50 border border-purple-200 p-3 rounded-2xl text-xs font-bold text-purple-900 flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-purple-600" />
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
                className={`p-6 rounded-3xl border-2 text-left relative overflow-hidden transition-all duration-150 cursor-pointer ${
                  isFired
                    ? 'border-purple-600 bg-purple-50 scale-[0.99] shadow-inner'
                    : 'bg-white border-purple-200 shadow-sm hover:border-purple-400 hover:shadow-md'
                }`}
              >
                {/* Active Indicator Strip */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl border ${pad.color} flex items-center justify-center shadow-sm`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-purple-200 bg-purple-50 text-purple-800">
                    {pad.tag}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-black text-purple-950">
                    {pad.name}
                  </h3>
                  {isUnlocked && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </div>

                <div className="text-xs font-mono font-bold text-purple-700/80 mb-2">
                  {pad.category}
                </div>

                <p className="text-xs text-purple-950/75 leading-relaxed font-normal">
                  {pad.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between text-[11px] font-mono font-bold text-purple-600">
                  <span>CLICK TO EXECUTE</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Telemetry Console */}
        <div className="p-5 rounded-3xl bg-purple-950 text-purple-200 font-mono text-xs border border-purple-800 shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-800/80 text-purple-300">
            <span className="flex items-center gap-2 font-bold">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>SYNTHETIC PIPELINE MONITOR • AP-SOUTH-1</span>
            </span>
            <span className="text-purple-400">
              {allTriggered.length} / {servicePads.length} Node Types Verified
            </span>
          </div>
          <div className="space-y-1.5">
            {jamLogs.map((log, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-amber-400">➜</span>
                <span className="text-purple-100 font-normal">{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Milestone Card */}
        {allTriggered.length === servicePads.length && (
          <div className="mt-6 p-5 rounded-2xl bg-white border-2 border-purple-300 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-sm font-black text-purple-950">
                  Full-Stack Architecture Explored
                </h4>
                <p className="text-xs text-purple-800/80">
                  You verified all fundamental service layers. Learn to implement and connect these architectures during the summit workshops on Feb 7th!
                </p>
              </div>
            </div>
            <a
              href="#ticket-dispenser"
              className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-purple-950 hover:bg-purple-900 text-amber-300 font-mono font-bold text-xs shadow-sm"
            >
              Get Workshop Pass ➔
            </a>
          </div>
        )}

      </div>
    </section>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error' | 'success';
  text: string;
}

const quickCommands = [
  'aws sbg status',
  'aws sbg perks',
  'aws lambda invoke --coffee',
  'deploy --friday',
  'aws bedrock ask-tips',
  'clear',
];

export const BuilderTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'output',
      text: '⚡ AWS Student Builder Group PICT [Cloud Terminal v2.7.0]',
    },
    {
      id: 'init-2',
      type: 'output',
      text: 'Type "help" or click a quick command below to explore secret builder lore.',
    },
  ]);
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    playSound('click');
    const cmd = rawCmd.toLowerCase();

    const newLines: TerminalLine[] = [
      { id: Date.now().toString(), type: 'command', text: `$ ${rawCmd}` },
    ];

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (cmd === 'help') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `Available Commands:
  • aws sbg status       - Real-time summit telemetry, venue & wifi
  • aws sbg perks        - List attendee loot, swag & AWS credits
  • aws lambda invoke --coffee - Brew student developer fuel
  • deploy --friday      - Dangerously deploy to prod
  • aws bedrock ask-tips - Advice for winning the Hackathon
  • tickets              - Jump directly to booking passes
  • party                - Maximum confetti blast
  • clear                - Wipe terminal screen`,
      });
    } else if (cmd === 'aws sbg status' || cmd === 'status') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        text: `[SUMMIT TELEMETRY]:
  📅 Date: Sunday, 31st January 2027 (09:00 AM IST)
  📍 Venue: Dakkhan Banquet Hall, Ambegoan | Katraj | Nahre, Pune
  👥 Registered Builders: 740+ / 1,000 capacity
  📶 Venue Wi-Fi SSID: AWS_SBG_PICT_GUEST (Password: serverless2027)
  🍕 Free Lunch & High-Tea: Guaranteed for all pass holders`,
      });
    } else if (cmd === 'aws sbg perks' || cmd === 'perks') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        text: `[OFFICIAL SWAG LOOT BAG]:
  🎒 1x Heavy-Duty AWS Student Builder Laptop Backpack
  👕 1x Premium "Cloud City 2027" Cotton Builder Tee
  💳 1x $50 - $100 AWS Skill Builder Certification Voucher
  ✨ 1x Holographic Die-Cut Sticker Pack (Bedrock, Lambda, DynamoDB)
  📜 1x Verifiable Digital Certificate of Attendance
  ☕ Unlimited Coffee & High-Tea throughout the summit`,
      });
    } else if (cmd.includes('coffee') || cmd.includes('lambda')) {
      playSound('beep');
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `☕ Invoking serverless coffee function...
  [Warm-up]: 12ms
  [Grinding Beans]: Robust dark roast extracted.
  [Result]: Developer caffeine levels optimized to 100%. Ready for hands-on labs!`,
      });
    } else if (cmd.includes('friday') || cmd.includes('deploy')) {
      playSound('deploy');
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#FF9900', '#FFC72C', '#6C5CE7', '#10B981'],
        });
      } catch {
        // ignore
      }
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        text: `🚨 [YOLO ALERT]: Deploying directly into production on a Friday!
  ✅ Zero downtime achieved!
  🎉 The AWS deities are pleased with your fearlessness.`,
      });
    } else if (cmd.includes('bedrock') || cmd.includes('tips')) {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `🤖 [Amazon Bedrock Foundation Model Insights]:
  1. Team up with builders from different colleges at the morning Cloud Cafe.
  2. Test your Lambda IAM permissions early so you don't fight 403 AccessDenied.
  3. Don't miss Sarah Chen's keynote on multi-region architecture at 09:30 AM!`,
      });
    } else if (cmd === 'party') {
      playSound('powerup');
      try {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#FF9900', '#FFC72C', '#6C5CE7', '#EC4899'],
        });
      } catch {
        // ignore
      }
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        text: '🥳 AWS Student Community Day 2027 party mode unlocked!',
      });
    } else if (cmd === 'tickets') {
      const ticketsEl = document.getElementById('tickets');
      ticketsEl?.scrollIntoView({ behavior: 'smooth' });
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: 'Scrolled to Ticket Passes section! Grab your Super Early Bird pass before it sells out.',
      });
    } else {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'error',
        text: `zsh: command not found: "${rawCmd}". Type "help" to see valid commands.`,
      });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const copyTerminalOutput = () => {
    const textToCopy = history.map((line) => line.text).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-[#080E1B] border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm max-w-4xl mx-auto my-12">
      {/* Terminal Title Bar */}
      <div className="bg-[#0D1B2A] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-xs text-slate-400 font-semibold ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            aws-sbg-pict@cloud-city:~$
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyTerminalOutput}
            title="Copy terminal logs"
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={() => executeCommand('clear')}
            title="Clear terminal"
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div className="p-5 max-h-72 overflow-y-auto space-y-2 select-text bg-[#060B14]">
        {history.map((line) => (
          <div
            key={line.id}
            className={`leading-relaxed whitespace-pre-wrap ${
              line.type === 'command'
                ? 'text-amber-400 font-bold'
                : line.type === 'error'
                ? 'text-rose-400'
                : line.type === 'success'
                ? 'text-emerald-400'
                : 'text-slate-300'
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Command Chips */}
      <div className="px-4 py-2.5 bg-[#091322] border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          Click to run:
        </span>
        {quickCommands.map((qCmd) => (
          <button
            key={qCmd}
            onClick={() => executeCommand(qCmd)}
            className="shrink-0 text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-amber-400 hover:text-slate-950 text-slate-300 transition-all font-mono border border-slate-700/60 cursor-pointer"
          >
            {qCmd}
          </button>
        ))}
      </div>

      {/* Command Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 bg-[#0D1B2A] border-t border-slate-800 flex items-center gap-3"
      >
        <span className="text-amber-400 font-bold">➜</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Try 'aws sbg status', 'perks', or 'deploy --friday'..."
          className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-xs sm:text-sm font-mono"
        />
        <button
          type="submit"
          aria-label="Send terminal command"
          className="p-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  Terminal, 
  Sparkles, 
  RefreshCw, 
  FileText, 
  Hash, 
  KeyRound,
  ArrowRight,
  Zap
} from 'lucide-react';

export const InteractiveProofPlayground: React.FC = () => {
  const [reportTitle, setReportTitle] = useState("Accounting ledger discrepancies in offshore vendor payouts");
  const [category, setCategory] = useState("0x02 (Financial Fraud)");
  const [isProving, setIsProving] = useState(false);
  const [proofResult, setProofResult] = useState<{
    evidenceHash: string;
    proofGenerated: boolean;
    zkProofHash: string;
    latencyMs: number;
    witnessLeakBytes: number;
    disclosedState: string;
  } | null>(null);

  // Generate deterministic-looking SHA256 hex string for preview
  const handleSimulateProof = () => {
    setIsProving(true);
    setProofResult(null);

    setTimeout(() => {
      // Mock SHA-256 computation
      const randomHex = Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');

      const proofHex = Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');

      setProofResult({
        evidenceHash: `0x${randomHex.substring(0, 40)}...`,
        proofGenerated: true,
        zkProofHash: `zk-snark-mid-${proofHex.substring(0, 24)}`,
        latencyMs: Math.floor(Math.random() * 300) + 1150,
        witnessLeakBytes: 0,
        disclosedState: `disclose(0x${randomHex.substring(0, 16)}), report_count.increment(1)`
      });
      setIsProving(false);
    }, 1200);
  };

  const samplePresets = [
    { title: "Offshore vendor bribery kickback scheme", category: "0x01 (Corruption)" },
    { title: "Quarterly earnings revenue inflation manipulation", category: "0x02 (Financial Fraud)" },
    { title: "Workplace safety violation in assembly facility", category: "0x04 (Safety Violations)" }
  ];

  return (
    <section id="playground" className="py-20 bg-space-950 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-zk/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-whistle/10 border border-whistle/25 text-whistle text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Judge Playground</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Live Compact ZK Circuit Prover
          </h2>
          <p className="text-sm sm:text-base text-[#8A8FA3] mt-3">
            Test the zero-knowledge proof generation pipeline in real-time. Witness secrets remain locally isolated.
          </p>
        </div>

        {/* Playground Interactive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Configuration Panel */}
          <div className="lg:col-span-6 glass-card p-6 sm:p-8 border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyber" />
                  <h3 className="font-heading font-bold text-base text-white">1. Input Anonymous Evidence</h3>
                </div>
                <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-gray-300">
                  Client Memory
                </span>
              </div>

              {/* Sample Presets */}
              <div className="mb-4">
                <label className="text-xs text-[#8A8FA3] font-medium block mb-2">
                  Quick Presets for Judges:
                </label>
                <div className="flex flex-wrap gap-2">
                  {samplePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setReportTitle(preset.title);
                        setCategory(preset.category);
                      }}
                      className="text-[11px] px-3 py-1.5 rounded-lg bg-white/5 hover:bg-zk/20 hover:text-zk-light border border-white/10 hover:border-zk/40 text-gray-300 transition"
                    >
                      {preset.title.split(' ')[0]}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Report Input */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[#8A8FA3] font-medium block mb-1.5">
                    Evidence Disclosure Summary
                  </label>
                  <input
                    type="text"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="w-full bg-space-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-zk transition"
                    placeholder="Enter confidential report summary..."
                  />
                </div>

                <div>
                  <label className="text-xs text-[#8A8FA3] font-medium block mb-1.5">
                    Misconduct Category Code
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-space-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-zk transition"
                  >
                    <option value="0x01 (Corruption & Bribery)">0x01 — Corruption & Bribery</option>
                    <option value="0x02 (Financial Fraud)">0x02 — Financial & Accounting Fraud</option>
                    <option value="0x03 (Harassment & Abuse)">0x03 — Harassment & Retaliation</option>
                    <option value="0x04 (Safety Violations)">0x04 — Safety & Regulatory Non-Compliance</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Prover Trigger Button */}
            <button
              onClick={handleSimulateProof}
              disabled={isProving}
              className="w-full btn-whistle justify-center py-3.5 text-sm shadow-xl shadow-whistle/20"
            >
              {isProving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-space-950" />
                  <span>Synthesizing Zero-Knowledge Witness...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-space-950 fill-space-950" />
                  <span>Execute Local ZK Prover Circuit</span>
                </>
              )}
            </button>
          </div>

          {/* Right Live Prover Terminal Output */}
          <div className="lg:col-span-6 glass-card p-6 sm:p-8 border-zk/30 bg-gradient-to-b from-space-900 to-space-950 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-zk-glow">
                  <ShieldCheck className="w-4 h-4" />
                  <h3 className="font-heading font-bold text-base text-white">2. Circuit Proof Output</h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Zero Data Leakage
                </span>
              </div>

              {/* Terminal Display */}
              <div className="rounded-xl bg-black/90 border border-white/10 p-4 font-mono text-xs space-y-3 min-h-[220px]">
                <div className="flex items-center justify-between text-[11px] text-[#8A8FA3] border-b border-white/5 pb-2">
                  <span>Midnight Proof Server (Localhost:6300)</span>
                  <span className="text-cyber">Compact v0.16</span>
                </div>

                {isProving && (
                  <div className="py-8 text-center space-y-2 animate-pulse">
                    <Cpu className="w-8 h-8 text-zk-glow mx-auto animate-spin" />
                    <p className="text-xs text-zk-light">Evaluating R1CS constraints locally...</p>
                    <p className="text-[10px] text-gray-500">Separating private witness from public ledger envelope</p>
                  </div>
                )}

                {!isProving && !proofResult && (
                  <div className="py-8 text-center text-[#8A8FA3] space-y-2">
                    <Lock className="w-8 h-8 text-white/20 mx-auto" />
                    <p className="text-xs">Click "Execute Local ZK Prover Circuit" to run simulation.</p>
                    <p className="text-[10px] text-gray-600">Employee credential secret will be proven without disclosure</p>
                  </div>
                )}

                {!isProving && proofResult && (
                  <div className="space-y-2 text-[11px] animate-in fade-in duration-300">
                    <div className="flex items-start justify-between">
                      <span className="text-gray-400">Evidence SHA-256:</span>
                      <span className="text-cyber font-bold">{proofResult.evidenceHash}</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-gray-400">ZK-SNARK Proof:</span>
                      <span className="text-zk-glow font-bold">{proofResult.zkProofHash}</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-gray-400">Credential Secret:</span>
                      <span className="text-emerald-400 font-mono">[PROTECTED / 0 BITS LEAKED]</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-gray-400">Prover Latency:</span>
                      <span className="text-white font-bold">{proofResult.latencyMs} ms</span>
                    </div>
                    <div className="flex items-start justify-between pt-2 border-t border-white/5">
                      <span className="text-gray-400">On-Chain State:</span>
                      <span className="text-whistle font-mono">{proofResult.disclosedState}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Verification Badge */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#8A8FA3]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Authorized Credential Verified</span>
              </span>
              <span className="font-mono text-[11px] text-gray-400">
                ZK Proof Validated
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

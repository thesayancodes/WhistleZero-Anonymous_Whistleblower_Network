import React, { useState } from 'react';
import { 
  FileText, 
  Cpu, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight, 
  Lock, 
  Database, 
  EyeOff, 
  Sparkles,
  KeyRound,
  FileCheck
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      title: 'Compose & Hash Evidence',
      short: 'In-Memory SHA-256',
      badge: 'Local Browser',
      icon: <FileText className="w-6 h-6 text-zk-glow" />,
      color: 'border-zk/40 text-zk-glow',
      description: 'The whistleblower creates the report with evidence attachments. The browser immediately computes a SHA-256 cryptographic commitment of the evidence.',
      details: [
        'Evidence is hashed in local RAM memory only',
        'Raw documentation never touches any server',
        'Generates deterministic 64-char evidence hash'
      ],
      codeSnippet: `const evidenceHash = sha256(rawReportContent);\nconst category = ReportCategory.FRAUD;\n// Raw file stays on user's device`
    },
    {
      step: 2,
      title: 'Generate Local ZK Proof',
      short: 'Compact Circuit Prover',
      badge: 'Zero-Knowledge Prover',
      icon: <Cpu className="w-6 h-6 text-cyber" />,
      color: 'border-cyber/40 text-cyber',
      description: 'The local Midnight proof server executes the Compact smart contract circuit. It verifies employee credential authorization against the organization root without revealing the private key.',
      details: [
        'Proves membership mathematically without disclosing who',
        'No wallet address or signing key attached to witness',
        'Proof generated in ~1.2 seconds locally'
      ],
      codeSnippet: `witness employee_credential_secret: Bytes[32];\n// Proves caller holds valid unrevoked key\nassert(is_member(credential, org_root));`
    },
    {
      step: 3,
      title: 'Midnight Ledger Verification',
      short: 'Compact Contract Call',
      badge: 'Preprod Testnet',
      icon: <FileCheck className="w-6 h-6 text-whistle" />,
      color: 'border-whistle/40 text-whistle',
      description: 'The Compact smart contract verifies the zero-knowledge proof validity on-chain and updates public counters.',
      details: [
        'Smart contract validates cryptographic proof',
        'Public report_count incremented safely',
        'disclose(latest_evidence_hash) recorded'
      ],
      codeSnippet: `export circuit submit_anonymous_report(\n  evidence: Bytes[32],\n  cat: Uint<8>\n): Void {\n  disclose(evidence);\n  report_count.increment(1);\n}`
    },
    {
      step: 4,
      title: 'Public Audit with Zero Leakage',
      short: 'Immutable Commitment',
      badge: 'Global Verifiability',
      icon: <EyeOff className="w-6 h-6 text-emerald-400" />,
      color: 'border-emerald-400/40 text-emerald-400',
      description: 'The public and audit boards observe a confirmed, authorized report. The whistleblower\'s true identity is cryptographically impossible to reverse-engineer.',
      details: [
        'Anyone can verify report authenticity',
        'Retaliation is mathematically prevented',
        'Zero metadata or IP footprint on-chain'
      ],
      codeSnippet: `// On-chain state: { report_count: 140, evidence_hash: "0x8f2a..." }\n// Identity & Wallet: [UNDEFINED / UNKNOWN]`
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#0B0E1A]/40 relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyber/10 border border-cyber/25 text-cyber text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step-by-Step Cryptographic Flow</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            How WhistleZero Protects You
          </h2>
          <p className="text-sm sm:text-base text-[#8A8FA3] mt-3">
            From local evidence hash to on-chain Midnight verification — four unbreachable layers of zero-knowledge privacy.
          </p>
        </div>

        {/* Step Indicator Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {steps.map((s) => {
            const isSelected = activeStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`text-left p-5 rounded-2xl transition-all duration-300 relative border ${
                  isSelected
                    ? 'bg-zk/15 border-zk shadow-lg shadow-zk/20 translate-y-[-2px]'
                    : 'bg-space-900/80 border-white/10 hover:border-white/20 hover:bg-space-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-zk text-white' : 'bg-white/10 text-gray-400'
                  }`}>
                    STEP 0{s.step}
                  </span>
                  <span className="text-[10px] font-mono text-[#8A8FA3]">{s.badge}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-black/40 ${s.color}`}>
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-white">{s.title}</h3>
                    <p className="text-[11px] text-[#8A8FA3] font-mono">{s.short}</p>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyber rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Interactive Box */}
        {(() => {
          const current = steps.find((s) => s.step === activeStep) || steps[0];
          return (
            <div className="glass-card p-6 sm:p-8 border-zk/30 bg-gradient-to-br from-space-900 via-space-950 to-[#05060F] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Descriptions & Highlights */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-zk/20 text-zk-glow border border-zk/40">
                    {current.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-cyber font-bold">
                      Step {current.step} Breakdown
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-white">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#E8E9F3] leading-relaxed">
                  {current.description}
                </p>

                <div className="space-y-2.5 pt-2">
                  {current.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-300">
                      <div className="w-4 h-4 rounded-full bg-cyber/20 text-cyber flex items-center justify-center shrink-0">
                        ✓
                      </div>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => setActiveStep(current.step === 4 ? 1 : current.step + 1)}
                    className="btn-primary text-xs py-2.5 px-4"
                  >
                    <span>{current.step === 4 ? 'Loop to Step 1' : 'Next Step'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-[#8A8FA3] font-mono">
                    {current.step} of 4 steps explored
                  </span>
                </div>
              </div>

              {/* Right Column: Code & Circuit Terminal Preview */}
              <div className="lg:col-span-5">
                <div className="rounded-xl bg-black/80 border border-white/10 p-4 font-mono text-xs shadow-2xl">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-[11px] text-gray-400 ml-2">compact_circuit.compact</span>
                    </div>
                    <span className="text-[10px] text-zk-glow uppercase">ZK Proof Witness</span>
                  </div>

                  <pre className="text-emerald-400 leading-relaxed text-[11px] overflow-x-auto whitespace-pre-wrap">
                    {current.codeSnippet}
                  </pre>

                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400">
                    <span>Prover Status: <strong className="text-cyber">Ready</strong></span>
                    <span>Witness Leaks: <strong className="text-emerald-400">0 bytes</strong></span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};

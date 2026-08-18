import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  UserX, 
  Lock, 
  Flame, 
  Eye, 
  Server, 
  Cpu, 
  Check, 
  X, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export const ProblemSolutionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'traditional' | 'whistlezero'>('comparison');

  const traditionalIssues = [
    {
      title: '75% Whistleblower Retaliation Rate',
      desc: 'Employees who report internal misconduct routinely face career blacklisting, firing, or harassment because reporting channels identify them.',
      icon: <Flame className="w-5 h-5 text-rose-400" />
    },
    {
      title: 'Metadata & IP Logging Inboxes',
      desc: 'Web forms, corporate HR inboxes, and hotlines silently store IP addresses, device timestamps, and intranet auth logs.',
      icon: <Server className="w-5 h-5 text-amber-400" />
    },
    {
      title: 'Public Blockchains Expose Wallets',
      desc: 'Standard on-chain reporting signs every payload with a public wallet address, permanently tying the whistleblower to the transaction.',
      icon: <UserX className="w-5 h-5 text-rose-400" />
    }
  ];

  const whistleZeroSolutions = [
    {
      title: '0% Disclosed Identity Guarantee',
      desc: 'Zero-Knowledge proofs certify valid employee credential membership without ever publishing or revealing the secret key.',
      icon: <ShieldCheck className="w-5 h-5 text-cyber" />
    },
    {
      title: 'Local Client Proving (Docker/WASM)',
      desc: 'The cryptographic proof is generated directly in the whistleblower\'s local environment before any packet touches the network.',
      icon: <Cpu className="w-5 h-5 text-zk-glow" />
    },
    {
      title: 'Midnight Compact Disclose() Architecture',
      desc: 'Only the evidence hash and public report counter are stored on-chain. Identity and wallet keys never exist on the ledger.',
      icon: <Lock className="w-5 h-5 text-cyber" />
    }
  ];

  return (
    <section id="problem" className="py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>The Whistleblower Dilemma</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Why Traditional Reporting Channels Fail
          </h2>
          <p className="text-sm sm:text-base text-[#8A8FA3] mt-3">
            Silence thrives when speaking up is dangerous. WhistleZero replaces trust with zero-knowledge mathematical guarantees.
          </p>
        </div>

        {/* Interactive Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Traditional Broken Systems */}
          <div className="glass-card p-6 sm:p-8 border-rose-500/20 bg-gradient-to-b from-rose-950/20 via-space-900 to-space-950 flex flex-col justify-between relative group hover:border-rose-500/40">
            <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-rose-500/20">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Traditional & Public Chains</h3>
                    <p className="text-xs text-rose-400/80">Vulnerable to correlation & retaliation</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 font-bold">
                  HIGH RISK
                </span>
              </div>

              <div className="space-y-4">
                {traditionalIssues.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-black/40 border border-rose-500/15 flex items-start gap-3.5">
                    <div className="p-1.5 rounded-lg bg-rose-500/10 shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-rose-400" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-rose-200">{item.title}</h4>
                      <p className="text-[11px] sm:text-xs text-[#8A8FA3] mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#8A8FA3]">
              <span>Risk: <strong>Permanent Identity Leakage</strong></span>
              <span className="text-rose-400 font-mono">Unsafe for sensitive reporting</span>
            </div>
          </div>

          {/* WhistleZero ZK Protection Shield */}
          <div className="glass-card p-6 sm:p-8 border-zk/30 bg-gradient-to-b from-zk-dark/20 via-space-900 to-space-950 flex flex-col justify-between relative group hover:border-cyber/50 shadow-xl shadow-zk/10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyber/15 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-zk/30">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-zk/20 text-zk-glow border border-zk/40">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">WhistleZero Protocol</h3>
                    <p className="text-xs text-cyber">Zero-Knowledge cryptographic immunity</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-zk/25 text-zk-light font-bold border border-zk/40">
                  ZERO-LEAKAGE
                </span>
              </div>

              <div className="space-y-4">
                {whistleZeroSolutions.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zk/10 border border-zk/20 hover:border-cyber/30 transition flex items-start gap-3.5">
                    <div className="p-1.5 rounded-lg bg-cyber/15 shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-cyber" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">{item.title}</h4>
                      <p className="text-[11px] sm:text-xs text-[#8A8FA3] mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#8A8FA3]">
              <span>Protection: <strong className="text-cyber">Provably Anonymous</strong></span>
              <span className="text-zk-glow font-mono">Midnight Compact Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

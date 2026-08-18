import React, { useState } from 'react';
import { 
  Lock, 
  FileText, 
  Cpu, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  ExternalLink, 
  Layers,
  FileCheck,
  UploadCloud,
  Check,
  Globe
} from 'lucide-react';
import { WalletState } from '../hooks/useMidnight';

interface SubmitReportViewProps {
  onCallCircuit: (category: string, evidenceText: string, credentialSecret: string) => Promise<{
    txHash: string;
    evidenceHash: string;
  }>;
  wallet: WalletState;
}

const CATEGORIES = [
  'Corruption',
  'Fraud',
  'Harassment',
  'Financial Manipulation',
  'Government Misconduct'
];

export const SubmitReportView: React.FC<SubmitReportViewProps> = ({ onCallCircuit, wallet }) => {
  const [category, setCategory] = useState<string>('Corruption');
  const [evidenceText, setEvidenceText] = useState<string>('');
  const [credentialSecret, setCredentialSecret] = useState<string>('');
  
  const [isGeneratingProof, setIsGeneratingProof] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [txResult, setTxResult] = useState<{ txHash: string; evidenceHash: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const steps = [
    { title: '1. Private Witness Constraint Vector', desc: 'Encoding employee secret witness into ZK domain' },
    { title: '2. Local Proof Server Execution', desc: 'Generating SNARK proof locally via Midnight Proof Server' },
    { title: '3. Compact Circuit Verification', desc: 'Evaluating submit_anonymous_report() logic' },
    { title: '4. Selective Disclosure Hash', desc: 'Executing disclose(report_content_hash)' },
    { title: '5. Preprod On-Chain Confirmation', desc: 'Broadcasting evidence commitment to Midnight Network' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet.isConnected) {
      setErrorMsg('Please connect your Midnight Lace Wallet before calling ZK contract circuits.');
      return;
    }
    if (!credentialSecret.trim()) {
      setErrorMsg('Employee Credential Secret is required for local witness generation.');
      return;
    }
    if (!evidenceText.trim()) {
      setErrorMsg('Report details cannot be empty.');
      return;
    }

    setErrorMsg(null);
    setTxResult(null);
    setIsGeneratingProof(true);
    setCurrentStepIndex(1);

    try {
      // Animate progress steps
      await new Promise((r) => setTimeout(r, 600));
      setCurrentStepIndex(2);
      
      await new Promise((r) => setTimeout(r, 1000));
      setCurrentStepIndex(3);

      const res = await onCallCircuit(category, evidenceText, credentialSecret);

      setCurrentStepIndex(4);
      await new Promise((r) => setTimeout(r, 600));
      setCurrentStepIndex(5);

      setTxResult(res);
      setCredentialSecret('');
      setEvidenceText('');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to generate ZK proof.');
    } finally {
      setIsGeneratingProof(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Title Bar */}
      <div className="glass-card p-6 flex flex-wrap items-center justify-between gap-4 border-zk/30 bg-space-900">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-zk-glow" />
              File Anonymous Whistleblower Report
            </h1>
            <span className="text-xs font-mono text-zk-light bg-zk/15 px-2.5 py-1 rounded-lg border border-zk/30">
              submit_anonymous_report()
            </span>
          </div>
          <p className="text-xs text-[#8A8FA3] mt-1">
            Prove employee authorization without revealing your name, identity, or wallet address.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* SDK Status Badge */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-zk-light bg-space-950 px-3 py-1.5 rounded-lg border border-zk/30">
            <Globe className="w-3.5 h-3.5 text-cyber" />
            <span>@midnight-ntwrk/midnight-js Active</span>
          </div>

          {/* Mandatory Privacy Label Badge */}
          <div className="badge-privacy">
            <ShieldCheck className="w-4 h-4" />
            <span>Proved without revealing identity</span>
          </div>
        </div>
      </div>

      {/* Main Split Screen Form & Circuit Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form (7 Cols) */}
        <div className="lg:col-span-7 glass-card p-6 border-white/10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Category Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                1. Select Report Category (Publicly Disclosed Category)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all text-left ${
                      category === cat
                        ? 'bg-zk/20 border-zk text-zk-light shadow-sm shadow-zk/20'
                        : 'bg-black/30 border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Private Witness: Employee Credential Secret */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyber" />
                  2. Employee Credential Secret (Private Witness)
                </label>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  100% PRIVATE • Zero-Knowledge Input
                </span>
              </div>
              <input
                type="password"
                value={credentialSecret}
                onChange={(e) => setCredentialSecret(e.target.value)}
                placeholder="e.g. 0xa1b2c3d4e5f6... (Your private identity key)"
                className="w-full bg-space-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono placeholder-gray-600 focus:outline-none focus:border-zk transition"
              />
              <p className="text-[11px] text-[#8A8FA3] mt-1">
                🔒 Evaluated locally inside browser ZK proof server. Never sent to any server or on-chain ledger.
              </p>
            </div>

            {/* Report Details */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-zk-glow" />
                3. Report Evidence Details
              </label>
              <textarea
                rows={5}
                value={evidenceText}
                onChange={(e) => setEvidenceText(e.target.value)}
                placeholder="Describe factual details, dates, and evidence hashes of misconduct..."
                className="w-full bg-space-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-zk transition resize-none"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-2 text-rose-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Circuit Button */}
            <button
              type="submit"
              disabled={isGeneratingProof}
              className="w-full btn-whistle justify-center py-3.5 text-xs font-heading font-bold shadow-lg shadow-whistle/25"
            >
              {isGeneratingProof ? (
                <>
                  <div className="w-4 h-4 border-2 border-space-950 border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Zero-Knowledge Witness...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-space-950" />
                  <span>Generate ZK Proof & Commit to Midnight</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Real-time Circuit Pipeline Tracker (5 Cols) */}
        <div className="lg:col-span-5 glass-card p-6 flex flex-col justify-between border-zk/20">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <Cpu className="w-5 h-5 text-zk-glow" />
              <h3 className="font-heading font-bold text-sm text-white">Circuit Execution Pipeline</h3>
            </div>

            <div className="space-y-3.5">
              {steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isCompleted = currentStepIndex > stepNum;
                const isCurrent = currentStepIndex === stepNum;

                return (
                  <div
                    key={stepNum}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isCompleted
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : isCurrent
                        ? 'bg-zk/20 border-zk text-zk-light shadow-sm shadow-zk/20'
                        : 'bg-black/20 border-white/5 text-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">{step.title}</span>
                      {isCompleted && <Check className="w-4 h-4 text-emerald-400" />}
                      {isCurrent && (
                        <div className="w-3.5 h-3.5 border-2 border-zk-glow border-t-transparent rounded-full animate-spin" />
                      )}
                    </div>
                    <p className="text-[11px] mt-1 text-[#8A8FA3]">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Success Box if Completed */}
          {txResult && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>On-Chain Commitment Confirmed!</span>
              </div>
              <div className="text-[10px] font-mono space-y-1 text-emerald-300">
                <div className="truncate">
                  Evidence: <strong className="text-white">{txResult.evidenceHash}</strong>
                </div>
                <div className="truncate">
                  Tx Proof: <strong className="text-white">{txResult.txHash}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

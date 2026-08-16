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
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="glass-card p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-400" />
              File Anonymous Whistleblower Report
            </h1>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              submit_anonymous_report()
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Prove employee authorization without revealing your name, identity, or wallet address.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* SDK Status Badge */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1.5 rounded-lg border border-indigo-500/30">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>@midnight-ntwrk/midnight-js SDK Active</span>
          </div>

          {/* Mandatory Privacy Label Badge */}
          <div className="badge-privacy glow-pulse">
            <ShieldCheck className="w-4 h-4" />
            <span>Proved without revealing your input</span>
          </div>
        </div>
      </div>

      {/* Main Split Screen Form & Circuit Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form (7 Cols) */}
        <div className="lg:col-span-7 glass-card p-6">
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
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm shadow-indigo-500/20'
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
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
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
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition"
              />
              <p className="text-[11px] text-gray-500 mt-1">
                🔒 Evaluated locally inside browser ZK proof server. Never sent to any server or on-chain ledger.
              </p>
            </div>

            {/* Report Details */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                3. Report Evidence Details
              </label>
              <textarea
                rows={5}
                value={evidenceText}
                onChange={(e) => setEvidenceText(e.target.value)}
                placeholder="Describe factual details, dates, and evidence hashes of misconduct..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition resize-none"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              id="submit-circuit-btn"
              type="submit"
              disabled={isGeneratingProof || !wallet.isConnected}
              className="w-full btn-primary justify-center py-3.5 text-sm"
            >
              {isGeneratingProof ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin text-indigo-300" />
                  <span>Generating Local ZK Proof via Midnight SDK...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Prove Authorization & Submit Anonymous Report</span>
                </>
              )}
            </button>

            {!wallet.isConnected && (
              <p className="text-center text-xs text-amber-400/90 font-medium">
                ⚠️ Connect your Lace Wallet to execute Midnight Compact ZK contracts.
              </p>
            )}
          </form>
        </div>

        {/* Right Column: Transaction & Proof Lifecycle Tracker (5 Cols) */}
        <div className="lg:col-span-5 glass-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-white mb-1 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              ZK Proof Lifecycle Tracker
            </h3>
            <p className="text-xs text-gray-400 mb-5">Midnight Network Provider Status</p>

            {/* Stepper list */}
            <div className="space-y-4 relative">
              <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-white/10 -z-0" />

              {steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isDone = currentStepIndex > stepNum || (currentStepIndex === 5 && stepNum === 5);
                const isActive = currentStepIndex === stepNum && isGeneratingProof;

                return (
                  <div key={step.title} className="flex items-start gap-3 relative z-10">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                        isDone
                          ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                          : isActive
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-600/20 animate-pulse'
                          : 'bg-black/60 border border-white/10 text-gray-500'
                      }`}
                    >
                      {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : stepNum}
                    </div>

                    <div>
                      <div className={`text-xs font-semibold ${isDone ? 'text-emerald-400' : isActive ? 'text-indigo-300' : 'text-gray-400'}`}>
                        {step.title}
                      </div>
                      <div className="text-[11px] text-gray-500">{step.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* On-Chain Result Display */}
          {txResult && (
            <div className="mt-6 p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between text-emerald-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  On-Chain Proof Confirmed!
                </span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
                  Preprod
                </span>
              </div>
              <div className="font-mono text-gray-300 break-all bg-black/40 p-2.5 rounded border border-white/5 space-y-1">
                <div><span className="text-gray-500">Tx Hash:</span> <span className="text-indigo-300">{txResult.txHash}</span></div>
                <div><span className="text-gray-500">Evidence Hash:</span> <span className="text-emerald-400">{txResult.evidenceHash}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

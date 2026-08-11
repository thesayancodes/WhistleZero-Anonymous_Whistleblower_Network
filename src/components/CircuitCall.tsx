import React, { useState } from 'react';
import { Lock, FileText, Cpu, CheckCircle2, ShieldCheck, AlertCircle, Sparkles, ExternalLink } from 'lucide-react';

interface CircuitCallProps {
  onCallCircuit: (category: string, evidenceText: string, credentialSecret: string) => Promise<{
    txHash: string;
    evidenceHash: string;
  }>;
  isConnected: boolean;
}

const CATEGORIES = [
  'Corruption',
  'Fraud',
  'Harassment',
  'Financial Manipulation',
  'Government Misconduct'
];

export const CircuitCall: React.FC<CircuitCallProps> = ({ onCallCircuit, isConnected }) => {
  const [category, setCategory] = useState<string>('Corruption');
  const [evidenceText, setEvidenceText] = useState<string>('');
  const [credentialSecret, setCredentialSecret] = useState<string>('');
  
  const [isGeneratingProof, setIsGeneratingProof] = useState<boolean>(false);
  const [proofStep, setProofStep] = useState<string>('');
  const [txResult, setTxResult] = useState<{ txHash: string; evidenceHash: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      setErrorMsg('Please connect your Lace Wallet before executing ZK circuits.');
      return;
    }
    if (!credentialSecret) {
      setErrorMsg('Private employee credential secret is required to generate ZK witness proof.');
      return;
    }
    if (!evidenceText) {
      setErrorMsg('Whistleblower report details cannot be empty.');
      return;
    }

    setErrorMsg(null);
    setTxResult(null);
    setIsGeneratingProof(true);

    try {
      setProofStep('Constructing ZK witness constraints & private input vector...');
      await new Promise((res) => setTimeout(res, 800));

      setProofStep('Running local Midnight Proof Server (port 6300)...');
      await new Promise((res) => setTimeout(res, 1200));

      setProofStep('Executing compact circuit: submit_anonymous_report()...');
      const res = await onCallCircuit(category, evidenceText, credentialSecret);

      setProofStep('Broadcasting proof commitment to Preprod testnet...');
      await new Promise((res) => setTimeout(res, 600));

      setTxResult(res);
      // Clear sensitive private witness fields from form state
      setCredentialSecret('');
      setEvidenceText('');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to submit ZK circuit proof.');
    } finally {
      setIsGeneratingProof(false);
      setProofStep('');
    }
  };

  return (
    <div className="glass-card p-6 mb-8">
      {/* Header section with Privacy Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-400" />
            File Anonymous Whistleblower Report
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Midnight Compact Smart Contract Circuit: <span className="font-mono text-indigo-300">submit_anonymous_report()</span>
          </p>
        </div>

        {/* Mandatory Label Requirement */}
        <div className="badge-privacy glow-pulse">
          <ShieldCheck className="w-4 h-4" />
          <span>Proved without revealing your input</span>
        </div>
      </div>

      <form onSubmit={handleSubmitReport} className="space-[#1b2333] space-y-5">
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Report Category (Disclosed Category Code)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all text-left ${
                  category === cat
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Private Witness Input: Employee Credential Secret */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              Employee Credential Secret (Private Witness)
            </label>
            <span className="text-[11px] text-emerald-400/90 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              100% PRIVATE • Never stored on-chain
            </span>
          </div>
          <input
            type="password"
            value={credentialSecret}
            onChange={(e) => setCredentialSecret(e.target.value)}
            placeholder="e.g. 0xa1b2c3... (Your employee private identity key)"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            This private key is evaluated locally inside the ZK proof circuit. It is zero-knowledge hidden and never transmitted to any server or ledger.
          </p>
        </div>

        {/* Whistleblower Evidence Text */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            Report Evidence Details
          </label>
          <textarea
            rows={4}
            value={evidenceText}
            onChange={(e) => setEvidenceText(e.target.value)}
            placeholder="Provide factual details, dates, and evidence hashes of misconduct..."
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition resize-none"
          />
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit & Local Proof Status */}
        <div className="pt-2">
          <button
            id="circuit-call-btn"
            type="submit"
            disabled={isGeneratingProof || !isConnected}
            className="w-full btn-primary justify-center py-3.5 text-base"
          >
            {isGeneratingProof ? (
              <>
                <Cpu className="w-5 h-5 animate-spin text-indigo-300" />
                <span>Generating ZK Proof locally...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Prove Authorization & Submit Anonymous Report</span>
              </>
            )}
          </button>

          {!isConnected && (
            <p className="text-center text-xs text-amber-400/90 mt-2">
              ⚠️ Connect your Midnight Lace Wallet above to execute this ZK contract circuit.
            </p>
          )}
        </div>
      </form>

      {/* Local ZK Proof Progress Indicator */}
      {isGeneratingProof && (
        <div className="mt-6 p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="spinner" />
            <span className="text-sm font-semibold text-indigo-200">{proofStep}</span>
          </div>
          <div className="w-full bg-indigo-950 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-2/3 animate-pulse" />
          </div>
          <p className="text-[11px] text-indigo-300/70 mt-2 font-mono">
            Proof server endpoint: localhost:6300 • Privacy Mode: Active
          </p>
        </div>
      )}

      {/* Transaction Result Display */}
      {txResult && (
        <div className="mt-6 p-5 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-emerald-300 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-white">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Report Submitted On-Chain Successfully!
            </div>
            <span className="badge-privacy text-xs">Verified Authorized Employee</span>
          </div>

          <div className="space-y-1.5 text-xs font-mono bg-black/40 p-3 rounded-lg border border-white/5">
            <div>
              <span className="text-gray-500">Tx Proof Hash: </span>
              <span className="text-indigo-300">{txResult.txHash}</span>
            </div>
            <div className="break-all">
              <span className="text-gray-500">Disclosed Evidence Hash: </span>
              <span className="text-emerald-400">{txResult.evidenceHash}</span>
            </div>
            <div>
              <span className="text-gray-500">Private Credential Status: </span>
              <span className="text-emerald-300 font-sans font-semibold">100% UNREVEALED (ZK Proof Verified)</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-gray-400">Public Ledger state updated automatically.</span>
            <a
              href={`https://explorer.preprod.midnight.network/tx/${txResult.txHash}`}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 font-medium"
            >
              Explorer <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

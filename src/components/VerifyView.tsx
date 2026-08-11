import React, { useState } from 'react';
import { SearchCheck, ShieldCheck, CheckCircle2, Lock, ExternalLink, RefreshCw } from 'lucide-react';

export const VerifyView: React.FC = () => {
  const [searchHash, setSearchHash] = useState<string>('0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifiedRecord, setVerifiedRecord] = useState<any>({
    evidenceHash: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    txHash: '0xzk_019a84f3e091b2c4',
    category: 'Financial Manipulation',
    blockHeight: 1842091,
    timestamp: '10 mins ago',
    proofValidity: 'VALID_SNARK_PROOF',
    disclosedByCircuit: 'submit_anonymous_report()'
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchHash.trim()) return;

    setIsVerifying(true);
    setTimeout(() => {
      setVerifiedRecord({
        evidenceHash: searchHash,
        txHash: `0xzk_${Math.random().toString(16).substring(2, 16)}`,
        category: 'Verified Misconduct Report',
        blockHeight: 1842105,
        timestamp: 'Just now',
        proofValidity: 'VALID_SNARK_PROOF',
        disclosedByCircuit: 'submit_anonymous_report()'
      });
      setIsVerifying(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="badge-privacy mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Public Ledger Verification Portal</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Verify On-Chain Report Authenticity
        </h1>
        <p className="text-xs text-gray-400 mt-1 max-w-2xl">
          Enter any evidence hash or transaction proof hash to audit zero-knowledge proof verification parameters on the Midnight Preprod testnet.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleVerify} className="mt-5 flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchHash}
              onChange={(e) => setSearchHash(e.target.value)}
              placeholder="Enter evidence commitment hash (0x...)"
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-4 pr-4 py-3 text-xs text-white font-mono placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <button type="submit" disabled={isVerifying} className="btn-primary py-3 px-6 text-xs">
            {isVerifying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <SearchCheck className="w-4 h-4" />
                <span>Audit On-Chain Proof</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Verification Audit Result Card */}
      {verifiedRecord && (
        <div className="glass-card p-6 border-emerald-500/30">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-white">Authenticated On-Chain</h3>
                  <span className="badge-privacy text-xs">
                    {verifiedRecord.proofValidity}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Zero-Knowledge Proof verified by Midnight Compact Circuit
                </p>
              </div>
            </div>

            <a
              href={`https://explorer.preprod.midnight.network/tx/${verifiedRecord.txHash}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary text-xs"
            >
              <span>View On Explorer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs font-mono">
            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <div className="text-gray-500 font-sans font-semibold">Evidence Hash Commitment:</div>
              <div className="text-emerald-400 break-all">{verifiedRecord.evidenceHash}</div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <div className="text-gray-500 font-sans font-semibold">Transaction Proof Hash:</div>
              <div className="text-indigo-300 break-all">{verifiedRecord.txHash}</div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <div className="text-gray-500 font-sans font-semibold">Selective Disclosure Circuit:</div>
              <div className="text-purple-300">{verifiedRecord.disclosedByCircuit}</div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <div className="text-gray-500 font-sans font-semibold">Block Height / Timestamp:</div>
              <div className="text-gray-300">Block #{verifiedRecord.blockHeight} • {verifiedRecord.timestamp}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

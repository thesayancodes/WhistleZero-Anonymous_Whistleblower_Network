import React from 'react';
import { BarChart3, Shield, Zap, Lock, Cpu, TrendingUp } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="badge-privacy mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Cryptographic Auditing Metrics</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Privacy & Proof Analytics
        </h1>
        <p className="text-xs text-gray-400 mt-1 max-w-2xl">
          Detailed metrics on zero-knowledge circuit execution times, proof size benchmarks, and selective disclosure integrity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-5 space-y-2">
          <div className="text-xs text-gray-400 uppercase font-semibold">Average ZK Proof Time</div>
          <div className="text-3xl font-extrabold text-indigo-400 font-mono">1.24s</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 14% faster than standard Groth16
          </div>
        </div>

        <div className="glass-card p-5 space-y-2">
          <div className="text-xs text-gray-400 uppercase font-semibold">Proof Size On-Chain</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">288 Bytes</div>
          <div className="text-[11px] text-gray-400">Minimal gas overhead on Midnight</div>
        </div>

        <div className="glass-card p-5 space-y-2">
          <div className="text-xs text-gray-400 uppercase font-semibold">Anonymity Set Size</div>
          <div className="text-3xl font-extrabold text-purple-400 font-mono">847 Employees</div>
          <div className="text-[11px] text-purple-300">100% Unlinkable Identity</div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Settings, Shield, Cpu, Database } from 'lucide-react';

export const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="badge-privacy mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>Configuration</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Network & Node Settings
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Local Midnight proof server configuration and network RPC options.
        </p>
      </div>

      <div className="glass-card p-6 space-y-4 text-xs">
        <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
          <div className="font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" />
            Local Proof Server Endpoint
          </div>
          <input
            type="text"
            readOnly
            value="http://localhost:6300"
            className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 font-mono text-indigo-300"
          />
        </div>

        <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
          <div className="font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            Network Selection
          </div>
          <select className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 font-sans text-gray-200 focus:outline-none">
            <option value="preprod">Midnight Preprod Testnet (Active)</option>
            <option value="preview">Midnight Preview Testnet</option>
            <option value="local">Local Devnet (Docker)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

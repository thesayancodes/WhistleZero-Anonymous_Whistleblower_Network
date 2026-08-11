import React from 'react';
import { Search, Bell, Shield, Cpu, ExternalLink } from 'lucide-react';
import { WalletState } from '../hooks/useMidnight';

interface TopNavProps {
  wallet: WalletState;
  collapsed: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({ wallet, collapsed }) => {
  return (
    <header
      className={`h-16 fixed top-0 right-0 z-30 bg-[#0a0d14]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 transition-all duration-300 ${
        collapsed ? 'left-20' : 'left-64'
      }`}
    >
      {/* Search Input */}
      <div className="relative w-72 md:w-96">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search evidence hashes, report IDs, tx proofs..."
          className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
        />
      </div>

      {/* Network Controls & Indicators */}
      <div className="flex items-center gap-4">
        {/* Local Proof Server Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-300">
          <Cpu className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Proof Server: <strong className="text-white font-mono">localhost:6300</strong></span>
        </div>

        {/* Network Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-semibold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{wallet.network} Testnet</span>
        </div>

        {/* Explorer Quick Link */}
        <a
          href="https://explorer.preprod.midnight.network/"
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
          title="Midnight Explorer"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
};

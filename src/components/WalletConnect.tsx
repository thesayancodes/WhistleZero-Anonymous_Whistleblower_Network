import React, { useState } from 'react';
import { WalletState } from '../hooks/useMidnight';
import { Shield, Wallet, LogOut, AlertCircle, CheckCircle2, RefreshCw, Copy, Check, ExternalLink } from 'lucide-react';
import { SupportedNetwork, MIDNIGHT_NETWORKS } from '../midnight/connector';

interface WalletConnectProps {
  wallet: WalletState;
  onConnect: () => void;
  onDisconnect: () => void;
  selectedNetwork?: SupportedNetwork;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  wallet,
  onConnect,
  onDisconnect,
  selectedNetwork = 'preprod'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = (addr: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(addr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const networkKey = (selectedNetwork || (wallet.network.toLowerCase().includes('preview') ? 'preview' : 'preprod')) as SupportedNetwork;
  const explorerBase = MIDNIGHT_NETWORKS[networkKey]?.explorerUrl || 'https://explorer.preprod.midnight.network';

  return (
    <div className="glass-card p-5 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Network & Identity Badge */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-white">Midnight Lace Wallet</h3>
              <span className="badge-privacy text-xs">
                {wallet.network} Network
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Zero-Knowledge Credential Provider • Compact Runtime Connected
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {wallet.isConnected && wallet.address ? (
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  {wallet.address.substring(0, 12)}...{wallet.address.substring(wallet.address.length - 6)}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyAddress(wallet.address!)}
                  className="p-1 hover:text-white transition"
                  title="Copy Wallet Address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <a
                href={explorerBase}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition"
                title={`Open Midnight ${wallet.network} Explorer`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                id="wallet-disconnect-btn"
                onClick={onDisconnect}
                className="btn-secondary text-red-400 hover:text-red-300 hover:border-red-500/30 text-xs py-1.5 px-3"
                title="Disconnect Wallet"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            </div>
          ) : (
            <button
              id="wallet-connect-btn"
              onClick={onConnect}
              disabled={wallet.isConnecting}
              className="btn-primary"
            >
              {wallet.isConnecting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Connecting Lace...</span>
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  <span>Connect Lace Wallet</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Error Message Banner */}
      {wallet.error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">Wallet Connection Error:</span> {wallet.error}
          </div>
        </div>
      )}
    </div>
  );
};

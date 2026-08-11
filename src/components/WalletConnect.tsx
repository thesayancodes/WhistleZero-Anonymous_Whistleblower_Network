import React from 'react';
import { WalletState } from '../hooks/useMidnight';
import { Shield, Wallet, LogOut, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';

interface WalletConnectProps {
  wallet: WalletState;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  wallet,
  onConnect,
  onDisconnect
}) => {
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
              Zero-Knowledge Credential Provider
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {wallet.isConnected && wallet.address ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  {wallet.address.substring(0, 10)}...{wallet.address.substring(wallet.address.length - 6)}
                </span>
              </div>
              <button
                id="wallet-disconnect-btn"
                onClick={onDisconnect}
                className="btn-secondary text-red-400 hover:text-red-300 hover:border-red-500/30"
                title="Disconnect Wallet"
              >
                <LogOut className="w-4 h-4" />
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

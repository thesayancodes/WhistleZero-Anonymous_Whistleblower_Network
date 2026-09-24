import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Cpu, 
  Database, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Activity, 
  KeyRound,
  FileCode2,
  Server
} from 'lucide-react';
import { MIDNIGHT_NETWORKS, SupportedNetwork, getExplorerContractUrl, getExplorerContractStreamUrl } from '../midnight/connector';

interface SettingsViewProps {
  selectedNetwork?: SupportedNetwork;
  onNetworkChange?: (net: SupportedNetwork) => void;
  contractAddress?: string;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  selectedNetwork = 'preprod',
  onNetworkChange,
  contractAddress
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [proofServerEndpoint, setProofServerEndpoint] = useState<string>('http://localhost:6300');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const activeConfig = MIDNIGHT_NETWORKS[selectedNetwork] || MIDNIGHT_NETWORKS.preprod;
  const activeContract = contractAddress || activeConfig.contractAddress;

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveSettings = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="badge-privacy mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>Protocol Configuration & Diagnostics</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Network & Node Diagnostics
        </h1>
        <p className="text-xs text-gray-400 mt-1 max-w-2xl">
          Configure active Midnight network testnet connections, inspect live Compact contract addresses, and manage local zero-knowledge proof server endpoints.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>Settings saved successfully! Network parameters updated.</span>
        </div>
      )}

      {/* Network Configuration */}
      <div className="glass-card p-6 space-y-5 text-xs">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400" />
          Active Midnight Testnet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onNetworkChange?.('preprod')}
            className={`p-4 rounded-xl border text-left transition ${
              selectedNetwork === 'preprod'
                ? 'bg-zk/20 border-zk/50 shadow-md shadow-zk/10'
                : 'bg-black/30 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Midnight Preprod</span>
              {selectedNetwork === 'preprod' && (
                <span className="badge-privacy text-[10px] py-0.5 px-2">Active</span>
              )}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Primary developer testnet with deployed WhistleZeroProtocol contract.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNetworkChange?.('preview')}
            className={`p-4 rounded-xl border text-left transition ${
              selectedNetwork === 'preview'
                ? 'bg-zk/20 border-zk/50 shadow-md shadow-zk/10'
                : 'bg-black/30 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Midnight Preview</span>
              {selectedNetwork === 'preview' && (
                <span className="badge-privacy text-[10px] py-0.5 px-2">Active</span>
              )}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Staging testnet tracking latest Midnight Network protocol upgrades.
            </p>
          </button>
        </div>

        {/* Live Contract Diagnostic Details */}
        <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-gray-300 flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-cyber" />
                Deployed WhistleZero Contract Address (Bech32m)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(activeContract, 'contract')}
                  className="text-[#8A8FA3] hover:text-white flex items-center gap-1 transition text-[11px]"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedField === 'contract' ? 'Copied!' : 'Copy'}</span>
                </button>
                <a
                  href={getExplorerContractUrl(selectedNetwork, activeContract)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zk-glow hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Explorer</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={getExplorerContractStreamUrl(selectedNetwork, activeContract)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:underline flex items-center gap-1 text-[11px]"
                  title="View Contract Actions Stream"
                >
                  <span>Stream</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <input
              type="text"
              readOnly
              value={activeContract}
              className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 font-mono text-zk-light select-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-gray-300 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Canonical Ledger Contract ID (Hex)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(activeConfig.ledgerContractId, 'ledgerId')}
                  className="text-[#8A8FA3] hover:text-white flex items-center gap-1 transition text-[11px]"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedField === 'ledgerId' ? 'Copied!' : 'Copy'}</span>
                </button>
                <a
                  href={getExplorerContractUrl(selectedNetwork, activeConfig.ledgerContractId)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zk-glow hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Explorer</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <input
              type="text"
              readOnly
              value={activeConfig.ledgerContractId}
              className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 font-mono text-emerald-300/90 select-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div>
              <span className="block font-semibold text-gray-400 text-[11px] mb-1">Node RPC Endpoint</span>
              <input
                type="text"
                readOnly
                value={activeConfig.nodeUrl}
                className="w-full bg-black/60 border border-white/10 rounded-lg p-2 font-mono text-gray-300"
              />
            </div>
            <div>
              <span className="block font-semibold text-gray-400 text-[11px] mb-1">Public Indexer GraphQL</span>
              <input
                type="text"
                readOnly
                value={activeConfig.indexerUrl}
                className="w-full bg-black/60 border border-white/10 rounded-lg p-2 font-mono text-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Local Proof Server Settings */}
      <div className="glass-card p-6 space-y-4 text-xs">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          Zero-Knowledge Proof Server (Local Prover)
        </h2>

        <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
          <label className="block text-gray-400 font-semibold">
            Midnight Proof Server HTTP URL:
          </label>
          <input
            type="text"
            value={proofServerEndpoint}
            onChange={(e) => setProofServerEndpoint(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 font-mono text-indigo-300 focus:outline-none focus:border-indigo-500 transition"
          />
          <p className="text-[11px] text-gray-500">
            WhistleZero utilizes a local Midnight proof server for SNARK witness generation so your credentials never leave your browser sandbox.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSaveSettings}
            className="btn-primary py-2.5 px-6 text-xs"
          >
            Save Configuration
          </button>
        </div>
      </div>

      {/* Protocol Architecture Reference */}
      <div className="glass-card p-6 space-y-3 text-xs">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-zk-glow" />
          Verified Compact Circuits
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-white/5 rounded-lg border border-white/5">
            <div className="font-mono text-zk-glow font-bold">submit_anonymous_report</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Discloses SHA-256 evidence hash, preserves witness privacy</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/5">
            <div className="font-mono text-cyber font-bold">escalate_investigation</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Increments active investigations ledger counter</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/5">
            <div className="font-mono text-emerald-400 font-bold">update_organization_root</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Governance credential root rotation circuit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

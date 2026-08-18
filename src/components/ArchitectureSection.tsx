import React, { useState } from 'react';
import { 
  Layers, 
  ShieldCheck, 
  Lock, 
  Eye, 
  Cpu, 
  FileCode, 
  Database, 
  Network, 
  CheckCircle2, 
  ExternalLink,
  ArrowDown,
  ArrowRight
} from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [activePrivacyTab, setActivePrivacyTab] = useState<'all' | 'public' | 'private'>('all');

  const privacyData = [
    {
      field: 'report_count',
      type: 'Public State',
      visibility: '🌐 Global On-Chain',
      desc: 'Monotonically increasing counter of total valid whistleblower disclosures verified on Midnight.',
      status: 'Public'
    },
    {
      field: 'latest_evidence_hash',
      type: 'Disclosed State',
      visibility: '🌐 Global On-Chain',
      desc: 'SHA-256 fingerprint of the submitted document, committed via Compact disclose() circuit call.',
      status: 'Public'
    },
    {
      field: 'report_category',
      type: 'Circuit Input',
      visibility: '🌐 Global On-Chain',
      desc: 'Integer tag indicating category (Corruption, Fraud, Harassment, Safety Violations).',
      status: 'Public'
    },
    {
      field: 'employee_credential_secret',
      type: 'Private Witness',
      visibility: '🔒 Local Witness Only',
      desc: 'Cryptographic secret key proving organization membership. Evaluated in zero-knowledge and discarded.',
      status: 'Private'
    },
    {
      field: 'whistleblower_wallet_address',
      type: 'Local Private State',
      visibility: '🔒 Local Witness Only',
      desc: 'Lace wallet address used locally. Never attached to the published Midnight transaction envelope.',
      status: 'Private'
    },
    {
      field: 'raw_evidence_document',
      type: 'Local Encrypted Payload',
      visibility: '🔒 Local Witness Only',
      desc: 'Original report text and attachments. Stored locally or shared only via end-to-end audit keys.',
      status: 'Private'
    }
  ];

  const filteredPrivacy = privacyData.filter(
    (item) => activePrivacyTab === 'all' || item.status.toLowerCase() === activePrivacyTab
  );

  return (
    <section id="architecture" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zk/10 border border-zk/30 text-zk-glow text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Compact & Midnight Architecture</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Cryptographic Privacy & Data Model
          </h2>
          <p className="text-sm sm:text-base text-[#8A8FA3] mt-3">
            How WhistleZero separates public auditability from zero-knowledge private witness state.
          </p>
        </div>

        {/* Interactive Architecture Flowchart Banner */}
        <div className="glass-panel p-6 sm:p-8 mb-14 relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <Network className="w-5 h-5 text-cyber" />
              <span>Full-Stack Zero-Knowledge Pipeline</span>
            </h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyber/10 border border-cyber/30 text-cyber">
              End-to-End Local Proving
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {/* Node 1 */}
            <div className="p-4 rounded-xl bg-space-900 border border-white/10 hover:border-zk/40 transition">
              <div className="text-[10px] font-mono text-zk-glow uppercase mb-1">Frontend Layer</div>
              <div className="font-heading font-bold text-sm text-white">React + Vite</div>
              <div className="text-xs text-[#8A8FA3] mt-1">Computes SHA-256 evidence commitment</div>
            </div>

            {/* Node 2 */}
            <div className="p-4 rounded-xl bg-space-900 border border-white/10 hover:border-cyber/40 transition">
              <div className="text-[10px] font-mono text-cyber uppercase mb-1">DApp Connector</div>
              <div className="font-heading font-bold text-sm text-white">Lace Wallet API</div>
              <div className="text-xs text-[#8A8FA3] mt-1">Holds private credential keys locally</div>
            </div>

            {/* Node 3 */}
            <div className="p-4 rounded-xl bg-space-900 border border-zk/40 bg-zk/10 transition shadow-lg shadow-zk/10">
              <div className="text-[10px] font-mono text-zk-glow uppercase mb-1">Compact Contract</div>
              <div className="font-heading font-bold text-sm text-white">counter.compact</div>
              <div className="text-xs text-[#8A8FA3] mt-1">Defines ZK constraints & disclose() logic</div>
            </div>

            {/* Node 4 */}
            <div className="p-4 rounded-xl bg-space-900 border border-white/10 hover:border-whistle/40 transition">
              <div className="text-[10px] font-mono text-whistle uppercase mb-1">Proof Engine</div>
              <div className="font-heading font-bold text-sm text-white">Local Proof Server</div>
              <div className="text-xs text-[#8A8FA3] mt-1">Generates ZK-SNARK on localhost:6300</div>
            </div>

            {/* Node 5 */}
            <div className="p-4 rounded-xl bg-space-900 border border-emerald-500/30 bg-emerald-500/5 transition">
              <div className="text-[10px] font-mono text-emerald-400 uppercase mb-1">Public Ledger</div>
              <div className="font-heading font-bold text-sm text-white">Midnight Preprod</div>
              <div className="text-xs text-[#8A8FA3] mt-1">Stores report_count & evidence hash</div>
            </div>
          </div>
        </div>

        {/* Privacy Model Data Matrix */}
        <div className="glass-card p-6 sm:p-8 border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <h3 className="font-heading font-bold text-xl text-white">
                Cryptographic Data Segregation Table
              </h3>
              <p className="text-xs text-[#8A8FA3] mt-1">
                Zero-Knowledge guarantees enforced mathematically by Compact contracts
              </p>
            </div>

            {/* Privacy Filters */}
            <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setActivePrivacyTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activePrivacyTab === 'all'
                    ? 'bg-zk text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                All Fields
              </button>
              <button
                onClick={() => setActivePrivacyTab('public')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activePrivacyTab === 'public'
                    ? 'bg-cyber/20 text-cyber border border-cyber/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🌐 Public Ledger
              </button>
              <button
                onClick={() => setActivePrivacyTab('private')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activePrivacyTab === 'private'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🔒 Private Witnesses
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[#8A8FA3] uppercase tracking-wider text-[11px] font-mono">
                  <th className="py-3.5 px-4">Data Element</th>
                  <th className="py-3.5 px-4">Circuit Variable Type</th>
                  <th className="py-3.5 px-4">Ledger Visibility</th>
                  <th className="py-3.5 px-4">Security Guarantee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPrivacy.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition">
                    <td className="py-4 px-4 font-mono font-bold text-white flex items-center gap-2">
                      {item.status === 'Public' ? (
                        <span className="w-2 h-2 rounded-full bg-cyber" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                      <span>{item.field}</span>
                    </td>
                    <td className="py-4 px-4 font-mono text-zk-glow">
                      {item.type}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        item.status === 'Public'
                          ? 'bg-cyber/10 text-cyber border border-cyber/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {item.visibility}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#8A8FA3] max-w-md">
                      {item.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

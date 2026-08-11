import React, { useState } from 'react';
import { Activity, ShieldCheck, ExternalLink, Filter } from 'lucide-react';
import { ReportTransaction } from '../hooks/useMidnight';

interface ActivityViewProps {
  recentReports: ReportTransaction[];
}

export const ActivityView: React.FC<ActivityViewProps> = ({ recentReports }) => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Corruption', 'Fraud', 'Harassment', 'Financial Manipulation'];

  const filteredReports = filter === 'All'
    ? recentReports
    : recentReports.filter((r) => r.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="badge-privacy mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Live Network Feed</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Anonymous Activity Stream
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time on-chain events emitted by the WhistleZero Compact smart contract.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-xl border border-white/10 text-xs">
          <Filter className="w-3.5 h-3.5 text-gray-500 ml-2 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filter === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="glass-card p-6 space-y-3">
        {filteredReports.map((report) => (
          <div
            key={report.txHash}
            className="p-4 bg-black/40 border border-white/5 hover:border-indigo-500/30 rounded-xl transition flex flex-wrap items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-semibold">
                  {report.category}
                </span>
                <span className="text-gray-400 font-mono text-[11px]">Block #{report.blockHeight}</span>
                <span className="text-gray-500">• {report.timestamp}</span>
              </div>
              <div className="text-xs font-mono text-emerald-400 break-all pt-1">
                Disclosed Hash: {report.evidenceHash}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="badge-privacy text-xs py-1 px-3">
                <ShieldCheck className="w-3.5 h-3.5" /> Legitimate Employee Proved
              </span>
              <a
                href={`https://explorer.preprod.midnight.network/tx/${report.txHash}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-indigo-400 hover:text-indigo-300 transition"
                title="Explorer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

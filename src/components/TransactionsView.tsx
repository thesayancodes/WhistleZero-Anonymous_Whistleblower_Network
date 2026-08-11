import React from 'react';
import { ArrowLeftRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { ReportTransaction } from '../hooks/useMidnight';

interface TransactionsViewProps {
  recentReports: ReportTransaction[];
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({ recentReports }) => {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="badge-privacy mb-2">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Ledger History</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Transactions Ledger
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Complete record of on-chain transaction commitments submitted to Midnight Preprod.
        </p>
      </div>

      <div className="glass-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Transaction Proof Hash</th>
                <th className="py-3 px-3">Block Height</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Evidence Commitment Hash</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Explorer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentReports.map((tx) => (
                <tr key={tx.txHash} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-3 text-indigo-300">{tx.txHash}</td>
                  <td className="py-3.5 px-3 text-gray-400">#{tx.blockHeight}</td>
                  <td className="py-3.5 px-3 font-sans text-gray-300">{tx.category}</td>
                  <td className="py-3.5 px-3 text-emerald-400 max-w-xs truncate">{tx.evidenceHash}</td>
                  <td className="py-3.5 px-3">
                    <span className="badge-privacy text-[10px] py-0.5 px-2">
                      <ShieldCheck className="w-3 h-3" /> PROVED
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <a
                      href={`https://explorer.preprod.midnight.network/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

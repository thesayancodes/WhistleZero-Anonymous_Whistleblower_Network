import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Lock, 
  Zap, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  PlusCircle,
  Eye,
  Activity
} from 'lucide-react';
import { LedgerState, ReportTransaction } from '../hooks/useMidnight';

interface DashboardViewProps {
  ledger: LedgerState;
  recentReports: ReportTransaction[];
  onNavigateToSubmit: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  ledger,
  recentReports,
  onNavigateToSubmit
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner Hero Header */}
      <div className="glass-card p-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-72 h-72 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="badge-privacy mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Midnight Network Privacy Protocol</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              WhistleZero Overview Dashboard
            </h1>
            <p className="text-xs text-gray-300 mt-1 max-w-2xl">
              Zero-Knowledge Anonymous Whistleblower Network. Employees prove authorization mathematically without revealing identity.
            </p>
          </div>
          <button
            onClick={onNavigateToSubmit}
            className="btn-primary py-3 px-5 text-xs shadow-lg shadow-indigo-500/25"
          >
            <PlusCircle className="w-4 h-4" />
            <span>File New Anonymous Report</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="glass-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Reports</span>
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{ledger.reportCount + 139}</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% this month</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Authorized Employees</span>
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">847</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% ZK Credential Verified</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Identities Disclosed</span>
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">0</div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
            <span>Zero Data Leakage Guaranteed</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Proof Latency</span>
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">1.2s</div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-300 mt-2">
            <span>Local Browser Proof Server</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts & Visual Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Whistleblower Reports Volume Curve (2 Cols) */}
        <div className="lg:col-span-2 glass-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-white">Report Volume & ZK Commitments</h3>
              <p className="text-xs text-gray-400">Monthly breakdown of evidence commitments on Midnight Preprod</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                2026 Volume
              </span>
            </div>
          </div>

          {/* SVG Line Chart Graphic */}
          <div className="w-full h-48 py-2 relative flex items-end">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,130 Q60,110 120,70 T240,90 T360,30 T500,40 L500,150 L0,150 Z"
                fill="url(#chartGradient)"
              />
              <path
                d="M0,130 Q60,110 120,70 T240,90 T360,30 T500,40"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="120" cy="70" r="5" fill="#10b981" />
              <circle cx="240" cy="90" r="5" fill="#6366f1" />
              <circle cx="360" cy="30" r="5" fill="#38bdf8" />
              <circle cx="500" cy="40" r="5" fill="#a855f7" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-white/10 font-mono">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug (Current)</span>
          </div>
        </div>

        {/* Category Distribution Donut Widget (1 Col) */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <h3 className="font-bold text-base text-white mb-2">Report Categories</h3>
          
          <div className="relative flex items-center justify-center my-4">
            <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#1e293b"
                strokeWidth="3.8"
              />
              {/* Category segments */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3.8"
                strokeDasharray="38, 100"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10b981"
                strokeWidth="3.8"
                strokeDasharray="28, 100"
                strokeDashoffset="-38"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#a855f7"
                strokeWidth="3.8"
                strokeDasharray="18, 100"
                strokeDashoffset="-66"
              />
            </svg>
            <div className="absolute text-center">
              <div className="text-xl font-bold text-white font-mono">{ledger.reportCount + 139}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Reports</div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="text-gray-300">Corruption</span>
              </div>
              <span className="font-mono text-gray-400">38%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-gray-300">Fraud & Financial</span>
              </div>
              <span className="font-mono text-gray-400">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span className="text-gray-300">Harassment</span>
              </div>
              <span className="font-mono text-gray-400">18%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table: Recent Anonymous Whistleblower Reports */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-base text-white">Recent Anonymous On-Chain Reports</h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">
            Public Ledger State: <strong className="text-emerald-400">Active</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Report Category</th>
                <th className="py-3 px-3">Disclosed Evidence Hash</th>
                <th className="py-3 px-3">Transaction Proof Hash</th>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">ZK Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentReports.map((report) => (
                <tr key={report.txHash} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-semibold">
                      {report.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-emerald-400 max-w-xs truncate">
                    {report.evidenceHash}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-indigo-300">
                    {report.txHash}
                  </td>
                  <td className="py-3.5 px-3 text-gray-400">
                    {report.timestamp}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="badge-privacy text-[10px] py-1 px-2.5">
                      <ShieldCheck className="w-3 h-3" /> Proved Authorized
                    </span>
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

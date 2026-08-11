import React from 'react';
import { 
  LayoutDashboard, 
  FilePlus, 
  SearchCheck, 
  Activity, 
  BarChart3, 
  ArrowLeftRight, 
  Settings, 
  EyeOff, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Wallet,
  LogOut,
  CheckCircle2
} from 'lucide-react';
import { WalletState } from '../hooks/useMidnight';

export type NavTab = 'dashboard' | 'submit' | 'verify' | 'activity' | 'analytics' | 'transactions' | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  wallet: WalletState;
  onConnect: () => void;
  onDisconnect: () => void;
  reportCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  wallet,
  onConnect,
  onDisconnect,
  reportCount
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'submit', label: 'File Anonymous Report', icon: <FilePlus className="w-4 h-4" />, badge: 'ZK' },
    { id: 'verify', label: 'Verify On-Chain Report', icon: <SearchCheck className="w-4 h-4" /> },
    { id: 'activity', label: 'Activity Feed', icon: <Activity className="w-4 h-4" />, badge: `${reportCount}` },
    { id: 'analytics', label: 'Analytics & Metrics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'transactions', label: 'Transactions Ledger', icon: <ArrowLeftRight className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 bg-[#0c101b]/95 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#0a0d14] rounded-[10px] flex items-center justify-center text-white">
                <EyeOff className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            {!collapsed && (
              <div className="whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base text-white tracking-tight">WhistleZero</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded border border-indigo-500/30">
                    Midnight
                  </span>
                </div>
                <p className="text-[10px] text-gray-400">Zero-Knowledge Network</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className={`${isActive ? 'text-indigo-400' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between whitespace-nowrap">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          isActive
                            ? 'bg-indigo-500/30 text-indigo-200'
                            : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Wallet Connection Panel */}
      <div className="p-3 border-t border-white/10 bg-black/20">
        {!collapsed ? (
          <div>
            {wallet.isConnected && wallet.address ? (
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Lace Connected</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-300 mt-1 truncate">
                    {wallet.address}
                  </div>
                </div>
                <button
                  onClick={onDisconnect}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onConnect}
                disabled={wallet.isConnecting}
                className="w-full btn-primary justify-center py-2.5 text-xs"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>{wallet.isConnecting ? 'Connecting...' : 'Connect Lace Wallet'}</span>
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={wallet.isConnected ? onDisconnect : onConnect}
            className={`w-full p-2.5 rounded-xl flex items-center justify-center transition ${
              wallet.isConnected
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-indigo-600 text-white'
            }`}
            title={wallet.isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
          >
            <Wallet className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};

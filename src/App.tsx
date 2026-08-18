import React, { useState } from 'react';
import { useMidnight } from './hooks/useMidnight';
import { Sidebar, NavTab } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { SubmitReportView } from './components/SubmitReportView';
import { VerifyView } from './components/VerifyView';
import { ActivityView } from './components/ActivityView';
import { AnalyticsView } from './components/AnalyticsView';
import { TransactionsView } from './components/TransactionsView';
import { SettingsView } from './components/SettingsView';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('landing');
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const {
    wallet,
    ledger,
    recentReports,
    connectWallet,
    disconnectWallet,
    submitAnonymousReportCircuit
  } = useMidnight();

  // If on landing page, show the complete animated landing page experience
  if (activeTab === 'landing') {
    return (
      <LandingPage
        wallet={wallet}
        ledger={ledger}
        onLaunchApp={() => setActiveTab('dashboard')}
        onNavigateToSubmit={() => setActiveTab('submit')}
      />
    );
  }

  // Otherwise, show the full dApp Terminal & Protocol Interface
  return (
    <div className="min-h-screen bg-space-950 text-[#E8E9F3] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        wallet={wallet}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        reportCount={ledger.reportCount}
      />

      {/* Top Bar Header */}
      <TopNav
        wallet={wallet}
        collapsed={collapsed}
        onNavigateHome={() => setActiveTab('landing')}
      />

      {/* Main Content Viewport */}
      <main
        className={`flex-1 pt-20 pb-12 px-6 transition-all duration-300 ${
          collapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              ledger={ledger}
              recentReports={recentReports}
              onNavigateToSubmit={() => setActiveTab('submit')}
            />
          )}

          {activeTab === 'submit' && (
            <SubmitReportView
              onCallCircuit={submitAnonymousReportCircuit}
              wallet={wallet}
            />
          )}

          {activeTab === 'verify' && <VerifyView />}

          {activeTab === 'activity' && <ActivityView recentReports={recentReports} />}

          {activeTab === 'analytics' && <AnalyticsView />}

          {activeTab === 'transactions' && <TransactionsView recentReports={recentReports} />}

          {activeTab === 'settings' && <SettingsView />}
        </div>
      </main>
    </div>
  );
};

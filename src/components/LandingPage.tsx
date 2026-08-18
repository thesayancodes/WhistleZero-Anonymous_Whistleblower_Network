import React from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { ProblemSolutionSection } from './ProblemSolutionSection';
import { HowItWorksSection } from './HowItWorksSection';
import { ArchitectureSection } from './ArchitectureSection';
import { InteractiveProofPlayground } from './InteractiveProofPlayground';
import { StatsSection } from './StatsSection';
import { TechStackSection } from './TechStackSection';
import { FooterSection } from './FooterSection';
import { WalletState, LedgerState } from '../hooks/useMidnight';

interface LandingPageProps {
  wallet: WalletState;
  ledger: LedgerState;
  onLaunchApp: () => void;
  onNavigateToSubmit: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  wallet,
  ledger,
  onLaunchApp,
  onNavigateToSubmit
}) => {
  const scrollToPlayground = () => {
    const el = document.getElementById('playground');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-space-950 text-[#E8E9F3] selection:bg-zk/30 selection:text-white relative">
      {/* Top Sticky Frosted Glass Navigation */}
      <Navbar
        wallet={wallet}
        onLaunchApp={onLaunchApp}
        onNavigateToSubmit={onNavigateToSubmit}
      />

      {/* Hero Section with Network Graph Background */}
      <HeroSection
        onFileReport={onNavigateToSubmit}
        onExploreDemo={scrollToPlayground}
        reportCount={ledger.reportCount + 139}
      />

      {/* Problem & Solution Comparison */}
      <ProblemSolutionSection />

      {/* 4-Step Animated How It Works Flow */}
      <HowItWorksSection />

      {/* Cryptographic Architecture & Privacy Data Model */}
      <ArchitectureSection />

      {/* Interactive ZK Proof Playground for Judges */}
      <InteractiveProofPlayground />

      {/* Animated Metrics & Counters on Scroll */}
      <StatsSection reportCount={ledger.reportCount + 139} />

      {/* Tech Stack Badge Showcase */}
      <TechStackSection />

      {/* Final Call to Action & Footer */}
      <FooterSection
        onLaunchApp={onLaunchApp}
        onFileReport={onNavigateToSubmit}
      />
    </div>
  );
};

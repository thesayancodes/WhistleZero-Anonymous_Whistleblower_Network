import React, { useState, useEffect } from 'react';
import { NetworkGraphCanvas } from './NetworkGraphCanvas';
import { 
  ShieldCheck, 
  Lock, 
  FilePlus, 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  Zap, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface HeroSectionProps {
  onFileReport: () => void;
  onExploreDemo: () => void;
  reportCount?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onFileReport,
  onExploreDemo,
  reportCount = 139
}) => {
  // Single-pass typewriter effect for tagline
  const fullTagline = "Prove the truth. Protect the source. Verify without identity.";
  const [displayedTagline, setDisplayedTagline] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayedTagline(fullTagline);
      setTypingDone(true);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullTagline.length) {
        setDisplayedTagline(fullTagline.slice(0, currentIndex));
        currentIndex++;
      } else {
        setTypingDone(true);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Interactive Mesh Network Graph */}
      <NetworkGraphCanvas nodeCount={45} />

      {/* Atmospheric Aurora Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-zk/20 via-cyber/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-whistle/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Protocol Security Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zk/10 border border-zk/30 backdrop-blur-md text-xs font-semibold text-zk-glow mb-6 animate-float shadow-lg shadow-zk/10">
          <span className="w-2 h-2 rounded-full bg-cyber animate-ping" />
          <span className="text-[#E8E9F3]">Zero-Knowledge Whistleblower Protocol</span>
          <span className="text-[#8A8FA3]">|</span>
          <span className="text-cyber">Midnight Compact Smart Contracts</span>
        </div>

        {/* Staggered Stately Main Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] max-w-4xl">
          <span className="block text-[#E8E9F3]">Speak truth to power.</span>
          <span className="bg-gradient-to-r from-zk-glow via-cyber to-whistle bg-clip-text text-transparent">
            Leave zero cryptographic trail.
          </span>
        </h1>

        {/* Subhead with Single-Pass Typewriter Effect */}
        <div className="min-h-[3.2rem] mt-6 flex items-center justify-center">
          <p className="text-base sm:text-xl font-mono text-[#8A8FA3] max-w-2xl text-center">
            <span className="text-[#E8E9F3]">{displayedTagline}</span>
            {!typingDone && <span className="inline-block w-2 h-4 ml-1 bg-cyber animate-pulse" />}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-[#8A8FA3] max-w-2xl mt-2 leading-relaxed">
          WhistleZero allows employees to prove organization credential validity mathematically using local ZK proofs. Evidence commitments are verified on Midnight's public ledger with <strong>0% identity disclosure</strong>.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onFileReport}
            className="btn-whistle text-sm py-3.5 px-7 shadow-xl shadow-whistle/25 flex items-center gap-3"
          >
            <FilePlus className="w-4 h-4" />
            <span>File Anonymous Report</span>
            <ArrowRight className="w-4 h-4 text-space-950" />
          </button>

          <button
            onClick={onExploreDemo}
            className="btn-secondary text-sm py-3.5 px-6 flex items-center gap-2.5"
          >
            <Terminal className="w-4 h-4 text-cyber" />
            <span>Test ZK Circuit Demo</span>
          </button>
        </div>

        {/* Real-time Proof Guarantee Cards */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-4xl text-left">
          <div className="glass-card p-3.5 border-white/10 hover:border-zk/40">
            <div className="flex items-center gap-2 text-zk-glow text-xs font-semibold mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>0 Wallet Leaks</span>
            </div>
            <div className="text-[11px] text-[#8A8FA3]">
              No signer address on public ledger
            </div>
          </div>

          <div className="glass-card p-3.5 border-white/10 hover:border-cyber/40">
            <div className="flex items-center gap-2 text-cyber text-xs font-semibold mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>&lt; 1.5s Proofs</span>
            </div>
            <div className="text-[11px] text-[#8A8FA3]">
              Compiled Compact ZK prover
            </div>
          </div>

          <div className="glass-card p-3.5 border-white/10 hover:border-emerald-400/40">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Authorized</span>
            </div>
            <div className="text-[11px] text-[#8A8FA3]">
              Credential membership proven
            </div>
          </div>

          <div className="glass-card p-3.5 border-white/10 hover:border-whistle/40">
            <div className="flex items-center gap-2 text-whistle text-xs font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{reportCount} Committed</span>
            </div>
            <div className="text-[11px] text-[#8A8FA3]">
              Immutable SHA-256 evidence
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#problem"
          className="mt-12 text-[#8A8FA3] hover:text-white transition flex flex-col items-center gap-1 text-[11px] font-mono opacity-80 hover:opacity-100"
          aria-label="Scroll to Problem section"
        >
          <span>EXPLORE PROTOCOL</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-zk-glow" />
        </a>
      </div>
    </section>
  );
};

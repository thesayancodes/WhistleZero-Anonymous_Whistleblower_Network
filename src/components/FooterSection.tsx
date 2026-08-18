import React from 'react';
import { Logo } from './Logo';
import { 
  FilePlus, 
  Github, 
  ExternalLink, 
  ShieldCheck, 
  Heart, 
  Terminal, 
  LayoutDashboard,
  CheckSquare
} from 'lucide-react';

interface FooterSectionProps {
  onLaunchApp: () => void;
  onFileReport: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onLaunchApp,
  onFileReport
}) => {
  return (
    <footer className="relative bg-space-950 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-zk/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Glowing Bottom Call to Action Card */}
        <div className="glass-card p-8 sm:p-12 mb-16 border-zk/30 bg-gradient-to-r from-space-900 via-zk-dark/20 to-space-900 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-whistle/15 border border-whistle/30 text-whistle text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ready for Mainnet & Audits</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Ready to report safely without fear of retaliation?
            </h2>

            <p className="text-sm text-[#8A8FA3] max-w-xl mx-auto">
              Submit your anonymous evidence on the Midnight Network. Zero identities exposed. 100% cryptographic authorization.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onFileReport}
                className="btn-whistle text-sm py-3 px-6 shadow-xl shadow-whistle/25"
              >
                <FilePlus className="w-4 h-4" />
                <span>File Anonymous Report</span>
              </button>

              <button
                onClick={onLaunchApp}
                className="btn-primary text-sm py-3 px-6"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Open Protocol DApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Judge Quick Checklist Banner */}
        <div className="glass-panel p-5 mb-12 border-cyber/20 bg-space-900 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyber/15 text-cyber">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-white">
                Hackathon Judge Quick Checklist
              </h4>
              <p className="text-[11px] text-[#8A8FA3]">
                Compact smart contract in <code className="text-cyber">contracts/counter.compact</code> • Vitest test suite in <code className="text-zk-glow">tests/counter.test.ts</code>
              </p>
            </div>
          </div>

          <a
            href="https://github.com/thesayancodes/WhistleZero-Anonymous_Whistleblower_Network#readme"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5"
          >
            <span>Read 60s Judge Guide</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Bottom Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/5">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <Logo size="md" />
            <p className="text-xs text-[#8A8FA3] max-w-sm leading-relaxed mt-2">
              WhistleZero is an anonymous whistleblower network on Midnight Network, built with Zero-Knowledge proofs and Compact smart contracts to protect sources and eliminate retaliation.
            </p>
          </div>

          {/* Protocol Links */}
          <div className="space-y-2">
            <h5 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
              Protocol
            </h5>
            <ul className="space-y-1.5 text-xs text-[#8A8FA3]">
              <li><a href="#problem" className="hover:text-zk-glow transition">Problem & Shield</a></li>
              <li><a href="#how-it-works" className="hover:text-zk-glow transition">How It Works</a></li>
              <li><a href="#architecture" className="hover:text-zk-glow transition">Architecture</a></li>
              <li><a href="#playground" className="hover:text-zk-glow transition">Live ZK Demo</a></li>
            </ul>
          </div>

          {/* Resources & Ecosystem */}
          <div className="space-y-2">
            <h5 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
              Ecosystem
            </h5>
            <ul className="space-y-1.5 text-xs text-[#8A8FA3]">
              <li>
                <a
                  href="https://midnight.network"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyber transition flex items-center gap-1"
                >
                  <span>Midnight Network</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://docs.midnight.network"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyber transition flex items-center gap-1"
                >
                  <span>Compact Docs</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/thesayancodes/WhistleZero-Anonymous_Whistleblower_Network"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyber transition flex items-center gap-1"
                >
                  <span>GitHub Source</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="mt-8 flex flex-wrap items-center justify-between text-xs text-[#8A8FA3] gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 WhistleZero Network. MIT Licensed.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Proof Server: <strong className="text-white">Active</strong></span>
            <span>Network: <strong className="text-cyber">Midnight Preprod</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

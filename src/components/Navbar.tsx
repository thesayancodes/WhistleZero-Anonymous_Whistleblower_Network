import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { 
  ShieldCheck, 
  PlusCircle, 
  ExternalLink, 
  Github, 
  Menu, 
  X, 
  Cpu, 
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { WalletState } from '../hooks/useMidnight';

interface NavbarProps {
  wallet?: WalletState;
  onLaunchApp: () => void;
  onNavigateToSubmit: () => void;
  isAppMode?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  wallet,
  onLaunchApp,
  onNavigateToSubmit,
  isAppMode = false
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Problem & Shield', href: '#problem' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Live ZK Demo', href: '#playground' },
    { label: 'Tech Stack', href: '#tech-stack' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05060F]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-zk rounded-lg">
          <Logo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#8A8FA3]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors duration-200 hover:text-zk-glow"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls & Network Status */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Midnight Status Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zk/10 border border-zk/25 text-xs text-zk-light font-mono">
            <span className="w-2 h-2 rounded-full bg-cyber animate-ping" />
            <span>Midnight Preprod</span>
          </div>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/thesayancodes/WhistleZero-Anonymous_Whistleblower_Network"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#8A8FA3] hover:text-white border border-white/10 transition"
            title="View Source on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Primary Action Button */}
          <button
            onClick={onLaunchApp}
            className="btn-whistle text-xs py-2.5 px-4.5"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Launch Protocol App</span>
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onLaunchApp}
            className="btn-whistle text-xs py-2 px-3"
          >
            <span>Launch App</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0E1A]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-5 mt-3 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zk/10 border border-zk/20 text-xs text-zk-light font-mono mb-3">
            <span className="w-2 h-2 rounded-full bg-cyber animate-ping" />
            <span>Midnight Network Preprod</span>
          </div>

          <div className="flex flex-col space-y-3 text-sm font-medium text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-zk-glow transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
            <a
              href="https://github.com/thesayancodes/WhistleZero-Anonymous_Whistleblower_Network"
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 text-xs text-gray-300 border border-white/10"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLaunchApp();
              }}
              className="flex-1 btn-whistle justify-center py-2.5 text-xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Launch App</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

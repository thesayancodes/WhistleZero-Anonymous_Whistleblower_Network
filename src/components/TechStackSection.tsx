import React from 'react';
import { 
  Cpu, 
  Code2, 
  ShieldCheck, 
  Layers, 
  Boxes, 
  Terminal, 
  Globe, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const techStack = [
    {
      name: 'Midnight Network',
      category: 'Privacy Blockchain',
      desc: 'Native zero-knowledge data protection layer built for scalable, regulatory-friendly confidential smart contracts.',
      icon: <Globe className="w-5 h-5 text-zk-glow" />,
      tag: 'Preprod Testnet',
      link: 'https://midnight.network'
    },
    {
      name: 'Compact Language',
      category: 'ZK Smart Contracts',
      desc: 'Domain-specific smart contract language that automatically compiles application logic into Zero-Knowledge circuits.',
      icon: <Code2 className="w-5 h-5 text-cyber" />,
      tag: 'v0.16 Runtime',
      link: 'https://docs.midnight.network'
    },
    {
      name: 'Zero-Knowledge SNARKs',
      category: 'Cryptographic Proofs',
      desc: 'Proves employee credential validity against organization roots without disclosing secret keys or sender addresses.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      tag: 'Local Prover',
      link: 'https://midnight.network'
    },
    {
      name: 'React 18 & TypeScript',
      category: 'Frontend UI',
      desc: 'High-performance reactive frontend with end-to-end cryptographic state management and type safety.',
      icon: <Boxes className="w-5 h-5 text-zk-light" />,
      tag: 'Vite Bundler',
      link: 'https://react.dev'
    },
    {
      name: 'Midnight.js DApp SDK',
      category: 'Connector API',
      desc: 'Connects React browser UI with Lace Wallet and the local Midnight proving engine.',
      icon: <Layers className="w-5 h-5 text-whistle" />,
      tag: 'DApp Connector',
      link: 'https://docs.midnight.network'
    },
    {
      name: 'Docker Proof Server',
      category: 'Local Prover Daemon',
      desc: 'Runs the Midnight proving engine locally on localhost:6300, guaranteeing no sensitive data leaves the device.',
      icon: <Terminal className="w-5 h-5 text-cyber" />,
      tag: 'Local Proving',
      link: 'https://docs.midnight.network'
    }
  ];

  return (
    <section id="tech-stack" className="py-20 bg-[#0B0E1A]/60 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zk/10 border border-zk/30 text-zk-glow text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Built For Hackathon Judges</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Powered by Midnight & Compact
          </h2>
          <p className="text-sm sm:text-base text-[#8A8FA3] mt-3">
            A production-ready zero-knowledge architecture combining next-gen cryptography with bulletproof developer ergonomics.
          </p>
        </div>

        {/* Tech Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="glass-card p-6 border-white/10 hover:border-zk/40 flex flex-col justify-between group transition-all duration-300 hover:scale-[1.02]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 group-hover:border-zk/40 group-hover:bg-zk/10 transition">
                    {tech.icon}
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/5 text-cyber border border-cyber/20">
                    {tech.tag}
                  </span>
                </div>

                <span className="text-[10px] uppercase font-mono tracking-wider text-[#8A8FA3]">
                  {tech.category}
                </span>
                <h3 className="font-heading font-bold text-base text-white mt-0.5 group-hover:text-zk-glow transition">
                  {tech.name}
                </h3>
                <p className="text-xs text-[#8A8FA3] mt-2 leading-relaxed">
                  {tech.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                <a
                  href={tech.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#8A8FA3] hover:text-white flex items-center gap-1.5 transition font-medium"
                >
                  <span>Documentation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-[10px] font-mono text-emerald-400">Verified Ready</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

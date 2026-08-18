import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Lock, Zap, FileCheck2, TrendingUp } from 'lucide-react';

interface StatsSectionProps {
  reportCount?: number;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ reportCount = 139 }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const [counter1, setCounter1] = useState(0); // 0 identities exposed
  const [counter2, setCounter2] = useState(0); // 100% anonymous
  const [counter3, setCounter3] = useState(0); // 1.2s latency
  const [counter4, setCounter4] = useState(0); // Total reports

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCounter1(0);
      setCounter2(100);
      setCounter3(1.2);
      setCounter4(reportCount);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate Counter 2 (0 -> 100)
          let start2 = 0;
          const timer2 = setInterval(() => {
            start2 += 2;
            if (start2 >= 100) {
              setCounter2(100);
              clearInterval(timer2);
            } else {
              setCounter2(start2);
            }
          }, 20);

          // Animate Counter 3 (0.0 -> 1.2)
          let start3 = 0.0;
          const timer3 = setInterval(() => {
            start3 += 0.1;
            if (start3 >= 1.2) {
              setCounter3(1.2);
              clearInterval(timer3);
            } else {
              setCounter3(parseFloat(start3.toFixed(1)));
            }
          }, 80);

          // Animate Counter 4 (0 -> reportCount)
          let start4 = 0;
          const step4 = Math.ceil(reportCount / 40);
          const timer4 = setInterval(() => {
            start4 += step4;
            if (start4 >= reportCount) {
              setCounter4(reportCount);
              clearInterval(timer4);
            } else {
              setCounter4(start4);
            }
          }, 30);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, reportCount]);

  const stats = [
    {
      label: 'Identities Disclosed',
      value: `${counter1}`,
      suffix: '',
      highlight: 'text-emerald-400',
      badge: 'Zero-Leakage Guaranteed',
      icon: <Lock className="w-5 h-5 text-emerald-400" />,
      subtext: 'No sender public key on-chain'
    },
    {
      label: 'Cryptographic Anonymity',
      value: `${counter2}`,
      suffix: '%',
      highlight: 'text-cyber',
      badge: 'Mathematically Enforced',
      icon: <ShieldCheck className="w-5 h-5 text-cyber" />,
      subtext: 'Compact R1CS membership proofs'
    },
    {
      label: 'Proof Generation Time',
      value: `${counter3}`,
      suffix: 's',
      highlight: 'text-zk-glow',
      badge: 'Local Client Prover',
      icon: <Zap className="w-5 h-5 text-zk-glow" />,
      subtext: 'Direct in-browser Docker prover'
    },
    {
      label: 'Evidence Commitments',
      value: `${counter4}`,
      suffix: '+',
      highlight: 'text-whistle',
      badge: 'Midnight Preprod Testnet',
      icon: <FileCheck2 className="w-5 h-5 text-whistle" />,
      subtext: 'SHA-256 tamper-proof ledger'
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card p-6 border-white/10 hover:border-zk/30 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 group-hover:border-zk/30 transition">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/5 text-gray-300">
                    {stat.badge}
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className={`font-heading font-extrabold text-4xl sm:text-5xl font-mono ${stat.highlight}`}>
                    {stat.value}
                  </span>
                  <span className={`font-heading font-bold text-2xl ${stat.highlight}`}>
                    {stat.suffix}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-sm text-white mt-2">
                  {stat.label}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-xs text-[#8A8FA3]">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

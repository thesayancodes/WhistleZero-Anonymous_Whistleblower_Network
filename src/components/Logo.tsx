import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  pulse?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  pulse = true,
  className = ''
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-sm', badge: 'text-[9px]' },
    md: { icon: 38, text: 'text-lg', badge: 'text-[10px]' },
    lg: { icon: 52, text: 'text-2xl', badge: 'text-xs' },
    xl: { icon: 72, text: 'text-3xl', badge: 'text-sm' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon with Signal Radar Waves */}
      <div className="relative flex items-center justify-center">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible animate-slow-glow"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="shieldGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#6D28D9" />
              <stop offset="100%" stopColor="#0B0E1A" />
            </linearGradient>

            <linearGradient id="borderGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="40%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>

            <radialGradient id="eyeCenterGlow" cx="50" cy="50" r="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#05060F" stopOpacity="0" />
            </radialGradient>

            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Sonar Radar Pulse Waves (Outward Signals) */}
          {pulse && (
            <>
              <circle
                cx="50"
                cy="50"
                r="20"
                stroke="#22D3EE"
                strokeOpacity="0.5"
                fill="none"
                className="animate-radar-wave-1 pointer-events-none"
              />
              <circle
                cx="50"
                cy="50"
                r="20"
                stroke="#8B5CF6"
                strokeOpacity="0.4"
                fill="none"
                className="animate-radar-wave-2 pointer-events-none"
              />
            </>
          )}

          {/* Outer Stylized Protective Shield */}
          <path
            d="M50 8L82 22C82 54 68 78 50 92C32 78 18 54 18 22L50 8Z"
            fill="url(#shieldGrad)"
            stroke="url(#borderGrad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
            filter="url(#logoGlow)"
          />

          {/* Inner Geometric Zero / Cryptographic Vault Ring */}
          <ellipse
            cx="50"
            cy="48"
            rx="20"
            ry="24"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            opacity="0.85"
          />

          {/* Cryptographic Eye / Signal Core */}
          <circle
            cx="50"
            cy="48"
            r="12"
            fill="url(#eyeCenterGlow)"
          />
          <circle
            cx="50"
            cy="48"
            r="5"
            fill="#E8E9F3"
          />
          <circle
            cx="52"
            cy="46"
            r="1.8"
            fill="#FFFFFF"
          />

          {/* Whistle Signal Wave Crest (Warm Amber Accent) */}
          <path
            d="M36 34C40 30 45 28 50 28C55 28 60 30 64 34"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M41 40C44 37 47 36 50 36C53 36 56 37 59 40"
            stroke="#FBBF24"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`font-heading font-extrabold ${currentSize.text} tracking-tight text-white flex items-center`}>
              Whistle<span className="text-zk-glow">Zero</span>
            </span>
            <span className={`font-mono font-semibold uppercase tracking-wider bg-zk/20 text-zk-glow border border-zk/30 px-1.5 py-0.5 rounded ${currentSize.badge}`}>
              Midnight ZK
            </span>
          </div>
          {size !== 'sm' && (
            <span className="text-[11px] text-[#8A8FA3] tracking-wide font-sans -mt-0.5">
              Anonymous Whistleblower Network
            </span>
          )}
        </div>
      )}
    </div>
  );
};

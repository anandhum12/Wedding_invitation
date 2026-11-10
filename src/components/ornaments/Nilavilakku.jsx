import { memo } from 'react';
import { useSvgId } from './svgId';

const FLAMES = [40, 70, 100, 130, 160];

/** Traditional Kerala brass lamp with five flickering wicks. */
function Nilavilakku({ className = 'w-28' }) {
  const brass = useSvgId('brass');
  const rim = useSvgId('rim');
  const flame = useSvgId('flame');
  const glow = useSvgId('glow');

  return (
    <svg viewBox="0 0 200 420" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={brass} x1="0" x2="1">
          <stop offset="0" stopColor="#6B4B14" />
          <stop offset="0.3" stopColor="#C9A04A" />
          <stop offset="0.5" stopColor="#F6E3A1" />
          <stop offset="0.7" stopColor="#C4963D" />
          <stop offset="1" stopColor="#5E410F" />
        </linearGradient>
        <linearGradient id={rim} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#F8E7B0" />
          <stop offset="1" stopColor="#A87F2C" />
        </linearGradient>
        <radialGradient id={flame} cx="0.5" cy="0.75" r="0.75">
          <stop offset="0" stopColor="#FFFBE6" />
          <stop offset="0.35" stopColor="#FFD86B" />
          <stop offset="0.75" stopColor="#F59A2C" />
          <stop offset="1" stopColor="#D9541A" stopOpacity="0.85" />
        </radialGradient>
        <radialGradient id={glow}>
          <stop offset="0" stopColor="#FFD77A" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFD77A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="100" cy="66" rx="98" ry="64" fill={`url(#${glow})`} className="animate-glow" style={{ transformOrigin: '100px 66px' }} />

      {/* finial */}
      <path d="M100 6 C 91 20, 91 34, 100 42 C 109 34, 109 20, 100 6 Z" fill={`url(#${brass})`} />
      <circle cx="100" cy="47" r="6" fill={`url(#${brass})`} />
      <rect x="96" y="52" width="8" height="30" fill={`url(#${brass})`} />

      {/* top dish */}
      <path d="M30 90 Q 100 102 170 90 L 158 106 Q 100 124 42 106 Z" fill={`url(#${brass})`} />
      <ellipse cx="100" cy="90" rx="70" ry="8" fill={`url(#${rim})`} />
      <ellipse cx="100" cy="124" rx="15" ry="6" fill={`url(#${brass})`} />

      {/* stem */}
      <rect x="92" y="124" width="16" height="192" fill={`url(#${brass})`} />
      {[152, 186, 278, 300].map((y) => (
        <ellipse key={y} cx="100" cy={y} rx="14" ry="5" fill={`url(#${brass})`} />
      ))}
      <path d="M92 206 C 76 216, 76 246, 92 256 H 108 C 124 246, 124 216, 108 206 Z" fill={`url(#${brass})`} />

      {/* lower dish */}
      <path d="M54 318 Q 100 338 146 318 L 140 330 Q 100 346 60 330 Z" fill={`url(#${brass})`} />
      <ellipse cx="100" cy="318" rx="46" ry="7" fill={`url(#${rim})`} />

      {/* base */}
      <rect x="94" y="334" width="12" height="32" fill={`url(#${brass})`} />
      <path d="M60 382 C 70 364, 130 364, 140 382 Z" fill={`url(#${brass})`} />
      <path d="M44 400 C 52 381, 148 381, 156 400 Z" fill={`url(#${brass})`} />
      <rect x="36" y="400" width="128" height="10" rx="3" fill={`url(#${brass})`} />

      {/* flames */}
      {FLAMES.map((x, i) => (
        <g key={x} transform={`translate(${x} ${i === 0 || i === 4 ? 90 : 93})`}>
          <path
            d="M0 0 C -7 -8, -6 -21, 0 -36 C 6 -21, 7 -8, 0 0 Z"
            fill={`url(#${flame})`}
            className="animate-flicker"
            style={{ animationDelay: `${i * 0.27}s`, animationDuration: `${1.3 + (i % 3) * 0.3}s` }}
          />
          <path d="M0 -2 C -2.5 -6, -2 -12, 0 -16 C 2 -12, 2.5 -6, 0 -2 Z" fill="#FFFDF0" opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

export default memo(Nilavilakku);

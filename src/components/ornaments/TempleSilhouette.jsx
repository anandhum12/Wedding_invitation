import { memo } from 'react';

function Palm({ x, flip = false, scale = 1 }) {
  return (
    <g transform={`translate(${x} 220) scale(${flip ? -scale : scale} ${scale})`} fill="none" stroke="currentColor" strokeLinecap="round">
      <path d="M0 0 C 4 -50, -4 -100, 12 -140" strokeWidth="6" />
      <g transform="translate(12 -140)" strokeWidth="3.2">
        <path d="M0 0 C -22 -10, -44 -4, -60 14" />
        <path d="M0 0 C -18 -24, -40 -28, -58 -20" />
        <path d="M0 0 C 0 -26, 12 -40, 26 -44" />
        <path d="M0 0 C 20 -18, 44 -16, 62 -2" />
        <path d="M0 0 C 24 -2, 44 10, 54 28" />
        <path d="M0 0 C -10 14, -16 30, -14 44" />
      </g>
    </g>
  );
}

/** Kerala temple (sloped tiled roofs + mukhappu gable), flag mast and coconut palms. */
function TempleSilhouette({ className = '' }) {
  return (
    <svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMax meet" className={className} fill="currentColor" aria-hidden="true">
      <Palm x={46} scale={1.05} />
      <Palm x={112} flip scale={0.8} />
      <Palm x={540} flip scale={1.1} />

      <rect x="170" y="196" width="260" height="24" />
      <rect x="160" y="210" width="280" height="10" />
      <rect x="202" y="146" width="196" height="50" />
      <path d="M148 152 Q 164 148 174 140 L 226 100 H 374 L 426 140 Q 436 148 452 152 Q 300 140 148 152 Z" />
      <rect x="236" y="78" width="128" height="22" />
      <path d="M204 84 Q 214 82 222 76 L 256 46 H 344 L 378 76 Q 386 82 396 84 Q 300 76 204 84 Z" />
      <path d="M268 48 L 300 18 L 332 48 Z" />
      <rect x="296" y="6" width="8" height="14" />
      <circle cx="300" cy="5" r="5" />

      {/* dhwajasthambam */}
      <rect x="470" y="62" width="6" height="150" />
      {[78, 98, 118, 138].map((y) => (
        <rect key={y} x="464" y={y} width="18" height="3" />
      ))}
      <path d="M466 62 L 473 44 L 480 62 Z" />
      <rect x="456" y="206" width="34" height="14" />
    </svg>
  );
}

export default memo(TempleSilhouette);

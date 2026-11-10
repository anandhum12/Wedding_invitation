import { memo } from 'react';

/** Hanging strands of jasmine buds with kanakambaram accents and gold tassels. */
function Strand({ length, delay }) {
  const buds = Math.floor(length / 13);
  const h = buds * 13 + 34;
  return (
    <svg viewBox={`0 0 20 ${h}`} width="20" height={h} className="animate-sway shrink-0" style={{ animationDelay: `${delay}s` }} aria-hidden="true">
      <line x1="10" y1="0" x2="10" y2={buds * 13 + 6} stroke="#D9B964" strokeWidth="0.8" opacity="0.7" />
      {Array.from({ length: buds }, (_, i) => {
        const y = 8 + i * 13;
        const accent = i % 6 === 5;
        return accent ? (
          <circle key={i} cx="10" cy={y} r="3.6" fill="#E9893A" stroke="#B8611F" strokeWidth="0.5" />
        ) : (
          <ellipse key={i} cx="10" cy={y} rx="3.4" ry="5.6" fill="#FFFDF5" stroke="#E4D6B2" strokeWidth="0.6" />
        );
      })}
      <g transform={`translate(10 ${buds * 13 + 8})`}>
        <circle r="3" fill="#D9B964" />
        <path d="M-3 2 L 0 22 L 3 2 Z" fill="#B08D3C" />
      </g>
    </svg>
  );
}

function JasmineGarland({ count = 14, className = '' }) {
  const strands = Array.from({ length: count }, (_, i) => {
    const centre = Math.abs(i - (count - 1) / 2) / ((count - 1) / 2);
    return { length: 60 + centre * 90 + (i % 3) * 14, delay: (i % 5) * 0.4 };
  });
  return (
    <div className={`pointer-events-none flex justify-between ${className}`} aria-hidden="true">
      {strands.map((s, i) => (
        <Strand key={i} {...s} />
      ))}
    </div>
  );
}

export default memo(JasmineGarland);

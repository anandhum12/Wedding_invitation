import { memo } from 'react';

const ring = (n) => Array.from({ length: n }, (_, i) => (i * 360) / n);

/** Temple-inspired lotus mandala, pure line work. Colour via currentColor. */
function Mandala({ className = '' }) {
  return (
    <svg viewBox="-100 -100 200 200" fill="none" stroke="currentColor" strokeWidth="0.45" className={className} aria-hidden="true">
      <circle r="98" />
      <circle r="95" strokeDasharray="1 2.2" />
      <circle r="61" />
      <circle r="31" />
      <circle r="12" />
      {ring(12).map((a) => (
        <g key={`a${a}`} transform={`rotate(${a})`}>
          <path d="M0 -61 C 15 -72, 15 -88, 0 -95 C -15 -88, -15 -72, 0 -61 Z" />
          <path d="M0 -65 C 8 -73, 8 -84, 0 -90 C -8 -84, -8 -73, 0 -65 Z" />
          <circle cy="-78" r="1.4" fill="currentColor" />
        </g>
      ))}
      {ring(12).map((a) => (
        <g key={`b${a}`} transform={`rotate(${a + 15})`}>
          <path d="M0 -61 C 4 -70, 4 -78, 0 -84 C -4 -78, -4 -70, 0 -61 Z" />
        </g>
      ))}
      {ring(24).map((a) => (
        <path key={`c${a}`} transform={`rotate(${a})`} d="M0 -31 C 7 -39, 7 -51, 0 -59 C -7 -51, -7 -39, 0 -31 Z" />
      ))}
      {ring(16).map((a) => (
        <path key={`d${a}`} transform={`rotate(${a})`} d="M0 -12 C 4 -17, 4 -24, 0 -29 C -4 -24, -4 -17, 0 -12 Z" />
      ))}
      {ring(48).map((a) => (
        <circle key={`e${a}`} transform={`rotate(${a})`} cy="-63.5" r="0.8" fill="currentColor" />
      ))}
      <circle r="5" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

export default memo(Mandala);

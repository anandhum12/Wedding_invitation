import { useSvgId } from './svgId';

/** Mural-inspired repeating border band (lotus buds and diamonds in maroon, green and gold). */
export default function KeralaBand({ className = '' }) {
  const id = useSvgId('band');
  return (
    <svg className={`block h-7 w-full ${className}`} aria-hidden="true">
      <defs>
        <pattern id={id} width="56" height="28" patternUnits="userSpaceOnUse">
          <line x1="0" y1="2" x2="56" y2="2" stroke="#B08D3C" strokeWidth="1" />
          <line x1="0" y1="26" x2="56" y2="26" stroke="#B08D3C" strokeWidth="1" />
          <path d="M28 6 L 36 14 L 28 22 L 20 14 Z" fill="#1F3A2B" stroke="#B08D3C" strokeWidth="0.8" />
          <circle cx="28" cy="14" r="2" fill="#D9B964" />
          <path d="M0 22 C -6 16, -4 9, 0 6 C 4 9, 6 16, 0 22 Z" fill="#7A1F24" />
          <path d="M56 22 C 50 16, 52 9, 56 6 C 60 9, 62 16, 56 22 Z" fill="#7A1F24" />
          <circle cx="10" cy="14" r="1.4" fill="#B08D3C" />
          <circle cx="46" cy="14" r="1.4" fill="#B08D3C" />
        </pattern>
      </defs>
      <rect width="100%" height="28" fill={`url(#${id})`} />
    </svg>
  );
}

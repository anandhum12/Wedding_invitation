const PETAL = 'M50 42 C 42 30, 44 14, 50 4 C 56 14, 58 30, 50 42 Z';

export default function Lotus({ className = 'w-16' }) {
  return (
    <svg viewBox="0 0 100 52" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} aria-hidden="true">
      {[-56, -28, 28, 56].map((a) => (
        <path key={a} d={PETAL} transform={`rotate(${a} 50 42)`} opacity={Math.abs(a) > 30 ? 0.75 : 1} />
      ))}
      <path d={PETAL} fill="currentColor" fillOpacity="0.15" />
      <path d="M14 44 Q 50 56 86 44" />
      <path d="M24 49 Q 50 58 76 49" opacity="0.6" />
    </svg>
  );
}

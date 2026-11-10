/** ॐ inside a sun-rayed double ring (after page 1 of the printed card). */
export default function OmMedallion({ className = 'w-28', glow = false, textClass = 'text-gold' }) {
  const rays = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <div className={`relative aspect-square ${className}`} style={{ containerType: 'inline-size' }}>
      {glow && <div className="animate-glow absolute inset-[12%] rounded-full bg-gold-light/40 blur-2xl" />}
      <svg viewBox="-60 -60 120 120" className="absolute inset-0 h-full w-full text-current" fill="none" stroke="currentColor" aria-hidden="true">
        <circle r="35" strokeWidth="1.3" />
        <circle r="31" strokeWidth="0.6" />
        {rays.map((a, i) => (
          <line key={a} transform={`rotate(${a})`} y1={-41} y2={i % 2 ? -46 : -50} strokeWidth="0.9" strokeLinecap="round" />
        ))}
      </svg>
      <span
        role="img"
        aria-label="Om"
        className={`absolute inset-0 flex items-center justify-center font-deva leading-none ${textClass} ${glow ? 'text-shadow-glow' : ''}`}
        style={{ fontSize: '36cqw', paddingTop: '4cqw' }}
      >
        ॐ
      </span>
    </div>
  );
}

const PETAL = 'M0 0 C 3.4 -3, 3.6 -8, 0 -10.5 C -3.6 -8, -3.4 -3, 0 0 Z';

/** Five-petal mullappoo (jasmine) blossom. */
export default function Jasmine({ className = 'w-4', style }) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} style={style} aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d={PETAL} transform={`rotate(${a})`} fill="#FFFDF7" stroke="#E2D3AE" strokeWidth="0.6" />
      ))}
      <circle r="1.8" fill="#E9CF7E" />
    </svg>
  );
}

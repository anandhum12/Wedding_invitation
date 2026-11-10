import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import Jasmine from '../ornaments/Jasmine';

/** Slowly falling jasmine blossoms — pure CSS animation, GPU-friendly. */
export default function FallingPetals({ count, className = 'fixed inset-0 z-20' }) {
  const reduce = useReducedMotion();
  const petals = useMemo(() => {
    const n = count ?? (typeof window !== 'undefined' && window.innerWidth < 640 ? 6 : 11);
    return Array.from({ length: n }, (_, i) => ({
      left: `${(i / n) * 100 + Math.random() * (100 / n)}%`,
      size: 10 + Math.random() * 9,
      duration: 16 + Math.random() * 14,
      delay: -Math.random() * 30,
      sway: 3.5 + Math.random() * 3,
      drift: `${(Math.random() - 0.5) * 160}px`,
      opacity: 0.55 + Math.random() * 0.35,
    }));
  }, [count]);

  if (reduce) return null;

  return (
    <div className={`pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute -top-8 block will-change-transform"
          style={{ left: p.left, '--drift': p.drift, animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`, opacity: p.opacity }}
        >
          <span className="block" style={{ animation: `petal-sway ${p.sway}s ease-in-out infinite` }}>
            <Jasmine style={{ width: p.size, height: p.size, filter: 'drop-shadow(0 2px 3px rgba(107,80,23,0.25))' }} />
          </span>
        </span>
      ))}
    </div>
  );
}

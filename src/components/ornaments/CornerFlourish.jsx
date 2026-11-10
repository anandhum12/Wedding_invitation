import { motion } from 'framer-motion';

const LEAF = 'M0 0 C 5 -7, 17 -7, 22 0 C 17 7, 5 7, 0 0 Z';
const leaves = [
  [15, 100, -112],
  [22, 74, -32],
  [38, 50, -78],
  [60, 31, -8],
  [90, 19, -48],
];
const strokes = [
  'M14 130 C 12 80, 40 30, 128 14',
  'M27 124 C 30 86, 56 48, 122 29',
  'M14 130 C 5 132, 1 123, 8 119 C 12 116, 18 120, 14 125',
  'M128 14 C 132 5, 123 1, 119 8 C 116 12, 120 18, 125 14',
  'M34 78 C 46 70, 56 76, 51 84 C 48 89, 42 86, 44 81',
  'M74 28 C 80 16, 92 18, 89 27 C 87 32, 81 31, 82 26',
];

/**
 * Kerala-style corner scroll with leaves. Drawn for the top-left corner;
 * flip with CSS transforms for the other corners.
 * trigger: 'view' → draws when scrolled into view, 'mount' → draws immediately.
 */
export default function CornerFlourish({ className = '', trigger = 'view', delay = 0 }) {
  const draw =
    trigger === 'view'
      ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.3 } }
      : { initial: 'hidden', animate: 'show' };

  const path = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.8, delay: delay + i * 0.15, ease: 'easeInOut' }, opacity: { duration: 0.3, delay: delay + i * 0.15 } },
    }),
  };
  const fade = {
    hidden: { opacity: 0, scale: 0.4 },
    show: (i) => ({ opacity: 1, scale: 1, transition: { duration: 0.6, delay: delay + 0.9 + i * 0.12 } }),
  };

  return (
    <motion.svg viewBox="0 0 140 140" fill="none" aria-hidden="true" className={className} {...draw}>
      {strokes.map((d, i) => (
        <motion.path key={d} d={d} stroke="currentColor" strokeWidth={i < 2 ? 1.6 : 1.3} strokeLinecap="round" variants={path} custom={i} />
      ))}
      {leaves.map(([x, y, r], i) => (
        <motion.g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <motion.g variants={fade} custom={i} style={{ originX: '0px', originY: '0px' }}>
            <path d={LEAF} fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.1" />
            <path d="M1 0 L 19 0" stroke="currentColor" strokeWidth="0.7" />
          </motion.g>
        </motion.g>
      ))}
      <motion.circle cx="32" cy="94" r="2.6" fill="currentColor" variants={fade} custom={5} />
      <motion.circle cx="96" cy="33" r="2.6" fill="currentColor" variants={fade} custom={6} />
    </motion.svg>
  );
}

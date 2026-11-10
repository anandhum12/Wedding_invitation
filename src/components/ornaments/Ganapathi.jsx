import { motion } from 'framer-motion';

/*
 * Stylised line-art Ganapathi (crown, broad ears, tripundra, curling trunk)
 * framed in a double gold oval with leaf sprigs. Paths draw themselves on mount.
 */
const FIGURE = [
  // crown (kireedam)
  { d: 'M50 36 C 50 25, 54 16, 60 6 C 66 16, 70 25, 70 36', w: 1.6 },
  { d: 'M50.5 30 H 69.5 M52 24 H 68', w: 1 },
  // head top
  { d: 'M44 38 Q 60 31 76 38', w: 1.6 },
  // ears
  { d: 'M45 40 C 30 32, 15 42, 18 59 C 20 72, 33 78, 44 70 C 40 66, 38 60, 42 56', w: 1.8 },
  { d: 'M75 40 C 90 32, 105 42, 102 59 C 100 72, 87 78, 76 70 C 80 66, 82 60, 78 56', w: 1.8 },
  { d: 'M39 46 C 29 44, 25 52, 27 60 M81 46 C 91 44, 95 52, 93 60', w: 0.9 },
  // face
  { d: 'M45 40 C 44 52, 47 62, 53 68 M75 40 C 76 52, 73 62, 67 68', w: 1.5 },
  // tripundra
  { d: 'M53 42 H 67 M54 45.5 H 66', w: 1.1 },
  // eyes
  { d: 'M48.5 53 Q 52 50 55.5 53 M64.5 53 Q 68 50 71.5 53', w: 1.3 },
  // trunk
  { d: 'M60 56 C 60 74, 56 86, 52 96 C 46 110, 50 126, 64 128 C 78 130, 84 116, 76 108 C 70 102, 62 108, 66 114', w: 5.5 },
  { d: 'M56 66 H 64 M55.5 74 H 63.5 M54 82 H 62', w: 0.8, light: true },
  // tusk
  { d: 'M67 68 C 73 72, 76 78, 76 85', w: 1.6 },
];

const SPRIG = 'M0 0 C 8 -6, 16 -6, 24 -2 M6 -3 C 6 -9, 10 -12, 14 -12 C 13 -8, 10 -5, 6 -3 Z M14 -4 C 16 -10, 21 -12, 24 -11 C 23 -7, 19 -5, 14 -4 Z M8 -2 C 9 3, 13 6, 17 6 C 16 2, 12 0, 8 -2 Z';

export default function Ganapathi({ className = 'w-40', delay = 0 }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.6, delay: delay + 0.15 * i, ease: 'easeInOut' }, opacity: { duration: 0.2, delay: delay + 0.15 * i } },
    }),
  };
  const fade = (i) => ({
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: delay + i } },
  });

  return (
    <motion.svg
      viewBox="0 0 200 250"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial="hidden"
      animate="show"
      role="img"
      aria-label="Lord Ganapathi"
    >
      {/* oval frame */}
      <motion.ellipse cx="100" cy="128" rx="76" ry="102" strokeWidth="1.6" variants={draw} custom={0} />
      <motion.ellipse cx="100" cy="128" rx="70" ry="96" strokeWidth="0.7" strokeDasharray="1.5 3" variants={draw} custom={1} />
      <motion.ellipse cx="100" cy="128" rx="64" ry="90" fill="currentColor" fillOpacity="0.06" stroke="none" variants={fade(1.2)} />

      {/* leaf sprigs around the oval */}
      {[
        [30, 70, -60, 1],
        [170, 70, -120, -1],
        [26, 186, 60, 1],
        [174, 186, 120, -1],
      ].map(([x, y, r, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(1 ${s})`}>
          <motion.path d={SPRIG} strokeWidth="1" fill="currentColor" fillOpacity="0.15" variants={draw} custom={9 + i * 0.3} />
        </g>
      ))}

      {/* lotus seat */}
      <motion.g variants={fade(2.6)}>
        <path d="M100 222 C 92 214, 92 204, 100 196 C 108 204, 108 214, 100 222 Z M100 222 C 88 220, 80 212, 78 202 C 90 204, 97 212, 100 222 Z M100 222 C 112 220, 120 212, 122 202 C 110 204, 103 212, 100 222 Z" strokeWidth="1.1" fill="currentColor" fillOpacity="0.12" />
      </motion.g>

      {/* figure */}
      <g transform="translate(40 52)">
        {FIGURE.map((p, i) => (
          <motion.path key={i} d={p.d} strokeWidth={p.w} opacity={p.light ? 0.7 : 1} variants={draw} custom={i * 0.6 + 1} />
        ))}
        <motion.circle cx="60" cy="49.5" r="1.8" fill="currentColor" stroke="none" variants={fade(2.4)} />
        <motion.circle cx="60" cy="6" r="2.6" fill="currentColor" stroke="none" variants={fade(2.4)} />
      </g>
    </motion.svg>
  );
}

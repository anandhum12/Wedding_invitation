import { motion } from 'framer-motion';

const LEAF = 'M0 0 C 10 -12, 36 -14, 52 -4 C 36 6, 12 6, 0 0 Z';
const RIB = 'M2 0 C 18 -4, 34 -5, 50 -4';
const right = [-46, -18, 10];

/** Purna Kumbham — brass pot with mango leaves and coconut, line drawn on view. */
export default function Kalasham({ className = 'w-36' }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i = 0) => ({ pathLength: 1, opacity: 1, transition: { duration: 1.6, delay: i * 0.08, ease: 'easeInOut' } }),
  };
  const P = (props) => <motion.path variants={draw} {...props} />;

  return (
    <motion.svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {right.map((r, i) => (
        <g key={`r${r}`} transform={`translate(104 92) rotate(${r})`}>
          <P d={LEAF} custom={i} />
          <P d={RIB} strokeWidth="0.8" custom={i} />
        </g>
      ))}
      {right.map((r, i) => (
        <g key={`l${r}`} transform={`translate(96 92) scale(-1 1) rotate(${r})`}>
          <P d={LEAF} custom={i} />
          <P d={RIB} strokeWidth="0.8" custom={i} />
        </g>
      ))}
      <P d="M100 46 a 16 16 0 1 1 -0.01 0 Z" fill="#FBF6EC" custom={3} />
      <P d="M100 46 C 98 38, 94 35, 90 33 M100 46 C 101 38, 104 34, 109 32 M100 46 L 100 35" custom={4} strokeWidth="1.2" />
      <P d="M70 90 H 130 V 98 H 70 Z" fill="#FBF6EC" custom={5} />
      <P d="M77 98 L 81 108 H 119 L 123 98" custom={5} />
      <P d="M81 108 C 52 118, 44 158, 70 178 H 130 C 156 158, 148 118, 119 108" fill="#FBF6EC" custom={6} />
      <P d="M58 132 Q 100 138 142 132 M56 140 Q 100 146 144 140" strokeWidth="1.1" custom={7} />
      <P d="M76 186 H 124" custom={8} />
      <motion.circle cx="100" cy="160" r="3" fill="currentColor" stroke="none" variants={draw} custom={9} />
    </motion.svg>
  );
}

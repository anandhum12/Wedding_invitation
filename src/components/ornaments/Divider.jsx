import { motion } from 'framer-motion';

/** Gold rule with a centre ornament: 'diamond' (page 1 style) or 'leaf' (page 2 style). */
export default function Divider({ variant = 'diamond', className = '', tone = 'gold' }) {
  const color = tone === 'light' ? 'text-gold-light' : 'text-gold';
  const line = (origin) => (
    <motion.span
      className="relative block h-px flex-1 bg-current opacity-70"
      style={{ originX: origin }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={`absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-current ${origin === 1 ? 'left-0' : 'right-0'}`} />
    </motion.span>
  );

  return (
    <div className={`flex w-full max-w-xs items-center gap-3 ${color} ${className}`} aria-hidden="true">
      {line(1)}
      {variant === 'leaf' ? (
        <svg viewBox="0 0 64 16" className="h-4 w-14 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.1">
          <path d="M28 8 C 22 1, 10 2, 6 8 C 10 14, 22 15, 28 8 Z" />
          <path d="M36 8 C 42 1, 54 2, 58 8 C 54 14, 42 15, 36 8 Z" />
          <path d="M32 3 L 35 8 L 32 13 L 29 8 Z" fill="currentColor" />
        </svg>
      ) : (
        <svg viewBox="0 0 48 16" className="h-4 w-12 shrink-0" fill="currentColor">
          <path d="M24 1 L 29 8 L 24 15 L 19 8 Z" />
          <path d="M11 5 L 14 8 L 11 11 L 8 8 Z" />
          <path d="M37 5 L 40 8 L 37 11 L 34 8 Z" />
        </svg>
      )}
      {line(0)}
    </div>
  );
}

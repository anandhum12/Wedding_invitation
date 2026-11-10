import { motion } from 'framer-motion';
import CornerFlourish from './CornerFlourish';

const corners = [
  { pos: 'left-0 top-0', flip: '' },
  { pos: 'right-0 top-0', flip: '-scale-x-100' },
  { pos: 'left-0 bottom-0', flip: '-scale-y-100' },
  { pos: 'right-0 bottom-0', flip: '-scale-x-100 -scale-y-100' },
];

/**
 * Double antique-gold border with diamond studs and flourished corners,
 * revealed on scroll (or on mount via trigger="mount").
 */
export default function OrnateFrame({ tone = 'gold', trigger = 'view', delay = 0, size = 'md', show }) {
  const color = tone === 'light' ? 'text-gold-light' : 'text-gold';
  const border = tone === 'light' ? 'border-gold-light' : 'border-gold';
  const cornerSize = size === 'sm' ? 'w-14 sm:w-16' : 'w-20 sm:w-28';
  const inset = size === 'sm' ? 'inset-2' : 'inset-3 sm:inset-4';
  const innerInset = size === 'sm' ? 'inset-[13px]' : 'inset-[19px] sm:inset-[23px]';

  const reveal = { hidden: { clipPath: 'inset(50% 50% 50% 50%)', opacity: 0 }, show: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 } };
  const motionProps =
    trigger === 'view'
      ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.2 } }
      : { initial: 'hidden', animate: show === false ? 'hidden' : 'show' };

  return (
    <motion.div className={`pointer-events-none absolute inset-0 ${color}`} aria-hidden="true" {...motionProps}>
      <motion.div variants={reveal} transition={{ duration: 1.6, delay, ease: [0.65, 0, 0.35, 1] }} className="absolute inset-0">
        <div className={`absolute ${inset} border-[1.5px] ${border} opacity-80`} />
        <div className={`absolute ${innerInset} border ${border} opacity-45`} />
        {['left-0 top-0', 'right-0 top-0', 'left-0 bottom-0', 'right-0 bottom-0'].map((p) => (
          <span key={p} className={`absolute ${inset}`}>
            <span className={`absolute ${p} block h-2.5 w-2.5 rotate-45 border ${border} bg-current ${p.includes('left') ? '-translate-x-1/2' : 'translate-x-1/2'} ${p.includes('top') ? '-translate-y-1/2' : 'translate-y-1/2'}`} />
          </span>
        ))}
      </motion.div>
      {corners.map((c) => (
        <div key={c.pos} className={`absolute ${c.pos} ${size === 'sm' ? 'p-3' : 'p-5 sm:p-7'}`}>
          <CornerFlourish className={`${cornerSize} ${c.flip}`} trigger={trigger === 'view' ? 'view' : 'mount'} delay={delay + 0.4} />
        </div>
      ))}
    </motion.div>
  );
}

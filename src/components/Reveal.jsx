import { motion } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
};

/** Fades and lifts its children into place when scrolled into view. */
export function Reveal({ children, className = '', delay = 0, y = 26 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers `fadeUp` children. Pass `animate` to control manually. */
export function Stagger({ children, className = '', stagger = 0.12, delay = 0, animate, amount = 0.2 }) {
  const variants = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } };
  const trigger = animate === undefined ? { whileInView: 'show', viewport: { once: true, amount } } : { animate: animate ? 'show' : 'hidden' };
  return (
    <motion.div className={className} variants={variants} initial="hidden" {...trigger}>
      {children}
    </motion.div>
  );
}

export const Item = ({ as = 'div', className = '', children, ...rest }) => {
  const M = motion[as];
  return (
    <M variants={fadeUp} className={className} {...rest}>
      {children}
    </M>
  );
};

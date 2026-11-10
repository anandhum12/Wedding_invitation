import { AnimatePresence, motion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { wedding } from '../data/wedding';
import SectionHeading from './SectionHeading';
import Mandala from './ornaments/Mandala';
import GoldDust from './effects/GoldDust';
import { Stagger, Item } from './Reveal';

function Unit({ value, label }) {
  const v = String(value).padStart(2, '0');
  return (
    <div
      className="relative flex aspect-[4/5] flex-col items-center justify-center rounded-sm border border-gold-light/60 bg-gradient-to-b from-white/[0.07] to-white/[0.02] sm:aspect-square"
      style={{ animation: 'box-glow 4s ease-in-out infinite' }}
    >
      <span className="pointer-events-none absolute inset-1.5 rounded-sm border border-gold-light/25" />
      {['-left-1 -top-1', '-right-1 -top-1', '-left-1 -bottom-1', '-right-1 -bottom-1'].map((p) => (
        <span key={p} className={`absolute ${p} h-2 w-2 rotate-45 bg-gold-light`} />
      ))}
      <div className="relative h-[1.15em] overflow-hidden font-display text-5xl leading-none sm:text-6xl">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={v}
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="gold-text tabular block"
          >
            {v}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="eyebrow mt-3 text-ivory/80">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const t = useCountdown(wedding.countdownTarget);

  return (
    <section
      id="countdown"
      className="relative overflow-hidden px-4 py-24 sm:py-32"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #2b4a39 0%, #1F3A2B 40%, #11241A 100%)' }}
    >
      <div className="pointer-events-none absolute -right-[30vmin] -top-[30vmin] w-[90vmin] text-gold-light/[0.09]">
        <Mandala className="animate-spin-slow h-full w-full" />
      </div>
      <div className="pointer-events-none absolute -bottom-[35vmin] -left-[30vmin] w-[80vmin] text-gold-light/[0.07]">
        <Mandala className="animate-spin-slower h-full w-full" />
      </div>
      <GoldDust className="absolute inset-0 h-full w-full" density={0.8} />

      <div className="relative mx-auto max-w-4xl">
        <SectionHeading tone="light" eyebrow="The auspicious moment" title="Counting Down to the Muhurtham" />

        {t.done ? (
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-14 text-center font-script text-5xl text-gold-light">
            The auspicious day has arrived
          </motion.p>
        ) : (
          <Stagger className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6" stagger={0.12}>
            {[
              [t.days, 'Days'],
              [t.hours, 'Hours'],
              [t.minutes, 'Minutes'],
              [t.seconds, 'Seconds'],
            ].map(([v, l]) => (
              <Item key={l}>
                <Unit value={v} label={l} />
              </Item>
            ))}
          </Stagger>
        )}

        <p className="mt-12 text-center font-serif text-lg italic text-ivory/75">
          {wedding.date.banner} <span className="mx-1 text-gold-light">·</span> {wedding.muhurtham} IST
        </p>
      </div>
    </section>
  );
}

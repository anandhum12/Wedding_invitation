import { motion } from 'framer-motion';
import { Bus, CalendarHeart, Clock3, Landmark } from 'lucide-react';
import { wedding } from '../data/wedding';
import SectionHeading from './SectionHeading';
import { fadeUp, Stagger } from './Reveal';

const PETAL = 'M0 -30 C 5 -35, 5 -42, 0 -46 C -5 -42, -5 -35, 0 -30 Z';

/** Icon inside a lotus-petal medallion that turns slowly on hover. */
function Medallion({ Icon }) {
  return (
    <div className="relative mx-auto h-28 w-28">
      <svg viewBox="-50 -50 100 100" className="absolute inset-0 h-full w-full text-gold transition-transform duration-[1.6s] ease-out group-hover:rotate-[45deg]" fill="none" stroke="currentColor" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={PETAL} transform={`rotate(${i * 30})`} strokeWidth="0.9" fill="currentColor" fillOpacity="0.07" />
        ))}
        <circle r="29" strokeWidth="1.2" />
        <circle r="25.5" strokeWidth="0.5" strokeDasharray="1.5 2" />
      </svg>
      <div className="absolute inset-[26%] flex items-center justify-center rounded-full bg-gradient-to-br from-maroon to-maroon-deep text-gold-light shadow-[inset_0_0_10px_rgba(0,0,0,0.35)]">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>
    </div>
  );
}

const cards = [
  { Icon: CalendarHeart, label: 'Date', value: `${wedding.date.weekday}, ${wedding.date.long}`, sub: wedding.date.malayalam },
  { Icon: Landmark, label: 'Venue', value: `${wedding.venue.name}, ${wedding.venue.town}`, sub: wedding.venue.region },
  { Icon: Clock3, label: 'Muhurtham', value: wedding.muhurtham, sub: 'The auspicious hour' },
];

export default function Details() {
  return (
    <section id="details" className="paper relative overflow-hidden px-4 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(217,185,100,0.22),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow="Save the date" title="Wedding Details" />

        <Stagger className="mt-16 grid gap-8 md:grid-cols-3" stagger={0.18}>
          {cards.map(({ Icon, label, value, sub }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="sheen-card group relative overflow-hidden bg-ivory px-8 pb-10 pt-12 text-center shadow-card"
            >
              <span className="pointer-events-none absolute inset-2.5 border border-gold/50 transition-colors duration-500 group-hover:border-gold" />
              <span className="pointer-events-none absolute inset-[15px] border border-gold/25" />
              {[
                'left-2.5 top-2.5 -translate-x-1/2 -translate-y-1/2',
                'right-2.5 top-2.5 translate-x-1/2 -translate-y-1/2',
                'left-2.5 bottom-2.5 -translate-x-1/2 translate-y-1/2',
                'right-2.5 bottom-2.5 translate-x-1/2 translate-y-1/2',
              ].map((p) => (
                <span key={p} className={`absolute ${p} h-2 w-2 rotate-45 bg-gold`} />
              ))}
              <Medallion Icon={Icon} />
              <p className="eyebrow mt-6 text-gold-dark">{label}</p>
              <p className="mt-3 font-serif text-2xl font-semibold leading-snug text-ink">{value}</p>
              <p className="mt-2 text-lg italic text-ink/65">{sub}</p>
            </motion.div>
          ))}
        </Stagger>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 flex justify-center"
        >
          <div className="flex items-center gap-4 rounded-full border border-gold/60 bg-ivory px-7 py-3.5 shadow-[0_10px_30px_-18px_rgba(74,14,18,0.5)]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-maroon text-gold-light">
              <Bus className="h-4 w-4" strokeWidth={1.6} />
            </span>
            <p className="font-serif text-lg text-ink sm:text-xl">
              Party leaves at <span className="font-semibold text-maroon">{wedding.partyLeaves}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

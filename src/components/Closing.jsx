import { motion } from 'framer-motion';
import { wedding } from '../data/wedding';
import GoldDust from './effects/GoldDust';
import JasmineGarland from './ornaments/JasmineGarland';
import Nilavilakku from './ornaments/Nilavilakku';
import OrnateFrame from './ornaments/OrnateFrame';
import OmMedallion from './ornaments/OmMedallion';
import Mandala from './ornaments/Mandala';
import Divider from './ornaments/Divider';
import Jasmine from './ornaments/Jasmine';
import { Stagger, Item } from './Reveal';

export default function Closing() {
  return (
    <section
      id="blessings"
      className="relative overflow-hidden px-4 pb-16 pt-44 sm:pt-52"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #6a1519 0%, #4A0E12 45%, #2A070A 100%)' }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[120vmin] -translate-x-1/2 -translate-y-1/2 text-gold-light/[0.07]">
        <Mandala className="animate-spin-slower h-full w-full" />
      </div>
      <GoldDust className="absolute inset-0 h-full w-full" density={1.1} />
      <JasmineGarland className="absolute inset-x-0 top-0 px-2 sm:px-6" count={typeof window !== 'undefined' && window.innerWidth < 640 ? 9 : 18} />

      {/* lamps */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute bottom-24 left-1 sm:left-[4%] lg:left-[9%]"
      >
        <Nilavilakku className="w-14 sm:w-24 lg:w-32" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.15 }}
        className="pointer-events-none absolute bottom-24 right-1 sm:right-[4%] lg:right-[9%]"
      >
        <Nilavilakku className="w-14 sm:w-24 lg:w-32" />
      </motion.div>

      <div className="relative mx-auto max-w-2xl px-8 py-16 text-center sm:px-16 sm:py-20">
        <OrnateFrame tone="light" />
        <Stagger className="relative flex flex-col items-center" stagger={0.18}>
          <Item className="text-gold-light">
            <OmMedallion className="w-20" glow textClass="text-gold-light" />
          </Item>
          <Item className="mt-6 flex gap-2">
            {[0, 1, 2].map((i) => (
              <Jasmine key={i} className="w-5" />
            ))}
          </Item>
          <Item as="blockquote" className="mt-6 font-serif text-3xl italic leading-snug text-ivory sm:text-4xl">
            “{wedding.quote}”
          </Item>
          <Item className="mt-8 flex w-full justify-center">
            <Divider tone="light" />
          </Item>
          <Item as="p" className="eyebrow mt-8 text-gold-light/90">
            With best compliments from
          </Item>
          <Item as="p" className="mt-3 font-script text-5xl leading-tight sm:text-6xl">
            <span className="gold-text px-2">{wedding.compliments}</span>
          </Item>
        </Stagger>
      </div>

      <footer className="relative mt-24 text-center">
        <p className="font-script text-3xl text-ivory/90">
          {wedding.groom.short} <span className="font-serif text-xl italic text-gold-light">&amp;</span> {wedding.bride.short}
        </p>
        <p className="eyebrow mt-3 text-[0.6rem] text-gold-light/70">
          {wedding.date.numeric} · {wedding.venue.town}
        </p>
      </footer>
    </section>
  );
}

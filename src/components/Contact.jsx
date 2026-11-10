import { motion } from 'framer-motion';
import { PhoneCall } from 'lucide-react';
import { wedding } from '../data/wedding';
import SectionHeading from './SectionHeading';
import KeralaBand from './ornaments/KeralaBand';
import { fadeUp, Stagger } from './Reveal';

const pretty = (n) => `${n.slice(0, 5)} ${n.slice(5)}`;

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-cream">
      <KeralaBand />
      <div className="mx-auto max-w-4xl px-4 py-24 sm:py-28">
        <SectionHeading eyebrow="For any assistance" title="Get in Touch" subtitle={wedding.hosts.names} />

        <Stagger className="mx-auto mt-14 grid max-w-2xl gap-6 sm:grid-cols-2" stagger={0.15}>
          {wedding.phones.map((n) => (
            <motion.a
              key={n}
              href={`tel:+91${n}`}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="sheen-card group relative flex items-center gap-5 overflow-hidden bg-ivory px-7 py-6 shadow-card"
              aria-label={`Call +91 ${pretty(n)}`}
            >
              <span className="pointer-events-none absolute inset-2 border border-gold/40 transition-colors duration-500 group-hover:border-gold" />
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-maroon to-maroon-deep text-gold-light shadow-[0_0_0_4px_rgba(217,185,100,0.25)] transition-shadow duration-500 group-hover:shadow-[0_0_0_6px_rgba(217,185,100,0.35),0_0_24px_rgba(217,185,100,0.5)]">
                <PhoneCall className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <span className="relative">
                <span className="eyebrow block text-[0.6rem] text-gold-dark">Tap to call</span>
                <span className="mt-1 block font-display text-xl tracking-wider text-ink sm:text-2xl">
                  <span className="text-base text-ink/55">+91 </span>
                  {pretty(n)}
                </span>
              </span>
            </motion.a>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

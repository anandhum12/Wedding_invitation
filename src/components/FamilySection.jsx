import { motion } from 'framer-motion';
import { wedding } from '../data/wedding';
import OrnateFrame from './ornaments/OrnateFrame';
import Divider from './ornaments/Divider';
import Lotus from './ornaments/Lotus';
import KeralaBand from './ornaments/KeralaBand';
import SectionHeading from './SectionHeading';
import { Stagger, Item } from './Reveal';

/** Printed-invitation style family section (page 2 of the card). */
export default function FamilySection() {
  const { hosts, brideFamily } = wedding;
  return (
    <section id="family" className="relative overflow-hidden bg-cream">
      <KeralaBand />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.7),transparent_70%)]" />

      <div className="relative mx-auto max-w-3xl px-4 py-24 sm:py-28">
        <SectionHeading eyebrow="With the blessings of the Almighty" title="A Family Invitation" />

        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="paper relative mx-auto mt-14 max-w-2xl px-6 py-16 text-center shadow-card sm:px-16 sm:py-20"
        >
          <OrnateFrame delay={0.2} />

          <Stagger className="relative flex flex-col items-center" stagger={0.13} amount={0.1}>
            <Item className="text-gold">
              <Lotus className="w-16 sm:w-20" />
            </Item>
            <Item as="h3" className="mt-5 font-serif text-2xl font-semibold text-ink sm:text-3xl">
              Muraleedharan Nair K G <span className="mx-1 text-gold">&amp;</span> Sindhu G
            </Item>
            <Item as="address" className="mt-3 text-base not-italic leading-relaxed text-ink/75 sm:text-lg">
              {hosts.house}
              <br />
              {hosts.address}
            </Item>

            <Item className="mt-7 flex w-full justify-center">
              <Divider variant="leaf" />
            </Item>

            <Item as="p" className="mt-7 max-w-md text-lg italic leading-relaxed text-ink/80 sm:text-xl">
              Solicit your esteemed presence and blessings with family on the auspicious occasion of the wedding ceremony of our son
            </Item>

            <Item as="p" className="mt-8 font-script text-[clamp(2.8rem,11vw,4.6rem)] leading-tight text-maroon">
              {wedding.groom.full}
            </Item>

            <Item className="my-3 flex items-center gap-4 text-gold">
              <span className="h-px w-12 bg-current opacity-70" />
              <span className="eyebrow text-gold-dark">With</span>
              <span className="h-px w-12 bg-current opacity-70" />
            </Item>

            <Item as="p" className="font-script text-[clamp(2.5rem,10vw,4.4rem)] leading-tight text-maroon">
              {wedding.bride.full}
            </Item>

            <Item as="p" className="mt-5 text-lg font-medium text-ink/85">
              {brideFamily.parents}
            </Item>
            <Item as="address" className="mt-1 text-base not-italic leading-relaxed text-ink/70 sm:text-lg">
              {brideFamily.house}
              <br />
              {brideFamily.address}
            </Item>

            <Item className="mt-9 text-gold">
              <Lotus className="w-14 rotate-180" />
            </Item>
          </Stagger>
        </motion.article>
      </div>
      <KeralaBand className="rotate-180" />
    </section>
  );
}

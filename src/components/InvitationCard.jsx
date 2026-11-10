import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { wedding } from '../data/wedding';
import OrnateFrame from './ornaments/OrnateFrame';
import OmMedallion from './ornaments/OmMedallion';
import Divider from './ornaments/Divider';
import Mandala from './ornaments/Mandala';
import Kalasham from './ornaments/Kalasham';
import { Stagger, Item } from './Reveal';

/** The hero: the main invitation card, after page 1 of the printed invitation. */
export default function InvitationCard({ ready }) {
  const { scrollY } = useScroll();
  const mandalaY = useTransform(scrollY, [0, 900], [0, 220]);
  const glowY = useTransform(scrollY, [0, 900], [0, -120]);

  // gentle 3D tilt that follows the mouse (desktop only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-3.5, 3.5]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3.5, -3.5]), { stiffness: 120, damping: 18 });
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="invitation" className="paper relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-24 pt-24 sm:pt-28">
      <motion.div style={{ y: glowY }} className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_at_top,rgba(217,185,100,0.32),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div style={{ y: mandalaY }} className="w-[150vmin] max-w-none text-gold/[0.14]">
          <Mandala className="animate-spin-slow h-full w-full" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: 1200 }}
        className="relative w-full max-w-[34rem]"
      >
        <motion.article
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.6 }}
          className="paper relative overflow-hidden rounded-[2px] px-6 py-16 text-center shadow-card transition-shadow duration-700 hover:shadow-[0_40px_90px_-30px_rgba(74,14,18,0.45),0_0_50px_-20px_rgba(217,185,100,0.6)] sm:px-14 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Mandala className="w-[85%] text-gold/[0.08]" />
          </div>
          <OrnateFrame trigger="mount" show={ready} delay={0.9} />

          <Stagger animate={ready} delay={1.1} stagger={0.16} className="relative flex flex-col items-center">
            <Item className="text-gold">
              <OmMedallion className="w-24 sm:w-28" />
            </Item>
            <Item as="p" className="eyebrow mt-5 text-gold-dark">
              Shree Ganeshaya Namah
            </Item>

            <Item className="mt-8 flex w-full items-center justify-center gap-3 text-gold">
              <span className="h-px w-5 bg-current opacity-70 sm:w-14" />
              <p className="whitespace-nowrap font-display text-[0.56rem] uppercase tracking-[0.2em] text-gold-dark sm:text-[0.7rem] sm:tracking-[0.35em]">
                The wedding celebration of
              </p>
              <span className="h-px w-5 bg-current opacity-70 sm:w-14" />
            </Item>

            <Item as="h1" className="mt-6 flex flex-col items-center">
              <span className="font-script text-[clamp(3rem,13vw,5.8rem)] leading-[1.1] text-maroon">{wedding.groom.short}</span>
              <span className="my-1 font-serif text-4xl italic text-gold sm:text-5xl">&amp;</span>
              <span className="font-script text-[clamp(2.6rem,11.5vw,5.4rem)] leading-[1.1] text-maroon">{wedding.bride.short}</span>
            </Item>

            <Item className="mt-8 flex w-full justify-center">
              <Divider />
            </Item>

            <Item as="p" className="mt-6 font-display text-sm tracking-[0.22em] text-ink sm:text-base">
              {wedding.date.weekday.toUpperCase()}
              <span className="mx-1.5 hidden text-gold sm:inline">·</span>
              <span className="block sm:inline">{wedding.date.long.toUpperCase()}</span>
            </Item>
            <Item as="p" className="mt-2 font-display text-xs tracking-[0.3em] text-gold-dark">
              {wedding.date.malayalam.toUpperCase()}
            </Item>

            <Item className="mt-7">
              <p className="eyebrow text-gold-dark">Muhurtham</p>
              <p className="mt-1.5 font-serif text-xl font-semibold text-ink sm:text-2xl">{wedding.muhurtham}</p>
            </Item>
            <Item as="p" className="mt-5 font-display text-xs leading-relaxed tracking-[0.22em] text-ink/80 sm:text-[0.8rem]">
              {wedding.venue.name.toUpperCase()}
              <span className="mx-1 hidden text-gold sm:inline">·</span>
              <span className="block sm:inline">{wedding.venue.town.toUpperCase()}</span>
            </Item>

            <Item className="mt-7 flex w-full justify-center">
              <Divider variant="leaf" />
            </Item>
            <Item className="mt-6 text-gold">
              <Kalasham className="w-28 sm:w-32" />
            </Item>
          </Stagger>
        </motion.article>
      </motion.div>

      <motion.a
        href="#family"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 3 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center text-gold-dark"
        aria-label="Scroll to family invitation"
      >
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <ChevronDown className="animate-float mt-1 h-5 w-5" strokeWidth={1.4} />
      </motion.a>
    </section>
  );
}

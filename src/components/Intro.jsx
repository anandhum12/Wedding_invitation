import { useState } from 'react';
import { motion } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { wedding } from '../data/wedding';
import GoldDust from './effects/GoldDust';
import FallingPetals from './effects/FallingPetals';
import OmMedallion from './ornaments/OmMedallion';
import Ganapathi from './ornaments/Ganapathi';
import OrnateFrame from './ornaments/OrnateFrame';
import Mandala from './ornaments/Mandala';
import { EASE } from './Reveal';

const DOOR_EASE = [0.76, 0, 0.24, 1];

function Door({ side, opening, onDone }) {
  const left = side === 'left';
  return (
    <motion.div
      className={`absolute inset-y-0 ${left ? 'left-0' : 'right-0'} w-1/2 overflow-hidden`}
      style={{ background: `radial-gradient(ellipse at ${left ? '100%' : '0%'} 50%, #6a1519 0%, #4A0E12 45%, #2A070A 100%)` }}
      initial={false}
      animate={{ x: opening ? (left ? '-102%' : '102%') : '0%' }}
      transition={{ duration: 1.5, delay: 0.55, ease: DOOR_EASE }}
      onAnimationComplete={() => opening && left && onDone()}
    >
      <div className={`absolute top-1/2 ${left ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-[130vmin] -translate-y-1/2 text-gold-light/[0.08]`}>
        <Mandala className="animate-spin-slow h-full w-full" />
      </div>
      <div className={`absolute inset-y-0 ${left ? 'right-0' : 'left-0'} w-px bg-gradient-to-b from-transparent via-gold-light/30 to-transparent`} />
    </motion.div>
  );
}

/** Opening screen: glowing Om, self-drawing gold frame, and doors that part to reveal the invitation. */
export default function Intro({ onOpenStart, onOpenDone }) {
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    onOpenStart();
  };

  const seq = (i) => ({
    initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 1.1, delay: 0.6 + i * 0.35, ease: EASE },
  });

  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      role="dialog"
      aria-label="Wedding invitation cover"
    >
      <Door side="left" opening={opening} onDone={onOpenDone} />
      <Door side="right" opening={opening} onDone={onOpenDone} />

      <motion.div
        className="absolute inset-0"
        animate={opening ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <GoldDust className="absolute inset-0 h-full w-full" density={1.3} />
        <FallingPetals className="absolute inset-0" count={8} />

        <div className="absolute inset-3 sm:inset-6">
          <OrnateFrame tone="light" trigger="mount" delay={0.2} />
        </div>

        <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
            className="text-gold-light"
          >
            <OmMedallion className="w-14 sm:w-16 [@media(max-height:700px)]:w-11" glow textClass="text-gold-light" />
          </motion.div>

          <div className="relative -mt-1 text-gold-light">
            <div className="animate-glow absolute inset-[18%] rounded-full bg-gold-light/25 blur-3xl" />
            <Ganapathi className="relative w-32 drop-shadow-[0_0_14px_rgba(217,185,100,0.45)] sm:w-44 [@media(max-height:780px)]:w-28 [@media(max-height:700px)]:w-[5.5rem]" delay={0.3} />
          </div>

          <motion.p {...seq(1)} className="eyebrow mt-4 text-gold-light/90 [@media(max-height:700px)]:mt-2">
            Shree Ganeshaya Namah
          </motion.p>
          <motion.p {...seq(2)} className="mt-5 font-serif text-lg italic text-ivory/75 [@media(max-height:700px)]:mt-2 [@media(max-height:700px)]:text-base">
            The wedding celebration of
          </motion.p>
          <motion.h1 {...seq(3)} className="mt-2 flex flex-col items-center font-script text-[clamp(2.2rem,min(12vw,10vh),5rem)] leading-[1.15] text-ivory sm:block">
            <span>{wedding.groom.short}</span>
            <span className="mx-3 font-serif text-[0.6em] italic leading-none text-gold-light">&amp;</span>
            <span className="whitespace-nowrap">{wedding.bride.short}</span>
          </motion.h1>
          <motion.p {...seq(4)} className="mt-4 font-display text-sm tracking-[0.45em] text-gold-light [@media(max-height:700px)]:mt-1">
            {wedding.date.numeric}
          </motion.p>

          <motion.div {...seq(5)} className="mt-9 [@media(max-height:700px)]:mt-5">
            <button
              type="button"
              onClick={open}
              className="btn-gold group relative bg-gradient-to-b from-gold-light to-gold text-maroon-night shadow-glow hover:scale-[1.03]"
            >
              <span className="animate-ring pointer-events-none absolute inset-0 rounded-full border border-gold-light" />
              <MailOpen className="h-4 w-4" strokeWidth={1.6} />
              Open Invitation
            </button>
            <p className="mt-4 text-sm italic text-ivory/55 [@media(max-height:700px)]:hidden">With love &amp; blessings</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

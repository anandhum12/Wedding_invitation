import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Music2, VolumeX } from 'lucide-react';

const base =
  'flex h-12 w-12 items-center justify-center rounded-full border border-gold-light/70 bg-maroon-deep/90 text-gold-light shadow-[0_10px_30px_-10px_rgba(42,7,10,0.6)] backdrop-blur transition-transform hover:scale-105';

export default function FloatingControls({ visible, music }) {
  const { playing, toggle } = music;
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      <motion.button
        type="button"
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6 }}
        className={`fixed bottom-5 left-5 z-40 ${base}`}
        aria-pressed={playing}
        aria-label={playing ? 'Pause background music' : 'Play traditional instrumental background music'}
        title={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? (
          <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-gold-light"
                animate={{ height: ['30%', '100%', '45%', '80%', '30%'] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
              />
            ))}
          </span>
        ) : (
          <span className="relative">
            <Music2 className="h-5 w-5" strokeWidth={1.6} />
            <VolumeX className="absolute -bottom-1.5 -right-2 h-3 w-3 opacity-80" strokeWidth={2} />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#invitation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-5 right-5 z-40 ${base}`}
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" strokeWidth={1.6} />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}

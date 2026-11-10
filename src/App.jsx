import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import InvitationCard from './components/InvitationCard';
import FamilySection from './components/FamilySection';
import Countdown from './components/Countdown';
import Details from './components/Details';
import Venue from './components/Venue';
import Contact from './components/Contact';
import Closing from './components/Closing';
import FloatingControls from './components/FloatingControls';
import FallingPetals from './components/effects/FallingPetals';
import { useAmbientMusic } from './hooks/useAmbientMusic';

export default function App() {
  const [revealing, setRevealing] = useState(false); // doors are parting
  const [introDone, setIntroDone] = useState(false);
  const music = useAmbientMusic();

  useEffect(() => {
    document.documentElement.style.overflow = introDone ? '' : 'hidden';
    if (!introDone) window.scrollTo(0, 0);
  }, [introDone]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!introDone && <Intro onOpenStart={() => {
              music.play();
              setRevealing(true);
            }} onOpenDone={() => setIntroDone(true)} />}
      </AnimatePresence>

      <Navbar visible={revealing} />

      <motion.main
        initial={{ opacity: 0, scale: 0.97 }}
        animate={revealing ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!revealing}
      >
        <InvitationCard ready={revealing} />
        <FamilySection />
        <Countdown />
        <Details />
        <Venue />
        <Contact />
        <Closing />
      </motion.main>

      {introDone && <FallingPetals />}
      <FloatingControls visible={introDone} music={music} />
    </MotionConfig>
  );
}

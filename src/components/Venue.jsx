import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Navigation, Map as MapIcon } from 'lucide-react';
import { wedding } from '../data/wedding';
import TempleSilhouette from './ornaments/TempleSilhouette';
import OrnateFrame from './ornaments/OrnateFrame';
import Divider from './ornaments/Divider';
import MapIllustration from './MapIllustration';
import { Stagger, Item } from './Reveal';

export default function Venue() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const templeY = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const { venue } = wedding;

  return (
    <section ref={ref} id="venue" className="relative overflow-hidden bg-gradient-to-b from-ivory via-cream to-parchment px-4 pb-48 pt-24 sm:pb-56 sm:pt-32">
      <motion.div style={{ y: templeY }} className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center text-forest/[0.13]">
        <TempleSilhouette className="h-56 w-full max-w-5xl sm:h-72" />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-forest/20" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <Stagger className="text-center lg:text-left" stagger={0.14}>
          <Item as="p" className="eyebrow text-gold-dark">
            The Venue
          </Item>
          <Item as="h2" className="mt-4 font-serif text-4xl font-medium leading-tight text-maroon sm:text-5xl">
            {venue.name}
          </Item>
          <Item as="p" className="mt-3 flex items-center justify-center gap-2 text-xl text-ink/80 lg:justify-start">
            <MapPin className="h-5 w-5 text-gold" strokeWidth={1.6} />
            {venue.town}, {venue.region}
          </Item>
          <Item className="mt-6 flex justify-center lg:justify-start">
            <Divider className="max-w-[14rem]" />
          </Item>
          <Item as="p" className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ink/75 lg:mx-0">
            Join us amidst the backwaters and coconut groves of Onattukara as two families come together in a sacred union on{' '}
            <span className="font-semibold text-ink">{wedding.date.weekday}, {wedding.date.long}</span>. Muhurtham {wedding.muhurtham}.
          </Item>
          <Item className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a href={venue.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-gold bg-maroon text-gold-pale shadow-card hover:bg-maroon-deep">
              <Navigation className="h-4 w-4" strokeWidth={1.6} />
              Get Directions
            </a>
            <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-gold border-gold text-maroon hover:bg-gold/10">
              <MapIcon className="h-4 w-4" strokeWidth={1.6} />
              Open in Google Maps
            </a>
          </Item>
        </Stagger>

        <motion.a
          href={venue.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open directions to Bhuvi Convention Centre in Google Maps"
          initial={{ opacity: 0, y: 40, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="paper group relative mx-auto block w-full max-w-lg p-7 shadow-card sm:p-9"
        >
          <OrnateFrame size="sm" />
          <div className="relative overflow-hidden border border-gold/40">
            <MapIllustration />
          </div>
          <p className="relative mt-4 text-center text-sm italic text-ink/60 transition-colors group-hover:text-maroon">
            Illustrative map · tap for live directions
          </p>
        </motion.a>
      </div>
    </section>
  );
}

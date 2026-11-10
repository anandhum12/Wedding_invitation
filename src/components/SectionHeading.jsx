import Divider from './ornaments/Divider';
import { Stagger, Item } from './Reveal';

export default function SectionHeading({ eyebrow, title, subtitle, tone = 'dark', className = '' }) {
  const light = tone === 'light';
  return (
    <Stagger className={`flex flex-col items-center text-center ${className}`}>
      <Item as="p" className={`eyebrow ${light ? 'text-gold-light' : 'text-gold-dark'}`}>
        {eyebrow}
      </Item>
      <Item as="h2" className={`mt-4 font-serif text-4xl font-medium leading-tight sm:text-5xl ${light ? 'text-ivory' : 'text-maroon'}`}>
        {title}
      </Item>
      <Item className="mt-5 flex w-full justify-center">
        <Divider tone={light ? 'light' : 'gold'} />
      </Item>
      {subtitle && (
        <Item as="p" className={`mt-5 max-w-xl text-lg italic ${light ? 'text-ivory/80' : 'text-ink/75'}`}>
          {subtitle}
        </Item>
      )}
    </Stagger>
  );
}

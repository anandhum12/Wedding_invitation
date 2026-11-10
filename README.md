# Aravind & Nandithadas — Wedding Invitation

A Kerala traditional digital wedding invitation built with React, Tailwind CSS and Framer Motion.
It uses no images: every ornament (Om medallion, corner flourishes, mandala, kalasham, nilavilakku,
jasmine garlands, temple silhouette, map) is drawn in inline SVG.

## Run

```bash
npm install
npm run dev       # local development → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, Firebase Hosting).

## Editing details

All wording, dates, phone numbers and map links live in `src/data/wedding.js`.

## Music

Music is off by default. When a guest turns it on, the page plays a gentle instrumental generated
in the browser: a tanpura drone with veena-like notes in raga Mohanam.
To use a recorded track instead, put it at `public/music.mp3` and set
`MUSIC_URL = '/music.mp3'` in `src/hooks/useAmbientMusic.js`.

## Structure

```
src/
  data/wedding.js            all invitation content
  components/
    Intro.jsx                opening screen (Om, gold frame, parting doors)
    InvitationCard.jsx       hero invitation card
    FamilySection.jsx        printed-style family invitation
    Countdown.jsx            live countdown to the muhurtham (IST)
    Details.jsx              date / venue / muhurtham cards
    Venue.jsx + MapIllustration.jsx
    Contact.jsx              click-to-call numbers
    Closing.jsx              lamps, garlands, blessings
    Navbar.jsx, FloatingControls.jsx (music + back-to-top)
    ornaments/               reusable SVG ornaments
    effects/                 gold dust canvas, falling jasmine
  hooks/                     useCountdown, useAmbientMusic
```

Animations follow the visitor's "reduce motion" system setting.

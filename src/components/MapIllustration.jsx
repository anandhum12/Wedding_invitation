import { motion } from 'framer-motion';

const PALM = 'M0 0 C 1 -6, -1 -11, 2 -16 M2 -16 C -3 -18, -7 -16, -9 -13 M2 -16 C 0 -21, 3 -24, 7 -24 M2 -16 C 7 -18, 11 -16, 12 -12';

/** Hand-drawn style map: Chennithala → Haripad along the backwaters. Illustrative, not to scale. */
export default function MapIllustration() {
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" role="img" aria-label="Illustrated map showing the route from Chennithala to Bhuvi Convention Centre, Haripad">
      <defs>
        <pattern id="paddy" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#7d9b6c" strokeWidth="1" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="400" height="320" fill="#F6EEDB" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="320" stroke="#B08D3C" strokeOpacity="0.08" />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="#B08D3C" strokeOpacity="0.08" />
      ))}

      {/* paddy fields */}
      <rect x="160" y="190" width="90" height="60" rx="4" fill="url(#paddy)" />
      <rect x="250" y="30" width="80" height="50" rx="4" fill="url(#paddy)" />
      <rect x="120" y="40" width="70" height="56" rx="4" fill="url(#paddy)" />

      {/* backwaters */}
      <path d="M0 262 C 70 240, 120 292, 200 268 S 330 226, 400 248" fill="none" stroke="#86ad9e" strokeWidth="16" strokeOpacity="0.45" strokeLinecap="round" />
      <path d="M210 266 C 230 300, 250 312, 270 320" fill="none" stroke="#86ad9e" strokeWidth="7" strokeOpacity="0.4" />
      <path d="M0 262 C 70 240, 120 292, 200 268 S 330 226, 400 248" fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.6" strokeDasharray="6 10" />

      {/* NH 66 */}
      <path d="M78 0 C 84 90, 70 180, 86 320" fill="none" stroke="#D7C59C" strokeWidth="9" strokeLinecap="round" />
      <path d="M78 0 C 84 90, 70 180, 86 320" fill="none" stroke="#fff" strokeWidth="1.2" strokeDasharray="5 6" />
      <g transform="translate(60 70) rotate(-88)">
        <text fontFamily="Cinzel, serif" fontSize="9" letterSpacing="2" fill="#85661F">NH 66</text>
      </g>

      {/* palms */}
      {[
        [140, 230], [300, 200], [340, 120], [210, 90], [30, 200], [370, 300], [130, 300],
      ].map(([x, y]) => (
        <path key={`${x}${y}`} d={PALM} transform={`translate(${x} ${y})`} fill="none" stroke="#5f7d55" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      ))}

      {/* route */}
      <path id="route" d="M300 132 C 270 150, 250 128, 222 152 S 150 176, 106 168" fill="none" stroke="#7A1F24" strokeOpacity="0.18" strokeWidth="7" strokeLinecap="round" />
      <motion.path
        d="M300 132 C 270 150, 250 128, 222 152 S 150 176, 106 168"
        fill="none"
        stroke="#7A1F24"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="8 6"
        className="animate-dash"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      {/* Mavelikara */}
      <circle cx="352" cy="214" r="3.5" fill="#85661F" />
      <text x="352" y="232" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="13" fontStyle="italic" fill="#6B5017">
        Mavelikara
      </text>

      {/* Chennithala (origin) */}
      <circle cx="300" cy="132" r="7" fill="#FBF6EC" stroke="#7A1F24" strokeWidth="2" />
      <circle cx="300" cy="132" r="2.5" fill="#7A1F24" />
      <text x="300" y="116" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="15" fontWeight="600" fill="#3A2A1E">
        Chennithala
      </text>

      {/* Haripad (venue) */}
      <circle cx="106" cy="168" r="6" fill="#B08D3C" opacity="0.5">
        <animate attributeName="r" values="6;24" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.55;0" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <g transform="translate(106 168)">
        <path d="M0 0 C -4 -8, -13 -14, -13 -24 A 13 13 0 1 1 13 -24 C 13 -14, 4 -8, 0 0 Z" fill="#7A1F24" stroke="#4A0E12" strokeWidth="1" />
        <circle cy="-24" r="5" fill="#D9B964" />
      </g>
      <g transform="translate(106 192)">
        <rect x="-66" y="0" width="132" height="38" rx="3" fill="#FBF6EC" stroke="#B08D3C" />
        <text y="15" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="8.5" letterSpacing="1" fill="#7A1F24">
          BHUVI CONVENTION
        </text>
        <text y="29" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="8.5" letterSpacing="1" fill="#7A1F24">
          CENTRE · HARIPAD
        </text>
      </g>

      {/* compass */}
      <g transform="translate(360 50)" fill="none" stroke="#85661F">
        <circle r="18" strokeOpacity="0.6" />
        <path d="M0 -15 L 4 0 L 0 15 L -4 0 Z" fill="#B08D3C" fillOpacity="0.35" />
        <path d="M0 -15 L 4 0 L -4 0 Z" fill="#7A1F24" stroke="none" />
        <text y="-22" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="9" fill="#85661F" stroke="none">
          N
        </text>
      </g>
    </svg>
  );
}

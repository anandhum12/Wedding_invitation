// Single source of truth — taken from the printed invitation (Aravind & Nandithadas.pdf)

const venueQuery = 'Bhuvi Convention Centre, Haripad, Kerala';

export const wedding = {
  groom: { short: 'Aravind', full: 'Aravind M' },
  bride: { short: 'Nandithadas', full: 'Nandithadas K R' },

  date: {
    weekday: 'Saturday',
    long: '09 January 2027',
    banner: 'Saturday · 09 January 2027',
    numeric: '09 · 01 · 2027',
    malayalam: '1202 Dhanu 25',
  },

  muhurtham: '11:20 AM – 11:45 AM',
  // Countdown target — start of muhurtham, Indian Standard Time
  countdownTarget: '2027-01-09T11:20:00+05:30',
  partyLeaves: '9:00 AM',

  venue: {
    name: 'Bhuvi Convention Centre',
    town: 'Haripad',
    region: 'Alappuzha, Kerala',
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueQuery)}`,
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueQuery)}`,
  },

  hosts: {
    names: 'Muraleedharan Nair K G & Sindhu G',
    house: 'Krishnakripa, Thripperumthura',
    address: 'Chennithala, Mavelikara 690105, Alappuzha',
  },

  brideFamily: {
    parents: 'D/o. Mr. Reji K & Mrs. Pushpalatha A',
    house: 'Das Bhavanam, Thripperumthura, Chennithala',
    address: 'Mavelikara 690105, Alappuzha',
  },

  invitationLine:
    'solicit your esteemed presence and blessings with family on the auspicious occasion of the wedding ceremony of our son',

  phones: ['7034303900', '9562626385'],

  quote: 'Just presence and blessings are enough as presents.',
  compliments: 'Anandhu M',
};

export const navLinks = [
  { id: 'invitation', label: 'Invitation' },
  { id: 'family', label: 'Family' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'details', label: 'Details' },
  { id: 'venue', label: 'Venue' },
  { id: 'contact', label: 'Contact' },
];

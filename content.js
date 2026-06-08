// Shared content store for Blade & Crown Barbershop
// Defaults live here; admin edits are layered on top via localStorage.

const STORAGE_KEY = 'bladeCrownContent';

const defaultContent = {
  hero: {
    tagline: 'Sharp Looks. Sharper Standards.',
    subtext: 'Est. 2014 — Wicker Park\'s home for precision fades, hot towel shaves, and old-school craft with a modern edge.',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2069&auto=format&fit=crop'
  },
  about: {
    founded: '2014',
    heading: 'A Decade of Craft on Damen Avenue',
    story: "Blade & Crown opened its doors in 2014 in a converted print shop on Damen Avenue, founded by master barber Eli Marchetti after a decade cutting hair in Chicago's old-guard shops. He wanted a space that respected the rituals of traditional barbering — straight razors, hot towels, real conversation — without feeling stuck in the past. What started as a three-chair shop with a single barber and a record player has grown into a neighborhood institution with five chairs, a loyal clientele, and a waitlist for Saturday appointments.",
    philosophy: "We believe a haircut is a small ceremony. You sit down stressed and you stand up sharper — not just in how you look, but in how you carry yourself. Every service starts with a conversation about your hair, your face shape, and your week ahead, because the best cut is the one that fits your actual life, not a photo on a wall.",
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop'
  },
  services: [
    {
      category: 'Haircuts',
      items: [
        { name: 'Signature Cut', price: '$48', desc: 'Consultation, precision cut, and style finish tailored to your face shape.' },
        { name: 'Skin Fade', price: '$52', desc: 'Seamless blend from skin to length, finished with a straight-razor edge-up.' },
        { name: 'Buzz Cut', price: '$30', desc: 'Clean, even, all-over clipper cut — quick, sharp, and low maintenance.' },
        { name: 'Kids Cut (12 & under)', price: '$28', desc: 'Patient, friendly cuts for the next generation of regulars.' }
      ]
    },
    {
      category: 'Beard & Shave',
      items: [
        { name: 'Beard Sculpt & Line-Up', price: '$32', desc: 'Shape, trim, and define with hot towel prep and beard oil finish.' },
        { name: 'Classic Hot Towel Shave', price: '$45', desc: 'Straight-razor shave with hot towels, pre-shave oil, and cooling balm.' },
        { name: 'Beard Maintenance Trim', price: '$22', desc: 'Quick clean-up to keep your beard sharp between full sculpts.' }
      ]
    },
    {
      category: 'Packages',
      items: [
        { name: 'The Full Crown', price: '$85', desc: 'Signature cut + hot towel shave + beard sculpt. Our most popular package.' },
        { name: 'The Gentleman', price: '$68', desc: 'Skin fade + beard line-up + scalp massage finish.' },
        { name: 'The Refresh', price: '$110', desc: 'Cut, shave, beard sculpt, and 30-minute scalp & shoulder treatment.' }
      ]
    }
  ],
  barbers: [
    {
      name: 'Eli Marchetti',
      specialty: 'Founder · Classic Cuts & Straight-Razor Shaves',
      years: '17 years experience',
      bio: 'Eli trained in old-school Chicago shops before opening Blade & Crown. He\'s known for unhurried hot towel shaves and a memory for every regular\'s usual order.',
      image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1974&auto=format&fit=crop'
    },
    {
      name: 'Marcus Webb',
      specialty: 'Master of Skin Fades & Modern Textures',
      years: '11 years experience',
      bio: 'Marcus cut his teeth in Atlanta before landing in Chicago. His fades are razor-sharp and his texture work keeps the shop\'s younger clientele coming back weekly.',
      image: 'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?q=80&w=1974&auto=format&fit=crop'
    },
    {
      name: 'Diego Ruiz',
      specialty: 'Beard Sculpting & Grey Blending',
      years: '9 years experience',
      bio: 'Diego specializes in beard architecture — shaping facial hair to balance and sharpen any face shape — plus subtle grey-blending color work.',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1974&auto=format&fit=crop'
    },
    {
      name: 'Theo Banks',
      specialty: 'Precision Tapers & Kids Cuts',
      years: '6 years experience',
      bio: 'Theo is the shop\'s rising star — fast, exacting, and endlessly patient, which makes him the go-to chair for first-time visitors and the youngest clients alike.',
      image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1974&auto=format&fit=crop'
    }
  ],
  gallery: [
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2069&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599387431119-f60be7f9d3e8?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1622296089780-290d715192af?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=1974&auto=format&fit=crop'
  ],
  testimonials: [
    { name: 'James O.', rating: 5, text: "I've been chasing a good barber since I moved to Chicago and Blade & Crown ended the search. Marcus's fade is the cleanest I've ever had — three weeks later and it's still holding its shape." },
    { name: 'Andre P.', rating: 5, text: "The hot towel shave with Eli is basically therapy. I walked in after the worst week of my year and walked out feeling like a new person. Worth every penny of The Full Crown package." },
    { name: 'Sam R.', rating: 5, text: "Brought my 7-year-old in for his first 'big boy' haircut and Theo was unbelievably patient with him. Now my son asks when he gets to go back to 'his' barbershop." },
    { name: 'Marcus T.', rating: 4, text: "Great atmosphere, great music, even better cuts. Only reason it's not five stars is that Saturday slots book up two weeks out — which honestly just tells you how good they are." },
    { name: 'David K.', rating: 5, text: "Diego sculpted my beard into something I didn't know was possible with my face shape. Got four compliments before lunch. This is a proper barbershop, not a chain." }
  ],
  contact: {
    address: '1742 N. Damen Avenue, Chicago, IL 60622',
    neighborhood: 'Wicker Park',
    phone: '(773) 555-0148',
    email: 'bookings@bladeandcrown.com',
    hours: [
      { day: 'Monday', time: 'Closed' },
      { day: 'Tuesday – Friday', time: '10:00 AM – 8:00 PM' },
      { day: 'Saturday', time: '9:00 AM – 6:00 PM' },
      { day: 'Sunday', time: '11:00 AM – 4:00 PM' }
    ]
  }
};

function loadContent() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === 'object') {
      return deepMerge(defaultContent, saved);
    }
  } catch (e) {}
  return JSON.parse(JSON.stringify(defaultContent));
}

function saveContent(content) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

function resetContent() {
  localStorage.removeItem(STORAGE_KEY);
}

function deepMerge(base, override) {
  if (Array.isArray(base)) {
    return Array.isArray(override) ? override : base;
  }
  if (typeof base === 'object' && base !== null) {
    const result = {};
    for (const key of Object.keys(base)) {
      result[key] = (override && key in override) ? deepMerge(base[key], override[key]) : base[key];
    }
    return result;
  }
  return (override !== undefined) ? override : base;
}

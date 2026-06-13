// Shared content store for Xolarc Barber Co.
// Defaults live here; admin edits are layered on top via localStorage.

const STORAGE_KEY = 'xolarcBarberContent';

const defaultContent = {
  hero: {
    tagline: 'Cuts That Hit Different.',
    subtext: 'Addison, TX — Premium fades, modern cuts, and confidence-building transformations from Carlo Reyna. 6000+ cuts and counting.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop'
  },
  about: {
    founded: '2019',
    heading: 'Meet Your Barber, Carlo Reyna',
    story: "Xolarc Barber Co. is built around one mission: helping men walk out feeling like the best version of themselves. Founded by Carlo Reyna — known online simply as @xolarc — the shop has grown from a single chair into a go-to destination in Addison, with over 55K people following the journey online and more than 6,000 cuts delivered over 5+ years behind the chair. Every appointment is part craft, part conversation, and part confidence reset.",
    philosophy: "I help men get their confidence back — one cut at a time. Whether it's a clean taper, a textured fringe, or a flawless skin fade transition, every cut is dialed in to your hair type, face shape, and personal style. No rushed chairs, no cookie-cutter cuts — just precision work and good energy.",
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop'
  },
  services: [
    {
      category: 'Haircuts',
      items: [
        { name: 'Signature Taper', price: '$45', desc: 'Custom-blended taper dialed in to your hair texture and face shape.' },
        { name: 'Skin Fade', price: '$50', desc: 'Razor-sharp, seamless skin fade with a flawless transition into your length.' },
        { name: 'Textured Crop / Mullet', price: '$50', desc: 'Modern texture work — choppy fringe, curly crops, and mullet shapes.' },
        { name: 'Buzz Cut', price: '$30', desc: 'Clean, even, all-over clipper cut. Quick, sharp, low maintenance.' },
        { name: 'Kids Cut (12 & under)', price: '$30', desc: 'Patient, dialed-in cuts for the next generation of regulars.' }
      ]
    },
    {
      category: 'Add-Ons & Touch-Ups',
      items: [
        { name: 'Beard Trim & Line-Up', price: '$15', desc: 'Sharp lineup and beard shaping to finish off your look.' },
        { name: 'Hot Towel Refresh', price: '$10', desc: 'Steamed towel treatment for a relaxing finish to any cut.' },
        { name: 'Eyebrow Cleanup', price: '$10', desc: 'Quick brow trim and shape for a polished, put-together look.' }
      ]
    },
    {
      category: 'Signature Packages',
      items: [
        { name: 'The Full Confidence', price: '$70', desc: 'Signature taper or fade + beard line-up + hot towel refresh.' },
        { name: 'The 360 Transformation', price: '$95', desc: 'Full cut, color/texture consult, beard work, and styling — the works.' },
        { name: 'First Visit Special', price: '$40', desc: 'New clients: any signature cut, dialed in and documented for next time.' }
      ]
    }
  ],
  barbers: [
    {
      name: 'Carlo Reyna',
      specialty: 'Founder · Fades, Tapers & Modern Texture',
      years: '5+ years experience · 6,000+ cuts',
      bio: 'Known online as @xolarc to 55K+ followers, Carlo specializes in flawless fade transitions, textured crops, and high-energy transformations. His mission: help every client walk out with their confidence restored.',
      image: 'https://images.unsplash.com/photo-1622296089780-290d715192af?q=80&w=1974&auto=format&fit=crop'
    }
  ],
  gallery: [
    'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2069&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599387431119-f60be7f9d3e8?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1974&auto=format&fit=crop'
  ],
  testimonials: [
    { name: 'Jordan M.', rating: 5, text: "Carlo is the only barber I trust with my hair. The skin fade transition is unreal — clean every single time, and the vibe in the shop is always good energy." },
    { name: 'Diego A.', rating: 5, text: "Followed @xolarc on Instagram for months before booking and it did not disappoint. Walked out feeling like a completely different (better) person." },
    { name: 'Tyler R.', rating: 5, text: "Best textured crop I've ever had. Carlo actually listens to what you want instead of just doing his go-to cut. Worth the drive to Addison." },
    { name: 'Marcus B.', rating: 4, text: "Great cut, great conversation, fair prices. Only downside is it books up fast — but that's because he's that good." },
    { name: 'Sam K.', rating: 5, text: "Brought my son in for his first real haircut and Carlo made it such an easy, fun experience. We're regulars now." }
  ],
  contact: {
    address: '4951 Airport Pkwy, 6th Floor Suite 600, Addison, TX 75001',
    neighborhood: 'Addison',
    phone: '(469) 555-0192',
    email: 'book@xolarcbarber.com',
    hours: [
      { day: 'Sunday', time: 'Closed' },
      { day: 'Monday', time: 'Closed' },
      { day: 'Tuesday', time: '10:00 AM – 1:00 PM' },
      { day: 'Wednesday', time: '10:00 AM – 1:00 PM' },
      { day: 'Thursday', time: '11:00 AM – 3:00 PM, 4:00 PM – 8:00 PM' },
      { day: 'Friday', time: '11:00 AM – 3:00 PM, 4:00 PM – 8:00 PM' },
      { day: 'Saturday', time: '9:00 AM – 1:00 PM, 2:00 PM – 6:00 PM' }
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

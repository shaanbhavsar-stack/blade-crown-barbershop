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
      category: 'Popular Services',
      items: [
        { name: 'Fade', price: '$90', desc: 'Transform your look with an expert haircut service. Elevate your style and confidence with a precision fade.' },
        { name: 'Fade & Bear', price: '$95', desc: 'A tailored look that enhances your style and sophistication — fade plus full beard sculpt. Experience luxury.' },
        { name: 'All Scissor Haircut', price: '$90', desc: 'A fully hand-scissored cut for natural texture and a soft, blended finish — no clippers needed.' }
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
    'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599387431119-f60be7f9d3e8?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1622296089780-290d715192af?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1974&auto=format&fit=crop'
  ],
  testimonials: [
    { name: 'Anthony', rating: 5, text: "Very helpful and insightful. Gave me exactly what I wanted — definitely coming back." },
    { name: 'Pedro', rating: 5, text: "Super cool guy and did a great job with my haircut, will definitely be going back!" },
    { name: 'Fernando', rating: 5, text: "Highly recommend, great atmosphere. Only started getting compliments on my haircuts after going to Carlo." },
    { name: 'Alejandro', rating: 5, text: "I have never gotten a haircut like I did. I'm definitely coming back." },
    { name: 'Fredi', rating: 5, text: "Carlo is an exceptional barber who deserves endless praise for the precision and care he brings to every haircut. He truly listens to your goals." },
    { name: 'Evan', rating: 5, text: "Best barber in Texas, gives you advice and tips and even tips to take care of hair long term. Good vibes and cares about his client. Best haircut I've gotten." }
  ],
  contact: {
    address: '3939 Belt Line Rd, First Door on the Left, Addison, TX 75001',
    neighborhood: 'Addison',
    booksyUrl: 'https://booksy.com/en-us/548381_xolarc_barber-shop_36501_addison#ba_s=seo',
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

async function loadContent() {
  try {
    const res = await fetch('/.netlify/functions/content');
    if (res.ok) {
      const saved = await res.json();
      if (saved && typeof saved === 'object') {
        const merged = deepMerge(defaultContent, saved);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(merged)); } catch(e) {}
        return merged;
      }
    }
  } catch (e) {}

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === 'object') {
      return deepMerge(defaultContent, saved);
    }
  } catch (e) {}
  return JSON.parse(JSON.stringify(defaultContent));
}

async function saveContent(content) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  try {
    await fetch('/.netlify/functions/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'bladeadmin2025', content })
    });
  } catch (e) {}
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

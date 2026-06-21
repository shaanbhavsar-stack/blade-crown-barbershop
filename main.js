(async function () {
  const content = await loadContent();

  // ---------- HERO ----------
  document.getElementById('hero-img').src = content.hero.image;
  document.getElementById('hero-tagline').textContent = content.hero.tagline;
  document.getElementById('hero-subtext').textContent = content.hero.subtext;

  // ---------- BARBERS ----------
  const barbersGrid = document.getElementById('barbers-grid');
  content.barbers.forEach((b, i) => {
    const card = document.createElement('div');
    const igLinks = {
      'Carlo Reyna':    'https://www.instagram.com/xolarc/',
      'Junior Leos':    'https://www.instagram.com/_jrfadezz/',
      'Tony':           'https://www.instagram.com/tony.blendz/',
      'Issiah Gandara': 'https://www.instagram.com/bigblendzg0/',
      'LV':             'https://www.instagram.com/lvdabarber/',
      'Ricky Villanueva':'https://www.instagram.com/ricky.11/',
    };
    const bookingLinks = {
      'Carlo Reyna':    'https://booksy.com/en-us/548381_xolarc_barber-shop_36501_addison#ba_s=seo',
      'Junior Leos':    'https://booksy.com/en-us/624936_jrfades_barber-shop_36501_addison',
      'Tony':           'https://booksy.com/en-us/instant-experiences/widget/1384582',
      'Issiah Gandara': 'https://www.instagram.com/bigblendzg0/',
      'LV':             'https://lvdabarber.square.site/',
      'Ricky Villanueva':'https://booksy.com/en-us/1609063_rvcutzz_barber-shop_36501_addison',
    };
    const igUrl = igLinks[b.name] || '#';
    const bookUrl = bookingLinks[b.name];
    card.className = 'reveal bg-white border border-stone-dark overflow-hidden flex flex-col card-hover';
    card.style.setProperty('--d', `${i * 80}ms`);
    card.innerHTML = `
      <a href="${igUrl}" target="_blank" rel="noopener" class="block overflow-hidden aspect-square" style="border-radius:0">
        <img src="${b.image}" alt="${b.name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" style="border-radius:0" />
      </a>
      <div class="p-4 sm:p-5 flex flex-col flex-1">
        <h3 class="font-display text-xl sm:text-2xl tracking-wide text-ink">${b.name}</h3>
        <p class="text-ink/40 text-[10px] sm:text-xs uppercase tracking-wider mt-1 leading-snug">${b.specialty}</p>
        <p class="text-[10px] sm:text-xs text-ink/30 mt-0.5">${b.years}</p>
        <p class="text-xs sm:text-sm text-ink/60 mt-2 sm:mt-3 leading-relaxed flex-1">${b.bio}</p>
        ${bookUrl ? `<a href="${bookUrl}" target="_blank" rel="noopener" class="mt-4 sm:mt-5 block text-center bg-ink text-white text-[10px] sm:text-xs uppercase tracking-widest py-2.5 hover:bg-ink/80 transition-colors duration-300">Book Now</a>` : ''}
      </div>
    `;
    barbersGrid.appendChild(card);
  });

  // ---------- GALLERY ----------
  const galleryGrid = document.getElementById('gallery-grid');
  content.gallery.forEach((url, i) => {
    const fig = document.createElement('div');
    fig.className = 'reveal overflow-hidden group';
    fig.style.setProperty('--d', `${(i % 4) * 90}ms`);
    fig.innerHTML = `<img src="${url}" alt="Xolarc Barber Co. gallery photo" class="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-110" />`;
    galleryGrid.appendChild(fig);
  });

  // ---------- TESTIMONIALS ----------
  const testimonialsGrid = document.getElementById('testimonials-grid');
  content.testimonials.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'reveal bg-stone-light border border-stone-dark card-hover p-5 sm:p-7 flex flex-col';
    card.style.setProperty('--d', `${i * 90}ms`);
    const stars = Array.from({ length: 5 }, (_, idx) => `<span class="star">${idx < t.rating ? '★' : '☆'}</span>`).join('');
    card.innerHTML = `
      <div class="text-lg mb-4">${stars}</div>
      <p class="font-serif italic text-ink/70 leading-relaxed flex-1">"${t.text}"</p>
      <p class="mt-6 text-xs uppercase tracking-widest text-ink/40">— ${t.name}</p>
    `;
    testimonialsGrid.appendChild(card);
  });

  // ---------- CONTACT ----------
  document.getElementById('contact-address').textContent = content.contact.address;
  document.getElementById('contact-neighborhood').textContent = `${content.contact.neighborhood} · Dallas, TX`;
  const hoursEl = document.getElementById('contact-hours');
  content.contact.hours.forEach(h => {
    const row = document.createElement('p');
    row.innerHTML = `<span class="text-ink font-medium">${h.day}:</span> <span class="text-ink/50">${h.time}</span>`;
    hoursEl.appendChild(row);
  });

  // ---------- NAV SCROLL STATE ----------
  const nav = document.getElementById('site-nav');
  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('bg-white/95', 'backdrop-blur', 'border-b', 'border-stone-dark', 'shadow-sm');
    } else {
      nav.classList.remove('bg-white/95', 'backdrop-blur', 'border-b', 'border-stone-dark', 'shadow-sm');
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // ---------- MOBILE MENU ----------
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  menuBtn.addEventListener('click', () => menu.classList.toggle('hidden'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.add('hidden')));

  // ---------- SCROLL REVEAL ----------
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
})();

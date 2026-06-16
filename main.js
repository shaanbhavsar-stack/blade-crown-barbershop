(async function () {
  const content = await loadContent();

  // ---------- HERO ----------
  document.getElementById('hero-img').src = content.hero.image;
  document.getElementById('hero-tagline').textContent = content.hero.tagline;
  document.getElementById('hero-subtext').textContent = content.hero.subtext;

  // ---------- ABOUT ----------
  document.getElementById('about-heading').textContent = content.about.heading;
  document.getElementById('about-story').textContent = content.about.story;
  document.getElementById('about-philosophy').textContent = content.about.philosophy;
  document.getElementById('about-founded').textContent = content.about.founded;
  document.getElementById('about-img').src = content.about.image;

  // ---------- SERVICES ----------
  const servicesGrid = document.getElementById('services-grid');
  let serviceIndex = 0;
  content.services.forEach((group) => {
    group.items.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'reveal bg-white/5 border border-white/10 card-hover p-8 flex flex-col';
      card.style.setProperty('--d', `${serviceIndex * 120}ms`);
      card.innerHTML = `
        <div class="flex items-start justify-between gap-4">
          <h3 class="font-display text-2xl tracking-wide text-white">${item.name}</h3>
          <span class="font-display text-2xl text-gold whitespace-nowrap">${item.price}</span>
        </div>
        <p class="text-sm text-white/50 mt-4 leading-relaxed flex-1">${item.desc}</p>
      `;
      servicesGrid.appendChild(card);
      serviceIndex++;
    });
  });
  document.querySelector('#services h2').textContent = 'SERVICES & PRICING';

  // ---------- BARBERS ----------
  const barbersGrid = document.getElementById('barbers-grid');
  content.barbers.forEach((b, i) => {
    const card = document.createElement('div');
    card.className = 'reveal bg-cream border border-black/8 card-hover overflow-hidden group grid md:grid-cols-2';
    card.style.setProperty('--d', `${i * 100}ms`);
    card.innerHTML = `
      <div class="overflow-hidden h-80 md:h-full">
        <img src="${b.image}" alt="${b.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div class="p-8 md:p-12 flex flex-col justify-center">
        <h3 class="font-display text-4xl tracking-wide text-ink">${b.name}</h3>
        <p class="text-gold text-base mt-2">${b.specialty}</p>
        <p class="text-xs uppercase tracking-widest text-ink/40 mt-3">${b.years}</p>
        <p class="text-sm text-ink/60 mt-6 leading-relaxed">${b.bio}</p>
      </div>
    `;
    barbersGrid.appendChild(card);
  });

  // ---------- GALLERY ----------
  const galleryGrid = document.getElementById('gallery-grid');
  content.gallery.forEach((url, i) => {
    const fig = document.createElement('div');
    fig.className = `reveal overflow-hidden group aspect-square ${i === 0 ? 'col-span-2 row-span-2' : ''}`;
    fig.style.setProperty('--d', `${(i % 4) * 90}ms`);
    fig.innerHTML = `<img src="${url}" alt="Xolarc Barber Co. gallery photo" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />`;
    galleryGrid.appendChild(fig);
  });

  // ---------- TESTIMONIALS ----------
  const testimonialsGrid = document.getElementById('testimonials-grid');
  content.testimonials.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'reveal bg-white/5 border border-white/10 card-hover p-8 flex flex-col';
    card.style.setProperty('--d', `${i * 90}ms`);
    const stars = Array.from({ length: 5 }, (_, idx) => `<span class="star">${idx < t.rating ? '★' : '☆'}</span>`).join('');
    card.innerHTML = `
      <div class="text-lg mb-4">${stars}</div>
      <p class="font-serif italic text-white/70 leading-relaxed flex-1">"${t.text}"</p>
      <p class="mt-6 text-sm uppercase tracking-widest text-gold">— ${t.name}</p>
    `;
    testimonialsGrid.appendChild(card);
  });

  // ---------- CONTACT ----------
  document.getElementById('contact-address').textContent = content.contact.address;
  document.getElementById('contact-neighborhood').textContent = `${content.contact.neighborhood} · Dallas, TX`;
  const hoursEl = document.getElementById('contact-hours');
  content.contact.hours.forEach(h => {
    const row = document.createElement('p');
    row.innerHTML = `<span class="text-white">${h.day}:</span> <span class="text-gray-400">${h.time}</span>`;
    hoursEl.appendChild(row);
  });

  // ---------- MOBILE MENU ----------
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => menu.classList.toggle('hidden'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.add('hidden')));
  }

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

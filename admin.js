(function () {
  const ADMIN_PASSWORD = 'bladeadmin2025';
  const SESSION_KEY = 'bladeCrownAdminSession';

  let content = loadContent();

  const loginScreen = document.getElementById('login-screen');
  const dashboard = document.getElementById('dashboard');
  const loginForm = document.getElementById('login-form');
  const passwordInput = document.getElementById('password-input');
  const loginError = document.getElementById('login-error');
  const saveIndicator = document.getElementById('save-indicator');

  function showDashboard() {
    loginScreen.classList.add('hidden');
    dashboard.classList.remove('hidden');
    renderDynamicEditors();
    bindStaticInputs();
  }

  if (sessionStorage.getItem(SESSION_KEY) === 'true') showDashboard();

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (passwordInput.value === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      loginError.classList.add('hidden');
      showDashboard();
    } else {
      loginError.classList.remove('hidden');
      passwordInput.value = '';
    }
  });

  document.getElementById('logout-btn').addEventListener('click', function () {
    sessionStorage.removeItem(SESSION_KEY);
    dashboard.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    passwordInput.value = '';
  });

  document.getElementById('reset-btn').addEventListener('click', function () {
    if (confirm('Reset all content to the original defaults? This cannot be undone.')) {
      resetContent();
      content = loadContent();
      bindStaticInputs();
      renderDynamicEditors();
      flashSaved();
    }
  });

  function flashSaved() {
    saveIndicator.classList.remove('hidden');
    clearTimeout(flashSaved._t);
    flashSaved._t = setTimeout(() => saveIndicator.classList.add('hidden'), 1500);
  }

  function getPath(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  }
  function setPath(obj, path, value) {
    const keys = path.split('.');
    let cur = obj;
    for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
    cur[keys[keys.length - 1]] = value;
  }

  function persist() {
    saveContent(content);
    flashSaved();
  }

  // ---------- STATIC (data-path) INPUTS ----------
  function bindStaticInputs() {
    document.querySelectorAll('.admin-input[data-path]').forEach(el => {
      const path = el.dataset.path;
      el.value = getPath(content, path) ?? '';
      el.oninput = () => {
        setPath(content, path, el.value);
        persist();
      };
    });
  }

  // ---------- SERVICES EDITOR ----------
  function renderServicesEditor() {
    const wrap = document.getElementById('services-editor');
    wrap.innerHTML = '';
    content.services.forEach((group, gi) => {
      const block = document.createElement('div');
      block.className = 'border border-white/10 p-5';
      block.innerHTML = `
        <label class="field-label">Category Name</label>
        <input type="text" value="${escapeAttr(group.category)}" class="cat-input w-full bg-transparent border border-white/20 focus:border-gold outline-none px-4 py-2.5 mb-4" />
        <div class="space-y-4 items-editor"></div>
      `;
      const catInput = block.querySelector('.cat-input');
      catInput.oninput = () => { content.services[gi].category = catInput.value; persist(); };

      const itemsWrap = block.querySelector('.items-editor');
      group.items.forEach((item, ii) => {
        const row = document.createElement('div');
        row.className = 'grid sm:grid-cols-12 gap-3 items-start bg-charcoal border border-white/5 p-4';
        row.innerHTML = `
          <div class="sm:col-span-3">
            <label class="field-label">Name</label>
            <input type="text" value="${escapeAttr(item.name)}" data-k="name" class="item-input w-full bg-transparent border border-white/20 focus:border-gold outline-none px-3 py-2 text-sm" />
          </div>
          <div class="sm:col-span-2">
            <label class="field-label">Price</label>
            <input type="text" value="${escapeAttr(item.price)}" data-k="price" class="item-input w-full bg-transparent border border-white/20 focus:border-gold outline-none px-3 py-2 text-sm" />
          </div>
          <div class="sm:col-span-7">
            <label class="field-label">Description</label>
            <input type="text" value="${escapeAttr(item.desc)}" data-k="desc" class="item-input w-full bg-transparent border border-white/20 focus:border-gold outline-none px-3 py-2 text-sm" />
          </div>
        `;
        row.querySelectorAll('.item-input').forEach(inp => {
          inp.oninput = () => { content.services[gi].items[ii][inp.dataset.k] = inp.value; persist(); };
        });
        itemsWrap.appendChild(row);
      });
      wrap.appendChild(block);
    });
  }

  // ---------- BARBERS EDITOR ----------
  function renderBarbersEditor() {
    const wrap = document.getElementById('barbers-editor');
    wrap.innerHTML = '';
    content.barbers.forEach((b, bi) => {
      const block = document.createElement('div');
      block.className = 'grid sm:grid-cols-2 gap-4 border border-white/10 p-5';
      block.innerHTML = `
        <div>
          <label class="field-label">Name</label>
          <input type="text" value="${escapeAttr(b.name)}" data-k="name" class="b-input w-full bg-transparent border border-white/20 focus:border-gold outline-none px-3 py-2 text-sm" />
        </div>
        <div>
          <label class="field-label">Years Experience</label>
          <input type="text" value="${escapeAttr(b.years)}" data-k="years" class="b-input w-full bg-transparent border border-white/20 focus:border-gold outline-none px-3 py-2 text-sm" />
        </div>
        <div class="sm:col-span-2">
          <label class="field-label">Specialty</label>
          <input type="text" value="${escapeAttr(b.specialty)}" data-k="specialty" class="b-input w-full bg-transparent border border-white/20 focus:border-gold outline-none px-3 py-2 text-sm" />
        </div>
        <div class="sm:col-span-2">
          <label class="field-label">Bio</label>
          <textarea rows="2" data-k="bio" class="b-input w-full bg-transparent border border-white/20 focus:border-gold outline-none px-3 py-2 text-sm">${escapeHtml(b.bio)}</textarea>
        </div>
        <div class="sm:col-span-2">
          <label class="field-label">Avatar Image URL</label>
          <input type="text" value="${escapeAttr(b.image)}" data-k="image" class="b-input w-full bg-transparent border border-white/20 focus:border-gold outline-none px-3 py-2 text-sm" />
        </div>
      `;
      block.querySelectorAll('.b-input').forEach(inp => {
        inp.oninput = () => { content.barbers[bi][inp.dataset.k] = inp.value; persist(); };
      });
      wrap.appendChild(block);
    });
  }

  // ---------- HOURS EDITOR ----------
  function renderHoursEditor() {
    const wrap = document.getElementById('hours-editor');
    wrap.innerHTML = '';
    content.contact.hours.forEach((h, hi) => {
      const row = document.createElement('div');
      row.className = 'grid sm:grid-cols-2 gap-3';
      row.innerHTML = `
        <input type="text" value="${escapeAttr(h.day)}" data-k="day" class="h-input w-full bg-transparent border border-white/20 focus:border-gold outline-none px-3 py-2 text-sm" />
        <input type="text" value="${escapeAttr(h.time)}" data-k="time" class="h-input w-full bg-transparent border border-white/20 focus:border-gold outline-none px-3 py-2 text-sm" />
      `;
      row.querySelectorAll('.h-input').forEach(inp => {
        inp.oninput = () => { content.contact.hours[hi][inp.dataset.k] = inp.value; persist(); };
      });
      wrap.appendChild(row);
    });
  }

  function renderDynamicEditors() {
    renderServicesEditor();
    renderBarbersEditor();
    renderHoursEditor();
  }

  function escapeAttr(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }
  function escapeHtml(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
})();

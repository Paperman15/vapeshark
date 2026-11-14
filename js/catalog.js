/* ==========================================================================
   VAPE SHARK — каталог: фильтры, поиск, сортировка
   ========================================================================== */

(function () {
  'use strict';
  if (!window.VS) return;

  const { PRODUCTS, CATEGORIES, cardHTML, plural, money } = window.VS;

  const el = {
    filters: document.querySelector('[data-filters]'),
    grid: document.querySelector('[data-grid]'),
    chips: document.querySelector('[data-chips]'),
    count: document.querySelector('[data-count]'),
    search: document.querySelector('[data-search]'),
    sort: document.querySelector('[data-sort]'),
    reset: document.querySelectorAll('[data-reset]'),
    toggle: document.querySelector('[data-filters-toggle]')
  };
  if (!el.grid) return;

  const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))].sort((a, b) => a.localeCompare(b, 'ru'));
  const PRICE_MIN = Math.min(...PRODUCTS.map((p) => p.price));
  const PRICE_MAX = Math.max(...PRODUCTS.map((p) => p.price));

  const state = {
    cat: 'all',
    brands: [],
    q: '',
    min: null,
    max: null,
    sort: 'popular'
  };

  /* ---------- Состояние из адреса ---------- */
  function fromURL() {
    const u = new URLSearchParams(location.search);
    const cat = u.get('cat');
    if (cat && CATEGORIES.some((c) => c.id === cat)) state.cat = cat;
    const brands = u.get('brands');
    if (brands) state.brands = brands.split(',').filter((b) => BRANDS.includes(b));
    state.q = u.get('q') || '';
    const min = parseInt(u.get('min'), 10);
    const max = parseInt(u.get('max'), 10);
    state.min = Number.isFinite(min) ? min : null;
    state.max = Number.isFinite(max) ? max : null;
    const sort = u.get('sort');
    if (['price-asc', 'price-desc', 'name'].includes(sort)) state.sort = sort;
  }

  function toURL() {
    const u = new URLSearchParams();
    if (state.cat !== 'all') u.set('cat', state.cat);
    if (state.brands.length) u.set('brands', state.brands.join(','));
    if (state.q.trim()) u.set('q', state.q.trim());
    if (state.min != null) u.set('min', state.min);
    if (state.max != null) u.set('max', state.max);
    if (state.sort !== 'popular') u.set('sort', state.sort);
    const qs = u.toString();
    history.replaceState(null, '', qs ? '?' + qs : location.pathname);
  }

  /* ---------- Фильтры ---------- */
  function countFor(predicate) {
    return PRODUCTS.filter(predicate).length;
  }

  function buildFilters() {
    if (!el.filters) return;
    const catRows = CATEGORIES.map((c) => {
      const n = countFor((p) => p.category === c.id);
      return `
        <label class="filter-option">
          <input type="radio" name="cat" value="${c.id}" ${state.cat === c.id ? 'checked' : ''}>
          <span>${c.name}</span>
          <span class="filter-option__count">${n}</span>
        </label>`;
    }).join('');

    const brandRows = BRANDS.map((b) => {
      const n = countFor((p) => p.brand === b);
      return `
        <label class="filter-option">
          <input type="checkbox" name="brand" value="${b}" ${state.brands.includes(b) ? 'checked' : ''}>
          <span>${b}</span>
          <span class="filter-option__count">${n}</span>
        </label>`;
    }).join('');

    el.filters.innerHTML = `
      <div class="filter-block">
        <div class="filter-block__title">Категория</div>
        <div class="filter-list">
          <label class="filter-option">
            <input type="radio" name="cat" value="all" ${state.cat === 'all' ? 'checked' : ''}>
            <span>Все товары</span>
            <span class="filter-option__count">${PRODUCTS.length}</span>
          </label>
          ${catRows}
        </div>
      </div>

      <div class="filter-block">
        <div class="filter-block__title">Цена, ₽</div>
        <div class="price-range">
          <input type="number" inputmode="numeric" placeholder="от ${PRICE_MIN}" min="0" step="10" data-min aria-label="Цена от" value="${state.min ?? ''}">
          <span>—</span>
          <input type="number" inputmode="numeric" placeholder="до ${PRICE_MAX}" min="0" step="10" data-max aria-label="Цена до" value="${state.max ?? ''}">
        </div>
      </div>

      <div class="filter-block">
        <div class="filter-block__title">Бренд</div>
        <div class="filter-list" style="max-height:260px;overflow:auto">${brandRows}</div>
      </div>

      <button class="filters__reset" type="button" data-reset>Сбросить фильтры</button>
    `;

    el.filters.querySelector('[data-reset]')?.addEventListener('click', resetAll);

    el.filters.querySelectorAll('input[name="cat"]').forEach((input) => {
      input.addEventListener('change', () => {
        state.cat = input.value;
        apply();
      });
    });

    el.filters.querySelectorAll('input[name="brand"]').forEach((input) => {
      input.addEventListener('change', () => {
        state.brands = [...el.filters.querySelectorAll('input[name="brand"]:checked')].map((i) => i.value);
        apply();
      });
    });

    const minInput = el.filters.querySelector('[data-min]');
    const maxInput = el.filters.querySelector('[data-max]');
    let priceTimer;
    const onPrice = () => {
      clearTimeout(priceTimer);
      priceTimer = setTimeout(() => {
        const min = parseInt(minInput.value, 10);
        const max = parseInt(maxInput.value, 10);
        state.min = Number.isFinite(min) && min > 0 ? min : null;
        state.max = Number.isFinite(max) && max > 0 ? max : null;
        apply();
      }, 350);
    };
    minInput.addEventListener('input', onPrice);
    maxInput.addEventListener('input', onPrice);
  }

  function buildChips() {
    if (!el.chips) return;
    const items = [{ id: 'all', name: 'Все' }, ...CATEGORIES];
    el.chips.innerHTML = items
      .map(
        (c) =>
          `<button class="chip ${state.cat === c.id ? 'is-active' : ''}" type="button" data-chip="${c.id}">${c.name}</button>`
      )
      .join('');
    el.chips.querySelectorAll('[data-chip]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.cat = btn.dataset.chip;
        const radio = el.filters?.querySelector(`input[name="cat"][value="${state.cat}"]`);
        if (radio) radio.checked = true;
        apply();
      });
    });
  }

  /* ---------- Выборка ---------- */
  function filtered() {
    let list = PRODUCTS.slice();
    if (state.cat !== 'all') list = list.filter((p) => p.category === state.cat);
    if (state.brands.length) list = list.filter((p) => state.brands.includes(p.brand));
    if (state.min != null) list = list.filter((p) => p.price >= state.min);
    if (state.max != null) list = list.filter((p) => p.price <= state.max);
    const q = state.q.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.brand, p.name, p.meta, p.desc, ...(p.tags || []), ...p.specs.flat()]
          .join(' ')
          .toLowerCase()
          .includes(q)
      );
    }
    switch (state.sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
        break;
      default:
        break;
    }
    return list;
  }

  function render() {
    const list = filtered();

    if (el.count) {
      el.count.innerHTML = list.length
        ? `Найдено <b>${list.length}</b> ${plural(list.length, 'товар', 'товара', 'товаров')}`
        : 'Ничего не найдено';
    }

    if (!list.length) {
      el.grid.innerHTML = `
        <div class="empty" style="grid-column:1/-1">
          <h3>По этим фильтрам пусто</h3>
          <p>Попробуйте изменить категорию или цену — а нужную модель всегда можно спросить в сообщениях.</p>
          <button class="btn btn--panel btn--sm" type="button" data-reset>Сбросить фильтры</button>
        </div>`;
      el.grid.querySelector('[data-reset]')?.addEventListener('click', resetAll);
      return;
    }

    el.grid.innerHTML = list.map(cardHTML).join('');
    requestAnimationFrame(() => {
      el.grid.querySelectorAll('.reveal').forEach((card, i) => {
        card.style.transitionDelay = Math.min(i, 8) * 45 + 'ms';
        card.classList.add('is-in');
      });
    });
  }

  function apply() {
    toURL();
    buildChips();
    render();
  }

  function resetAll() {
    state.cat = 'all';
    state.brands = [];
    state.q = '';
    state.min = null;
    state.max = null;
    state.sort = 'popular';
    if (el.search) el.search.value = '';
    if (el.sort) el.sort.value = 'popular';
    const all = el.filters?.querySelector('input[name="cat"][value="all"]');
    if (all) all.checked = true;
    el.filters?.querySelectorAll('input[name="brand"]').forEach((i) => (i.checked = false));
    const minInput = el.filters?.querySelector('[data-min]');
    const maxInput = el.filters?.querySelector('[data-max]');
    if (minInput) minInput.value = '';
    if (maxInput) maxInput.value = '';
    buildFilters();
    apply();
  }

  /* ---------- Слушатели ---------- */
  function bind() {
    el.reset.forEach((btn) => {
      if (!btn.closest('[data-filters]')) btn.addEventListener('click', resetAll);
    });

    if (el.search) {
      let t;
      el.search.addEventListener('input', () => {
        clearTimeout(t);
        t = setTimeout(() => {
          state.q = el.search.value;
          apply();
        }, 200);
      });
    }

    if (el.sort) {
      el.sort.addEventListener('change', () => {
        state.sort = el.sort.value;
        apply();
      });
    }

    if (el.toggle) {
      el.toggle.addEventListener('click', () => {
        const isOpen = el.filters.classList.toggle('is-open');
        el.toggle.setAttribute('aria-expanded', String(isOpen));
        el.toggle.textContent = isOpen ? 'Скрыть фильтры' : 'Фильтры';
      });
    }
  }

  function init() {
    fromURL();
    if (state.q && el.search) el.search.value = state.q;
    if (state.sort && el.sort) el.sort.value = state.sort;
    buildFilters();
    buildChips();
    render();
    bind();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

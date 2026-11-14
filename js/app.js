/* ==========================================================================
   VAPE SHARK — общая логика: корзина, возрастной фильтр, карточки, мелочи
   ========================================================================== */

(function () {
  'use strict';

  const CART_KEY = 'vs_cart_v2';
  const AGE_KEY = 'vs_age_ok';
  const MIN_ORDER_URL = 'cart.html';

  /* ---------- Иконки ---------- */
  const ICONS = {
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M6 7l1 12.5A1.5 1.5 0 0 0 8.5 21h7a1.5 1.5 0 0 0 1.5-1.5L18 7"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 20s-7.5-4.6-7.5-9.7A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 3.3C19.5 15.4 12 20 12 20z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M6 8h12l1 12H5L6 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>'
  };

  /* ---------- Утилиты ---------- */
  const money = (n) => new Intl.NumberFormat('ru-RU').format(Math.round(n)) + ' ₽';
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const catOf = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
  const plural = (n, one, few, many) => {
    const n10 = n % 10;
    const n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return one;
    if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return few;
    return many;
  };
  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* Цветовой оттенок картинки: стабильный для каждого товара,
     чтобы одинаковые по категории силуэты не выглядели копиями. */
  const TINTS = [0, 18, -18, 40, -40, 65, -65, 95, -95, 130];
  function tint(id) {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 997;
    return TINTS[h % TINTS.length];
  }

  /* ---------- Корзина ---------- */
  const store = {
    read() {
      try {
        const raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
        return Array.isArray(raw) ? raw.filter((i) => i && byId(i.id) && i.qty > 0) : [];
      } catch (e) {
        return [];
      }
    },
    write(items) {
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
      } catch (e) {
        /* приватный режим — работаем без сохранения */
      }
      document.dispatchEvent(new CustomEvent('vs:cart', { detail: items }));
    },
    add(id, qty = 1) {
      if (!byId(id)) return;
      const items = store.read();
      const line = items.find((i) => i.id === id);
      if (line) line.qty = Math.min(99, line.qty + qty);
      else items.push({ id, qty });
      store.write(items);
    },
    setQty(id, qty) {
      let items = store.read();
      if (qty <= 0) items = items.filter((i) => i.id !== id);
      else {
        const line = items.find((i) => i.id === id);
        if (line) line.qty = Math.min(99, qty);
      }
      store.write(items);
    },
    remove(id) {
      store.write(store.read().filter((i) => i.id !== id));
    },
    clear() {
      store.write([]);
    },
    count() {
      return store.read().reduce((s, i) => s + i.qty, 0);
    },
    total() {
      return store.read().reduce((s, i) => {
        const p = byId(i.id);
        return s + (p ? p.price * i.qty : 0);
      }, 0);
    },
    detailed() {
      return store.read().map((i) => {
        const p = byId(i.id);
        return { ...i, product: p, sum: p.price * i.qty };
      });
    }
  };

  /* ---------- Тост ---------- */
  let toastTimer;
  function toast(message) {
    const el = document.querySelector('[data-toast]');
    if (!el) return;
    el.querySelector('[data-toast-text]').textContent = message;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2600);
  }

  /* ---------- Сообщение для WhatsApp ---------- */
  function orderMessage(details) {
    const lines = store.detailed();
    if (!lines.length) return 'Здравствуйте! Подскажите, пожалуйста, по наличию товара в Vape Shark.';
    const d = details || {};
    const out = ['Здравствуйте! Хочу оформить заказ в Vape Shark:', ''];
    lines.forEach((l, i) => {
      out.push(`${i + 1}. ${l.product.brand} ${l.product.name} — ${l.qty} шт. × ${money(l.product.price)} = ${money(l.sum)}`);
    });
    out.push('', `Итого: ${money(store.total())}`);
    if (d.name) out.push(`Имя: ${d.name}`);
    if (d.phone) out.push(`Телефон: ${d.phone}`);
    if (d.method) out.push(`Получение: ${d.method}`);
    if (d.comment) out.push(`Комментарий: ${d.comment}`);
    return out.join('\n');
  }

  function whatsappLink(text) {
    return SITE.whatsapp + '?text=' + encodeURIComponent(text);
  }

  /* ---------- Разметка карточки товара ---------- */
  function cardHTML(p) {
    const cat = catOf(p.category);
    const badges = (p.badges || [])
      .map((b) => {
        const kind = b === 'Скидка' ? 'badge--sale' : b === 'Новинка' ? 'badge--violet' : b === 'Хит' ? 'badge--acid' : '';
        return `<span class="badge ${kind}">${escapeHtml(b)}</span>`;
      })
      .join('');
    return `
      <article class="card reveal" data-product="${p.id}">
        <div class="card__media">
          <div class="card__badges">${badges}</div>
          <a class="card__fav" href="product.html?id=${p.id}" aria-label="Подробнее о ${escapeHtml(p.brand)} ${escapeHtml(p.name)}">${ICONS.heart}</a>
          <img src="${cat.art}" alt="${escapeHtml(p.brand)} ${escapeHtml(p.name)}" loading="lazy" width="300" height="300" style="--tint:${tint(p.id)}deg">
        </div>
        <div class="card__body">
          <div class="card__brand">${escapeHtml(p.brand)}</div>
          <h3 class="card__name"><a href="product.html?id=${p.id}">${escapeHtml(p.name)}</a></h3>
          <div class="card__meta">${escapeHtml(p.meta)}</div>
          <div class="card__foot">
            <div class="card__price">
              ${money(p.price)}
              ${p.oldPrice ? `<span class="card__old">${money(p.oldPrice)}</span>` : ''}
            </div>
            <button class="add-btn" type="button" data-add="${p.id}" aria-label="Добавить ${escapeHtml(p.name)} в корзину">${ICONS.plus}</button>
          </div>
        </div>
      </article>`;
  }

  /* ---------- Отрисовка корзины ---------- */
  const DRAWER_HTML = `
    <div class="scrim" data-scrim hidden></div>
    <aside class="drawer" id="cart-drawer" aria-label="Корзина" aria-hidden="true">
      <div class="drawer__head">
        <div>
          <div class="drawer__title">Корзина</div>
          <div class="drawer__count" data-cart-label>Пока пусто</div>
        </div>
        <button class="icon-btn" type="button" data-cart-close aria-label="Закрыть корзину">${ICONS.close}</button>
      </div>
      <div class="drawer__body" data-cart-body></div>
      <div class="drawer__foot">
        <div class="drawer__total"><span>Итого</span><b data-cart-total>0 ₽</b></div>
        <a class="btn btn--block" href="${MIN_ORDER_URL}" data-cart-checkout>Перейти к оформлению</a>
        <button class="btn btn--panel btn--block" type="button" data-cart-wa>Заказать в WhatsApp</button>
        <p class="drawer__hint">Продажа только лицам старше 18 лет. Наличие и итоговую цену подтверждает менеджер.</p>
      </div>
    </aside>`;

  const GATE_HTML = `
    <div class="gate" id="age-gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div class="gate__card">
        <div class="gate__age" aria-hidden="true">18+</div>
        <h2 class="gate__title" id="gate-title">Вам есть 18 лет?</h2>
        <p class="gate__text">На сайте есть информация о никотиносодержащей продукции. Она предназначена только для совершеннолетних.</p>
        <div class="gate__actions">
          <button class="btn btn--block" type="button" data-gate-yes>Да, мне есть 18</button>
          <button class="btn btn--ghost btn--block" type="button" data-gate-no>Нет, мне меньше 18</button>
        </div>
        <p class="gate__legal">Продажа никотиносодержащей продукции лицам младше 18 лет запрещена. Если вам нет 18 лет, пожалуйста, покиньте сайт.</p>
      </div>
    </div>`;

  const TOAST_HTML = `
    <div class="toast" data-toast role="status" aria-live="polite">${ICONS.check}<span data-toast-text></span></div>`;

  function cartLineHTML(line) {
    const p = line.product;
    const cat = catOf(p.category);
    return `
      <article class="cart-line" data-line="${p.id}">
        <a class="cart-line__media" href="product.html?id=${p.id}" aria-hidden="true" tabindex="-1">
          <img src="${cat.art}" alt="" loading="lazy" width="60" height="60" style="--tint:${tint(p.id)}deg">
        </a>
        <div class="cart-line__body">
          <div class="cart-line__name"><a href="product.html?id=${p.id}">${escapeHtml(p.name)}</a></div>
          <div class="cart-line__meta">${escapeHtml(p.brand)} · ${escapeHtml(p.meta)}</div>
          <div class="qty">
            <button type="button" data-dec="${p.id}" aria-label="Уменьшить количество">${ICONS.minus}</button>
            <span>${line.qty}</span>
            <button type="button" data-inc="${p.id}" aria-label="Увеличить количество">${ICONS.plus}</button>
          </div>
        </div>
        <div class="cart-line__side">
          <div class="cart-line__price">${money(line.sum)}</div>
          <button class="cart-line__remove" type="button" data-remove="${p.id}" aria-label="Удалить ${escapeHtml(p.name)}">${ICONS.trash}</button>
        </div>
      </article>`;
  }

  function renderCart() {
    const lines = store.detailed();
    const body = document.querySelector('[data-cart-body]');
    const label = document.querySelector('[data-cart-label]');
    const totalEl = document.querySelector('[data-cart-total]');
    const checkout = document.querySelector('[data-cart-checkout]');
    const waBtn = document.querySelector('[data-cart-wa]');
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const total = lines.reduce((s, l) => s + l.sum, 0);

    document.querySelectorAll('.js-cart-count').forEach((el) => {
      el.textContent = count;
      el.classList.toggle('is-visible', count > 0);
    });

    if (label) label.textContent = count ? `${count} ${plural(count, 'товар', 'товара', 'товаров')}` : 'Пока пусто';
    if (totalEl) totalEl.textContent = money(total);
    if (checkout) checkout.style.pointerEvents = count ? '' : 'none';
    if (checkout) checkout.style.opacity = count ? '' : '.45';
    if (waBtn) waBtn.disabled = !count;

    if (!body) return;
    if (!lines.length) {
      body.innerHTML = `
        <div class="cart-empty">
          ${ICONS.bag}
          <div>
            <strong style="color:var(--text)">Корзина пуста</strong>
            <p style="font-size:13px;margin-top:4px">Добавьте товары из каталога — оформим заказ за пару минут.</p>
          </div>
          <a class="btn btn--panel btn--sm" href="catalog.html">Перейти в каталог</a>
        </div>`;
      return;
    }
    body.innerHTML = lines.map(cartLineHTML).join('');
  }

  /* ---------- Открытие / закрытие корзины ---------- */
  let lastFocused = null;

  function openCart() {
    const drawer = document.getElementById('cart-drawer');
    const scrim = document.querySelector('[data-scrim]');
    if (!drawer || !scrim) return;
    lastFocused = document.activeElement;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    scrim.hidden = false;
    requestAnimationFrame(() => scrim.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    const close = drawer.querySelector('[data-cart-close]');
    if (close) close.focus();
  }

  function closeCart() {
    const drawer = document.getElementById('cart-drawer');
    const scrim = document.querySelector('[data-scrim]');
    if (!drawer || !scrim) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    scrim.classList.remove('is-open');
    setTimeout(() => {
      if (!scrim.classList.contains('is-open')) scrim.hidden = true;
    }, 300);
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function openGate() {
    const gate = document.getElementById('age-gate');
    if (!gate) return;
    gate.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const yes = gate.querySelector('[data-gate-yes]');
    if (yes) yes.focus();
  }

  function closeGate() {
    const gate = document.getElementById('age-gate');
    if (!gate) return;
    gate.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /* ---------- Инициализация каркаса ---------- */
  function initChrome() {
    if (!document.getElementById('cart-drawer')) {
      document.body.insertAdjacentHTML('beforeend', DRAWER_HTML);
    }
    if (!document.getElementById('age-gate')) {
      document.body.insertAdjacentHTML('beforeend', GATE_HTML);
    }
    if (!document.querySelector('[data-toast]')) {
      document.body.insertAdjacentHTML('beforeend', TOAST_HTML);
    }

    renderCart();

    let ageOk = false;
    try {
      ageOk = localStorage.getItem(AGE_KEY) === '1';
    } catch (e) {
      ageOk = false;
    }
    if (!ageOk) openGate();

    // прямая ссылка на корзину: cart.html#... или любая страница с #cart
    if (location.hash === '#cart') openCart();
  }

  /* ---------- Делегирование событий ---------- */
  function bindGlobal() {
    document.addEventListener('click', (e) => {
      const add = e.target.closest('[data-add]');
      if (add) {
        e.preventDefault();
        const p = byId(add.dataset.add);
        store.add(add.dataset.add, 1);
        if (p) toast(`${p.name} — в корзине`);
        return;
      }

      const inc = e.target.closest('[data-inc]');
      if (inc) {
        const line = store.read().find((i) => i.id === inc.dataset.inc);
        if (line) store.setQty(line.id, line.qty + 1);
        return;
      }

      const dec = e.target.closest('[data-dec]');
      if (dec) {
        const line = store.read().find((i) => i.id === dec.dataset.dec);
        if (line) store.setQty(line.id, line.qty - 1);
        return;
      }

      const rm = e.target.closest('[data-remove]');
      if (rm) {
        store.remove(rm.dataset.remove);
        return;
      }

      if (e.target.closest('[data-cart-open]')) {
        e.preventDefault();
        openCart();
        return;
      }
      if (e.target.closest('[data-cart-close]') || e.target.closest('[data-scrim]')) {
        closeCart();
        return;
      }
      if (e.target.closest('[data-cart-wa]')) {
        if (!store.count()) return;
        window.open(whatsappLink(orderMessage()), '_blank', 'noopener');
        return;
      }

      if (e.target.closest('[data-gate-yes]')) {
        try {
          localStorage.setItem(AGE_KEY, '1');
        } catch (err) {}
        closeGate();
        return;
      }
      if (e.target.closest('[data-gate-no]')) {
        window.location.href = 'https://www.google.com';
        return;
      }

      const burger = e.target.closest('[data-burger]');
      if (burger) {
        document.body.classList.toggle('menu-open');
        const opened = document.body.classList.contains('menu-open');
        burger.setAttribute('aria-expanded', String(opened));
      }

      // карта грузится по клику — быстрее и без сторонних скриптов на старте
      const mapBtn = e.target.closest('[data-map-load]');
      if (mapBtn) {
        const frame = mapBtn.closest('[data-map]');
        if (frame && !frame.querySelector('iframe')) {
          const iframe = document.createElement('iframe');
          iframe.src = frame.dataset.src;
          iframe.title = 'Vape Shark на карте — Тюмень, ул. Восстания, 13';
          iframe.loading = 'lazy';
          iframe.allowFullscreen = true;
          frame.appendChild(iframe);
          const ph = frame.querySelector('.map-placeholder');
          if (ph) {
            ph.style.transition = 'opacity .4s ease';
            ph.style.opacity = '0';
            setTimeout(() => ph.remove(), 420);
          }
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      closeCart();
      closeGate();
      document.body.classList.remove('menu-open');
    });

    document.addEventListener('vs:cart', renderCart);

    // появление блоков при скролле
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
      );
      document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    } else {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
    }

    // FAQ
    document.querySelectorAll('.faq__q').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq__item');
        const isOpen = item.classList.contains('is-open');
        document.querySelectorAll('.faq__item.is-open').forEach((i) => {
          i.classList.remove('is-open');
          i.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // подстановка года
    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Экспорт ---------- */
  window.VS = {
    SITE,
    PRODUCTS,
    CATEGORIES,
    ICONS,
    money,
    byId,
    catOf,
    plural,
    escapeHtml,
    tint,
    cardHTML,
    store,
    toast,
    renderCart,
    openCart,
    closeCart,
    orderMessage,
    whatsappLink
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initChrome();
      bindGlobal();
    });
  } else {
    initChrome();
    bindGlobal();
  }
})();

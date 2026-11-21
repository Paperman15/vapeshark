/* ==========================================================================
   VAPE SHARK — страница товара
   ========================================================================== */

(function () {
  'use strict';
  if (!window.VS) return;

  const { PRODUCTS, byId, catOf, money, cardHTML, escapeHtml, store, toast, tint } = window.VS;

  const root = document.querySelector('[data-pdp]');
  const missing = document.querySelector('[data-pdp-missing]');
  if (!root) return;

  const id = new URLSearchParams(location.search).get('id');
  const product = id ? byId(id) : null;

  function showMissing() {
    root.hidden = true;
    if (missing) missing.hidden = false;
    document.title = 'Товар не найден — Vape Shark';
  }

  function badgeHTML(b) {
    const kind = b === 'Скидка' ? 'badge--sale' : b === 'Новинка' ? 'badge--violet' : b === 'Хит' ? 'badge--acid' : '';
    return `<span class="badge ${kind}">${escapeHtml(b)}</span>`;
  }

  function init() {
    if (!product) return showMissing();

    const cat = catOf(product.category);
    let qty = 1;

    root.hidden = false;

    const img = root.querySelector('[data-pdp-img]');
    img.src = product.art || cat.art;
    img.alt = `${product.brand} ${product.name}`;
    img.style.setProperty('--tint', tint(product.id) + 'deg');

    root.querySelector('[data-pdp-badges]').innerHTML = (product.badges || []).map(badgeHTML).join('');
    root.querySelector('[data-pdp-brand]').textContent = product.brand;
    root.querySelector('[data-pdp-title]').textContent = product.name;
    root.querySelector('[data-pdp-price]').textContent = money(product.price);

    const old = root.querySelector('[data-pdp-old]');
    if (product.oldPrice && product.oldPrice > product.price) {
      old.hidden = false;
      old.textContent = money(product.oldPrice);
    }

    root.querySelector('[data-pdp-specs]').innerHTML =
      `<div class="specs__row"><dt>Категория</dt><dd>${escapeHtml(cat.full)}</dd></div>` +
      product.specs
        .map(([k, v]) => `<div class="specs__row"><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`)
        .join('');

    root.querySelector('[data-pdp-desc]').innerHTML = `<p>${escapeHtml(product.desc)}</p>`;

    // хлебные крошки
    const crumbCat = document.querySelector('[data-crumb-cat]');
    if (crumbCat) {
      crumbCat.outerHTML = `<a href="catalog.html?cat=${cat.id}" data-crumb-cat>${cat.name}</a>`;
    }

    // количество
    const valEl = root.querySelector('[data-qty-val]');
    const waLink = root.querySelector('[data-pdp-wa]');

    function waHref() {
      const text = `Здравствуйте! Хочу забронировать ${product.brand} ${product.name} — ${qty} шт. (${money(
        product.price * qty
      )}). Подскажите, пожалуйста, наличие. Заберу в магазине на Восстания, 13.`;
      return 'https://wa.me/79612017723?text=' + encodeURIComponent(text);
    }

    function paintQty() {
      valEl.textContent = qty;
      if (waLink) waLink.href = waHref();
    }

    root.querySelector('[data-qty-inc]').addEventListener('click', () => {
      qty = Math.min(99, qty + 1);
      paintQty();
    });

    root.querySelector('[data-qty-dec]').addEventListener('click', () => {
      qty = Math.max(1, qty - 1);
      paintQty();
    });

    root.querySelector('[data-pdp-add]').addEventListener('click', () => {
      store.add(product.id, qty);
      toast(`${product.name} — ${qty} шт. в корзине`);
    });

    paintQty();

    // заголовок и мета
    document.title = `${product.brand} ${product.name} — купить в Тюмени | Vape Shark`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', `${product.brand} ${product.name}: ${product.meta}. Купить в Vape Shark, Тюмень, ул. Восстания 13.`);

    // похожие товары
    const relatedWrap = document.querySelector('[data-related-wrap]');
    const relatedGrid = document.querySelector('[data-related]');
    if (relatedWrap && relatedGrid) {
      const same = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);
      const other = PRODUCTS.filter((p) => p.category !== product.category && p.id !== product.id);
      const list = [...same, ...other].slice(0, 4);
      if (list.length) {
        relatedWrap.hidden = false;
        relatedGrid.innerHTML = list.map(cardHTML).join('');
        requestAnimationFrame(() => {
          relatedGrid.querySelectorAll('.reveal').forEach((card, i) => {
            card.style.transitionDelay = i * 55 + 'ms';
            card.classList.add('is-in');
          });
        });
        const all = document.querySelector('[data-related-all]');
        if (all) all.href = `catalog.html?cat=${cat.id}`;
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

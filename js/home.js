/* ==========================================================================
   VAPE SHARK — главная страница
   ========================================================================== */

(function () {
  'use strict';
  if (!window.VS) return;

  const { PRODUCTS, byId, cardHTML } = window.VS;

  const HIT_IDS = [
    'elfbar-bc10000',
    'voopoo-argus-p2',
    'jam-monster-blueberry',
    'voopoo-ito-cartridge',
    'lost-mary-bm5000',
    'voopoo-drag-s2',
    'husky-salt-30',
    'usb-c-33w'
  ];

  function initHits() {
    const holder = document.querySelector('[data-hits]');
    if (!holder) return;
    const limit = Number(holder.dataset.limit || 8);

    const picked = HIT_IDS.map((id) => byId(id)).filter(Boolean);
    if (picked.length < limit) {
      PRODUCTS.forEach((p) => {
        if (picked.length < limit && !picked.includes(p)) picked.push(p);
      });
    }

    holder.innerHTML = picked.slice(0, limit).map(cardHTML).join('');
    requestAnimationFrame(() => {
      holder.querySelectorAll('.reveal').forEach((el, i) => {
        el.style.transitionDelay = i * 55 + 'ms';
        el.classList.add('is-in');
      });
    });
  }

  function init() {
    initHits();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

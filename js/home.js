/* ==========================================================================
   VAPE SHARK — главная страница
   ========================================================================== */

(function () {
  'use strict';
  if (!window.VS) return;

  const { PRODUCTS, byId, cardHTML } = window.VS;

  const HIT_IDS = [
    'vaporesso-xros-6-cosmic',
    'lost-mary-bm-16000',
    'faff-melon',
    'vaporesso-xros-pod-06-2ml',
    'catswill-salt-pear-lime-mint',
    'indosour-watermelon',
    'geekvape-aegis-hero-5-red',
    'hungry-milk-cookie'
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

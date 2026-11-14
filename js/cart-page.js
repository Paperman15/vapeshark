/* ==========================================================================
   VAPE SHARK — корзина и бронирование
   ========================================================================== */

(function () {
  'use strict';
  if (!window.VS) return;

  const { store, money, byId, catOf, escapeHtml, toast, orderMessage, whatsappLink, plural, tint } = window.VS;

  const el = {
    list: document.querySelector('[data-cart-list]'),
    empty: document.querySelector('[data-cart-empty]'),
    actions: document.querySelector('[data-cart-actions]'),
    form: document.querySelector('[data-order-form]'),
    summaryEmpty: document.querySelector('[data-summary-empty]'),
    success: document.querySelector('[data-success]'),
    successWa: document.querySelector('[data-success-wa]'),
    copy: document.querySelector('[data-copy]'),
    clear: document.querySelector('[data-clear]'),
    sumCount: document.querySelector('[data-sum-count]'),
    sumTotal: document.querySelector('[data-sum-total]'),
    sumGrand: document.querySelector('[data-sum-grand]')
  };
  if (!el.list) return;

  let lastMessage = '';

  function rowHTML(line) {
    const p = line.product;
    const cat = catOf(p.category);
    return `
      <article class="cart-row" data-row="${p.id}">
        <a class="cart-row__media" href="product.html?id=${p.id}" tabindex="-1" aria-hidden="true">
          <img src="${cat.art}" alt="" width="80" height="80" loading="lazy" style="--tint:${tint(p.id)}deg">
        </a>
        <div>
          <div class="cart-row__brand">${escapeHtml(p.brand)}</div>
          <div class="cart-row__name"><a href="product.html?id=${p.id}">${escapeHtml(p.name)}</a></div>
          <div class="cart-row__meta">${escapeHtml(p.meta)}</div>
          <div class="qty" style="margin-top:10px">
            <button type="button" data-dec="${p.id}" aria-label="Уменьшить количество">−</button>
            <span>${line.qty}</span>
            <button type="button" data-inc="${p.id}" aria-label="Увеличить количество">+</button>
          </div>
        </div>
        <div class="cart-row__side">
          <div class="cart-row__price">${money(line.sum)}</div>
          <button class="cart-line__remove" type="button" data-remove="${p.id}" aria-label="Удалить ${escapeHtml(p.name)}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M6 7l1 12.5A1.5 1.5 0 0 0 8.5 21h7a1.5 1.5 0 0 0 1.5-1.5L18 7"/></svg>
            Удалить
          </button>
        </div>
      </article>`;
  }

  function render() {
    const lines = store.detailed();
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const total = lines.reduce((s, l) => s + l.sum, 0);

    el.list.innerHTML = lines.map(rowHTML).join('');

    const isEmpty = !lines.length;
    if (el.empty) el.empty.hidden = !isEmpty;
    if (el.actions) el.actions.hidden = isEmpty;
    if (el.form) el.form.hidden = isEmpty;
    if (el.summaryEmpty) el.summaryEmpty.hidden = !isEmpty;
    if (el.success) el.success.hidden = true;

    if (el.sumCount) el.sumCount.textContent = count + ' ' + plural(count, 'шт.', 'шт.', 'шт.');
    if (el.sumTotal) el.sumTotal.textContent = money(total);
    if (el.sumGrand) el.sumGrand.textContent = money(total);
  }

  function fieldError(name, hasError) {
    const field = el.form?.querySelector(`[data-field="${name}"]`);
    if (field) field.classList.toggle('field--error', hasError);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!el.form) return;

    const data = new FormData(el.form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const comment = String(data.get('comment') || '').trim();

    const phoneDigits = phone.replace(/\D/g, '');
    const nameBad = name.length < 2;
    const phoneBad = phoneDigits.length < 10;

    fieldError('name', nameBad);
    fieldError('phone', phoneBad);

    if (nameBad || phoneBad) {
      const firstBad = el.form.querySelector('.field--error input');
      if (firstBad) firstBad.focus();
      toast('Заполните имя и телефон');
      return;
    }

    lastMessage = orderMessage({ name, phone, comment });
    const url = whatsappLink(lastMessage);

    if (el.successWa) el.successWa.href = url;
    window.open(url, '_blank', 'noopener');

    if (el.success) el.success.hidden = false;
    el.form.hidden = true;
  }

  function onCopy() {
    if (!lastMessage) return;
    const done = () => toast('Текст брони скопирован');
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(lastMessage).then(done, () => fallbackCopy());
    } else {
      fallbackCopy();
    }

    function fallbackCopy() {
      const ta = document.createElement('textarea');
      ta.value = lastMessage;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        done();
      } catch (err) {
        toast('Не удалось скопировать');
      }
      document.body.removeChild(ta);
    }
  }

  function init() {
    render();

    if (el.form) el.form.addEventListener('submit', onSubmit);

    document.addEventListener('vs:cart', () => {
      render();
    });

    if (el.clear) {
      el.clear.addEventListener('click', () => {
        if (!store.count()) return;
        store.clear();
        toast('Корзина очищена');
      });
    }

    if (el.copy) el.copy.addEventListener('click', onCopy);

    // маска-подсказка для телефона: оставляем только цифры и служебные символы
    const phoneInput = el.form?.querySelector('#o-phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        let v = phoneInput.value.replace(/[^\d+()\-\s]/g, '');
        if (v.length > 20) v = v.slice(0, 20);
        phoneInput.value = v;
        fieldError('phone', false);
      });
    }
    const nameInput = el.form?.querySelector('#o-name');
    if (nameInput) {
      nameInput.addEventListener('input', () => fieldError('name', false));
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

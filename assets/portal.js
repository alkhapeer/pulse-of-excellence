/* ═══════════════════════════════════════════
   نبض التميز — Portal Logic
   (يحفظ اختيار اللغة في localStorage)
   ═══════════════════════════════════════════ */
(function() {
  'use strict';

  document.querySelectorAll('.lang-card').forEach(card => {
    card.addEventListener('click', () => {
      const lang = card.dataset.lang || (card.getAttribute('href') || '').startsWith('en') ? 'en' : 'ar';
      try { localStorage.setItem('nabd_lang', lang); } catch(e) {}
    });
  });

})();

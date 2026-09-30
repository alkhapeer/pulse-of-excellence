/* ═══════════════════════════════════════════
   نبض التميز — Portal Logic
   (منطق بسيط: تسجيل اختيار اللغة في localStorage)
   ═══════════════════════════════════════════ */

(function() {
  'use strict';

  // حفظ اختيار اللغة عند الضغط على بطاقة
  document.querySelectorAll('.lang-card').forEach(card => {
    card.addEventListener('click', () => {
      const href = card.getAttribute('href') || '';
      const lang = href.startsWith('en') ? 'en' : 'ar';
      try {
        localStorage.setItem('nabd_lang', lang);
      } catch(e) {}
    });
  });

})();

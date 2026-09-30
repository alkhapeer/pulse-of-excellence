/* ═══════════════════════════════════════════
   نبض التميز — Portal Logic
   ═══════════════════════════════════════════ */

(function() {
  'use strict';

  const $ = s => document.querySelector(s);

  /* ═══════════════════════════════════════════
     🔐 منطق الحماية
     
     ⚠️ استبدل هذه الدالة بمنطق الحماية الحقيقي عندك
     
     يمكن أن تكون:
     - fetch إلى خادم تحقق
     - مقارنة بكود ثابت
     - قراءة من localStorage
     - أو أي منطق آخر
  ═══════════════════════════════════════════ */
  async function validateAccess(username, password) {
    // محاكاة اتصال بالخادم
    await new Promise(r => setTimeout(r, 600));

    if (!username || !password) {
      return { ok: false, msg: 'الرجاء ملء الحقول' };
    }

    // ───── للتجربة الحالية: قبول أي بيانات ─────
    return { ok: true };

    // ───── مثال 1: تحقق ثابت ─────
    // if (username === 'hero' && password === 'hero2026') return { ok: true };
    // return { ok: false, msg: 'بيانات الدخول غير صحيحة' };

    // ───── مثال 2: تحقق من الخادم ─────
    // try {
    //   const res = await fetch('https://api.hero1.vip/verify', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    //   });
    //   const data = await res.json();
    //   return data.valid ? { ok: true } : { ok: false, msg: data.message };
    // } catch(err) {
    //   return { ok: false, msg: 'تعذّر الاتصال بالخادم' };
    // }
  }

  /* ═════════ عناصر DOM ═════════ */
  const protection = $('#protection');
  const portal = $('#portal');
  const loginForm = $('#loginForm');
  const loginUser = $('#loginUser');
  const loginPass = $('#loginPass');
  const loginBtn = $('#loginBtn');
  const loginError = $('#loginError');
  const installBtn = $('#installBtn');

  /* ═════════ الجلسة السابقة ═════════ */
  function checkExistingSession() {
    try {
      if (localStorage.getItem('nabd_auth') === 'ok') {
        showPortal();
      }
    } catch(e) {}
  }

  function showPortal() {
    if (protection) protection.classList.add('hidden');
    if (portal) portal.classList.remove('hidden');
  }

  /* ═════════ نموذج الدخول ═════════ */
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      loginError.textContent = '';
      loginBtn.disabled = true;
      loginBtn.textContent = 'جارٍ التحقق...';

      try {
        const res = await validateAccess(loginUser.value.trim(), loginPass.value);
        if (res.ok) {
          try { localStorage.setItem('nabd_auth', 'ok'); } catch(e) {}
          showPortal();
        } else {
          loginError.textContent = res.msg || 'فشل التحقق';
        }
      } catch (err) {
        loginError.textContent = 'حدث خطأ، حاول مرة أخرى';
      } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = 'دخول';
      }
    });
  }

  /* ═════════ PWA Install ═════════ */
  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.classList.remove('hidden');
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') installBtn.classList.add('hidden');
      deferredPrompt = null;
    });
  }

  window.addEventListener('appinstalled', () => {
    if (installBtn) installBtn.classList.add('hidden');
  });

  /* ═════════ Service Worker ═════════ */
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  /* ═════════ التشغيل ═════════ */
  checkExistingSession();

})();
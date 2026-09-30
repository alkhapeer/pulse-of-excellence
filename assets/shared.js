/* ═══════════════════════════════════════════
   نبض التميز — Shared Components
   يُستدعى من كل صفحة (index, ar, en)
   ═══════════════════════════════════════════ */

(function() {
  'use strict';

  const $ = s => document.querySelector(s);

  /* ═════════════ البيانات الثابتة ═════════ */
  const LINKS = {
    academy: 'https://app.hero1.vip',
    academyDisplay: 'app.hero1.vip',
    telegram: 'https://t.me/Herocourses',
    whatsapp: 'https://wa.me/249915886600',
    about: 'https://app.hero1.vip/#about'
  };

  /* ═════════ شعار الأكاديمية (SVG) ═════════ */
  const LOGO_SVG = `
    <svg viewBox="0 0 64 64" width="20" height="20" fill="none"
         stroke="#fff" stroke-width="3.4" stroke-linecap="round">
      <path d="M8 32h10l4-12 8 24 6-18 4 6h16"/>
    </svg>
  `;

  /* ═════════ إنشاء الفوتر ═════════ */
  function buildFooter() {
    const lang = document.documentElement.lang || 'ar';
    const isAr = lang.startsWith('ar');

    const labels = isAr ? {
      support: 'الدعم الفني',
      telegram: 'تيليجرام',
      whatsapp: 'واتساب',
      about: 'عن الأكاديمية',
      copyright: 'أكاديمية هيرو'
    } : {
      support: 'Support',
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      about: 'About',
      copyright: 'Hero Academy'
    };

    const footer = document.createElement('footer');
    footer.className = 'nabd-footer';
    footer.innerHTML = `
      <div class="nf-inner">
        <a class="nf-brand" href="${LINKS.academy}" target="_blank" rel="noopener">
          <span class="nf-logo">${LOGO_SVG}</span>
          <span class="nf-brand-text">
            <strong>${isAr ? 'أكاديمية هيرو' : 'Hero Academy'}</strong>
            <small>${LINKS.academyDisplay}</small>
          </span>
        </a>

        <div class="nf-title">${labels.support}</div>

        <div class="nf-links">
          <a href="${LINKS.telegram}" target="_blank" rel="noopener">
            <span>💬</span><span>${labels.telegram}</span>
          </a>
          <a href="${LINKS.whatsapp}" target="_blank" rel="noopener">
            <span>📱</span><span>${labels.whatsapp}</span>
          </a>
          <a href="${LINKS.about}" target="_blank" rel="noopener">
            <span>ℹ️</span><span>${labels.about}</span>
          </a>
        </div>

        <div class="nf-copy">© 2026 ${labels.copyright}</div>
      </div>
    `;
    return footer;
  }

  /* ═════════ إنشاء زر التثبيت ═════════ */
  function buildInstallButton() {
    const lang = document.documentElement.lang || 'ar';
    const isAr = lang.startsWith('ar');
    const btn = document.createElement('button');
    btn.className = 'nabd-install';
    btn.id = 'nabdInstall';
    btn.type = 'button';
    btn.setAttribute('aria-label', isAr ? 'تثبيت التطبيق' : 'Install App');
    btn.innerHTML = `
      <span class="ni-ic">📲</span>
      <span class="ni-tx">${isAr ? 'ثبّت التطبيق' : 'Install App'}</span>
    `;
    return btn;
  }

  /* ═════════ إدراج CSS الديناميكي ═════════ */
  function injectSharedStyles() {
    if (document.getElementById('nabdSharedStyles')) return;
    const style = document.createElement('style');
    style.id = 'nabdSharedStyles';
    style.textContent = `
      /* ───── Nabd Footer ───── */
      .nabd-footer {
        position: relative;
        z-index: 1;
        max-width: 500px;
        margin: 20px auto 0;
        padding: 0 20px calc(env(safe-area-inset-bottom, 0px) + 100px);
      }

      .nf-inner {
        padding: 20px 18px;
        border-radius: 22px;
        background: rgba(255,255,255,.06);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,.1);
        display: flex;
        flex-direction: column;
        gap: 14px;
        text-align: center;
      }

      .nf-brand {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        color: #fff;
        padding: 10px 14px;
        border-radius: 14px;
        background: rgba(255,255,255,.06);
        border: 1px solid rgba(255,255,255,.08);
        transition: all .2s;
        align-self: center;
      }

      .nf-brand:hover { background: rgba(255,255,255,.12); }

      .nf-logo {
        width: 34px;
        height: 34px;
        border-radius: 11px;
        background: linear-gradient(135deg, #7C3AED 0%, #FF6B9D 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .nf-brand-text {
        display: flex;
        flex-direction: column;
        text-align: start;
      }

      .nf-brand-text strong {
        font-size: 14px;
        font-weight: 900;
        line-height: 1.2;
      }

      .nf-brand-text small {
        font-size: 11px;
        color: rgba(255,255,255,.6);
        font-weight: 700;
        margin-top: 2px;
        direction: ltr;
      }

      .nf-title {
        font-size: 11.5px;
        font-weight: 800;
        color: rgba(255,255,255,.55);
        letter-spacing: 1px;
        text-transform: uppercase;
        margin-top: 4px;
      }

      .nf-links {
        display: flex;
        justify-content: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .nf-links a {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 9px 14px;
        border-radius: 999px;
        background: rgba(255,255,255,.06);
        color: rgba(255,255,255,.9);
        text-decoration: none;
        font-size: 12.5px;
        font-weight: 700;
        transition: all .2s;
        border: 1px solid rgba(255,255,255,.08);
      }

      .nf-links a:hover {
        background: rgba(255,255,255,.14);
        color: #fff;
        transform: translateY(-1px);
      }

      .nf-links a span:first-child { font-size: 15px; }

      .nf-copy {
        font-size: 11px;
        color: rgba(255,255,255,.4);
        font-weight: 600;
        margin-top: 4px;
      }

      /* ───── Install Button (Floating) ───── */
      .nabd-install {
        position: fixed;
        bottom: calc(env(safe-area-inset-bottom, 0px) + 20px);
        inset-inline-end: 20px;
        z-index: 90;
        display: none;
        align-items: center;
        gap: 8px;
        padding: 12px 18px;
        border-radius: 999px;
        border: none;
        background: linear-gradient(135deg, #06D6A0 0%, #4ECDC4 100%);
        color: #fff;
        font-family: inherit;
        font-size: 14px;
        font-weight: 800;
        cursor: pointer;
        box-shadow: 0 12px 32px rgba(6,214,160,.4);
        transition: all .2s;
        animation: nabdInstallIn .4s cubic-bezier(.22,1,.36,1);
      }

      .nabd-install.visible { display: inline-flex; }

      .nabd-install:active { transform: scale(.95); }

      .nabd-install .ni-ic { font-size: 18px; }

      @keyframes nabdInstallIn {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* Light theme adjustments */
      html[data-theme="light"] .nabd-footer .nf-inner,
      html[data-theme="light"] .nf-brand,
      html[data-theme="light"] .nf-links a {
        background: rgba(15,11,31,.06);
        border-color: rgba(15,11,31,.1);
        color: #0E0B1F;
      }

      html[data-theme="light"] .nf-brand-text small,
      html[data-theme="light"] .nf-title,
      html[data-theme="light"] .nf-copy {
        color: rgba(15,11,31,.55);
      }

      html[data-theme="light"] .nf-links a:hover {
        background: rgba(15,11,31,.12);
      }
    `;
    document.head.appendChild(style);
  }

  /* ═════════ إدراج العناصر في الصفحة ═════════ */
  function injectComponents() {
    // Footer — في نهاية <body> (بعد <main>)
    if (!document.querySelector('.nabd-footer')) {
      const footer = buildFooter();
      const main = document.querySelector('main');
      if (main && main.parentNode) {
        main.parentNode.insertBefore(footer, main.nextSibling);
      } else {
        document.body.appendChild(footer);
      }
    }

    // Install Button — ملتصق أسفل الشاشة
    if (!document.getElementById('nabdInstall')) {
      const btn = buildInstallButton();
      document.body.appendChild(btn);
    }
  }

  /* ═════════ منطق PWA Install ═════════ */
  function setupInstall() {
    let deferredPrompt = null;
    const btn = document.getElementById('nabdInstall');
    if (!btn) return;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      btn.classList.add('visible');
    });

    btn.addEventListener('click', async () => {
      if (!deferredPrompt) {
        // على iOS: تعليمات يدوية
        const lang = document.documentElement.lang || 'ar';
        const msg = lang.startsWith('ar')
          ? 'للتثبيت على iPhone: اضغط زر المشاركة ← أضف إلى الشاشة الرئيسية'
          : 'To install on iPhone: tap Share ← Add to Home Screen';
        alert(msg);
        return;
      }
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        btn.classList.remove('visible');
      }
      deferredPrompt = null;
    });

    window.addEventListener('appinstalled', () => {
      btn.classList.remove('visible');
    });
  }

  /* ═════════ تسجيل Service Worker ═════════ */
  function registerSW() {
    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
      });
    }
  }

  /* ═════════ التشغيل ═════════ */
  function init() {
    injectSharedStyles();
    injectComponents();
    setupInstall();
    registerSW();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ═════════ تصدير مرجع (اختياري) ═════════ */
  window.NabdShared = {
    LINKS: LINKS,
    LOGO_SVG: LOGO_SVG
  };

})();

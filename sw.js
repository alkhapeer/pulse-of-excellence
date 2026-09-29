/* نبض التميز v5.0 — Service Worker with Auto-Update */
const CACHE_VERSION = 'nabd-v5.0.0';
const CACHE_STATIC = CACHE_VERSION + '-static';
const CACHE_DYNAMIC = CACHE_VERSION + '-dynamic';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './data/questions.json',
  './data/activities.json',
  './data/i18n-ar.json',
  './data/i18n-en.json'
];

/* ============ Install ============ */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ============ Activate ============ */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => !k.startsWith(CACHE_VERSION))
            .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ============ Fetch ============ */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // API/version.json: network-first (always fresh)
  if (url.pathname.endsWith('/version.json') || url.pathname.includes('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Data files: network-first with cache fallback
  if (url.pathname.includes('/data/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Static assets: cache-first
  event.respondWith(cacheFirst(request));
});

async function networkFirst(request) {
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) {
      const cache = await caches.open(CACHE_DYNAMIC);
      cache.put(request, fresh.clone());
    }
    return fresh;
  } catch (e) {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Fallback for HTML
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('./index.html');
    }
    return new Response('Offline', { status: 503 });
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) {
      const cache = await caches.open(CACHE_STATIC);
      cache.put(request, fresh.clone());
    }
    return fresh;
  } catch (e) {
    return new Response('Offline', { status: 503 });
  }
}

/* ============ Message handling ============ */
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data?.type === 'CHECK_UPDATE') {
    // Force re-check by fetching version.json
    event.waitUntil(checkVersion());
  }
});

async function checkVersion() {
  try {
    const res = await fetch('/version.json?t=' + Date.now(), { cache: 'no-store' });
    const data = await res.json();
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({ type: 'VERSION_CHECK', data });
    });
  } catch (e) {
    console.warn('Version check failed:', e);
  }
}

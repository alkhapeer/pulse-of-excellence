/* نبض التميز — Service Worker with Auto-Update */
const CACHE_VERSION = 'nabd-v1.5.0';
const CACHE_STATIC  = CACHE_VERSION + '-static';
const CACHE_DYNAMIC = CACHE_VERSION + '-dynamic';

const STATIC_ASSETS = [
  './',
  './index.html',
  './ar.html',
  './en.html',
  './manifest.json',
  './assets/app.css',
  './assets/app.js',
  './assets/portal.css',
  './assets/portal.js',
  './assets/shared.js',
  './icon-192.png',
  './icon-512.png'
];

/* ============ Install ============ */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then(cache => {
      // cache.add per-file with catch: prevents total install failure
      return Promise.all(
        STATIC_ASSETS.map(url =>
          cache.add(url).catch(err => console.warn('[SW] skip:', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

/* ============ Activate ============ */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => !k.startsWith(CACHE_VERSION))
          .map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

/* ============ Fetch ============ */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // let cross-origin pass

  if (url.pathname.endsWith('/version.json') || url.pathname.includes('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }
  if (url.pathname.includes('/data/')) {
    event.respondWith(networkFirst(request));
    return;
  }
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

/* ============ Messages ============ */
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

/* MONO offline shell. Network first, cache as fallback. No third-party requests. */
const VERSION = 'mono-3.0.0';
const ASSETS = [
  './',
  './index.html',
  './css/mono.css',
  './js/mono.js',
  './manifest.webmanifest',
  './icons/favicon-32.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './fonts/prompt-thai-400-normal.woff2',
  './fonts/prompt-thai-500-normal.woff2',
  './fonts/prompt-thai-600-normal.woff2',
  './fonts/prompt-thai-700-normal.woff2',
  './fonts/prompt-latin-400-normal.woff2',
  './fonts/prompt-latin-500-normal.woff2',
  './fonts/prompt-latin-600-normal.woff2',
  './fonts/prompt-latin-700-normal.woff2',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    try {
      const fresh = await fetch(req);
      if (fresh && fresh.ok) {
        const cache = await caches.open(VERSION);
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch {
      const cached = await caches.match(req);
      if (cached) return cached;
      if (req.mode === 'navigate') {
        const home = await caches.match('./index.html');
        if (home) return home;
      }
      return new Response('ออฟไลน์ และยังไม่มีไฟล์นี้ในเครื่อง', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
  })());
});

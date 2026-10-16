var V = 'pharos-v2';
var ARCHIVOS = ["./", "index.html", "fonts.css", "manifest.webmanifest", "sol-180.png", "sol-192.png", "sol-512.png", "fonts/barlow-latin-400-normal.woff2", "fonts/barlow-latin-500-normal.woff2", "fonts/barlow-latin-600-normal.woff2", "fonts/barlow-latin-700-normal.woff2", "fonts/barlow-condensed-latin-600-normal.woff2", "fonts/barlow-condensed-latin-700-normal.woff2", "fonts/cinzel-latin-600-normal.woff2", "fonts/cinzel-latin-700-normal.woff2", "fonts/gfs-didot-latin-400-normal.woff2", "fonts/gfs-didot-greek-400-normal.woff2"];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(V).then(function (c) { return c.addAll(ARCHIVOS); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || fetch(e.request).catch(function () { return caches.match('index.html'); }); }));
});

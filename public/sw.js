const CACHE = "listen-shell-v1";
const SHELL = ["/", "/manifest.json", "/icon.svg"];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  // App shell only: don't cache authenticated/API data or large audio files.
  if (req.destination === "audio" || new URL(req.url).pathname.startsWith("/api/")) return;
  event.respondWith(fetch(req).then((res) => {
    if (res.ok && (req.mode === "navigate" || SHELL.includes(new URL(req.url).pathname))) {
      const copy = res.clone(); caches.open(CACHE).then((cache) => cache.put(req, copy));
    }
    return res;
  }).catch(() => caches.match(req).then((cached) => cached || caches.match("/"))));
});

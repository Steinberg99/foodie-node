const RUNTIME_CACHE = "runtime-cache";
const CORE_CACHE = "cache-v1";
const CORE_ASSETS = ["/offline", "/index.css", "/index.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CORE_CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.headers.get("accept").includes("text/html")) {
    event.respondWith(
      caches
        .open(RUNTIME_CACHE)
        .then((cache) => cache.match(event.request))
        .then((response) => response || fetchAndCache(event.request))
        .catch(() => caches.open(CORE_CACHE).then((cache) => cache.match("/offline"))),
    );
  }
});

const fetchAndCache = (request) => {
  return fetch(request)
    .then(response => {
      const clone = response.clone();

      caches.open(RUNTIME_CACHE)
        .then(cache => cache.put(request, clone))

      return response;
    })
}

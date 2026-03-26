const cacheName = "DefaultCompany-DegitalCard-0.1.0";
const contentToCache = [
    "Build/6275410f9bed4691b7b9a1694357738c.loader.js",
    "Build/f5e36224b7652240724ec457a0ce9932.framework.js",
    "Build/c29a976e575c2575035e94b6d6599977.data",
    "Build/cdbebdd7f37a4a3bec22f84edb42123e.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});

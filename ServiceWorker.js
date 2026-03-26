const cacheName = "DefaultCompany-DegitalCard-0.1.0";
const contentToCache = [
    "Build/0e0a833777b91ad7ebff70881cf3517b.loader.js",
    "Build/f5e36224b7652240724ec457a0ce9932.framework.js",
    "Build/87bfc730e2d371501a1036ce4c707af8.data",
    "Build/facde17ff37a0de1fe2999927aaff9bd.wasm",
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

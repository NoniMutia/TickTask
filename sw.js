self.addEventListener("install", function (event) {
    event.waitUntil(
      caches.open("timerize-cache").then(function (cache) {
        return cache.addAll([
          "index.html",
          "styles.css",
          "script.js",
          "favicon/favicon-192x192.png"
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", function (event) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    );
  });
  
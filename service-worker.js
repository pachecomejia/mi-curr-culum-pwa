// Archivo: service-worker.js

// Define el nombre de tu caché
const CACHE_NAME = "micv-cache-v1";

// Archivos a cachear
const urlsToCache = [
  "/",
  "/index.html",
  "/css/style.css",
  "/images/perfil.jpg",
  "/images/icono.jpg",
  "/js/app.js"
];

// Instalación del Service Worker
self.addEventListener("install", event => {
  // Realiza la instalación del Service Worker y guarda los recursos en caché
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activación del Service Worker
self.addEventListener("activate", event => {
  // Borra los cachés que no corresponden al actual
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepción de solicitudes
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si se encuentra la respuesta en caché, se retorna la respuesta en caché
        if (response) {
          return response;
        }

        // Si no se encuentra en caché, se realiza la solicitud a la red y se guarda en caché la respuesta
        return fetch(event.request).then(response => {
          // Si la respuesta no es válida, no se guarda en caché
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          // Si la respuesta es válida, se clona para poder guardarla en caché y se retorna
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache));
          return response;
        });
      })
  );
});

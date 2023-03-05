
// Registrando el Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      console.log('Service Worker registrado con éxito: ', registration.scope);
    }, function(err) {
      console.log('Error al registrar el Service Worker: ', err);
    });
  });
}

// Instalando y activando el Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mi-cache').then(function(cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/css/style.css",
        "/images/perfil.jpg",
        "/images/icono.jpg",
        "/js/app.js"
       
      ]);
    })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

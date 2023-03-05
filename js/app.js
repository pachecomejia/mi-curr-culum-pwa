window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registrado exitosamente:', registration.scope);
        })
        .catch(error => {
          console.log('Error al registrar el Service Worker:', error);
        });
    }
  });
  
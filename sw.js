self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    // Bildirime tıklandığında açık olan sekmeyi öne getir
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((windowClients) => {
            if (windowClients.length > 0) {
                windowClients[0].focus();
            }
        })
    );
});

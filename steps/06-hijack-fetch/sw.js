this.addEventListener('fetch', function(event) {
    console.log('intercepted fetch event', event);
    event.respondWith(new Response('hijacked'));
});
this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('sw-intro-07.1').then(function(cache) {
            return cache.addAll([
                './',
                '../assets/app.css',
                '../assets/app.js'
            ]);
        })
    );
});

this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if(response) {
                    console.log('found cached response', response);
                    return response;
                } else {
                    console.log('response not in cache, fetching it');
                    return fetch(event.request);
                }
            })
    );
});
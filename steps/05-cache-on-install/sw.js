this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('sw-intro-5.1').then(function(cache) {
            return cache.addAll([
                './',
                '../assets/app.css',
                '../assets/app.js'
            ]);
        })
    );
});
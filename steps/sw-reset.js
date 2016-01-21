this.addEventListener('install', function(event) {
    var CACHE_PREFIX = 'sw-intro-';
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return (cacheName.substr(0,CACHE_PREFIX.length) === CACHE_PREFIX);
                })
                .map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
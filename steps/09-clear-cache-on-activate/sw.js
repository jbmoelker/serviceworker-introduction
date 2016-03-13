var currentCacheName = 'sw-intro-9.2';

this.addEventListener('install', function(event) {
	// we cache two versions of our app
	// just to illustrate we can delete a cache on activation
	event.waitUntil(
		Promise.all([
			caches.open('sw-intro-9.1').then(function(cache) {
				console.log('caching', 'sw-intro-9.1');
				return cache.addAll([
					'./',
					'../assets/favicon.png'
				]);
			}),
			caches.open(currentCacheName).then(function(cache) {
				console.log('caching', currentCacheName);
				return cache.addAll([
					'./',
					'../assets/app.css',
					'../assets/app.js'
				]);
			})
		])
	);
});

this.addEventListener('activate', function(event) {
	console.log('delete old caches');
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames
					.filter(function(cacheName) {
						return cacheName.startsWith('sw-intro-9.');
					})
					.filter(function(cacheName) {
						return cacheName !== currentCacheName;
					})
					.map(function(cacheName) {
						console.log('deleted cache', cacheName);
						return caches.delete(cacheName);
					})
			);
		})
	);
});
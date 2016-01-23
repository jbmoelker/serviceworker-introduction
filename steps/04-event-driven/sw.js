// in sw.js
console.log('started ServiceWorker');

this.addEventListener('install', function(event) {
	console.log('installed', event);
});
this.addEventListener('activate', function(event) {
	console.log('activated', event);
});

this.addEventListener('fetch', function(event) { 
	console.log('fetching', event);
});
this.addEventListener('push', function(event) {
	console.log('pushed', event);
});
this.addEventListener('message', function(event) {
	console.log('message received', event);
});
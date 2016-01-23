this.addEventListener('fetch', function(event) {
    console.log('intercepted fetch event', event);
    event.respondWith(new Response('<h1>hijacked</h1>', { headers: {'Content-Type':'text/html'}}));
});
this.addEventListener('message', function(event) {
    console.log('message received', event.data);
    broadcastToClients('hello from the other side');
});

this.addEventListener('push', function(event) {
   console.log('push received', event);
    broadcastToClients('somebody pushed body');
});

function broadcastToClients(message) {
    self.clients.matchAll().then(function(clientList){
        clientList.forEach(function(client) {
            client.postMessage(message);
        });
    });
}
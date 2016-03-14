this.addEventListener('message', function(event) {
    console.log('message received', event.data);
    event.ports[0].postMessage(pigLatin(event.data));
});

// borrowed from http://stackoverflow.com/a/31725523
function pigLatin(str) {
     str=str.toLowerCase();
     var n =str.search(/[aeiuo]/);
     switch (n){
       case 0: str = str+"way"; break;
       case -1: str = str+"ay"; break;
       default :
         str = str.replace(/([^aeiou]*)([aeiou])(\w+)/, "$2$3$1ay");
       break;
    }
    return str;

}
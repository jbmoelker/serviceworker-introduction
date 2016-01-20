(function(){
  var outputBox = document.getElementById('output');
  var codeToggler = document.getElementById('toggleCode');
  var codeCopy = document.getElementById('codeCopy');
  var swResetter = document.getElementById('resetSw');

  window.app = {
    output: output,
    reset: reset
  };
  if(codeToggler) {
    codeToggler.onclick = toggleCode;
  }
  if(swResetter) {
    swResetter.onclick = reset; 
  }

  function output (msg) {
    outputBox.textContent += '> ' + msg + '\n';
  }

  /**
   * Borrowed from https://github.com/jakearchibald/simple-serviceworker-tutorial/blob/68b673/reset/index.html#L22
   */
  function reset () {
    navigator.serviceWorker.getRegistration('./')
      .then(function(reg) {
        output('Unregistering ServiceWorker');
        return reg && reg.unregister();
      })
      .then(function(reg) {
        output('Clearing caches');
        return navigator.serviceWorker.register('sw-reset.js', {
          scope: './'
        })
      })
      .then(function(reg) {
        reg.addEventListener('updatefound', function() {
          var installing = reg.installing;
          reg.installing.addEventListener('statechange', function() {
            if (installing.state == 'installed') {
              output('Done!');
              reg.unregister();
            }
          });
        });
      });
  }

  function toggleCode () {
    var codeSource = document.getElementById('codeSource');
    if(codeCopy.hasAttribute('hidden')) {
      codeCopy.textContent = codeSource.textContent;
      codeCopy.removeAttribute('hidden');
    } else {
      codeCopy.setAttribute('hidden', '');
    }
  }
}())
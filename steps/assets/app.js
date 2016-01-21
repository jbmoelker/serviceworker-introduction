(function(){
  'use strict';
  var outputBox = document.getElementById('output');
  var codeToggler = document.getElementById('toggleCode');
  var codeCopy = document.getElementById('codeCopy');
  var swResetter = document.getElementById('resetSw');
  var swCodeToggler = document.getElementById('toggleSwCode');
  var swCodeCopy = document.getElementById('swCodeCopy');

  window.app = {
    output: output,
    reset: reset,
    resetAll: resetAll
  };
  if(codeToggler) {
    codeToggler.onclick = toggleCode;
  }
  if(swResetter) {
    swResetter.onclick = reset; 
  }
  if('fetch' in window && swCodeToggler) {
    swCodeToggler.onclick = toggleSwCode;
  }

  function output (msg) {
    outputBox.textContent += '> ' + msg + '\n';
  }
  function reset () {
    return navigator.serviceWorker.getRegistration('./')
      .then(function(reg) {
        output('Unregistering ServiceWorker');
        return reg && reg.unregister();
      });
  }

  /**
   * Borrowed from https://github.com/jakearchibald/simple-serviceworker-tutorial/blob/68b673/reset/index.html#L22
   */
  function resetAll (scopes) {
    window.Promise.all(
      scopes.map(function(scope) {
        return navigator.serviceWorker.getRegistration(scope)
          .then(function (reg) {
            if (reg) { output('Unregistering ServiceWorker for ' + reg.scope); }
            return reg && reg.unregister();
          });
      })
    )
      .then(function() {
        output('Clearing caches');
        return navigator.serviceWorker.register('sw-reset.js', {
          scope: './'
        });
      })
      .then(function(reg) {
        reg.addEventListener('updatefound', function() {
          var installing = reg.installing;
          reg.installing.addEventListener('statechange', function() {
            if (installing.state === 'installed') {
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

  function toggleSwCode () {
    if(swCodeCopy.hasAttribute('hidden')) {
        fetch('./sw.js')
          .then(function(response){ return response.text(); })
          .then(function(textContent){
              swCodeCopy.textContent = textContent;
              swCodeCopy.removeAttribute('hidden');
            });
    } else {
      swCodeCopy.setAttribute('hidden', '');
    }
  }
}());
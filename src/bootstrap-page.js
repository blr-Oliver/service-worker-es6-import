import {installServiceWorker} from './js/window/sw-installer.js';
import {queryServiceWorker} from './js/window/sw-query.js';

window.addEventListener('load', () => {
  installServiceWorker('/bootstrap-sw.js')
      .then(reg => console.log(reg));
  document.querySelector('#query').addEventListener('click', queryServiceWorker);
})

const cacheableUrls = [
  '/',
  '/index.html',
  '/css/style.css',
  '/bootstrap-page.js',
  '/js/window/sw-installer.js',
  '/bootstrap-sw.js',
  '/js/worker/sw.js',
  '/assets/square.svg'
];

function installListeners() {
  self.addEventListener('install', (event) => {
    console.log('Here goes installation');
    event.waitUntil(
        caches.open('permanent').then(async cache => {
              let keys = await cache.keys();
              for (let key of keys)
                await cache.delete(key);
              return cache.addAll(cacheableUrls);
            }
        )
    );
  });

  self.addEventListener('activate', (event) => {
    console.log('Here goes activation');
  })

  self.addEventListener('fetch', handleFetch);
}

function handleFetch(event) {
  console.log(event.request.url);
  let url = new URL(event.request.url);
  if (url.pathname === '/generated.json') {
    let rnd = Math.floor(Math.random() * 1000000);
    let blob = new Blob([`{"value": ${rnd}}`], {type: 'application/json'});
    event.respondWith(new Response(blob, {status: 200, statusText: 'OK'}));
  } else
    event.respondWith(
        caches.match(event.request)
            .then(response => {
              if (response) return response;
              return fetch(event.request)
                  .then(fetched => {
                    if (!fetched || fetched.status >= 300 || fetched.type !== 'basic') return fetched;
                    let response = fetched.clone();
                    caches.open('permanent').then(cache => cache.put(event.request, response));
                    return fetched;
                  });
            })
    )
}

installListeners();

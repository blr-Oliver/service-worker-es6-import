import * as sw from './js/worker/sw.js';

async function listCacheUrls() {
  let cache = await self.caches.open('permanent');
  let keys = await cache.keys();
  return keys.map(key => new URL(key.url).pathname);
}

listCacheUrls().then(urls => console.log('Cache entries:', urls));

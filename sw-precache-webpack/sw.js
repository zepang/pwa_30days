var CACHE_NAME = 'my-site-v1'
var cacheArray = ['/',
                  '/index.html',
                  '/index.js',
                  '/index.css',
                  '/images/add.png',
                  '/images/yes.png',
                  '/images/no.png',
                  '/images/todo.png']
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(cacheArray)
      console.log('Service Worker installed')
    })
    .catch((error) => {
      console.log(error)
    })
  )
})

self.addEventListener('activate', event => {
  console.log('now ready to handle fetches')
  event.waitUntil(
    caches.keys().then(cacheNames => {
      var promiseArr = cacheNames.map(item => {
        if (item !== CACHE_NAME) {
          return caches.delete(item)
        }
      })

      return Promise.all(promiseArr)
    })
  )
})
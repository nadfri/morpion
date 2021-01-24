// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// console.log(`WorkBox of Morpion loaded🎉`);

// const { registerRoute } = workbox.routing;
// const { StaleWhileRevalidate } = workbox.strategies;
// const { CacheFirst } = workbox.strategies;
// const { ExpirationPlugin } = workbox.expiration;

// registerRoute(
//     ({ request }) => request.destination === 'document' ||
//         request.destination === 'script',
//     new StaleWhileRevalidate({ cacheName: 'files-cache' })
// );

// registerRoute(
//     ({ request }) => request.destination === 'style',
//     new StaleWhileRevalidate({ cacheName: 'css-cache' })
// );

// registerRoute(
//     ({ url }) => url.origin === 'https://fonts.googleapis.com' ||
//         url.origin === 'https://fonts.gstatic.com',
//     new StaleWhileRevalidate({
//         cacheName: 'google-fonts',
//         plugins: [
//             new ExpirationPlugin({ maxEntries: 20 }),
//         ],
//     }),
// );
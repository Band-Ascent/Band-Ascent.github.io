/* ============================================================================
   Band Ascent — service worker
   Makes the app installable and fully usable offline, including the question
   library. Bump CACHE_VERSION on every release so clients pick up the change.
   ============================================================================ */
const CACHE_VERSION = "band-ascent-v1";
const RUNTIME       = "band-ascent-runtime-v1";

/* Relative paths so this works at a user page or a project subpath alike. */
const SHELL = [
  "./",
  "./index.html",
  "./band-ascent-content.json",
  "./manifest.webmanifest",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon-maskable-512.png",
  "./assets/apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    /* Add individually: one 404 must not fail the whole install. */
    await Promise.all(SHELL.map(url =>
      cache.add(new Request(url, {cache:"reload"})).catch(() => {})
    ));
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(k => k !== CACHE_VERSION && k !== RUNTIME)
      .map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

/* The page asks for this when the user taps "Update now". */
self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) cache.put(request, fresh.clone()).catch(() => {});
    return fresh;
  } catch (e) {
    const hit = await cache.match(request, {ignoreSearch:true});
    if (hit) return hit;
    throw e;
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  const fresh = await fetch(request);
  if (fresh && (fresh.ok || fresh.type === "opaque")) cache.put(request, fresh.clone()).catch(() => {});
  return fresh;
}

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  /* Navigations: prefer the network so updates land, fall back to the shell. */
  if (req.mode === "navigate") {
    event.respondWith((async () => {
      try { return await networkFirst(req, CACHE_VERSION); }
      catch (e) {
        const cache = await caches.open(CACHE_VERSION);
        return (await cache.match("./index.html")) || (await cache.match("./")) || Response.error();
      }
    })());
    return;
  }

  /* The question library: newest wins, but never fail offline. */
  if (sameOrigin && url.pathname.endsWith("band-ascent-content.json")) {
    event.respondWith(networkFirst(req, CACHE_VERSION).catch(async () => {
      const cache = await caches.open(CACHE_VERSION);
      return (await cache.match("./band-ascent-content.json", {ignoreSearch:true})) || Response.error();
    }));
    return;
  }

  /* Own static assets. */
  if (sameOrigin) {
    event.respondWith(cacheFirst(req, CACHE_VERSION).catch(() => fetch(req)));
    return;
  }

  /* Fonts and the Tailwind CDN: keep a copy so the app looks right offline.
     These are opaque cross-origin responses, which is fine for styling. */
  if (/fonts\.(googleapis|gstatic)\.com|cdn\.tailwindcss\.com/.test(url.hostname + url.pathname)) {
    event.respondWith(cacheFirst(req, RUNTIME).catch(() => new Response("", {status:504})));
  }
});

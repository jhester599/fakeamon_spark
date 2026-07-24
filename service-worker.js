// ===========================================================================
//  SERVICE WORKER — offline play (M3-and-beyond infra, added 2026-07-12).
//
//  What this does: the FIRST time you visit the live site (online), it
//  downloads and caches every file the game needs. After that, the game
//  keeps working even with the wifi off — on Android, "Add to Home Screen"
//  from Chrome turns it into a real app icon too.
//
//  ⚠️ THE ONE SHARP EDGE, READ THIS BEFORE SHIPPING A CHANGE: this cache is
//  deliberately aggressive (it's the whole point — offline needs everything
//  local). That means a returning player can get STUCK on an old cached
//  copy after you push an update, unless CACHE_VERSION below changes. Bump
//  it (any different string works — a date is easiest to remember) every
//  time you ship a change that should actually reach offline-capable
//  players. Forgetting this is the classic "my update didn't show up!" bug.
//
//  Also: if you add new assets, re-run `tools/generate-sw-manifest.mjs` and
//  commit the regenerated sw-precache-list.js, or the new files won't be
//  precached (they'll still get cached the first time they're fetched
//  online, via the runtime fallback below — but precaching is what
//  guarantees they're there before you ever go offline).
// ===========================================================================

importScripts("sw-precache-list.js"); // defines PRECACHE_URLS

const CACHE_VERSION = "fakeamon-2026-07-24b"; // [TUNE] bump this on every asset-changing deploy

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting(); // don't make a returning player wait for all tabs to close
});

self.addEventListener("activate", (event) => {
  // Throw away any older cache version — otherwise every deploy just piles
  // up abandoned caches forever.
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((name) => name !== CACHE_VERSION).map((name) => caches.delete(name)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return; // only GETs are cacheable

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // Cache anything new we successfully fetch (covers assets added
          // between CACHE_VERSION bumps — a safety net, not the main plan).
          const sameOrigin = new URL(event.request.url).origin === self.location.origin;
          if (response.ok && sameOrigin) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached); // offline and never cached: nothing more we can do
    })
  );
});

/* ============================================================
   🕉️ ShriVidya App — PranaLink Installer (v12.0)
   ------------------------------------------------------------
   Purpose : App Installation, Offline Support & Auto Activation
   Power   : Progressive Web App (PWA) Framework
   ============================================================ */

// 🪷 App Cache Name
const CACHE_NAME = "ShriVidya-PranaLink-v12";
const FILES_TO_CACHE = [
  "/",                     // Root
  "/index.html",
  "/admin.html",
  "/scripts/SwarVivek.js",
  "/scripts/ShabdaSmaran.js",
  "/scripts/GuruSmaranLink.js",
  "/scripts/aiExplanation.js",
  "/scripts/gyaanPulse.js",
  "/scripts/gyaanNet.js",
  "/scripts/heartLine.js",
  "/scripts/shraddhaNet.js",
  "/manifest.json"
];

// 📦 Install Event — Cache App Shell
self.addEventListener("install", event => {
  console.log("⚙️ Installing ShriVidya App…");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("📥 Caching App Shell...");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 🔁 Activate Event — Remove Old Caches
self.addEventListener("activate", event => {
  console.log("🧹 Activating new ShriVidya Service Worker...");
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("🗑️ Removing old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 🌐 Fetch Event — Offline Support
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

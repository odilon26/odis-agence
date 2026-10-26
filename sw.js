// Service worker d'Odi's Agence : permet l'installation et l'ouverture sans réseau.
// Changez VERSION à chaque mise à jour pour renouveler le cache.
const VERSION = 'odis-v25';
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './logos/om.png', './logos/wave.png', './logos/mtn.png', './logos/moov.png', './logos/tresor.png', './logos/djamo.png', './logos/push.png', './logos/wu.png', './logos/mg.png', './logos/nita.png', './logos/ria.png', './logos/touchpoint.png', './logos/paymetrust.png', './logos/dunya.png', './logos/feexpay.png', './logos/cinetpay.png', './logos/julaya.png', './logos/peya.png', './logos/syca.png'];

// Installation tolérante : un fichier manquant (un logo par exemple) n'empêche pas l'installation.
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION)
    .then(c => Promise.all(SHELL.map(u => fetch(u, { cache: 'reload' }).then(r => { if (r.ok) return c.put(u, r); }).catch(() => {}))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Fichiers de l'app : réseau d'abord (toujours la dernière version), cache si hors ligne.
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(req).then(res => { if (res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return res; })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }
  // Bibliothèques Firebase et polices : cache d'abord.
  if (url.hostname === 'www.gstatic.com' || url.hostname === 'fonts.gstatic.com' || url.hostname === 'fonts.googleapis.com') {
    e.respondWith(
      caches.match(req).then(r => r || fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return res; }))
    );
  }
});

// Mencatat kunjungan (tanpa cookie, tanpa menyimpan IP). Lokasi ditentukan di server.
(function () {
  try {
    if (localStorage.getItem('noTrack') === '1') return; // perangkat pemilik (lihat stats.html)
    if (location.protocol === 'file:' || /^(localhost|127\.|\[::1\])/.test(location.hostname)) return;
    var vid = localStorage.getItem('vid');
    if (!vid) {
      vid = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Math.random()).slice(2) + Date.now();
      localStorage.setItem('vid', vid);
    }
    var ref = '';
    try { var u = new URL(document.referrer); if (u.host !== location.host) ref = u.hostname; } catch (e) {}
    fetch('/api/track', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vid: vid, path: location.pathname + location.search, ref: ref })
    }).catch(function () {});
  } catch (e) {}
})();

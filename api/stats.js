// GET /api/stats?days=30 — ringkasan kunjungan. Wajib header x-admin-key = ADMIN_KEY.
const crypto = require('crypto');

const tally = (rows, fn, limit = 15) => {
  const m = new Map();
  rows.forEach((r) => { const k = fn(r); if (k) m.set(k, (m.get(k) || 0) + 1); });
  return [...m].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([name, count]) => ({ name, count }));
};

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const env = process.env;
  const ADMIN_KEY = (env.ADMIN_KEY || '').trim();
  const SUPABASE_URL = (env.SUPABASE_URL || '').trim().replace(/\/+$/, '').replace(/\/rest\/v1$/, '');
  const KEY = (env.SUPABASE_SERVICE_ROLE_KEY || '').trim().replace(/^["']|["']$/g, '');
  if (!ADMIN_KEY || !SUPABASE_URL || !KEY) return res.status(500).json({ error: 'Environment variable belum lengkap' });

  const given = Buffer.from(String(req.headers['x-admin-key'] || ''));
  const real = Buffer.from(ADMIN_KEY);
  if (given.length !== real.length || !crypto.timingSafeEqual(given, real)) return res.status(401).json({ error: 'Kunci salah' });

  const days = Math.min(Math.max(parseInt(req.query.days, 10) || 30, 1), 365);
  const since = new Date(Date.now() - days * 864e5).toISOString();

  // Supabase membatasi 1000 baris per request, jadi ambil bertahap.
  const rows = [];
  try {
    for (let from = 0; from < 10000; from += 1000) {
      const r = await fetch(
        `${SUPABASE_URL}/rest/v1/visits?select=created_at,visitor_id,path,referrer,country,region,city,device&created_at=gte.${since}&order=created_at.desc`,
        { headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Range-Unit': 'items', Range: `${from}-${from + 999}` } }
      );
      if (!r.ok) return res.status(502).json({ error: 'Gagal membaca database' });
      const page = await r.json();
      rows.push(...page);
      if (page.length < 1000) break;
    }
  } catch (e) {
    return res.status(502).json({ error: 'Gagal menghubungi database: ' + String((e && e.cause) || e).slice(0, 200) });
  }

  res.json({
    days,
    total: rows.length,
    unique: new Set(rows.map((r) => r.visitor_id).filter(Boolean)).size,
    countries: tally(rows, (r) => r.country),
    cities: tally(rows, (r) => (r.city ? `${r.city}, ${r.country || '?'}` : null)),
    pages: tally(rows, (r) => r.path),
    referrers: tally(rows, (r) => r.referrer),
    devices: tally(rows, (r) => r.device),
    daily: tally(rows, (r) => r.created_at.slice(0, 10), 400).sort((a, b) => (a.name < b.name ? -1 : 1)),
    recent: rows.slice(0, 50)
  });
};

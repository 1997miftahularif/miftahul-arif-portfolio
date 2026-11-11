// POST /api/track — simpan 1 kunjungan ke Supabase beserta lokasi dari header geolokasi Vercel.
const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|curl|wget|python|vercel/i;

const dec = (v) => { try { return decodeURIComponent(v); } catch { return v; } };
const clip = (v, n) => (typeof v === 'string' && v ? v.slice(0, n) : null);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const env = process.env;
const SUPABASE_URL = (env.SUPABASE_URL || '').trim().replace(/\/+$/, '').replace(/\/rest\/v1$/, '');
const KEY = (env.SUPABASE_SERVICE_ROLE_KEY || '').trim().replace(/^["']|["']$/g, '');
  if (!SUPABASE_URL || !KEY) return res.status(500).json({ error: 'Tracking belum dikonfigurasi' });

  const h = req.headers;
  const ua = h['user-agent'] || '';
  if (BOT.test(ua)) return res.status(204).end();

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }
  b = b || {};

  const row = {
    visitor_id: clip(b.vid, 64),
    path: clip(b.path, 200) || '/',
    referrer: clip(b.ref, 120),
    country: clip(h['x-vercel-ip-country'], 2),
    region: clip(dec(h['x-vercel-ip-country-region'] || ''), 80),
    city: clip(dec(h['x-vercel-ip-city'] || ''), 80),
    device: /mobile|android|iphone|ipad/i.test(ua) ? 'Mobile' : 'Desktop'
  };

  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/visits`, {
      method: 'POST',
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(row)
    });
    if (r.ok) return res.status(204).end();
    return res.status(502).json({ status: r.status, detail: (await r.text()).slice(0, 300) });
  } catch (e) {
    return res.status(502).json({ error: String(e).slice(0, 200) });
  }
};

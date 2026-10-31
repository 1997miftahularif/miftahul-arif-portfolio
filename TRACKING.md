# Pelacak Kunjungan & Lokasi

Setiap kali ada yang membuka portfolio, kunjungan dicatat (negara, provinsi, kota, halaman, asal link, jenis perangkat).
Alamat IP **tidak disimpan**. Lokasi diambil server dari header geolokasi Vercel (akurasi tingkat kota, bukan alamat).

## Setup (sekali saja)
1. **Supabase** → SQL Editor → jalankan isi `supabase-setup.sql`.
2. **Vercel** → Project → Settings → Environment Variables, tambahkan (Production):
   - `SUPABASE_URL` — Project URL Supabase (`https://xxxx.supabase.co`)
   - `SUPABASE_SERVICE_ROLE_KEY` — service_role key (Supabase → Settings → API)
   - `ADMIN_KEY` — kata sandi bebas yang panjang, untuk membuka dashboard
3. Commit & push (`git add . && git commit -m "Add visitor tracking" && git push`), lalu **Redeploy** agar variabel terbaca.
4. Buka `https://miftahularif.vercel.app/stats.html`, masukkan `ADMIN_KEY`.

> Jangan pernah menaruh service_role key di file repo — hanya di Environment Variables Vercel.

## Catatan
- Perangkat yang pernah membuka `stats.html` otomatis tidak dihitung (kunjungan Anda sendiri).
- Bot/crawler difilter. Akses dari `localhost` tidak dicatat, jadi uji di versi yang sudah di-deploy.
- Header lokasi hanya ada di Vercel; saat deploy di host lain, lokasi akan kosong.
- Disarankan menambah satu kalimat privasi di footer, mis. "Situs ini mencatat statistik kunjungan anonim."

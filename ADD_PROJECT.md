# Cara Menambah Project Baru

Semua project tambahan dikelola dari satu file: **`projects-data.js`**.
Setiap kartu di bagian "More Work" otomatis **bisa diklik** dan membuka halaman detail
`project.html?id=<id>` — tidak perlu membuat file HTML baru.

## Langkah cepat

1. Siapkan gambar (JPG/WebP, lebar ~1400 px, usahakan < 300 KB per gambar)
   - Design → `assets/images/projects/design/`
   - Data Analysis → `assets/images/projects/data/`
2. Buka `projects-data.js`, salin satu blok project, lalu ganti isinya.
3. Simpan, commit, push → Vercel otomatis deploy.

## Contoh blok project

```js
{
  id: "nama-project",              // unik, huruf kecil + tanda minus (dipakai di URL)
  category: "data",                // "automation" | "design" | "data"
  title: "Nama Project",
  year: "2026",                    // boleh dikosongkan ""
  summary: "Satu-dua kalimat untuk kartu.",
  tags: ["Excel", "Dashboard"],
  image: "assets/images/projects/data/cover.jpg",   // "" = placeholder
  // link: "https://..."           // OPSIONAL: kartu membuka link ini, bukan halaman detail
  detail: {                        // semua field di bawah opsional
    overview: "Paragraf pembuka halaman detail.",
    meta: [{ label: "Tools", value: "Excel" }, { label: "Duration", value: "2 weeks" }],
    stats: [{ value: "35%", label: "Waktu rekap berkurang" }],
    sections: [
      { title: "Masalah", text: "..." },
      { title: "Proses", bullets: ["Langkah 1", "Langkah 2"] }
    ],
    palette: [{ name: "Navy", hex: "#0A1A2F" }],
    gallery: [{ src: "assets/images/projects/data/dashboard.jpg", caption: "Dashboard" }],
    links: [{ label: "View dashboard ↗", url: "https://..." }]
  }
},
```

Hapus baris `draft: true` pada project yang sudah asli (project `draft` tampil dengan badge "SAMPLE").

## Dua cara menampilkan detail

| Cara | Kapan dipakai |
|---|---|
| **Halaman detail otomatis** (`project.html`) — default | Hampir semua project. Cukup isi `detail` di `projects-data.js`. |
| **Halaman buatan sendiri** — contoh nyata: `projects/administrative-service-data-analysis/` (dashboard dengan grafik). Atau duplikat `projects/_template-design/` atau `projects/_template-data-analysis/`, lalu isi `link: "projects/nama-folder/index.html"` | Jika ingin layout yang benar-benar berbeda. Hapus `<meta name="robots" content="noindex">` dan kotak `.template-note` di template. |

## Sebelum publish

- Anonimkan data (nama, ID, email, nomor HP, wajah orang) pada screenshot dashboard/laporan.
- Jangan unggah data mentah milik perusahaan/klien tanpa izin.
- Jangan tulis angka hasil jika tidak bisa dibuktikan.
- Pastikan klien/brand setuju karyanya ditampilkan.

## Menambah kategori baru

Misal "Social Media":
1. `index.html` → `<button class="filter" data-filter="social">Social Media</button>`
2. `script.js` → `CATEGORY_LABELS` → `social: "SOCIAL MEDIA"`
3. `project.js` → `KICKER` → `social: "SOCIAL MEDIA CASE STUDY"`
4. `projects-data.js` → pakai `category: "social"`

## Contoh: project dengan dashboard interaktif

`projects/administrative-service-data-analysis/` berisi tiga file:
- `index.html` — kerangka halaman
- `analysis-data.js` — angka hasil analisis (hanya data agregat, tanpa nama pelamar)
- `analysis.js` — menggambar grafik, tabel, dan jawaban pertanyaan bisnis dari data di atas

Untuk project analisis data berikutnya: salin folder ini, ganti isi `analysis-data.js` dengan angka baru,
lalu sesuaikan teks di `index.html` dan `analysis.js`. Semua grafik dibuat tanpa library eksternal.

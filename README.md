# TemplateFinder — Stage 3

Stage 3 menambahkan mesin pembentukan kandidat pencarian template.

## Struktur

```text
template-finder/
├── api/
│   └── search.js
├── index.html
├── style.css
├── script.js
├── vercel.json
└── README.md
```

## Yang baru

- `POST /api/search`
- Deteksi platform dari hostname
- Membuat search query otomatis
- Menampilkan kandidat pencarian Google, YouTube, dan referensi CapCut
- Tombol copy query
- UI hasil pencarian kandidat

## Batasan penting

Stage 3 belum mengklaim menemukan template secara otomatis dari isi video.
URL media sosial tidak selalu memberikan akses ke video, audio, caption, atau metadata lengkap.
Pencocokan video-ke-template yang benar-benar otomatis memerlukan sumber data/API yang sah dan,
untuk tingkat akurasi tinggi, analisis frame/audio pada media yang memang boleh diproses.

## Deploy

Upload isi folder ke root repository GitHub lalu import repository ke Vercel.
Pastikan `index.html` berada di root dan `api/search.js` berada di folder `api`.

## Endpoint

`POST /api/search`

```json
{
  "url": "https://www.tiktok.com/@user/video/123"
}
```

Tidak membutuhkan API key untuk mode kandidat pencarian ini.

# TemplateFinder — Stage 2

Stage 2 menambahkan backend serverless Vercel.

## Struktur

```text
template-finder/
├── api/
│   └── analyze.js
├── index.html
├── style.css
├── script.js
├── vercel.json
└── README.md
```

## Fitur Stage 2

- Frontend mengirim URL ke `POST /api/analyze`.
- Backend memvalidasi URL.
- Backend mengenali TikTok, Instagram, YouTube, Facebook, dan X.
- Response JSON dikirim kembali ke frontend.
- Siap dijalankan sebagai Vercel Serverless Function.

## Deploy ke Vercel

1. Upload isi folder ini ke repository GitHub.
2. Import repository tersebut ke Vercel.
3. Pastikan Root Directory adalah root repository.
4. Tidak perlu build command untuk frontend static sederhana ini.
5. Deploy.

## Uji API

Endpoint:

`POST /api/analyze`

Body:

```json
{
  "url": "https://www.tiktok.com/"
}
```

Stage 2 belum mengambil atau mengunduh video. Mesin pencarian template asli akan dibuat pada Stage 3 dengan metode/API yang sesuai aturan platform.

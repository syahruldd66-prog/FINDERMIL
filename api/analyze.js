function detectPlatform(hostname) {
  const host = hostname.toLowerCase().replace(/^www\./, "");
  if (host === "tiktok.com" || host.endsWith(".tiktok.com")) return "TikTok";
  if (host === "instagram.com" || host.endsWith(".instagram.com")) return "Instagram";
  if (host === "youtube.com" || host === "youtu.be" || host.endsWith(".youtube.com")) return "YouTube";
  if (host === "facebook.com" || host === "fb.watch" || host.endsWith(".facebook.com")) return "Facebook";
  if (host === "x.com" || host === "twitter.com" || host.endsWith(".x.com")) return "X";
  return null;
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { url } = req.body || {};
  if (typeof url !== "string" || !url.trim()) {
    return res.status(400).json({ error: "URL wajib diisi." });
  }

  let parsed;
  try {
    parsed = new URL(url.trim());
  } catch {
    return res.status(400).json({ error: "URL tidak valid." });
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return res.status(400).json({ error: "Gunakan URL http atau https." });
  }

  const platform = detectPlatform(parsed.hostname);
  if (!platform) {
    return res.status(400).json({
      error: "Platform belum didukung. Gunakan TikTok, Instagram, YouTube, Facebook, atau X."
    });
  }

  return res.status(200).json({
    ok: true,
    platform,
    host: parsed.hostname,
    message: `URL ${platform} berhasil diterima oleh backend TemplateFinder.`,
    templateSearch: {
      status: "READY FOR STAGE 3",
      found: false
    }
  });
}
function platformFromHost(hostname){
  const h=hostname.toLowerCase().replace(/^www\./,"");
  if(h==="tiktok.com"||h.endsWith(".tiktok.com")) return "TikTok";
  if(h==="instagram.com"||h.endsWith(".instagram.com")) return "Instagram";
  if(h==="youtube.com"||h==="youtu.be"||h.endsWith(".youtube.com")) return "YouTube";
  if(h==="facebook.com"||h==="fb.watch"||h.endsWith(".facebook.com")) return "Facebook";
  if(h==="x.com"||h==="twitter.com"||h.endsWith(".x.com")) return "X";
  return null;
}

function buildQuery(platform, url){
  const path=url.pathname.replace(/\/+/g," ").replace(/[-_]/g," ");
  const host=platform.toLowerCase();
  return `"${host}" video template CapCut template ${path.slice(0,120)}`.trim();
}

function candidateSearches(query){
  const q=encodeURIComponent(query);
  return [
    {type:"WEB",title:"Cari template di Google",description:"Pencarian umum untuk menemukan halaman template yang cocok.",url:`https://www.google.com/search?q=${q}`},
    {type:"YOUTUBE",title:"Cari tutorial/template di YouTube",description:"Cari video dengan kata kunci template yang sama.",url:`https://www.youtube.com/results?search_query=${q}`},
    {type:"CAPCUT",title:"Cari referensi CapCut",description:"Buka pencarian web untuk referensi template CapCut.",url:`https://www.google.com/search?q=${encodeURIComponent(query+" site:capcut.com")}`}
  ];
}

export default function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed. Use POST."});
  const {url}=req.body||{};
  if(typeof url!=="string"||!url.trim()) return res.status(400).json({error:"URL wajib diisi."});

  let parsed;
  try{parsed=new URL(url.trim())}catch{return res.status(400).json({error:"URL tidak valid."})}
  if(!["http:","https:"].includes(parsed.protocol)) return res.status(400).json({error:"Gunakan URL http atau https."});

  const platform=platformFromHost(parsed.hostname);
  if(!platform) return res.status(400).json({error:"Platform belum didukung."});

  const searchQuery=buildQuery(platform,parsed);
  return res.status(200).json({
    ok:true,
    platform,
    message:`URL ${platform} berhasil dianalisis untuk membangun kandidat pencarian.`,
    searchQuery,
    candidates:candidateSearches(searchQuery)
  });
}
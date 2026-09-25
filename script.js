const $=id=>document.getElementById(id);
const form=$("finderForm"), input=$("videoUrl"), button=$("findBtn"), error=$("error");
const scanner=$("scanner"), result=$("result"), progress=$("progress");
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

function setStep(n){
  document.querySelectorAll(".scan-step").forEach(x=>x.classList.toggle("active",+x.dataset.step<=n));
}

form.addEventListener("submit", async e=>{
  e.preventDefault();
  error.textContent="";
  result.classList.add("hidden");
  let url=input.value.trim();
  try{new URL(url)}catch{error.textContent="Masukkan URL video yang valid.";return}

  button.disabled=true;
  scanner.classList.remove("hidden");
  progress.style.width="18%"; setStep(1); await sleep(350);
  progress.style.width="50%"; setStep(2); await sleep(450);
  progress.style.width="78%"; setStep(3);

  try{
    const r=await fetch("/api/search",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({url})
    });
    const data=await r.json();
    if(!r.ok) throw new Error(data.error||"Backend error");
    progress.style.width="100%"; await sleep(300);

    $("platform").textContent=data.platform;
    $("sourceMessage").textContent=data.message;
    $("query").textContent=data.searchQuery;

    const box=$("candidates");
    box.innerHTML="";
    data.candidates.forEach(c=>{
      const el=document.createElement("article");
      el.className="candidate";
      el.innerHTML=`<div class="type">${c.type}</div><h3>${c.title}</h3><p>${c.description}</p><a href="${c.url}" target="_blank" rel="noopener">Buka pencarian →</a>`;
      box.appendChild(el);
    });
    result.classList.remove("hidden");
    result.scrollIntoView({behavior:"smooth",block:"center"});
  }catch(err){error.textContent=err.message||"Gagal menghubungi backend."}
  finally{button.disabled=false}
});

$("copyQuery").addEventListener("click",async()=>{
  try{await navigator.clipboard.writeText($("query").textContent); $("copyQuery").textContent="Copied ✓"; setTimeout(()=>$("copyQuery").textContent="Copy Query",1200)}
  catch{error.textContent="Browser tidak mengizinkan copy otomatis."}
});
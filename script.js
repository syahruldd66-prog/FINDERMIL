const form = document.getElementById("finderForm");
const input = document.getElementById("videoUrl");
const button = document.getElementById("findBtn");
const error = document.getElementById("error");
const scanner = document.getElementById("scanner");
const result = document.getElementById("result");
const progress = document.getElementById("progress");
const platformEl = document.getElementById("platform");
const messageEl = document.getElementById("message");
const statusEl = document.getElementById("templateStatus");
const hostEl = document.getElementById("videoHost");

const sleep = ms => new Promise(r => setTimeout(r, ms));

function setStep(n) {
  document.querySelectorAll(".scan-step").forEach(el => {
    el.classList.toggle("active", Number(el.dataset.step) <= n);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  error.textContent = "";
  result.classList.add("hidden");

  const url = input.value.trim();
  try { new URL(url); }
  catch { error.textContent = "Masukkan URL video yang valid."; return; }

  button.disabled = true;
  scanner.classList.remove("hidden");
  progress.style.width = "15%";
  setStep(1);
  await sleep(450);

  progress.style.width = "48%";
  setStep(2);
  await sleep(500);

  progress.style.width = "75%";
  setStep(3);

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ url })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Server error");

    progress.style.width = "100%";
    await sleep(350);

    platformEl.textContent = data.platform;
    messageEl.textContent = data.message;
    statusEl.textContent = data.templateSearch.status;
    hostEl.textContent = data.host;
    result.classList.remove("hidden");
    result.scrollIntoView({behavior:"smooth", block:"center"});
  } catch (err) {
    error.textContent = err.message || "Gagal menghubungi backend.";
  } finally {
    button.disabled = false;
  }
});
// Note: for actual Cloudflare security, don't store PASSWORD here
const PASSWORD = "D3r5t0n3";

document.getElementById('loginBtn').addEventListener('click', () => {
  const input = document.getElementById("password").value;
  if (input === PASSWORD) {
    showPage("extensions");
  } else {
    alert("Wrong password");
  }
});

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function openFullscreen(url) {
  const overlay = document.getElementById("overlay");
  const reader = document.getElementById("reader");
  reader.src = url;
  overlay.style.display = "block";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const overlay = document.getElementById("overlay");
    const reader = document.getElementById("reader");
    overlay.style.display = "none";
    reader.src = "";
  }
});

// Attach fullscreen buttons dynamically
document.querySelectorAll('.ext button').forEach(btn => {
  btn.addEventListener('click', () => openFullscreen(btn.dataset.url));
});

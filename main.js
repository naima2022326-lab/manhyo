// Simple client-side password (not secure but works for static site)
const PASSWORD = "D3r5t0n3";

// Login button
document.getElementById('loginBtn').addEventListener('click', () => {
  const input = document.getElementById("password").value;
  if(input === PASSWORD) {
    document.getElementById('login').classList.remove('active');
    document.getElementById('extensions').classList.add('active');
  } else {
    alert("Wrong password");
  }
});

// Open extension links in new tab
document.querySelectorAll('.ext button').forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.dataset.url;
    window.open(url, "_blank", "noopener");
  });
});

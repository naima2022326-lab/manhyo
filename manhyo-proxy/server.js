const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Proxy endpoint
app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing URL");

  try {
    // Fetch the target site
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Cookie": req.headers.cookie || "",
      },
    });

    let html = await response.text();

    // Rewrite links (optional, improves asset loading)
    html = html.replace(/(href|src)="(\/[^"]*)"/g, `$1="${targetUrl}$2"`);

    res.send(html);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(3000, () => console.log("Proxy server running on port 3000"));

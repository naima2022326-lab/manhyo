const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing URL");

  try {
    // Fetch target site HTML
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Cookie": req.headers.cookie || "", // forward cookies
      },
    });
    let html = await response.text();

    // Optional: rewrite URLs so assets go through proxy
    html = html.replace(/(href|src)="(\/[^"]*)"/g, `$1="${targetUrl}$2"`);

    res.send(html);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(3000, () => console.log("Proxy running on port 3000"));

// server.js
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// API endpoint to send menu.json data
app.get("/api/menu", (req, res) => {
  const filePath = path.join(__dirname, "data", "menu.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading menu file" });
    }
    res.json(JSON.parse(data));
  });
});

// Fallback: serve index.html for root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🔥 GrillSmokee server running at http://localhost:${PORT}`);
});

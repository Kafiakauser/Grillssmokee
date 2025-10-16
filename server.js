// server.js — Express backend for The Grill

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API route to get menu data
app.get("/api/menu", (req, res) => {
  const menuPath = path.join(__dirname, "data", "menu.json");

  fs.readFile(menuPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading menu file:", err);
      return res.status(500).json({ error: "Failed to load menu data" });
    }
    try {
      const menu = JSON.parse(data);
      res.json(menu);
    } catch (parseErr) {
      console.error("Error parsing menu JSON:", parseErr);
      res.status(500).json({ error: "Invalid menu data format" });
    }
  });
});

// Default route — serve index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.listen(PORT, () => {
  console.log(`🔥 The Grill server running at http://localhost:${PORT}`);
});
